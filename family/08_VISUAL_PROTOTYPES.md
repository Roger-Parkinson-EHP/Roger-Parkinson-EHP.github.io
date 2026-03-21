---
title: "Visual Prototypes"
---

# Visual Prototypes: What AncestralFire Could Render

> **These Mermaid diagrams use real data from Roger Parkinson's 72,182-ancestor database.** Each diagram represents what a UI component could look like — family trees, migration flows, timelines, geographic distribution, battle connections. Mermaid is the wireframe; a production app would render these as interactive, zoomable, shareable visualizations.

---

## 1. Roger's Paternal Lineage — Lancashire to Idaho

```mermaid
graph TD
    classDef eng fill:#1e40af,color:#fff,stroke:#1e3a8a
    classDef usa fill:#dc2626,color:#fff,stroke:#991b1b
    classDef transition fill:#7c3aed,color:#fff,stroke:#6d28d9

    R["🔥 Roger Parkinson<br/>b. 1975 · Rexburg, Idaho"]
    F["Frederick Parkinson<br/>b. 1862 · Franklin, Idaho<br/>d. 1940 · Preston, Idaho"]
    S["Samuel Rose Parkinson<br/>b. 1831 · Barrowford, Lancashire 🏭<br/>d. 1919 · Preston, Idaho"]
    H["Henry Parkinson<br/>b. 1802 · Barrowford, Lancashire"]
    J1["John Parkinson<br/>b. 1769 · Newchurch in Pendle 🧙‍♀️<br/>d. 1847 · Lancashire"]
    J2["James Parkinson<br/>b. 1733 · Newchurch in Pendle<br/>Pendle Witch Trial Country"]
    J3["John Parkinson<br/>b. 1729 · Burnley, Lancashire<br/>d. 1799 · Pendle Forest"]

    R --> F
    F --> S
    S --> H
    H --> J1
    J1 --> J2
    J1 --> J3

    class R,F usa
    class S transition
    class H,J1,J2,J3 eng
```

**What the UI would do:** Click any ancestor → expand their story card with Wikipedia context, YouTube documentaries, and Wikidata enrichment. Samuel's card would show Barrowford cotton mill history, the Lancashire Cotton Famine, and links to BBC documentaries about Pendle.

---

## 2. The Great Migration — Europe to Idaho

```mermaid
flowchart LR
    classDef source fill:#1e40af,color:#fff
    classDef mid fill:#7c3aed,color:#fff
    classDef dest fill:#dc2626,color:#fff

    subgraph "🇬🇧 England"
        E1["Lancashire<br/>2,359 ancestors"]
        E2["Yorkshire<br/>3,488 ancestors"]
        E3["Cornwall<br/>1,397 ancestors"]
        E4["Devon<br/>1,714 ancestors"]
        E5["Kent<br/>2,152 ancestors"]
    end

    subgraph "🇸🇪 Sweden"
        S1["Gotland<br/>~500 ancestors"]
    end

    subgraph "🏔️ Colonial America"
        C1["Massachusetts<br/>1,595 ancestors"]
        C2["Connecticut<br/>830 ancestors"]
        C3["Virginia<br/>657 ancestors"]
    end

    subgraph "⛪ Pioneer Trail"
        P1["Nauvoo, IL<br/>13 connections"]
        P2["Salt Lake City<br/>65 connections"]
        P3["Grantsville, UT<br/>43 connections"]
    end

    subgraph "🔥 Idaho"
        I1["Franklin<br/>16 connections<br/><i>First settlement 1860</i>"]
        I2["Rexburg<br/>61 connections<br/><i>Founded by ancestor<br/>T.E. Ricks</i>"]
    end

    E1 & E2 & E3 & E4 & E5 --> C1 & C2 & C3
    S1 --> I2
    C1 & C2 & C3 --> P1
    P1 --> P2
    P2 --> P3
    P3 --> I1
    I1 --> I2

    class E1,E2,E3,E4,E5,S1 source
    class C1,C2,C3 mid
    class P1,P2,P3 mid
    class I1,I2 dest
```

**What the UI would do:** Animated flow showing ancestors moving across the map over centuries. Click any node → see the actual people who lived there. The Lancashire→Idaho path lights up the Parkinson line. The Gotland→Idaho path lights up the Ostberg line.

---

## 3. The Ancestor Population Through Time

```mermaid
xychart-beta
    title "Ancestors by Century (72,182 total)"
    x-axis ["100-999", "1000s", "1100s", "1200s", "1300s", "1400s", "1500s", "1600s", "1700s", "1800s", "1900s"]
    y-axis "Number of Ancestors" 0 --> 20000
    bar [8, 7, 75, 4051, 18148, 19397, 14286, 6389, 2730, 759, 81]
```

