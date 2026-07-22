# Narrative Design

## Patterns


---
  #### **Name**
The "And Therefore" Test
  #### **Description**
Validate plot causality instead of sequential events
  #### **When**
Reviewing any narrative sequence or quest chain
  #### **Example**
    THE TEST:
    Replace every "and then" with "and therefore" or "but."
    
    BAD (sequential, not causal):
    "The village was attacked, and then you find a survivor,
     and then you go to the castle, and then you fight the boss."
    
    GOOD (causal chain):
    "The village was attacked, THEREFORE you seek survivors.
     BUT you find only one, THEREFORE they become crucial.
     They reveal the castle location, THEREFORE you assault it.
     BUT the boss expects you, THEREFORE you must improvise."
    
    Every scene should be:
    1. Caused by previous events (THEREFORE)
    2. OR subverted by complications (BUT)
    3. NEVER just "next in sequence" (AND THEN)
    
    APPLICATION TO QUESTS:
    - Quest objectives should chain causally
    - Player should understand WHY each step
    - Complications should arise from consequences
    - Not: "Get 5 wolf pelts" (arbitrary)
    - But: "Wolves ate the map we need, track their den" (causal)
    

---
  #### **Name**
Environmental Storytelling Through Props
  #### **Description**
Tell stories through object placement, not text
  #### **When**
