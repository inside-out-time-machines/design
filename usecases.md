# Usecases per rol # {#usecases}

Ter ondersteuning van onderstaande usescases is er een [prototype](https://prototype.iotm.nl/).

## Als platformbeheerder kan ik ## {#platformbeheerder}

* inloggen, profiel (naam, afbeelding, privacy instellingen, wachtwoord, 2FA) inzien en wijzigen en uitloggen  
* een organisatiejottem definiëren, deze heeft een naam (van vereniging, archiefinstelling, instituut, enz.), slug, favicon, logo, kleurenpalet (primary, secondary, background, …), ARK NAAN  
* gebruikers (naam, e-mail) in de rol organisatiebeheerder van een organisatiejottem toevoegen, bewerken en verwijderen  
  * bij toevoegen van een gebruiker ontvangt deze een e-mail bericht met de regels en bevestigingslink, de link bevat een acceptatie knop waarna een wachtwoord (en 2FA) ingesteld kan worden   
* kan ik statistieken bekijken, zoals het aantal logins per dag, het aantal geuploadde jottems/afgekeurd/goedgekeurd/annotaties per organisatie en per project

## Als organisatiebeheerder kan ik ## {#organisatiebeheerder}

* inloggen, profiel (naam, afbeelding, privacy instellingen, wachtwoord, 2FA) inzien en wijzigen en uitloggen  
* gebruikers (naam, e-mail) in de rol moderater binnen de organisatiejottem toevoegen, bewerken en verwijderen  
  * bij toevoegen van een gebruiker ontvangt deze een e-mail bericht met de regels en bevestigingslink, de link bevat een acceptatie knop waarna een wachtwoord (en 2FA) ingesteld kan worden   
* kan ik statistieken bekijken, zoals het aantal logins per dag, het aantal geuploadde jottems/afgekeurd/goedgekeurd/annotaties, ook per project
* kan ik projecten aanmaken en beheren (naam, slug, beschrijving, oproep, periode, afbeelding, datasetlicentie, status); elke organisatie heeft minstens één project en elke jottem hoort bij precies één project  
* kan ik per project instellen welke terminologiebronnen uit het [NDE Termennetwerk](https://termennetwerk.netwerkdigitaalerfgoed.nl/) beschikbaar zijn voor term-URI's (standaard: alle bronnen)  
* kan ik een reeds bestaande collectie (met metadata en online afbeeldingen > IIIF) als project toevoegen 
* kan ik per project de datasetbeschrijving bewerken en \- indien er openbare (gepubliceerde) data is \- deze valideren en aanmelden bij (of afmelden van) het [NDE Datasetregister](https://datasetregister.netwerkdigitaalerfgoed.nl/)
* kan ik per project een e-depot-export (BagIt met RO-Crate-beschrijving) laten aanmaken; het aanmaken is een asynchrone job en zodra het pakket klaar is ontvang ik een e-mail met een directe downloadlink

## Als moderator kan ik ## {#moderator}

* alle jottems (afbeelding \+ metadata \+ verrijkingen) bekijken  
* de status van een jottem aanpassen van nieuw naar goedgekeurd of afgekeurd op basis van de kwaliteitscontrole op afbeelding, metadata, privacy (incl. toestemming herkenbare personen), auteursrecht en het onderscheid tussen herinnering en verifieerbaar feit  
  * ik word daarbij ondersteund door het automatische detectiesignaal van de Herkenbaar API (herkenbare personen ja/nee + betrouwbaarheid) en de toestemmingsverklaring van de uploader  
  * bij afkeuring ontvangt de uploader een e-mail bericht met de reden en wordt de mogelijkheid geboden om meer informatie aan te leveren  
  * bij goedkeuring krijgt de jottem een duurzame link en wordt deze gepubliceerd (ARK-minting en een externe preserveringskopie volgen in een latere fase, zie [[#keuze-oplossingsrichting]]) en ontvangt de uploader een e-mail bericht dat de jottem online is geplaatst en oproep om deze te delen via sociale media om reacties en aanvullende informatie bij de jottem te krijgen door annoteerders  
* kan ik statistieken bekijken, zoals het aantal geuploadde jottems/afgekeurd/goedgekeurd/annotaties

## Als gebruiker (binnen een organisatie) kan ik ## {#gebruiker}

* inloggen ook via social login, profiel (naam, afbeelding, privacy instellingen, wachtwoord) inzien en wijzigen en uitloggen  
* kan ik lezen wat een jottem is en welke eisen hieraan gesteld worden  
* kan ik een overzicht krijgen van geuploadde afbeeldingen, status een \#annotaties en deellinks  
* kan ik jottems markeren als favoriet, het overzicht van favorieten bekijken en de favoriet markering verwijderen  
* kan ik mijn favoriete jottems als openbaar instellen waardoor er een deelbare link beschikbaar komt (is geen duurzame link)

## Als gebruiker/uploader (binnen een organisatie) kan ik ## {#gebruiker-uploader}

* kan ik een afbeelding uploaden en voorzien van metadata (beschrijving, vervaardiger, datum, plaats, personen op afbeelding leven mogelijk nog) en steekwoorden, en kies ik daarbij het project (van de organisatie) waaraan ik bijdraag  
  * bij het uploaden wordt de afbeelding automatisch gecontroleerd op herkenbare personen (Herkenbaar API); zijn die er, dan krijg ik direct de vraag of ik een toestemmingsverklaring van de afgebeelde personen kan afleggen  
* kan ik bij het uploaden een materiaaltype/genre kiezen (bijv. foto, menukaart, advertentie, folder, krantenartikel, vergunning)  
* kan ik locatiemetadata toevoegen (adres, openings-/sluitingsjaar) zodat de jottem op de kaart en in een pand-tijdlijn kan verschijnen  
* kan ik afgekeurdde jottems verwijderen (goedgekeurde jottems niet\!)

## Als gebruikers/annoteerder (binnen een organisatie) kan ik ## {#gebruiker-annoteerder}

* kan ik een extra metadata aan de gehele jottem toevoegen, waarbij term-URI's gezocht worden via het NDE Termennetwerk binnen de voor het project ingestelde terminologiebronnen, zoals  
  * een plaatsnaam (label+URI)  
  * de plek waar de fotograaf stond (op de kaart) plus zichtveld (WKT)  
  * gebeurtenis (label+URI)   
  * koppeling naar een externe archiefbron (label+URI)  
  * vrije tekst: herinnering, aanvulling of correctie  
* kan ik een extra metadata aan een getekend vlak op de jottem toevoegen, zoals  
  * identificatie van persoon, gebouw, bedrijf (naam+URI)  
* kan ik reageren op een annotatie in de vorm van vrije tekst (herinnering, aanvulling of correctie)  
* kan ik mijn eigen annotaties bewerken en verwijderen; de wijzigingsgeschiedenis blijft daarbij bewaard in de annotatieserver

## Als API gebruiker kan ik ## {#api-gebruiker}

* per organisatie nieuwe/bijgewerkte (=ook nieuwe annotaties) jottems harvesten via IIIF CD  
* per organisatie nieuwe jottems via RSS  
* kan ik jottems doorzoeken op basis van elasticsearch  
* kan ik annotaties zoeken  
* annotaties ophalen via het W3C Web Annotation Protocol: per jottem (AnnotationCollection uit de container) en per organisatie (aggregerende AnnotationCollection)  
* per organisatie / project een IIIF collection opvragen  
* per project een datasetbeschrijving, RSS-feed en aggregerende AnnotationCollection opvragen  
* per jottem IIIF info.json \+ manifest opvragen  
* per project een datasetbeschrijving (met datadump van alle jottems in RDF volgens schema.org AP NDE als distributie) ophalen; de platformbrede datacatalogus bundelt alle projectdatasets

## Als bezoeker kan ik ## {#bezoeker}

* lezen over het iotm platform, faq, privacy, auteursrecht  
* de organisatie- en projectpagina’s lezen met informatie over doel, oproep tot actie  
  * mezelf registreren (waarmee je een gebruiker wordt)  
  * gepubliceerde jottems bekijken/doorzoeken  
  * favorieten van gebruikers bekijken
* via een interactieve kaart (gekoppeld aan de Gouda Tijdmachine) door tijd en plaats navigeren  
* per pand de opeenvolgende eetgelegenheden als tijdlijn bekijken  
* een verwijderingsverzoek indienen voor eigen of herkenbaar materiaal
