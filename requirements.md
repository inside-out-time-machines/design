# Requirements # {#requirements}

## Functional requirements ## {#functional-requirements}

* inloggen door gebruikers moet zeer laagdrempelig zijn, dus inclusief social login
* inloggen door beheerders moet zijn te beveiligen via 2FA
* duurzame link op basis van ARK (met objectname op basis van NOID of UUID) per gepubliceerde jottem, in HTML weergave (die IIIF afbeelding / metadata / annotaties toont) en RDF (volgens schema.org AP NDE, annotaties via API) op basis van content-negotiation

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

## (Sub)domeinen ## {#domains}

* [www.iotm.nl](http://www.iotm.nl)
* [api.iotm.nl](http://api.iotm.nl)
* [iiif.iotm.nl](http://api.iotm.nl)
* [ark.iotm.nl](http://api.iotm.nl)
* [onsamsterdam.iotm.nl](http://onsamsterdam.iotm.nl)  
* [diegoude.iotm.nl](http://diegoude.iotm.nl)   
* [albertusperk.iotm.nl](http://albertusperk.iotm.nl)  
* [oudutrecht.iotm.nl](http://oudutrecht.iotm.nl)
