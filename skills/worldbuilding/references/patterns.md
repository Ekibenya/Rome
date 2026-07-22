# Worldbuilding

## Patterns


---
  #### **Name**
Sanderson's Laws of Magic
  #### **Description**
Design magic systems with clear rules for narrative satisfaction
  #### **When**
Creating any supernatural power system for games or fiction
  #### **Context**
    Brandon Sanderson's Laws govern how magic should function in storytelling:
    
    FIRST LAW: An author's ability to solve conflict with magic is DIRECTLY PROPORTIONAL
    to how well the reader understands said magic.
    - Hard magic (clear rules) = can solve plot problems
    - Soft magic (mysterious) = creates wonder but can't be deus ex machina
    
    SECOND LAW: Limitations > Powers
    - What a character CAN'T do is more interesting than what they can
    - Superman's kryptonite matters more than his strength
    - Constraints create creativity and tension
    
    THIRD LAW: Expand before you add
    - Explore implications of existing magic before adding new abilities
    - Interconnect your powers thematically
    - Streamline - combine similar abilities
    
    ZEROTH LAW: Err on the side of what's AWESOME
    - Rules serve the story, not vice versa
    - If following a rule makes the story worse, question the rule
    
  #### **Example**
    // magic-system-design.yaml
    name: "Soulweaving"
    type: "Hard Magic (for mechanics) / Soft Magic edges (for mystery)"
    
    # FIRST LAW APPLICATION
    reader_understanding:
      core_rules_shown: ["souls power magic", "overuse kills", "line of sight required"]
      mysteries_kept: ["where souls come from", "what happens after death", "the First Weaver"]
      rule: "Protagonist can only solve problems using the shown rules"
    
    # SECOND LAW APPLICATION
    limitations:
      hard_limits:
        - "Cannot create matter, only manipulate existing"
        - "Cannot affect minds directly"
        - "Cannot reverse death"
        - "Range: line of sight only"
        - "Cannot affect iron (grounds magic)"
      soft_limits:
        - "Power scales with training"
        - "Emotional state affects precision"
        - "Fatigue accumulates over hours"
    
      costs:
        primary: "Each spell costs Soul (life essence)"
        secondary: "Overuse causes rapid aging"
        ultimate: "Death if Soul depleted"
        recovery: "Rest regenerates slowly; sacrifice speeds it"
    
    # What makes this INTERESTING (Second Law)
    interesting_constraints:
      - "Iron grounds magic = iron armor is anti-mage but heavy"
      - "Line of sight = fog/darkness are tactical"
      - "Soul cost = old mages are weak but wise, young mages are strong but reckless"
    
    # THIRD LAW APPLICATION
    power_interconnections:
      base_ability: "Manipulate existing material with Soul energy"
      derived_abilities:
        shaping: "Move/reshape physical matter"
        calling: "Intensify elemental forces already present"
        seeing: "Extend senses through Soul resonance"
        binding: "Temporarily join objects/beings"
      NOT_adding: ["time magic", "teleportation", "creation"]
      why: "All abilities derive from 'manipulate existing' - no new paradigms"
    
    # SOCIETAL IMPLICATIONS (what Sanderson calls 'worldbuilding the magic')
    societal_effects:
      economy:
        - "Soul-crafted goods are luxury items (high quality, high cost)"
        - "Regular craftsmen survive on volume, mages on commissions"
        - "Iron industry is critical (anti-magic defense)"
      military:
        - "Mages are elite units, not armies"
        - "Wars are short and devastating"
        - "Iron fortifications are essential"
      politics:
        - "Mage academies hold significant power"
        - "Non-mages resent magical aristocracy"
        - "Iron guilds are politically influential"
      culture:
        - "Short-lived mages value legacy and teaching"
        - "Art and philosophy flourish among mages"
        - "Death is viewed differently (Soul is visible)"
    
    # GAME MECHANICS (if needed)
    game_integration:
      resource: "Soul Points (SP)"
      max_sp: "50 base + 10 per level"
      regeneration: "1 SP/hour rest, 10 SP/full night"
      overcast: "Below 0 SP = HP damage equal to deficit"
      spell_costs:
        minor: 5
        standard: 15
        major: 30
        legendary: 50
    

---
  #### **Name**
The Iceberg Method
  #### **Description**
Create depth through selective revelation, not exhaustive documentation
  #### **When**
