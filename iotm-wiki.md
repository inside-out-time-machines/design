# IOTM and the Wikimedia ecosystem: Commons and Wikidata as shared infrastructure

*A project idea and exploration. Draft, June 2026. Intended to stimulate discussion between the IOTM (Inside Out Time Machines) project group and Wikimedia Nederland. It can change at any time.*

## Purpose of this document

This document explores an idea: what would it mean for IOTM / Jottem to use Wikimedia Commons and Wikidata as part of its infrastructure, rather than only as one of many external sources? It is written for two audiences at once. For the Wikimedia readers it introduces IOTM and the Jottem platform. For the IOTM readers it introduces Commons and Wikidata as technical and social infrastructure. It then looks at how the goals of both initiatives align, how the Wikimedia APIs and services could fit the IOTM architecture, and what the legal and usability consequences would be.

The conclusion in advance: there is a strong alignment of mission and a good technical fit for a *curated subset* of IOTM content, but there is also a fundamental licensing tension and a scope mismatch that have to be designed around. The most realistic model is federation, not replacement: IOTM stays the primary, low-threshold participation environment, consumes Wikidata as an authority and vocabulary source, and contributes a curated, freely licensed slice of its material to Commons and Wikidata.

## Part 1: Introducing IOTM and Jottem (for Wikimedia readers)

Inside Out Time Machines (IOTM) is a Dutch heritage participation project that grew out of four local Time Machines: Amsterdam, Utrecht, Gouda and Hilversum. The activity plan was prepared as part of an application to the Subsidieregeling Uitvoeringsagenda Faro, and the project is closely connected to the Netwerk Digitaal Erfgoed (NDE) and the Faro values of broad heritage participation.

The core idea is to turn existing Time Machines from a one-directional "we show you the history of your city" into a participatory environment where residents can add their own photos, stories and knowledge, and can enrich existing heritage material. The driving observation is that people feel strongly connected to where they live, want to share their stories, but currently scatter that material across Facebook, WhatsApp and private systems, where it is fragmented and not durably preserved.

The platform under development is called **Jottem**. Its central object is a **jottem**: an integral digital heritage object that combines one or more media expressions (image, audio, video) with descriptive metadata following the NDE schema.org profile, technical and rights metadata, paradata about the digitisation process and provenance, and a dynamic layer of enrichments (corrections, public reactions, expert annotations) attached through the W3C Web Annotation model.

Jottem is explicitly built on open standards. The requirements and the draft API already commit to: ARK persistent identifiers per published jottem, content negotiation between an HTML view and RDF (schema.org NDE), IIIF Image and Presentation APIs, IIIF Change Discovery for harvesting, W3C Web Annotation Protocol for enrichments, schema.org dataset descriptions and a data catalog for the NDE, RSS feeds, and Elasticsearch-based search. The data model is deliberately lean: organisations hold media, media carry metadata rows (including address, opening and closing year, geo WKT and links to external archive sources), and there is no separate location model; timelines are derived from metadata.

The first concrete pilot is **Smaak van Gouda** (Taste of Gouda): the history of disappeared restaurants, cafes, snack bars and other eateries in Gouda, running on the organisation jottem of Streekarchief Midden-Holland. It collects photos, menus, advertisements, permits and personal memories, with editorial moderation before publication, and a map coupled to the Gouda Tijdmachine so visitors can navigate through place and time, seeing the successive eateries per building as a timeline.

The key point for Wikimedia readers: IOTM already speaks Linked Data, IIIF and Web Annotations. It is architecturally close to the Wikimedia stack, but it is designed first for low-threshold citizen participation and local editorial control, and it deliberately accepts material (personal snapshots, memories, all-rights-reserved contributions) that would not, as-is, belong on Commons or Wikidata.

## Part 2: Introducing Wikimedia Commons and Wikidata (for the IOTM project group)

**Wikimedia Commons** is the shared media repository of the Wikimedia movement: roughly 100+ million freely licensed media files that any Wikimedia project (and anyone else) can reuse. Two properties matter most for IOTM. First, scope: a file is in scope only if it is freely licensed or public domain *and* realistically useful for an educational purpose. Commons does not accept fair use or other non-free content. Second, since the Structured Data on Commons (SDC) project, every file can carry machine-readable, multilingual statements built on Wikibase, the same technology as Wikidata. The most important of these is **depicts (P180)**, which links what is visible in a file to the matching concept on Wikidata; as of early 2026 it is used on more than 27 million files and drives the cross-lingual MediaSearch.

