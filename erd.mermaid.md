<h2 id="erd-diagram">ERD diagram</h2>

<pre class="mermaid">
  erDiagram

  Organisatie {
    int id PK
    string naam
    string slug
    string NAAN
    string kleurenpalet
  }

  Gebruiker {
    int gebruikersId PK
    string naam
    string email
    string rol
    int organisatieId FK
    date bevestigingsDatum
    date registratieDatum
    date laatsteLoginDatum
    bool favorietenPubliek
  }

  Media {
    int mediaId PK
    string bestandsnaam
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
  }

  Favoriet {
    int favorietId PK
    int gebruikersId FK
    int mediaId FK
    date creatieDatum
  }

  %% Relationships
  Organisatie ||--o{ Gebruiker : "heeft"
  Organisatie ||--o{ Media : "bevat"

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