Balancing worldbuilding effort against storytelling needs
  #### **Context**
    Hemingway's iceberg theory applied to worldbuilding:
    "If a writer knows enough about what he is writing about, he may omit things
    that he knows. The dignity of movement of an iceberg is due to only one-ninth
    of it being above water."
    
    TOLKIEN APPROACH (full iceberg):
    - Actually build the full history, languages, mythology
    - Works if you have 60 years and love languages
    - Results in unmatched depth
    - Most writers don't have this luxury
    
    SANDERSON APPROACH (iceberg illusion):
    - Build only what you need for your story
    - Add "iceberg tips" - small details that imply depth
    - Get the small details RIGHT so readers assume everything else is right
    - More practical for most projects
    
    THE RULE: Your audience should feel the world is bigger than the story.
    They should NOT feel like they're missing crucial information.
    
  #### **Example**
    // iceberg-implementation.yaml
    story_needs: "Adventure in a single city"
    
    # ABOVE THE WATER (fully developed)
    visible_content:
      the_city:
        name: "Thornwall"
        districts: 5  # fully mapped with NPCs
        government: "Merchant Council"
        conflict: "Guild wars, succession crisis"
        detail_level: "FULL - players explore this"
    
    # WATERLINE (partially developed)
    hinted_content:
      surrounding_region:
        kingdoms: ["Aldris to the north", "Free Cities to the south"]
        detail_level: "SKETCHED - names, attitudes, major facts"
        purpose: "Context for city politics, potential expansion"
    
      history:
        recent: "The Guild Wars (20 years ago) - DETAILED"
        ancient: "The Empire that fell - SKETCHED"
        mythic: "The gods who shaped the world - MENTIONED only"
    
    # BELOW THE WATER (implied but not built)
    implied_content:
      other_continents: "Referenced in trade goods, never visited"
      deep_history: "Monuments exist, meaning unknown"
      cosmic_scale: "Stars have meaning, never explained"
    
    # ICEBERG TIPS (small details that imply depth)
    iceberg_tips:
      - detail: "Merchants curse 'by the Seventh Guild'"
        implies: "There were seven major guilds, history there"
        actually_built: false
        player_asks: "Make it up then, or say 'no one remembers'"
    
      - detail: "Old woman spits when Empire mentioned"
        implies: "Empire did something terrible here"
        actually_built: true  # part of accessible history
    
      - detail: "Coins have unfamiliar faces"
        implies: "Previous rulers, regime change"
        actually_built: false
        player_asks: "Vague answers, lost to time"
    
      - detail: "Festival where people wear masks"
        implies: "Cultural tradition with meaning"
        actually_built: true  # has lore explanation ready
    
    # WHEN PLAYERS DIG DEEPER
    expansion_rules:
      rule_1: "If players investigate, have ONE layer of depth ready"
      rule_2: "Beyond that, 'lost to time' or 'scholars debate' is valid"
      rule_3: "Contradictory sources create authenticity, not confusion"
      rule_4: "Write it down when you invent it, so it stays consistent"
    

---
  #### **Name**
The One Big Lie Principle
  #### **Description**
Accept one major departure from reality, then follow through consistently
  #### **When**
Establishing the foundational premise of a speculative world
  #### **Context**
    In hard science fiction, this is explicit: break physics ONCE, extrapolate everything.
    In fantasy, it's implicit: magic exists, but everything else should make sense.
    
    The principle: Your audience will accept ONE major departure from reality.
    Everything that follows from that departure must be logical and consistent.
    
    EXAMPLES:
    - "Magic exists" (one lie) = must follow through on ALL implications
    - "Faster-than-light travel" (one lie) = must address time dilation, communication, etc.
    - "Dragons are real" (one lie) = ecology, economy, warfare, religion all change
    
    THE TRAP: Adding multiple unrelated "lies" without connecting them.
    Each new element should derive from or connect to the first.
    
  #### **Example**
    // one-big-lie.yaml
    world: "Sunfall"
    
    the_big_lie: "The sun is dying, magic keeps it alive"
    
    # EVERYTHING DERIVES FROM THIS
    direct_implications:
      magic_purpose:
        - "Priests maintain rituals that sustain the sun"
        - "Magic isn't about power - it's about survival"
        - "The greatest mages serve the sun, not themselves"
    
      society:
        - "Theocracy makes sense (priests literally keep everyone alive)"
        - "Heresy is existential treason, not just religious crime"
        - "Resources flow toward sun-maintenance above all"
    
      environment:
        - "Cold is the enemy, not heat"
        - "Light is sacred, darkness is feared"
        - "Seasons are failing - growing seasons shorter"
    
      culture:
        - "Fire worship is universal"
        - "Underground is associated with death/failure"
        - "Dawn celebrations are major holidays"
    
    second_order_implications:
      politics:
        - "Priesthood has absolute power but also absolute responsibility"
        - "Secular rulers exist but defer on sun matters"
        - "Corruption in priesthood = existential crisis"
    
      economy:
        - "Magical resources prioritized for sun rituals"
        - "Agriculture struggles with weakening light"
        - "Trade with 'outer lands' for food"
    
      military:
        - "Wars rare - can't afford to waste magic on killing"
        - "Defense focused, not conquest"
        - "Heretic purges are intense but targeted"
    
    # WHAT I DID NOT ADD
    rejected_additions:
      "alien invasion": "Unrelated to sun theme"
      "vampires": "Cool but doesn't connect to core lie"
      "tech-magic hybrid": "Muddies the theocratic feel"
    
    # INSTEAD I EXPLORED
    exploration_of_core:
      "What if the rituals are fake?": "Great story hook, still about the sun"
      "What if someone can save the sun permanently?": "Explores same theme"
      "What if another group has different sun magic?": "Conflict within theme"
    

---
  #### **Name**
Culture Through Environment
  #### **Description**
Derive cultural traits from geographic and resource constraints
  #### **When**
