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

### Suggesties bij het uploaden ### {#verrijking-uploadsuggesties}

Het uploadformulier loopt in twee stappen: eerst de foto, dan de gegevens erbij. Tussen die
twee stappen is het beeld al bekend, en dat is het moment waarop het platform kan meedenken.
Anders dan de overige verrijkingen gebeurt dit niet ná publicatie maar ervóór, en het
resultaat is geen annotatie maar een voorgevuld formulierveld dat de inzender bevestigt of
overschrijft.

Bij een beeldbank-permalink komt de eerste vulling gratis: het IIIF-manifest bevat titel,
beschrijving, datering en vervaardiger. Bij een eigen foto komt hij van een interne dienst.

**Call-to-action:** geen knop; de velden staan voorgevuld met een regel eronder waar het
voorstel vandaan komt.

**Techniek/standaard:** één interne dienst naast de Herkenbaar API, met één endpoint dat
titel, categorie en steekwoorden teruggeeft, elk met een betrouwbaarheidsscore. Dezelfde
semantiek als het Herkenbaar-signaal: een hulpsignaal, geen poortwachter. Ligt de dienst
plat of duurt hij te lang, dan opent stap 2 met lege velden en merkt de inzender daar niets
van. Impact: *hoog* (nieuwe dienst met twee modellen).

