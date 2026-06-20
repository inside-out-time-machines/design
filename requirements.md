# Requirements # {#requirements}

## Functionele requirements ## {#functional-requirements}

* inloggen door gebruikers moet zeer laagdrempelig zijn, dus inclusief social login
* inloggen door beheerders moet zijn te beveiligen via 2FA
* duurzame link op basis van ARK (met objectname op basis van NOID of UUID) per gepubliceerde jottem, in HTML weergave (die IIIF afbeelding / metadata / annotaties toont) en RDF (volgens schema.org AP NDE, annotaties via API) op basis van content-negotiation
* elke jottem kan een materiaaltype/genre dragen (bijv. foto, menukaart, advertentie, folder, krantenartikel, vergunning), zodat divers bronmateriaal naast foto's kan worden verzameld en gefilterd
* elke jottem kan koppelingen naar externe archiefbronnen bevatten (label + URI)

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
* geo-annotaties (plek fotograaf, zichtveld, locatie) worden vastgelegd als WKT/GeoJSON
* de publieke weergave kan gekoppeld worden aan een externe kaart-/tijdmachine (bijv. de [Gouda Tijdmachine](https://www.goudatijdmachine.nl)) om door plaats én tijd te navigeren

## Privacy, authenticiteit & auteursrecht ## {#privacy-authenticity-copyright}

* persoonsgegevens worden verwerkt conform de AVG
* recente foto's van herkenbare personen worden alleen gepubliceerd met toestemming
* inzenders kunnen verzoeken om verwijdering van hun materiaal
* bijdragen worden waar mogelijk voorzien van bronvermelding
* persoonlijke herinneringen worden onderscheiden van historisch verifieerbare feiten
* het auteursrecht blijft bij de inzender; door inzending wordt toestemming gegeven voor publicatie binnen het project, hergebruik door derden alleen onder de aangegeven voorwaarden

## (Sub)domeinen ## {#domains}

* [www.iotm.nl](http://www.iotm.nl)
* [api.iotm.nl](http://api.iotm.nl)
* [iiif.iotm.nl](http://api.iotm.nl)
* [ark.iotm.nl](http://api.iotm.nl)
