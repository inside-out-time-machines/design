*Werkdocument, juni 2026. Bedoeld voor de IOTM-projectgroep als basis voor een keuze over de infrastructuurrichting van het Jottem-platform. Het kan op elk moment veranderen.*

# Waarom dit document

Jottem moet ergens draaien en, belangrijker nog, ergens duurzaam bewaard blijven. Dit document zet vier infrastructuurrichtingen naast elkaar, zodat de projectgroep een onderbouwde keuze kan maken:

1. **Wikimedia Commons / Wikidata** (uitgewerkt in [iotm-wiki.md](iotm-wiki.md))
2. **Internet Archive (Europe)** (uitgewerkt in [iotm-iae.md](iotm-iae.md))
3. **Archiefinstellingen** (e-Depot, bijvoorbeeld via Streekarchief Midden-Holland)
4. **Alles op de Jottem-server** (volledig in eigen beheer)

Elke richting wordt belicht op vijf punten: duurzaamheid (met als kernvraag: wat als Jottem als project stopt), juridische risico's (auteursrecht, AVG en aanverwant), herbruikbaarheid en standaarden, voor- en nadelen, en de bijdrage aan het Jottem-doel. Steeds bekijken we dat door de drie lagen waaruit een jottem bestaat: de **afbeelding** (het mediabestand), de **metadata** (beschrijvend, technisch, rechten) en de **verrijkingen/annotaties** (correcties, reacties, herinneringen volgens W3C Web Annotations).

# Het beoordelingskader

## Het Jottem-doel, kort

Jottem wil erfgoed participatiever maken: bewoners kunnen zelf foto's, verhalen en kennis toevoegen en bestaande erfgoeddata verrijken, op een laagdrempelige en beheersbare manier. De kernbelofte is dat materiaal dat nu verspreid en vluchtig is (Facebook, WhatsApp, eigen schijven) duurzaam toegankelijk wordt. Drie eisen botsen daarbij voortdurend: lage drempel voor de inzender, lokaal redactioneel eigenaarschap, en duurzame bewaring. De infrastructuurkeuze bepaalt vooral hoe goed die derde eis wordt waargemaakt, zonder de eerste twee te beschadigen.

## De drie lagen hebben verschillende behoeften

Het is verleidelijk om "waar bewaren we Jottem" als één vraag te zien, maar de drie lagen stellen verschillende eisen:

- **Afbeeldingen** vragen om duurzame, redundante bitbewaring en liefst een goede beeldviewer (IIIF). Dit is een opslag- en preserveringsvraag.
- **Metadata** vraagt om gestructureerde, herbruikbare, liefst gelinkte beschrijving die door derden (NDE, Europeana) te oogsten is. Dit is een interoperabiliteitsvraag.
- **Verrijkingen/annotaties** vragen om een levende, laagdrempelige omgeving waar mensen blijven bijdragen en reageren. Dit is een participatievraag, en het is juist de unieke meerwaarde van Jottem.

Een richting kan sterk zijn op de ene laag en zwak op de andere. Dat is de belangrijkste reden waarom de uiteindelijke keuze waarschijnlijk niet "alles bij één partij" is, maar daarover beslist de projectgroep op basis van onderstaande analyse.

# Richting 1: Wikimedia Commons / Wikidata

Volledige uitwerking: [iotm-wiki.md](iotm-wiki.md).

Wikimedia Commons is de mediabank van de Wikimedia-beweging (vrij gelicentieerde bestanden, wereldwijd hergebruikt); Wikidata is de gekoppelde kennisbank. Sinds Structured Data on Commons (SDC) dragen bestanden machineleesbare statements, met als kernrelatie `depicts` (P180) naar Wikidata-items.

**Duurzaamheid (en wat als Jottem stopt).** Zeer sterk voor het deel dat erin past. Eenmaal op Commons/Wikidata leeft het materiaal volledig los van Jottem: het wordt door een wereldwijde vrijwilligersgemeenschap onderhouden, door Wikipedia en Europeana hergebruikt en is daardoor extreem robuust. Als Jottem stopt, blijft dit deel gewoon bestaan.

