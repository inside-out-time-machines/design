# Pilot: Smaak van Gouda # {#pilot-smaak-van-gouda}

*Smaak van Gouda – Verhalen achter verdwenen restaurants in de stad* is een participatief
erfgoedproject over de horecageschiedenis van Gouda. Het is de eerste concrete pilot waarmee het
IOTM/Jottem platform van begin tot eind wordt beproefd.

## Aanleiding & doel ## {#pilot-aanleiding}

Restaurants, cafés, snackbars, lunchrooms, koffiehuizen, ijssalons en afhaalzaken zijn al
generaties lang onderdeel van het dagelijks leven in Gouda. Veel van deze zaken zijn verdwenen,
terwijl nieuwe ondernemers en keukens hun intrede deden. Het project wil de geschiedenis van de
Goudse horeca **documenteren, bewaren en toegankelijk maken** - van koffiehuizen en melkbars tot
Chinese restaurants, shoarmazaken, pizzeria's, Surinaamse eethuizen en moderne wereldkeukens - met
bijzondere aandacht voor de rol van ondernemers met verschillende culturele achtergronden en de
ontwikkeling van internationale keukens. Zo ontstaat niet alleen een overzicht van eetgelegenheden,
maar ook een sociaal-culturele geschiedenis van smaak, ondernemerschap, migratie en ontmoeting.

## Pilot voor IOTM ## {#pilot-voor-iotm}

De pilot draait als eerste **project** op de organisatiejottem van **Streekarchief Midden-Holland**, met een eigen projectpagina, oproep en datasetbeschrijving. Inwoners dragen bij via het Jottem platform:
foto's, menukaarten, advertenties en persoonlijke herinneringen worden verzameld, gemodereerd en
duurzaam ontsloten. De pilot valideert de bestaande platformfunctionaliteit (zie [[#usecases]]) en
brengt een aantal eisen scherp in beeld.

Hoe het project wordt ingericht, getest en in gebruik genomen (instellingen en keuzes,
testscripts, moderatie, communicatie en widgets) staat in het
[plan van aanpak Smaak van Gouda](planvanaanpak-smaakvangouda.html).

## Doelen en niet-doelen ## {#pilot-doelen}

De pilot moet laten zien dat inwoners via Jottem materiaal en herinneringen bijdragen, dat
SAMH dat met een kleine groep moderatoren zorgvuldig kan beoordelen, en dat het resultaat als
open data bruikbaar is. Na drie maanden worden deze metrieken gemeten, rechtstreeks uit de
database en het Gebeurtenislog (een statistiekendashboard is er pas in fase 2):

<table class="data">
<thead>
<tr><th>Metriek</th><th>Streefwaarde na 3 maanden</th></tr>
</thead>
<tbody>
<tr><td>Gepubliceerde jottems</td><td>`[ ]` (vast te stellen met SAMH)</td></tr>
<tr><td>Verschillende inzenders</td><td>`[ ]`</td></tr>
<tr><td>Annotaties en reacties</td><td>`[ ]`</td></tr>
<tr><td>Doorlooptijd moderatie (mediaan, van indienen tot besluit)</td><td>`[ ]` werkdagen</td></tr>
<tr><td>Verwijderverzoeken afgehandeld binnen 30 dagen</td><td>alle</td></tr>
</tbody>
</table>

**Niet-doelen van de pilot:** uitrol naar de andere tijdmachines; zoeken met facetten,
favorieten en een pand-tijdlijn; een externe duurzame bewaarplaats of opslag bij het
Internet Archive; statistiekendashboards. Wat de evaluatie daarvan nodig blijkt te maken,
komt op de backlog voor fase 2 (zie [[#realisatie-fase2]]).

## Wat dit van het platform vraagt ## {#pilot-platformeisen}

* **Getypeerd bronmateriaal** - naast foto's ook menukaarten, advertenties, folders,
    krantenartikelen en vergunningen, via het genre op een jottem (zie
    [[#functional-requirements]]).
* **Kaart** - bezoekers zien de gepubliceerde jottems als speldjes op een kaart (zie
    [[#bezoeker]]). Bij het uploaden worden begin- en eindjaar al vastgelegd. Een
    pand-tijdlijn (per pand de opeenvolgende eetgelegenheden) en een kaartkoppeling met de
    Gouda Tijdmachine volgen na de evaluatie, als de pilot daarom vraagt (zie
    [[#realisatie-fase2]]). Tot die tijd kan de Gouda Tijdmachine de RSS-feed en de
    IIIF-collectie van het project gebruiken.
* **Koppelingen naar archiefbronnen** - per jottem kunnen verwijzingen naar externe archiefbronnen
    worden vastgelegd (zie [[#gebruiker-annoteerder]]).
* **Privacy, authenticiteit & auteursrecht** - zorgvuldige omgang met persoonsgegevens en
    herkenbare personen, en onderscheid tussen herinnering en verifieerbaar feit (zie
    [[#privacy-authenticity-copyright]]).
* **Crowdsourcing-workflow** - uploaden, aanvullen, corrigeren en reageren (zie [[#usecases]]).
    Uploads worden vóór publicatie beoordeeld. Annotaties worden achteraf gemodereerd, via
    meldingen; alleen een vlak-annotatie op een foto met herkenbare personen wacht eerst op een
    moderator, omdat die een naam aan een gezicht kan koppelen (zie [[#verrijking-vlak]]).

## Te verzamelen materiaal ## {#pilot-materiaal}

* Foto's van gevels, interieurs en personeel
* Menukaarten, advertenties, folders en openings-/jubileumuitgaven
* Krantenartikelen, vergunningen en bedrijfsdocumenten
* Locatiegegevens: adressen, openings- en sluitingsjaren, opvolgende horecazaken
* Herinneringen van bezoekers, medewerkers en (oud-)eigenaren - als annotaties of, bij interviews,
    als audio-jottems

## Participatie ## {#pilot-participatie}

Het project wordt samen met inwoners opgebouwd via verzameldagen en scansessies, oproepen via lokale
media en interviews met oud-horecaondernemers, in samenwerking met wijkverenigingen en
erfgoedorganisaties zoals Stichting Gedeeld Verleden, Gezamenlijke Toekomst.
