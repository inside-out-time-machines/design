# Per-document Bikeshed-build voor infra/ en juridisch/ — Implementatieplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Het Bikeshed-buildproces laat elk standalone `.bs`-document automatisch naar HTML bouwen, de `iotm-*`-documenten verhuizen naar `infra/`, en de zes juridische documenten worden op dezelfde manier omgezet en gepubliceerd.

**Architecture:** Eén `make spec`-target loopt over alle `.bs`-bestanden (root + `infra/` + `juridisch/`) in één docker-container; de GitHub Action roept dat target aan. Elk standalone document is een dunne `.bs`-wrapper (metadata + één `<pre class="include">`) naast zijn `.md`. Gegenereerde HTML wordt niet meer in git bewaard maar door CI vers gebouwd.

**Tech Stack:** Bikeshed (docker image `netwerkdigitaalerfgoed/bikeshed:5.3.2`), GNU Make, GitHub Actions + Pages.

## Global Constraints

- Docker image exact: `netwerkdigitaalerfgoed/bikeshed:5.3.2`.
- Bikeshed lost include-`path:` op relatief t.o.v. het bron-`.bs`-bestand (geverifieerd) → wrappers gebruiken `path: <basename>.md`.
- Standalone documenten in een submap gebruiken `<link rel="shortcut icon" href="../favicon.ico">`.
- Gegenereerde HTML (`/index.html`, `/infra/*.html`, `/juridisch/*.html`) blijft gitignored; handgeschreven `prototype/*.html` blijft getrackt.
- Nieuwe/verplaatste `.md`- en `.bs`-bestanden krijgen modus `644` (geen exec-bit).
- Commit-berichten in het Nederlands; **geen** verwijzing naar Claude/Anthropic, geen `Co-Authored-By`-trailer, geen "Generated with"-regel.
- Werk op een feature-branch; tussenstanden raken `main`/productie niet.

## File Structure

| Bestand | Actie | Verantwoordelijkheid |
|---------|-------|----------------------|
| `Makefile` | wijzigen | `spec`-target loopt over alle `.bs` |
| `.github/workflows/publish.yml` | wijzigen | build-stap roept `make spec` aan |
| `.gitignore` | wijzigen | gegenereerde HTML negeren |
| `infra/analyse.{bs,md}` | verplaatsen uit `iotm-infra.*` | infrastructuur-analyse |
| `infra/wiki.{bs,md}` | verplaatsen uit `iotm-wiki.*` | Wikimedia-uitwerking |
| `infra/internet-archive.{bs,md}` | verplaatsen uit `iotm-iae.*` | Internet Archive-uitwerking |
| `infra.md` | wijzigen | links naar `infra/*.html` |
| `iotm-*.html` (root) | uit git verwijderen | oude gegenereerde output |
| `juridisch/*.bs` (6×) | aanmaken | wrappers rond de juridische `.md`'s |
| `juridisch/*.md` (6×) | committen | juridische broninhoud publiceren |

---

## Task 1: Build-loop, CI-aanroep en git-ignore

**Files:**
- Modify: `Makefile`
- Modify: `.github/workflows/publish.yml`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `make spec` bouwt elk `*.bs`, `infra/*.bs`, `juridisch/*.bs` naar een gelijknamig `.html`. Latere taken vertrouwen hierop voor verificatie.

- [ ] **Step 1: Vervang de Makefile door de loop-variant**

Schrijf `Makefile`:

```make
IMAGE := netwerkdigitaalerfgoed/bikeshed:5.3.2
BS := $(wildcard *.bs infra/*.bs juridisch/*.bs)
DOCKER := docker run --rm -v "`pwd`:/spec" -w /spec $(IMAGE)

help:
	@echo "Genereer HTML uit de Bikeshed-brondocumenten:"
	@echo "  make spec    Bouw alle documenten (root, infra/, juridisch/)"
	@echo "  make watch   Bouw index.html telkens als index.bs wijzigt"

spec:
	$(DOCKER) sh -c 'for f in $(BS); do echo "bikeshed: $$f"; bikeshed --no-update spec $$f $${f%.bs}.html; done'

watch:
	$(DOCKER) sh -c "bikeshed --no-update watch index.bs index.html"

.PHONY: help spec watch
```