**Juridische risico's.** Hier zit de grootste botsing. Commons accepteert uitsluitend vrije licenties (CC0, CC BY, CC BY-SA) of publiek domein, bruikbaar door iedereen voor elk doel, zonder fair use. Dat staat haaks op de Jottem-eis dat het auteursrecht bij de inzender blijft en hergebruik alleen onder voorwaarden mag. Alleen materiaal waarvoor de rechthebbende actief een vrije licentie kiest, kan hierheen. AVG: wereldwijd, feitelijk onomkeerbaar hergebruik maakt een latere verwijdering ("recht op vergetelheid") illusoir; recent en herkenbaar-persoonsmateriaal hoort hier niet.

**Herbruikbaarheid en standaarden.** Uitstekend. Open Linked Data, meertalige labels, MediaSearch, SPARQL. Voor metadata is dit de rijkste, best herbruikbare bestemming. Let op: Wikidata kent een notabiliteitsdrempel, en Commons een scope-eis (educatief bruikbaar), dus niet alles is welkom. Geen native IIIF.

**De drie lagen.** Afbeeldingen: alleen de vrij-gelicentieerde, educatief bruikbare subset. Metadata: zeer sterk via SDC en Wikidata-items (gebouwen, zaken, personen). Verrijkingen/annotaties: zwak als levende laag; persoonlijke herinneringen en vrije annotaties passen niet in het encyclopedische/notabele model.

**Bijdrage aan het doel.** Vergroot vooral de wereldwijde vindbaarheid en hergebruik van een nette subset. Draagt minder bij aan de participatieve kernfunctie en niet aan het bewaren van de "lange staart" aan persoonlijk materiaal.

# Richting 2: Internet Archive (Europe)

Volledige uitwerking: [iotm-iae.md](iotm-iae.md).

Het Internet Archive is een non-profit digitale bibliotheek met duurzame, redundante opslag, een officiële IIIF 3.0-dienst en automatische afgeleiden (thumbnails, OCR). Internet Archive Europe (IAE) is de Amsterdamse, ANBI-geregistreerde Europese entiteit, sterk verbonden met de Nederlandse erfgoedsector en sinds 2026 deels op Europese infrastructuur (Eurosky).

**Duurzaamheid (en wat als Jottem stopt).** Sterk. Items krijgen stabiele URLs en blijven los van Jottem bestaan; bitbewaring is redundant. Belangrijkste kanttekening: afhankelijkheid van één organisatie, die in de VS onder juridische en financiële druk staat. De Europese entiteit en EU-hosting verzachten dit, maar het blijft een aandachtspunt; een tweede preserveringskopie is verstandig.

**Juridische risico's.** Veel comfortabeler dan Commons. Het Internet Archive vereist geen vrije licentie: het legt `licenseurl` vast waar van toepassing en een vrij `rights`-veld voor andere voorwaarden, waarbij de uploader verantwoordelijk is. Daarmee blijft het Jottem-rechtenmodel intact. Keerzijde: die uploader-verantwoordelijkheid komt bij IOTM te liggen voor wat het wegschrijft (denk aan auteursrecht van derden op oude menukaarten, advertenties, krantenartikelen). AVG: items kunnen "dark"/restricted of verwijderd worden, maar erasure is na publicatie beperkt; dataresidentie (VS versus EU/Eurosky) moet met IAE worden uitgeklaard.

**Herbruikbaarheid en standaarden.** Goed en praktisch. Native IIIF (Image + Presentation), open API's (IAS3-upload, Metadata API), `internetarchive` Python-bibliotheek, OCR, zoek-API. Metadata is flexibel ("metadata-agnostisch") maar minder gestructureerd/gelinkt dan Wikidata.

**De drie lagen.** Afbeeldingen: sterk, de volledige collectie kan hier terecht onder eigen rechtenvoorwaarden, inclusief IIIF en OCR. Metadata: goed maar minder "linked" dan Wikidata. Verrijkingen/annotaties: geen levende annotatieomgeving; annotaties kunnen als bestand mee, of via IIIF-viewers, maar het is geen participatieplatform.

