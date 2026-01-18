<h3 id="platformbeheerder">Als platformbeheerder kan ik</h3>

* inloggen, profiel (naam, afbeelding, privacy instellingen, wachtwoord, 2FA) inzien en wijzigen en uitloggen  
* een verenigingsjottem definiëren, deze heeft een naam, slug, favicon, logo, kleurenpalet (primary, secondary, background, …), ARK NAAN  
* gebruikers (naam, e-mail) in de rol verenigingsbeheerder van een verenigingsjottem toevoegen, bewerken en verwijderen  
  * bij toevoegen van een gebruiker ontvangt deze een e-mail bericht met de regels en bevestigingslink, de link bevat een acceptatie knop waarna een wachtwoord (en 2FA) ingesteld kan worden   
* kan ik statistieken bekijken, zoals het aantal logins per dag, het aantal geuploadde jottems/afgekeurd/goedgekeurd/annotaties per vereniging

<h3 id="verenigingsbeheerder">Als verenigingsbeheerder kan ik</h3>

* inloggen, profiel (naam, afbeelding, privacy instellingen, wachtwoord, 2FA) inzien en wijzigen en uitloggen  
* gebruikers (naam, e-mail) in de rol moderater binnen de verenigingsjottem toevoegen, bewerken en verwijderen  
  * bij toevoegen van een gebruiker ontvangt deze een e-mail bericht met de regels en bevestigingslink, de link bevat een acceptatie knop waarna een wachtwoord (en 2FA) ingesteld kan worden   
* kan ik statistieken bekijken, zoals het aantal logins per dag, het aantal geuploadde jottems/afgekeurd/goedgekeurd/annotaties

<h3 id="moderator">Als moderator kan ik</h3>

* alle jottems (afbeelding \+ metadata \+ verrijkingen) bekijken  
* de status van een jottem aanpassen van nieuw naar goedgekeurd of afgekeurd op basis van de kwaliteitscontrole op afbeelding, metadata, privacy en auteursrecht  
  * bij afkeuring ontvangt de uploader een e-mail bericht met de reden en wordt de mogelijkheid geboden om meer informatie aan te leveren  
  * bij goedkeuring wordt er een object identifier (bijv. NOID of UUID) gemaakt de ARK en wordt de afbeelding en metadata duurzaam opgeslagen bij het internet archive en ontvangt de uploader een e-mail bericht dat de jottem online is geplaatst en oproep om deze te delen via sociale media om reacties en aanvullende informatie bij de jottem te krijgen door annoteerders  
* kan ik statistieken bekijken, zoals het aantal geuploadde jottems/afgekeurd/goedgekeurd/annotaties

<h3 id="gebruiker">Als gebruiker (binnen een vereniging) kan ik</h3>

* inloggen ook via social login, profiel (naam, afbeelding, privacy instellingen, wachtwoord) inzien en wijzigen en uitloggen  
* kan ik lezen wat een jottem is en welke eisen hieraan gesteld worden  
* kan ik een overzicht krijgen van geuploadde afbeeldingen, status een \#annotaties en deellinks  
* kan ik jottems markeren als favoriet, het overzicht van favorieten bekijken en de favoriet markering verwijderen  
* kan ik mijn favoriete jottems als openbaar instellen waardoor er een deelbare link beschikbaar komt (is geen duurzame link)

<h3 id="gebruiker-uploader">Als gebruiker/uploader (binnen een vereniging) kan ik</h3>

* kan ik een “album” (of collectie) aanmaken naast het album “Alles”  
* kan ik een afbeelding uploaden en voorzien van metadata (beschrijving, vervaardiger, datum, plaats, personen op afbeelding leven mogelijk nog), steekwoorden en in een album plaatsen  
* kan ik afgekeurdde jottems verwijderen (goedgekeurde jottems niet\!)

<h3 id="gebruiker-annoteerder">Als gebruikers/annoteerder (binnen een vereniging) kan ik</h3>

* kan ik een extra metadata aan de gehele jottem toevoegen, zoals  
  * een plaatsnaam (label+URI)  
  * de plek waar de fotograaf stond (op de kaart) plus zichtveld (WKT)  
  * gebeurtenis (label+URI)   
  * vrije tekst: herinnering, aanvulling of correctie  
* kan ik een extra metadata aan een getekend vlak op de jottem toevoegen, zoals  
  * identificatie van persoon, gebouw, bedrijf (naam+URI)  
* kan ik reageren op een annotatie in de vorm van vrije tekst (herinnering, aanvulling of correctie)  
* kan ik mijn annotatie bewerken en verwijderen ???

<h3 id="bezoeker">Als bezoeker kan ik</h3>

* lezen over het iotm platform, faq, privacy, auteursrecht  
* de verenigingspagina’s lezen met informatie over doel, call-to-action  
  * mezelf registreren (waarmee je een gebruiker wordt)  
  * gepubliceerde jottems bekijken/doorzoeken  
  * favorieten van gebruikers bekijken

<h3 id="api-gebruiker">Als API gebruiker kan ik</h3>

* per vereniging nieuwe/bijgewerkte (=ook nieuwe annotaties) jottems harvesten via IIIF CD  
* per vereniging nieuwe jottems via RSS  
* kan ik jottems doorzoeken op basis van elasticsearch  
* kan ik annotaties zoeken  
* annotaties ophalen via het W3C Web Annotation Protocol  
* per vereniging / album een IIIF collection opvragen  
* per jottem IIIF info.json \+ manifest opvragen  
* per vereniging een datasetbeschrijving (met datadump van alle jottems in RDF volgens schema.org AP NDE als distributie) ophalen
