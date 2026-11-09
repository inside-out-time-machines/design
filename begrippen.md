# Begrippen # {#begrippen}

Dit hoofdstuk legt de woorden uit die in de rest van het document terugkomen.

## Project en platform ## {#begrippen-project}

* **IOTM** (Inside Out Time Machines) is het project: de samenwerking die het platform
    ontwerpt, bouwt en uitrolt naar de lokale tijdmachines.
* **Jottem** is het platform dat het project bouwt, met de domeinen onder `iotm.nl`.
* Een **tijdmachine** is een lokaal initiatief dat erfgoed van een stad toont in plaats en
    tijd, meestal met een kaart. Voorbeelden: de Amsterdam Time Machine en de
    [Gouda Tijdmachine](https://www.goudatijdmachine.nl) (**GTM**).

## Drie betekenissen van "jottem" ## {#begrippen-jottem}

* **Jottem** (met hoofdletter): het platform.
* **een jottem**: één ingezonden item, meestal een foto, met zijn metadata en annotaties. In
    het datamodel heet dat `Media`.
* **een organisatiejottem**: de eigen omgeving van een organisatie op het platform, met
    naam, slug, logo en kleuren. In het datamodel heet dat `Organisatie`; daarbinnen lopen
    een of meer **projecten** (`Project`).

## Rollen en lidmaatschap ## {#begrippen-rollen}

* **Bezoeker**: iedereen, zonder account.
* **Gebruiker**: iemand met een account. Een gebruiker hoort niet bij een organisatie: met één
    account kan hij uploaden en annoteren in elk openbaar project van elke organisatie. "Uploader"
    en "annoteerder" zijn geen aparte rollen, maar wat een gebruiker op dat moment doet.
* **Moderator** en **organisatiebeheerder**: rollen *per organisatie*, toegekend via een
    uitnodiging (mail 1 en 2). De rollen staan in `GebruikerRol`; die tabel is leidend voor alle
    rechten, Authentik regelt alleen het inloggen. Eén account kan in meerdere organisaties een
    rol hebben.
* **Lid**: een gebruiker die is uitgenodigd voor een *besloten project* (mail 12). Lidmaatschap
    geldt per project, niet per organisatie.
* **Platformbeheerder**: beheert het platform als geheel en maakt organisaties aan.

## Fasen en statuswoorden ## {#begrippen-fasen}

* **MVP**: wat bij de livegang van de pilot Smaak van Gouda (eind 2026) werkt.
* **na de evaluatie**: gebouwd of ontworpen voor later; wordt ingepland na de evaluatie van de
    pilot (zie [[#realisatie-fase2]]).
* **fase 2**: gepland voor het voorjaar van 2027.
* **latere fase**: besloten, maar niet ingepland (bijvoorbeeld ARK en het Internet Archive).
* **uit in productie**: gebouwd, maar tijdens de pilot in productie uitgeschakeld.
* Statuswoorden in het realisatieplan: **gereed** (gebouwd en op dev aangetoond), **bezig**,
    **niet gestart**, **open** (geen bouwwerk, nog niet aantoonbaar afgerond),
    **uitgesteld**.

## Kernentiteiten ## {#begrippen-entiteiten}

De volledige ERD staat in de [data-architectuur](data-architectuur/data-architectuur.html).

* `Organisatie`, `Project`: de organisatiejottem en zijn projecten.
* `Media`: een jottem; `MediaMetadata` houdt de vrije metadataregels (zoals begin- en
    eindjaar, speld, steekwoorden).
* `MediaRelatie`: een koppeling tussen twee jottems die hetzelfde object tonen.
* `Gebruiker`: een account; `naamPubliek` bepaalt of de naam bij bijdragen en in de open data
    verschijnt.
* `GebruikerRol`: wie in welke organisatie moderator of organisatiebeheerder is.
* `Gebeurtenislog`: wie wat wanneer deed; tegelijk de wachtrij voor mails en andere
    vervolgstappen (outbox) en de versiegeschiedenis van annotaties.
* `Verwijderverzoek`, `Melding`, `WachtendeAnnotatie`, `Wislijst`: de onderdelen van
    verwijderen en modereren.

Annotaties zelf staan niet in PostgreSQL maar in de annotatieserver (AnnoRepo), als W3C Web
Annotations.

## Afkortingen ## {#begrippen-afkortingen}

* **AAT**: Art & Architecture Thesaurus (Getty).
* **AP NDE**: het schema.org-applicatieprofiel van het Netwerk Digitaal Erfgoed.
* **ARK**: Archival Resource Key, een duurzame identifier (latere fase).
* **CHT**: Cultuurhistorische Thesaurus (Rijksdienst voor het Cultureel Erfgoed).
* **DPIA**: gegevensbeschermingseffectbeoordeling (AVG).
* **Faro**: het Verdrag van Faro over de waarde van erfgoed voor de samenleving; de
    *Uitvoeringsagenda Faro* is de subsidieregeling waarvoor het activiteitenplan is geschreven.
* **GTM**: Gouda Tijdmachine.
* **IIIF**: International Image Interoperability Framework.
* **Memorix**: de beeldbanksoftware die SAMH gebruikt.
* **NDE**: Netwerk Digitaal Erfgoed.
* **SAMH**: Streekarchief Midden-Holland, de organisatie van de pilot.
