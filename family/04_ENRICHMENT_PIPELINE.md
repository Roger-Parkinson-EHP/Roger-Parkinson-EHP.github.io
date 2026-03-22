---
title: "Enrichment Pipeline"
---

# Enrichment Pipeline: How It Actually Works

> **Technical prototype** — Demonstrates the data flow from raw ancestor records through enrichment to story output. This is the engine behind every story AncestralFire tells.

---

## The Pipeline

```
ANCESTOR RECORD (from database)
    │
    ├── Name: Samuel Rose Parkinson
    ├── Born: 12 APR 1831, Barrowford, Lancashire, England
    ├── Died: 23 MAY 1919, Preston, Franklin, Idaho
    ├── FamilySearch ID: KWC8-PWD
    │
    ▼
STEP 1: WIKIDATA (Structured Facts)
    │
    ├── Barrowford → Q303243
    │   ├── Coordinates: 53.851°N, 2.221°W
    │   ├── Type: village and civil parish
    │   ├── Country: United Kingdom (Q145)
    │   ├── County: Lancashire
    │   ├── Population: 5,979 → 6,039 → 6,171
    │   └── Properties: 29 structured data points
    │
    ├── Preston, Idaho → [lookup]
    │   ├── Coordinates: [lat/long]
    │   ├── Founded: 1866
    │   └── County: Franklin County
    │
    ├── Historical Events (1831 time period):
    │   ├── Industrial Revolution (Q2566959)
    │   ├── Lancashire Cotton Famine (Q6484823) — 1861-1865
    │   ├── Reform Act 1832 (Q384859) — expanded voting rights
    │   └── Cholera pandemics (Q12090)
    │
    └── Occupation context:
        └── Cotton mill worker → Q7459651 → Industrial Revolution
    │
    ▼
STEP 2: WIKIPEDIA (Narrative Context)
    │
    ├── "Barrowford" article:
    │   ├── Village in Pendle district of Lancashire
    │   ├── Near Forest of Bowland AONB
    │   ├── On the Marsden-Gisburn-Long Preston turnpike
    │   ├── Near Leeds and Liverpool Canal (seven-lock staircase)
    │   ├── Cotton mills: Samuel Holden cotton mill
    │   ├── Packhorse bridge near Higherford Mill (late 1500s)
    │   └── Two rivers: Pendle Water and Colne Water
    │
    ├── "Pendle witch trials" article:
    │   ├── 1612 trials — 12 accused, 10 hanged at Lancaster
    │   ├── Newchurch in Pendle at geographic center
    │   ├── Most famous witch trial in English history
    │   └── Community trauma lasting generations
    │
    ├── "Lancashire cotton industry" article:
    │   ├── Center of world cotton trade 1760-1860
    │   ├── Water-powered then steam-powered mills
    │   ├── 12-16 hour workdays, child labor
    │   └── Cotton Famine during US Civil War (1861-65)
    │
    └── "Franklin, Idaho" article:
        ├── Founded 1860 by Mormon pioneers
        ├── First permanent settlement in Idaho
        ├── One mile north of Utah border
        └── Agricultural community
    │
    ▼
STEP 3: YOUTUBE (Visual/Audio Context)
    │
    ├── Search: "Barrowford Lancashire history"
    │   └── [Results: local history videos, canal tours, mill heritage]
    │
    ├── Search: "Pendle witch trials documentary"
    │   └── [Results: BBC documentaries, walking tours, historical recreations]
    │
    ├── Search: "Lancashire cotton mills 1800s"
    │   └── [Results: industrial heritage videos, working mill footage]
    │
    ├── Search: "Leeds Liverpool Canal Barrowford locks"
    │   └── [Results: narrowboat tours, lock operation videos]
    │
    └── Search: "Franklin Idaho pioneer settlement"
        └── [Results: local history, LDS settlement, Idaho frontier]
    │
    ▼
STEP 4: FAMILYSEARCH (Cross-Reference)
    │
    ├── Person lookup: KWC8-PWD
    │   ├── Verify birth/death dates
    │   ├── Find additional records (census, immigration)
    │   ├── Find connected persons
    │   └── Find source citations
    │
    └── Record search: "Samuel Parkinson, Lancashire, 1831"
        ├── Baptism records
        ├── Census appearances (1841, 1851, 1861...)
        ├── Immigration manifest
        └── Marriage record
    │
    ▼
STEP 5: CLAUDE (Heritage Storyteller)
    │
    ├── Input: All enrichment data + ancestor record + user context
    ├── Prompt: Heritage Storyteller system prompt
    │
    └── Output: Rich narrative (see prototype stories 02 and 03)
        ├── Compelling narrative arc
        ├── Historical context woven in
        ├── Family connections highlighted
        ├── Suggested next explorations
        └── Structured data for visualizations
```

---

## Live API Demonstration

### Wikidata Query: "What was happening in Barrowford in the 1830s?"

**SPARQL Query:**
```sparql
SELECT ?event ?eventLabel ?date WHERE {
  ?event wdt:P276 wd:Q303243 .  # Located in Barrowford
  ?event wdt:P585 ?date .        # Has a point in time
  FILTER(YEAR(?date) >= 1820 && YEAR(?date) <= 1850)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }
}
```

