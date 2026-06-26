*A project idea and exploration. Draft, June 2026. Intended to stimulate discussion between the IOTM (Inside Out Time Machines) project group and Internet Archive Europe (IAE) in Amsterdam. It can change at any time.*

# Purpose of this document

This document explores an idea: what would it mean for IOTM / Jottem to use the Internet Archive, and specifically its European entity Internet Archive Europe, as part of its infrastructure? It is written for two audiences at once. For the Internet Archive Europe readers it introduces IOTM and the Jottem platform. For the IOTM readers it introduces the Internet Archive and IAE as technical and social infrastructure. It then looks at how the goals of both initiatives align, how the Internet Archive tools and APIs could fit the IOTM architecture, and what the legal and usability consequences would be.

The conclusion in advance: the fit is strong. The Internet Archive accepts material under the contributor's own rights terms (not only free licenses) and provides a native IIIF service with automatic derivatives, which means it can durably hold and serve the *full* IOTM collection, not only a free-licensed subset. The natural model is therefore: the Internet Archive as IOTM's durable preservation and IIIF back-end, with IOTM remaining the participation environment and system of record.

# Part 1: Introducing IOTM and Jottem (for Internet Archive Europe readers)

Inside Out Time Machines (IOTM) is a Dutch heritage participation project that grew out of four local Time Machines: Amsterdam, Utrecht, Gouda and Hilversum. The activity plan was prepared as part of an application to the Subsidieregeling Uitvoeringsagenda Faro, and the project is closely connected to the Netwerk Digitaal Erfgoed (NDE) and the Faro values of broad heritage participation.

The core idea is to turn existing Time Machines from a one-directional "we show you the history of your city" into a participatory environment where residents can add their own photos, stories and knowledge, and can enrich existing heritage material. The driving observation is that people feel strongly connected to where they live, want to share their stories, but currently scatter that material across Facebook, WhatsApp and private systems, where it is fragmented and not durably preserved.

The platform under development is called **Jottem**. Its central object is a **jottem**: an integral digital heritage object that combines one or more media expressions (image, audio, video) with descriptive metadata following the NDE schema.org profile, technical and rights metadata, paradata about the digitisation process and provenance, and a dynamic layer of enrichments (corrections, public reactions, expert annotations) attached through the W3C Web Annotation model.

Jottem is explicitly built on open standards: ARK persistent identifiers per published jottem, content negotiation between an HTML view and RDF (schema.org NDE), the IIIF Image and Presentation APIs, IIIF Change Discovery for harvesting, the W3C Web Annotation Protocol for enrichments, schema.org dataset descriptions and a data catalog for the NDE, RSS feeds, and Elasticsearch-based search. Durable storage is a core requirement, and how to provide it is still an open question. The data model is deliberately lean: organisations hold media, media carry metadata rows (including address, opening and closing year, geo WKT and links to external archive sources), and timelines are derived from metadata rather than a separate location model.

The rights model is important and distinctive. IOTM's requirements state that copyright stays with the contributor; submission grants permission for publication within the project, and third-party reuse is allowed only under the stated conditions. Personal data is processed under the AVG (GDPR): recent photos of recognisable people are published only with consent, contributors can request removal, and personal memory is distinguished from verifiable fact. This means IOTM deliberately handles material that is *not* freely licensed and that may be sensitive, which shapes which infrastructure can host it.

The first concrete pilot is **Smaak van Gouda** (Taste of Gouda): the history of disappeared restaurants, cafes, snack bars and other eateries in Gouda, running on the organisation jottem of Streekarchief Midden-Holland. It collects photos, menus, advertisements, permits, newspaper clippings and personal memories, with editorial moderation before publication, and a map coupled to the Gouda Tijdmachine so visitors can navigate through place and time, seeing the successive eateries per building as a timeline.

# Part 2: Introducing the Internet Archive and Internet Archive Europe (for the IOTM project group)