**Bijdrage aan het doel.** Levert de duurzame opslag- en beeldlaag (inclusief IIIF en OCR) voor de hele collectie, met behoud van het eigen rechtenmodel. Draagt sterk bij aan "duurzaam bewaren", niet aan de levende participatie zelf.

# Richting 3: Archiefinstellingen (e-Depot)

Een e-Depot is het geheel van organisatie, beleid, processen en techniek waarmee een archiefinstelling digitaal materiaal duurzaam beheert en toegankelijk houdt, doorgaans volgens het OAIS-model (ISO). In de Jottem-context ligt dit dichtbij: Streekarchief Midden-Holland is al de organisatie achter de pilot Smaak van Gouda, en archieven hebben een wettelijke bewaartaak (Archiefwet).

**Duurzaamheid (en wat als Jottem stopt).** Op papier het sterkste institutionele fundament: een wettelijk mandaat, formele bewaarprocedures en een bestaande erfgoedpartner die er ook na het project nog is. Als Jottem stopt, blijft het materiaal in het e-Depot onder beheer van de instelling. Belangrijke kanttekening: de duurzaamheid hangt af van bestuurlijke en financiële afspraken, en die zijn niet onfeilbaar. Een waarschuwend voorbeeld is dat het Rijk zich terugtrok uit de gedeelde e-Depot-voorziening, waardoor de Groninger Archieven die per 2024 niet meer konden gebruiken. e-Depots verschillen bovendien sterk per instelling.

**Juridische risico's.** Hier het sterkst. Archieven hebben een bestaand juridisch kader: schenkings-/bewaarovereenkomsten waarin het auteursrecht bij de inzender kan blijven, formele AVG-procedures, Nederlandse/EU-jurisdictie en geoefende verwijder- en embargoprocessen. Voor zowel auteursrecht als AVG is dit de meest beheerste route. Wel blijft auteursrecht van derden op aangeleverd materiaal een aandachtspunt, net als bij de andere richtingen.

**Herbruikbaarheid en standaarden.** Wisselend en doorgaans het minst open. e-Depots draaien op archiefstandaarden (OAIS, metadatamodellen als TMLO/MDTO) die gericht zijn op records­management en authenticiteit, niet op schema.org, IIIF of W3C-annotaties. Toegang en API's (OAI-PMH, IIIF) verschillen per instelling. Mapping van het Jottem-model naar het archiefmodel is nodig en niet triviaal.

**De drie lagen.** Afbeeldingen: zeer duurzaam geborgd, maar een e-Depot is primair een preserveringsvoorziening, geen publieks- of participatieplatform; publieke toegang loopt via het archiefportaal. Metadata: duurzaam, maar in een ander (records-)model; minder direct herbruikbaar als Linked Data. Verrijkingen/annotaties: dit is de zwakke plek. Een levende, door burgers veranderbare annotatielaag past slecht bij de archieflogica van vaste, authentieke records; archieven nemen crowdsourced verrijkingen meestal niet als levende laag op.

**Bijdrage aan het doel.** Sterk op duurzaamheid, vertrouwen en lokaal eigenaarschap, en het past bij het decentrale NDE-model. Maar het knelt juist op de participatieve kern: de verrijkingen en de lage drempel, het hart van Jottem, krijgen hier het minst ruimte.

# Richting 4: Alles op de Jottem-server

In deze richting host en bewaart IOTM alles zelf: afbeeldingen, metadata en annotaties in één geïntegreerd systeem, precies zoals het ontwerp (ARK, IIIF, schema.org NDE, W3C Web Annotations, Change Discovery, Elasticsearch) het voorschrijft.

**Duurzaamheid (en wat als Jottem stopt).** Dit is de zwakste richting, en wel op precies het punt waar Jottem zijn bestaansrecht aan ontleent. Eén server, één project, één financieringsstroom: als het project of de subsidie stopt, gaat de server uit en is alles weg, exact het verdwijnen-van-erfgoed-probleem dat Jottem wil oplossen. Zonder expliciete exit- en exportstrategie (en een partij die die uitvoert) is dit een single point of failure.