**Wikidata** is the movement's structured knowledge base: a free, collaborative, multilingual graph of items (each with a Q identifier) and statements using shared properties (P identifiers). It functions increasingly as a central hub that interlinks GLAM (galleries, libraries, archives, museums) collections worldwide and provides a shared vocabulary for people, places, buildings and concepts. Its notability bar is deliberately lower than Wikipedia's: an item qualifies if it has a valid sitelink, refers to a clearly identifiable entity describable with serious public references, or fulfils a structural need (for example, being needed to make statements on other items more useful).

**Wikimedia Nederland** is the relevant national chapter and has a long track record with exactly this kind of work: GLAM-Wiki collaborations, Wikidata workshops with NDE and Europeana, the Erfgoed Gelderland regional pilot (15 institutions sharing collections), Wiki Loves Monuments (the photo campaign covering the 50,000+ rijksmonumenten), and analyses of the GLAM-Wiki process against the Dutch DERA / Digitaal Erfgoed Referentie Architectuur. For IOTM this means there is an existing partner, existing tooling, and an existing community of practice in the Netherlands rather than a cold start.

The key point for the IOTM project group: Commons and Wikidata are not just another archive to link to. They are a durable, globally reused, machine-readable infrastructure with a built-in volunteer community, but they come with hard rules (free licensing, educational scope, notability) that filter what can go in.

## Part 3: How the goals align

The two initiatives share a surprising amount of DNA.

Both want to move heritage from institutional one-directional publishing toward participation and shared ownership. IOTM frames this through the Faro values ("mee kunnen doen", "mee mogen bepalen"); Wikimedia is, structurally, the world's largest working example of crowd-sourced, openly licensed heritage and knowledge. IOTM's slogan "make heritage of everyone, by everyone" is close to the Wikimedia mission of a world in which everyone can share in the sum of all knowledge.

Both are committed to open standards and Linked Data. IOTM's requirement list (schema.org, IIIF, W3C Web Annotations, persistent identifiers, RDF, harvestable feeds) maps almost one-to-one onto how Commons and Wikidata expose data. Both treat durable identifiers and machine-readable, reusable data as first-class concerns.

Both aim for durability and reuse beyond a single project. IOTM exists precisely because local Facebook groups and private systems lose material, so it needs a durable home for what residents contribute. Commons and Wikidata are, in practice, among the most durable and most reused open repositories that exist, with a global volunteer community maintaining them and harvesting already in place from Europeana and the NDE network. That makes them a natural candidate to provide durable storage (and more) for the free-licensed part of IOTM's collection, rather than IOTM having to build and fund that durability alone.

Both already operate in the same Dutch heritage network. NDE, Europeana, Streekarchief Midden-Holland, local historical associations and Wikimedia Nederland are overlapping circles. The Smaak van Gouda pilot, the rijksmonument data in Wikidata, and the GLAM-Wiki track record all sit in the same ecosystem.

Where they differ is instructive. IOTM optimises for the lowest possible threshold and local editorial control, and accepts personal, non-notable, sometimes all-rights-reserved material. Wikimedia optimises for global reuse under free licenses and shared notability, and deliberately excludes the long tail of private snapshots and non-free content. This difference is not a blocker; it defines the interface between the two systems.

## Part 4: The project idea: Commons and Wikidata as part of the IOTM infrastructure

The proposal is a federated architecture in three directions, not a migration.

**Direction A - consume Wikidata as authority and vocabulary (read).** IOTM uses Wikidata Q identifiers as the shared backbone for the entities its annotations point at: buildings, addresses, neighbourhoods, businesses, persons, materials, genres. In Smaak van Gouda, each former eatery and each building becomes (or links to) a Wikidata item; the per-building timeline that IOTM derives from metadata can be cross-checked against, and enriched by, BAG and rijksmonument data already in Wikidata. This is low-risk, immediately useful, and requires no contribution of content. It mainly improves IOTM's own data quality and multilingual labelling.

**Direction B - contribute curated, freely licensed media to Commons with structured data (write).** For the subset of jottems that are (1) freely licensed by the rights holder and (2) realistically useful for an educational purpose, IOTM offers a one-click "also publish to Wikimedia Commons" path during or after moderation. The upload carries SDC statements derived from the jottem's metadata and annotations: depicts (P180) pointing at the Wikidata items from Direction A, plus source, author, date, license and the IOTM ARK as an external identifier. The Commons file page becomes a second durable home for the object and feeds MediaSearch, Wikipedia articles and Europeana.

**Direction C - model new heritage entities in Wikidata (write).** Where Smaak van Gouda documents an eatery, a printing house (Hilversum) or a local business that does not yet exist in Wikidata but is clearly identifiable from archival sources, IOTM (or its volunteers, guided by Wikimedia NL) creates the corresponding Wikidata item. This both satisfies Direction A for future contributions and pushes structured local heritage knowledge into the global graph.