The **Internet Archive** is a non-profit digital library founded in 1996, best known for the Wayback Machine and for hosting many millions of texts, images, audio and video items. For a project like IOTM three properties matter most. It offers durable, redundant storage at no charge for material kept publicly accessible, with persistent item URLs. It is metadata-agnostic: an item can carry the standard fields plus any number of custom fields, defined ad hoc at upload time. And it automatically "derives" useful secondary files from an upload, for example thumbnails, in-browser viewers, and OCR text for documents, which is directly relevant to menus, advertisements, permits and newspaper clippings.

Since 2023 the Internet Archive also runs an **official IIIF 3.0 Image and Presentation API** at `iiif.archive.org`. Nearly every image, text, audio and video item now has a IIIF manifest at a predictable URL (`https://iiif.archive.org/iiif/<id>/manifest.json`), viewable in any compatible IIIF viewer such as Mirador or the Universal Viewer. This is a significant point of difference from some other large repositories, which do not provide native IIIF.

**Internet Archive Europe (IAE)** is the Internet Archive's European entity, based in Amsterdam, with Dutch ANBI (public-benefit) status. It works where documentary heritage, digital preservation and open access converge, and it is unusually well embedded in the Dutch heritage ecosystem: it has co-hosted events in Amsterdam with Creative Commons and Open Nederland on equitable access to heritage, engages directly with the Ministry of Education, Culture and Science's National Strategy on Digital Heritage 2025-2028 and the NDE, and runs campaigns such as Our Future Memory (on the rights of memory institutions to preserve, lend, provide cross-border access, and support research and education). In June 2026 IAE moved parts of its own infrastructure to Eurosky, a European, EU-law-governed hosting initiative, reflecting a broader commitment to European digital sovereignty and data residency. For IOTM this means a local, Dutch-based, EU-oriented partner that already shares its language, network and legal context, rather than a purely US counterpart.

# Part 3: How the goals align

The two initiatives share a clear mission and, unusually, an existing design link.

Both exist to keep heritage from disappearing. IOTM was conceived precisely because local Facebook groups and private systems lose material; IAE's Our Future Memory campaign and the Internet Archive's whole reason for being are about preserving collective memory for the long term. Where IOTM speaks of durable, manageable preservation as a core requirement, the Internet Archive is one of the largest working examples of exactly that.

Both put open access and public participation first. IOTM frames this through the Faro values ("being able to take part", "being allowed to have a say"); IAE frames it through equitable access to heritage and the rights of the public to reach collective memory. IOTM's "make heritage of everyone, by everyone" sits comfortably next to IAE's open-heritage advocacy.

Both already operate in the same Dutch network. NDE, the Ministry's National Strategy on Digital Heritage, Open Nederland, Streekarchief Midden-Holland and local historical associations are shared reference points. IAE is in Amsterdam, one of the four Time Machine cities, and is actively convening the Dutch heritage sector. This is a warm start, not a cold one.

And both care about durable, manageable preservation as a first-order concern. IOTM needs a route to durable storage for what residents contribute; the Internet Archive is one of the strongest candidates for providing it. This document explores what such an integration could look like in practice and how far it can sensibly go.

Where the emphasis differs is instructive but not conflicting. IOTM optimises for the lowest possible threshold for residents and for local editorial control over a collection that includes non-free and sometimes sensitive material. The Internet Archive optimises for durable preservation and broad access, and is comfortable hosting material under the contributor's own rights terms. These emphases are complementary: IOTM owns the front door and the editorial judgement; the Internet Archive provides the vault, the viewers and the long-term addresses.

# Part 4: The project idea: the Internet Archive as part of the IOTM infrastructure

The proposal is to use the Internet Archive (through IAE) as IOTM's preservation and delivery back-end, in three roles.

**Role A - durable preservation back-end.** When a jottem is published after moderation, IOTM pushes it to the Internet Archive as an item: the media file(s) plus the jottem's metadata. Each participating organisation (Streekarchief Midden-Holland, Historische Vereniging Die Goude, and so on) maps to an Internet Archive **collection**, mirroring the IOTM "organisatie" concept. IOTM remains the system of record and the editorial environment; the Internet Archive is the durable, redundant, openly addressable copy. This would give IOTM durable, manageable storage without having to build and fund preservation-grade storage itself.

