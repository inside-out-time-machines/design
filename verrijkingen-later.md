# Verrijkingen voor later # {#verrijkingen-later}

Uitgewerkte verrijkingen die niet bij de MVP van het Jottem-platform horen. Ze stonden eerder
in het hoofdstuk [Verrijkingen](./#verrijkingen) van het ontwerpdocument; daar staat nu een
lijst die hiernaar verwijst. Wanneer een verrijking aan de beurt is, wordt ze opnieuw
getoetst tegen de requirements en het datamodel (zie het [realisatieplan](./#realisatie-fase2)).

## Handmatige en geassisteerde transcriptie ## {#verrijking-transcriptie}

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
    "source": "https://api.iotm.nl/jottem/{id}/iiif/manifest/canvas/1",
    "selector": { "type": "FragmentSelector", "value": "xywh=pixel:60,340,480,60" }
  },
  "body": { "type": "TextualBody", "purpose": "supplementing", "value": "Babi pangang f 8,50" }
}
```

## Indexering van namen en lijsten ## {#verrijking-namen}

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
    "source": "https://api.iotm.nl/jottem/{id}/iiif/manifest/canvas/1",
    "selector": { "type": "FragmentSelector", "value": "xywh=pixel:220,120,160,40" }
  },
  "body": { "type": "TextualBody", "purpose": "identifying", "value": "J. van Dam, voorzitter" }
}
```

## Audio-annotaties en interviews ## {#verrijking-audio}

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
    "id": "https://{objectopslag}/audio/{opname}.mp3",
    "format": "audio/mpeg"
  }
}
```

## "Toen en nu" (herfotografie) ## {#verrijking-toen-nu}

Het toevoegen van een hedendaagse foto vanaf exact dezelfde locatie en invalshoek om
verandering in de leefomgeving in beeld te brengen.

**Call-to-action:** "Woon je in de buurt? Maak dezelfde foto zoals het er nu uitziet en
zet hem ernaast."

**Techniek/standaard:** de nu-foto is zelf een jottem (met eigen moderatie); de koppeling
loopt via dezelfde structurele relatie als bij [zelfde object, andere foto](./#verrijking-zelfde-object), met de
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

## Multimediale bundeling ## {#verrijking-bundeling}

Een krantenartikel, menukaart, interieurfoto en personeelsfoto van hetzelfde pand of
bedrijf aan elkaar koppelen.

**Call-to-action:** "Heb je meer over deze zaak? Voeg het samen tot één verhaal."

**Techniek/standaard:** IIIF Collection per pand of bedrijf, gevuld met
`linking`-annotaties tussen de jottems; de bundel krijgt een eigen pagina. Impact: *middel*.

**Als Web Annotation:** zoals bij [chronologische reeksen](./#verrijking-reeksen); de bundel zelf is een IIIF
Collection, geen annotatie.

## Automatische beeldherkenning ## {#verrijking-beeldherkenning}

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
    "source": "https://api.iotm.nl/jottem/{id}/iiif/manifest/canvas/1",
    "selector": { "type": "FragmentSelector", "value": "xywh=pixel:40,300,220,180" }
  },
  "body": { "type": "TextualBody", "purpose": "tagging", "value": "bakfiets" }
}
```

## Digitale restauratie en inkleuring ## {#verrijking-restauratie}

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
  "target": "https://api.iotm.nl/jottem/{id}/iiif/manifest/canvas/1",
  "body": {
    "type": "Choice",
    "items": [
      { "type": "Image", "id": "https://iiif.iotm.nl/3/{origineel}/full/max/0/default.jpg" },
      { "type": "Image", "id": "https://iiif.iotm.nl/3/{ingekleurd}/full/max/0/default.jpg" }
    ]
  }
}
```

## Feitencontrole en moderatie door de gemeenschap ## {#verrijking-feitencontrole}

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
  "target": "https://anno.iotm.nl/w3c/{id}/{bestaande-annotatie}",
  "body": {
    "type": "TextualBody",
    "purpose": "assessing",
    "value": "Klopt, zie de bouwvergunning uit 1972."
  }
}
```

## Thematische collecties en favorieten ## {#verrijking-collecties}

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
