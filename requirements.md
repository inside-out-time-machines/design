# Requirements # {#requirements}

## Functionele requirements ## {#functional-requirements}

* inloggen door gebruikers moet zeer laagdrempelig zijn, dus inclusief social login
* inloggen door beheerders moet zijn te beveiligen via 2FA
* duurzame link per gepubliceerde jottem, in HTML weergave (die IIIF afbeelding / metadata / annotaties toont) en RDF (volgens schema.org AP NDE, annotaties via API) op basis van content-negotiation; het koppelen van een ARK (met objectname op basis van NOID of UUID) aan deze link is uitgesteld naar een latere fase (zie [[#keuze-open-vragen]])
* elke jottem behoort tot precies één project (een campagne op organisatieniveau, bijv. *Smaak van Gouda*); elke organisatie heeft minstens één project en elk project draagt een eigen datasetbeschrijving
* elke jottem kan een materiaaltype/genre dragen (bijv. foto, menukaart, advertentie, folder, krantenartikel, vergunning), zodat divers bronmateriaal naast foto's kan worden verzameld en gefilterd
* elke jottem kan koppelingen naar externe archiefbronnen bevatten (label + URI)

## Niet-functionele requirements ## {#non-functional-requirements}

*Onderstaande waarden zijn richtwaarden (concept), vast te stellen door de projectgroep.*

* taal: de interface en redactionele content zijn Nederlandstalig
* toegankelijkheid: de publieke site voldoet aan WCAG 2.2 niveau AA
* browsers: de laatste twee versies van evergreen browsers (Chrome, Firefox, Safari, Edge) op desktop en mobiel (iOS Safari, Android Chrome); de site is responsive
* performance: publiekspagina's laden binnen 2 seconden (LCP); IIIF-tiles en manifests worden uit cache geserveerd; zoekresultaten binnen 1 seconde
* capaciteit: eerste jaar orde van grootte 10.000 jottems verdeeld over 4 organisaties; uploads tot 50 MB per bestand
* beschikbaarheid: richtwaarde 99,5% per maand; gepland onderhoud wordt aangekondigd
* beveiliging: OWASP Top 10 wordt aantoonbaar afgedekt, TLS op alle verbindingen, rate limiting op publieke endpoints, verplichte 2FA voor beheer- en moderatorrollen
* privacy: verwijderverzoeken worden binnen 30 dagen afgehandeld, inclusief depublicatie en cache-purge
* back-up & herstel: nachtelijkse offsite back-ups; RPO 24 uur, RTO 1 werkdag; jaarlijkse hersteltest
* duurzaamheid/exit: periodieke publieke datadumps en een exportstrategie, zie [[#keuze-infra]]
* monitoring: uptime-, logging- en alertvoorzieningen conform de [systeemarchitectuur](systeemarchitectuur/architectuur.html)

## Standaarden & API's ## {#standards}
* [Internet Archive](https://archive.org/developers/index-apis.html)
* [Schema.org AP NDE](https://docs.nde.nl/schema-profile/)
* [Datasetbeschrijvingen](https://docs.nde.nl/requirements-datasets/)
* [RSS](https://www.rssboard.org/rss-specification)
* [W3C Web Annotations](https://www.w3.org/TR/annotation-model/)
* [W3C Web Annotation Protocol](https://www.w3.org/TR/annotation-protocol/)
* [IIIF Image API](https://iiif.io/api/image/3.0/) (info.json)
* [IIIF Presentation API](https://iiif.io/api/presentation/3.0/) (manifest/collection)
* [IIIF Change Discovery](https://iiif.io/api/discovery/1.0/)
* [Miifi API](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/nationalarchives/miiify/main/doc/swagger.yml)
* [Herkenbaar API](https://github.com/inside-out-time-machines/herkenbaar-api) (eigen dienst: detectie van herkenbare personen op afbeeldingen)
* [NDE Termennetwerk GraphQL API](https://docs.nde.nl/services/network-of-terms/graphql) (term-lookups; genres via de [Cultuurhistorische Thesaurus](https://data.cultureelerfgoed.nl/term/id/cht))
* geo-annotaties (plek fotograaf, zichtveld, locatie) worden vastgelegd als WKT/GeoJSON
* de publieke weergave kan gekoppeld worden aan een externe kaart-/tijdmachine (bijv. de [Gouda Tijdmachine](https://www.goudatijdmachine.nl)) om door plaats én tijd te navigeren

## Privacy, authenticiteit & auteursrecht ## {#privacy-authenticity-copyright}

* persoonsgegevens worden verwerkt conform de AVG
* recente foto's van herkenbare personen worden alleen gepubliceerd met toestemming
* elke upload wordt bij binnenkomst automatisch gecontroleerd op herkenbare personen via de [Herkenbaar API](https://github.com/inside-out-time-machines/herkenbaar-api) (i.v.m. portretrecht); bij herkenbare personen wordt de uploader direct om een toestemmingsverklaring gevraagd en ziet de moderator het detectiesignaal (ja/nee + betrouwbaarheid) bij de kwaliteitscontrole; de detectie draait volledig op de eigen server, beelden verlaten het platform niet
* inzenders kunnen verzoeken om verwijdering van hun materiaal
* bijdragen worden waar mogelijk voorzien van bronvermelding
* persoonlijke herinneringen worden onderscheiden van historisch verifieerbare feiten
* het auteursrecht blijft bij de inzender; door inzending wordt toestemming gegeven voor publicatie binnen het project, hergebruik door derden alleen onder de aangegeven voorwaarden

## (Sub)domeinen ## {#domains}

* [www.iotm.nl](https://www.iotm.nl) — publieksfrontend
* [api.iotm.nl](https://api.iotm.nl) — publieke API (en beheer-API)
* [auth.iotm.nl](https://auth.iotm.nl) — identity provider
* [iiif.iotm.nl](https://iiif.iotm.nl) — IIIF Image API
* [anno.iotm.nl](https://anno.iotm.nl) — W3C annotatieserver
* [data.iotm.nl](https://data.iotm.nl) — RDF, SPARQL en datadumps
* [status.iotm.nl](https://status.iotm.nl) — status en monitoring
* ark.iotm.nl — gereserveerd voor de ARK-resolver (latere fase, zie [[#keuze-open-vragen]])