**Role B - IIIF and derivatives service.** Because the Internet Archive provides a native IIIF 3.0 Image and Presentation API and automatically derives thumbnails, viewers and OCR text, IOTM can lean on it for image delivery and for the IIIF layer its requirements call for. For Smaak van Gouda this is concrete: uploaded menus, advertisements and newspaper clippings come back with OCR, and every item gets a IIIF manifest that can be opened in a IIIF viewer or wired into the Gouda Tijdmachine timeline. IOTM can either use these IIIF endpoints directly or aggregate them behind its own `iiif.iotm.nl` facade.

**Role C - access and rights-aware store.** The Internet Archive supports item-level access control (a curation state such as dark, approved or freeze, and access-restricted collections) alongside explicit `licenseurl` and `rights` metadata. This lets IOTM mirror its own moderation and privacy model: cleared, non-sensitive material is public; embargoed, consent-pending or sensitive items can be kept dark or restricted; and the contributor's rights terms travel with the item rather than being flattened to a single license. Removal requests can be honoured by darkening or deleting the item.

In this model the Internet Archive stores and serves the full collection under IOTM's own rights terms, while IOTM keeps the participation layer, the annotations, the editorial workflow and the canonical catalogue. The boundary between "draft in IOTM" and "preserved and served via the Internet Archive" is the moderation step IOTM already has. (This idea is complementary to, not in competition with, the separate idea of using Wikimedia Commons and Wikidata for global discovery of a free-licensed subset: the Internet Archive can be the preservation and delivery layer for everything, while Commons and Wikidata, if pursued, add reach for the openly licensed slice.)

# Part 5: How the Internet Archive tools and APIs fit the IOTM architecture

Almost every IOTM building block has a direct Internet Archive counterpart, so integration is mostly mapping and adapters rather than new invention. The Internet Archive maintains a developer portal and an official `internetarchive` Python library (and `ia` command-line tool) that wrap these APIs, which suits IOTM's batch and server-side needs.

<table class="data">
<thead>
<tr><th>IOTM concept / standard<th>Internet Archive tool / API<th>Notes
<tbody>
<tr><td>Publish a jottem (media + metadata)<td><strong>IAS3</strong> S3-like upload API (HTTP <code>PUT</code>), or the <code>internetarchive</code> Python library<td>Item is created on first upload; metadata passed as <code>x-archive-meta-*</code> headers
<tr><td>Jottem descriptive metadata (schema.org NDE)<td><strong>Metadata API (MDAPI)</strong> + custom metadata fields<td>Metadata-agnostic; NDE / schema.org fields and ad-hoc JSON can be stored and updated
<tr><td>Per-organisation grouping ("organisatie")<td>Internet Archive <strong>collection</strong><td>One collection per participating organisation; collections are set up with IA/IAE
<tr><td>Thumbnails, viewers, OCR for menus / ads / newspapers<td>Automatic <strong>derive</strong> process<td>Controllable per upload (<code>x-archive-queue-derive</code>); OCR is valuable for Smaak van Gouda documents
<tr><td>IIIF Image / Presentation (an IOTM requirement)<td>Native <strong>IIIF 3.0 service</strong> at <code>iiif.archive.org</code><td>Per-item manifest at a predictable URL; works in Mirador / Universal Viewer; can feed the Gouda Tijdmachine
<tr><td>ARK persistent identifier<td>Stored as a metadata field on the item; item also gets a stable <code>archive.org</code> URL<td>The two identifier systems coexist; ARK can resolve to the IOTM view
<tr><td>Moderation, embargo, takedown, privacy<td>Item <strong>curation state</strong> (dark / approved / freeze) and access-restricted collections<td>Mirrors IOTM moderation and AVG removal handling
<tr><td>Rights ("copyright stays with contributor")<td><code>licenseurl</code> for recognised licenses, <code>rights</code> field for other terms<td>Accepts non-free terms, unlike free-only repositories; uploader is responsible for rights
<tr><td>Search and harvesting<td><strong>Search / Scrape API</strong><td>Discovery and bulk export; complements IOTM's own Elasticsearch and Change Discovery
<tr><td>External archive-source links on a jottem<td><strong>Wayback Machine</strong><td>Cited external sources can be captured so links do not rot
<tr><td>Authentication for uploads<td>IAS3 keys / library credentials, server-side<td>Residents never touch this; IOTM uses a service account
</table>

