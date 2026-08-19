# JSON-LD-frames voor de kernentiteiten van Jottem

Deze frames leggen de *vorm* van de JSON-LD vast: welke knopen worden genest, welke komen
alleen als IRI mee, en welke eigenschappen zijn altijd een array. Shapes (SHACL) valideren,
frames presenteren. Zie de sectie
[Frames naast shapes](https://design.iotm.nl/data-architectuur/data-architectuur.html#frames).

| Bestand | Entiteit | Toe te passen op |
| --- | --- | --- |
| `jottem.frame.jsonld` | `schema:ImageObject` / `schema:AudioObject` | `/jottem/{id}`, de projectdatadump, een `CONSTRUCT` op `/sparql` |
| `dataset.frame.jsonld` | `schema:Dataset` | `/project/{projectId}/dataset` |
| `datacatalog.frame.jsonld` | `schema:DataCatalog` | `/datacatalog` |
| `annotatie.frame.jsonld` | `oa:Annotation` | een losse annotatie uit de annotatieserver |
| `annotatiecollectie.frame.jsonld` | `as:OrderedCollection` | `/project/{projectId}/annotations`, `/organisatie/{slug}/annotations` |

Toepassen, bijvoorbeeld met [pyld](https://github.com/digitalbazaar/pyld):

```python
from pyld import jsonld
geframed = jsonld.frame(document, json.load(open("jottem.frame.jsonld")))
```

De schema.org-frames pinnen de namespace expliciet op `{"@vocab": "https://schema.org/"}`.
De externe context `https://schema.org/` mapt kale termen namelijk naar `http://schema.org/`,
een andere namespace dan de IRI's in de Turtle-, RDF/XML-, dump- en SPARQL-representaties.

Framen vraagt dat de hele graaf in het geheugen past. Frame een dump daarom per named graph
(die is per project) of pas het frame toe op het resultaat van een `CONSTRUCT`.
