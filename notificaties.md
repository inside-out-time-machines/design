# Notificaties # {#notificaties}

Alle notificatiemails op een rij: trigger, ontvanger en doel. Mails worden **asynchroon**
verstuurd door de Celery-workers via de eigen mailserver (MTA, zie de
[systeemarchitectuur](systeemarchitectuur/architectuur.html) en
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
<tr><td>5</td><td>Er staan jottems in de moderatiewachtrij en/of er zijn onafgehandelde meldingen op annotaties/reacties</td><td>moderatoren van de organisatie</td><td>dagelijkse samenvatting (alleen verstuurd als er iets wacht) - voorkomt mail per upload of melding</td></tr>
<tr><td>6</td><td>Verwijderverzoek ingediend</td><td>indiener</td><td>ontvangstbevestiging + verwachte afhandeltermijn (30 dagen, zie de niet-functionele requirements)</td></tr>
<tr><td>7</td><td>Verwijderverzoek ingediend</td><td>moderatoren van de organisatie</td><td>directe melding (juridische termijn loopt) met link naar de afhandelpagina</td></tr>
<tr><td>8</td><td>Verwijderverzoek afgehandeld</td><td>indiener</td><td>uitkomst: gehonoreerd (jottem gedepubliceerd) of afgewezen met toelichting</td></tr>
<tr><td>9</td><td>E-depot-export gereed</td><td>organisatiebeheerder (aanvrager)</td><td>directe downloadlink naar het BagIt-pakket + de beperkte bewaartermijn</td></tr>
<tr><td>10</td><td>Nieuwe annotatie of reactie op jouw jottem</td><td>uploader</td><td>*instelbaar in het profiel (standaard aan)*; gebundeld tot maximaal één mail per dag</td></tr>
<tr><td>11</td><td>Reactie op jouw annotatie</td><td>annoteerder</td><td>*instelbaar in het profiel (standaard aan)*; gebundeld tot maximaal één mail per dag</td></tr>
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

Alle mails zijn **template-gebaseerd**; de sjablonen leven in het monorepo onder
[`api/templates/mail/`](https://github.com/inside-out-time-machines/jottem/tree/main/api/templates/mail)
zodat ze onder versiebeheer en review vallen. Per notificatie zijn er drie sjablonen:

<table class="data">
<thead>
<tr><th>Bestand</th><th>Rol</th></tr>
</thead>
<tbody>
<tr><td>`nl/<slug>.mjml`</td><td>de HTML-mail, geschreven in [MJML](https://mjml.io/) - een buildstap (MJML-CLI) compileert dit naar robuuste, responsive e-mail-HTML in `dist/` (gegenereerd, niet in git)</td></tr>
<tr><td>`nl/<slug>.subject.j2`</td><td>de onderwerpregel</td></tr>
<tr><td>`nl/<slug>.txt.j2`</td><td>de platte-tekstversie</td></tr>
</tbody>
</table>

De mailworker vult de sjablonen met **Jinja2** en verstuurt ze als
`multipart/alternative` (HTML + tekst - beste afleverbaarheid en toegankelijkheid).
Gedeelde *partials* leveren de kop (logo en kleur van de organisatiejottem) en de voet;
de voet toont automatisch een uitschakellink wanneer `uitschakelUrl` is meegegeven
(attenderingen 10 en 11). Variabelenconventie: `organisatie.*` (naam, logoUrl,
kleurPrimair), `ontvangerNaam`, en `…Url` voor alle links; de variabelen per template staan
gedocumenteerd in de README bij de sjablonen. De mapstructuur is per taal (`nl/`), zodat
meertaligheid later zonder verbouwing kan.

## Regels ## {#notificaties-regels}

* Afzender is het platform (bijv. `noreply@iotm.nl`) met de organisatienaam in de weergavenaam.
* Transactionele mails (1 t/m 9) zijn niet uitschakelbaar; attenderingsmails (10, 11) zijn
    instelbaar in het profiel en bevatten een directe uitschakellink én one-click
    unsubscribe-headers (zie [[#notificaties-afleverbaarheid]]).
* Mails bevatten zo min mogelijk persoonsgegevens (AVG): geen inhoudelijke kopie van
    bijdragen, wel links naar de betreffende pagina's.
* Elke verzending wordt als type in het `Gebeurtenislog` geregistreerd (voor statistiek en
    foutopsporing), zonder de mailinhoud op te slaan.

## Afleverbaarheid ## {#notificaties-afleverbaarheid}

Mail heeft alleen waarde als hij aankomt, en aankomen blíjft. De grote providers (Gmail,
Yahoo, Microsoft) handhaven sinds 2024-2026 harde afzendereisen; onderstaande maatregelen
zorgen dat Jottem-mail daaraan voldoet en een goede verzendreputatie opbouwt en behoudt.

*Status (augustus 2026): de ontwikkelomgeving verstuurt echt, via een bestaande
exim-relay met gevestigde reputatie (SPF, DKIM met een 2048-bit sleutel op selector
`jottem`, DMARC `p=none` met rapportage, kloppende PTR/HELO); de attenderingsmails
dragen de RFC 8058-headers. De eigen MTA in de stack blijft het productiedoel
hieronder; bouncebeheer en DMARC-aanscherping volgen richting livegang.*

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
zodat mailclients een eigen "Uitschrijven"-knop tonen. Uitschrijven werkt direct en
zonder inloggen (de uitschakellink bevat een token) en wordt binnen 48 uur verwerkt
(in de praktijk: meteen). Transactionele mails (1 t/m 9) vallen hier bewust buiten;
die horen bij een handeling van de gebruiker zelf.

**Verzendroute: eigen MTA.** De platformmail loopt via een eigen MTA (Postfix met
DKIM-ondertekening, bijv. via rspamd of OpenDKIM) als container in de stack; een externe
(betaalde) verzenddienst is op deze schaal niet nodig. Randvoorwaarden: een vast IPv4-adres
met instelbare PTR, uitgaande poort 25 open bij de hostingprovider, en consistente
HELO-/PTR-/A-records.

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
