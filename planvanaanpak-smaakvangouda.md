*Project "Smaak van Gouda, verhalen achter verdwenen restaurants in de stad" van
Streekarchief Midden-Holland (SAMH), als eerste project op het Jottem-platform.*

Dit plan beschrijft in drie fasen wat er moet gebeuren om het project in te richten,
te testen en in gebruik te nemen: welke instellingen gekozen worden en waarom, hoe we
toetsen dat alles werkt, en wat er bij de lancering nodig is aan communicatie,
moderatie en inbedding op de eigen website. De technische gang naar productie
(infrastructuur, domeinen, beheer en exploitatie) valt buiten dit plan.

Achtergrond: [pilot Smaak van Gouda](./#pilot-smaak-van-gouda), de
[usecases](./#usecases) en de [acceptatiecriteria](./#acceptatiecriteria) in het
ontwerpdocument. Keuzes die nog open staan zijn gemarkeerd met `[ ] keuze`.

## Rollen en mensen ## {#pva-rollen-en-mensen}

<table class="data">
<thead>
<tr><th>Rol</th><th>Wie (in te vullen)</th><th>Taak in dit plan</th></tr>
</thead>
<tbody>
<tr><td>Platformbeheerder</td><td>IOTM (Bob)</td><td>maakt de organisatie aan, benoemt de organisatiebeheerder</td></tr>
<tr><td>Organisatiebeheerder</td><td>SAMH, 1 tot 2 personen</td><td>richt het project in, beheert moderatoren en instellingen, plaatst widgets</td></tr>
<tr><td>Moderatoren</td><td>SAMH plus eventueel vrijwilligers, minimaal 2</td><td>beoordelen bijdragen, handelen meldingen en verwijderverzoeken af</td></tr>
<tr><td>Projectleider Smaak van Gouda</td><td>SAMH</td><td>communicatie, verzameldagen, contact met partners</td></tr>
<tr><td>Testers</td><td>3 tot 5 inwoners of vrijwilligers</td><td>doorlopen de testscripts als gewone gebruiker</td></tr>
</tbody>
</table>

Beheerders en moderatoren loggen in met een wachtwoord plus tweestapsverificatie
(TOTP-app of passkey); dat wordt afgedwongen bij de eerste login na de uitnodiging.
Gewone gebruikers loggen in met e-mail en wachtwoord of via Google, Microsoft of Facebook.

## Fase 1: Inrichten (op de testomgeving dev.iotm.nl) ## {#pva-fase-1-inrichten-op-de-testomgeving-dev-iotm-nl}

### 1.1 Organisatie Streekarchief Midden-Holland ### {#pva-1-1-organisatie-streekarchief-midden-holland}

Door de platformbeheerder via Platformbeheer, daarna bij te werken door de
organisatiebeheerder.

<table class="data">
<thead>
<tr><th>Instelling</th><th>Keuze</th><th>Toelichting</th></tr>
</thead>
<tbody>
<tr><td>Naam en slug</td><td>Streekarchief Midden-Holland, <code>samh</code></td><td>de slug staat in alle adressen (<code>/organisatie/samh/...</code>) en in de open data; daarna niet meer wijzigen</td></tr>
<tr><td>Beschrijving</td><td>korte alinea over SAMH als bewaarplaats van de regio</td><td>staat op de organisatiepagina en in de datasetbeschrijvingen</td></tr>
<tr><td>Website</td><td>https://samh.nl/</td><td></td></tr>
<tr><td>Publisher e-mail en identifier</td><td>publiek contactadres van SAMH; ISIL-code <code>[ ] keuze</code></td><td>komen als uitgever in de datasetbeschrijving bij het NDE Datasetregister</td></tr>
<tr><td>Plaats</td><td>Gouda (GeoNames)</td><td>wordt <code>spatialCoverage</code> van de datasets en het startpunt van de kaart</td></tr>
<tr><td>Huisstijl</td><td>primair <code>#008264</code>, secundair <code>#00ccfe</code>, achtergrond standaard; logo en favicon van SAMH</td><td>nu op dev ingesteld; tekst op de groene header wordt automatisch wit. <code>[ ] keuze</code>: kleuren bevestigen met de communicatieafdeling</td></tr>
<tr><td>Organisatiebeheerder(s)</td><td>naam en e-mail van de SAMH-beheerder</td><td>uitnodiging per mail (mail 1); de rol staat klaar bij de eerste login</td></tr>
</tbody>
</table>

### 1.2 Project Smaak van Gouda ### {#pva-1-2-project-smaak-van-gouda}

Door de organisatiebeheerder via Organisatiebeheer, Bewerken.

**Basis**

<table class="data">
<thead>
<tr><th>Instelling</th><th>Keuze</th><th>Toelichting</th></tr>
</thead>
<tbody>
<tr><td>Naam en slug</td><td>Smaak van Gouda, <code>smaak-van-gouda</code></td><td>adres: <code>/organisatie/samh/smaak-van-gouda</code>; de slug staat ook in de naam van de datadump</td></tr>
<tr><td>Oproep</td><td>één of twee zinnen die uitnodigen, bijvoorbeeld "Welke restaurants, cafés en snackbars herinner jij je? Deel je foto's, menukaarten en verhalen."</td><td>staat bovenaan de projectpagina, in de widgets en in de preview van gedeelde links; <code>[ ] keuze</code> definitieve tekst</td></tr>
<tr><td>Beschrijving</td><td>de aanleiding en het doel uit het pilotdocument, in drie tot vijf zinnen</td><td></td></tr>
<tr><td>Periode</td><td>bijvoorbeeld 1900-heden</td><td>alleen informatief</td></tr>
<tr><td>Datasetlicentie</td><td>CC BY 4.0</td><td>inzenders bevestigen deze licentie bij het uploaden; <code>[ ] keuze</code> CC BY 4.0 (hergebruik met naamsvermelding, aanbevolen) of CC0</td></tr>
<tr><td>Status</td><td>actief</td><td>afgerond pas na afloop van de campagne</td></tr>
<tr><td>Projectafbeelding</td><td>sfeerbeeld van een verdwenen Goudse horecazaak, liggend formaat</td><td>staat op de startpagina en in de widgets</td></tr>
</tbody>
</table>

**Openbaarheid**

<table class="data">
<thead>
<tr><th>Keuze</th><th>Aanbeveling</th></tr>
</thead>
<tbody>
<tr><td>Openbaar of besloten</td><td><strong>openbaar</strong>: het project leeft van brede deelname en delen via sociale media. Besloten is bedoeld voor een vaste groep (bijvoorbeeld een interviewproject) en kan later altijd nog per project worden ingesteld</td></tr>
</tbody>
</table>

**Instellingen**

<table class="data">
<thead>
<tr><th>Instelling</th><th>Keuze</th><th>Toelichting</th></tr>
</thead>
<tbody>
<tr><td>Uploadwijzen</td><td>alle vier aan: bestand, camera, beeldbank-permalink, foto-URL</td><td>de beeldbank-permalink werkt met de Memorix-beeldbank van SAMH, zodat bestaand materiaal uit de eigen collectie als jottem kan worden toegevoegd zonder kopie</td></tr>
<tr><td>Terminologiebronnen</td><td><strong>Goudse straten</strong>, GeoNames (Nederland, België en Duitsland), Cultuurhistorische Thesaurus, Rijksmonumentenregister, Wikidata: straten in Nederland</td><td>een korte lijst houdt de keuzelijsten bij het annoteren overzichtelijk; "Goudse straten" is de belangrijkste bron voor adressen. <code>[ ] keuze</code>: AAT of GTAA toevoegen voor materiaaltypen</td></tr>
<tr><td>Verrijkingen</td><td>alle MVP-verrijkingen aan: herinneringen en verhalen, aanwijzen op de foto, steekwoorden, vragen stellen, externe bronnen koppelen, datering, begrippen uitleggen, standpunt van de fotograaf, zelfde object andere foto</td><td>"zelfde object, andere foto" is precies wat een reeks opvolgende zaken in één pand zichtbaar maakt; "datering" en "externe bronnen" dragen bij aan de pand-tijdlijn en de archiefkoppeling uit het pilotdocument</td></tr>
</tbody>
</table>

**Datasetbeschrijving**

De beschrijving wordt gegenereerd uit de projectvelden. Aanmelden bij het NDE
Datasetregister kan pas als er gepubliceerde jottems zijn; dat is een stap voor fase 3.

### 1.3 Moderatoren en ledenbeheer ### {#pva-1-3-moderatoren-en-ledenbeheer}

* Minimaal twee moderatoren uitnodigen (naam, e-mail) via Organisatiebeheer; zij
    ontvangen mail 2 met de spelregels en de link naar de
    [handreiking moderatie](https://design.iotm.nl/juridisch/handreiking-moderatie.html).
* `[ ] keuze`: of vrijwilligers van partnerorganisaties (Stichting Gedeeld Verleden,
    Gezamenlijke Toekomst) ook moderator worden, of alleen SAMH-medewerkers.
* Ledenbeheer is alleen nodig bij een besloten project en blijft voor Smaak van Gouda leeg.

### 1.4 Teksten en juridische stukken klaarzetten ### {#pva-1-4-teksten-en-juridische-stukken-klaarzetten}

* Spelregels, privacybeleid en algemene voorwaarden staan onder
    [juridisch](https://design.iotm.nl/juridisch/); controleren dat de versie klopt met
    wat SAMH wil uitdragen. `[ ] keuze`: SAMH tekent de samenwerkingsovereenkomst.
* Het interviewprotocol gebruiken bij de interviews met oud-ondernemers (toestemming
    voor publicatie van herinneringen en eventuele audio).

Opleverpunt fase 1: de projectpagina op dev.iotm.nl staat ingericht, de beheerder en de
moderatoren zijn ingelogd met tweestapsverificatie, en de keuzes hierboven zijn
vastgelegd (de `[ ]`-punten zijn aangevinkt).

## Fase 2: Testen (op dev.iotm.nl) ## {#pva-fase-2-testen-op-dev-iotm-nl}

Doel: elk pad dat een inwoner, moderator of beheerder straks bewandelt is één keer
echt doorlopen, met echte mail en echte accounts. Toetsen tegen de
[acceptatiecriteria](./#acceptatiecriteria); de nummers hieronder verwijzen daarnaar.

### 2.1 Testscripts ### {#pva-2-1-testscripts}

**Bezoeker zonder account (BE-1, BE-2, BE-6)**

1. Open de projectpagina; controleer oproep, beschrijving, licentie, aantal jottems.
2. Open een jottem; zoom in de viewer, lees de annotaties, bekijk de gerelateerde jottems.
3. Deel een jottem via de Delen-knop (telefoon) en plak de link in WhatsApp of
    LinkedIn: titel, oproep en afbeelding verschijnen in de preview.
4. Rapporteer een annotatie (BE-7) en controleer dat de melding in de moderatie staat.

**Inwoner als inzender (GE-1, GE-2, UP-criteria)**

1. Registreer met e-mail en met een social login; stel in het profiel naam en foto in,
    en kies of de naam publiek is.
2. Upload vanaf een telefoon: foto maken met de camera, met adres, speld op de kaart
    en openings- en sluitingsjaar. Bevestig de licentie.
3. Upload een menukaart als bestand met genre "menukaart".
4. Voeg een Memorix-permalink toe uit de SAMH-beeldbank; controleer dat titel en
    datering worden overgenomen.
5. Upload een foto met herkenbare personen: de toestemmingsvraag verschijnt; test
    zowel "ja" als "nee" (het laatste komt met vlag in de wachtrij).
6. Dien een afgekeurde jottem opnieuw in na de afkeurmail.

**Inwoner als annoteerder**

1. Plaats bij een gepubliceerde jottem een herinnering, een datering, een steekwoord
    uit "Goudse straten", een vlak met een persoon of gebouw, en een koppeling naar
    een archiefbron.
2. Koppel twee jottems als "zelfde object, andere foto".
3. Bewerk en verwijder een eigen annotatie; reageer op een annotatie van een ander.
4. Controleer de attenderingsmail (maximaal één per dag) en de uitschakellink.

**Moderator (MO-1 tot en met MO-6)**

1. Open de wachtrij; beoordeel een jottem vanaf de beoordeelpagina: goedkeuren en
    afkeuren met reden. Controleer de mails aan de inzender.
2. Handel een melding af (verbergen, verwijderen, afwijzen).
3. Handel een verwijderverzoek af; controleer de tombstone op de duurzame link en dat
    het beeld uit de IIIF-cache is.
4. Controleer de dagelijkse digestmail bij een gevulde wachtrij.

**Organisatiebeheerder (OB-1 tot en met OB-4, OB-7, OB-8)**

1. Wijzig oproep en projectafbeelding; zet een uploadwijze uit en controleer het
    uploadformulier.
2. Zet een testproject tijdelijk op besloten, nodig een lid uit, doorloop de
    wachtwoordmail en controleer de afscherming; zet daarna terug.
3. Toon de datasetbeschrijving, valideer en meld aan bij het Datasetregister
    (op dev tegen de testomgeving van het register).

**Open data (AP-criteria)**

1. Controleer IIIF-manifest en -collectie, RSS, de RDF-dump en de datasetbeschrijving
    op data.dev.iotm.nl; laad de collectie in een externe IIIF-viewer.
2. Doe een SPARQL-vraag op de projectgraaf (bijvoorbeeld alle jottems met een adres).

### 2.2 Werkwijze ### {#pva-2-2-werkwijze}

* Twee testrondes van een week: ronde 1 met SAMH-medewerkers, ronde 2 met drie tot
    vijf inwoners die niet bij het project betrokken zijn, met een korte
    observatie (schermdelen of naast elkaar zitten).
* Bevindingen in één lijst (GitHub-issues in `inside-out-time-machines/jottem`) met
    prioriteit: blokkerend voor lancering, hinderlijk, cosmetisch.
* Testmateriaal is herkenbaar (titel begint met "TEST") en wordt vóór de lancering
    gedepubliceerd en verwijderd, zodat de productiedata schoon begint. Jottems die bij
    het testen zijn ingediend met echt materiaal van SAMH mogen blijven.

Opleverpunt fase 2: alle blokkerende bevindingen zijn opgelost en opnieuw getest; de
moderatoren hebben elk minstens tien jottems beoordeeld.

## Fase 3: In gebruik nemen ## {#pva-fase-3-in-gebruik-nemen}

### 3.1 Moderatie klaar voor de start ### {#pva-3-1-moderatie-klaar-voor-de-start}

<table class="data">
<thead>
<tr><th>Onderwerp</th><th>Afspraak</th></tr>
</thead>
<tbody>
<tr><td>Bezetting</td><td>minimaal twee moderatoren, met een rooster voor de lanceringsweken (dagelijks kijken) en daarna een vaste reactietijd <code>[ ] keuze</code>: binnen 2 werkdagen</td></tr>
<tr><td>Werkwijze</td><td>beoordelen vanaf de beoordeelpagina; afkeuren altijd met een reden die vertelt wat er nodig is om het wél te laten lukken (de inzender krijgt die mail)</td></tr>
<tr><td>Herkenbare personen</td><td>volgen van de handreiking: recente foto's van herkenbare personen alleen met verklaring van de inzender; bij twijfel niet publiceren</td></tr>
<tr><td>Meldingen en verwijderverzoeken</td><td>verwijderverzoeken binnen de wettelijke termijn (30 dagen) afhandelen; meldingen op annotaties binnen de reactietijd</td></tr>
<tr><td>Digestmail</td><td>moderatoren laten de dagelijkse digest aan staan, zodat een gevulde wachtrij nooit onopgemerkt blijft</td></tr>
<tr><td>Escalatie</td><td>wie beslist bij twijfel over auteursrecht of privacy (contactpersoon bij SAMH) <code>[ ] keuze</code></td></tr>
</tbody>
</table>

### 3.2 Startmateriaal ### {#pva-3-2-startmateriaal}

Een lege projectpagina nodigt niet uit. Vóór de lancering plaatst SAMH zelf een
startset: `[ ] keuze` 20 tot 30 jottems uit de eigen beeldbank (via de
Memorix-permalink, dus zonder kopie) met adres, datering en een eerste herinnering of
vraag als annotatie. Daarmee werkt ook "zelfde object, andere foto" meteen zichtbaar.

### 3.3 Communicatie ### {#pva-3-3-communicatie}

<table class="data">
<thead>
<tr><th>Middel</th><th>Inhoud en moment</th></tr>
</thead>
<tbody>
<tr><td>Projectpagina en oproep</td><td>definitieve oproeptekst en projectafbeelding (fase 1); de pagina is de landingsplek van alle communicatie</td></tr>
<tr><td>Website samh.nl</td><td>een projectpagina met de Jottem-widgets (zie 3.4) en een directe link naar de projectpagina</td></tr>
<tr><td>Persbericht en lokale media</td><td>bij de lancering, met de oproep en de data van verzameldagen (AD Groene Hart, Goudse Post, Gouda FM, Omroep West)</td></tr>
<tr><td>Sociale media</td><td>elke week één gepubliceerde jottem delen met de deelknop; de preview toont een wisselende oproep tot bijdragen (bijvoorbeeld "Weet jij wanneer dit was?")</td></tr>
<tr><td>Verzameldagen en scansessies</td><td>in het archief en in wijken; medewerkers helpen bij uploaden met de camera van de telefoon of scannen materiaal ter plekke; partners: wijkverenigingen, Stichting Gedeeld Verleden, Gezamenlijke Toekomst</td></tr>
<tr><td>Interviews</td><td>oud-horecaondernemers, met het interviewprotocol; herinneringen als annotaties, audio volgt in fase 2 van het platform</td></tr>
<tr><td>Nieuwsbrief SAMH</td><td>aankondiging en daarna een maandelijkse "jottem van de maand"</td></tr>
</tbody>
</table>

Alle uitingen gebruiken de huisstijl van SAMH (de projectpagina en widgets kleuren al
mee) en het Jottem-woordmerk conform de [merkgids](https://brand.iotm.nl/).

### 3.4 Widgets en inbedding op samh.nl ### {#pva-3-4-widgets-en-inbedding-op-samh-nl}

De organisatiebeheerder vindt op de projectbewerkpagina onder "Widgets" de adressen
en de kopieerbare code. Aanbeveling voor samh.nl:

<table class="data">
<thead>
<tr><th>Plek</th><th>Widget</th></tr>
</thead>
<tbody>
<tr><td>Projectpagina op samh.nl</td><td>projectinfo-widget bovenaan, daaronder de "recente jottems"-widget met 6 beelden</td></tr>
<tr><td>Homepage samh.nl</td><td>"willekeurige jottems"-widget met 3 of 4 beelden, zodat de homepage steeds anders oogt</td></tr>
<tr><td>Nieuwsbrief of blog</td><td>geplakte Jottem-link: platforms met oEmbed (WordPress, Mastodon) tonen de jottem automatisch als embed</td></tr>
</tbody>
</table>

Inbedden kan met een iframe (in WordPress: blok "Aangepaste HTML") of met het script,
dat lettertype en kleuren van samh.nl overneemt. `[ ] keuze`: iframe of script, en
stijl `accent` (SAMH-groen als accent) of `neutraal`.

Idem op goudatijdmachine.nl.

### 3.5 Open data en Datasetregister ### {#pva-3-5-open-data-en-datasetregister}

* Zodra er gepubliceerde jottems zijn: datasetbeschrijving valideren en aanmelden bij
    het NDE Datasetregister (OB-4). Daarmee is Smaak van Gouda vindbaar voor andere
    erfgoedinstellingen en de Gouda Tijdmachine.
* RSS-feed van het project aanbieden op samh.nl en aan de Gouda Tijdmachine.

### 3.6 Nazorg en evaluatie ### {#pva-3-6-nazorg-en-evaluatie}

* Na vier weken: aantal inzenders, jottems, annotaties en afkeurredenen bekijken
    (statistieken in het organisatiebeheer en het Gebeurtenislog); de oproeptekst en
    verrijkingen bijstellen als bepaalde oproepen niet aanslaan.
* Na drie maanden: evaluatie met SAMH en IOTM: wat vraagt het platform nog
    (pand-tijdlijn, kaartkoppeling met de Gouda Tijdmachine, audio) en wat betekent dat
    voor fase 2.

## Checklist ## {#pva-checklist}

**Fase 1, inrichten**

- [ ] Organisatie SAMH aangemaakt met huisstijl, publisher en plaats
- [ ] Organisatiebeheerder uitgenodigd en ingelogd met tweestapsverificatie
- [ ] Project Smaak van Gouda ingericht: oproep, beschrijving, licentie, afbeelding
- [ ] Openbaarheid: openbaar
- [ ] Uploadwijzen, terminologiebronnen en verrijkingen gekozen en ingesteld
- [ ] Minimaal twee moderatoren uitgenodigd en ingelogd
- [ ] Juridische stukken gecontroleerd en samenwerkingsovereenkomst getekend

**Fase 2, testen**

- [ ] Testronde 1 (SAMH) doorlopen, bevindingen gelogd
- [ ] Testronde 2 (inwoners) doorlopen, bevindingen gelogd
- [ ] Blokkerende bevindingen opgelost en hertest
- [ ] Testmateriaal opgeruimd

**Fase 3, in gebruik nemen**

- [ ] Moderatierooster, reactietijd en escalatie afgesproken
- [ ] Startset jottems geplaatst en gepubliceerd
- [ ] Widgets op samh.nl geplaatst
- [ ] Persbericht, sociale media en nieuwsbrief gepland
- [ ] Verzameldagen gepland met partners
- [ ] Datasetbeschrijving aangemeld bij het Datasetregister
- [ ] Evaluatiemomenten (4 weken, 3 maanden) in de agenda