Designing narrative spaces players explore
  #### **Example**
    ENVIRONMENTAL NARRATIVE LAYERS:
    
    LEVEL 1: IMMEDIATE (what happened here?)
    - Overturned chair suggests struggle
    - Half-eaten meal suggests interruption
    - Open window suggests escape route
    - Bloodstain trajectory tells the story
    
    LEVEL 2: ACCUMULATED (what was life like here?)
    - Personal items reveal character
    - Wear patterns show routine
    - Photos and letters provide context
    - Objects out of place create mystery
    
    LEVEL 3: HIDDEN (what's the deeper truth?)
    - Secret rooms with different story
    - Contradictions in the evidence
    - Items that only make sense later
    - Reward for thorough exploration
    
    THE "THREE OBJECT RULE":
    Any environmental story needs at least 3 objects that:
    - Suggest the same narrative independently
    - Create redundancy for players who miss one
    - Provide the satisfaction of "I pieced this together"
    
    EXAMPLE (Dead NPC Scene):
    Object 1: Letter from lover mentioning "the hiding place"
    Object 2: Wall safe hidden behind painting
    Object 3: Jewelry scattered (panicked packing)
    STORY: Someone warned them, they tried to grab valuables and flee
    
    NEVER: Put explicit journal entry explaining everything
    ALWAYS: Let player be detective
    

---
  #### **Name**
Dialogue Tree Pruning
  #### **Description**
Design dialogue systems that feel natural, not exhaustive
  #### **When**
Building conversation systems
  #### **Example**
    THE PROBLEM:
    Players trained to exhaust every option.
    This creates unnatural conversations.
    
    PRUNING STRATEGIES:
    
    1. MUTUAL EXCLUSIVITY
       - Some options lock out others
       - Aggressive stance removes friendly options
       - Forces commitment to approach
    
       [FRIENDLY] "I need your help..."
          -> Locks out [THREATENING]
       [THREATENING] "You WILL help me..."
          -> Locks out [FRIENDLY]
    
    2. TOPIC DECAY
       - Returning to old topics yields less
       - "We've discussed this."
       - Encourages moving forward
    
    3. RELATIONSHIP GATES
       - Some options only with trust/fear/respect
       - Organically limits choices
       - Creates replay value
    
    4. TIME/CONTEXT PRESSURE
       - Some dialogues have urgency
       - Can't ask 40 questions when building burns
       - Forces meaningful selection
    
    5. MEMORY AND CONSEQUENCES
       - NPCs remember what you asked
       - "You already asked about the king."
       - Trains players that conversation persists
    
    DISCO ELYSIUM APPROACH:
    - Skills are characters that interject
    - Options require stat checks
    - Failure states are narratively interesting
    - No "wrong" choice, just different story
    

---
  #### **Name**
Bark System Architecture
  #### **Description**
Design barks that feel responsive without being repetitive
  #### **When**
Creating ambient NPC dialogue or character callouts
  #### **Example**
    BARK CATEGORIES:
    
    1. COMBAT BARKS (high repetition risk)
       - Idle (waiting for combat)
       - Alert (enemy spotted)
       - Engaging (in combat)
       - Hit (taking damage)
       - Kill (enemy defeated)
       - Low health (warning player)
       - Critical (near death)
       - Death (final line)
       - Victory (combat over)
    
       MINIMUM VARIANTS: 8-12 per category
       More for high-frequency categories
    
    2. EXPLORATION BARKS (medium repetition)
       - Location specific ("This place...")
       - Object specific ("Look at this...")
       - Environmental reaction (cold, dark, etc.)
       - Lore triggers (history of place)
    
       MINIMUM VARIANTS: 4-6 per trigger
    
    3. RELATIONSHIP BARKS (low repetition)
       - Companion idle chatter
       - Relationship-specific reactions
       - Story-state dependent
    
       These can be fewer but more specific
    
    PERCEIVED RANDOMNESS MATH:
    - True random with 10 options: players notice repeats
    - Weight down recently played: "shuffle" algorithm
    - Context awareness: don't repeat topic, vary emotion
    
    IMPLEMENTATION:
    ```
    bark_pool:
      - id: combat_hit_01
        priority: 1
        cooldown: 30s  # Can't play for 30 seconds
        conditions:
          - health > 50%
        text: "Just a scratch!"
    
      - id: combat_hit_02
        priority: 1
        cooldown: 30s
        conditions:
          - health <= 50%
        text: "That one hurt!"
    ```
    
    KEY INSIGHT (Hades):
    Context-specific barks feel intentional.
    "Oh, it's THIS room again" when entering familiar area
    feels written for you, even if triggered by simple logic.
    

---
  #### **Name**
Lore Delivery Without Info Dumps
  #### **Description**
Distribute world information through gameplay, not exposition
  #### **When**
Players need to understand complex world history or systems
  #### **Example**
    LORE DELIVERY SPECTRUM:
    
    PASSIVE (background, skippable):
    - Environmental details (posters, architecture)
    - Overheard NPC conversations
    - Item descriptions (Dark Souls approach)
    - Codex entries (ONLY for seekers)
    
    ACTIVE (integrated into play):
    - Dialogue that reveals through conversation
    - Quests that uncover history
    - Mechanics that embody lore
    
    EMERGENT (player discovers meaning):
    - Connecting separate clues
    - Aha moments from exploration
    - Community-shared discoveries
    
    THE 10% RULE:
    Only 10% of your lore should be explicit.
    90% should be implied, suggested, environmental.
    
    BAD: NPC monologues about history
    "Let me tell you about the War of Three Kings
     which happened 200 years ago when..."
    
    GOOD: History visible in present
    - Statues of three kings, one defaced
    - Old battlefields now farmland
    - Songs that reference the war
    - Item: "King's Seal (broken in three)"
    
    DARK SOULS MASTERY:
    - Item descriptions are lore fragments
    - Environment tells the story of fall
    - NPCs give pieces, never whole picture
    - Community assembled the history
    - VaatiVidya has a career explaining it
    
    PLAYER MOTIVATION:
    - Lore is reward for explorers
    - Don't force it on those who don't care
    - Make seeking it out pleasurable
    - Hidden areas should have hidden history
    

---
  #### **Name**
Player Agency Spectrum
  #### **Description**
Match agency level to narrative moment importance
  #### **When**
Designing any player interaction with story
  #### **Example**
    AGENCY LEVELS (low to high):
    
    1. WITNESS (no agency)
       - Cutscene plays, player watches
       - Appropriate for: Climactic moments earned
       - DANGER: Overuse feels like movie
    
    2. NAVIGATION (spatial agency)
       - Player controls camera/movement
       - Story happens around them
       - "Walk and talk" sequences
       - Appropriate for: Exposition, transitions
    
    3. TIMING (pacing agency)
       - Player triggers next beat
       - "Press to continue" but narratively
       - Appropriate for: Emotional beats
    
    4. EXPRESSION (cosmetic agency)
       - Multiple ways to say same thing
       - Outcome identical, tone differs
       - Players FEEL choice exists
       - Appropriate for: Low-stakes dialogue
    
    5. TACTICAL (local agency)
       - Choice affects immediate scene
       - Save NPC A or B (both die eventually)
       - Real stakes but contained
       - Appropriate for: Building tension
    
    6. STRATEGIC (global agency)
       - Choice affects world state
       - True branching, different outcomes
       - Most expensive to implement
       - Appropriate for: Key decision points
    
    RULE: Escalate agency at key moments.
    
    BAD: Boss speech as unskippable cutscene (level 1)
         after player fought hard to get there
    
    GOOD: Boss speech as combat-integrated dialogue
          Player can interrupt, attack, or listen
          All paths valid, all paths different
    

---
  #### **Name**
Cinematic Direction for Player Agency
  #### **Description**
Design cutscenes that maintain player presence
  #### **When**
Creating any non-interactive narrative sequence
  #### **Example**
    THE PROBLEM:
    Cutscenes remove control.
    Players resent losing agency they just had.
    
    MITIGATION STRATEGIES:
    
    1. MAINTAIN AVATAR CONSISTENCY
       - Player character looks/behaves like in gameplay
       - Don't give them actions player wouldn't choose
       - Clothes, equipment should match
       - Position should be plausible from gameplay
    
    2. DURATION MATCHING
       - Cutscene length proportional to player investment
       - 10 hours of gameplay earns 3-minute scene
       - Never frontload long cinematics
       - After tutorial boss: 30 seconds max
       - After final boss: as long as story needs
    
    3. IN-ENGINE OVER PRE-RENDERED
       - Player sees THEIR avatar
       - Consistent visual language
       - Can often integrate small interactions
    
    4. INTERRUPTIBILITY
       - Skip option (even if warned about missing content)
       - Pause option (players have lives)
       - Speed up option (replays)
    
    5. AGENCY INSERTION POINTS
       - Quick-time prompts (used sparingly)
       - Dialogue choices mid-scene
       - Camera control during slow moments
       - Interactive moments (press to open door)
    
    HADES APPROACH:
    - Death is cutscene, but player expected it
    - Dialogue during gameplay, not stopping it
    - Story reveals between runs, not interrupting
    - Player-initiated conversations
    
    RULE: The more you take control,
          the more you owe the player when you return it.
    

---
  #### **Name**
Writing for Voice Acting
  #### **Description**
Craft dialogue that actors can perform naturally
  #### **When**
Writing any dialogue that will be voiced
  #### **Example**
    READING VS SPEAKING:
    
    Text is written for eyes.
    Dialogue is written for mouths.
    
    SPOKEN DIALOGUE RULES:
    
    1. CONTRACTIONS ALWAYS
       "Do not" -> "Don't"
       "I am" -> "I'm"
       "They are" -> "They're"
       (Unless character is deliberately formal)
    
    2. SHORT SENTENCES
       Written: "I need to find the crystal before the
                moon rises, which means we have to leave
                immediately if we want any chance of success."
       Spoken: "Crystal. Before moonrise. We leave now."
    
    3. BREATH BREAKS
       - Actors need to breathe
       - Long sentences need commas
       - Or natural pause points
       - "and" is often a breath point
    
    4. MOUTH FEEL
       Say your lines out loud.
       "Rural rural rural" - hard to say
       "Specific specificity" - tongue twister
       Rewrite anything you stumble on.
    
    5. EMOTIONAL CLARITY
       Voice actor needs to know:
       - What emotion this line carries
       - What happened before
       - What they're trying to achieve
       - Subtext (what they're NOT saying)
    
       Include direction: (BITTER) "Fine. Go."
                          (HIDING FEAR) "I'm not scared."
    
    6. ALT TAKES
       Write multiple versions:
       - Intense version
       - Casual version
       - Interrupted version (trails off)
       Actors can choose what works
    
    LOCALIZATION CONSIDERATION:
    - English contractions don't translate
    - Puns and wordplay often lost
    - Leave room for longer translations (German!)
    - Separate emotional beats for easier localization
    

---
  #### **Name**
Procedural Narrative Systems
  #### **Description**
Design systems that generate narrative emergence
  #### **When**
Building games where story emerges from systems
  #### **Example**
    PROCEDURAL NARRATIVE TYPES:
    
    1. EMERGENT STORIES (Dwarf Fortress)
       - No authored narrative
       - Systems interact to create events
       - Players construct meaning
       - Every playthrough unique
    
    2. SYSTEMIC WRAPPER (Hades)
       - Authored story exists
       - Systems determine delivery timing
       - Death enables progression
       - Relationship states gate content
    
    3. MODULAR NARRATIVE (Rimworld)
       - Story "incidents" are modules
       - AI storyteller selects and sequences
       - Human-authored pieces, machine-assembled
    
    BUILDING EMERGENT NARRATIVE:
    
    Key components:
    - AGENTS with goals and relationships
    - EVENTS that change world state
    - MEMORY that persists consequences
    - EXPRESSION that communicates to player
    
    EXAMPLE SYSTEM:
    ```
    NPCAgent:
      - has needs (food, safety, belonging)
      - has relationships (trust, fear, debt)
      - has memory (who helped, who hurt)
      - takes actions toward goals
      - reacts to player actions
    
    When player steals from NPC:
      -> NPC.relationship.trust -= major
      -> NPC.memory.add("player_stole", item)
      -> If trust < threshold:
         NPC.behavior = hostile
      -> If NPC.has_allies:
         NPC.tell_allies("player_stole")
         Allies.relationship.trust -= minor
    ```
    
    The story "player became village pariah after theft"
    was never written. It emerged from systems.
    
    CRITICAL INSIGHT:
    Players own emergent stories.
    "I did this" not "The game showed me this."
    
    But emergent stories need EXPRESSION:
    - Visible consequences
    - NPC dialogue reflecting state
    - World changes player can observe
    - Without expression, emergence is invisible
    

---
  #### **Name**
The Unreliable Narrator Scaffold
  #### **Description**
Deploy unreliable narration without losing the player
  #### **When**
Using narrative deception as a mechanic or theme
  #### **Example**
    THE RISK:
    - 40%+ of players miss subtle unreliability
    - They feel lied to, not cleverly misdirected
    - Trust in narrative breaks permanently
    
    THE SCAFFOLD:
    
    1. PLANT SEEDS EARLY
       - First unreliability in low-stakes moment
       - Player learns narrator can be wrong
       - Explicit contradiction they notice
    
       Example (Disco Elysium):
       Your skills give conflicting advice.
       You learn early: internal voices lie.
    
    2. CONTRADICTION ESCALATION
       - Start with small discrepancies
       - Build to larger ones
       - Player trained to question
    
    3. MULTIPLE SOURCES
       - Other characters contradict narrator
       - Environment contradicts narrator
       - Player experience contradicts narrator
       - Triangulation reveals truth
    
    4. THE REVEAL MOMENT
       - Make unreliability explicit at some point
       - For some players, confirm what they suspected
       - For others, recontextualize everything
       - Replayability: "I need to see this again"
    
    5. MOTIVATED UNRELIABILITY
       - WHY is narrator unreliable?
       - Trauma distorting memory
       - Deliberate deception
       - Limited perspective
       - The reason matters for theme
    
    EXAMPLE GAMES:
    - Disco Elysium: You're an amnesiac drunk
    - Spec Ops: The Line: Trauma distortion
    - Brothers: A Tale of Two Sons: Grief
    - What Remains of Edith Finch: Family mythology
    
    IMPLEMENTATION:
    Early: "You defeated 100 enemies in the battle."
    Player: (I only fought 10... weird)
    Later: Character says "You always exaggerate."
    Player: (Oh! The narrator isn't reliable!)
    Climax: "You saved everyone."
    Player: (Wait... did I? Need to investigate)
    

---
  #### **Name**
Moral Choice Weight System
  #### **Description**
Create choices that actually feel weighty
  #### **When**
Designing player decisions with ethical dimensions
  #### **Example**
    WHY MORAL CHOICES FAIL:
    - One option is obviously "right"
    - No real cost to either choice
    - Consequences too distant to feel
    - Framing reveals designer's preference
    
    WEIGHT FACTORS:
    
    1. MECHANICAL COST
       - Good choice has gameplay penalty
       - Save the hostage, lose the loot
       - Mercy has tactical disadvantage
       - Makes "right" choice meaningful
    
    2. RELATIONSHIP COST
       - Choice affects NPC relationships
       - Can't please everyone
       - Someone you care about disapproves
       - No "everyone loves you" option
    
    3. UNCERTAINTY
       - Can't know full consequences
       - Real moral choices are uncertain
       - Don't telegraph which is "right"
       - Let players live with uncertainty
    
    4. TIME PRESSURE
       - Limit deliberation time
       - Gut response reveals values
       - Can't optimize, must choose
       - Forces authentic decision
    
    5. IDENTITY IMPLICATIONS
       - "What kind of person am I?"
       - Choice defines player's version of character
       - Consequences reflect back: "You chose..."
       - Ownership of the decision
    
    WITCHER 3 APPROACH:
    - No clear good option
    - Consequences delayed and unexpected
    - What seemed right has terrible results
    - What seemed wrong has silver lining
    - Player must live with choice
    
    THE TROLLEY PROBLEM IS BORING:
    Everyone knows the "right" answer.
    Better: trolley problem where you KNOW one person,
    and there's something suspicious about the five.
    Now it's interesting.
    

---
  #### **Name**
Quest Objective Design
  #### **Description**
Write objectives that serve narrative AND gameplay
  #### **When**
Designing quest structure and objective text
  #### **Example**
    OBJECTIVE TYPES:
    
    1. NARRATIVE OBJECTIVE (what story needs)
       "Discover why the village was abandoned"
       - Open-ended
       - Multiple valid approaches
       - Player is detective
       - Discovery is reward
    
    2. GAME OBJECTIVE (what player does)
       "Search 3 buildings for clues"
       - Specific
       - Measurable
       - Clear completion state
       - Can feel gamey
    
    BALANCE BOTH:
    Primary: "Discover why the village was abandoned"
    Sub-objectives:
     - "Search the tavern"
     - "Search the church"
     - "Search the mayor's house"
    Completion: "Clues found (3/3) - What happened here?"
    
    OBJECTIVE WRITING RULES:
    
    1. VERB FIRST
       "Find the artifact" not "The artifact must be found"
       Active, not passive
    
    2. CONTEXT IN OBJECTIVE
       "Find the artifact BEFORE Malachar does"
       Stakes embedded, not separate
    
    3. AVOID "GO TO" OBJECTIVES
       "Go to the castle" - tells player nothing about why
       "Confront the king about the theft" - has purpose
    
    4. HIDDEN OBJECTIVES
       Some goals don't appear in log until discovered
       Rewards exploration and attention
       "You discovered a hidden cellar..."
    
    5. EVOLVING OBJECTIVES
       Start: "Help the merchant"
       After discovery: "The merchant is a smuggler"
       Now: "Decide the merchant's fate"
       Objective log tells story of quest
    
    QUEST JOURNAL AS NARRATIVE:
    The journal itself is a story document.
    "I found evidence that [NPC] was lying.
     I should confront them - or maybe just leave."
    Player reads their own adventure story.
    

## Anti-Patterns


---
  #### **Name**
Ludonarrative Dissonance
  #### **Description**
When mechanics contradict narrative themes
  #### **Why**
Players feel story is fake when gameplay undermines it
  #### **Instead**
    Mechanics MUST reinforce narrative.
    
    BAD: Story says violence is wrong, gameplay rewards killstreaks
    BAD: Character mourns death, respawns immediately
    BAD: Urgent quest "hurry!" but no time limit
    BAD: Noble hero, gameplay is theft and murder
    
    GOOD: Nathan Drake's quips contextualize killing
    GOOD: Hades makes death part of the story
    GOOD: Undertale makes combat itself the moral choice
    GOOD: Papers Please makes mechanics BE the moral story
    

---
  #### **Name**
Cutscene Incompetence
  #### **Description**
Player character becomes helpless in cutscenes
  #### **Why**
Players just demonstrated competence; cutscene undermines it
  #### **Instead**
    Character capabilities must persist.
    
    BAD: Player can dodge bullets, cutscene character can't
    BAD: Player defeats boss, cutscene shows boss winning
    BAD: Player is stealthy, cutscene walks into trap
    
    GOOD: Cutscene acknowledges player's demonstrated skills
    GOOD: Failure states are player's fault, not scripted
    GOOD: If character MUST fail, make it a different threat
    

---
  #### **Name**
Exposition Dump NPCs
  #### **Description**
NPCs who exist solely to deliver lore monologues
  #### **Why**
'Let me tell you about the history of...' is never natural
  #### **Instead**
    Information through interaction.
    
    BAD: "As you know, 200 years ago the war..."
    BAD: NPCs who lecture at the player
    BAD: Forced dialogue you can't skip
    
    GOOD: Lore emerges through investigation
    GOOD: NPCs reveal information through their needs
    GOOD: Player asks because THEY want to know
    GOOD: History visible in environment
    

---
  #### **Name**
False Choices
  #### **Description**
Offering choices that don't actually matter
  #### **Why**
Once discovered, players lose faith in ALL choices
  #### **Instead**
    Every choice must create difference.
    
    BAD: Three dialogue options, all same result
    BAD: Branching that immediately reconverges
    BAD: "Illusion of choice" as design strategy
    
    GOOD: Even small differences are real
    GOOD: Choices affect relationships, even if not plot
    GOOD: Be honest about constraints
    GOOD: Fewer real choices beat many fake ones
    

---
  #### **Name**
Railroading for Story
  #### **Description**
Forcing players onto story beats despite player action
  #### **Why**
Players came to PLAY, not to be audience
  #### **Instead**
    Story should adapt to player, not force player.
    
    BAD: Player must lose boss fight for story
    BAD: Invisible walls during story moments
    BAD: "Return to mission area" during exploration
    
    GOOD: Design story that works with any player action
    GOOD: Let players break sequence, adapt gracefully
    GOOD: If something must happen, make it player-caused
    

---
  #### **Name**
Read-Optimized Dialogue
  #### **Description**
Writing dialogue that reads well but sounds wrong
  #### **Why**
If it's voiced, it will be spoken. Write for speaking.
  #### **Instead**
    Read all dialogue aloud while writing.
    
    BAD: "I shall endeavor to locate the artifact."
    BAD: Long sentences without breath points
    BAD: Literary language in casual context
    
    GOOD: "I'll find it."
    GOOD: Natural contractions and rhythm
    GOOD: Silences and interruptions
    

---
  #### **Name**
Over-Signposted Story
  #### **Description**
Making every narrative beat completely explicit
  #### **Why**
Player discovery is more powerful than player witnessing
  #### **Instead**
    Leave room for interpretation.
    
    BAD: Character explains their motivation explicitly
    BAD: Story tells you how to feel
    BAD: No ambiguity in morality
    
    GOOD: Show behavior, let player infer motivation
    GOOD: Trust players to make connections
    GOOD: Ambiguity invites engagement
    

---
  #### **Name**
Protagonist Defined By Writer
  #### **Description**
Giving the avatar a personality the player may not share
  #### **Why**
The player IS the protagonist in games
  #### **Instead**
    Leave room for player's version.
    
    BAD: Player character makes jokes player wouldn't
    BAD: Forced emotional reactions
    BAD: Predetermined character opinions
    
    GOOD: Offer range of expressions
    GOOD: Let player define character through choice
    GOOD: Or commit fully to defined character (Geralt)
    