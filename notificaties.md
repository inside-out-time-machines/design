# Notificaties # {#notificaties}

Alle notificatiemails op een rij: trigger, ontvanger en doel. Mails worden **asynchroon**
verstuurd door de Celery-workers (zie de stacktabel in [[#keuze-stack]]) via een bestaande mailrelay (zie
[[#notificaties-afleverbaarheid]]), zijn Nederlandstalig en dragen
de huisstijl (logo, kleuren) van de betreffende organisatiejottem.

## Overzicht ## {#notificaties-overzicht}

<table class="data">
<thead>
<tr><th>#</th><th>Trigger</th><th>Ontvanger</th><th>Inhoud / doel</th></tr>
</thead>
<tbody>
<tr><td>1</td><td>Platformbeheerder voegt een organisatiebeheerder toe</td><td>uitgenodigde</td><td>spelregels + bevestigingslink naar de Authentik-enrollment (wachtwoord + verplichte 2FA: TOTP of passkey); de klaargezette rol wordt bij eerste login gekoppeld</td></tr>
<tr><td>2</td><td>Organisatiebeheerder voegt een moderator toe</td><td>uitgenodigde</td><td>idem als 1</td></tr>
<tr><td>3</td><td>Moderator keurt een jottem goed</td><td>uploader</td><td>"je jottem staat online": duurzame link + oproep om te delen via sociale media (reacties en annotaties uitlokken)</td></tr>
<tr><td>4</td><td>Moderator keurt een jottem af</td><td>uploader</td><td>afkeurreden + directe link om de jottem aan te passen en opnieuw in te dienen</td></tr>
<tr><td>5</td><td>Er wacht iets: jottems in de wachtrij, meldingen, open verwijderverzoeken of vlakken bij herkenbare personen</td><td>moderatoren van de organisatie; ook de organisatiebeheerders als een verwijderverzoek langer dan 21 dagen openstaat</td><td>dagelijkse samenvatting met het aantal per soort (alleen verstuurd als er iets wacht) - voorkomt mail per upload of melding, en laat een verwijderverzoek niet ongemerkt over de wettelijke termijn van 30 dagen gaan</td></tr>
<tr><td>6</td><td>Verwijderverzoek ingediend</td><td>indiener</td><td>ontvangstbevestiging + verwachte afhandeltermijn (30 dagen, zie de niet-functionele requirements)</td></tr>
<tr><td>7</td><td>Verwijderverzoek ingediend</td><td>moderatoren van de organisatie</td><td>directe melding (juridische termijn loopt) met link naar de afhandelpagina</td></tr>
<tr><td>8</td><td>Verwijderverzoek afgehandeld</td><td>indiener</td><td>uitkomst: gedepubliceerd, gewist of afgewezen met toelichting</td></tr>
<tr><td>9</td><td>E-depot-export gereed</td><td>organisatiebeheerder (aanvrager)</td><td>directe downloadlink naar het BagIt-pakket + de beperkte bewaartermijn</td></tr>
<tr><td>10</td><td>Nieuwe annotatie of reactie op jouw jottem</td><td>uploader</td><td>*instelbaar in het profiel (standaard aan)*; gebundeld tot maximaal één mail per dag</td></tr>
<tr><td>11</td><td>Reactie op jouw annotatie</td><td>annoteerder</td><td>*instelbaar in het profiel (standaard aan)*; gebundeld tot maximaal één mail per dag</td></tr>
<tr><td>12</td><td>Organisatiebeheerder voegt een lid toe aan een (besloten) project</td><td>uitgenodigde</td><td>uitleg dat het project besloten is en wie uitnodigt, de projectlink, en de link naar "wachtwoord vergeten" waarmee het door de uitnodiging aangemaakte account een wachtwoord krijgt; heeft de genodigde al eens ingelogd, dan in plaats daarvan de oproep om in te loggen met het bestaande account. Geen 2FA-eis: een lid is geen beheerder</td></tr>
</tbody>
</table>

## Afbakening ## {#notificaties-afbakening}

* **Accountmails** (e-mailverificatie bij registratie, wachtwoord-reset, 2FA-/passkey-herstel) worden
    door **Authentik** zelf verstuurd, niet door de backend. De opmaak en tekst wijken daarbij
    niet af van de rest van het platform: de Authentik-mailtemplates worden via een
    template-override (mount op `/templates`) vervangen door Nederlandstalige versies in de
    huisstijl, visueel gelijk aan de platformnotificaties hierboven.
* **Datasetregister-aanmelding** geeft het resultaat (gevalideerd/aangemeld of foutmelding)
    synchroon terug in de beheer-UI; daar hoort geen mail bij.
* **Operationele alerts** (endpoint down, backlog, gefaalde back-ups) lopen via Alertmanager
    naar de platformbeheerders - zie de systeemarchitectuur; dat is monitoring, geen
    platformnotificatie.

## Templates ## {#notificaties-templates}

Alle mails zijn **template-gebaseerd**: per notificatie een HTML-sjabloon (MJML), een
onderwerpregel en een platte-tekstversie, gevuld met Jinja2 en verstuurd als
`multipart/alternative`. De sjablonen, de variabelen per sjabloon en de buildstap staan in het
monorepo onder
[`api/templates/mail/`](https://github.com/inside-out-time-machines/jottem/tree/main/api/templates/mail),
met een README die per sjabloon de variabelen noemt.

## Regels ## {#notificaties-regels}

* Afzender is het platform (bijv. `noreply@iotm.nl`) met de organisatienaam in de weergavenaam.
* Transactionele mails (1 t/m 9 en 12) zijn niet uitschakelbaar; attenderingsmails (10, 11) zijn
    instelbaar in het profiel en bevatten een directe uitschakellink én one-click
    unsubscribe-headers (zie [[#notificaties-afleverbaarheid]]).
* Mails bevatten zo min mogelijk persoonsgegevens (AVG): geen inhoudelijke kopie van
    bijdragen, wel links naar de betreffende pagina's.
* Elke verzending wordt als type in het `Gebeurtenislog` geregistreerd (voor statistiek en
    foutopsporing), zonder de mailinhoud op te slaan.

## Afleverbaarheid ## {#notificaties-afleverbaarheid}

Mail heeft alleen waarde als hij aankomt, en aankomen blíjft. De grote providers (Gmail,
Yahoo, Microsoft) handhaven sinds 2024 (Google en Yahoo, februari) en 2025 (Microsoft, mei) harde afzendereisen; onderstaande maatregelen
zorgen dat Jottem-mail daaraan voldoet en een goede verzendreputatie opbouwt en behoudt.

*Status (augustus 2026): de ontwikkelomgeving verstuurt echt, via een bestaande
exim-relay met gevestigde reputatie (SPF, DKIM met een 2048-bit sleutel op selector
`jottem`, DMARC `p=none` met rapportage, kloppende PTR/HELO); de attenderingsmails
dragen de RFC 8058-headers. Bouncebeheer en DMARC-aanscherping volgen richting livegang.*

**Authenticatie (verplicht).** Op het verzenddomein staan drie DNS-records ingeregeld:

* **SPF**: het verzendende IP is geautoriseerd voor het domein;
* **DKIM**: elke mail is ondertekend met een sleutel van minimaal 2048 bits;
* **DMARC**: met *alignment* op het `From:`-domein (het domein dat de ontvanger ziet is
    hetzelfde als het domein waarop SPF/DKIM slagen). Het beleid start op `p=none` met
    `rua`-rapportage om de stroom te observeren, en groeit vóór de livegang door naar
    `p=quarantine` en uiteindelijk `p=reject`.

Daarnaast: een kloppende reverse DNS (PTR-record) op het verzendende IP, een
HELO-naam die daarmee consistent is, en TLS op de verzendverbinding.

**Makkelijk uitschrijven.** Wie een attenderingsmail (10, 11) niet meer wil, moet er
zonder moeite vanaf kunnen; anders wordt de spamknop het uitschrijfmechanisme en die
klachten beschadigen de reputatie van het hele platform. Daarom dragen attenderingsmails
naast de uitschakellink in de voettekst de headers `List-Unsubscribe` (mailto én https)
en `List-Unsubscribe-Post: List-Unsubscribe=One-Click` ([RFC 8058](https://www.rfc-editor.org/rfc/rfc8058)),
zodat mailclients een eigen "Uitschrijven"-knop tonen. Uitschrijven kan zonder inloggen (de uitschakellink bevat een token);
de grote providers eisen verwerking binnen 48 uur, het platform verwerkt het direct. Transactionele mails (1 t/m 9 en 12) vallen hier bewust buiten;
die horen bij een handeling van de gebruiker zelf.

**Verzendroute: de bestaande exim-relay, ook in productie.** De platformmail loopt via de
exim-relay die al voor andere diensten verstuurt, met een gevestigde reputatie, DKIM
(selector `jottem`) en kloppende PTR/HELO. Een eigen MTA in de stack zou die reputatie
vanaf nul moeten opbouwen, en een externe (betaalde) verzenddienst is op deze schaal niet
nodig. Staat de productieserver niet in hetzelfde privénet als de relay, dan verstuurt hij
via een geauthenticeerde SMTP-verbinding (submission, TLS) in plaats van plat SMTP.

**Reputatie.** Het platform schrijft alleen geverifieerde adressen aan (e-mailverificatie
bij registratie is al verplicht). Bounces worden verwerkt: hard bounces gaan op een
suppressielijst en worden niet opnieuw aangeschreven. Bij livegang wordt het volume
rustig opgebouwd in plaats van in één keer bulk te versturen. De attenderingen zijn
gebundeld tot maximaal één mail per dag (zie het overzicht), wat het volume en de
irritatie laag houdt.

**Monitoring.** De DMARC-rapporten (`rua`) worden periodiek bekeken; het platform is
aangemeld bij Google Postmaster Tools en Microsoft SNDS/JMRP zodat reputatie en
spamklachtratio zichtbaar zijn. De spamklachtratio blijft onder de 0,3% (de harde grens
van de grote providers), met minder dan 0,1% als streefwaarde. De adressen `postmaster@`
en `abuse@` op het verzenddomein bestaan en worden gelezen ([RFC 2142](https://www.rfc-editor.org/rfc/rfc2142)).
