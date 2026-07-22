# Worldbuilding - Sharp Edges

## Magic Systems That Break Economic Logic

### **Id**
magic-breaks-economy
### **Severity**
CRITICAL
### **Description**
  Teleportation, creation, and infinite resources destroy believable economies.
  This is the #1 killer of internal consistency.
  
### **Symptoms**
  - Players ask "why doesn't everyone just teleport goods?"
  - Money becomes meaningless when you can create gold
  - Trade routes exist for no logical reason
  - Why would anyone farm if mages can create food?
  - Entire professions have no reason to exist
### **Detection Pattern**
teleport|create|conjure|summon|transmut|infinite|unlimited
### **Situation**
  You add a cool magical ability without thinking through the economic implications.
  Creation magic, teleportation, infinite resources, or perfect healing all have
  cascading effects on how a society would actually function.
  
### **Why**
  Smart people (including players) will find the optimal strategy. If magic provides
  a shortcut, everyone with access would use it. Your medieval trade economy can't
  coexist with free teleportation unless there are severe constraints.
  
  The Warcraft team learned this lesson repeatedly - every time they added a convenient
  feature, it had cascading effects they didn't anticipate.
  
### **Solution**
  Every magical ability needs constraints that preserve economic logic:
  
  **TELEPORTATION CONSTRAINTS:**
  | Constraint Type | Example | Economic Effect |
  |----------------|---------|-----------------|
  | Mass limit | Can't teleport cargo | Bulk trade still by ship |
  | Anchor requirement | Must visit destination first | Established routes still matter |
  | Cost scales exponentially | 1 person = cheap, 100 = impossible | Personal travel only |
  | Requires rare resource | Teleportation crystals are expensive | Limited to high-value goods |
  | Risk increases with distance | Far = high failure rate | Short-range only practical |
  
  **CREATION MAGIC CONSTRAINTS:**
  | Constraint Type | Example | Economic Effect |
  |----------------|---------|-----------------|
  | Ingredient cost > output | Need 2g gold to create 1g gold | No economic incentive |
  | Temporary results | Created food spoils in hours | Emergency use only |
  | Quality limits | Created items are inferior | Natural goods still valued |
  | Skill/rarity | Only 0.01% can do this | Luxury, not commodity |
  | Banned by law/treaty | Death penalty for economic magic | Black market only |
  
  **TEST YOUR MAGIC SYSTEM:**
  1. "If I were a smart merchant, how would I exploit this?"
  2. "What jobs become obsolete? Is that okay for my story?"
  3. "Who gets rich? Who gets poor?"
  4. "Would this magic make war easier or harder?"
  
### **References**
  - https://worldbuildingworkshop.com/ - Economics section
  - Sanderson's Second Law: Limitations > Powers

## Monocultures (Planet of Hats Syndrome)

### **Id**
planet-of-hats
### **Severity**
CRITICAL
### **Description**
  Every member of a species or culture has the same single defining trait.
  "The warrior race," "the merchant people," "the honorable elves."
  
### **Symptoms**
  - All members of a culture act identically
  - You can predict every NPC from knowing their species
  - Cultures defined by single adjectives
  - No internal factions, debates, or diversity
  - World feels like a theme park with "zones"
### **Detection Pattern**
all.*are|every.*is|always|never|the.*race|the.*people
### **Situation**
  You design a culture around a single trait for simplicity. "Dwarves = miners."
  "Elves = nature-lovers." "Orcs = warriors." This makes worldbuilding easier
  but creates shallow, predictable worlds.
  
### **Why**
  Real cultures have:
  - Regional variations (New Yorkers vs Texans are both American)
  - Class differences (nobles vs peasants within same culture)
  - Generational gaps (old vs young disagree)
  - Subcultures and countercultures (punks exist everywhere)
  - Individual variation (some people reject their culture)
  
  Ann Leckie's Ancillary series explicitly mocks this - empires THINK conquered
  peoples are monocultures, but they're wrong. That's the point.
  
