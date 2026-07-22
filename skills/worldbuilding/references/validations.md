# Worldbuilding - Validations

## Magic System Must Define Limits

### **Id**
magic-system-has-limits
### **Description**
  Per Sanderson's Second Law: Limitations are more interesting than powers.
  Every magic system document should explicitly define what magic CANNOT do.
  
### **Pattern**
magic|spell|ability|power|arcane|mystic
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
cannot|limit|cost|restrict|weakness|forbidden|impossible
### **Message**
  Magic system detected but no clear limitations found.
  Add explicit sections for:
  - Hard limits (what magic absolutely cannot do)
  - Costs (what using magic requires)
  - Weaknesses (what counters or blocks magic)
  
### **Severity**
warning
### **Autofix**


## Magic Should Address Economic Impact

### **Id**
magic-economic-impact
### **Description**
  Magic that affects production, transportation, or resources needs economic
  consideration to maintain world consistency.
  
### **Pattern**
teleport|create|conjure|summon|transmut|heal|grow|multiply
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
cost|rare|limit|economy|trade|price|scarc
### **Message**
  Potentially economy-breaking magic detected.
  Consider documenting:
  - Why doesn't everyone use this?
  - What economic systems remain necessary?
  - Who controls access to this magic?
  
### **Severity**
info
### **Autofix**


## Cultures Should Have Internal Diversity

### **Id**
culture-has-diversity
### **Description**
  To avoid "Planet of Hats" syndrome, cultures should document internal
  factions, subgroups, or variations.
  
### **Pattern**
culture|civilization|people|race|species|nation
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
faction|subgroup|division|internal|disagree|tension|sect|clan|tribe
### **Message**
  Culture defined but no internal diversity documented.
  Consider adding:
  - 2-4 subgroups or factions within the culture
  - Internal tensions or debates
  - Individuals who don't fit the mold
  
### **Severity**
info
### **Autofix**


## Intercultural Relationships Should Not Be Monolithic

### **Id**
culture-not-monolithic-relationship
### **Description**
  Relationships between cultures should have nuance - not "all X hate all Y."
  
### **Pattern**
hate|enemy|ally|friend|distrust|fear
### **File Glob**
**/*culture*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
some|exception|official|individual|generation|faction
### **Message**
  Strong intercultural relationship detected.
  Ensure you document:
  - Official vs actual relationship
  - Exceptions and individual variations
  - Historical changes in the relationship
  
### **Severity**
info
### **Autofix**


## Historical Events Should Show Cause-Effect

### **Id**
timeline-has-causation
### **Description**
  Events should lead to consequences. "X happened" needs "therefore Y changed."
  
### **Pattern**
year|age|era|century|event|battle|war|founded
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
because|result|consequence|led to|caused|therefore|aftermath
### **Message**
  Historical events detected without clear cause-effect chains.
  For each major event, document:
  - What caused it?
  - What changed because of it?
  - How does it affect the present?
  
### **Severity**
info
### **Autofix**


## Check for Unrealistic Durations

### **Id**
timeline-reasonable-duration
### **Description**
  Flag suspiciously long periods of stability or stagnation that might
  need explanation.
  
### **Pattern**
\b\d{4,}\s*(years?|centuries)
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
because|magic|immortal|stasis|prevent|explain
### **Message**
  Very long time period detected (1000+ years).
  Ensure you explain why:
  - Technology didn't advance
  - Social structures stayed stable
  - No major changes occurred
  
### **Severity**
info
### **Autofix**


## Conflicts Must Have Clear Motivations

### **Id**
conflict-has-motivation
### **Description**
  Every conflict needs resource-based or ideological motivation for all parties.
  "They're evil" is not sufficient.
  
### **Pattern**
conflict|war|enemy|battle|feud|fight
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
resource|stake|motivation|reason|want|need|fear|believe
### **Message**
  Conflict detected without clear motivations.
  Document for EACH side:
  - What do they want?
  - Why do they believe they're right?
  - What do they fear if they lose?
  
### **Severity**
warning
### **Autofix**


## Conflicts Should Show Multiple Perspectives

### **Id**
conflict-multiple-perspectives
### **Description**
  Avoid pure good vs evil. Each side should have understandable motivations.
  
### **Pattern**
villain|enemy|evil|antagonist
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
perspective|view|believe|justify|understand|reason
### **Message**
  Antagonist/villain detected.
  Ensure you document:
  - Their perspective on the conflict
  - Why they believe they're justified
  - Moderates or sympathetic members
  
### **Severity**
info
### **Autofix**


## Names Should Follow Consistent System

### **Id**
naming-has-system
### **Description**
  Names within a culture should have documented phonetic rules or patterns.
  
### **Pattern**
name.*:.*[A-Z][a-z]+|[A-Z][a-z]+.*name
### **File Glob**
**/*culture*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
phoneme|syllable|pattern|structure|suffix|prefix|convention
### **Message**
  Names detected without naming convention documentation.
  Consider creating a naming system with:
  - Allowed sounds/phonemes
  - Syllable structure rules
  - Common suffixes/prefixes
  - Example names
  
