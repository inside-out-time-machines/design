# Data-architectuur

De [data-architectuur](data-architectuur/data-architectuur.html) van Jottem beschrijft het datamodel (ERD), de URI-strategie en alle data-outputs van het platform: IIIF (Image API v3, Presentation API v3, Change Discovery v1), W3C Web Annotations (incl. Annotation Protocol en Miifi API), RDF/datadump conform schema.org AP NDE met datasetbeschrijving conform de NDE-requirements, de publieke en beheer-API's, RSS, vocabulaires en de zoekindex.

Per output bevat het document een veld→bron-tabel als **outputcontrole**: is alle data die aan de outputkant nodig is beschikbaar in de eerdere lagen (PostgreSQL, MinIO, miiify)? De daarbij gevonden hiaten zijn verwerkt in het ERD.