### **Solution**
  **MINIMUM VIABLE CULTURAL DIVERSITY:**
  
  Every culture needs at least:
  ```yaml
  culture:
    name: "Your Culture"
  
    core_values: # 2-3 things most members agree on
      - "Value 1"
      - "Value 2"
  
    internal_factions: # 3-4 subgroups that disagree
      faction_a:
        specialty: "What they do"
        values: "What they believe"
        tension_with: "Who they clash with"
  
      faction_b:
        specialty: "Different thing"
        values: "Different beliefs"
        tension_with: "Different enemies"
  
    outliers: # Individuals who don't fit
      - "The poet in the warrior culture"
      - "The skeptic in the religious society"
      - "The traditionalist in the progressive city"
  
    relationships: # Not monolithic
      with_culture_x:
        official: "What governments say"
        actual: "What people do"
        exceptions: "Individual variations"
  ```
  
  **QUICK FIX: THE TWO-HAT METHOD**
  Instead of "the warrior race," try "the warrior-poet race" or
  "the merchant-mystic culture." Two traits create instant complexity.
  
### **References**
  - https://mythcreants.com/blog/avoiding-the-planet-of-hats/
  - Writing Excuses 14.03: World of Hats

## Worldbuilder's Disease (Infinite Preparation)

### **Id**
worldbuilders-disease
### **Severity**
HIGH
### **Description**
  Spending so much time worldbuilding that you never actually write the story
  or ship the game. This is procrastination disguised as productivity.
  
### **Symptoms**
  - 50,000 words of lore, zero words of actual story
  - Detailed calendar system for a game where time doesn't matter
  - Years of "preparation" before starting
  - Every question leads to more worldbuilding, not storytelling
  - I can't start until I know everything
### **Detection Pattern**
not ready|need to finish|more detail|complete the
### **Situation**
  You keep finding new aspects of the world to develop. The more you build,
  the more questions arise. It feels productive - you're working! But the
  story/game never gets made.
  