In this model Commons and Wikidata provide durable, openly maintained storage for the free-licensed slice, while IOTM remains the system of record for everything (including the material that can never leave it). The boundary between "stays in IOTM only" and "flows to Wikimedia" is exactly the moderation step that IOTM already has.

## Part 5: How the Wiki APIs and services fit the IOTM architecture

The encouraging finding is that almost every IOTM standard has a direct Wikimedia counterpart, so the integration is mostly a matter of mapping and adapters rather than new invention.

<table class="data">
<thead>
<tr><th>IOTM concept / standard<th>Wikimedia service / API<th>Notes
<tbody>
<tr><td>Jottem media file<td>MediaWiki <strong>Action API</strong> <code>action=upload</code> on Commons<td>OAuth-authenticated bot or per-user; license is mandatory at upload
<tr><td>Jottem descriptive metadata (schema.org NDE)<td>Commons file page + <strong>SDC</strong> statements via Wikibase API (<code>wbeditentity</code>, <code>wbsetclaim</code>)<td>schema.org properties map to Wikidata properties
<tr><td>Annotation "depicts person / building / business" (W3C Web Annotation)<td><strong>depicts (P180)</strong> SDC statement linking to a Wikidata item<td>The strongest, cleanest mapping in the whole design
<tr><td>External entity (building, business, person)<td><strong>Wikidata</strong> item (Q-id) + SPARQL<td>Backbone for Direction A and C
<tr><td>ARK persistent identifier<td>Stored as an external-id statement on the Commons file and/or Wikidata item<td>Wikimedia adds its own stable URLs; the two ID systems coexist
<tr><td>Elasticsearch search<td><strong>MediaSearch</strong> (Commons), <strong>Wikidata Query Service</strong> (SPARQL), <strong>Wikimedia Commons Query Service / WCQS</strong> (SPARQL over SDC)<td>Cross-lingual search comes for free via SDC
<tr><td>IIIF Image / Presentation<td>No native, production IIIF on Commons; experimental image proxies and volunteer tools only; manifests typically hosted externally and linked from Wikidata via <strong>IIIF manifest URL (P6108)</strong><td>See the IIIF analysis below; IOTM should keep serving its own IIIF layer
<tr><td>IIIF Change Discovery / RSS harvesting<td>Commons / MediaWiki <strong>RecentChanges</strong> and <strong>EventStreams</strong>; Wikidata Query Service<td>For keeping IOTM and Wikimedia in sync after first upload
<tr><td>schema.org dataset + data catalog (NDE)<td>Wikidata and Commons RDF exports; integration with Europeana / NDE harvesters<td>IOTM remains the NDE-facing catalog; Wikimedia is an additional distribution and durable store
<tr><td>Social login / low-threshold contribution<td><strong>OAuth</strong> against Wikimedia for users who <em>also</em> want to push to Commons<td>Most users never need a Wikimedia account; only the publish-onward step does
</table>

**Can Commons deliver IIIF? Not natively, and this matters.** IIIF is a first-class IOTM requirement (Image API `info.json`, Presentation API manifests and collections, and Change Discovery), so it is worth being precise about what Commons can and cannot do. The short answer from current research: Commons does not provide a native, production IIIF service. Default IIIF integration has not been on the official Wikimedia roadmap, and what exists is experimental or volunteer-built rather than guaranteed. On the Image API side there is a hidden, beta image endpoint reachable through proxy tools (for example the zoomviewer / Toolforge proxy), but it is not a stable, contractually supported service. On the Presentation API side Commons generates no manifests itself; manifests are produced by third-party tools or by the holding institution, and a Mirador viewer is hosted on Toolforge for viewing them. The established pattern in the GLAM world is therefore that the manifest lives outside Wikimedia and is merely *referenced* from a Wikidata item through the property **IIIF manifest URL (P6108)**. There is a long-standing aspiration to tie IIIF to Structured Data on Commons, but it cannot be relied on as deliverable infrastructure today.

The practical consequence for the federated model is a clean division of labour. Commons durably stores the image bytes and the structured data; IOTM remains the IIIF server. IOTM continues to run its own IIIF Image, Presentation and Change Discovery layer (the planned `iiif.iotm.nl`) over its own copies, and its generated manifests can point at the IOTM-hosted images (and, where useful, at the Commons file URL as an alternate source). For the items that also live on Commons, IOTM can register its manifest URL on the corresponding Wikidata item via P6108, so that Wikimedia viewers and aggregators can find and open the IOTM IIIF view. In other words: lean on Commons and Wikidata for durable storage, structured data and global discovery, but do not expect them to replace the IOTM IIIF service; that layer stays with IOTM, which the architecture already provides for.