**Juridische risico's.** Op beheersbaarheid juist het sterkst: volledige controle over rechtenafspraken, eenvoudige verwijdering (AVG), en vrije keuze van dataresidentie (EU). Keerzijde: alle aansprakelijkheid en alle beheerlast liggen bij IOTM en de deelnemende organisaties, ook op de lange termijn.

**Herbruikbaarheid en standaarden.** Potentieel uitstekend zolang de server draait: IOTM implementeert open standaarden, dus de data is harvestbaar door NDE en Europeana en bruikbaar in IIIF-viewers. Maar herbruikbaarheid die afhangt van één draaiende server is fragiel; valt de server weg, dan vallen ook de standaard-endpoints weg.

**De drie lagen.** Afbeeldingen, metadata én verrijkingen/annotaties zitten hier integraal en optimaal bij elkaar, met de laagste drempel en de meeste functionaliteit. Dit is functioneel de beste thuisbasis voor de levende annotatielaag, en tegelijk de slechtste voor duurzame bewaring.

**Bijdrage aan het doel.** Maximaal op participatie, controle en laagdrempeligheid; minimaal op de belofte van duurzame bewaring. In zuivere vorm ondermijnt deze richting de kernbelofte van het project.

# Vergelijking in één oogopslag

Score: ++ sterk, + voldoende, +/- wisselend, - zwak.

<table class="data numbered">
<thead>
<tr><th>Criterium<th>Wikimedia<th>Internet Archive (E)<th>Archief / e-Depot<th>Jottem-server
<tbody>
<tr><th>Duurzaamheid als Jottem stopt<td>++ (vrije subset)<td>++ (1 partij)<td>++ (mits afspraken)<td>-
<tr><th>Auteursrecht past bij eigen model<td>- (alleen vrij)<td>++<td>++<td>++
<tr><th>AVG / verwijderbaarheid / jurisdictie<td>- (mondiaal)<td>+/- (US/EU)<td>++<td>++
<tr><th>Herbruikbaarheid / open standaarden<td>++<td>+<td>+/-<td>+ (zolang server draait)
<tr><th>Native IIIF<td>-<td>++<td>+/-<td>++
<tr><th>Geschikt voor afbeeldingen<td>+ (subset)<td>++<td>++<td>++
<tr><th>Geschikt voor metadata<td>++<td>+<td>+<td>++
<tr><th>Geschikt voor verrijkingen/annotaties<td>-<td>+/-<td>-<td>++
<tr><th>Lage drempel voor inzender<td>n.v.t. (achterkant)<td>n.v.t. (achterkant)<td>n.v.t. (achterkant)<td>++
<tr><th>Lokaal eigenaarschap / vertrouwen<td>+/-<td>+<td>++<td>++
<tr><th>Beheerslast voor IOTM<td>laag<td>laag<td>midden<td>hoog
</table>

# Synthese en afwegingen

Drie observaties komen uit de tabel naar voren.

Ten eerste scoort **geen enkele richting op alles**. Wikimedia is sterk op herbruikbaarheid maar botst juridisch en sluit de lange staart uit. Het Internet Archive is sterk op duurzame opslag en IIIF en past bij het rechtenmodel, maar leunt op één organisatie en is geen participatieplatform. Archiefinstellingen zijn juridisch en institutioneel het sterkst, maar het zwakst op open standaarden en op de levende annotatielaag. De eigen server is functioneel het sterkst en duurzaam het zwakst.

Ten tweede hebben **de drie lagen verschillende optimale bestemmingen**. De levende verrijkingen/annotaties horen dicht bij de gebruiker en passen alleen echt in de Jottem-server (richting 4). Duurzame bitbewaring van afbeeldingen hoort bij een preserverings­partij (Internet Archive of e-Depot). Maximale herbruikbaarheid van metadata hoort bij Linked Data (Wikidata, of Jottem-RDF die geoogst wordt). Eén richting voor alle drie de lagen kiezen betekent dus per definitie een compromis op minstens één laag.

