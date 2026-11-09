# Praatplaten # {#praatplaten}

<style>
img, svg {
    background: var(--bg);
    max-width: 100%;
}
</style>

Deze praatplaten komen uit de verkenning van augustus 2026 en dienden als gespreksstof met de
partners. Waar ze opslag bij het Internet Archive of een persistente identifier (PID) als vaste
stap tonen, geldt inmiddels het [[#keuze-oplossingsrichting]]: dat is een latere fase, en de
pilot slaat alles in eigen beheer op binnen de EER.

<h3 id="praatplaat-stakeholders">Belanghebbenden</h3>
<img src="images/slide-2.svg" alt="Vier kolommen, van links naar rechts verbonden met pijlen. Steden: Amsterdam, Gouda, Hilversum, Utrecht. Tijdmachine-initiatieven: Amsterdam Time Machine, Gouda Tijdmachine, Hilversum Time Machine, Utrecht Time Machine. Archieforganisaties: Stadsarchief Amsterdam, Streekarchief Midden-Holland, Archief Gooi en Vechtstreek, Het Utrechts Archief, plus het Internet Archive. Historische verenigingen: Vereniging Ons Amsterdam, Historische Vereniging Die Goude, Hilversumse Historische Kring, Oud Utrecht.">

Per stad werken vier soorten partijen samen: de stad en haar bewonderaars, het lokale
tijdmachine-initiatief, het archief en de historische vereniging.

<h3 id="praatplaat-media-process">Mediaproces</h3>

<img src="images/slide-3.svg" alt="Stroomschema in drie stappen. Privacy (slotje) en auteursrecht (copyrightteken) leiden via een Creative Commons-licentie naar stap 1, Media Identification: wie, wanneer, wat, waar. Stap 2, Media Publication: Internet Archive, archiefinstellingen (met vraagteken), Wikimedia Commons doorgestreept. Stap 3, Media Annotation: verhalen, locaties, personen.">

Een bijdrage wordt eerst geïdentificeerd (wie, wanneer, wat, waar), daarna gepubliceerd en
vervolgens verrijkt met verhalen, locaties en personen. Privacy en auteursrecht gaan aan
publicatie vooraf; Wikimedia Commons viel al in de verkenning af als publicatieplek.

<h3 id="praatplaat-process-steps">Processtappen</h3>

<img src="images/slide-4.svg" alt="Vijf stappen naast elkaar, elk met een pictogram en een tussenproduct. 1: geregistreerde gebruikers uploaden media met metadata (levert media en metadata). 2: verenigingen controleren kwaliteit, auteursrecht en privacy (levert vrijgegeven media en gecontroleerde metadata). 3: duurzame opslag bij een organisatie die IIIF en een persistente identifier levert, met het logo van het Internet Archive (levert daarbij een persistente identifier). 4: geïdentificeerde gebruikers verrijken de media (levert ook annotaties). 5: gebruik van media, metadata en annotaties bij tijdmachines, verenigingen en archieven.">

Van upload tot hergebruik groeit een bijdrage in vijf stappen: van ruwe media met metadata
tot gecontroleerd en verrijkt materiaal dat tijdmachines, verenigingen en archieven
kunnen gebruiken.

<h3 id="praatplaat-platform-parts"> Platformonderdelen</h3>
<img src="images/slide-5.svg" alt="Vier lagen als concentrische halve cirkels, van buiten naar binnen. Publiek: promotie, verenigingsthema, delen, widgets en API's. Semi-publiek: registratie en (social) login, uploaden en metadateren, annoteren, reageren. Organisatiebeheer: metadata beheren, bulkupload van een collectie, publicatieworkflow, gebruikersbeheer. Platformbeheer: verenigings- en contractbeheer, verenigingsthema's.">

Het platform is opgebouwd in schillen: wat iedereen ziet, wat ingelogde deelnemers doen, wat
een organisatie beheert en wat de platformbeheerder regelt.

<h3 id="praatplaat-annotations">Annotaties</h3>

<img src="images/slide-6.svg" alt="Een historische foto van een rij mensen voor een gevel, omringd door tekstballonnen met mogelijke bijdragen: ik weet waar dat bedrijf is beschreven; ik weet welk bedrijf dat was (bij een vak om een uithangbord); ik weet waar deze foto is genomen (met een camera en zichtveld); ik heb hier herinneringen aan; ik heb hier een verhaal over; dit was ter gelegenheid van; deze foto is te classificeren als; ik weet wie dat is (bij een vak om een persoon); ik weet waar de stamboom staat.">

Eén foto roept veel soorten kennis op: wie of wat erop staat, waar en wanneer hij is
gemaakt, waar meer informatie te vinden is, en persoonlijke herinneringen. Elk daarvan is een
verrijking in het hoofdstuk [[#verrijkingen]].

<h3 id="praatplaat-technology-parts">Technische onderdelen</h3>

<img src="images/slide-7.svg" alt="Drie kolommen. Database voor metadata, gebruikersbeheer en configuratie, met pictogrammen voor Creative Commons en een ark (ARK). Tijdelijke en duurzame opslag van media en metadata (foto's, later audio en video), met de logo's van IIIF en S3. Annotation Repository, met een schema van het W3C-annotatiemodel (annotatie, body, target) en de naam AnnoRepo.">

De techniek valt uiteen in drie delen: een database voor metadata en gebruikers, opslag van de
media met IIIF, en een annotatieserver (AnnoRepo) voor de W3C Web Annotations.
