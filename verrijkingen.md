# Verrijkingen # {#verrijkingen}

Het verrijken van geüploade afbeeldingen is cruciaal om losse foto's en documenten om te
zetten in doorzoekbare, gestructureerde en betekenisvolle historische bronnen. Dit hoofdstuk
is de catalogus van verrijkingsmogelijkheden: per mogelijkheid de beschrijving, de
**call-to-action** (B1-taalniveau) die bij een jottem wordt getoond om gebruikers te nudgen,
de **technische impact of standaard**, en een indicatie hoe de verrijking er **als
W3C Web Annotation** uitziet. Het sluit aan op de [[#usecases]] van de annoteerder en op de
opslag en ontsluiting van annotaties in de
[data-architectuur](data-architectuur/data-architectuur.html#annotaties).

**Leeswijzer bij de Web Annotation-voorbeelden.** Alle voorbeelden volgen het
[W3C Web Annotation Data Model](https://www.w3.org/TR/annotation-model/). Voor de
leesbaarheid zijn `@context` (`http://www.w3.org/ns/anno.jsonld`), `id`, `creator` en
`created` weggelaten; het platform vult die altijd. Het `target` is de duurzame jottem-URI
of het IIIF-canvas; vlakken worden geselecteerd met een `FragmentSelector`
(`xywh=pixel:x,y,w,h`) of `SvgSelector`. De **impact**-indicatie: *laag* = past in de
bestaande annotatieflow, *middel* = extra UI of veld, *hoog* = nieuwe pipeline of
koppelvlak. Mogelijkheden gemarkeerd met *(niet in MVP)* volgen in fase 2 of later.

## Inhoudelijke en beeldannotaties (IIIF en W3C Web Annotations) ## {#verrijking-beeld}

### Vlak-annotaties (bounding boxes) ### {#verrijking-vlak}

Het selecteren van specifieke regio's of uitsneden op een afbeelding, bijvoorbeeld een
individuele persoon op een groepsfoto, een detail van een gevel of een specifiek gerecht op
een menukaart.

**Call-to-action:** "Zie je iets bijzonders op deze foto? Teken er een vak omheen en vertel
wat het is." en "Ken je iemand op deze foto? Klik op die persoon."

**Techniek/standaard:** W3C Web Annotation met `FragmentSelector` (Media Fragments,
`xywh=pixel:`) of `SvgSelector` op het IIIF-canvas; Annotorious in de frontend. Impact:
*laag* (kern van de bestaande annotatieflow).

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "identifying",
  "target": {
    "source": "https://iiif.iotm.nl/jottem/{id}/canvas/1",
    "selector": {
      "type": "FragmentSelector",
      "conformsTo": "http://www.w3.org/TR/media-frags/",
      "value": "xywh=pixel:410,220,180,260"
    }
  },
  "body": { "type": "TextualBody", "purpose": "identifying", "value": "Wong Lee, kok" }
}
```

### Taggen met gecontroleerde vocabulaires ### {#verrijking-taggen}

Het koppelen van gestructureerde begrippen uit het NDE Termennetwerk, de Cultuurhistorische
Thesaurus (CHT) of Wikidata aan (onderdelen van) de afbeelding.

**Call-to-action:** "Wat zie je op deze foto? Kies een woord uit de lijst, dan kan iedereen
het terugvinden."

**Techniek/standaard:** motivation `tagging` met een `SpecificResource`-body die naar de
term-URI wijst; termen zoeken via het NDE Termennetwerk (GraphQL), beperkt tot de
terminologiebronnen van het project. Impact: *laag* (bestaande Termennetwerk-integratie).

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "tagging",
  "target": "https://www.iotm.nl/jottem/{id}",
  "body": {
    "type": "SpecificResource",
    "purpose": "tagging",
    "source": "https://data.cultureelerfgoed.nl/term/id/cht/{term}"
  }
}
```

### Materiaal- en genretypering ### {#verrijking-genre}

Het toekennen van het specifieke bron- of materiaaltype aan de upload, zoals foto,
menukaart, advertentie, folder, krantenartikel of vergunning.

**Call-to-action:** "Wat voor iets is dit? Kies: foto, menukaart, advertentie of iets
anders."

**Techniek/standaard:** in de MVP is dit **metadata** (`Media.genre`, gekoppeld aan een
CHT-term, zie de data-architectuur), geen annotatie; een correctievoorstel door een
gebruiker kan wél als annotatie. Impact: *laag* (bestaand veld).

**Als Web Annotation** (correctievoorstel):

```json
{
  "type": "Annotation",
  "motivation": "classifying",
  "target": "https://www.iotm.nl/jottem/{id}",
  "body": {
    "type": "SpecificResource",
    "purpose": "classifying",
    "source": "https://data.cultureelerfgoed.nl/term/id/cht/{menukaart}"
  }
}
```

### Crowd-solving: identificatievragen ### {#verrijking-vragen}

Vragen stellen aan de gemeenschap om onbekende elementen op te lossen, zoals "Wie kent deze
persoon?" of "Welke winkel was dit?".

**Call-to-action:** "Weet jij dit niet? Stel je vraag, misschien weet een ander het wel."
en bij bestaande vragen: "Iemand vraagt: wie is dit? Weet jij het antwoord?"

**Techniek/standaard:** motivation `questioning`; antwoorden hangen er als reactie aan
(motivation `replying`, zie de bestaande reactieflow). Impact: *laag*.

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "questioning",
  "target": {
    "source": "https://iiif.iotm.nl/jottem/{id}/canvas/1",
    "selector": { "type": "FragmentSelector", "value": "xywh=pixel:120,80,200,300" }
  },
  "body": { "type": "TextualBody", "purpose": "questioning", "value": "Wie kent deze persoon?" }
}
```

## Geografische en temporele verrijking (plaats en tijd) ## {#verrijking-plaats-tijd}

### Georeferentiëring en adreskoppeling ### {#verrijking-geo}

Het toevoegen van coördinaten, straatnamen en huisnummers waaraan de afbeelding is
gerelateerd. In de MVP prikt de uploader de locatie als **speld op de kaart** (dat levert de
coördinaten als metadata); automatische **adreskoppeling** (geocoding, pand-ID's zoals BAG)
is *(niet in MVP)*.

**Call-to-action:** "Weet je waar dit was? Zet een speld op de kaart." en "Klopt de plek
niet helemaal? Versleep de speld."

**Techniek/standaard:** speld = lat/lon als metadata bij de jottem (MVP); correcties en
aanvullingen door anderen als annotatie met een GeoJSON-body; latere fase: PDOK
Locatieserver en BAG-pand-ID's. Impact: *laag* (speld), *hoog* (adreskoppeling).

**Als Web Annotation** (locatievoorstel):

```json
{
  "type": "Annotation",
  "motivation": "identifying",
  "target": "https://www.iotm.nl/jottem/{id}",
  "body": {
    "type": "TextualBody",
    "purpose": "identifying",
    "format": "application/geo+json",
    "value": "{ \"type\": \"Point\", \"coordinates\": [4.7083, 52.0115] }"
  }
}
```

### Tijdlijn en periode-aanduiding ### {#verrijking-periode}

Het vastleggen van een exacte datum, jaartal of tijdsperiode, zoals de openings- en
sluitingsjaren van een horecazaak of bedrijf in een pand.

**Call-to-action:** "Weet je wanneer dit was? Vul het jaartal in, ook een gok helpt." en
"Wanneer ging deze zaak open en dicht?"

**Techniek/standaard:** periodes in **EDTF** (Extended Date/Time Format, bijv. `1973/1996`
of `196X` voor "jaren zestig"); exacte datums als metadata, aanvullingen en correcties als
annotatie. Voedt de pand-tijdlijn op de kaart. Impact: *laag*.

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "describing",
  "target": "https://www.iotm.nl/jottem/{id}",
  "body": {
    "type": "TextualBody",
    "purpose": "describing",
    "value": "Geopend 1973, gesloten 1996 (EDTF: 1973/1996)"
  }
}
```

### Geopositionering en zichtveld ### {#verrijking-zichtveld}

Het bepalen van het camerastandpunt en de kijkrichting om de foto in te passen in een
interactieve kaart of ruimtelijk-temporele omgeving, zoals de Gouda Tijdmachine.

**Call-to-action:** "Waar stond de fotograaf? Zet een speld en draai het pijltje in de
kijkrichting."

**Techniek/standaard:** GeoJSON-punt met kijkrichting (bearing in graden) en zichtshoek;
sluit aan op het GTM-koppelvlak (fase 2) en op de geo-requirements (WKT/GeoJSON). Impact:
*middel* (extra UI op de kaart). De invoer gebruikt
[Leaflet.GeotagPhoto](https://github.com/nypl-spacetime/Leaflet.GeotagPhoto)
(`L.geotagPhoto.camera`), dezelfde interactie als in de Gouda Tijdmachine: versleep de
camera en het doelpunt en knijp de beeldhoek. Opgeslagen wordt een Feature met het
camerapunt als geometry en `properties: { bearing, fov, target: [lon, lat] }`; het
doelpunt maakt herbewerken mogelijk.

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "describing",
  "target": "https://www.iotm.nl/jottem/{id}",
  "body": {
    "type": "TextualBody",
    "purpose": "describing",
    "format": "application/geo+json",
    "value": "{ \"type\": \"Point\", \"coordinates\": [4.7083, 52.0115], \"properties\": { \"bearing\": 220, \"fov\": 60 } }"
  }
}
```

## Tekstuele verrijking en transcriptie (OCR/HTR) ## {#verrijking-tekst}

### Handmatige en geassisteerde transcriptie *(niet in MVP)* ### {#verrijking-transcriptie}

Het letterlijk uittypen van teksten die op het beeld staan, zoals opschriften op
uithangborden, menukaarten, krantenartikelen of handgeschreven annotaties en brieven.

**Call-to-action:** "Kun je lezen wat hier staat? Typ het over, dan kan iedereen het
vinden."

**Techniek/standaard:** motivation `supplementing` (de standaardvorm voor transcripties in
IIIF-omgevingen), per tekstregel of tekstblok met een vlak-selector; geassisteerd met
OCR (Tesseract) of HTR (Loghi/Transkribus) als suggestie. Impact: *hoog* (aparte
transcriptie-UI en, bij assistentie, een OCR/HTR-pipeline).

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "supplementing",
  "target": {
    "source": "https://iiif.iotm.nl/jottem/{id}/canvas/1",
    "selector": { "type": "FragmentSelector", "value": "xywh=pixel:60,340,480,60" }
  },
  "body": { "type": "TextualBody", "purpose": "supplementing", "value": "Babi pangang f 8,50" }
}
```

### Vertaling en begrippenverklaring ### {#verrijking-begrippen}

Het toelichten van verouderde termen, verdwenen beroepen, dialectwoorden of historische
munteenheden die op het beeld of in menukaarten en documenten voorkomen.

**Call-to-action:** "Weet jij wat dit woord betekent? Leg het uit voor wie het niet meer
kent."

**Techniek/standaard:** motivation `describing` op een vlak of op de hele jottem;
waar mogelijk met een term-URI (Termennetwerk) als tweede body. Impact: *laag*.

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "describing",
  "target": {
    "source": "https://iiif.iotm.nl/jottem/{id}/canvas/1",
    "selector": { "type": "FragmentSelector", "value": "xywh=pixel:60,340,180,40" }
  },
  "body": {
    "type": "TextualBody",
    "purpose": "describing",
    "value": "Een melkinrichting was een winkel waar je melk, boter en kaas kocht."
  }
}
```

### Indexering van namen en lijsten *(niet in MVP)* ### {#verrijking-namen}

Het specifiek doorzoekbaar maken van namen en functies op gedenkplaten, verenigingsfoto's
of officiële documenten.

**Call-to-action:** "Staan er namen op? Typ ze over, dan zijn ze te vinden voor familie en
onderzoekers."

**Techniek/standaard:** reeks `supplementing`-annotaties met per naam een vlak-selector en
een gestructureerde body (naam, functie); de zoekindex neemt ze mee als doorzoekbare
velden. Impact: *middel* (lijst-invoer-UI en indexering).

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "supplementing",
  "target": {
    "source": "https://iiif.iotm.nl/jottem/{id}/canvas/1",
    "selector": { "type": "FragmentSelector", "value": "xywh=pixel:220,120,160,40" }
  },
  "body": { "type": "TextualBody", "purpose": "identifying", "value": "J. van Dam, voorzitter" }
}
```

## Storytelling en anekdotische verrijking ## {#verrijking-verhalen}

### Persoonlijke herinneringen en anekdotes ### {#verrijking-herinnering}

Het toevoegen van verhalen en getuigenissen bij een foto. Hierbij wordt een duidelijk
onderscheid gemaakt tussen historisch verifieerbare feiten en persoonlijke herinneringen.

**Call-to-action:** "Was jij hier weleens? Vertel je herinnering, groot of klein." en
"Wat weet jij nog van deze plek?"

**Techniek/standaard:** motivation `commenting`; het onderscheid herinnering versus feit is
een expliciet kenmerk op de annotatie (platform-extensie `jottem:aard`), zichtbaar in de
weergave en meegenomen in de moderatiehandreiking. Impact: *laag*.

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "commenting",
  "target": "https://www.iotm.nl/jottem/{id}",
  "body": {
    "type": "TextualBody",
    "purpose": "commenting",
    "value": "Mijn ouders aten hier elke verjaardag."
  },
  "jottem:aard": "herinnering"
}
```

### Audio-annotaties en interviews *(niet in MVP)* ### {#verrijking-audio}

Het koppelen van gesproken herinneringen, mondelinge historie (oral history) of
interviewfragmenten aan de afbeelding of een specifiek canvas.

**Call-to-action:** "Vertel je verhaal liever? Neem het op, praten mag ook."

**Techniek/standaard:** annotatie met een audio-body (opname via de browser, opslag in de
`audio`-bucket); hangt samen met de audio-ondersteuning uit fase 2 (transcodering,
IIIF-audio-canvas). Impact: *hoog* (opname-UI en audio-pipeline).

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "commenting",
  "target": "https://www.iotm.nl/jottem/{id}",
  "body": {
    "type": "Sound",
    "id": "https://media.iotm.nl/audio/{opname}.mp3",
    "format": "audio/mpeg"
  }
}
```

