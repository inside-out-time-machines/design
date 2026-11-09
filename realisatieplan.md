# Realisatieplan # {#realisatieplan}

Dit plan bakent de MVP af en geeft de fasering richting de livegang van de pilot
[Smaak van Gouda](#pilot-smaak-van-gouda): **MVP live vóór eind 2026**, fase 2 in het
voorjaar van 2027. Het bouwt voort op het [[#keuze-oplossingsrichting]] en de
[systeemarchitectuur](systeemarchitectuur/architectuur.html) en
[data-architectuur](data-architectuur/data-architectuur.html).

## MVP-scope (livegang pilot, eind 2026) ## {#realisatie-mvp}

De MVP omvat alles wat nodig is om de pilot van begin tot eind te laten draaien:

* **Accounts & rollen** - registratie en (social) login via Authentik, 2FA/passkeys voor beheer- en
    moderatierollen, uitnodigingsflows; autorisatie vanuit de database (GebruikerRol leidend)
* **Organisatie & project** - organisatiejottem in eigen huisstijl (SAMH), projectbeheer
    (Smaak van Gouda als eerste project), terminologiebronnen per project
* **Uploaden** - upload (JPG/PNG/TIFF) met metadata, genre (CHT), locatie (speld op de kaart),
    begin- en eindjaar en licentiebevestiging; automatische Herkenbaar-check met
    toestemmingsverklaring. Begin- en eindjaar zijn generieke velden: de pilot verzamelt
    daarmee al de gegevens voor een latere pand-tijdlijn.
    De suggestiedienst (titel, categorie en steekwoorden bij het uploaden) is gebouwd, maar
    hoort niet bij de MVP en staat bij de livegang uit; hij gaat aan zodra de meting op
    pilotmateriaal uit de AI-toets is geslaagd (zie [[#verrijking-uploadsuggesties]])
* **Moderatie** - wachtrij, goedkeuren/afkeuren met reden, bewerken en opnieuw indienen door
    de uploader, verwijderverzoeken (depubliceren of wissen, met wislijst), afhandelen van meldingen (gerapporteerde
    annotaties en reacties)
* **Publicatie** - duurzame link met content negotiation, jottem-detailpagina
    (IIIF-viewer + metadata + annotaties), publiceren binnen het project
* **Annoteren** - jottem-brede en vlak-annotaties, term-URI's via het NDE Termennetwerk,
    reacties, eigen annotaties bewerken/verwijderen
* **Verkennen** - de projectpagina en een kaart met de gepubliceerde jottems als speldjes.
    Zoeken met facetten, favorieten en de pand-tijdlijn volgen na de evaluatie (zie
    [[#realisatie-fase2]]); tot die tijd kan de Gouda Tijdmachine de RSS-feed en de
    IIIF-collectie van het project gebruiken
* **Delen** - Delen-knop met Open Graph-metadata, widgets (iframe en script) en oEmbed
    (zie [[#deelbaarheid]])
* **Open data-outputs** - IIIF Image/Presentation, W3C Annotation Protocol
    (AnnotationCollections), RSS, RDF, datasetbeschrijving + dump per project,
    datacatalogus en aanmelding bij het NDE Datasetregister, plus de open-data-landingspagina
    op de data-host (per project alle uitgangen, Swagger UI van de publieke API en de
    broncoderepo's; eigen repo `data`, in deze fase op data.dev.iotm.nl). IIIF Change
    Discovery, de aggregaten per organisatie en platform en het publieke SPARQL-endpoint
    zijn gebouwd, maar staan tijdens de pilot in productie uit: de pilot heeft ze niet
    nodig en de datadump wordt uit PostgreSQL gemaakt, niet uit de triplestore
* **Vorm van de JSON-LD** - per kernentiteit een vastgelegd JSON-LD-frame
    ([data-architectuur](data-architectuur/data-architectuur.html#frames));
    de schema.org-namespace en de annotatieprefix zijn over alle serialisaties
    gelijkgetrokken; het framed-profiel
    (`Accept: application/ld+json;profile="http://www.w3.org/ns/json-ld#framed"`) wordt op
    de API-URL's ondersteund (gereed). Content negotiation op de duurzame www-URL (303 naar
    de API, AP-7) is bezig
* **Fundament** - e-mailnotificaties, back-ups, monitoring/alerting en de contracttests uit de
    systeemarchitectuur (de basis-monitoringstack draait op dev: Prometheus/Grafana met
    exporters, overzichtsdashboard en basisalerts; Grafana achter Authentik-OIDC,
    alleen voor platformbeheerders)

## Fase 2 (voorjaar 2027) ## {#realisatie-fase2}

Na de evaluatie van de pilot, als de pilot erom vraagt:

* Zoeken met facetten (Elasticsearch met afgebakende zoek-DSL, AP-3)
* Favorieten, met openbare deellink (GE-4, BE-5)
* Pand-tijdlijn op de kaart en de kaartkoppeling met de Gouda Tijdmachine (BE-3)
* IIIF Change Discovery, de aggregaten per organisatie en platform, en het publieke
    SPARQL-endpoint in productie aanzetten (AP-1)

Verder gepland:

* Social login via Apple en Instagram (MVP: Google, Microsoft en Facebook; de Apple-aanvraag start eerder vanwege de doorlooptijd; eigenaar Bob Coret)
* IIIF-collectie-import (bestaande collecties toevoegen; ontwerp-uitwerking gaat vooraf)
* PDF- en audio-ondersteuning met conversiepipeline (multi-canvas Manifests, audio-canvas met `duration`)
* E-depot-export per project (BagIt + RO-Crate)
* Statistieken-dashboards voor beheerders en moderatoren
* Koppelvlak met externe tijdmachines (Gouda Tijdmachine) - interfacebeschrijving eerst
* Uitrol naar de overige tijdmachines (Amsterdam, Utrecht, Hilversum)

**Beslispunt na de evaluatie:** annotaties blijven in AnnoRepo, of de W3C-leesroutes worden
uit PostgreSQL bediend en MongoDB vervalt (zie de
[systeemarchitectuur](systeemarchitectuur/architectuur.html#annotaties-annorepo)).

**Latere fase** (reeds besloten in [[#keuze-open-vragen]]): ARK-minting/resolving, externe
preserveringskopie (Internet Archive/e-depot), Wikimedia-doorzetting van de vrije subset,
harde opslagquota per organisatie (MVP: monitoring met alerts).

## Mijlpalen 2026 ## {#realisatie-mijlpalen}

Stand van zaken op 9 november 2026. Statuswaarden: **gereed** (gebouwd en op dev
aangetoond), **bezig**, **niet gestart**, **open** (geen bouwwerk, nog niet aantoonbaar
afgerond), **uitgesteld** (naar [[#realisatie-fase2]]) en **uit in productie** (gebouwd,
maar tijdens de pilot uitgeschakeld).

<table class="data">
<thead>
<tr><th>Periode</th><th>Mijlpaal</th><th>Status</th></tr>
</thead>
<tbody>
<tr><td>september</td><td>**Fundament staat**: docker-compose-stack op de ontwikkelomgeving (Authentik, PostgreSQL, Valkey, S3-compatibele objectopslag, backend-skelet), datamodel geïmplementeerd, upload→moderatie→publicatie-keten end-to-end werkend (kaal); **huisstijl Jottem ontworpen en vastgesteld** (zie [[#realisatie-huisstijl]])</td><td>stack, datamodel en keten: gereed (augustus 2026; op dev draait MinIO als objectopslag). Merkgids: gereed; vaststelling door de projectgroep: open</td></tr>
<tr><td>oktober</td><td>**Publieksomgeving**: jottem-detailpagina met IIIF-viewer, annoteren met Termennetwerk, kaart met speldjes, huisstijl SAMH, Herkenbaar-integratie, begin- en eindjaar in het uploadformulier</td><td>detailpagina, annoteren, huisstijl SAMH en Herkenbaar: gereed. Kaart met speldjes: niet gestart. Begin- en eindjaar in het formulier: niet gestart. Zoeken met facetten en pand-tijdlijn: uitgesteld</td></tr>
<tr><td>november</td><td>**Open data & toetsing**: IIIF/RSS/RDF-outputs, datasetbeschrijving + Datasetregister-validatie (NDE-compatibel), testronde 1 met SAMH-medewerkers (zie het [plan van aanpak](planvanaanpak-smaakvangouda.html#pva-2-2-werkwijze)), juridische toetsing gestart, alle notificatiemails van de MVP werkend (zie [[#notificaties]])</td><td>open-data-outputs, validatie en aanmelding: gereed. Change Discovery en SPARQL: uit in productie. Mails 1-4 en 10-12: gereed. Mail 5 (moderatiedigest) en mails 6-8 (verwijderverzoeken): niet gestart. Testronde 1 en juridische toetsing: open</td></tr>
<tr><td>december</td><td>**Hardening & livegang**: verwijderverzoeken-flow, [[#realisatie-productie]], testronde 2 met inwoners (op productie), securitytoets, monitoring/back-ups aantoonbaar werkend, mail-afleverbaarheid ingeregeld (SPF/DKIM/DMARC, one-click unsubscribe, zie [[#notificaties-afleverbaarheid]]), DPIA en juridische toetsing afgerond, moderatoren getraind, verzameldag/oproep → **pilot live**</td><td>one-click unsubscribe: gereed. SPF en DKIM voor iotm.nl: gereed; DMARC staat op `p=none`. Monitoring: gereed op dev. Verwijderverzoeken-flow: niet gestart. Overige punten: open</td></tr>
</tbody>
</table>

**Cut-lijn.** Twee onderdelen zijn nog niet gestart en blijven in de MVP: de
verwijderverzoeken-flow (met mails 5-8) en de kaart met speldjes. Ze wegen niet even zwaar:

* De **verwijderverzoeken-flow** is een harde voorwaarde voor livegang. Zonder die flow kan het
    platform een verzoek op grond van de AVG of het portretrecht niet binnen de termijn van
    30 dagen afhandelen.
* De **kaart met speldjes** is dat niet. Is de kaart half december niet aantoonbaar gereed,
    dan gaat de pilot live zonder kaart en volgt de kaart kort daarna. Bezoekers verkennen dan
    via de projectpagina.

## Productie-inrichting ## {#realisatie-productie}

Alles wordt gebouwd en getest op de ontwikkelomgeving (`dev.iotm.nl`). De productieomgeving
wordt **apart en leeg** ingericht; er wordt geen data van dev overgezet. Daarmee hoeven
annotatie-IRI's, JSON-LD-contextlinks en Datasetregister-aanmeldingen niet van het dev-domein
naar het productiedomein gemigreerd te worden. Testronde 2 en het plaatsen van de startset
(20-30 jottems uit de Memorix-beeldbank van SAMH) gebeuren al op productie, vóór de lancering.
Jottems die tijdens testronde 1 op dev met echt SAMH-materiaal zijn gemaakt, worden op
productie opnieuw ingevoerd.

**Eigenaar:** Bob Coret. **Gereed:** vóór testronde 2 (begin december). **Status:** niet gestart.

Checklist (de technische stappen staan in de README van de
[jottem-repo](https://github.com/inside-out-time-machines/jottem), "domeinwissel"):

1. **Server en opslag** - productieserver; externe S3-compatibele objectopslag in de EER,
    met verwerkersovereenkomst; buckets aangemaakt (op dev doet `minio-init` dat, in
    productie niet).
2. **Configuratie** - productie-`.env` met `OMGEVING=productie`, `DEV_AUTH=0`,
    `CHANGE_DISCOVERY=0`, `SPARQL_PUBLIEK=0`, `ALERT_ONTVANGER` (rol-adres),
    `COMPOSE_PROFILES=prod`, lege `SUGGESTIES_URL` (zie [[#verrijking-uploadsuggesties]]),
    `S3_ENDPOINT`/`S3_PUBLIEK`, `SMTP_HOST`/`SMTP_PORT`; vooraf gecontroleerd met
    `docker compose --profile prod config`.
3. **Domeinen** - DNS en TLS voor www, api, auth, iiif, anno en data onder `iotm.nl`
    (zie [[#domains]]); de frontend gebouwd met de productiewaarden.
4. **Inloggen** - Authentik-blueprints toegepast; redirect-URI's bij Google, Microsoft en
    Facebook naar de productie-`auth`-host.
5. **Mail** - productie verstuurt via de bestaande exim-relay (zie [[#notificaties-afleverbaarheid]]),
    buiten het privénet via geauthenticeerde SMTP; getest volgens livegang-criterium 6.
6. **www-overdracht** - `www.iotm.nl` gaat van de huidige website (repo `website`) naar het
    platform; de projectinformatie van de huidige site krijgt een plek.
7. **Open-data-landingspagina** - de hosts in de repo `data` wijzen naar productie.
8. **Inhoud** - organisatie SAMH en het project ingericht volgens het
    [plan van aanpak](planvanaanpak-smaakvangouda.html), startset geplaatst.
9. **Datasetregister** - aanmelding alleen met productie-URL's. Een aanmelding is definitief;
    buiten productie valideert het platform daarom alleen en meldt het niet aan.

## Livegang-criteria ## {#realisatie-criteria}

**Go/no-go.** Bob Coret en de projectleider van SAMH besluiten samen over de livegang, op
basis van de ingevulde tabel hieronder (datum: `[ ] in te vullen`, vóór de geplande
verzameldag). Is een criterium niet gehaald, dan kiezen zij een nieuwe datum; een criterium
laten vallen kan alleen schriftelijk, met reden.

<table class="data">
<thead>
<tr><th>#</th><th>Criterium</th><th>Toets</th><th>Slaagt als</th><th>Eigenaar</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>De kritieke keten werkt (registratie → upload → moderatie → publicatie → annotatie → verwijderverzoek) en de [[#acceptatiecriteria]] van de MVP zijn aangetoond. Buiten scope: GE-4, BE-5 en AP-3 (na de evaluatie) en AP-1 (uit in productie)</td><td>de testscripts van testronde 2 uit het [plan van aanpak](planvanaanpak-smaakvangouda.html) op productie; daarna `python3 -m pytest` (contracttests) en `node tests/e2e/smoke.mjs` tegen productie</td><td>alle testscripts doorlopen zonder open blokkerende bevinding; contracttests en rooktest groen</td><td>platformontwikkelaar</td></tr>
<tr><td>2</td><td>De open data is valide</td><td>IIIF Presentation-validator op een manifest en de projectcollectie (AP-5); "Valideer" van de datasetbeschrijving tegen het Datasetregister (AP-6); de datadump tegen het NDE-schemaprofiel</td><td>geen fouten</td><td>platformontwikkelaar</td></tr>
<tr><td>3</td><td>De juridische documenten voor de pilot zijn getoetst</td><td>toetsing door een jurist van de documenten uit [[#juridisch]] die bij de pilotscope horen; DPIA vastgesteld</td><td>schriftelijk akkoord van de jurist; DPIA door SAMH vastgesteld</td><td>Bob Coret</td></tr>
<tr><td>4</td><td>Moderatie is ingericht</td><td>training met de [handreiking](juridisch/handreiking-moderatie.html); rooster en reactietijd uit het plan van aanpak</td><td>minimaal twee moderatoren van SAMH getraind, elk minstens tien jottems beoordeeld</td><td>projectleider SAMH</td></tr>
<tr><td>5</td><td>Back-up en herstel werken</td><td>hersteltest: de back-up terugzetten in een lege stack, daarna de wislijst afspelen</td><td>hersteld binnen 1 werkdag (RTO); contracttests groen op de herstelde stack; de wislijst is afgespeeld; een testalert is ontvangen</td><td>platformontwikkelaar</td></tr>
<tr><td>6</td><td>Mail komt aan</td><td>SPF, DKIM en DMARC op het verzenddomein; testmail naar een Gmail- en een Outlook.com-adres (zie [[#notificaties-afleverbaarheid]])</td><td>beide in de inbox, niet in spam; DMARC `pass`</td><td>platformontwikkelaar</td></tr>
<tr><td>7</td><td>Productie is ingericht</td><td>de checklist in [[#realisatie-productie]]</td><td>alle punten afgevinkt</td><td>Bob Coret</td></tr>
<tr><td>8</td><td>De securitytoets is afgerond</td><td>de bevindingen uit de securityanalyse in de jottem-repo (`analysis/jottem/ASSESSMENT.md`) elk met een status; `tests/contract/test_afscherming.py` tegen productie; controle dat de API weigert te starten met `DEV_AUTH=1` en `OMGEVING=productie`</td><td>geen open bevinding met hoog risico; middel opgelost of schriftelijk geaccepteerd; afschermingstest groen</td><td>platformontwikkelaar</td></tr>
</tbody>
</table>

De geautomatiseerde ketentest die de systeemarchitectuur beschrijft (Playwright over de hele
keten) volgt na de pilot. Tot die tijd dekken de testscripts uit het plan van aanpak de keten.

## Werkpakketten vóór livegang ## {#realisatie-werkpakketten}

Naast de functionele punten uit de mijlpalentabel (kaart, verwijderverzoeken) vragen de
criteria om deze werkpakketten:

<table class="data">
<thead>
<tr><th>Werkpakket</th><th>Inhoud</th><th>Status</th></tr>
</thead>
<tbody>
<tr><td>Back-ups</td><td>nachtelijks offsite, bewaartermijn 35 dagen: PostgreSQL van platform en Authentik, MongoDB van AnnoRepo, en de originelen in de objectopslag. Fuseki, derivaten en de zoekindex zijn herbouwbaar en gaan niet mee. Alert als de laatste geslaagde back-up ouder is dan 26 uur</td><td>niet gestart</td></tr>
<tr><td>Monitoring in productie</td><td>scrape-configuratie zonder de dev-only MinIO; API en leeftijd van de outbox; health-check op Herkenbaar; opslaggebruik per organisatie met alert; alert-ontvanger uit de configuratie (een rol-adres, geen persoonlijk adres). Grafana-toegang loopt via de Authentik-groep "Platformbeheerders": een bewuste uitzondering op "GebruikerRol leidend", bij een rolwijziging met de hand gelijk te houden</td><td>alert-ontvanger: gereed; overige: niet gestart</td></tr>
<tr><td>Securitytoets</td><td>de bevindingen uit `analysis/jottem/ASSESSMENT.md` doorlopen en per bevinding een status vastleggen</td><td>niet gestart</td></tr>
<tr><td>Uitzetten in productie</td><td>schakelaars voor IIIF Change Discovery met de aggregaten en voor het publieke SPARQL-endpoint (zie [[#realisatie-mvp]]); in productie uit</td><td>gereed</td></tr>
</tbody>
</table>

## Huisstijl Jottem-platform ## {#realisatie-huisstijl}

Naast de huisstijl per organisatiejottem (logo, kleurenpalet, favicon op `Organisatie`) heeft
het **platform zelf** een huisstijl. Die is uitgewerkt in de **merkgids** op
[brand.iotm.nl](https://brand.iotm.nl/), met de projectgroep vast te stellen in de
septembermijlpaal. De merkgids omvat:

* **merkverhaal en tone of voice** - positionering, kernwaarden en schrijfregels
    (heel begrijpelijk, taalniveau B1);
* **logo/woordmerk** - het onderstaande woordmerk met alle varianten (negatief, zwart/wit,
    compacte spraakwolk-O), gebruiksregels en downloadbaar logopack;
* **kleurenpalet en typografie** (Fraunces voor koppen, Albert Sans voor tekst - altijd
    lokaal gehost) als basislaag, waar de organisatiekleuren per organisatiejottem
    óverheen komen;
* **CSS-basis** (design tokens/stylesheet, te downloaden via de merkgids) die deze basislaag
    én de organisatie-overrides draagt, hergebruikt in de e-mailtemplates;
* **vormtaal, beeldgebruik en motion-principes** met live voorbeelden;
* **favicon** van het platform (voor www/design/prototype en als standaard voor organisaties
    zonder eigen favicon);
* **slogan** - gekozen uit de opties in de [[#salespitch]]:
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
CC BY-SA 4.0 voor de ontwerpdocumenten (design-repo) en CC BY 4.0 voor de overige
documentatie (prototype, website, brand).