### **Why**
  Tolkien spent 60 years building Middle-earth. Most people don't have that luxury.
  More importantly, Tolkien LOVED worldbuilding for its own sake - it wasn't
  procrastination for him. For most people, it is.
  
  Underlying causes:
  - Fear of starting (what if it's bad?)
  - Fear of finishing (what if people don't like it?)
  - Perfectionism (it's not ready yet)
  - Fear of losing ideas (I'll forget if I don't write it all down)
  
  Brandon Sanderson explicitly warns against this in his lectures.
  
### **Solution**
  **THE CURE: DEADLINES AND MINIMUMS**
  
  1. **Set a hard deadline** for worldbuilding phase
     - "I have 2 weeks. Then I start writing/building."
  
  2. **Use the Iceberg Method**
     - Build only what you need for the NEXT chapter/level
     - Hint at depth without creating it
     - Add details as needed during creation
  
  3. **Minimum Viable World**
     For a story: You need the location(s) it happens, the rules that affect plot
     For a game: You need what players will see and interact with
  
  4. **The "90% Rule"**
     - You need to KNOW 50% of your world
     - You need to HINT at 90%
     - You need to SHOW 10%
     - Only build what you show. Hint at the rest.
  
  5. **Write First, Worldbuild to Support**
     - Write the scene. Hit a question? Answer it minimally.
     - "What do they eat?" → "Bread and fish" (done, keep writing)
     - NOT → "Let me design the entire agricultural system"
  
  **WARNING SIGNS:**
  - You're building areas the story never visits
  - You're detailing history no character remembers
  - You're designing languages no one speaks on-page
  - You've spent more time on lore than on scenes
  
### **References**
  - https://www.tckpublishing.com/worldbuilders-disease/
  - Sanderson's 2024 Worldbuilding Lecture

## Historical Timelines That Don't Make Sense

### **Id**
timeline-inconsistency
### **Severity**
HIGH
### **Description**
  Events don't follow cause-and-effect. Technology doesn't progress.
  Empires last impossibly long. Players find contradictions.
  
### **Symptoms**
  - Why didn't they invent X if they had Y 1000 years ago?
  - Empires lasting 5000+ years with no change
  - Technology frozen at medieval level for millennia
  - Events happen but have no lasting consequences
  - Players find plot holes in your history
### **Detection Pattern**
year|age|era|century|millenn|ancient|history
### **Situation**
  You build history by adding cool events without checking if they're
  compatible with each other or lead to logical consequences.
  
### **Why**
  Real history shows patterns:
  - Technology accelerates (stone age: millions of years; industrial: centuries; digital: decades)
  - Empires rise and fall (200-500 years typical, 1000 years rare)
  - Languages drift (unrecognizable after ~500-1000 years without writing)
  - Population compounds (doubles every ~300 years in good conditions)
  
  If your medieval world has been medieval for 10,000 years, something is preventing
  change - and you need to explain what. Otherwise, smart readers will ask questions.
  
### **Solution**
  **TIMELINE CONSISTENCY CHECKLIST:**
  
  ```yaml
  timeline_check:
    technology:
      - "If metallurgy exists, why no agriculture?"
      - "If sailing exists, why haven't they explored X?"
      - "What prevents gunpowder/printing/steam?"
      - "If magic exists, why didn't it change tech development?"
  
    politics:
      - "How does this empire maintain control over this distance?"
      - "Why hasn't anyone rebelled in 1000 years?"
      - "What prevents other empires from forming?"
      - "Who benefits from the status quo? Who loses?"
  
    society:
      - "With this birth/death rate, what's the population?"
      - "How do they feed this many people?"
      - "What prevents social change over centuries?"
      - "Why do traditions persist this long?"
  
    cause_effect:
      - "This war happened. What changed because of it?"
      - "This plague killed 30%. How did that affect X?"
      - "This discovery was made. Who exploited it?"
  ```
  
  **REALISTIC DURATION GUIDELINES:**
  | Entity | Typical Duration | Notes |
  |--------|------------------|-------|
  | Dynasty | 60-300 years | 3-10 generations |
  | Empire | 200-500 years | 1000 absolute max |
  | Religion | Can last millennia | But evolves dramatically |
  | Language | Unintelligible after 500-1000 years | Without standardization |
  | Tech Era | Accelerates | Stone: millions → Digital: decades |
  
  **EXPLANATIONS FOR STASIS:**
  If you NEED a long-static period, explain it:
  - Magic makes technology unnecessary
  - A cataclysm reset progress
  - Religious prohibition on innovation
  - An immortal ruler prevents change
  - External threat keeps everyone focused on survival
  
### **References**
  - https://inkwellideas.com/worldbuilding/worldbuilding-timelines/
  - Worldbuilding: Timelines - Inkwell Ideas

## Insensitive Fantasy Counterpart Cultures

### **Id**
fantasy-counterpart-culture
### **Severity**
HIGH
### **Description**
  Taking a real-world culture and just adding fantasy names. Often becomes
  stereotyping or exoticization, especially of non-Western cultures.
  
### **Symptoms**
  - "Desert People" who are just Arabs with different hats
  - "Honor-Bound Warriors" who are just Japanese samurai
  - "Noble Savages" based on Indigenous stereotypes
  - "Mysterious Eastern Mystics" based on Asian stereotypes
  - Culture has all the stereotypes, none of the depth
### **Detection Pattern**
inspired by|based on|like the|similar to|eastern|tribal
### **Situation**
  You want cultural diversity in your world, so you take Earth cultures
  and reskin them. This often flattens rich real cultures into stereotypes.
  
### **Why**
  N.K. Jemisin warns: "People go into creating a world that is not like ours
  with their embedded assumptions about how our world works still firmly in place.
  So they end up creating our world but with tentacle sharks."
  
  Problems with direct counterparts:
  - Reinforces stereotypes (both positive and negative)
  - Reduces complex cultures to recognizable shorthand
  - Can be disrespectful to source cultures
  - Limits creativity (why make a new world if it's just Earth?)
  - Readers from that culture will notice errors
  
### **Solution**
  **INSTEAD OF COPYING:**
  
  1. **Start from Environment, Not Culture**
     - "Desert" → Design culture around water scarcity, heat, nomadism
     - Don't start with "I want Arab culture" → Start with constraints
  
  2. **Mix Multiple Influences**
     - Take elements from 3+ cultures, none dominant
     - Add fantasy elements that couldn't exist on Earth
     - The mix should be unrecognizable as any one source
  
  3. **Ask "What Would Be Different?"**
     - "What if they had magic AND lived in a desert?"
     - "How would their history differ from Earth?"
     - "What would they believe given THIS world's reality?"
  
  4. **Research Respectfully**
     - If inspired by real culture, research deeply
     - Consult sensitivity readers from that background
     - Ask: "Would someone from this culture be offended?"
  
  **THE TEST:**
  Can a reader immediately identify the Earth culture you copied?
  - Yes → You've made a counterpart culture. Reconsider.
  - No → You've made something new. Good.
  
  **GOOD EXAMPLE:**
  The Alethi in Stormlight Archives:
  - Inspired by aspects of East Asian + Korean + original elements
  - But: Different gender roles around literacy, lighteyes/darkeyes caste,
    symmetry taboos, gem-based economy
  - Result: Feels original, not like any Earth culture
  
### **References**
  - N.K. Jemisin MasterClass on cultural worldbuilding
  - Writing the Other: A Practical Approach

## Names That Don't Belong Together

### **Id**
naming-inconsistency
### **Severity**
MEDIUM
### **Description**
  Mix of random naming styles breaks immersion. "Sir Bob of Xylphthoria."
  Names from different cultures sound identical. Unpronounceable names.
  
### **Symptoms**
  - Fantasy names next to modern names
  - "Sir Bob" alongside "Xylprthax the Undying"
  - Different cultures have identical naming patterns
  - Players can't pronounce or remember names
  - Names look like keyboard mashing
### **Detection Pattern**
name|naming|character|place
### **Situation**
  You make up names on the fly without a system. Or you have a system
  but abandon it for "cool" names. The result is inconsistent.
  
### **Why**
  Names signal culture. In real life, you can guess someone's background
  from their name. "Takeshi" suggests Japanese. "Vladimir" suggests Slavic.
  "Sean" suggests Irish. This works because languages have patterns.
  
  When your fantasy names have no patterns, they feel random. When different
  cultures have the same patterns, they blur together.
  
### **Solution**
  **CREATE A NAMING LANGUAGE (Light Version):**
  
  For each culture, define:
  ```yaml
  culture_names:
    phonemes:
      consonants: ["k", "r", "th", "s"]  # Sounds that exist
      vowels: ["a", "e", "i", "o"]
      clusters: ["sk", "th", "kr"]  # Allowed combinations
      forbidden: ["j", "sh", "ph"]  # Sounds that DON'T exist
  
    structure:
      syllables: 1-3  # How many syllables typical
      pattern: "CVC" or "CVCV"  # Consonant-Vowel patterns
      endings: ["-ar", "-ik", "-on"]  # Common suffixes
  
    examples:
      people: ["Korath", "Sirek", "Tharan"]
      places: ["Skorheim", "Etharan", "Kirath"]
  ```
  
  **QUICK RULES:**
  1. Keep names under 4 syllables (readers give up on "Xylprthaxiel")
  2. Important characters get easier names
  3. Test: Can a player say it on first try?
  4. Different cultures should SOUND different
  5. If players keep mispronouncing it, change it
  
  **THE BOB TEST:**
  If you name a character "Bob" in your fantasy world, does it stick out?
  - If yes: Your other names have a consistent style (good)
  - If no: Your names are too random (fix needed)
  
### **References**
  - https://mythcreants.com/blog/how-to-create-a-simple-language/
  - Conlanging 101 - Author Vivian Sayan

## Religions No One Would Actually Believe

### **Id**
religion-no-believers
### **Severity**
MEDIUM
### **Description**
  Designing religions that exist as window dressing rather than as belief
  systems that real people would genuinely follow.
  
### **Symptoms**
  - Religion has rules but no believers with genuine faith
  - "Evil god" that people worship for no reason
  - Religion is just "fantasy Christianity" with name changes
  - Believers act like they don't actually believe
  - Religion doesn't answer any existential questions
### **Detection Pattern**
god|religion|faith|worship|belief|temple|priest
### **Situation**
  You add a religion to your world because fantasy worlds "should have"
  religions, but you don't think about why people would actually believe it.
  
### **Why**
  Real religions emerge to serve psychological needs:
  - Explain existence (Why are we here?)
  - Promise continuation (What happens after death?)
  - Provide moral framework (What should we do?)
  - Create community (Who are our people?)
  - Offer control/comfort (How do we get good outcomes?)
  
  If your religion doesn't serve these needs, it won't feel real.
  
### **Solution**
  **RELIGION DESIGN FROM NEEDS:**
  
  ```yaml
  religion_design:
    # What does this religion offer believers?
    answers:
      existence: "Why do people exist in this world?"
      death: "What happens after? Is there hope?"
      morality: "What is right? How should people act?"
      suffering: "Why do bad things happen? Is there meaning?"
      community: "Who belongs? Who are the outsiders?"
  
    # What makes people BELIEVE?
    evidence:
      # In a world where gods are REAL and visible:
      - "Miracles happen and are witnessed"
      - "Prayers are sometimes answered"
      - "Divine punishment is observable"
  
      # In a world where gods are MATTERS OF FAITH:
      - "Traditional stories explain the world"
      - "Community reinforces belief"
      - "Coincidences are interpreted as signs"
  
    # Who enforces and benefits?
    power:
      priesthood: "Who speaks for the gods? How are they chosen?"
      hierarchy: "Who has authority? How is it maintained?"
      politics: "How does religion interact with secular power?"
      dissent: "What happens to skeptics and heretics?"
  ```
  
  **THE BELIEF TEST:**
  Would YOU believe this religion if you grew up in this world?
  - Does it answer the questions you'd have?
  - Does it offer comfort for the fears you'd feel?
  - Does it make sense given what's observable?
  
### **References**
  - https://inkwellideas.com/worldbuilding/worldbuilding-religion-design/
  - The Angry GM: Conflicted Beliefs

## Geography and Climate That Don't Make Sense

### **Id**
geography-climate-mismatch
### **Severity**
MEDIUM
### **Description**
  Biomes placed randomly without regard to climate logic. Deserts next
  to rainforests with no transition. Impossible geography.
  
### **Symptoms**
  - Desert directly borders tundra
  - Rivers flow uphill or have no source
  - Mountains appear in random locations
  - Biomes make no geographic sense
  - "Because it's fantasy" when questioned
### **Detection Pattern**
map|geography|climate|biome|desert|forest|mountain
### **Situation**
  You place biomes on a map based on what looks cool or what you need
  for the story, without considering how real geography works.
  
### **Why**
  Even fantasy readers have unconscious expectations about geography:
  - Deserts are hot and dry (usually interior or rain shadow)
  - Mountains form in ranges, not randomly
  - Rivers flow downhill to the sea
  - Biomes transition gradually, not abruptly
  
  Breaking these expectations breaks immersion unless justified.
  
### **Solution**
  **BASIC GEOGRAPHY RULES:**
  
  ```yaml
  biome_placement:
    # Temperature (equator → poles)
    latitude:
      equator: "tropical"
      mid: "temperate"
      poles: "arctic"
  
    # Moisture (ocean → interior)
    longitude:
      coastal: "wetter"
      interior: "drier"
  
    # Elevation effects
    mountains:
      windward: "wet (rain shadow)"
      leeward: "dry"
      high: "colder"
  
    # Transitions
    rule: "Biomes should transition gradually"
    example: "Desert → Scrubland → Grassland → Forest"
    not: "Desert → Rainforest (no transition)"
  
  river_rules:
    - "Flow downhill (from mountains to sea)"
    - "Start from snowmelt, springs, or lakes"
    - "Don't split (tributaries join, not separate)"
    - "Cities form at mouths, fords, confluences"
  
  mountain_rules:
    - "Form in ranges (tectonic plates)"
    - "Young mountains are tall and sharp"
    - "Old mountains are worn and rounded"
    - "Volcanoes can be isolated (hot spots)"
  ```
  
  **FANTASY EXCEPTIONS:**
  You CAN break these rules if:
  - Magic explicitly causes the anomaly
  - Divine intervention is canon
  - You acknowledge it's unusual in-world
  - It serves the story and you accept the inconsistency
  
### **References**
  - https://worldbuildingworkshop.com/2020/11/27/climates-and-biomes/
  - Climate Modeling 101 - Universe Factory

## Technology That Doesn't Fit the Society

### **Id**
technology-anachronism
### **Severity**
MEDIUM
### **Description**
  Mix of technology levels that don't make sense together. Advanced
  tech in one area, primitive in another, with no explanation.
  
### **Symptoms**
  - Plate armor exists but no gunpowder
  - Printing press but medieval economics
  - Advanced medicine but primitive sanitation
  - Magic that should have replaced technology hasn't
### **Detection Pattern**
technology|invent|advance|medieval|ancient
### **Situation**
  You want the aesthetic of a certain tech level (usually medieval)
  but include conveniences from other eras without considering
  whether they're compatible.
  
### **Why**
  Technologies are interconnected:
  - Printing requires paper-making, metallurgy, literacy
  - Plate armor implies metallurgical sophistication
  - Advanced sailing implies astronomy and mathematics
  - Each technology has prerequisites and consequences
  
  The question isn't "could this exist?" but "why DOESN'T everything
  else exist that would follow from it?"
  
### **Solution**
  **TECHNOLOGY CONSISTENCY CHECK:**
  
  For any technology, ask:
  1. **Prerequisites:** What other tech/knowledge is needed?
  2. **Implications:** What would logically follow from this?
  3. **Blockers:** If implications didn't happen, why not?
  
  ```yaml
  example_check:
    technology: "Plate armor"
  
    prerequisites:
      - "Advanced metallurgy"
      - "Specialized craftsmen"
      - "Horses strong enough to carry armored knights"
      - "Wealth to pay for it"
  
    implications:
      - "Should also have advanced weapons"
      - "Should have metal tools widely available"
      - "Mining industry should be significant"
  
    if_you_have_plate_but_no_gunpowder:
      options:
        - "Gunpowder ingredients don't exist here"
        - "It was invented but banned/forgotten"
        - "Magic makes gunpowder unnecessary/useless"
        - "The society taboos explosive weapons"
      choose_one_and_explain: true
  ```
  
  **MAGIC AS BLOCKER:**
  Magic can explain tech gaps:
  - "Why develop printing when scribes use copying magic?"
  - "Why develop medicine when healing magic exists?"
  - "Why develop gunpowder when fireballs are better?"
  
  But then: Who has access to that magic? What about those who don't?
  
### **References**
  - https://mythicscribes.com/community/threads/anachronistic-technology-in-a-fantasy-setting.6214/
  - SFWA: Worldbuilding with the Medieval Industrial Revolution

## Retcon Spiral (Warcraft Syndrome)

### **Id**
retcon-spiral
### **Severity**
MEDIUM
### **Description**
  Making changes to established lore that create more problems than
  they solve, requiring more retcons, leading to lore chaos.
  
### **Symptoms**
  - Fans keep a list of contradictions
  - "That was retconned" becomes common phrase
  - Writers lose track of what's canon
  - New reveals contradict old ones
  - Lore becomes incomprehensible to newcomers
### **Detection Pattern**
retcon|actually|reveal|twist|secret
### **Situation**
  You want to add a cool new revelation, but it contradicts established
  facts. You retcon. That creates new contradictions. You retcon those.
  The lore becomes a mess.
  
### **Why**
  Chris Metzen (Warcraft) acknowledged this:
  "There are literally thousands of characters, hundreds of locations...
  Sometimes things do fall through the cracks."
  
  Retcons can work when carefully done (Warcraft's eredar retcon improved
  the story). But careless retcons compound into chaos.
  
### **Solution**
  **RETCON MANAGEMENT:**
  
  Before retconning, ask:
  1. **Is it necessary?** Can the new idea coexist with old lore?
  2. **What breaks?** List everything affected by the change
  3. **Can you fix without breaking?** Reinterpret instead of replace
  4. **Is the new thing worth it?** Better story > lore purity, but is it MUCH better?
  
  **ALTERNATIVES TO RETCON:**
  
  ```yaml
  alternative_approaches:
    reinterpretation:
      description: "The old info was true, just incomplete"
      example: "We thought X, but actually X was only part of the story"
  
    unreliable_narrator:
      description: "The old source was wrong or lying"
      example: "That history was written by the victors"
  
    parallel_truth:
      description: "Both old and new are true"
      example: "Different cultures remember it differently"
  
    soft_retcon:
      description: "Just don't mention it anymore"
      example: "We never explain the contradiction, move on"
  ```
  
  **IF YOU MUST RETCON:**
  - Acknowledge it (don't gaslight fans)
  - Explain why (better story? Fixed mistake?)
  - Update all affected materials
  - Have one person track canon
  
### **References**
  - https://warcraft.wiki.gg/wiki/Metzen_on_lore
  - Warcraft Wiki: Retcon page