### **Severity**
info
### **Autofix**


## Names Should Be Pronounceable

### **Id**
naming-pronounceable
### **Description**
  Flag names with excessive consonant clusters or unusual patterns
  that may be hard to pronounce.
  
### **Pattern**
[A-Z][a-z]*[^aeiou]{4,}[a-z]*
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
absent
### **Message**
  Potentially unpronounceable name detected (4+ consonants in a row).
  Consider:
  - Breaking up consonant clusters
  - Simplifying for important characters
  - Testing with beta readers
  
### **Severity**
info
### **Autofix**


## Economy Should Account for Magic/Tech

### **Id**
economy-addresses-magic
### **Description**
  Economic systems should consider how magic or advanced technology
  affects trade, production, and scarcity.
  
### **Pattern**
economy|trade|currency|market|merchant|gold
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
magic|technology|impact|change|affect|despite
### **Message**
  Economic content detected.
  Ensure you address:
  - How does magic/tech affect this economy?
  - What remains scarce despite magic?
  - Who benefits from the economic system?
  
### **Severity**
info
### **Autofix**


## Check Food Production for Population

### **Id**
economy-food-production
### **Description**
  Cities and populations need food sources. Medieval settings need
  ~90% farmers to support cities.
  
### **Pattern**
city|population|kingdom|empire|million
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
farm|food|agriculture|feed|grain|import
### **Message**
  Large population referenced.
  Consider documenting:
  - Where does food come from?
  - What percentage farms vs other work?
  - Is food imported? From where?
  
### **Severity**
info
### **Autofix**


## Religions Should Serve Psychological Needs

### **Id**
religion-serves-needs
### **Description**
  Religions should answer existential questions and provide community
  benefits that explain why people believe.
  
### **Pattern**
god|religion|faith|worship|belief|temple|priest
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
death|afterlife|moral|community|meaning|purpose|fear
### **Message**
  Religion detected without psychological needs addressed.
  Document:
  - What existential questions does it answer?
  - What does it promise believers?
  - Why would someone genuinely believe?
  
### **Severity**
info
### **Autofix**


## Religions Should Have Power Dynamics

### **Id**
religion-power-structure
### **Description**
  Who interprets religious doctrine matters politically.
  
### **Pattern**
priest|temple|church|clergy|holy
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
power|authority|hierarchy|select|corrupt|reform
### **Message**
  Religious institution detected.
  Document:
  - Who has authority to interpret doctrine?
  - How are religious leaders chosen?
  - What is the relationship with secular power?
  
### **Severity**
info
### **Autofix**


## Biomes Should Transition Gradually

### **Id**
geography-biome-transitions
### **Description**
  Deserts don't border tundra without explanation. Check for logical
  biome transitions.
  
### **Pattern**
desert|tundra|rainforest|jungle|arctic|tropical
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
transition|border|gradient|magic|divine|anomaly
### **Message**
  Extreme biome type detected.
  Ensure transitions make sense:
  - Desert → Scrubland → Grassland (not desert → rainforest)
  - Tropical → Temperate → Arctic by latitude
  - Or document magical/divine explanation
  
### **Severity**
info
### **Autofix**


## Rivers Should Flow Correctly

### **Id**
geography-river-logic
### **Description**
  Rivers flow downhill from mountains/highlands to sea.
  They don't split (tributaries join).
  
### **Pattern**
river|stream|tributary|delta
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
mountain|sea|ocean|source|mouth|flow
### **Message**
  River system detected.
  Verify:
  - Rivers start in highlands (mountains, lakes)
  - Rivers flow to sea/major lakes
  - Tributaries join, not split
  - Cities at strategic river points (fords, mouths)
  
### **Severity**
info
### **Autofix**


## Lore Should Cross-Reference Consistently

### **Id**
lore-cross-reference
### **Description**
  When multiple documents reference the same entity, details should match.
  
### **Pattern**
see also|reference|related|mentioned in
### **File Glob**
**/*.{md,yaml,json,txt}
### **Match**
present
### **Context Pattern**
consistent|verify|check|same as
### **Message**
  Cross-reference detected.
  Maintain a master document of:
  - Entity names and spellings
  - Key dates and events
  - Relationships between entities
  
### **Severity**
info
### **Autofix**


## World Should Have Central Reference

### **Id**
world-bible-exists
### **Description**
  Complex worlds benefit from a central "world bible" document
  that tracks key facts.
  
### **Pattern**
world|setting|universe|lore
### **File Glob**
**/README.md
### **Match**
present
### **Context Pattern**
bible|reference|master|index|central
### **Message**
  Consider creating a world bible document that indexes:
  - All cultures and their key traits
  - Major historical events and dates
  - Magic system rules summary
  - Key characters and relationships
  
### **Severity**
info
### **Autofix**