- [ ] **Step 2: Bouw ter verificatie**

Run: `make spec`
Expected: uitvoer met `bikeshed: index.bs` en `bikeshed: iotm-*.bs`, elk eindigend op `✔ Successfully generated`. `index.html` en de drie `iotm-*.html` zijn (opnieuw) gegenereerd.

- [ ] **Step 3: Laat de CI-workflow `make spec` aanroepen**

Vervang in `.github/workflows/publish.yml` de stap `Generate HTML from Bikeshed` (het `docker run … bikeshed … index.bs index.html`-blok) door:

```yaml
      - name: Generate HTML from Bikeshed
        run: make spec
```

- [ ] **Step 4: Negeer gegenereerde HTML**

Schrijf `.gitignore`:

```gitignore
# Door Bikeshed gegenereerde HTML — CI bouwt deze vers uit de bron
/index.html
/infra/*.html
/juridisch/*.html
```

- [ ] **Step 5: Haal de reeds getrackte index.html uit tracking**

Run: `git rm --cached index.html`
Expected: `rm 'index.html'`. Het bestand blijft op schijf staan.

- [ ] **Step 6: Controleer dat index.html nu genegeerd wordt**

Run: `git status --short index.html`
Expected: **geen** uitvoer (genegeerd, niet meer getrackt).

- [ ] **Step 7: Commit**

```bash
git add Makefile .github/workflows/publish.yml .gitignore
git commit -m "Bikeshed-build over alle .bs-bestanden + gegenereerde HTML uit git"
```

---

## Task 2: Verplaats de iotm-documenten naar infra/