**What the UI would do:** Interactive timeline — hover over a bar to see the top surnames, locations, and historical events of that century. Click the 1400s bar → "19,397 ancestors lived through the Wars of the Roses, the fall of Constantinople, and the dawn of the Renaissance."

---

## 4. Where Your Ancestors Came From — Geographic Heatmap

```mermaid
pie title Ancestors by Country of Origin (64,801 with known birthplace)
    "England" : 46990
    "Scotland" : 4164
    "Wales" : 4034
    "France" : 835
    "Sweden" : 600
    "Germany" : 460
    "Ireland" : 322
    "Other" : 7077
```

**What the UI would do:** This would be a real interactive map — a globe you can spin, with heat zones glowing over England, Scotland, Wales. Zoom into England and see county-level detail: Yorkshire (3,488), Suffolk (2,601), Cheshire (2,585), Lancashire (2,359), Kent (2,152). Click any county → see the surnames concentrated there + Wikipedia context about that region.

---

## 5. English County Deep Dive

```mermaid
xychart-beta
    title "Top 10 English Counties (46,990 English ancestors)"
    x-axis ["Yorkshire", "Suffolk", "Cheshire", "Lancashire", "Kent", "Norfolk", "Devon", "Essex", "Cornwall", "Somerset"]
    y-axis "Ancestors" 0 --> 3600
    bar [3488, 2601, 2585, 2359, 2152, 1750, 1714, 1655, 1397, 1322]
```

---

## 6. Your Ancestors and the Battles of History

```mermaid
timeline
    title Ancestors in Major Battles

    section 1300s
        Battle of the Golden Spurs (1302)
            : Robert II d'Artois — killed at Kortrijk, Belgium

        Battle of Bannockburn (1314)
            : 17 ancestors killed
            : Robert de Clifford, Gilbert de Clare

    section 1400s
        Battle of Agincourt (1415)
            : 6 ancestors killed
            : Roger Vaughan, Dafydd Gam
            : Edward of Norwich (Duke of York)

        Wars of the Roses (1455-1487)
            : William de Plumpton — killed at Towton
            : William Hastings — beheaded in Tower
            : Battle of Bosworth, Tewksbury

    section 1500s
        Battle of Flodden (1513)
            : 36 ancestors killed
            : William Adair, John Somerville
            : Alexander Stewart (Archbishop)

        Battle of Sauchieburn (1488)
            : Roger Kirkpatrick Grierson — killed
```

**What the UI would do:** Interactive timeline with battle maps. Click "Agincourt" → animated map of the battle, list of your 6 ancestors who were there, YouTube documentary embed, Wikipedia context about Henry V's campaign. "Your ancestor Dafydd Gam was reportedly the inspiration for Shakespeare's character Fluellen."

---

## 7. The Tower of London — Your Family's Dark Connection

```mermaid
graph TD
    classDef executed fill:#991b1b,color:#fff
    classDef imprisoned fill:#78350f,color:#fff
    classDef born fill:#1e40af,color:#fff
    classDef died fill:#4a044e,color:#fff

    TOWER["🏰 Tower of London<br/><i>Your ancestors' connection<br/>to 1,000 years of English history</i>"]

    CH["Catherine Howard<br/>Queen of England<br/>⚔️ Executed 13 Feb 1542<br/><i>5th wife of Henry VIII</i>"]
    GP["George Plantagenet<br/>Duke of Clarence<br/>⚔️ Drowned in wine 1478<br/><i>On orders of his brother</i>"]
    WH["William Hastings<br/>1st Baron Hastings<br/>⚔️ Beheaded 13 Jun 1483<br/><i>On orders of Richard III</i>"]
    EB["Elizabeth Brooke<br/>Baroness Cobham<br/>Died 10 Oct 1560"]
    EY["Elizabeth of York<br/>Queen Consort<br/>Died 11 Feb 1503"]
    RC["Robert Chamberleyne<br/>Died 12 Mar 1491"]
    WC["William Champneis<br/>Died 1362"]
    WS["William St. Clair<br/>Died 1297"]
    JB["James de Berners<br/>Died 1388"]

    TOWER --> CH
    TOWER --> GP
    TOWER --> WH
    TOWER --> EB
    TOWER --> EY
    TOWER --> RC
    TOWER --> WC
    TOWER --> WS
    TOWER --> JB

    class CH,GP,WH executed
    class EB,EY,RC died
    class WC,WS,JB imprisoned
```