Two further practical patterns follow. For batch and pilot work, existing GLAM tooling (for example Pattypan for spreadsheet-driven uploads, and the structured-data workflows developed around Wiki Loves Monuments) can be reused rather than rebuilt, which is a natural place for Wikimedia Nederland to help. For ongoing sync, IOTM keeps its own Change Discovery / RSS as the source of truth and treats Commons and Wikidata as downstream replicas updated through the Action and Wikibase APIs, with the IOTM ARK as the join key between the two worlds.

## Part 6: Legal perspective

This is where the design needs the most care, and where Wikimedia Nederland's involvement (already foreseen in the IOTM activity plan for the copyright questions) is most valuable.

**The licensing tension is fundamental and must be surfaced early.** IOTM's current requirement states that copyright stays with the contributor, that submission grants permission for publication within the project, and that third-party reuse is allowed only under stated conditions. Wikimedia Commons accepts the opposite: only content that is freely licensed (in practice CC0, CC BY or CC BY-SA) or public domain, usable by anyone, anytime, for any purpose, with no fair use. These two positions are incompatible for the same object. The resolution is not to change IOTM's default, but to add an explicit, opt-in free-license choice at submission for the subset destined for Commons. Only contributions where the rights holder actively selects a free license can flow to Direction B. Everything else stays in IOTM only. This makes the moderation step also a rights-clearing step.

**Third-party copyright in old material.** Many of the most interesting Smaak van Gouda items (old advertisements, menus, newspaper articles, professional photographs of facades and interiors) are likely still under copyright held by someone other than the contributor. These cannot go to Commons without the rights holder's free license, even though IOTM may display them under its own narrower terms or under a Dutch exception. This further narrows what is eligible for Direction B and argues for keeping IOTM as the home for the full collection.

**Freedom of panorama in the Netherlands (Article 18 Auteurswet).** Self-made photographs of buildings and permanently placed public artworks "as they are" in public space (including the interior of public buildings) may be freely distributed, which is favourable for facade photos of former eateries. But there are real limits relevant here: the photo may not be cropped or edited so that essentially only the protected work remains, and crucially photographs themselves are not covered by Dutch FoP. So a present-day photo of a building is fine; a photo of an old protected photograph on a wall is not.

**Personal data and the GDPR (AVG).** IOTM already commits to AVG-compliant processing, publishing recent photos of recognisable people only with consent, allowing takedown requests, and distinguishing personal memory from verifiable fact. Pushing material to Commons raises the stakes because Commons reuse is global and effectively irrevocable: a later takedown in IOTM does not retract copies already reused elsewhere. Recent or identifiable-person imagery, and Dutch portrait-rights (portretrecht) considerations, therefore argue strongly for only sending historical, non-sensitive, consent-cleared material onward, and for treating "publish to Commons" as a one-way, carefully gated decision rather than a default.

**Attribution and provenance.** IOTM's commitment to source attribution and to separating memory from fact aligns well with SDC and Wikidata practice (source, author, "based on heuristic", references). The IOTM ARK travelling as an external identifier on the Commons file and Wikidata item gives clean two-way provenance.

In short: the legal model is "IOTM holds everything under its own terms; a deliberately narrow, opt-in, rights-cleared, non-personal, free-licensed subset is mirrored to Wikimedia." The activity plan's parallel exploration of copyright questions with Wikimedia Nederland is exactly the right vehicle to define that gate.

## Part 7: Usability perspective

IOTM's first design principle is the lowest possible threshold, including social login, for ordinary residents who are not heritage professionals. Wikimedia contribution, done directly, is the opposite: account creation, license selection, scope and notability judgement, wikitext and structured-data conventions, and a community that may revert or nominate for deletion. Putting that in front of a resident who just wants to share a photo of their grandparents' cafe would defeat the IOTM purpose.

The way to keep both is to hide Wikimedia behind IOTM for contributors and expose it only for curators. A resident uploads to Jottem exactly as designed, with social login and a simple form. The choice of a free license is offered as a clear, optional, well-explained step ("also make this freely reusable on Wikimedia, for everyone"), not as a precondition. The actual Commons upload and SDC and Wikidata editing happen server-side, performed by IOTM (via an OAuth-authorised service account or trained moderators), after moderation. Only volunteers who *want* to engage with Wikimedia directly ever see a Wikimedia login.