*Gerealiseerd in augustus 2026 als de [Suggesties
API](https://github.com/inside-out-time-machines/suggesties-api) (EUPL-1.2). Gemeten op de
ontwikkelmachine (24 kernen, geen videokaart): **3,7 seconde per foto** en 2,7 GB geheugen.
Een aanvaard steekwoord uit de thesaurus draagt zijn term-URI mee en komt in de RDF terug
als `schema:about` met label en URI, niet als los woord in `schema:keywords`.*

#### Afweging: één dienst of drie #### {#verrijking-suggesties-architectuur}

<table class="data">
<thead>
<tr><th>Optie</th><th>Voordelen</th><th>Nadelen</th></tr>
</thead>
<tbody>
<tr><td>**Eén nieuwe dienst met één endpoint** (gekozen)</td><td>De foto gaat één keer over de lijn en wordt één keer gedecodeerd; beide modellen delen dezelfde voorbewerking; één container, één health-check, één plek voor het AI-label; permissief gelicentieerde modellen, dus de dienst kan EUPL-1.2 zijn zoals het platform</td><td>Twee modellen in één proces, dus het geheugengebruik van beide tegelijk; een storing raakt alle drie de suggesties tegelijk</td></tr>
<tr><td>Erbij in de Herkenbaar API</td><td>Geen extra container; het beeld is daar al in het geheugen</td><td>Die repo is AGPL-3.0 omdat ultralytics/YOLO dat afdwingt, en die grens valt bewust samen met de repogrens; bovendien zou één dienst twee ongelijksoortige dingen doen (portretrecht tegenover metadata)</td></tr>
<tr><td>Drie losse diensten</td><td>Maximaal modulair; per taak apart te schalen of te vervangen</td><td>Drie containers, drie modelladingen en drie keer hetzelfde beeld over de lijn, zonder dat het iets oplevert op de schaal van dit platform</td></tr>
</tbody>
</table>

**Besluit.** Eén nieuwe dienst in een eigen repo, naast de Herkenbaar API. Doorslaggevend is
dat de licentiegrens hier ánders ligt: Florence-2 is MIT en SigLIP 2 is Apache-2.0, dus deze
dienst hoeft niet AGPL te worden en kan dezelfde licentie dragen als het platform. De prijs
is een tweede container die modelgewichten in het geheugen houdt.

**Herzien wanneer.** De inferentie zo zwaar wordt dat hij een eigen machine of videokaart
verdient; dan is het ook het moment om per taak te splitsen.

#### Afweging: het model voor de titel #### {#verrijking-suggesties-titel}

<table class="data">
<thead>
<tr><th>Optie</th><th>Voordelen</th><th>Nadelen</th></tr>
</thead>
<tbody>
<tr><td>**[Florence-2-base](https://huggingface.co/florence-community/Florence-2-base) plus een vertaalmodel** (gekozen)</td><td>MIT; 0,23 miljard parameters, dus bescheiden geheugen; onderschrijven is precies waarvoor het model gemaakt is; het vertaalmodel (opus-mt-en-nl) is ongeveer 300 MB en klaar binnen een seconde; twee kleine, voorspelbare stappen die los te beproeven zijn</td><td>Twee modellen in plaats van één; gemeten 3,7 seconde per foto op onze machine (de schatting was vijf tot tien); de vertaalstap voegt een foutbron toe en Engelse woordvolgorde schemert soms door</td></tr>
<tr><td>[Florence-2-large](https://huggingface.co/microsoft/Florence-2-large)</td><td>Merkbaar betere onderschriften, vooral op rommelige historische foto's</td><td>0,77 miljard parameters en ongeveer drie keer zo traag; op onze machine tegen de dertig seconden per foto</td></tr>
<tr><td>Een meertalig VLM zoals [Qwen2.5-VL](https://huggingface.co/Qwen/Qwen2.5-VL-3B-Instruct)</td><td>Praat direct Nederlands, dus geen vertaalstap; kan in één prompt titel, categorie én steekwoorden geven</td><td>Fors trager en zwaarder zonder videokaart; een generatief model verzint eerder details die niet op de foto staan, en bij erfgoed is een verzonnen detail schadelijker dan een ontbrekend</td></tr>
<tr><td>[BLIP](https://huggingface.co/Salesforce/blip-image-captioning-base) of BLIP-2</td><td>Beproefd en veel gebruikt, ruime documentatie</td><td>Ouder; kortere en vlakkere onderschriften; nog steeds Engels, dus de vertaalstap blijft</td></tr>
<tr><td>Geen titelsuggestie</td><td>Nul risico op verzonnen tekst; de inzender weet zelf wat erop staat</td><td>Het lege titelveld is juist de plek waar mensen afhaken of "scan001" invullen</td></tr>
</tbody>
</table>

**Besluit.** Florence-2-base met een vertaalstap. Een onderschrift is nog geen titel, dus er
gaat een korte regel overheen die "een zwart-witfoto van een winkelpui met een uithangbord"
terugbrengt tot "Winkelpui met uithangbord". De prijs is de vertaalstap en de wachttijd, en
die valt weg achter het invullen van stap 2.

**Herzien wanneer.** Er een klein meertalig model verschijnt dat op enkel CPU binnen een paar
seconden Nederlands onderschrijft; dan vervalt de vertaalstap.

**Gemeten les bij het inrichten.** Meer rekenkernen maakte de dienst dramatisch tráger:
dezelfde foto kostte 3,7 seconde met zes threads, 4,5 met acht, twintig met twaalf en
drieënvijftig met vierentwintig. PyTorch pakt standaard de helft van de kernen en zit daarmee
ver in het verkeerde gebied, zeker op een machine die de rest van de stack ook draait. Het
aantal threads is daarom instelbaar en staat op zes; op een andere machine ligt het optimum
elders en moet het opnieuw gemeten worden.

#### Afweging: het model voor de categorie #### {#verrijking-suggesties-categorie}

De categorie is een keuze uit zeven vaste waarden (foto, menukaart, advertentie, folder,
krantenartikel, vergunning, overig). Dat is het schoolvoorbeeld van zero-shot-classificatie:
je geeft het model de kandidaatlabels als tekst en het kiest de best passende.

<table class="data">
<thead>
<tr><th>Optie</th><th>Voordelen</th><th>Nadelen</th></tr>
</thead>
<tbody>
<tr><td>**[SigLIP 2 base](https://huggingface.co/google/siglip2-base-patch16-224) zero-shot** (gekozen)</td><td>Apache-2.0; 0,4 miljard parameters; meertalig, dus Nederlandse labels werken direct zonder vertaling; onder de seconde per foto; dezelfde modelfamilie doet ook de steekwoorden, dus één set gewichten voor twee taken</td><td>De labels moeten zorgvuldig geformuleerd worden ("een menukaart van een restaurant" werkt beter dan "menukaart"); folder en advertentie lijken op elkaar en worden matig onderscheiden</td></tr>
<tr><td>[CLIP](https://github.com/openai/CLIP) (ViT-L/14)</td><td>De bekendste; veel voorbeeldcode en artikelen</td><td>Engelstalige tekstencoder, dus de labels moeten vertaald; ouder en zwakker op zero-shot dan SigLIP 2</td></tr>
<tr><td>RAKE op de tekst</td><td>Licht, geen model nodig, geen rekentijd</td><td>Werkt hier niet: RAKE haalt sleutelwoorden uit *tekst*, en een geüploade foto bevat geen tekst. Het levert bovendien losse woorden op, geen keuze uit zeven categorieën</td></tr>
<tr><td>Een eigen getraind classificatiemodel</td><td>Het scherpst op precies deze zeven categorieën</td><td>Vraagt een gelabelde verzameling die er niet is, en onderhoud bij elke wijziging van de lijst</td></tr>
</tbody>
</table>

**Besluit.** SigLIP 2 zero-shot met Nederlandse labels. Onder een drempel stellen we niets
voor, en "overig" is nooit een suggestie: dat brengt niemand verder.

RAKE valt hier af omdat er geen tekst is, maar krijgt later wél een zinnige plek: op de
beschrijving die de inzender zelf typt, en op getranscribeerde tekst van een menukaart of
krantenartikel zodra [transcriptie](#verrijking-transcriptie) bestaat. Dan is er tekst om uit
te putten.

**Herzien wanneer.** De verwarring tussen folder en advertentie in de praktijk hindert; dan
is een fijnmaziger labelformulering of een klein bijgetraind model de volgende stap.

#### Afweging: de bron van de steekwoorden #### {#verrijking-suggesties-steekwoorden}

<table class="data">
<thead>
<tr><th>Optie</th><th>Voordelen</th><th>Nadelen</th></tr>
</thead>
<tbody>
<tr><td>**SigLIP 2 tegen een woordenlijst met term-URI's** (gekozen)</td><td>De voorstellen dragen meteen een term-URI, precies wat `schema:about` en `schema:keywords` willen; hetzelfde model als bij de categorie, dus geen extra gewichten; de lijst is per project in te perken, net als de terminologiebronnen nu al</td><td>Wat niet in de lijst staat wordt nooit voorgesteld; de lijst moet samengesteld en onderhouden worden</td></tr>
<tr><td>Vrije labels uit het beeldmodel</td><td>Breder bereik, geen lijst nodig</td><td>Engels en zonder URI; de labels zijn bovendien algemeen ("building", "person") waar erfgoed juist om specifieke termen vraagt</td></tr>
<tr><td>Kandidaten opvragen bij het Termennetwerk</td><td>Altijd actueel, geen eigen lijst te onderhouden</td><td>Het Termennetwerk zoekt op tekst, niet op beeld; er is dus eerst een zoekterm nodig, en die is er op dat moment nog niet</td></tr>
<tr><td>Geen steekwoordsuggesties</td><td>Geen risico op verkeerde termen in de open data</td><td>Steekwoorden maken een foto vindbaar, en met de hand doet bijna niemand het</td></tr>
</tbody>
</table>

**Besluit.** Zero-shot scoren tegen een lijst erfgoedtermen en de drie tot vijf best scorende
voorstellen, boven een drempel. Zero-shot heeft hoe dan ook een kandidatenlijst nodig, en dat
komt hier goed uit: de RDF wil term-URI's en geen losse woorden. De inzender kan altijd zelf
typen; de bestaande term-zoeker levert dan alsnog een URI.

**Herzien wanneer.** De woordenlijst te krap blijkt voor een project met een ander onderwerp;
de lijst is dan per project uit te breiden zonder de dienst te wijzigen.

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
`/ns/jottem.jsonld` en de koppeling tussen twee jottems). Het uploadformulier loopt sinds
augustus 2026 in twee stappen en vult bij een beeldbank-permalink titel, beschrijving,
datering en vervaardiger voor uit het IIIF-manifest; de suggestiedienst uit
[[#verrijking-uploadsuggesties]] volgt daarna. V-5, V-6 en V-10 blijven van kracht voor de
fase 2-verrijkingen.*

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
* **V-10** Suggesties bij het uploaden vullen formuliervelden voor die de inzender
    bevestigt of overschrijft; ze worden nooit zonder tussenkomst opgeslagen. Bij elk
    voorgevuld veld staat waar het voorstel vandaan komt. Valt de suggestiedienst uit, dan
    opent stap 2 met lege velden en merkt de inzender daar niets van: een hulpsignaal, geen
    poortwachter, net als het Herkenbaar-signaal.
* **V-9** Een koppeling tussen twee jottems is een structurele relatie in de database,
    binnen hetzelfde project; de `linking`-annotatie en `dcterms:relation` in de RDF zijn
    daarvan afgeleid en verschijnen pas wanneer beide jottems gepubliceerd zijn. Verdwijnt
    een van de twee uit publicatie, dan verdwijnt ook de koppeling uit de publieke uitvoer.
* **V-8** Platform-extensies op het Web Annotation-model (zoals `jottem:aard` en
    `jottem:betrouwbaarheid`) worden gedefinieerd in een eigen JSON-LD-context, zodat de
    annotaties standaardconform blijven.