Creating believable civilizations that feel organic, not arbitrary
  #### **Context**
    N.K. Jemisin's approach: "Character is informed by culture, and culture is
    informed by environment. To understand the character I need to understand
    literally everything about their world."
    
    Real cultures emerge from survival needs:
    - Geography shapes what's possible
    - Climate shapes daily life
    - Resources shape economy
    - Threats shape values and military
    - Neighbors shape identity (often by opposition)
    
    AVOID: Starting with "I want a warrior culture" then picking desert arbitrarily.
    DO: Start with "harsh desert with scarce water" then derive warrior culture logically.
    
  #### **Example**
    // culture-from-environment.yaml
    environment:
      climate: "Volcanic archipelago, frequent eruptions, rich soil"
      resources: ["obsidian", "fertile volcanic soil", "fish", "limited timber"]
      threats: ["eruptions", "tsunamis", "limited land"]
      neighbors: ["mainland empire across the sea"]
    
    derived_culture:
      name: "The Ashborn Isles"
    
      # FROM VOLCANIC SOIL
      agriculture:
        type: "Intensive terrace farming"
        crops: ["heat-resistant grains", "root vegetables"]
        implication: "Food is reliable but land is precious"
    
      # FROM ERUPTIONS
      religion:
        core_belief: "The Fire Mother gives and takes"
        practices: ["appeasement rituals", "volcano reading", "acceptance of death"]
        implication: "Fatalistic but not passive - prepared for disaster"
    
      # FROM LIMITED LAND
      social_structure:
        inheritance: "Strict primogeniture (land can't be divided)"
        second_children: "Join navy, priesthood, or emigrate"
        conflict: "Intense competition for land rights"
    
      # FROM OBSIDIAN
      warfare:
        weapons: "Obsidian-edged clubs, volcanic glass knives"
        armor: "Light (obsidian shatters hard armor anyway)"
        style: "Fast, brutal, decisive"
    
      # FROM LIMITED TIMBER
      architecture:
        primary_material: "Stone, volcanic rock"
        style: "Low, sturdy (earthquake/tsunami resistant)"
        unique: "Homes have elevated 'escape platforms'"
    
      # FROM ISLAND GEOGRAPHY
      naval_tradition:
        strength: "Master sailors and navigators"
        values: "Exploration, trade, raiding when necessary"
        ceremony: "Coming of age requires solo voyage"
    
      # FROM MAINLAND NEIGHBOR
      identity:
        self_image: "Free, fierce, uncorrupted by empire"
        mainland_view: "See empire as decadent, soft, threatening"
        tension: "Trade dependence vs. independence desire"
    
    # UNIQUE CULTURAL ELEMENTS (derived from above)
    unique_elements:
      greeting: "Open palms shown, then touched to ground"
      origin: "Showing you carry no obsidian, acknowledging Fire Mother"
    
      taboo: "Never build higher than the highest escape platform"
      origin: "Tsunami survival pragmatism turned tradition"
    
      celebration: "Night of Embers (spring)"
      practices: ["Controlled fires", "ash-marking of children", "ancestor stories"]
      meaning: "Embracing destruction as part of life cycle"
    
      naming: "[Island]-[Birth condition]-[Name]"
      example: "Kora-stormborn-Ashild (Ashild, born during storm on Kora island)"
    

---
  #### **Name**
Avoiding the Planet of Hats
  #### **Description**
Create internal diversity within cultures to avoid monocultures
  #### **When**