This division has further usability benefits. MediaSearch and the multilingual labels from Wikidata improve discovery of IOTM material without contributors doing anything. Reusing Wikidata items as the entity backbone gives IOTM autocomplete and disambiguation (which "De Zalm" in Gouda do you mean?) instead of free-text. And aligning the moderation UI with the rights-clearing step means curators make the license and scope decision once, in one place, with guidance, which is also where Wikimedia Nederland can offer training, mirroring the Erfgoed Gelderland and GLAM-Wiki model.

The scope mismatch is itself a usability feature if framed correctly: IOTM can welcome everything (memories, snapshots, the long tail), while quietly elevating only the genuinely reusable, educationally useful, free-licensed items to the global stage. Contributors are never rejected; their material simply finds the right level of reach.

## Part 8: Risks, open questions and next steps

The main risks are the licensing incompatibility (mitigated by the opt-in free-license gate), the irreversibility of global reuse versus IOTM's takedown promise (mitigated by gating personal and recent material out of Direction B), the scope filter rejecting much of the long tail at Commons (mitigated by keeping IOTM as system of record), and the maintenance cost of two-way sync (mitigated by treating Wikimedia as a downstream replica keyed on ARK).

Open questions worth resolving with Wikimedia Nederland: confirmation of the IIIF position above (Commons has no native production IIIF, so IOTM keeps its own IIIF service and registers manifests on Wikidata via P6108) and agreement that this is the intended division of labour; whether new Wikidata items for very local, now-defunct businesses comfortably clear the notability bar (likely yes via "clearly identifiable entity with serious references", but worth confirming as a batch); the best OAuth and service-account pattern for server-side uploads; and which existing GLAM tools (Pattypan, structured-data bots) to adopt for the Smaak van Gouda batch.

Suggested next steps: (1) a joint working session between the IOTM project group and Wikimedia Nederland to validate this federated model and the rights gate; (2) a small Smaak van Gouda proof of concept covering Directions A, B and C on a handful of clearly free, clearly non-personal items, including SDC depicts statements and a few new Wikidata items for former eateries; (3) a written rights-and-participation note (already a planned IOTM deliverable) that defines the opt-in free-license flow and the personal-data gate; and (4) a decision on the extent to which Commons and Wikidata serve as the durable store for the free-licensed subset, and what that means for IOTM's own storage and preservation responsibilities.

## Sources

- [Commons:Structured data - Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Structured_data)
- [Commons:Structured data/Modeling/Depiction - Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Structured_data/Modeling/Depiction)
- [Content Partnerships Hub/Structured Data on Commons - Meta](https://meta.wikimedia.org/wiki/Content_Partnerships_Hub/Structured_Data_on_Commons/en)
- [API:Licensing - MediaWiki](https://www.mediawiki.org/wiki/API:Licensing)
- [API:Action API - MediaWiki](https://www.mediawiki.org/wiki/API:Action_API)
- [Commons:API - Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:API)
- [Commons:Project scope - Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Project_scope)
- [Commons:Licensing - Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Licensing)
- [Commons:Copyright rules by territory/Netherlands - Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Copyright_rules_by_territory/Netherlands)
- [Freedom of panorama - Wikipedia](https://en.wikipedia.org/wiki/Freedom_of_panorama)
- [Wikidata:Notability - Wikidata](https://www.wikidata.org/wiki/Wikidata:Notability)
- [SPARQL/Wikimedia Commons Query Service - Wikibooks](https://en.wikibooks.org/wiki/SPARQL/Wikimedia_Commons_Query_Service)
- [Commons:International Image Interoperability Framework - Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:International_Image_Interoperability_Framework)
- [Extension:IIIF - MediaWiki](https://www.mediawiki.org/wiki/Extension:IIIF)
- [IIIF manifest URL (P6108) - Wikidata](https://www.wikidata.org/wiki/Property:P6108)
- [T173346 Implement IIIF support on Wikimedia Commons in relation with Structured Data on Commons - Phabricator](https://phabricator.wikimedia.org/T173346)
- [What Dutch GLAMs want from Wikidata - Europeana PRO](https://pro.europeana.eu/post/what-dutch-glams-want-from-wikidata)
- [GLAM (cultural heritage) - Wikipedia](https://en.wikipedia.org/wiki/GLAM_(cultural_heritage))
- [Wiki Loves... Wikidata! - Wiki Loves Monuments](https://www.wikilovesmonuments.org/wiki-loves-wikidata/)
- [Commons:Wiki Loves Monuments/Structured data - Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments/Structured_data)
- [Wikidata:WikiProject Built heritage - Wikidata](https://www.wikidata.org/wiki/Wikidata:WikiProject_Built_heritage)
