# Requirements # {#requirements}

## Functionele requirements ## {#functional-requirements}

* inloggen door gebruikers moet zeer laagdrempelig zijn, dus inclusief social login
* inloggen door platformbeheerders, organisatiebeheerders en moderatoren vereist 2FA (TOTP) of een passkey
* duurzame link per gepubliceerde jottem, in HTML weergave (die IIIF afbeelding / metadata / annotaties toont) en RDF (volgens schema.org AP NDE, annotaties via API) op basis van content-negotiation; het koppelen van een ARK (met objectname op basis van NOID of UUID) aan deze link is uitgesteld naar een latere fase (zie [[#keuze-open-vragen]])
* elke jottem behoort tot precies één project (een campagne op organisatieniveau, bijv. *Smaak van Gouda*); elke organisatie heeft minstens één project en elk project draagt een eigen datasetbeschrijving
* elke jottem heeft een **genre** uit een vaste lijst: foto, menukaart, advertentie, folder, krantenartikel, vergunning, overig (audio volgt in fase 2), zodat divers bronmateriaal naast foto's kan worden verzameld en gefilterd; waar mogelijk met een term-URI uit de CHT of de AAT. "Categorie" in de suggestiedienst is hetzelfde veld
* het uploadformulier loopt in twee stappen (eerst de foto, dan de gegevens); bij een
    permalink uit een beeldbank worden titel, beschrijving, datering en vervaardiger
    overgenomen uit het IIIF-manifest, en bij een eigen foto stelt het platform titel,
    categorie en steekwoorden voor; suggesties worden altijd door de inzender bevestigd
    en zijn nooit blokkerend (zie [[#verrijking-uploadsuggesties]])
* elke jottem kan koppelingen naar externe archiefbronnen bevatten (label + URI)
* twee jottems binnen hetzelfde project kunnen aan elkaar worden gekoppeld wanneer ze
    hetzelfde object tonen (andere periode of andere hoek); de koppeling is bij beide
    jottems zichtbaar en komt terug in de open data (zie [[#verrijking-zelfde-object]])
* elke gepubliceerde jottem heeft één Delen-knop die het deelmenu van het apparaat opent (Web Share API: sociale media, e-mail, link kopiëren); kan de browser dat niet, dan kopieert de knop de link naar het klembord. De HTML-weergave bevat de juiste Open Graph-metadata (`og:title`, `og:description`, `og:image`, `og:url`), zodat een gedeelde link een nette preview toont
* elke annotatie en reactie is te rapporteren (spam, reclame, ongepast), ook zonder in te loggen; meldingen komen in de moderatieomgeving van de organisatie en de afhandeling wordt gelogd
* ondersteunde bestandstypen in de MVP: JPG, PNG en TIFF; PDF en audio (met bijbehorende conversiepipeline) volgen in fase 2
* bij het uploaden van een eigen bestand of cameraopname bevestigt de uploader de licentie van het project; die wordt op de jottem vastgelegd. Bij een beeldbank-permalink is het materiaal werk van de bronorganisatie: de uploader bevestigt dan geen licentie en de rechten komen uit het IIIF-manifest (`rights`, met `requiredStatement` als rechtenvermelding)
* op apparaten met een camera (met name smartphones) biedt het uploadformulier naast bestandskeuze de mogelijkheid om **direct een foto te maken** met de camera; de aanwezigheid van een camera wordt gedetecteerd en zonder camera verschijnt alleen de bestandskeuze
* naast bestand en camera accepteert het uploadformulier een beeldbank-permalink (herleid tot IIIF Manifest of info.json), uitsluitend van beeldbanken op een ingestelde lijst van erfgoedinstellingen (te beginnen met Memorix/SAMH). Beeldbankmateriaal wordt alleen verwezen, niet gekopieerd, en doorloopt dezelfde Herkenbaar-check en moderatie. Een losse foto-URL van een willekeurige website wordt niet geaccepteerd: zo'n beeld kan na de moderatie ongemerkt worden vervangen of verdwijnen. Een verwezen jottem zit niet als origineel in de datadumps, en het verwijderen van het bronbeeld is een taak van de bronorganisatie; het platform depubliceert alleen de jottem
* het platform haalt externe URL's alleen server-side op met SSRF-bescherming: alleen http(s), geen private, loopback-, link-local- of metadata-adressen, elke redirect opnieuw gecontroleerd, en generieke foutmeldingen
* de organisatiebeheerder stelt per project in welke van de drie uploadwijzen (bestand kiezen, foto maken met de camera, beeldbank-permalink) actief zijn, met altijd minstens één actieve wijze (standaard: alle drie); het uploadformulier toont alleen de actieve wijzen en de server dwingt de instelling bij het indienen af
* een project is openbaar (standaard) of besloten; bij een besloten project toont de webapplicatie de jottems, de jottem-pagina's en de widgets alleen aan ingelogde leden (per project uitgenodigd door de organisatiebeheerder) en aan beheerders en moderatoren van de organisatie, terwijl de projectinformatie leesbaar blijft en de open data van het project (datasetbeschrijving, RDF-dump, IIIF, RSS, activity stream, SPARQL) onveranderd openbaar is; dat laatste is een bewuste keuze: besloten beperkt de deelnemerskring, niet het hergebruik van wat is gepubliceerd
* uploaden gaat altijd via een project (de knoppen op de startpagina en de projectpagina's): het project volgt uit de pagina waarvandaan het uploadformulier wordt geopend, het formulier zelf bevat geen projectkeuze; zonder projectkeuze leidt de uploadpagina terug naar de startpagina met het overzicht van de lopende projecten en het hoofdmenu bevat daarom geen aparte uploadlink
* de uploader prikt de locatie als speld op de kaart (coördinaten); begin- en eindjaar (bij Smaak van Gouda: opening en sluiting van de zaak) zijn metadata

## Niet-functionele requirements ## {#non-functional-requirements}

*Onderstaande waarden zijn richtwaarden (concept), vast te stellen door de projectgroep.*

* taal: de interface en redactionele content zijn Nederlandstalig
* toegankelijkheid: de publieke site voldoet aan WCAG 2.2 niveau AA. Elke sleepinteractie heeft een alternatief zonder slepen (WCAG 2.5.7): de speld zet je ook met een tik, een vlak tekenen kan ook als annotatie op de hele jottem, en kijkrichting en beeldhoek van het zichtveld zijn ook als getal in te vullen
* browsers: de laatste twee versies van evergreen browsers (Chrome, Firefox, Safari, Edge) op desktop en mobiel (iOS Safari, Android Chrome); de site is responsive
* performance: publiekspagina's laden binnen 2 seconden (LCP); IIIF-tiles en manifests worden uit cache geserveerd; zoekresultaten binnen 1 seconde
* capaciteit: eerste jaar orde van grootte 10.000 jottems verdeeld over 4 organisaties; uploads tot 50 MB per bestand; opslag- en verwerkingsgebruik per organisatie wordt gemonitord met alerts (harde quota per organisatie in een latere fase)
* beschikbaarheid: richtwaarde 99% per kalenderjaar, gelijk aan de [SLA-bijlage](juridisch/sla-bijlage.html); gepland onderhoud wordt aangekondigd. Met één server en een hersteltijd (RTO) van één werkdag is meer niet waar te maken; een warme standby is voor de pilot niet nodig
* beveiliging: OWASP Top 10 wordt aantoonbaar afgedekt, TLS op alle verbindingen, rate limiting op publieke endpoints, verplichte 2FA (TOTP of passkey) voor beheer- en moderatorrollen; een wachtwoordreset voor een onbekend e-mailadres is niet te onderscheiden van een bekend adres (altijd dezelfde neutrale boodschap, geen accountenumeratie)
* mail-afleverbaarheid: SPF, DKIM en DMARC (met alignment) zijn ingeregeld op het verzenddomein; attenderingsmails dragen one-click unsubscribe-headers (RFC 8058) naast de uitschakellink; zie [[#notificaties-afleverbaarheid]] voor het volledige pakket (reverse DNS, bouncebeheer, reputatiemonitoring)
* privacy: verwijderverzoeken worden binnen 30 dagen afgehandeld, inclusief depublicatie en cache-purge; volledige payloads in het Gebeurtenislog worden 12 maanden bewaard, daarna blijven alleen type, tijdstip en id's over
* back-up & herstel: nachtelijkse offsite back-ups met een vaste bewaartermijn van 35 dagen (zo is een gewiste jottem binnen 35 dagen uit elke kopie verdwenen); RPO 24 uur, RTO 1 werkdag; jaarlijkse hersteltest, inclusief het afspelen van de wislijst
* objectopslag: de externe S3-aanbieder verwerkt de data in de EER, onder een verwerkersovereenkomst
* duurzaamheid/exit: periodieke publieke datadumps en een exportstrategie, zie [[#keuze-infra]]
* monitoring: uptime-, logging- en alertvoorzieningen conform de [systeemarchitectuur](systeemarchitectuur/architectuur.html)

## Standaarden & API's ## {#standards}
* [Internet Archive](https://archive.org/developers/index-apis.html) *(latere fase, niet in de MVP)*
* [Schema.org AP NDE](https://docs.nde.nl/schema-profile/)
* [Datasetbeschrijvingen](https://docs.nde.nl/requirements-datasets/)
* [RSS](https://www.rssboard.org/rss-specification)
* [W3C Web Annotations](https://www.w3.org/TR/annotation-model/)
* [W3C Web Annotation Protocol](https://www.w3.org/TR/annotation-protocol/)
* [IIIF Image API](https://iiif.io/api/image/3.0/) (info.json)
* [IIIF Presentation API](https://iiif.io/api/presentation/3.0/) (manifest/collection)
* [IIIF Change Discovery](https://iiif.io/api/discovery/1.0/)
* [AnnoRepo API](https://github.com/knaw-huc/annorepo/blob/main/docs/api-usage.md) (W3C Web Annotation Protocol-server)
* [Herkenbaar API](https://github.com/inside-out-time-machines/herkenbaar-api) (eigen dienst: detectie van herkenbare personen op afbeeldingen)
* [NDE Termennetwerk GraphQL API](https://docs.nde.nl/services/network-of-terms/graphql) (term-lookups; genres via de [Cultuurhistorische Thesaurus](https://data.cultureelerfgoed.nl/term/id/cht))
* geo-annotaties (plek fotograaf, zichtveld, locatie) worden vastgelegd als GeoJSON
* de publieke weergave kan gekoppeld worden aan een externe kaart-/tijdmachine (bijv. de [Gouda Tijdmachine](https://www.goudatijdmachine.nl)) om door plaats én tijd te navigeren

## Privacy, authenticiteit & auteursrecht ## {#privacy-authenticity-copyright}

* persoonsgegevens worden verwerkt conform de AVG
* recente foto's van herkenbare personen worden alleen gepubliceerd met toestemming
* elke upload wordt bij binnenkomst automatisch gecontroleerd op herkenbare personen via de [Herkenbaar API](https://github.com/inside-out-time-machines/herkenbaar-api) (i.v.m. portretrecht). Lukt de controle niet (de dienst is onbereikbaar), dan faalt hij dicht: de uploader krijgt de toestemmingsvraag tóch, en de moderator ziet "niet gecontroleerd" in plaats van "nee"; bij herkenbare personen wordt de uploader direct om een toestemmingsverklaring gevraagd en ziet de moderator het detectiesignaal (ja/nee + betrouwbaarheid) bij de kwaliteitscontrole; de detectie draait volledig op de eigen server, beelden verlaten het platform niet
* inzenders en afgebeelde personen kunnen verzoeken om verwijdering van een jottem (verwijderverzoek). Een moderator kiest per verzoek één van twee uitkomsten, of wijst het verzoek af met een toelichting:
  * **depubliceren** - de jottem verdwijnt uit alle publieke weergaven en open data (tombstone 410 op de duurzame URL); het origineel blijft als archiefexemplaar bewaard, alleen bereikbaar voor moderatoren en organisatiebeheerders van de organisatie. Bedoeld voor bijvoorbeeld een auteursrechtkwestie of ongepaste inhoud, waarbij herstel mogelijk moet blijven;
  * **wissen** - daarnaast worden het origineel, de derivaten, de metadata, de annotaties en de volledige payloads in het Gebeurtenislog verwijderd; alleen de tombstone en een kale logregel (wie, wanneer, welk besluit) blijven. Bedoeld voor een AVG-verzoek van een afgebeelde persoon of een inzender die zijn bijdrage intrekt;
* een gewiste jottem komt op de **wislijst**; na het terugzetten van een back-up wordt de wislijst opnieuw afgespeeld, zodat gewist materiaal niet terugkomt
* bijdragen worden waar mogelijk voorzien van bronvermelding
* persoonlijke herinneringen worden onderscheiden van historisch verifieerbare feiten
* het auteursrecht blijft bij de inzender; door inzending wordt toestemming gegeven voor publicatie binnen het project, hergebruik door derden alleen onder de aangegeven voorwaarden

## (Sub)domeinen ## {#domains}

* [www.iotm.nl](https://www.iotm.nl) - publieksfrontend
* [api.iotm.nl](https://api.iotm.nl) - publieke API (en beheer-API)
* [auth.iotm.nl](https://auth.iotm.nl) - identity provider
* [iiif.iotm.nl](https://iiif.iotm.nl) - IIIF Image API
* [anno.iotm.nl](https://anno.iotm.nl) - W3C annotatieserver
* [data.iotm.nl](https://data.iotm.nl) - RDF, SPARQL en datadumps
* [status.iotm.nl](https://status.iotm.nl) - status en monitoring
* [brand.iotm.nl](https://brand.iotm.nl) - merkgids van het platform
* ontwikkelomgeving: dezelfde hosts onder `dev.iotm.nl` (bijvoorbeeld `api.dev.iotm.nl`, `data.dev.iotm.nl`)
* ark.iotm.nl - gereserveerd voor de ARK-resolver (latere fase, zie [[#keuze-open-vragen]])