**What the UI would do:** 3D model of the Tower of London. Click locations within the Tower to see which of your ancestors were there. Tower Green → Catherine Howard's execution site. The Bowyer Tower → George Plantagenet drowned in a barrel of Malmsey wine. Beauchamp Tower → prisoners who scratched their names into the walls.

---

## 8. The Enrichment Pipeline — What Makes Stories Come Alive

```mermaid
flowchart TD
    classDef raw fill:#64748b,color:#fff
    classDef wiki fill:#2563eb,color:#fff
    classDef yt fill:#dc2626,color:#fff
    classDef story fill:#059669,color:#fff
    classDef data fill:#7c3aed,color:#fff

    DB["📊 72,182 Ancestors<br/>Names · Dates · Places<br/>FamilySearch IDs"]

    subgraph "Enrichment Layer"
        WD["🌐 Wikidata<br/>Coordinates · Events<br/>Demographics · Occupations"]
        WP["📖 Wikipedia<br/>Narrative Context<br/>What was life like?"]
        YT["🎬 YouTube<br/>Documentaries · Tours<br/>Period Music · Oral History"]
        FS["🔗 FamilySearch<br/>Census · Immigration<br/>Baptism · Marriage"]
    end

    subgraph "AI Layer"
        AI["🤖 Claude<br/>Heritage Storyteller<br/>Weaves facts into narrative"]
    end

    subgraph "Output"
        STORY["📜 Rich Story<br/><i>'Your ancestor Samuel lived in<br/>Barrowford — a cotton mill village<br/>in the shadow of Pendle Hill,<br/>where 10 women were hanged for<br/>witchcraft in 1612...'</i>"]
        MAP["🗺️ Interactive Map<br/>Migration routes with<br/>real coordinates"]
        VID["🎥 Video Links<br/>BBC Pendle documentary<br/>Lancashire mill tours<br/>Gotland Viking history"]
        TREE["🌳 Family Tree<br/>Expandable, clickable<br/>with enrichment cards"]
    end

    DB --> WD & WP & YT & FS
    WD & WP & YT & FS --> AI
    AI --> STORY & MAP & VID & TREE

    class DB raw
    class WD,WP,FS wiki
    class YT yt
    class AI data
    class STORY,MAP,VID,TREE story
```

---

## 9. The Mormon Pioneer Trail — Your Family's Westward Path

```mermaid
flowchart LR
    classDef east fill:#1e40af,color:#fff
    classDef trail fill:#d97706,color:#fff
    classDef west fill:#dc2626,color:#fff

    ENG["🇬🇧 England<br/>46,990 ancestors<br/><i>Lancashire, Yorkshire,<br/>Cornwall, Devon...</i>"]
    SWE["🇸🇪 Sweden<br/>600 ancestors<br/><i>Gotland island</i>"]

    COL["🏘️ Colonial New England<br/>Massachusetts: 1,595<br/>Connecticut: 830<br/>Virginia: 657"]

    NAU["⛪ Nauvoo, Illinois<br/>13 ancestors<br/><i>The gathering before<br/>the exodus west</i>"]
    SLC["🏔️ Salt Lake City<br/>65 connections<br/><i>Brigham Young's<br/>destination</i>"]
    GRA["🏡 Grantsville, Utah<br/>43 ancestors<br/><i>Parkinson/Williams<br/>settlement</i>"]
    FRA["⛏️ Franklin, Idaho<br/>16 connections<br/><i>First permanent<br/>Idaho settlement (1860)</i>"]
    REX["🔥 Rexburg, Idaho<br/>61 connections<br/><i>Founded by YOUR ancestor<br/>Thomas Edwin Ricks</i>"]

    ENG --> COL
    SWE --> REX
    COL --> NAU
    NAU --> SLC
    SLC --> GRA
    GRA --> FRA
    FRA --> REX

    class ENG,SWE east
    class COL,NAU,SLC,GRA trail
    class FRA,REX west
```

---

## 10. Famous Ancestors — Your Connection to History

```mermaid
mindmap
    root((Roger<br/>Parkinson))
        **Royalty**
            Edward III
                King of England
                b. 1312, Windsor Castle
            Henry V
                King of England
                b. 1386, Monmouth Castle
                Agincourt victor
            Henry VII
                Founded Tudor dynasty
                b. 1457, Pembroke Castle
        **Literature**
            Geoffrey Chaucer
                Father of English Literature
                Canterbury Tales
                b. 1343, London
            Shakespeare Connection
                Lettice Shakespeare
                b. 1583, Stratford area
        **Tudor Court**
            Thomas Cromwell
                Broke England from Rome
                Wolf Hall protagonist
                Executed 1540
            Catherine Howard
                5th wife of Henry VIII
                Executed 1542, Tower
            25+ Tudor family members
        **Plantagenet Dynasty**
            12 Plantagenets in tree
            George — drowned in wine
            Margaret — last Plantagenet
            300+ years of English rule
        **Westminster Abbey**
            69 ancestors buried there
            Including 3 kings
            Geoffrey Chaucer
            Margaret Beaufort
        **Hometown Founder**
            Thomas Edwin Ricks
                Founded Rexburg, Idaho
                YOUR birthplace
                Namesake of BYU-Idaho
```

