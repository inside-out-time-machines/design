# Keuze oplossingsrichting # {#keuze-oplossingsrichting}

Dit document legt de gekozen oplossingsrichting en technologiestack vast en is het resultaat van
de deelactiviteit "Keuze oplossingsrichting" uit het [[#activiteitenplan]]. Het bouwt voort op de
[analyse van vier infrastructuurrichtingen](infra/analyse.html) en de
[systeemarchitectuur](systeemarchitectuur/architectuur.html).
*Status: concept, augustus 2026 - vast te stellen door de projectgroep.*

## Infrastructuurrichting: alles op de Jottem-server ## {#keuze-infra}

Van de vier onderzochte richtingen (Wikimedia, Internet Archive, e-Depot, eigen server) is gekozen
voor **richting 4: alles op de Jottem-server** - afbeeldingen, metadata en annotaties in één
geïntegreerd systeem in eigen beheer.

**Onderbouwing:**

* maximale functionaliteit en laagste drempel voor de participatieve kern (uploaden, annoteren, reageren);
* volledige regie over het rechtenmodel: auteursrecht blijft bij de inzender, hergebruik onder aangegeven voorwaarden;
* AVG: verwijderverzoeken zijn eenvoudig en volledig uitvoerbaar; dataresidentie in de EU;
* geen afhankelijkheid van acceptatiecriteria of continuïteit van externe partijen.

**Beheersmaatregelen** - de analyse benoemt duurzaamheid als zwakte van deze richting; die wordt
als volgt ondervangen:

* een expliciete **exit- en exportstrategie**: nachtelijkse offsite back-ups, periodieke publieke
    datadumps (RDF plus originelen) en een jaarlijkse hersteltest van de export;
* afspraken in de [samenwerkingsovereenkomst](juridisch/samenwerkingsovereenkomst.html) over
    voortzetting of overdracht van data en diensten bij einde van het project;
* de **gelaagde aanpak blijft als uitbreiding mogelijk**: een externe preserveringskopie
    (Internet Archive/IAE of e-Depot) en een Wikimedia-doorzetting van de vrij-gelicentieerde
    subset kunnen in een latere fase worden toegevoegd; de moderatiestap blijft daarvoor het
    natuurlijke doorzetmoment. De Internet Archive-integratie maakt daarmee **geen deel uit van de
    MVP**.

## Besliste openstaande ontwerpvragen ## {#keuze-open-vragen}

**ARK: uitgesteld naar een latere fase.** De MVP mint geen ARK's. Elke gepubliceerde jottem krijgt
een duurzame platform-URL (met content negotiation naar HTML en RDF, zoals in
[[#functional-requirements]]). Het subdomein `ark.iotm.nl` blijft gereserveerd; een NAAN-aanvraag,
minter en resolver volgen zodra ARK wordt geactiveerd. URL's worden zo gekozen dat latere
ARK-koppeling zonder linkbreuk kan.

**Annotaties: bewerken en verwijderen door de annoteerder zelf.** Annoteerders kunnen hun eigen
annotaties bewerken én verwijderen. De versiegeschiedenis blijft bewaard in de annotatieserver
(miiify, git-gebaseerde backend), zodat herinneringen, aanvullingen en correcties herleidbaar
blijven.

## Technologiestack ## {#keuze-stack}

Per component is uit de in de [systeemarchitectuur](systeemarchitectuur/architectuur.html)
genoemde kandidaten de volgende keuze gemaakt:

<table class="data">
<thead>
<tr><th>Component</th><th>Keuze</th></tr>
</thead>
<tbody>
<tr><td>Webfrontend (`www.iotm.nl`)</td><td>**Next.js** (React) met OpenSeadragon/Mirador (IIIF-viewer), Annotorious (annoteren) en MapLibre GL (kaart)</td></tr>
<tr><td>Backend-API (`api.iotm.nl`)</td><td>**FastAPI** (Python) met iiif-prezi3</td></tr>
<tr><td>Async workers</td><td>**Celery** met Valkey als broker</td></tr>
<tr><td>Identity provider (`auth.iotm.nl`)</td><td>**Authentik** (OIDC, social login, 2FA via TOTP of passkey/WebAuthn) - *afwijkend van de architectuursuggestie (Keycloak): lichter in beheer bij gelijkwaardige functionaliteit (identity brokering, 2FA-afdwinging per rol, uitnodigingsflows)*</td></tr>
<tr><td>IIIF Image API (`iiif.iotm.nl`)</td><td>**Cantaloupe** achter **Varnish**</td></tr>
<tr><td>Annotatieserver (`anno.iotm.nl`)</td><td>**miiify**</td></tr>
<tr><td>RDF-publicatie (`data.iotm.nl`)</td><td>**Apache Jena Fuseki**</td></tr>
<tr><td>Zoekmachine</td><td>**Elasticsearch**</td></tr>
<tr><td>Relationele database</td><td>**PostgreSQL**</td></tr>
<tr><td>Cache en taakwachtrij</td><td>**Valkey** - *afwijkend van de architectuursuggestie (Redis): drop-in compatibel, maar volledig open source (Linux Foundation)*</td></tr>
<tr><td>Mediaopslag (S3)</td><td>**Externe Object Storage (S3)** - *herziene keuze (aug 2026): extern in plaats van zelf-gehost MinIO; geen eigen opslagbeheer en de opslag groeit mee zonder serverwijziging. Alle componenten spreken S3, dus MinIO blijft het zelf-gehoste alternatief; de leverancierskeuze is een exploitatiebesluit en blijft buiten het ontwerp*</td></tr>
<tr><td>Detectie herkenbare personen</td><td>**[Herkenbaar API](https://github.com/inside-out-time-machines/herkenbaar-api)** (eigen dienst: FastAPI + YOLO-pose), interne container, synchroon aangeroepen door de backend bij upload</td></tr>
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
* **Monorepo `jottem`.** Backend, frontend, workers, docker-compose en contracttests leven in
    één repository ([inside-out-time-machines/jottem](https://github.com/inside-out-time-machines/jottem)):
    API-contractwijzigingen zijn atomair, één CI en issue-tracker. De Herkenbaar API blijft
    bewust een aparte repo - de licentiegrens valt samen met de repogrens. Secrets komen
    nooit in git (.env buiten de repo); de deploy-configuratie zelf is publiek.
* **Documentatie en ontwerpen: CC BY 4.0.** De repo's design, prototype en website krijgen
    een [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)-licentie - hergebruik met
    naamsvermelding, passend bij de kennisdelingsbelofte uit het [[#activiteitenplan]].

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