Two practical patterns follow. For the Smaak van Gouda pilot, the `ia` command-line tool and the Python library make it straightforward to script a first batch upload into a Streekarchief Midden-Holland collection and to confirm the derive, OCR and IIIF outputs before wiring them into the public view. For ongoing operation, IOTM keeps its own catalogue and Change Discovery / RSS as the source of truth and writes to the Internet Archive as a downstream preservation copy through IAS3 and the Metadata API, using the IOTM ARK and the Internet Archive identifier as the join keys between the two systems.

# Part 6: Legal perspective

This is where the Internet Archive route is notably more comfortable for IOTM than a free-license-only repository would be, but it still needs care, and IAE's legal and policy expertise is directly relevant.

**The rights model fits IOTM's default.** IOTM keeps copyright with the contributor and allows third-party reuse only under stated conditions. The Internet Archive does not require a free license: it records a `licenseurl` where one applies and a free-text `rights` statement otherwise, and the uploader is responsible for having the necessary rights. This means IOTM can preserve its own rights model on the Internet Archive without forcing contributors into CC0 or CC BY-SA, which is the opposite of the constraint a free-only platform imposes. It is the single biggest legal advantage of this route.

**Uploader responsibility and third-party copyright.** Because the Internet Archive places the rights responsibility on the uploader, IOTM (as the account holder) assumes that responsibility for what it pushes. Much Smaak van Gouda material (old advertisements, menus, professional photographs, newspaper articles) may still be under third-party copyright. IOTM should therefore only push items it has cleared or that fall under a usable basis, set the `rights` field honestly, and use dark or restricted states where status is uncertain. The relevant EU framework, which IAE actively works on, includes the DSM Directive's preservation exception, its provision on faithful reproductions of public-domain works, and the out-of-commerce-works regime; these can support preservation and access for parts of the collection, and IAE is a natural advisor here.

**Personal data and the GDPR (AVG).** IOTM already commits to AVG-compliant processing, consent for recent identifiable persons, and removal on request. Two points matter for the Internet Archive. First, takedown and erasure: items can be darkened or deleted, but public copies may already have been crawled or reused, so erasure is best-effort once an item has been public; sensitive and recent-person material should default to restricted or stay in IOTM only. Second, data residency and jurisdiction: the main `archive.org` storage is US-based, whereas IAE is a Dutch entity increasingly committed to European hosting (its 2026 move to Eurosky reflects this). Where personal data is involved, IOTM and IAE should clarify which storage and jurisdiction apply and whether an EU-hosted path is available, and reflect that in IOTM's AVG documentation and processing agreements.

**Freedom of panorama and portrait rights.** Unlike a free-license repository, the Internet Archive does not pre-filter for Dutch freedom of panorama (Article 18 Auteurswet) or portrait rights, so the responsibility to respect them sits with IOTM. The IOTM requirements already address recognisable persons and consent; the same editorial gate should govern what is pushed to the Internet Archive.

In short: the Internet Archive lets IOTM preserve and serve its material under its own rights terms, which removes the licensing incompatibility that a free-only platform creates, but it shifts rights and privacy responsibility onto IOTM as uploader. The moderation step becomes the rights-and-privacy gate, and IAE is well placed to help define it, including the EU-hosting and data-residency questions.

# Part 7: Usability perspective

IOTM's first design principle is the lowest possible threshold for residents, including social login. The Internet Archive's contribution tools (the S3-like API, the `ia` command line, the Python library) are developer-facing and should stay entirely behind IOTM. A resident uploads to Jottem exactly as designed; the Internet Archive upload happens server-side, after moderation, performed by IOTM through a service account. No contributor ever sees an Internet Archive login. This keeps the participation experience untouched while gaining preservation-grade storage behind the scenes.

For the project team, the operational usability is strong. Free, redundant storage with persistent URLs, automatic derivatives (including OCR), and a ready-made IIIF service together remove a large part of the back-end that IOTM would otherwise have to build and maintain, which matches the project's explicit aim of a "low-threshold and manageable" solution on both the front and the back end. Reusing the Internet Archive's IIIF viewers and OCR can also enrich the public experience, for example full-text search inside scanned menus and the per-building timeline in the Gouda Tijdmachine.