### Externe bronverwijzingen ### {#verrijking-bronnen}

Het toevoegen van URI-koppelingen naar externe archiefsystemen, kadasterkaarten of
krantenbanken zoals Delpher.

**Call-to-action:** "Ken je een krantenbericht of archiefstuk over deze plek? Plak de link
erbij."

**Techniek/standaard:** motivation `linking` met de externe URI als body; label en
bronvermelding erbij. Sluit aan op het bestaande requirement voor archiefbron-koppelingen
(label + URI). Impact: *laag*.

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "linking",
  "target": "https://www.iotm.nl/jottem/{id}",
  "body": {
    "type": "SpecificResource",
    "purpose": "linking",
    "source": "https://resolver.kb.nl/resolve?urn=ddd:110577489:mpeg21"
  }
}
```

## Relatieve en vergelijkende activiteiten ## {#verrijking-vergelijken}

### "Toen en nu" (herfotografie) *(niet in MVP)* ### {#verrijking-toen-nu}

Het toevoegen van een hedendaagse foto vanaf exact dezelfde locatie en invalshoek om
verandering in de leefomgeving in beeld te brengen.

**Call-to-action:** "Woon je in de buurt? Maak dezelfde foto zoals het er nu uitziet en
zet hem ernaast."

**Techniek/standaard:** de nu-foto is zelf een jottem (met eigen moderatie); de koppeling
loopt via dezelfde structurele relatie als bij [[#verrijking-zelfde-object]], met de
`linking`-annotatie als afgeleide; weergave als voor/na-schuif in de viewer (IIIF Choice of
twee canvassen). Impact: *middel* (upload-koppelflow en vergelijkingsweergave).

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "linking",
  "target": "https://www.iotm.nl/jottem/{toen}",
  "body": {
    "type": "SpecificResource",
    "purpose": "linking",
    "source": "https://www.iotm.nl/jottem/{nu}"
  }
}
```