---

## 11. The Swedish Line — Gotland to Idaho

```mermaid
graph TD
    classDef swe fill:#005baa,color:#fcd116,stroke:#005baa
    classDef usa fill:#dc2626,color:#fff

    G1["Catharina<br/>b. 1701 · Mannegarda, Lye, Gotland 🏝️<br/><i>Viking island in the Baltic</i>"]
    G2["Brita Katrina<br/>b. 1726 · Lye, Gotland<br/><i>Hanseatic trading era</i>"]
    G3["Brita Stina<br/>b. 1755 · Lye, Gotland"]
    G4["Katrina<br/>b. 1795 · Hamra, Gotland"]
    G5["Brita Katrina<br/>b. 1811 · Hamra, Gotland"]
    G6["Lorentina Catrina Boström<br/>b. 1842 · Hamra, Gotland"]
    G7["Anna Maria Carolina Katrina Ostberg<br/>b. 1872 · Hamra, Gotland 🚢<br/><i>The Great Swedish Emigration</i>"]
    G8["Alice Ostberg<br/>b. 1907 · Plano, Idaho<br/><i>First generation born<br/>in America</i>"]

    G1 --> G2 --> G3 --> G4 --> G5 --> G6 --> G7 --> G8

    class G1,G2,G3,G4,G5,G6,G7 swe
    class G8 usa
```

**What the UI would do:** Side panel shows Gotland Wikipedia article + Wikidata (coordinates, population, history). YouTube embed: "Gotland: Sweden's Viking Island" documentary. Map shows the Baltic Sea with Gotland highlighted, then an animated line across the Atlantic to Idaho.

---

## 12. The American Story — Where Your Ancestors Settled

```mermaid
pie title US Ancestors by State (3,667 born in America)
    "Massachusetts" : 1595
    "Connecticut" : 830
    "Virginia" : 657
    "North Carolina" : 137
    "Utah" : 142
    "Idaho" : 112
    "New York" : 46
    "Kentucky" : 25
    "Pennsylvania" : 18
    "Other" : 105
```

---

## 13. The Top 10 Surnames in Your Tree

```mermaid
xychart-beta
    title "Most Common Surnames (72,182 individuals)"
    x-axis ["Smith", "Stewart", "Douglas", "Grey", "Neville", "Hill", "Williams", "Taylor", "Brown", "White"]
    y-axis "Count" 0 --> 450
    bar [404, 272, 217, 172, 169, 161, 158, 155, 151, 147]
```

**What the UI would do:** Click a surname → see all individuals with that name, their geographic distribution, and their time span. "The 169 Nevilles in your tree span from Neville de Raby (1100s, County Durham) to Hannah Alice Neville (1910, Idaho). The Neville family was one of the most powerful in medieval England — your ancestor Cecily Neville was mother to two kings."

---

## What These Prototypes Prove

1. **The data is real** — 72,182 ancestors, all queryable, all enrichable
2. **The visualizations write themselves** — the data is so rich that every diagram tells a story
3. **Mermaid is the wireframe** — production would use D3.js, Mapbox, BALKAN FamilyTree JS, Three.js
4. **Every node is clickable** — every ancestor connects to Wikipedia, Wikidata, YouTube, FamilySearch
5. **The enrichment pipeline multiplies value** — raw names become interactive history lessons

### From Mermaid to Production UI

| Mermaid Prototype | Production Component |
|-------------------|---------------------|
| Family tree (graph TD) | BALKAN FamilyTree JS — zoomable, expandable, with photo cards |
| Migration flow (flowchart LR) | Mapbox GL — animated routes on a real world map |
| Timeline | D3.js timeline — scrollable, with event cards and Wikipedia popups |
| Pie/bar charts | Chart.js or Recharts — interactive, filterable, drillable |
| Mind map | Force-directed graph (D3) — draggable, with relationship lines |
| Tower of London | Three.js — 3D model with clickable locations |
| Battle connections | Mapbox with battle site markers + YouTube documentary links |

---

*Every diagram above uses real data from Roger's database. This is not mockup data. These are actual ancestors, actual locations, actual dates. The product makes 72,182 names come alive.*