A few coordination points are worth naming. Setting up per-organisation collections is done with the Internet Archive / IAE rather than fully self-service, so it is a conversation, not just an API call. The derive and IIIF behaviour, and the choice of public versus restricted state, should be decided once in the moderation workflow and applied consistently. And because preservation through the Internet Archive is most useful when it is genuinely automatic, the publish-to-archive step should be wired into the moderation UI as a default action (with the rights and privacy gate attached) rather than a manual afterthought.

# Part 8: Risks, open questions and next steps

The main risks are: uploader rights responsibility shifting to IOTM (mitigated by clearing material at moderation, honest `rights` metadata, and dark/restricted states for uncertain items); the difficulty of true erasure once an item has been public (mitigated by keeping sensitive and recent-person material restricted or in IOTM only); data residency and jurisdiction for personal data (mitigated by clarifying the EU-hosting path with IAE); and dependence on a single preservation provider (mitigated by IOTM remaining the system of record and, optionally, keeping more than one preservation target).

Open questions worth resolving with Internet Archive Europe: whether an EU-hosted or EU-jurisdiction storage path is available for items containing personal data, and how that interacts with the main `archive.org` infrastructure; how per-organisation collections are best created and governed; whether IOTM should use the Internet Archive IIIF endpoints directly or behind its own `iiif.iotm.nl` facade; the recommended pattern for keeping the IOTM ARK and the Internet Archive identifier in sync; and how the DSM preservation, public-domain-reproduction and out-of-commerce provisions apply to specific Smaak van Gouda material.

Suggested next steps: (1) a joint working session between the IOTM project group and Internet Archive Europe to validate this preservation-back-end model and the rights-and-privacy gate; (2) a small Smaak van Gouda proof of concept that uploads a cleared batch into a Streekarchief Midden-Holland collection via the `internetarchive` library, confirming derive, OCR, IIIF manifest and access-state behaviour; (3) a short rights-and-privacy note (already a planned IOTM deliverable) defining what may be pushed, with what `rights` and access state, and how removal requests are handled; and (4) a decision, taken with IAE, on data residency for personal data and on whether the Internet Archive is IOTM's sole or primary preservation target.

# Sources

- [Tools and APIs - Internet Archive Developer Portal](https://archive.org/developers/index-apis.html)
- [IAS3 Internet Archive S3-like API - Internet Archive Developer Portal](https://archive.org/developers/ias3.html)
- [Item Metadata API - Internet Archive Developer Portal](https://archive.org/developers/metadata.html)
- [Internet Archive Metadata schema - Internet Archive Developer Portal](https://archive.org/developers/metadata-schema/)
- [internetarchive: A Python Interface to archive.org - Internet Archive Developer Portal](https://archive.org/developers/internetarchive/internetarchive.html)
- [Making IIIF Official at the Internet Archive - Internet Archive Blogs](https://blog.archive.org/2023/09/18/making-iiif-official-at-the-internet-archive/)
- [IIIF Documentation - Internet Archive (iiif.archive.org)](https://iiif.archive.org/iiif/documentation)
- [Internet Archive - IIIF guide](https://iiif.io/guides/guides/archive.org/)
- [Opening Up Heritage: Reflections on Our Amsterdam Event - Internet Archive Europe](https://www.internetarchive.eu/2026/03/11/opening-up-heritage-reflections-on-our-amsterdam-event/)
- [Blue Sky Thinking, European Infrastructure: Internet Archive Europe Has Moved to Eurosky - Internet Archive Europe](https://www.internetarchive.eu/2026/06/12/blue-sky-thinking-european-infrastructure-internet-archive-europe-has-moved-to-eurosky/)
- [Our Future Memory campaign](https://ourfuturememory.org/)
- [Nationale Strategie Digitaal Erfgoed 2025-2028 - Rijksoverheid](https://www.rijksoverheid.nl/documenten/beleidsnotas/2024/11/30/nationale-strategie-digitaal-erfgoed-2025-2028)