### Zelfde object, andere foto ### {#verrijking-zelfde-object}

Iemand herkent het onderwerp van een jottem en heeft er zelf een foto van: dezelfde gevel
tien jaar later, hetzelfde interieur vanuit een andere hoek, dezelfde zaak op een
ansichtkaart. Anders dan de andere verrijkingen levert dit geen uitspraak óver de bestaande
jottem op, maar een nieuwe jottem plus een koppeling tussen de twee.

**Call-to-action:** "Heb je zelf een foto van hetzelfde, maar uit een andere tijd of vanuit
een andere hoek? Voeg hem toe."

**Techniek/standaard:** de call-to-action opent een uitleg en leidt daarna naar het
uploadformulier, met de jottem van herkomst in beeld; de nieuwe foto is zelf een jottem met
eigen moderatie. De koppeling is een **structurele relatie in de database** (`MediaRelatie`,
binnen hetzelfde project) en is daarmee de bron van waarheid; daaruit worden een
`linking`-annotatie in de container van beide jottems en `dcterms:relation` in de RDF van
beide jottems afgeleid, zodra allebei gepubliceerd zijn. Weergave: bij beide jottems een
kaartje met thumbnail en link. Impact: *middel* (uploadkoppelflow en weergave aan twee
kanten).

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "linking",
  "target": "https://www.iotm.nl/jottem/{deze}",
  "body": {
    "type": "SpecificResource",
    "purpose": "linking",
    "source": "https://www.iotm.nl/jottem/{andere}"
  },
  "jottem:verrijking": "zelfde-object"
}
```

### Chronologische reeksen ### {#verrijking-reeksen}

Het onderling koppelen van afbeeldingen om een tijdlijn van één specifieke locatie, familie
of evenement door de jaren heen op te bouwen.

**Call-to-action:** "Hoort deze foto bij dezelfde plek als een andere? Koppel ze aan
elkaar."

**Techniek/standaard:** in de MVP ontstaat de pand-tijdlijn automatisch uit adres en
openings-/sluitingsjaren (metadata); handmatige koppelingen zijn structurele relaties zoals
bij [[#verrijking-zelfde-object]], met de `linking`-annotatie als afgeleide; gepubliceerde
reeksen als IIIF Collection of Range. Impact: *laag* (automatisch), *middel* (handmatig
koppelen met UI).

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "linking",
  "target": "https://www.iotm.nl/jottem/{id}",
  "body": {
    "type": "SpecificResource",
    "purpose": "linking",
    "source": "https://www.iotm.nl/jottem/{ander}"
  }
}
```

