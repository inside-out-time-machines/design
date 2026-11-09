# Keuze oplossingsrichting # {#keuze-oplossingsrichting}

Dit document legt de gekozen oplossingsrichting en technologiestack vast en is het resultaat van
de deelactiviteit "Keuze oplossingsrichting" uit het [[#activiteitenplan]]. Het bouwt voort op de
[analyse van vier infrastructuurrichtingen](infra/analyse.html) en de
[systeemarchitectuur](systeemarchitectuur/architectuur.html).
*Status: concept, augustus 2026 - vast te stellen door de projectgroep.*

## Infrastructuurrichting: alles op de Jottem-server ## {#keuze-infra}

De [infra-analyse](infra/analyse.html) vergeleek vier richtingen:

1. **Wikimedia Commons en Wikidata** als opslag: groot bereik, maar alleen vrije licenties en
    weinig regie over moderatie en privacy;
2. het **Internet Archive** (met Internet Archive Europe, **IAE**, de Amsterdamse Europese
    tak): duurzame opslag met een IIIF-dienst, maar opslag buiten eigen beheer en deels in de VS;
3. een **e-Depot** van een erfgoedinstelling: duurzaam, maar ingericht op archiefstukken, niet
    op participatie en annoteren;
4. **alles op de Jottem-server**: alle functies en regie in eigen beheer, maar duurzaamheid
    hangt af van het eigen beheer.

Gekozen is **richting 4: alles op de Jottem-server** - afbeeldingen, metadata en annotaties in één
geïntegreerd systeem in eigen beheer.

**Afwijking van het advies.** De analyse adviseerde een *gelaagde aanpak*: de Jottem-server als
participatielaag, met daaronder minstens één duurzame externe laag (Internet Archive/IAE of een
e-Depot). Voor de pilot wijken we daar bewust van af: de externe laag kost koppelwerk,
doorgifte-afspraken en toestemming bij elke bijdrage, terwijl de pilot eerst moet aantonen dat
de participatie werkt. De exit- en exportstrategie hieronder vangt de duurzaamheid voorlopig op.
De externe laag wordt heroverwogen bij de evaluatie van de pilot, en in elk geval vóór de uitrol
naar een tweede tijdmachine.

**Onderbouwing:**

* maximale functionaliteit en laagste drempel voor de participatieve kern (uploaden, annoteren, reageren);
* volledige regie over het rechtenmodel: auteursrecht blijft bij de inzender, hergebruik onder aangegeven voorwaarden;
* AVG: een verwijderverzoek is volledig uit te voeren in eigen beheer (wissen van origineel,
    afgeleiden, metadata en annotaties, en binnen de bewaartermijn van 35 dagen ook uit de
    back-ups; zie [[#privacy-authenticity-copyright]]); dataresidentie in de EU;
* geen afhankelijkheid van acceptatiecriteria of continuïteit van externe partijen.

**Beheersmaatregelen** - de analyse benoemt duurzaamheid als zwakte van deze richting; die wordt
als volgt ondervangen:

* een expliciete **exit- en exportstrategie**: nachtelijkse offsite back-ups, periodieke publieke
    datadumps (alleen RDF; de originelen zitten in de offsite back-ups en, in fase 2, in de
    e-depot-export) en een jaarlijkse hersteltest van de export;
* afspraken in de [samenwerkingsovereenkomst](juridisch/samenwerkingsovereenkomst.html) over
    voortzetting of overdracht van data en diensten bij einde van het project;
* de **gelaagde aanpak blijft als uitbreiding mogelijk**: een externe preserveringskopie
    (Internet Archive/IAE of e-Depot) en een Wikimedia-doorzetting van de vrij-gelicentieerde
    subset kunnen in een latere fase worden toegevoegd; de moderatiestap blijft daarvoor het
    natuurlijke doorzetmoment. De Internet Archive-integratie maakt daarmee **geen deel uit van de
    MVP**.

## Capaciteit en kosten ## {#keuze-capaciteit-kosten}

**Capaciteit.** Alle diensten draaien op één server. De zwaarste stap per upload is de
Herkenbaar-check (een YOLO-model op de processor, enkele seconden per foto); bij een
verzameldag met veel gelijktijdige uploads lopen die checks na elkaar en wordt het
uploadformulier trager, niet onbruikbaar, want de check is een hulpsignaal. De
suggestiedienst staat bij de livegang uit (zie [[#verrijking-uploadsuggesties]]) en vraagt
dus geen capaciteit. Bij aanhoudende drukte is de eerste maatregel de Herkenbaar-check naar
de worker verplaatsen.

**Kosten.** De lopende kosten voor de pilot, per jaar (bedragen nog in te vullen):

<table class="data">
<thead>
<tr><th>Post</th><th>Toelichting</th><th>Per jaar</th></tr>
</thead>
<tbody>
<tr><td>Server</td><td>de productieserver met alle diensten</td><td>`[ ]`</td></tr>
<tr><td>Objectopslag</td><td>externe S3 in de EER, originelen en derivaten</td><td>`[ ]`</td></tr>
<tr><td>Back-upopslag</td><td>offsite, 35 dagen bewaartermijn</td><td>`[ ]`</td></tr>
<tr><td>Domein en certificaten</td><td>iotm.nl; certificaten via Let's Encrypt</td><td>`[ ]`</td></tr>
<tr><td>Mail</td><td>de bestaande exim-relay</td><td>`[ ]`</td></tr>
<tr><td>Beheer</td><td>uren voor onderhoud, updates en monitoring</td><td>`[ ]`</td></tr>
</tbody>
</table>

## Besliste openstaande ontwerpvragen ## {#keuze-open-vragen}

**ARK: uitgesteld naar een latere fase.** De MVP mint geen ARK's. Elke gepubliceerde jottem krijgt
een duurzame platform-URL (met content negotiation naar HTML en RDF, zoals in
[[#functional-requirements]]). Het subdomein `ark.iotm.nl` blijft gereserveerd; een NAAN-aanvraag,
minter en resolver volgen zodra ARK wordt geactiveerd. URL's worden zo gekozen dat latere
ARK-koppeling zonder linkbreuk kan.

**Annotaties: bewerken en verwijderen door de annoteerder zelf.** Annoteerders kunnen hun eigen
annotaties bewerken én verwijderen. De versiegeschiedenis wordt met volledige payload vastgelegd in het
`Gebeurtenislog` van het platform, zodat herinneringen, aanvullingen en correcties herleidbaar
blijven. Die volledige payloads blijven 12 maanden bewaard; bij het wissen van een jottem
verdwijnen ze direct.

## Technologiestack ## {#keuze-stack}

Per component is uit de in de [systeemarchitectuur](systeemarchitectuur/architectuur.html)
genoemde kandidaten de volgende keuze gemaakt:

<table class="data">
<thead>
<tr><th>Component</th><th>Keuze</th></tr>
</thead>
<tbody>
<tr><td>Webfrontend (`www.iotm.nl`)</td><td>**Next.js** (React) met OpenSeadragon/Mirador (IIIF-viewer), Annotorious (annoteren), MapLibre GL (kaart) en Leaflet met Leaflet.GeotagPhoto (invoer van het zichtveld)</td></tr>
<tr><td>Backend-API (`api.iotm.nl`)</td><td>**FastAPI** (Python) met iiif-prezi3</td></tr>
<tr><td>Async workers</td><td>**Celery** met Valkey als broker</td></tr>
<tr><td>Identity provider (`auth.iotm.nl`)</td><td>**Authentik** (OIDC, social login, 2FA via TOTP of passkey/WebAuthn) - *afwijkend van de architectuursuggestie (Keycloak): lichter in beheer bij gelijkwaardige functionaliteit (identity brokering, 2FA-afdwinging per rol, uitnodigingsflows)*</td></tr>
<tr><td>IIIF Image API (`iiif.iotm.nl`)</td><td>**Cantaloupe** achter **Varnish**</td></tr>
<tr><td>Annotatieserver (`anno.iotm.nl`)</td><td>**AnnoRepo** (KNAW HuC) met MongoDB - *afwijkend van de architectuursuggestie (miiify): dat is read-only geworden, zie de [afweging in de systeemarchitectuur](systeemarchitectuur/architectuur.html#annotaties-annorepo)*</td></tr>
<tr><td>RDF-publicatie (`data.iotm.nl`)</td><td>**Apache Jena Fuseki**</td></tr>
<tr><td>Zoekmachine</td><td>**Elasticsearch**</td></tr>
<tr><td>Relationele database</td><td>**PostgreSQL**</td></tr>
<tr><td>Cache en taakwachtrij</td><td>**Valkey** - *afwijkend van de architectuursuggestie (Redis): drop-in compatibel, maar volledig open source (Linux Foundation)*</td></tr>
<tr><td>Mediaopslag (S3)</td><td>**Externe Object Storage (S3)** - *herziene keuze (aug 2026): extern in plaats van zelf-gehost MinIO; geen eigen opslagbeheer en de opslag groeit mee zonder serverwijziging. Alle componenten spreken S3, dus MinIO blijft het zelf-gehoste alternatief; de leverancierskeuze is een exploitatiebesluit en blijft buiten het ontwerp*</td></tr>
<tr><td>Suggesties bij het uploaden</td><td>**Suggesties API** (eigen dienst: FastAPI + Florence-2 + SigLIP 2), interne container, aangeroepen tussen de twee stappen van het uploadformulier; EUPL-1.2 want de modellen zijn permissief gelicentieerd</td></tr>
<tr><td>Detectie herkenbare personen</td><td>[**Herkenbaar API**](https://github.com/inside-out-time-machines/herkenbaar-api) (eigen dienst: FastAPI + YOLO-pose), interne container, synchroon aangeroepen door de backend bij upload</td></tr>
<tr><td>Reverse proxy, TLS</td><td>**Traefik**</td></tr>
<tr><td>Monitoring, logging, alerting</td><td>**Prometheus, Grafana, Loki, Alertmanager** (conform systeemarchitectuur)</td></tr>
<tr><td>ARK-resolver (`ark.iotm.nl`)</td><td>*vervalt in de MVP* - latere fase, zie [[#keuze-open-vragen]]</td></tr>
</tbody>
</table>

## Open source: licenties en repostructuur ## {#keuze-opensource}

De salespitch belooft open source; de volgende besluiten maken dat concreet (augustus 2026):

* **Platformcode: EUPL-1.2.** De backend, frontend en workers verschijnen onder de
    [European Union Public Licence 1.2](https://eupl.eu/) - rechtsgeldig in het Nederlands,
    copyleft (verbeteringen blijven open) zonder de afschrikkende werking van AGPL, en de
    conventie in het NDE-ecosysteem: het Datasetregister en het Termennetwerk waar Jottem op
    aansluit zijn zelf EUPL-1.2.
* **Herkenbaar API: AGPL-3.0.** De dienst gebruikt ultralytics/YOLO (AGPL-3.0), waardoor de
    eerdere Apache-2.0-licentie strijdig was; de repo is omgezet naar AGPL-3.0. Doordat het
    een losse netwerkdienst is, stopt de AGPL bij de API-grens: het platform zelf blijft
    EUPL-1.2.
* <strong>Monorepo `jottem`.</strong> Backend, frontend, workers, docker-compose en contracttests leven in
    één repository ([inside-out-time-machines/jottem](https://github.com/inside-out-time-machines/jottem)):
    API-contractwijzigingen zijn atomair, één CI en issue-tracker. De Herkenbaar API blijft
    bewust een aparte repo - de licentiegrens valt samen met de repogrens. Secrets komen
    nooit in git (.env buiten de repo); de deploy-configuratie zelf is publiek.
* **Ontwerpdocumenten: CC BY-SA 4.0; overige documentatie: CC BY 4.0.** De design-repo
    staat onder [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.nl)
    *(aangescherpt, augustus 2026)*: hergebruik met naamsvermelding én share-alike, zodat
    bewerkingen van het ontwerp onder dezelfde open licentie beschikbaar blijven - dezelfde
    copyleft-gedachte als de EUPL voor de platformcode. De repo's prototype, website en
    brand houden [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.nl) -
    hergebruik met naamsvermelding, passend bij de kennisdelingsbelofte uit het
    [[#activiteitenplan]].

Samengevat, het licentiebeeld van het Jottem-ecosysteem:

<table class="data">
<thead>
<tr><th>Onderdeel</th><th>Licentie</th></tr>
</thead>
<tbody>
<tr><td>Platformcode ([jottem](https://github.com/inside-out-time-machines/jottem))</td><td>[EUPL-1.2](https://eupl.eu/1.2/nl/)</td></tr>
<tr><td>[Herkenbaar API](https://github.com/inside-out-time-machines/herkenbaar-api)</td><td>[AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)</td></tr>
<tr><td>Ontwerpdocumenten ([design](https://github.com/inside-out-time-machines/design))</td><td>[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.nl)</td></tr>
<tr><td>[Prototype](https://github.com/inside-out-time-machines/prototype), [website](https://github.com/inside-out-time-machines/website) en [merkgids](https://github.com/inside-out-time-machines/brand)</td><td>[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.nl)</td></tr>
<tr><td>Lettertypes Fraunces en Albert Sans (huisstijl)</td><td>[SIL OFL 1.1](https://openfontlicense.org/)</td></tr>
</tbody>
</table>

## Consequenties voor de ontwerpdocumenten ## {#keuze-consequenties}

* [[#functional-requirements]]: het ARK-requirement is gemarkeerd als latere fase; de
    (sub)domeinenlijst is uitgebreid en gecorrigeerd; niet-functionele requirements zijn toegevoegd.
* [ERD](data-architectuur/data-architectuur.html#erd-diagram): moderatiestatus en afkeurreden op Media, rollen via een aparte koppeltabel
    (meerdere rollen per gebruiker mogelijk), projecten (voorheen "albums") als campagnes op
    organisatieniveau, huisstijlvelden op Organisatie.
* [[#usecases]]: publicatieflow bij goedkeuring aangepast (duurzame platform-URL; ARK en externe
    preserveringskopie in latere fase); annoteerders kunnen eigen annotaties bewerken en verwijderen.
* [API-beschrijvingen](data-architectuur/data-architectuur.html#api-beschrijving): gesplitst in een publieke lees-API (`openapi.yaml`) en een beheer-API
    (`openapi-beheer.yaml`).
* [Systeemarchitectuur](systeemarchitectuur/architectuur.html): de Internet Archive-worker en de
    ARK-componenten behoren niet tot de MVP-scope. De architectuur is bijgewerkt naar de gekozen
    Authentik en Valkey, inclusief het autorisatiebesluit: de database (`GebruikerRol`) is de
    leidende bron voor rollen, Authentik doet uitsluitend authenticatie.
