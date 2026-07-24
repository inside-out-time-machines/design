# Ontwerp: per-document Bikeshed-build voor infra/ en juridisch/

**Datum:** 2026-07-24
**Status:** goedgekeurd ontwerp

## Doel

Het Bikeshed-buildproces zo inrichten dat *alle* standalone documenten
automatisch vanuit hun bron naar HTML gebouwd worden, en de bestaande
`iotm-*`-documenten reorganiseren naar een `infra/`-map. De zes juridische
documenten in `juridisch/` worden op dezelfde manier omgezet en gepubliceerd.

Dit is de "route B"-variant: één build-mechanisme dat over alle `.bs`-bestanden
loopt, zodat bron en HTML niet uit elkaar kunnen lopen.

## Uitgangssituatie

- `index.bs` bundelt via `<pre class="include">` een reeks losse `.md`-bestanden
  tot `index.html`. Gebouwd door `make spec` én de GitHub Action.
- Standalone documenten `iotm-infra.bs`, `iotm-iae.bs`, `iotm-wiki.bs` zijn dunne
  wrappers (metadata + één include) die elk één `.md` naar één `.html` renderen.
- De CI-workflow bouwt **alleen** `index.bs`; de `iotm-*.html`-bestanden worden
  lokaal gebouwd en als statische bestanden in git gecommit en meegedeployed.
- `juridisch/` bevat zes `.md`-bestanden (privé, `700`, untracked), zonder
  wrappers of build.
- `juridisch.md` (root) is een ongebruikt, untracked restant — een kopie van
  `infra.md`. Wordt niet aangepast.

## Beslissingen

| Onderwerp | Keuze |
|-----------|-------|
| Naamgeving infra-docs | prefix `iotm-` laten vallen: `analyse`, `wiki`, `internet-archive` |
| Juridische docs publiceren | ja, committen + via CI bouwen + op GitHub Pages serveren |
| Juridische `.md`-namen | ongewijzigd (incl. `-jottem`-suffix) |
| `juridisch.md` (root) | ongemoeid laten |
| Gegenereerde HTML in git | uit git halen + gitignoren; CI bouwt vers |

## Nieuwe structuur

```
infra/
  analyse.bs           analyse.md            (was iotm-infra.bs / iotm-infra.md)
  wiki.bs              wiki.md               (was iotm-wiki.bs  / iotm-wiki.md)
  internet-archive.bs  internet-archive.md   (was iotm-iae.bs   / iotm-iae.md)
juridisch/
  algemene-voorwaarden-jottem.bs        + .md
  handreiking-moderatie-jottem.bs       + .md
  interviewprotocol-jottem.bs           + .md
  privacybeleid-jottem.bs               + .md
  risicos-en-wetgeving-jottem.bs        + .md
  samenwerkingsovereenkomst-jottem.bs   + .md
```

De oude `iotm-*.bs`/`.md`/`.html` op de root verdwijnen (via `git mv` voor de
bron, `git rm` voor de gegenereerde HTML).

## Componenten

### 1. `.bs`-wrappers

Elke standalone-wrapper volgt exact het bestaande iotm-patroon: een
`<pre class='metadata'>`-blok (Title, Shortname, Level, Status: DREAM,
Markup Shorthands, URL, Editor, Abstract), gevolgd door de conformance-/abstract-
boilerplate, een favicon-link en één `<pre class="include">`.

Twee aanpassingen omdat de wrappers nu één map diep staan:

- **favicon:** `<link rel="shortcut icon" href="../favicon.ico">`
  (nu `./favicon.ico`; zou anders `<map>/favicon.ico` zoeken).
- **include-`path:`** verwijst naar het `.md`-bestand naast de wrapper, met een
  relatief pad zoals Bikeshed dat verwacht (te verifiëren, zie Risico's).

`Shortname` per wrapper = de bestands-basename (uniek, lowercase, hyphens).
`Title`/`Abstract` per juridisch document afgeleid uit de `# H1` en de inleiding
van het bijbehorende `.md`.

### 2. Build-automatisering — `Makefile`

Het `spec`-target loopt over alle `.bs`-bestanden (root + `infra/` + `juridisch/`)
binnen één docker-container en rendert elk naar een gelijknamig `.html`:

```make
BS := $(wildcard *.bs infra/*.bs juridisch/*.bs)
IMAGE := netwerkdigitaalerfgoed/bikeshed:5.3.2

spec:
	docker run --rm -v "`pwd`:/spec" -w /spec $(IMAGE) sh -c \
	  'for f in $(BS); do bikeshed --no-update spec $$f $${f%.bs}.html; done'
```

`watch` blijft op `index.bs` gericht (interactief werken aan de hoofdspec);
optioneel later uit te breiden. `help` beschrijft het aangepaste `spec`.

### 3. CI-workflow — `.github/workflows/publish.yml`

De build-stap roept voortaan `make spec` aan i.p.v. een hardgecodeerd
bikeshed-commando, zodat de Makefile de enige bron van waarheid is. De
deploy-stap (`upload-pages-artifact` met `path: '.'`) blijft ongewijzigd en
serveert de vers gebouwde HTML.

### 4. Links bijwerken

- `infra.md` (zit via include in `index.html`): de drie links
  `iotm-infra.html` / `iotm-wiki.html` / `iotm-iae.html` →
  `infra/analyse.html` / `infra/wiki.html` / `infra/internet-archive.html`.
- Binnen `analyse.md`: de (nu al kapotte) links naar `iotm-wiki.md` / `iotm-iae.md`
  → `wiki.html` / `internet-archive.html` (siblings binnen `infra/`).
- `juridisch.md` (root): niet aangepast.

### 5. Git-hygiëne

- `.gitignore` krijgt: `/index.html`, `/infra/*.html`, `/juridisch/*.html`.
- Bestaande gegenereerde HTML wordt met `git rm --cached` uit tracking gehaald.
- `prototype/*.html` (handgeschreven) blijft ongemoeid.
- De zes juridische `.md` + hun wrappers worden gecommit.

## Data flow

```
bron (.bs + .md)  --make spec-->  <naam>.html  --upload-pages-->  GitHub Pages
       ^                                  ^
   in git                        gitignored, per build vers
```

## Risico's / te verifiëren

1. **Include-padresolutie van Bikeshed.** Aanname: `path:` in een `<pre
   class=include>` wordt relatief t.o.v. het bron-`.bs`-bestand opgelost, niet
   t.o.v. de werkdirectory. Vroeg in de implementatie verifiëren met één build
   (`infra/analyse.bs`); als het toch t.o.v. cwd is, wordt het pad
   `infra/analyse.md` i.p.v. `analyse.md`.
2. **Bikeshed-metadata-eisen** (o.a. verplichte `Abstract`) — per juridische
   wrapper een geldige, korte Abstract opnemen.
3. **git rename-detectie** — `git mv` gebruiken zodat de history van de
   infra-documenten traceerbaar blijft.

## Verificatie

- `make spec` bouwt lokaal alle documenten zonder fouten; controleer dat
  `infra/analyse.html`, `infra/wiki.html`, `infra/internet-archive.html` en de
  zes `juridisch/*.html` ontstaan.
- Steekproef op gerenderde links (infra-index en cross-links in `analyse.html`).
- CI-run op `main` bouwt en deployt succesvol.