Any culture risks being defined by a single trait
  #### **Context**
    The "Planet of Hats" trope: every member of a species/culture has the same trait.
    "The warrior race," "the merchant people," "the honorable samurai."
    
    WHY IT FAILS:
    - Real cultures have internal diversity
    - Makes NPCs predictable and boring
    - Reduces cultures to stereotypes
    - Players can't find interesting individuals
    
    THE FIX: Every culture needs:
    - 3-4 distinct internal factions or subgroups
    - Ongoing debates and tensions within the culture
    - Individuals who don't fit the mold
    - Historical changes (they weren't always this way)
    - Relationships with other cultures that aren't monolithic
    
    INSPIRATION: Ann Leckie's Ancillary series mocks this - empires THINK
    conquered peoples are monocultural, but they're wrong.
    
  #### **Example**
    // avoiding-monoculture.yaml
    culture: "The Dwarves of Ironhold"
    
    # BAD VERSION
    monoculture_version:
      trait: "All dwarves are miners and smiths"
      personality: "Gruff, stubborn, love gold"
      relationship: "Hate elves, love humans"
      problem: "Every dwarf NPC is the same"
    
    # GOOD VERSION
    diverse_version:
      core_values:
        - "Craftsmanship (but defined broadly - any skilled work)"
        - "Legacy (what you leave behind matters)"
        - "Oaths (promises are sacred)"
    
      internal_factions:
        stone_shapers:
          specialty: "Architecture and stonework"
          values: "Patience, permanence, tradition"
          stereotype_among_dwarves: "Boring, slow, head in the past"
          stereotype_among_outsiders: "The 'real' dwarves"
    
        iron_hearts:
          specialty: "Metalwork and weapons"
          values: "Precision, strength, honor"
          stereotype_among_dwarves: "Aggressive, proud, stuck-up"
          stereotype_among_outsiders: "Warlike, dangerous"
    
        deep_seekers:
          specialty: "Mining and exploration"
          values: "Curiosity, bravery, discovery"
          stereotype_among_dwarves: "Reckless, greedy, short-lived"
          stereotype_among_outsiders: "Adventurous, treasure-hunters"
    
        gold_keepers:
          specialty: "Trade, banking, contracts"
          values: "Fairness, profit, law"
          stereotype_among_dwarves: "Not 'real' dwarves, sellouts"
          stereotype_among_outsiders: "Greedy, cunning"
    
        surface_walkers:
          specialty: "Trade with other races, diplomacy"
          values: "Adaptability, communication, opportunity"
          stereotype_among_dwarves: "Traitors, assimilated"
          stereotype_among_outsiders: "The 'friendly' dwarves"
    
      internal_tensions:
        - "Iron Hearts vs Gold Keepers: 'Making vs counting' debate"
        - "Deep Seekers vs Stone Shapers: 'Explore vs preserve' conflict"
        - "Surface Walkers are distrusted by traditionalists"
        - "Young dwarves questioning the elf feud"
    
      individuals_who_dont_fit:
        - "A dwarf poet, mocked but secretly admired"
        - "A dwarf pacifist, considered insane but tolerated"
        - "A dwarf who loves elven art, keeps it secret"
        - "A dwarf woman who left for the surface, returns as hero"
    
      relationship_complexity:
        with_elves:
          historical: "Betrayal over a shared artifact (both blame the other)"
          official: "Hostile, no formal relations"
          actual: "Secret trade through intermediaries"
          individual: "Some friendships exist, kept hidden"
          generational: "Young dwarves question the feud"
    
        with_humans:
          official: "Allied, trading partners"
          actual: "Condescending on both sides"
          tension: "Dwarven goods undercut human craftsmen"
    
      historical_change:
        past: "Once a surface-dwelling people (3000 years ago)"
        event: "The Burning drove them underground"
        result: "Underground identity is constructed, not inherent"
        relevance: "Surface Walkers are 'returning' not 'leaving'"
    

---
  #### **Name**
History Through Conflict
  #### **Description**
Build history through meaningful conflicts with lasting consequences
  #### **When**
Creating historical timelines that feel dynamic, not static
  #### **Context**
    Static history: "The Empire ruled for 5000 years. Then it fell."
    Dynamic history: "The Empire survived 3 civil wars, 2 plagues, and 4 dynasties
    before the final collapse."
    
    CONFLICT DRIVES CHANGE:
    - Wars reshape borders and power
    - Plagues reshape demographics and beliefs
    - Discoveries reshape economy and worldview
    - Revolutions reshape social order
    
    EVERY CONFLICT NEEDS:
    - Clear stakes (resources, power, survival, identity)
    - Multiple perspectives (no pure good vs evil)
    - Lasting consequences (nothing returns to status quo)
    - Connections (events cause future events)
    
    THE FIVE CONFLICTS TO BUILD A HISTORY:
    1. Founding conflict (how did this society begin?)
    2. Golden age conflict (how did they rise?)
    3. Crisis conflict (how did they nearly fall?)
    4. Transformation conflict (how did they change?)
    5. Current conflict (what tension exists now?)
    
  #### **Example**
    // history-through-conflict.yaml
    nation: "The Aldric Sovereignty"
    
    founding_conflict:
      name: "The Unification Wars"
      era: "Year 0-50"
      parties: ["King Aldric I", "Seven Petty Kingdoms"]
      stakes: "Survival against northern raiders required unity"
      why_both_sides_fought:
        aldric: "Unity or extinction"
        kingdoms: "Independence and tradition"
      resolution: "Aldric won through marriage and battle"
      lasting_consequences:
        - "Seven Provinces still have distinct identities"
        - "Royal house has blood claims to all provinces"
        - "Northern defense remains national obsession"
    
    golden_age_conflict:
      name: "The Southern Expansion"
      era: "Year 200-350"
      parties: ["Aldric Empire", "Southern City-States"]
      stakes: "Trade routes and agricultural land"
      why_both_sides_fought:
        empire: "Economic growth, manifest destiny"
        cities: "Independence, cultural preservation"
      resolution: "Empire absorbed cities but adopted their culture"
      lasting_consequences:
        - "Southern provinces are wealthiest"
        - "Capital moved south"
        - "Northern provinces resent southern influence"
    
    crisis_conflict:
      name: "The Mage Rebellion"
      era: "Year 500-520"
      parties: ["Arcane Council", "Crown and Church"]
      stakes: "Who controls magic users?"
      why_both_sides_fought:
        mages: "Freedom, respect, survival"
        crown: "Control of dangerous power"
        church: "Magic as heresy"
      resolution: "Compromise - regulated academies"
      lasting_consequences:
        - "Magic is legal but controlled"
        - "Mage academies have political power"
        - "Church and mages have uneasy truce"
        - "Rogue mages are outlaws"
    
    transformation_conflict:
      name: "The People's Spring"
      era: "Year 800"
      parties: ["Merchant Class", "Old Nobility"]
      stakes: "Political representation for non-nobles"
      why_both_sides_fought:
        merchants: "Power to match their wealth"
        nobility: "Traditional privileges"
      resolution: "Parliament created alongside monarchy"
      lasting_consequences:
        - "Constitutional monarchy (kind of)"
        - "Nobility diminished but not eliminated"
        - "Merchant class ascendant"
        - "Peasantry still excluded"
    
    current_conflict:
      name: "The Succession Crisis"
      era: "Year 950 (present)"
      parties: ["Three Claimants", "Parliament", "Provinces"]
      stakes: "Who rules? What kind of nation do we become?"
      active_tensions:
        - "Northern province threatens secession"
        - "Mage academies backing different claimants"
        - "Southern merchants want king weak, parliament strong"
        - "Church backing 'legitimate' heir"
      potential_outcomes:
        - "Unified kingdom under strong king"
        - "Federal system with provincial autonomy"
        - "Civil war and fragmentation"
        - "Parliamentary republic"
    
    timeline_connections:
      - "Northern defense obsession (founding) → military culture → resistance to southern influence"
      - "Southern cultural adoption (golden age) → religious tension → mage rebellion conditions"
      - "Mage compromise (crisis) → academies gain power → back claimants now"
      - "Merchant rise (transformation) → parliament power → current succession crisis"
    

---
  #### **Name**
Unreliable Narrator Worldbuilding
  #### **Description**
Use contradictory sources to create authentic-feeling lore
  #### **When**
Wanting depth without definitive answers, Elder Scrolls style
  #### **Context**
    Michael Kirkbride's approach to Elder Scrolls:
    "Writers were purposely contradictory about in-universe information...
    the only info that would come out of Bethesda about the world had
    built-in plausible deniability."
    
    WHY IT WORKS:
    - Real history has contradictions and debates
    - Players fill gaps with imagination
    - No single 'truth' to violate
    - Encourages player theorizing
    
    HOW TO IMPLEMENT:
    - Multiple in-universe sources with different perspectives
    - Clear author biases in each source
    - Some facts universally agreed, others disputed
    - Meta-awareness: characters know sources disagree
    
  #### **Example**
    // unreliable-narrators.yaml
    event: "The Fall of the Eternal Empire"
    
    # WHAT EVERYONE AGREES ON
    undisputed_facts:
      - "The Empire fell in Year 500"
      - "The sun dimmed for a century (the Long Night)"
      - "Millions died"
      - "The Empire never recovered"
    
    # WHAT SOURCES DISAGREE ON
    source_1:
      name: "The Chronicle of Saint Meridia"
      author: "Church historian, 200 years later"
      bias: "Church should have had more power"
      claims:
        - "Emperor's hubris angered the gods"
        - "He tried to ascend to godhood"
        - "Divine punishment was just"
        - "Church tried to warn him"
    
    source_2:
      name: "The Last Emperor's Defense"
      author: "Imperial loyalist, 50 years later"
      bias: "Empire was betrayed"
      claims:
        - "Mage conspiracy caused the sun to dim"
        - "Emperor was trying to stop them"
        - "Church was complicit"
        - "Empire could have been saved"
    
    source_3:
      name: "The People's History"
      author: "Peasant oral tradition"
      bias: "Rulers are always bad"
      claims:
        - "Sun dimmed because of too much magic"
        - "Both Empire and Church were corrupt"
        - "Common people survived by helping each other"
        - "A hero from the people saved a remnant"
    
    source_4:
      name: "Fragments of the Mage Council"
      author: "Destroyed academy records"
      bias: "Mages were victims"
      claims:
        - "Emperor tried to seize magical power"
        - "Mages resisted, causing magical catastrophe"
        - "Both sides were wrong"
        - "The real cause is still unknown"
    
    # WHAT THE WORLD BUILDER KNOWS
    actual_truth: "Deliberately undefined"
    design_intent: |
      Players should be able to construct theories using any combination.
      All sources have some truth. None have complete truth.
      The mystery IS the point.
    
    in_world_effect:
      - "Scholars debate in taverns"
      - "Different regions believe different versions"
      - "The topic is politically charged"
      - "New evidence could shift consensus"
    

---
  #### **Name**
Economic Resource Mapping
  #### **Description**
Design economies around resource scarcity and trade necessity
  #### **When**
Creating believable trade, conflict, and political relationships
  #### **Context**
    "Trade happens when a society has a surplus of one commodity and a shortage
    of another." - Worldbuilding Workshop
    
    FANTASY ECONOMICS OFTEN FAILS BY:
    - Ignoring where gold comes from
    - Trade routes that don't make geographic sense
    - Magic that should make farming obsolete
    - Cities that can't feed themselves
    
    THE FIX: Map resources first, derive everything else.
    
    KEY QUESTIONS:
    - Where does food come from? (80-90% of medieval population = farmers)
    - Where are metals? (determines weapons, coins, industry)
    - What is scarce? (scarcity drives trade and conflict)
    - What unique resources exist? (competitive advantage)
    - How does magic affect supply/demand?
    
  #### **Example**
    // economic-resource-mapping.yaml
    region: "The Three Kingdoms"
    
    # STEP 1: MAP RESOURCES
    resource_distribution:
      kingdom_aldris:
        abundant: ["timber", "furs", "iron ore"]
        scarce: ["grain", "luxury goods", "salt"]
        unique: ["coldwood (magic-resistant timber)"]
    
      kingdom_solara:
        abundant: ["grain", "wine", "olives"]
        scarce: ["timber", "metals", "wool"]
        unique: ["sunstone (magical light source)"]
    
      free_cities:
        abundant: ["fish", "salt", "banking services"]
        scarce: ["everything else"]
        unique: ["strategic position (control all sea trade)"]
    
    # STEP 2: DERIVE TRADE
    trade_routes:
      aldris_to_solara:
        aldris_exports: ["timber", "iron", "furs"]
        solara_exports: ["grain", "wine", "cloth"]
        route: "Mountain pass (dangerous, seasonal)"
        control: "Contested - both want it"
    
      everyone_to_cities:
        cities_role: "Middlemen for all trade"
        cities_export: ["salt", "fish", "luxury imports from overseas"]
        cities_leverage: "Control sea routes"
        resentment: "Both kingdoms resent the markup"
    
    # STEP 3: DERIVE CONFLICT
    resource_conflicts:
      the_iron_pass:
        what: "Only viable land route between Aldris and Solara"
        who_wants_it: "Both kingdoms, plus Free Cities want it closed"
        current_status: "Aldris controls, Solara contests"
        story_hooks:
          - "Bandit hired by Cities to disrupt trade"
          - "Solaran attempt to build alternate route"
          - "Aldris raising tariffs"
    
      the_sunstone_monopoly:
        what: "Sunstone only found in Solara"
        who_wants_it: "Everyone needs magical light"
        solara_advantage: "Massive trade leverage"
        story_hooks:
          - "Aldris mages trying to synthesize sunstone"
          - "Smuggling operations"
          - "Sunstone priests as political faction"
    
    # STEP 4: DERIVE POLITICAL RELATIONS
    relationships_from_economy:
      aldris_solara: "Rivals who need each other"
      aldris_cities: "Resentful trade partners"
      solara_cities: "Closer relations (cities don't threaten Solara's land)"
    
    # STEP 5: MAGIC IMPACT
    magic_on_economy:
      teleportation:
        status: "Exists but rare and expensive"
        impact: "High-value goods only"
        implication: "Normal trade still dominant"
    
      creation_magic:
        status: "Prohibited by treaty after Mage Wars"
        impact: "Could destroy economy if unleashed"
        implication: "Strong incentive for all parties to enforce ban"
    
      sunstone:
        status: "Magical resource"
        impact: "Creates Solaran monopoly power"
        implication: "Magic doesn't just do things - it becomes thing to trade"
    

---
  #### **Name**
Religion Design Through Needs
  #### **Description**
Create religions that serve psychological and social needs
  #### **When**
Building believable faith systems that people would actually follow
  #### **Context**
    Real religions emerge to answer needs:
    - Existential (Why are we here? What happens after death?)
    - Moral (What should we do? What is right?)
    - Social (Who are we? Who belongs?)
    - Practical (How do we ensure good harvests, victory, health?)
    
    AVOID: Religions that exist as "fantasy Christianity with different names"
    DO: Religions that emerge from THIS world's specific conditions
    
    KEY QUESTIONS:
    - What do people fear most here? (Death, chaos, outsiders, nature?)
    - What do they hope for? (Afterlife, justice, prosperity, freedom?)
    - Who has power over interpretation? (Priests, kings, everyone?)
    - Are gods real and visible, or matters of faith?
    
  #### **Example**
    // religion-from-needs.yaml
    culture: "The Ashborn Isles (volcanic archipelago)"
    
    environmental_realities:
      - "Volcanoes erupt unpredictably"
      - "Land is fertile but dangerous"
      - "Death can come without warning"
      - "Survival requires community cooperation"
    
    psychological_needs:
      existential:
        fear: "Arbitrary death from eruption"
        need: "Meaning in unpredictable death"
        religious_answer: "Death is return to the Fire Mother's embrace"
    
      moral:
        dilemma: "How much risk to take for prosperity?"
        need: "Guidelines for balancing safety and growth"
        religious_answer: "The Fire Mother rewards those who dare wisely"
    
      social:
        challenge: "Maintaining order under constant threat"
        need: "Strong community bonds, clear hierarchy"
        religious_answer: "The Fire Mother's children must aid each other"
    
      practical:
        fear: "When will next eruption happen?"
        need: "Prediction, or at least illusion of control"
        religious_answer: "Priests read the mountain's signs"
    
    resulting_religion:
      name: "The Way of the Fire Mother"
    
      core_beliefs:
        - "The Fire Mother is the volcano itself"
        - "She creates (fertile land) and destroys (eruptions)"
        - "Both creation and destruction are sacred"
        - "The good die into her embrace; the wicked are denied rest"
    
      afterlife:
        good_death: "Soul joins the Fire Mother, becomes part of new creation"
        bad_death: "Soul wanders as cold ghost, never warm, never resting"
    
      priesthood:
        role: "Read signs, interpret the Mother's will"
        selection: "Those who survive near-death by volcano"
        power: "Significant - can declare evacuations"
        limitation: "Failed predictions are fatal to career (and sometimes life)"
    
      practices:
        daily: "Brief prayer at dawn (thanking Mother for another day)"
        weekly: "Community meal where best food offered to fire"
        seasonal: "Major festivals around planting and harvest"
        crisis: "Sacrifices (goods, occasionally human historically) during eruption warnings"
    
      unique_elements:
        death_acceptance: "Funerals are celebrations, not mourning"
        fire_walking: "Coming-of-age ritual, tests faith"
        ash_marking: "Wearing volcano ash as blessing/protection"
        cold_taboo: "Insulting to wish someone 'stay cool' or similar"
    
      moral_code:
        virtues: ["Bravery", "Generosity", "Acceptance"]
        vices: ["Cowardice", "Hoarding", "Denial of death"]
        interesting_gray: "Is fleeing an eruption cowardice or wisdom? Priests decide."
    
      relationship_to_power:
        with_chiefs: "Chiefs rule the living; priests speak for the Mother"
        tension: "Chiefs need priests to legitimize; priests need chiefs to enforce"
        resolution: "Intermarriage, shared power, occasional conflict"
    
    contrast_with_mainland:
      mainland_religion: "Sky Father worship (distant, orderly, predictable)"
      ashborn_view: "Sky Father is cold and distant. Fire Mother is present."
      mainland_view: "Fire Mother worship is death cult, barbaric"
      actual_function: "Both religions solve their cultures' specific problems"
    

---
  #### **Name**
Collaborative Worldbuilding
  #### **Description**
Use structured methods for group world creation
  #### **When**
Building worlds with players, co-writers, or development teams
  #### **Context**
    Microscope RPG by Ben Robbins revolutionized collaborative worldbuilding:
    "You won't play the game in chronological order. You can defy the limits
    of time and space, jumping backward or forward to explore the parts of
    the history that interest you."
    
    WHY COLLABORATIVE WORKS:
    - Multiple perspectives prevent blind spots
    - Player investment when they helped create
    - Surprises for everyone (including the GM/author)
    - Faster coverage of more ground
    
    METHODS:
    - Microscope: Fractal history (periods → events → scenes)
    - Kingdom: Focus on one community at a crisis point
    - Two-Layer Rule: Combine two traits for instant complexity
    
  #### **Example**
    // collaborative-worldbuilding.yaml
    method: "Microscope Adaptation for Game Worlds"
    
    setup:
      participants: "GM + 4 players"
      session_time: "2-3 hours"
      goal: "Create shared history for campaign"
    
    step_1_big_picture:
      name: "The Palette"
      process:
        - "Each person adds 1-2 things they WANT to see"
        - "Each person adds 1-2 things they DON'T want to see"
      example:
        want:
          - "Magic with real costs"
          - "Morally gray factions"
          - "Mysterious ancient ruins"
        dont_want:
          - "Pure good vs evil"
          - "Chosen one narratives"
          - "Comedy/parody tone"
    
    step_2_bookends:
      name: "Start and End"
      process:
        - "Group agrees on starting period (oldest history)"
        - "Group agrees on ending period (current era)"
      example:
        start: "The Dawn - First peoples settle the land"
        end: "The Succession - Three claimants vie for empty throne"
    
    step_3_periods:
      name: "Fill the History"
      process:
        - "Take turns adding Periods (eras of history)"
        - "Each Period marked Light (good times) or Dark (bad times)"
        - "No discussion needed - person's word is final"
      example:
        periods:
          - "The Dawn (Light) - Peaceful settlement"
          - "The First Kingdom (Light) - Unity and prosperity"
          - "The Mage Wars (Dark) - Magic destroys half the land"
          - "The Healing (Light) - Slow recovery"
          - "The New Order (Dark) - Authoritarian response to chaos"
          - "The Succession (Dark) - Current crisis"
    
    step_4_events:
      name: "Key Moments"
      process:
        - "Take turns adding Events within Periods"
        - "Events are specific moments, not eras"
        - "Can add to any Period, not just your own"
      example:
        in_mage_wars:
          - "The Sundering - continent physically torn"
          - "Death of the Archmage - ended the war"
          - "The Burning of Thornwall - city destroyed"
    
    step_5_scenes:
      name: "Roleplay Moments"
      process:
        - "Pick an Event to explore"
        - "Frame a question (What did the Archmage's final words reveal?)"
        - "Roleplay the scene to answer it"
        - "Answer becomes canon"
      example:
        question: "Why did the Archmage die?"
        scene: "His final confrontation"
        answer_discovered: "He sacrificed himself to seal a rift. But it's failing now."
    
    integration_with_campaign:
      gm_role: "Fill in details between sessions, consistent with established facts"
      player_role: "Characters can discover or be connected to established history"
      ongoing: "Can continue adding to history as campaign reveals more"
    
    alternative_quick_method:
      name: "Two-Trait Combination"
      process:
        - "Each player picks 2 random cultural traits"
        - "Combine them to create a faction"
        - "Explain how they interact"
      example:
        traits: ["Scholar" + "Pirate"]
        result: "The Archive Fleet - pirates who steal and preserve forbidden books"
        interaction: "Academic rigour applied to piracy; ships are floating libraries"
    

---
  #### **Name**
Naming Language System
  #### **Description**
Create consistent, pronounceable names using basic conlang principles
  #### **When**
Names across a culture feel random or inconsistent
  #### **Context**
    A naming language is "Conlangs Lite" - you don't need grammar or complete
    vocabulary. You just need consistent sounds.
    
    BENEFITS:
    - Names feel like they belong together
    - Different cultures sound different
    - Readers can guess which culture someone is from
    - You can generate new names that fit
    
    THE MINIMUM VIABLE NAMING LANGUAGE:
    1. Phoneme inventory (what sounds exist)
    2. Phonotactics (how sounds combine)
    3. Structure rules (syllable patterns)
    4. Romanization (how to write them)
    
  #### **Example**
    // naming-language.yaml
    culture: "The Northern Clans"
    
    # PHONEME INVENTORY (what sounds exist in this language)
    phonemes:
      consonants:
        stops: ["k", "g", "t", "d", "b"]
        fricatives: ["f", "v", "s", "h"]
        clusters: ["sk", "gr", "br", "th", "fr", "kr"]
      vowels:
        short: ["a", "o", "u", "e", "i"]
        long: ["aa", "oo"]
        combinations: ["ae", "ei", "au"]
    
    # WHAT SOUNDS DON'T EXIST
    excluded_sounds:
      - "soft sounds like 'sh', 'ch', 'j'"
      - "long vowel combinations like 'aia'"
      - "double consonants like 'tt' (except 'kk')"
    why: "Want harsh, cold feel"
    
    # SYLLABLE STRUCTURE
    phonotactics:
      allowed_structures:
        - "CV (ka, to, si)"
        - "CVC (kor, thal, brun)"
        - "CCV (ska, gro, frei)"
        - "CCVC (skald, thron, grind)"
      word_patterns:
        short_words: "1-2 syllables for common names"
        long_words: "3 syllables maximum for places"
    
    # NAME STRUCTURES
    naming_patterns:
      person_names:
        structure: "[Root]-[Suffix]"
        male_suffixes: ["-rik", "-mund", "-ar", "-orn"]
        female_suffixes: ["-a", "-hild", "-run", "-dis"]
        examples:
          male: ["Thorik", "Baemund", "Skaldar", "Grimmorn"]
          female: ["Freia", "Brunhild", "-run", "Valdis"]
    
      place_names:
        structure: "[Descriptor]-[Type]"
        descriptors: ["Frost", "Grey", "Storm", "Iron", "Old"]
        types: ["-heim", "-gard", "-fell", "-mark", "-hold"]
        examples: ["Frostheim", "Greygard", "Stormfell", "Ironmark", "Oldhold"]
    
      clan_names:
        structure: "[Animal/Object]-[Action]"
        examples: ["Wolfborn", "Stonefist", "Stormrider", "Ironheart"]
    
    # PRONUNCIATION GUIDE
    romanization:
      "ae": "long 'a' as in 'day'"
      "ei": "'eye'"
      "au": "'ow' as in 'now'"
      "th": "like 'thin', not 'the'"
      "j": "DOESN'T EXIST - don't use it"
    
    # CONTRAST WITH OTHER CULTURES
    comparison:
      northern_clans: "Harsh consonants, short words (Thorik, Skald, Grimm)"
      southern_empire: "Flowing sounds, longer words (Valerian, Aelindra, Sevanis)"
      eastern_tribes: "Meaning-compounds (Storm-born, River-walker)"
    
    # GENERATION PROCESS
    how_to_create_new_names:
      step_1: "Pick allowed syllables: Brae-"
      step_2: "Add from patterns: Brae- + -mund"
      step_3: "Check pronounceability: Braemund - works!"
      step_4: "Check for duplicates or awkward meanings"
      step_5: "Document it so you don't reuse"
    

## Anti-Patterns


---
  #### **Name**
Worldbuilder's Disease
  #### **Description**
Endlessly worldbuilding instead of actually creating the story/game
  #### **Wrong**
    Spending 6 months on a calendar system for a game where time doesn't matter.
    Writing 50,000 words of lore before writing a single scene.
    Perfecting a magic system that no character uses.
    Creating 100 cultures when the story visits 3 locations.
    
  #### **Right**
    Build what you need for the next chapter/session.
    Use iceberg tips to imply depth without building it.
    Set deadlines and stop worldbuilding when reached.
    Ask: "Does my story/game need this?" If not, don't build it yet.
    

---
  #### **Name**
Fantasy Counterpart Culture
  #### **Description**
Taking a real culture and just adding fantasy names
  #### **Wrong**
    "The Desert People" who are just Arabs with different names.
    "The Honor-Bound Warriors" who are just Japan with swords.
    "The Noble Savages" who are just Indigenous stereotypes.
    
  #### **Right**
    Start from environment, not from Earth culture.
    Mix influences from multiple cultures.
    Add elements that couldn't exist on Earth.
    Ask: "What would be different given THIS world's specific history?"
    Research respectfully if inspired by real cultures.
    

---
  #### **Name**
Info Dumping
  #### **Description**
Front-loading all the lore instead of revealing through experience
  #### **Wrong**
    Opening chapter: "1000 years ago, the first king..."
    NPC dialogue: "As you know, our people have a tradition of..."
    Codex entry before the player even cares.
    
  #### **Right**
    Reveal through environment: worn statues, old monuments
    Reveal through character: "Grandmother always said..."
    Reveal through conflict: "They hate us because 100 years ago..."
    Wait for players to ask, then have answers ready.
    

---
  #### **Name**
Unexplored Implications
  #### **Description**
Adding cool elements without following through on consequences
  #### **Wrong**
    Healing magic exists, but hospitals still function as normal.
    Teleportation exists, but trade routes matter.
    Dragons exist, but warfare is still infantry-based.
    Immortal elves exist, but their culture matches 80-year-lifespan humans.
    
  #### **Right**
    For every magical/technological element, ask:
    - How does this change warfare?
    - How does this change economy?
    - How does this change social structure?
    - What new problems does it create?
    - Who benefits? Who loses?
    

---
  #### **Name**
Monolithic Relationships
  #### **Description**
All members of culture A feel the same about culture B
  #### **Wrong**
    All dwarves hate all elves.
    All humans fear all magic.
    All nobles are corrupt.
    
  #### **Right**
    Factions within cultures have different views.
    Individuals can defy cultural norms.
    Relationships evolve over time.
    Official positions differ from personal ones.
    Trade continues even during wars.
    