**Alternative — broader context query:**
```sparql
SELECT ?event ?eventLabel ?date ?placeLabel WHERE {
  ?event wdt:P276 ?place .
  ?place wdt:P131* wd:Q23169 .   # In Lancashire
  ?event wdt:P585 ?date .
  FILTER(YEAR(?date) >= 1820 && YEAR(?date) <= 1850)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }
} LIMIT 50
```

### Wikipedia API: Get context for a place

**Request:**
```
GET https://en.wikipedia.org/w/api.php
  ?action=query
  &titles=Barrowford
  &prop=extracts
  &exintro=false
  &explaintext=true
  &format=json
```

**Response (actual):**
```
Barrowford is a village and civil parish in the Pendle district of Lancashire,
England, north of Nelson, near the Forest of Bowland Area of Outstanding
Natural Beauty. Barrowford is on the Marsden-Gisburn-Long Preston turnpike...
The village has two rivers: Pendle Water, which flows through it, and
Colne Water... the now demolished Samuel Holden cotton mill...
```

### Wikidata API: Get structured facts

**Request:**
```
GET https://www.wikidata.org/w/api.php
  ?action=wbgetentities
  &titles=Barrowford
  &sites=enwiki
  &props=claims|descriptions
  &format=json
```

**Response (actual):**
```json
{
  "entity": "Q303243",
  "description": "village and civil parish in Lancashire, England",
  "coordinates": { "latitude": 53.851, "longitude": -2.221 },
  "country": "Q145 (United Kingdom)",
  "population": [5979, 6039, 6171],
  "total_properties": 29
}
```

### YouTube Data API v3: Find documentaries

**Request:**
```
GET https://www.googleapis.com/youtube/v3/search
  ?part=snippet
  &q=Pendle+witch+trials+documentary
  &type=video
  &videoCategoryId=27   (Education)
  &order=relevance
  &maxResults=5
  &key={API_KEY}
```

**Expected results:**
- BBC documentary on Pendle witch trials
- Walking tours of Pendle Hill and Newchurch
- Lancashire history: witchcraft and superstition
- Local historian talks about the 1612 trials

### FamilySearch API: Look up ancestor by ID

**Request:**
```
GET https://api.familysearch.org/platform/tree/persons/KWC8-PWD
  Authorization: Bearer {access_token}
  Accept: application/json
```

---

## API Access Requirements

| API | Auth Required | Cost | Rate Limits |
|-----|--------------|------|-------------|
| **Wikidata SPARQL** | None | Free | No hard limit; be respectful (~1 req/sec) |
| **Wikidata REST** | None | Free | Same |
| **Wikipedia API** | None (User-Agent required) | Free | ~200 req/sec for bots with contact info |
| **YouTube Data API v3** | API Key (Google Cloud) | Free tier: **10,000 quota units/day** (~100 searches) | Per-key daily quota |
| **FamilySearch API** | OAuth 2.0 (app registration) | Free | 18 sec processing time per 1-min window |
| **Nominatim (geocoding)** | None (User-Agent required) | Free | 1 req/sec |

### What We Need to Set Up

1. **Google Cloud project** → YouTube API key (free tier sufficient for prototype)
2. **FamilySearch developer account** → OAuth app registration (free, needs approval)
3. **User-Agent string** → For Wikipedia/Wikidata/Nominatim (just identify the app)

**Total cost for prototype: $0.**

---

## Enrichment Quality Score

For each ancestor, we can calculate a "richness score":

| Factor | Points | Samuel Parkinson |
|--------|--------|-----------------|
| Has birth date | 10 | 10 |
| Has birth place | 10 | 10 |
| Has death date | 10 | 10 |
| Has death place | 10 | 10 |
| Has FamilySearch ID | 10 | 10 |
| Birth place on Wikipedia | 15 | 15 |
| Birth place on Wikidata | 10 | 10 |
| Historical event overlap | 15 | 15 (Industrial Rev, Cotton Famine, Pendle) |
| Migration detected | 10 | 10 (England → Idaho) |
| YouTube content available | 10 | 10 (Pendle, Lancashire mills, Idaho pioneers) |
| **Total** | **110** | **110/110** |

Samuel Rose Parkinson scores a perfect 110. Not every ancestor will. But the enrichment pipeline can assess each one and prioritize the best stories.

---

## Batch Processing: 100-Ancestor Prototype Test

```python
# Pseudocode for the enrichment pipeline
for ancestor in select_100_interesting_ancestors(db):
    # Step 1: Wikidata
    wikidata = query_wikidata(ancestor.birth_place, ancestor.birth_year)

    # Step 2: Wikipedia
    wiki_context = get_wikipedia_context(
        ancestor.birth_place,
        ancestor.death_place,
        ancestor.birth_year
    )

    # Step 3: YouTube
    videos = search_youtube(
        f"{ancestor.birth_place} {ancestor.birth_year // 100 * 100}s history"
    )

    # Step 4: FamilySearch
    fs_data = lookup_familysearch(ancestor.fs_id)

    # Step 5: Generate story
    story = claude_generate(
        system_prompt=HERITAGE_STORYTELLER,
        ancestor=ancestor,
        wikidata=wikidata,
        wikipedia=wiki_context,
        youtube=videos,
        familysearch=fs_data
    )

    # Score the output
    score = calculate_richness(ancestor, wikidata, wiki_context, videos)
    save_prototype(ancestor, story, score)
```
