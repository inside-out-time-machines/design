# Acceptatiecriteria # {#acceptatiecriteria}

Per usecase (zie [[#usecases]]) de testbare criteria voor oplevering; ze vormen de basis voor
de end-to-end-testsuite uit de [systeemarchitectuur](systeemarchitectuur/architectuur.html) en
de livegang-criteria in het [[#realisatieplan]]. De niet-functionele eisen
([[#non-functional-requirements]]) gelden daarbovenop voor alle schermen en API's.
Criteria bij fase 2-functionaliteit zijn gemarkeerd met *(fase 2)*.

## Platformbeheerder ## {#ac-platformbeheerder}

* **PB-1** Ik kan inloggen met wachtwoord + verplichte 2FA (TOTP of passkey); zonder geldige sterke factor weigert de backend elk beheer-endpoint (`amr`-controle).
* **PB-2** Ik kan een organisatiejottem definiëren (naam, slug, favicon, logo, kleurenpalet); de huisstijl is direct zichtbaar op de organisatiepagina's en in de notificatiemails; bij het aanmaken ontstaat automatisch een eerste project.
* **PB-3** Ik kan een organisatiebeheerder uitnodigen; de uitgenodigde ontvangt de uitnodigingsmail, doorloopt de Authentik-enrollment (wachtwoord + verplichte tweede factor: TOTP of passkey) en heeft bij eerste login de klaargezette rol.
* **PB-4** *(fase 2)* Ik zie platformstatistieken per organisatie en per project, gevoed uit het Gebeurtenislog.

## Organisatiebeheerder ## {#ac-organisatiebeheerder}

* **OB-1** Ik kan moderatoren uitnodigen, bewerken en verwijderen; de uitnodigingsflow werkt zoals PB-3 (incl. handreiking-link in de mail).
* **OB-2** Ik kan projecten aanmaken en bewerken met alle metadata (naam, slug, beschrijving, oproep, periode, afbeelding, datasetlicentie, status); een project verwijderen kan alleen als het leeg is én er minstens één ander project resteert (anders 409).
* **OB-3** Ik kan per project de beschikbare terminologiebronnen instellen uit de lijst van het NDE Termennetwerk; upload- en annotatieschermen bieden daarna alléén die bronnen aan.
* **OB-4** Ik kan per project de datasetbeschrijving bewerken en - uitsluitend als het project gepubliceerde jottems heeft - valideren en aanmelden bij het NDE Datasetregister; een SHACL-validatiefout toont de details (422), zonder openbare data volgt 409.
* **OB-5** *(fase 2)* Ik kan een bestaande collectie via IIIF importeren in een project; geïmporteerde jottems doorlopen de reguliere moderatie.
* **OB-6** *(fase 2)* Ik kan per project een e-depot-export starten (202); na afronding ontvang ik de export-gereed-mail en is de download een valide BagIt (checksums kloppen) met `ro-crate-metadata.json`.

## Moderator ## {#ac-moderator}

* **MO-1** Ik zie alle jottems van mijn organisatie met status; ik kan filteren op nieuw/goedgekeurd/afgekeurd/gedepubliceerd; jottems van andere organisaties zijn onbereikbaar (403).
* **MO-2** Bij goedkeuren krijgt de jottem een duurzame link, wordt hij zichtbaar in het project én verschijnt hij in zoekindex, RDF, IIIF Collection, Change Discovery en RSS; de uploader ontvangt de goedgekeurd-mail.
* **MO-3** Afkeuren zonder reden is onmogelijk; bij afkeuren ontvangt de uploader de afgekeurd-mail met de reden en een werkende herindien-link.
* **MO-4** Als er jottems wachten ontvang ik maximaal één digest-mail per dag; zonder wachtende jottems geen mail.
* **MO-5** Bij een gehonoreerd verwijderverzoek krijgt de jottem status gedepubliceerd: de duurzame link toont een tombstone en de jottem is verdwenen uit zoekindex, RDF, feeds en IIIF-cache (purge); de indiener ontvangt de uitkomst-mail. Bij afwijzing is een toelichting verplicht.
* **MO-6** Gerapporteerde annotaties en reacties verschijnen in mijn moderatieoverzicht; ik kan de bijdrage verbergen/verwijderen of de melding afwijzen; de afhandeling is terug te vinden in het Gebeurtenislog.

## Gebruiker ## {#ac-gebruiker}

* **GE-1** Ik kan registreren en inloggen, ook via social login; bij eerste login bestaat mijn profiel (koppeling via `sub`).
* **GE-2** Ik kan in mijn profiel mijn naam, afbeelding, `naamPubliek` en de attenderingen (aan/uit) beheren; met `naamPubliek` aan staan mijn naam en profielfoto bij mijn jottems, annotaties en reacties ("*naam* heeft dit gisteren geplaatst"), met `naamPubliek` uit verschijnen naam noch foto publiek (dan een geanonimiseerde vermelding met een neutraal poppetje).
* **GE-3** Ik zie een overzicht van mijn uploads met status, aantal annotaties en deellinks.
* **GE-4** Ik kan jottems als favoriet markeren/ontmarkeren en mijn favorieten openbaar maken; de deellink toont mijn favorieten zonder inloggen en is géén duurzame link.

## Uploader ## {#ac-uploader}

* **UP-1** Ik kan een bestand uploaden (JPG/PNG/TIFF, tot 50 MB; daarboven of ander type: duidelijke weigering; PDF en audio volgen in fase 2) met titel/beschrijving, genre (CHT-lijst), metadata, steekwoorden en locatie (speld op de kaart); ik bevestig de projectlicentie; de projectkeuze is verplicht - zonder project geen upload. Op een apparaat met camera kan ik in plaats van een bestand te kiezen direct een foto maken; op een apparaat zonder camera verschijnt die optie niet.
* **UP-1b** Het uploadformulier loopt in twee stappen: eerst kies ik mijn foto, daarna
    vul ik de gegevens in. Bij een permalink uit een beeldbank staan titel, beschrijving,
    datering en vervaardiger al voorgevuld, met vermelding waar ze vandaan komen; ik kan
    ze aanpassen. Terug naar stap 1 kan zonder mijn invoer kwijt te raken.
* **UP-2** Direct na de upload zie ik het resultaat van de Herkenbaar-check; bij "herkenbaar: ja" word ik om een toestemmingsverklaring gevraagd en wordt die vastgelegd; zonder verklaring kies ik zelf: annuleren of tóch indienen (vlag "toestemming: nee"); de moderator ziet signaal én verklaring of vlag.
* **UP-3** Een afgekeurde jottem kan ik aanpassen en opnieuw indienen (status terug naar nieuw); een goedgekeurde jottem kan ik niet bewerken of verwijderen (403), een afgekeurde wél verwijderen.

## Annoteerder ## {#ac-annoteerder}

* **AN-1** Ik kan een annotatie op de hele jottem plaatsen (plaats, gebeurtenis, archiefbron, vrije tekst) waarbij term-URI's gezocht worden via het Termennetwerk, beperkt tot de projectbronnen (OB-3).
* **AN-2** Ik kan een vlak tekenen en daaraan een identificatie (persoon/gebouw/bedrijf, naam + URI) koppelen; het vlak is terug te zien op de jottem-detailpagina.
* **AN-3** Ik kan reageren op een annotatie; de reactie hangt als W3C-annotatie aan de oorspronkelijke annotatie.
* **AN-4** Ik kan mijn eigen annotaties bewerken en verwijderen (andermans niet: 403); de versiegeschiedenis blijft bewaard in de annotatieserver; elke mutatie werkt `Media.wijzigingsDatum` bij (zichtbaar in Change Discovery).

## API-gebruiker ## {#ac-api-gebruiker}

* **AP-1** De Change Discovery-feed per organisatie toont Create bij publicatie en Update bij metadata- én annotatiemutaties, in valide ActivityStreams-paginering.
* **AP-2** RSS-feeds (platform, organisatie, project) valideren tegen RSS 2.0 en tonen nieuwe jottems met duurzame link en thumbnail.
* **AP-3** `/jottem/search` accepteert uitsluitend de gedefinieerde zoek-DSL en levert resultaten mét facetten; een rauwe Elasticsearch-query wordt geweigerd (422).
* **AP-4** Annotaties zijn opvraagbaar per annotatie, per jottem (container), per project en per organisatie - telkens als valide W3C `AnnotationCollection`/`Annotation`.
* **AP-5** IIIF `info.json`, Manifests en Collections (organisatie én project) passeren de IIIF-validators; *(fase 2)* audio-jottems hebben een canvas met `duration`.
* **AP-6** De datasetbeschrijving per project valideert tegen het SHACL-shape van het Datasetregister; de datadump (N-Triples) valideert tegen schema.org AP NDE; `/datacatalog` bundelt alle projectdatasets.
* **AP-7** De duurzame jottem-URL levert HTML bij `Accept: text/html` en JSON-LD/Turtle bij RDF-accept-headers (303); een gedepubliceerde jottem geeft een tombstone (410).

## Bezoeker ## {#ac-bezoeker}

* **BE-1** Ik kan zonder account de platforminformatie (FAQ, privacy, auteursrecht), organisatie- en projectpagina's (doel, oproep) lezen.
* **BE-2** Ik kan gepubliceerde jottems verkennen: zoeken met facetten, en per jottem de detailpagina zien met IIIF-viewer (zoom), metadata en annotaties.
* **BE-3** Ik kan via de interactieve kaart navigeren en per pand de opeenvolgende zaken als tijdlijn zien (afgeleid uit adres + openings-/sluitingsjaren).
* **BE-4** Ik kan een verwijderverzoek indienen en ontvang direct de ontvangstbevestiging per mail; de moderatoren ontvangen de melding (MO-5 dekt de afhandeling).
* **BE-5** Openbare favorietenpagina's van gebruikers zijn bereikbaar via hun deellink (GE-4).
* **BE-6** Elke gepubliceerde jottem-pagina heeft een Delen-knop die het deelmenu van het apparaat opent (Web Share API: sociale media, e-mail, link kopiëren; zonder ondersteuning verschijnt de knop niet) en bevat correcte Open Graph-metadata (`og:title/description/image/url`); een gedeelde link toont titel, beschrijving en afbeelding in de preview (gecontroleerd met een OG-validator).
* **BE-7** Ik kan bij elke annotatie en reactie een melding doen (rapporteren, ook zonder account, met rate limiting); ik krijg een bevestiging en de melding verschijnt in de moderatieomgeving (MO-6 dekt de afhandeling).
