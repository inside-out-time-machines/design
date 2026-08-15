# Realisatieplan # {#realisatieplan}

Dit plan bakent de MVP af en geeft de fasering richting de livegang van de pilot
[Smaak van Gouda](#pilot-smaak-van-gouda): **MVP live vóór eind 2026**, fase 2 in het
voorjaar van 2027. Het bouwt voort op het [[#keuze-oplossingsrichting]] en de
[systeemarchitectuur](systeemarchitectuur/architectuur.html) en
[data-architectuur](data-architectuur/data-architectuur.html).

## MVP-scope (livegang pilot, eind 2026) ## {#realisatie-mvp}

De MVP omvat alles wat nodig is om de pilot van begin tot eind te laten draaien:

* **Accounts & rollen** — registratie en (social) login via Authentik, 2FA/passkeys voor beheer- en
    moderatierollen, uitnodigingsflows; autorisatie vanuit de database (GebruikerRol leidend)
* **Organisatie & project** — organisatiejottem in eigen huisstijl (SAMH), projectbeheer
    (Smaak van Gouda als eerste project), terminologiebronnen per project
* **Uploaden** — upload met metadata, genre (CHT), locatie en licentie; automatische
    Herkenbaar-check met toestemmingsverklaring
* **Moderatie** — wachtrij, goedkeuren/afkeuren met reden, bewerken en opnieuw indienen door
    de uploader, depubliceren via verwijderverzoeken
* **Publicatie** — duurzame link met content negotiation, jottem-detailpagina
    (IIIF-viewer + metadata + annotaties), publiceren binnen het project
* **Annoteren** — jottem-brede en vlak-annotaties, term-URI's via het NDE Termennetwerk,
    reacties, eigen annotaties bewerken/verwijderen
* **Verkennen** — zoeken met facetten (afgebakende zoek-DSL), interactieve kaart met
    pand-tijdlijn (eigen kaart; GTM-koppeling in fase 2), favorieten incl. openbare deellink
* **Open data-outputs** — IIIF Image/Presentation/Change Discovery, W3C Annotation
    Protocol (AnnotationCollections), RSS, RDF/SPARQL, datasetbeschrijving + dump per project,
    datacatalogus en aanmelding bij het NDE Datasetregister
* **Fundament** — e-mailnotificaties, back-ups, monitoring/alerting en de contracttests uit de
    systeemarchitectuur

## Fase 2 (voorjaar 2027) ## {#realisatie-fase2}

* IIIF-collectie-import (bestaande collecties toevoegen; ontwerp-uitwerking gaat vooraf)
* E-depot-export per project (BagIt + RO-Crate)
* Statistieken-dashboards voor beheerders en moderatoren
* Koppelvlak met externe tijdmachines (Gouda Tijdmachine) — interfacebeschrijving eerst
* Uitrol naar de overige tijdmachines (Amsterdam, Utrecht, Hilversum)

**Latere fase** (reeds besloten in [[#keuze-open-vragen]]): ARK-minting/resolving, externe
preserveringskopie (Internet Archive/e-depot), Wikimedia-doorzetting van de vrije subset.

## Mijlpalen 2026 ## {#realisatie-mijlpalen}

<table class="data">
<thead>
<tr><th>Periode</th><th>Mijlpaal</th></tr>
</thead>
<tbody>
<tr><td>september</td><td>**Fundament staat**: docker-compose-stack op de ontwikkelomgeving (Authentik, PostgreSQL, Valkey, externe Object Storage (S3), backend-skelet), datamodel geïmplementeerd, upload→moderatie→publicatie-keten end-to-end werkend (kaal); **huisstijl Jottem ontworpen en vastgesteld** (zie [[#realisatie-huisstijl]])</td></tr>
<tr><td>oktober</td><td>**Publieksomgeving**: jottem-detailpagina met IIIF-viewer, annoteren met Termennetwerk, zoeken met facetten, kaart + pand-tijdlijn, huisstijl SAMH, Herkenbaar-integratie</td></tr>
<tr><td>november</td><td>**Open data & toetsing**: IIIF/RSS/RDF-outputs, datasetbeschrijving + Datasetregister-validatie (NDE-compatibel), gebruikerssessie met SAMH-vrijwilligers, juridische toetsing gestart, alle notificatiemails werkend (zie [[#notificaties]])</td></tr>
<tr><td>december</td><td>**Hardening & livegang**: securitytoets, monitoring/back-ups aantoonbaar werkend, DPIA en juridische toetsing afgerond, moderatoren getraind, verzameldag/oproep → **pilot live**</td></tr>
</tbody>
</table>

## Livegang-criteria ## {#realisatie-criteria}

De pilot gaat live wanneer aantoonbaar:

1. de kritieke keten (registratie → upload → moderatie → publicatie → annotatie → zoeken)
    end-to-end werkt en de [[#acceptatiecriteria]] van de MVP-usecases zijn aangetoond,
    incl. de e2e-test uit de systeemarchitectuur;
2. de outputcontrole uit de [data-architectuur](data-architectuur/data-architectuur.html#outputcontrole)
    klopt en de datasetbeschrijving valideert tegen het NDE Datasetregister;
3. de juridische documenten door een jurist zijn getoetst en de DPIA is afgerond;
4. moderatie is ingericht (getrainde moderatoren, [handreiking](juridisch/handreiking-moderatie.html));
5. back-ups, monitoring en alerting draaien en de hersteltest is uitgevoerd.

## Huisstijl Jottem-platform ## {#realisatie-huisstijl}

Naast de huisstijl per organisatiejottem (logo, kleurenpalet, favicon op `Organisatie`) heeft
het **platform zelf** een huisstijl. Die is uitgewerkt in de **merkgids** op
[brand.iotm.nl](https://brand.iotm.nl/), met de projectgroep vast te stellen in de
septembermijlpaal. De merkgids omvat:

* **merkverhaal en tone of voice** — positionering, kernwaarden en schrijfregels
    (heel begrijpelijk, taalniveau B1);
* **logo/woordmerk** — het onderstaande woordmerk met alle varianten (negatief, zwart/wit,
    compacte spraakwolk-O), gebruiksregels en downloadbaar logopack;
* **kleurenpalet en typografie** (Fraunces voor koppen, Albert Sans voor tekst — altijd
    lokaal gehost) als basislaag, waar de organisatiekleuren per organisatiejottem
    óverheen komen;
* **CSS-basis** (design tokens/stylesheet, te downloaden via de merkgids) die deze basislaag
    én de organisatie-overrides draagt, hergebruikt in de e-mailtemplates;
* **vormtaal, beeldgebruik en motion-principes** met live voorbeelden;
* **favicon** van het platform (voor www/design/prototype en als standaard voor organisaties
    zonder eigen favicon);
* **slogan** — gekozen uit de opties in de [[#salespitch]]:
    *"Maak erfgoed van iedereen, door iedereen"*.

<img src="images/jottem-woordmerk.svg" alt="Jottem-woordmerk" style="max-width:100%; height:auto; background:white;">

## Openstaand ontwerp tijdens de bouw ## {#realisatie-openstaand}

Uit de gap-analyse resteert ontwerpwerk dat ter voorbereiding op fase 2 wordt opgepakt:
de interfacebeschrijving van de tijdmachine-koppeling en de uitwerking van de IIIF-import.
De huisstijl van het platform is uitgewerkt in de [merkgids](https://brand.iotm.nl/) en wacht
op vaststelling door de projectgroep ([[#realisatie-huisstijl]], septembermijlpaal).
Het notificatie-overzicht ([[#notificaties]]) en de acceptatiecriteria per usecase
([[#acceptatiecriteria]]) zijn uitgewerkt. De open-sourcelicenties en repostructuur zijn inmiddels
besloten, zie [[#keuze-opensource]]: EUPL-1.2 voor de platformcode in het monorepo
[jottem](https://github.com/inside-out-time-machines/jottem), AGPL-3.0 voor de Herkenbaar API,
CC BY 4.0 voor documentatie en ontwerpen.