Ten derde is de scherpste tegenstelling die tussen **richting 4 (functioneel het best, duurzaam het slechtst)** en de drie externe richtingen (duurzaam sterker, functioneel beperkter). Dat is geen toeval: het is dezelfde spanning tussen "levend en laagdrempelig" en "duurzaam geborgd" die in het hele project zit.

Hieruit volgt logisch een **gelaagde aanpak** als serieus te overwegen optie: Jottem-server als participatie- en annotatielaag én bron-van-waarheid, met daaronder een duurzame preserveringskopie bij een externe partij (Internet Archive/IAE of een e-Depot), en optioneel Wikimedia voor wereldwijde vindbaarheid van de vrij-gelicentieerde subset. De moderatiestap die Jottem toch al heeft, is dan precies het moment waarop materiaal wordt geklaard en doorgezet naar de duurzame laag.

# Richting voor de keuze (de projectgroep beslist)

Als de projectgroep één richting moet aanwijzen, helpt het om eerst de vraag te beantwoorden: *wat is de belangrijkste eis?*

- Is dat **duurzame borging met juridisch en institutioneel comfort**, en is participatie iets dat ook beperkter mag, dan wijst dat richting **archiefinstellingen (e-Depot)**, met Streekarchief Midden-Holland als logische eerste partner, mits de bestuurlijke en financiële afspraken hard zijn.
- Is dat **duurzame opslag plus volwaardige beeldfunctionaliteit (IIIF, OCR) met behoud van het eigen rechtenmodel**, dan wijst dat richting **Internet Archive (Europe)**, met een tweede kopie als verzekering.
- Is dat **maximale wereldwijde vindbaarheid en hergebruik**, dan is **Wikimedia** waardevol, maar alleen voor een subset en niet als enige bewaarplek.
- Is dat **maximale functionaliteit en regie op de korte termijn**, dan is de **Jottem-server** aantrekkelijk, maar dan moet de duurzaamheidsvraag apart en expliciet worden opgelost, anders staat de kernbelofte op het spel.

Het advies dat uit deze analyse volgt, is om de eigen Jottem-server niet als eindbestemming maar als participatielaag te zien, en daaronder bewust te kiezen voor minstens één duurzame externe laag. De zuivere "alles op één plek"-keuze is verdedigbaar, maar dan het beste richting een preserverings­partij (Internet Archive/IAE of e-Depot) voor afbeeldingen en metadata, in de wetenschap dat de verrijkingen­laag daar de minste ruimte krijgt en deels in Jottem zelf zal moeten blijven leven. De definitieve afweging, inclusief het gewicht van elk criterium, is aan de projectgroep.

# Bronnen

- [iotm-wiki.md](iotm-wiki.md) - uitwerking Wikimedia Commons / Wikidata
- [iotm-iae.md](iotm-iae.md) - uitwerking Internet Archive (Europe)
- [Wat is een e-Depot? - Nationaal Archief](https://www.nationaalarchief.nl/archiveren/kennisbank/wat-is-een-e-depot)
- [e-depot - Groninger Archieven](https://www.groningerarchieven.nl/over-ons/diensten/e-depot)
- [E-Depot - NORA Online](https://www.noraonline.nl/wiki/E-Depot)
- [Digitaal erfgoed houdbaar - Netwerk Digitaal Erfgoed](https://netwerkdigitaalerfgoed.nl/houdbaar/)
- [DERA: Digitaal Erfgoed Referentie Architectuur](https://dera.netwerkdigitaalerfgoed.nl/index.php/Diensten)
- [Nationale Strategie Digitaal Erfgoed 2025-2028](https://netwerkdigitaalerfgoed.nl/nationale-strategie/)
- [Commons:Project scope - Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Project_scope)
- [Making IIIF Official at the Internet Archive - Internet Archive Blogs](https://blog.archive.org/2023/09/18/making-iiif-official-at-the-internet-archive/)
- [Item Metadata API - Internet Archive Developer Portal](https://archive.org/developers/metadata.html)
