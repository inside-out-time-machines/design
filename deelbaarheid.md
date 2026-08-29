# Deelbaarheid # {#deelbaarheid}

Jottem leeft niet alleen op het platform zelf. De gemeenschap zit op sociale media, op
de website van de historische vereniging, in nieuwsbrieven en op buurtplatforms. Dit
hoofdstuk beschrijft hoe jottems en projecten **buiten het platform zichtbaar en deelbaar**
zijn, met als doel de participatie via andere websites en platforms te bevorderen. De
keten is steeds dezelfde: iemand *ziet* een jottem of project op een ander kanaal,
*klikt* door naar het platform en *draagt bij* via de verrijkingsmogelijkheden uit
[[#verrijkingen]]. De deel-nudge in de publicatiemail (zie [[#notificaties]]) en de
open data-uitgangen (RSS, IIIF; zie [data-architectuur](data-architectuur/data-architectuur.html#rss))
zijn onderdelen van dezelfde beweging: het platform brengt de inhoud naar de mensen toe,
niet andersom.

## Social login ## {#deelbaarheid-sociallogin}

Wie via een ander kanaal binnenkomt, moet zonder drempel kunnen meedoen. Daarom is
inloggen laagdrempelig, inclusief **social login** via federatie: in de MVP Google,
Microsoft en Facebook; Apple en Instagram volgen in fase 2 vanwege de aanvraag- en
reviewdoorlooptijd. Authentik doet uitsluitend authenticatie; rollen komen uit de
database. Zie de [systeemarchitectuur](systeemarchitectuur/architectuur.html) voor de
inrichting. *Status (augustus 2026): gerealiseerd.*

## Deelknoppen en Open Graph ## {#deelbaarheid-deelknoppen}

Elke gepubliceerde jottem-pagina heeft een **Delen**-knop die het deelmenu van het
apparaat opent via de Web Share API, en elke publiekspagina draagt **Open
Graph-metadata** zodat een gedeelde link een nette preview toont. De volledige
uitwerking (knopplaatsing, OG-elementen en hun bronnen, canonical-beleid) staat in de
[data-architectuur](data-architectuur/data-architectuur.html#uri-strategie).
*Status (augustus 2026): gerealiseerd.*

Nieuw in deze iteratie: de `og:title` en de Web Share-deeltekst van een jottem gebruiken
niet langer de vaste oproep "weet jij hier meer van?", maar een **willekeurige, binnen
het project actieve verrijkings-call-to-action** uit [[#verrijkingen]]. Een gedeelde
link vraagt zo meteen om een concrete bijdrage ("Weet je wanneer dit was? Vul het
jaartal in, ook een gok helpt.") en varieert per deelmoment, wat de kans vergroot dat
één van de oproepen de ontvanger raakt. Heeft een project geen actieve verrijkingen,
dan valt de titel terug op de vaste oproep.

## Widgets ## {#deelbaarheid-widget}

Organisaties willen hun Jottem-project tonen op de eigen website: de historische
vereniging op haar WordPress-site, het archief op de collectiepagina. Daarvoor levert
het platform **widgets**: dynamisch gegenereerde, zelfstandige HTML-fragmenten die met
een iframe of een klein script worden ingebed.

<table class="data">
<thead>
<tr><th>Widget</th><th>URI-patroon</th><th>Inhoud</th></tr>
</thead>
<tbody>
<tr><td>Projectinfo</td><td>`https://www.iotm.nl/widget/{organisatieSlug}/{projectSlug}`</td><td>logo, titel en beschrijving/oproep van het project, de algemene oproep "Help mee op Jottem" met het Jottem-beeldmerk, en een link naar de projectpagina</td></tr>
<tr><td>Recente jottems</td><td>`https://www.iotm.nl/widget/{organisatieSlug}/{projectSlug}/recent/{n}`</td><td>de {n} meest recent gepubliceerde jottems als thumbnails naast elkaar, elk een link naar de jottem-pagina; eronder een willekeurige actieve verrijkings-call-to-action met link naar de projectpagina</td></tr>
<tr><td>Willekeurige jottems</td><td>`https://www.iotm.nl/widget/{organisatieSlug}/{projectSlug}/willekeurig/{n}`</td><td>als hierboven, maar {n} willekeurig gekozen gepubliceerde jottems; elke weergave toont andere beelden, wat de widget levend houdt</td></tr>
</tbody>
</table>

Het aantal {n} is begrensd op 1 tot en met 12; daarbuiten weigert de route. Alleen
goedgekeurde (gepubliceerde) jottems verschijnen in de widgets.

### Vormgeving en gedrag ### {#deelbaarheid-widget-vormgeving}

* De widget is **zelfstandige HTML met minimale inline CSS**: alleen lay-out (flexbox,
    maten, witruimte), **geen kleuren en geen fonts**, zodat de widget de opmaak van de
    omringende website erft en daar nooit mee botst.
* De stijl is instelbaar met de queryparameter `?stijl=`: standaard `accent` (de
    primaire kleur van de organisatie als bovenlijn en linkkleur, het projectlogo
    zichtbaar) of `neutraal` (nul kleuren; identiteit alleen via logo, titel en tekst).
* Alle links openen met `target="_top"` buiten het iframe, met volledige URL's naar de
    publiekspagina's.
* Thumbnails komen uit de IIIF Image API en zijn dus duurzaam en gecachet; de widget-HTML
    zelf is kort cachebaar (korter dan de levensduur van tijdelijke logo-URL's uit de
    objectopslag).
* De widget toont een nette lege staat ("Nog geen jottems") en verwijst ook dan naar het
    project.

### Inbedden ### {#deelbaarheid-widget-inbedden}

Twee inbedvormen, allebei met voorbeeldcode in het projectbeheer:

**Iframe**: werkt overal waar HTML mag, ook in het "Aangepaste HTML"-blok van WordPress
en in de meeste andere CMS'en. De widget-routes sturen daarvoor géén `X-Frame-Options`
en een Content Security Policy met `frame-ancestors *`; de rest van het platform blijft
`frame-ancestors 'none'` sturen.

```html
<iframe src="https://www.iotm.nl/widget/samh/smaak-van-gouda/recent/3"
        style="width:100%; height:220px; border:0" title="Jottem: Smaak van Gouda"></iframe>
```

**Script**: een klein laadscript (`widget.js`) haalt dezelfde HTML op en plaatst die
direct in de pagina, zodat de widget het lettertype en de kleuren van de site zelf erft.
De widget-routes sturen daarvoor `Access-Control-Allow-Origin: *`.

```html
<div id="jottem-widget"></div>
<script async src="https://www.iotm.nl/widget.js"
        data-doel="#jottem-widget"
        data-src="https://www.iotm.nl/widget/samh/smaak-van-gouda/recent/3"></script>
```

Voor WordPress is het iframe de eenvoudigste route (plakken in een
"Aangepaste HTML"-blok); het script is het mooiste resultaat op sites die externe
scripts toestaan. Een eigen WordPress-plugin of Gutenberg-block is bewust géén onderdeel
van het ontwerp: het "Aangepaste HTML"-blok volstaat, en met het oEmbed-endpoint uit
[[#deelbaarheid-fase2]] wordt zelfs dat plakken van code overbodig.

### Widgetlinks in het projectbeheer ### {#deelbaarheid-widget-beheer}

De organisatiebeheerder ziet op de projectbeheerpagina een blok **Widgets** met de drie
widget-URL's, de voorbeeldcode voor beide inbedvormen (kopieerbaar) en een levend
voorbeeld van de widgets, zodat de beheerder zonder technische hulp de code op de eigen
site kan plakken.

## oEmbed ## {#deelbaarheid-oembed}

Platforms met [oEmbed](https://oembed.com/)-ondersteuning (WordPress, Mastodon, diverse
CMS'en) tonen een geplakte Jottem-URL automatisch als embed; plakken van voorbeeldcode
is dan niet nodig. Het endpoint is `GET /oembed` op de publiekssite, en elke project- en
jottem-pagina draagt een discovery-link
(`<link rel="alternate" type="application/json+oembed" href="…">`) zodat consumers het
endpoint zelf vinden. *Status (augustus 2026): gerealiseerd.*

<table class="data">
<thead>
<tr><th>Parameter</th><th>Betekenis</th></tr>
</thead>
<tbody>
<tr><td>`url`</td><td>de geplakte pagina-URL; alleen project- en jottem-pagina's van het platform zelf, anders 404</td></tr>
<tr><td>`format`</td><td>alleen `json`; `xml` geeft 501 (toegestaan volgens de spec voor een niet-ondersteund formaat)</td></tr>
<tr><td>`maxwidth`, `maxheight`</td><td>bovengrens die de consumer meegeeft; het antwoord blijft eronder</td></tr>
</tbody>
</table>

Het antwoord hangt af van het soort URL:

* **Projectpagina** → type `rich`: de recente-jottems-widget uit
    [[#deelbaarheid-widget]] als iframe (standaard 600×240), met projectnaam en
    organisatienaam als titel.
* **Jottem-pagina** → type `photo`: de duurzame IIIF-afbeelding (dezelfde
    geen-presigned-regel als bij `og:image`), met als titel de jottem-titel plus een
    willekeurige actieve verrijkings-call-to-action, en de inzendernaam als
    `author_name` wanneer die publiek is. Alleen goedgekeurde jottems; een jottem
    zonder duurzame beeld-URL geeft 404. De rijkere enkele-jottem-embed (widget met
    CTA-knop) blijft fase 2.

## Fase 2 ## {#deelbaarheid-fase2}

* **Jottem-badge.** Een klein "Bekijk op Jottem"-knopje in huisstijl (vergelijkbaar met
    social-badges) dat organisaties naast hun eigen collectie-items zetten; levert
    herkenbaarheid van het merk op andere sites.
* **Enkele-jottem-embed.** Een widget-variant voor één specifieke jottem (afbeelding,
    titel en call-to-action), bijvoorbeeld bij een nieuwsbericht over die ene vondst.

## Aanvullende requirements ## {#deelbaarheid-requirements}

*Status (augustus 2026): social login en deelknoppen/Open Graph waren al gerealiseerd;
D-1 t/m D-7 zijn in de huidige iteratie gerealiseerd, D-8 is fase 2.*

* **D-1** Het platform levert per project drie widget-routes (projectinfo, recente
    jottems, willekeurige jottems) als zelfstandige HTML met minimale inline CSS zonder
    kleuren en fonts; het aantal jottems is begrensd op 1 tot en met 12.
* **D-2** De widgets zijn inbedbaar via iframe (geen `X-Frame-Options`,
    `frame-ancestors *`) én via een laadscript (`Access-Control-Allow-Origin: *`);
    de overige platformpagina's blijven inbedden weigeren.
* **D-3** De widgetstijl is instelbaar via `?stijl=accent|neutraal`, standaard `accent`
    met de primaire organisatiekleur als enige kleuraccent.
* **D-4** Alle links in een widget verwijzen met volledige URL's en `target="_top"`
    naar de publiekspagina's; de jottems-widgets tonen onder de thumbnails een
    willekeurige actieve verrijkings-call-to-action van het project.
* **D-5** De `og:title` en de Web Share-deeltekst van een jottem gebruiken een
    willekeurige actieve verrijkings-call-to-action van het project, met de vaste oproep
    "weet jij hier meer van?" als terugval.
* **D-6** De organisatiebeheerder ziet op de projectbeheerpagina de widget-URL's,
    kopieerbare voorbeeldcode voor beide inbedvormen en een levend voorbeeld.
* **D-7** Het platform biedt een oEmbed-endpoint met discovery-links op project- en
    jottem-pagina's: projectpagina's leveren type `rich` (de jottems-widget als
    iframe), jottem-pagina's type `photo` (de duurzame IIIF-afbeelding met de
    verrijkings-CTA in de titel); `maxwidth`/`maxheight` worden gerespecteerd.
* **D-8** *(fase 2)* Er is een Jottem-badge in huisstijl die naar een project of jottem
    verwijst.