### Multimediale bundeling *(niet in MVP)* ### {#verrijking-bundeling}

Een krantenartikel, menukaart, interieurfoto en personeelsfoto van hetzelfde pand of
bedrijf aan elkaar koppelen.

**Call-to-action:** "Heb je meer over deze zaak? Voeg het samen tot één verhaal."

**Techniek/standaard:** IIIF Collection per pand of bedrijf, gevuld met
`linking`-annotaties tussen de jottems; de bundel krijgt een eigen pagina. Impact: *middel*.

**Als Web Annotation:** zoals bij [[#verrijking-reeksen]]; de bundel zelf is een IIIF
Collection, geen annotatie.

## Geautomatiseerde en AI-ondersteunde verrijking ## {#verrijking-ai}

### Automatische beeldherkenning *(niet in MVP)* ### {#verrijking-beeldherkenning}

AI-gebaseerde detectie van objecten, architectuurstijlen, voertuigen of kledingstijlen als
suggestie voor de gebruiker.

**Call-to-action:** "De computer denkt dat hier een bakfiets staat. Klopt dat? Ja / Nee."

**Techniek/standaard:** eigen dienst naast de Herkenbaar API; suggesties zijn annotaties
met een `generator` (software) en een betrouwbaarheidsscore; een gebruiker of moderator
bevestigt voordat de suggestie definitief wordt. Impact: *hoog* (ML-pipeline en
bevestigingsflow).

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "tagging",
  "generator": { "type": "Software", "name": "jottem-beeldherkenning" },
  "jottem:betrouwbaarheid": 0.87,
  "target": {
    "source": "https://iiif.iotm.nl/jottem/{id}/canvas/1",
    "selector": { "type": "FragmentSelector", "value": "xywh=pixel:40,300,220,180" }
  },
  "body": { "type": "TextualBody", "purpose": "tagging", "value": "bakfiets" }
}
```

### Digitale restauratie en inkleuring *(niet in MVP)* ### {#verrijking-restauratie}

Het toevoegen van een digitaal ingekleurde of herstelde variant van een beschadigde of
zwart-witfoto als secundaire weergave.

**Call-to-action:** "Bekijk deze foto in kleur." (weergave-optie, geen invoer van de
gebruiker)

**Techniek/standaard:** de variant is een afgeleide (nooit het origineel vervangend),
aangeboden als IIIF Choice op hetzelfde canvas; herkomst en methode worden vastgelegd.
De ingekleurde of gerestaureerde weergave krijgt in de viewer een zichtbaar **AI-label**
("Deze weergave is met AI bewerkt"), conform de transparantieverplichting voor
AI-gegenereerde en AI-bewerkte beelden uit de **AI Act** (Verordening (EU) 2024/1689,
art. 50); het label wordt ook als metadata bij de afgeleide vastgelegd, zodat het bij
hergebruik en in de API's behouden blijft. Impact: *hoog* (beeldpipeline).

**Als Web Annotation** (variant als painting-alternatief op het canvas):

```json
{
  "type": "Annotation",
  "motivation": "painting",
  "target": "https://iiif.iotm.nl/jottem/{id}/canvas/1",
  "body": {
    "type": "Choice",
    "items": [
      { "type": "Image", "id": "https://iiif.iotm.nl/{origineel}/full/max/0/default.jpg" },
      { "type": "Image", "id": "https://iiif.iotm.nl/{ingekleurd}/full/max/0/default.jpg" }
    ]
  }
}
```

## Collectievorming en community-validatie ## {#verrijking-community}

### Feitencontrole en moderatie door de gemeenschap *(niet in MVP)* ### {#verrijking-feitencontrole}

Het controleren, aanvullen en goedkeuren van ingevoerde metadata door medegebruikers of
moderatoren.

**Call-to-action:** "Klopt deze informatie? Bevestig het of stel een verbetering voor."

**Techniek/standaard:** motivation `assessing` op een bestaande annotatie of op de
metadata; bevestigingen tellen op tot een betrouwbaarheidsindicatie. De reguliere moderatie
door moderatoren en de meldingenflow bestaan al in de MVP; dit betreft de bredere
community-validatie. Impact: *middel*.

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "assessing",
  "target": "https://anno.iotm.nl/annotation/{bestaande-annotatie}",
  "body": {
    "type": "TextualBody",
    "purpose": "assessing",
    "value": "Klopt, zie de bouwvergunning uit 1972."
  }
}
```

### Thematische collecties en favorieten *(niet in MVP)* ### {#verrijking-collecties}

Het groeperen van verrijkte afbeeldingen in openbare thema-albums (bijvoorbeeld "Verdwenen
ijssalons" of "Gevelstenen") of persoonlijke favorietenlijsten. Persoonlijke favorieten
met openbare deellink bestaan al in de MVP; de openbare thema-albums zijn de uitbreiding.

**Call-to-action:** "Mooi gevonden? Bewaar deze foto in je eigen lijst." en "Maak je eigen
album over een onderwerp dat jou raakt."

**Techniek/standaard:** favorieten via het bestaande Favoriet-model; thema-albums als
IIIF Collection met eigen pagina; opname in een album als `bookmarking`-annotatie. Impact:
*middel* (albumbeheer-UI).

**Als Web Annotation:**

```json
{
  "type": "Annotation",
  "motivation": "bookmarking",
  "target": "https://www.iotm.nl/jottem/{id}",
  "body": {
    "type": "TextualBody",
    "purpose": "tagging",
    "value": "Album: Verdwenen ijssalons"
  }
}
```

## Instelbaar per project ## {#verrijking-instelbaar}

De organisatiebeheerder bepaalt **per project** welke verrijkingsmogelijkheden beschikbaar
zijn, net zoals de terminologiebronnen per project worden ingesteld. Alleen ingeschakelde
verrijkingen tonen hun call-to-action op de jottem-pagina; de rest blijft verborgen. Zo kan
een fotoproject inzetten op herinneringen en identificatie, en een documentenproject op
transcriptie en begrippenverklaring, zonder gebruikers te overladen met knoppen.

## Aanvullende requirements ## {#verrijking-requirements}

*Status (augustus 2026): de MVP-verrijkingen uit dit hoofdstuk zijn gerealiseerd,
inclusief V-1 t/m V-4, V-7, V-8 en V-9 (per project instelbaar, CTA's op de jottem-pagina,
W3C-opslag in AnnoRepo, `jottem:aard`, meldingen/moderatie, de eigen JSON-LD-context
`/ns/jottem.jsonld` en de koppeling tussen twee jottems). V-5 en V-6 blijven van kracht voor
de fase 2-verrijkingen.*

* **V-1** De organisatiebeheerder kan per project instellen welke verrijkingsmogelijkheden
    beschikbaar zijn; standaard staan de MVP-verrijkingen uit dit hoofdstuk aan.
* **V-2** Alleen ingeschakelde verrijkingsmogelijkheden tonen hun call-to-action op de
    jottem-pagina; call-to-actions zijn kort, activerend en op B1-taalniveau, met de teksten
    uit dit hoofdstuk als uitgangspunt.
* **V-3** Elke verrijking wordt opgeslagen als W3C Web Annotation met de motivation en
    purpose uit dit hoofdstuk; uitzonderingen zijn genre en locatiespeld, die in de MVP
    metadata zijn.
* **V-4** Het onderscheid tussen herinnering en verifieerbaar feit (`jottem:aard`) is bij
    weergave altijd zichtbaar en wordt bij invoer expliciet uitgevraagd.
* **V-5** Verrijkingsmogelijkheden die niet in de MVP zitten, staan achter een
    feature-flag, zodat ze per omgeving en fase geactiveerd kunnen worden zonder
    herontwerp.
* **V-6** AI-suggesties zijn altijd herleidbaar (annotatie met `generator` en
    betrouwbaarheidsscore) en worden pas definitief na bevestiging door een gebruiker of
    moderator. Alle AI-gegenereerde of AI-bewerkte content (zoals ingekleurde weergaven en
    beeldherkenning-output) draagt een zichtbaar AI-label in de weergave én als metadata,
    conform de transparantieverplichting uit de AI Act (Verordening (EU) 2024/1689, art. 50).
* **V-7** Voor alle verrijkingen gelden de bestaande meldingen- en moderatieflow en de
    bestaande autorisatie (eigen bijdragen bewerken en verwijderen).
* **V-9** Een koppeling tussen twee jottems is een structurele relatie in de database,
    binnen hetzelfde project; de `linking`-annotatie en `dcterms:relation` in de RDF zijn
    daarvan afgeleid en verschijnen pas wanneer beide jottems gepubliceerd zijn. Verdwijnt
    een van de twee uit publicatie, dan verdwijnt ook de koppeling uit de publieke uitvoer.
* **V-8** Platform-extensies op het Web Annotation-model (zoals `jottem:aard` en
    `jottem:betrouwbaarheid`) worden gedefinieerd in een eigen JSON-LD-context, zodat de
    annotaties standaardconform blijven.