**Files:**
- Rename: `iotm-infra.bs`→`infra/analyse.bs`, `iotm-infra.md`→`infra/analyse.md`
- Rename: `iotm-wiki.bs`→`infra/wiki.bs`, `iotm-wiki.md`→`infra/wiki.md`
- Rename: `iotm-iae.bs`→`infra/internet-archive.bs`, `iotm-iae.md`→`infra/internet-archive.md`
- Modify: `infra/analyse.bs`, `infra/wiki.bs`, `infra/internet-archive.bs` (Shortname, favicon, include-path)
- Modify: `infra/analyse.md` (cross-links)
- Modify: `infra.md` (links naar infra/*.html)
- Delete: `iotm-infra.html`, `iotm-wiki.html`, `iotm-iae.html`

**Interfaces:**
- Consumes: `make spec` uit Task 1.
- Produces: `infra/analyse.html`, `infra/wiki.html`, `infra/internet-archive.html`.

- [ ] **Step 1: Verplaats bron-bestanden met git mv**

```bash
git mv iotm-infra.bs infra/analyse.bs
git mv iotm-infra.md infra/analyse.md
git mv iotm-wiki.bs  infra/wiki.bs
git mv iotm-wiki.md  infra/wiki.md
git mv iotm-iae.bs   infra/internet-archive.bs
git mv iotm-iae.md   infra/internet-archive.md
```

- [ ] **Step 2: Normaliseer de bestandsmodus (exec-bit weg)**

```bash
chmod 644 infra/*.bs infra/*.md
git add --chmod=-x infra/analyse.md infra/wiki.md infra/internet-archive.md
```

- [ ] **Step 3: Werk de drie wrappers bij (Shortname, favicon, include-path)**

```bash
sed -i 's#^Shortname: iotm-infra$#Shortname: analyse#; s#href="\./favicon.ico"#href="../favicon.ico"#; s#^path: iotm-infra\.md$#path: analyse.md#' infra/analyse.bs
sed -i 's#^Shortname: iotm-wiki$#Shortname: wiki#;  s#href="\./favicon.ico"#href="../favicon.ico"#; s#^path: iotm-wiki\.md$#path: wiki.md#' infra/wiki.bs
sed -i 's#^Shortname: iotm-iae$#Shortname: internet-archive#; s#href="\./favicon.ico"#href="../favicon.ico"#; s#^path: iotm-iae\.md$#path: internet-archive.md#' infra/internet-archive.bs
```

- [ ] **Step 4: Repareer de cross-links in analyse.md**

De links `[iotm-wiki.md](iotm-wiki.md)` en `[iotm-iae.md](iotm-iae.md)` wijzen nu naar niet-bestaande `.md`-bestanden; laat ze naar de sibling-HTML wijzen:

```bash
sed -i 's#iotm-wiki\.md#wiki.html#g; s#iotm-iae\.md#internet-archive.html#g' infra/analyse.md
```

- [ ] **Step 5: Werk de links in infra.md bij**

```bash
sed -i 's#iotm-infra\.html#infra/analyse.html#g; s#iotm-wiki\.html#infra/wiki.html#g; s#iotm-iae\.html#infra/internet-archive.html#g' infra.md
```

- [ ] **Step 6: Verwijder de oude gegenereerde HTML op de root**

```bash
git rm iotm-infra.html iotm-wiki.html iotm-iae.html
```

Expected: drie `rm '…'`-regels.

- [ ] **Step 7: Bouw en verifieer**

Run: `make spec`
Expected: uitvoer bevat `bikeshed: infra/analyse.bs`, `bikeshed: infra/wiki.bs`, `bikeshed: infra/internet-archive.bs`, elk `✔ Successfully generated`.

Run: `ls infra/*.html`
Expected: `infra/analyse.html  infra/internet-archive.html  infra/wiki.html`

- [ ] **Step 8: Controleer favicon en cross-links in de output**

Run: `grep -o 'href="../favicon.ico"' infra/analyse.html | head -1`
Expected: `href="../favicon.ico"`

Run: `grep -Eo 'href="(wiki|internet-archive)\.html"' infra/analyse.html | sort -u`
Expected: `href="internet-archive.html"` en `href="wiki.html"`

Run: `grep -Eo 'infra/(analyse|wiki|internet-archive)\.html' index.html | sort -u`
Expected: alle drie de paden (bevestigt dat `infra.md` correct in `index.html` is verwerkt).

- [ ] **Step 9: Commit**

```bash
git add infra/ infra.md
git commit -m "iotm-documenten verplaatst naar infra/ (analyse, wiki, internet-archive)"
```

---

## Task 3: Juridische wrappers aanmaken en publiceren

**Files:**
- Create: `juridisch/algemene-voorwaarden-jottem.bs`, `juridisch/handreiking-moderatie-jottem.bs`, `juridisch/interviewprotocol-jottem.bs`, `juridisch/privacybeleid-jottem.bs`, `juridisch/risicos-en-wetgeving-jottem.bs`, `juridisch/samenwerkingsovereenkomst-jottem.bs`
- Commit (nieuw getrackt): `juridisch/*.md` (6×)

**Interfaces:**
- Consumes: `make spec` uit Task 1.
- Produces: `juridisch/<basename>.html` voor elk van de zes documenten.

- [ ] **Step 1: Genereer de zes wrappers**

```bash
cd juridisch
gen() {  # $1=basename  $2=title  $3=abstract
  cat > "$1.bs" <<EOF
<pre class='metadata'>
Title: $2
Shortname: $1
Level: 1
Status: DREAM
Markup Shorthands: css yes, markdown yes
URL: https://github.com/inside-out-time-machines/design
Editor: Bob Coret, Gouda Tijdmachine https://www.goudatijdmachine.nl, bob@coret.org, https://github.com/coret
Abstract: $3
</pre>
<section boilerplate="conformance"></section>
<section boilerplate="abstract"></section>
<link rel="shortcut icon" href="../favicon.ico">

<pre class="include">
path: $1.md
</pre>
EOF
}
gen algemene-voorwaarden-jottem "Algemene voorwaarden Jottem" "Algemene voorwaarden voor het gebruik van het Jottem-platform: een positieve 'proclaimer' met juridisch bindende afspraken, gebaseerd op onder meer de AVG, de Auteurswet, de DSA en het Burgerlijk Wetboek. Concept, nog niet juridisch gecontroleerd."
gen handreiking-moderatie-jottem "Handreiking moderatie Jottem" "Handreiking voor vrijwilligers die ingezonden jottems beoordelen voordat ze openbaar worden."
gen interviewprotocol-jottem "Interviewprotocol Jottem" "Protocol voor vrijwilligers die interviews afnemen, met de nadruk op toestemming voor publicatie en langdurige bewaring."
gen privacybeleid-jottem "Privacybeleid Jottem" "Privacybeleid van Jottem: welke persoonsgegevens worden verwerkt, waarom, en welke rechten betrokkenen hebben, conform de AVG. Concept, nog niet juridisch gecontroleerd."
gen risicos-en-wetgeving-jottem "Jottem — Risico's en wet- en regelgeving" "Werkdocument voor de projectgroep met een overzicht van de risico's rond het Jottem-platform en de relevante wet- en regelgeving."
gen samenwerkingsovereenkomst-jottem "Samenwerkingsovereenkomst Jottem" "Samenwerkingsovereenkomst tussen de Platformbeheerder en een deelnemende Organisatie op het Jottem-platform. Concept, nog niet juridisch gecontroleerd."
cd ..
```

- [ ] **Step 2: Normaliseer de bestandsmodus**

```bash
chmod 644 juridisch/*.bs juridisch/*.md
```

- [ ] **Step 3: Bouw en verifieer**

Run: `make spec`
Expected: zes regels `bikeshed: juridisch/*.bs`, elk `✔ Successfully generated`.

Run: `ls juridisch/*.html | wc -l`
Expected: `6`

- [ ] **Step 4: Controleer inhoud en favicon van één output**

Run: `grep -c "Privacybeleid" juridisch/privacybeleid-jottem.html`
Expected: een getal ≥ 1 (de brontekst is opgenomen).

Run: `grep -o 'href="../favicon.ico"' juridisch/privacybeleid-jottem.html | head -1`
Expected: `href="../favicon.ico"`

- [ ] **Step 5: Controleer dat de gegenereerde HTML genegeerd wordt**

Run: `git status --short juridisch/`
Expected: alleen de zes `.bs`-bestanden en zes `.md`-bestanden als toevoegingen (`??` of `A`); **geen** `.html`-bestanden.

- [ ] **Step 6: Commit (bron + gepubliceerde juridische documenten)**

```bash
git add juridisch/*.bs juridisch/*.md
git commit -m "Juridische documenten als Bikeshed-wrappers toegevoegd en gepubliceerd"
```

---

## Task 4: Eindverificatie van de volledige build

**Files:** geen (alleen verificatie)

- [ ] **Step 1: Volledige schone build**

Run: `rm -f index.html infra/*.html juridisch/*.html && make spec`
Expected: alle documenten (index + 3 infra + 6 juridisch) worden gebouwd, elk `✔ Successfully generated`.

- [ ] **Step 2: Tel de gegenereerde bestanden**

Run: `ls index.html infra/*.html juridisch/*.html | wc -l`
Expected: `10`

- [ ] **Step 3: Bevestig dat de werkboom schoon is op gegenereerde HTML na**

Run: `git status --short`
Expected: **geen** `.html`-bestanden in de lijst (alles genegeerd); geen onverwachte wijzigingen.

- [ ] **Step 4 (optioneel): Push de branch**

```bash
git push -u origin HEAD
```

De CI-workflow op `main` (na merge) bouwt en deployt de documenten naar GitHub Pages.

---

## Self-Review

- **Spec-dekking:** infra-verhuizing (Task 2), juridische omzetting + publicatie (Task 3), build-automatisering route B (Task 1), link-updates (Task 2 stap 4–5), git-hygiëne/gitignore (Task 1 + Task 3 stap 5), favicon-correctie (Task 2 stap 3 + Task 3 stap 1), naamgeving `analyse/wiki/internet-archive` (Task 2). `juridisch.md` blijft bewust ongemoeid (niet in enige taak) — conform spec.
- **Padresolutie-risico:** vooraf geverifieerd (`path:` relatief t.o.v. `.bs`) → wrappers gebruiken `path: <basename>.md`; geen open aanname meer.
- **Exec-bit:** genormaliseerd naar `644` in Task 2 stap 2 en Task 3 stap 2.
- **Naamconsistentie:** Shortname en include-`path:` per infra-wrapper komen overeen met de nieuwe basenames (`analyse`, `wiki`, `internet-archive`); juridische Shortname = basename = `path`-doel.
