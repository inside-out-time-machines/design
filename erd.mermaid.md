<h2 id="erd-diagram">ERD diagram</h2>

<pre class="mermaid">
  erDiagram

  Organisatie {
    int id PK
    string naam
    string slug
    string NAAN
    string kleurenpalet
    string logo
    string favicon
  }

  Gebruiker {
    int gebruikersId PK
    string naam
    string email
    date bevestigingsDatum
    date registratieDatum
    date laatsteLoginDatum
    bool favorietenPubliek
  }

  GebruikerRol {
    int gebruikerRolId PK
    int gebruikersId FK
    int organisatieId FK
    string rol
  }

  Media {
    int mediaId PK
    string bestandsnaam
    string genre
    string status
    string afkeurReden
    string herkenbaar
    float herkenbaarBetrouwbaarheid
    bool toestemmingPersonen
    string ark
    date creatieDatum
    date publicatieDatum
    int gebruikersId FK
    int organisatieId FK
    int albumId FK
  }

  Metadata {
    int metadataId PK
    int mediaId FK
    int gebruikersId FK
    string type
    string label
    string value
    string uri
  }

  Album {
    int albumId PK
    string naam
    int gebruikersId FK
    int organisatieId FK
  }

  Favoriet {
    int favorietId PK
    int gebruikersId FK
    int mediaId FK
    date creatieDatum
  }

  %% Rollen: een gebruiker kan meerdere rollen hebben, per organisatie (GebruikerRol);
  %% de rol platformbeheerder heeft geen organisatieId. Lidmaatschap van een organisatie
  %% volgt uit de GebruikerRol-rijen.
  %% Media.status: nieuw / goedgekeurd / afgekeurd; afkeurReden alleen bij afgekeurd.
  %% Media.herkenbaar (ja/nee) + herkenbaarBetrouwbaarheid: resultaat van de Herkenbaar API
  %% bij upload (paradata, geen gebruikersmetadata); toestemmingPersonen: verklaring van de
  %% uploader dat toestemming van herkenbare personen is geregeld.
  %% Organisatie.NAAN en Media.ark zijn gereserveerd voor de ARK-fase (uitgesteld,
  %% zie keuze-oplossingsrichting).
  %% Locatie- en tijdlijngegevens (adres, openings-/sluitingsjaar, geo-WKT, archiefbron)
  %% worden vastgelegd als Metadata-rijen op Media; er is geen apart locatiemodel.

  %% Relationships
  Organisatie ||--o{ GebruikerRol : "kent"
  Organisatie ||--o{ Media : "bevat"
  Organisatie ||--o{ Album : "bevat"

  Gebruiker ||--o{ GebruikerRol : "heeft"
  Gebruiker ||--o{ Media : "uploadt"
  Gebruiker ||--o{ Album : "maakt"

  Album ||--o{ Media : "groepeert"

  Media ||--o{ Metadata : "heeft"

  Gebruiker ||--o{ Favoriet : "maakt"
  Media ||--o{ Favoriet : "wordt_gefavoriet"

  Gebruiker ||--o{ Metadata : "maakt"
</pre>

<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
  mermaid.initialize({ startOnLoad: false });
  await mermaid.run({ querySelector: ".mermaid" });
</script>
