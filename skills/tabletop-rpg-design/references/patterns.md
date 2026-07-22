# Tabletop RPG Design

## Patterns


---
  #### **Name**
Fiction First Resolution
  #### **Description**
Let the narrative situation determine which mechanics apply
  #### **When**
Designing core resolution systems
  #### **Example**
    # BAD: Mechanics first
    "Roll Athletics to jump the gap"
    (Player: "What gap? How wide? Do I have running start?")
    
    # GOOD: Fiction first (Apocalypse World style)
    GM: "The chasm yawns before you, twenty feet across.
         Jagged rocks wait below. What do you do?"
    Player: "I sprint and leap across!"
    GM: "That sounds like defying danger with DEX.
         On a hit, you're across. On a 7-9, you make it but..."
    
    # The mechanic (Defy Danger) emerges from the fiction.
    # The stakes are clear BEFORE dice hit the table.
    # The player made a meaningful choice (could have found another way).
    
    # DESIGN PRINCIPLE:
    # 1. Establish fictional situation clearly
    # 2. Player declares action in fiction
    # 3. GM identifies which mechanic applies (if any)
    # 4. Resolve, then return to fiction
    
    # This creates immersion AND mechanical clarity.
    

---
  #### **Name**
Fail Forward Design
  #### **Description**
Every failure should create new story, never dead ends
  #### **When**
Designing any roll or check
  #### **Example**
    # ANTI-PATTERN: Binary pass/fail
    "Roll to pick the lock.
     Success: door opens.
     Failure: door stays locked, try again next round."
    
    # PATTERN: Fail forward
    "Roll to pick the lock."
    # Full Success: Door opens quietly
    # Partial Success (7-9 in PbtA, complication in BitD): Choose one:
    #   - Door opens but you make noise
    #   - Door opens but your picks break
    #   - Door opens but it took too long (guards approaching)
    # Failure: Something gets WORSE:
    #   - Alarm triggers
    #   - Lock jams permanently (need another route)
    #   - You realize the lock was trapped
    
    # Key insight: Failure ≠ "nothing happens"
    # Failure = "something interesting happens that isn't what you wanted"
    
    # Blades in the Dark codifies this beautifully:
    # - Desperate position + failure = severe consequence
    # - The fiction changes NO MATTER WHAT
    # - Players cannot grind by retrying indefinitely
    

---
  #### **Name**
Player-Facing Rolls
  #### **Description**
Players roll all dice, GM never rolls
  #### **When**
Designing to reduce GM cognitive load and increase player agency
  #### **Example**
    # TRADITIONAL: GM and players both roll
    GM attacks player: GM rolls d20 + monster attack vs player AC
    Player feels passive: "They hit me for 8 damage"
    
    # PLAYER-FACING: Player rolls defense
    Monster attacks: Player rolls defense (AC + d20 vs static attack value)
    Player feels active: "I failed to dodge, taking 8 damage"
    
    # Mathematical equivalence:
    # Attack d20 + 5 vs AC 15 = same probability as
    # Defense d20 + 5 vs Attack 15
    
    # Benefits:
    # 1. GM never touches dice (more bandwidth for narration)
    # 2. Players always engaged (no waiting for GM rolls)
    # 3. Failure feels like player action, not GM aggression
    # 4. Speeds up combat significantly
    
    # Games using this: Numenera, Cypher System, some PbtA
    
    # CAUTION: Some players LIKE the GM rolling against them.
    # The hidden roll creates mystery and threat. Know your audience.
    

---
  #### **Name**
Meaningful Character Advancement
  #### **Description**
Level-ups should change how you play, not just add numbers
  #### **When**
Designing progression systems
  #### **Example**
    # ANTI-PATTERN: Numerical inflation
    Level 1: +5 to hit, 10 HP
    Level 10: +15 to hit, 100 HP
    # Same gameplay, bigger numbers. Boring.
    
    # PATTERN: Capability expansion
    Level 1: You can fight one enemy at a time
    Level 3: You gain "Cleave" - hit multiple adjacent enemies
    Level 5: You gain "Fortress" - allies behind you have cover
    Level 7: You gain "Warlord's Cry" - once per battle, all allies act
    
    # Each level changes WHAT you can do, not just HOW WELL.
    # Players make different tactical decisions at each tier.
    
    # Blades in the Dark's special abilities:
    # - "Savage": When you harm someone, take +1d
    # - "Ghost Fighter": You can fight spectral enemies
    # - "Leader": Your crew gets +1 tier in group actions
    # Each creates new fictional possibilities, not just bonuses.
    
    # D&D 4e understood this: Every level brought new powers
    # that fundamentally changed combat options.
    
    # The test: "Would a Level 10 session FEEL different from Level 1?"
    # If it's just bigger numbers against bigger monsters: FAIL.
    

---
  #### **Name**
Dice Pool Probability Design
  #### **Description**
Understanding and designing with dice pool mathematics
  #### **When**
Creating or modifying dice pool systems
  #### **Example**
    # DICE POOL FUNDAMENTALS
    # Roll Xd6, count successes (5-6 = success)
    # P(success per die) = 2/6 = 33.3%
    
    # Expected successes = dice_count * 0.333
    # 3 dice: ~1 success expected
    # 6 dice: ~2 successes expected
    
    # Probability of AT LEAST N successes (3d6, target 5-6):
    # 0+: 100% (trivial)
    # 1+: 70.4%
    # 2+: 25.9%
    # 3+: 3.7%
    
    # KEY INSIGHT: Dice pools have CURVED probability
    # - Low target (1 success): Reliable with few dice
    # - High target (3+ successes): Needs many dice
    # - This creates natural task difficulty scaling
    
    # WORLD OF DARKNESS (d10 pool, 8+ succeeds):
    # 30% per die, more forgiving than d6 pools
    # 5d10 vs difficulty 1: 83.2% chance of success
    # 5d10 vs difficulty 3: 16.8% chance of success
    
    # DESIGN DECISION: Success threshold
    # Higher threshold (6 on d6): Bigger pools needed, heroic feel
    # Lower threshold (4+ on d6): Smaller pools work, grittier feel
    
    # BLADES IN THE DARK innovation:
    # Roll Xd6, take HIGHEST
    # 1-3: Failure, 4-5: Partial, 6: Full success
    # This is NOT a success-counting pool!
    # Probability curves are completely different.
    

---
  #### **Name**
Procedure Design
  #### **Description**
Create clear steps for complex game situations
  #### **When**
Handling situations that recur in play
  #### **Example**
    # BAD: Vague guidance
    "When players explore a dungeon, the GM describes what they find."
    
    # GOOD: Clear procedure (OSR style)
    ## Dungeon Turn Procedure
    1. GM describes the current location (exits, features, threats)
    2. Players declare actions (one significant action per turn)
    3. Resolve actions:
       a. Searching: Roll 1d6, 1-2 finds secret, takes 10 min
       b. Listening: Roll 1d6, 1-2 hears sounds, which direction
       c. Moving: Travel to adjacent room, roll encounter check
    4. Track time: Each turn = 10 minutes
       a. Every 2 turns: Roll for random encounter (1 on d6)
       b. Every 6 turns: Torches gutter, lanterns use oil
    5. Update light, rations, fatigue as needed
    6. Return to step 1
    
    # BLADES IN THE DARK Procedure: The Score
    1. Choose a target and a plan type
    2. Detail: Ask one key question about the approach
    3. Engagement roll: Determine starting position
    4. Play out the score (actions, consequences, flashbacks)
    5. Payoff: Calculate rep, coin, heat
    6. Downtime: 2 activities per character
    
    # Procedures give players and GMs CLEAR HANDLES.
    # "What do we do?" is never unanswered.
    # New GMs can run sessions confidently.
    

---
  #### **Name**
Session Pacing Architecture
  #### **Description**
Structure sessions for dramatic rhythm
  #### **When**
Designing session and campaign frameworks
  #### **Example**
    # THE THREE-ACT SESSION (3-4 hours)
    
    ## Act 1: Setup (30-45 min)
    - Recap + current situation
    - Present the problem/opportunity
    - Players make a plan
    - Trigger initial action (first significant roll)
    
    ## Act 2: Confrontation (90-120 min)
    - Rising tension through complications
    - 3-5 significant challenges
    - Mix of combat, social, exploration
    - Midpoint twist or revelation
    - Things get worse before the climax
    
    ## Act 3: Resolution (30-45 min)
    - Climactic confrontation
    - Consequences become clear
    - Denouement and setup for next session
    - XP/advancement
    
    # BLADES IN THE DARK structure:
    # - Free Play (gather info, roleplay)
    # - The Score (heist/mission)
    # - Downtime (recover, projects)
    # Built-in pacing that prevents sessions from dragging.
    
    # ONE-SHOT PACING (different beast):
    # - Start in media res (no "you meet in a tavern")
    # - Stakes clear in first 10 minutes
    # - Climax at the 75% mark (leave time for resolution)
    # - Pregen characters or 15-min creation MAX
    

---
  #### **Name**
Safety Tool Integration
  #### **Description**
Build consent and safety into game structure
  #### **When**
Designing for diverse tables and sensitive content
  #### **Example**
    # SAFETY TOOLS are not optional - they're design
    
    ## X-Card (John Stavropoulos)
    # Physical card on table. Tap to skip content, no explanation needed.
    # DESIGN: Include X-Card mention in core rules, not optional sidebar.
    # Procedure: Content stops, rewind, continue without that element.
    
    ## Lines and Veils (Ron Edwards)
    # Session Zero establishes:
    # - Lines: Content that will NEVER appear (hard limits)
    # - Veils: Content that can happen but "fades to black"
    # DESIGN: Provide example lines/veils in your game.
    # Genre-specific: Horror game needs different defaults than comedy.
    
    ## Script Change (Beau Sheldon)
    # Rewind: "Let's redo that scene differently"
    # Fast Forward: "Let's skip past this part"
    # Pause: "I need a moment to process"
    # Resume: "Ready to continue"
    # DESIGN: Works well for narrative games with scene framing.
    
    ## Stars and Wishes (feedback tool)
    # End of session:
    # - Star: One thing you loved about the session
    # - Wish: One thing you'd like to see more of
    # DESIGN: Built-in player feedback loop. Include in advancement.
    
    # MECHANICAL INTEGRATION:
    # Some games build safety into mechanics:
    # - "You can always spend a meta-currency to veto a consequence"
    # - "Players have narrative authority over their character's backstory"
    # - "The X-Card grants one retroactive scene reframe per session"
    

---
  #### **Name**
GM Prep Reduction
  #### **Description**
Design systems that minimize prep while maximizing emergent play
  #### **When**
Creating GM-facing tools and procedures
  #### **Example**
    # FRONTS (Apocalypse World / Dungeon World)
    A Front is a collection of threats that will happen if unchecked.
    
    # Structure:
    Front Name: "The Cult of the Crimson Eye"
    Cast: High Priestess, Acolytes, Corrupted Mayor
    Impulse: To bring the Outer God into the world
    Grim Portents:
      1. Disappearances in the lower quarter
      2. Strange lights from the abandoned temple
      3. The mayor forbids investigation
      4. Mass hallucinations during the festival
      5. The ritual site is prepared
    Impending Doom: The Outer God arrives, reality tears
    
    # GM Prep: Create 2-3 fronts. That's it.
    # Play: Advance portents when players ignore a front.
    # Emergence: Players interact with fronts, create new situations.
    
    # CLOCKS (Blades in the Dark)
    # Visual countdown to events
    # 4-clock: Imminent threat
    # 6-clock: Medium-term project
    # 8-clock: Long-term campaign arc
    
    # GM never plans SOLUTIONS, only SITUATIONS.
    # "The vault is guarded" not "Players must bribe the guard"
    
    # RANDOM TABLES for improvisation:
    # - 20 NPC quirks
    # - 10 Complications when things go wrong
    # - 6 What's in the room?
    # These tools let GMs respond, not script.
    

---
  #### **Name**
Character Creation Flow
  #### **Description**
Design character creation that's fast, evocative, and teaches the game
  #### **When**
Building the new player experience
  #### **Example**
    # THE 15-MINUTE RULE
    # Character creation should take 15 minutes or less for one-shots.
    # Campaigns can go longer, but break it into:
    # - Core (15 min): Playable character
    # - Extended (30 min): Full backstory and optimization
    
    # PLAYBOOK DESIGN (PbtA/FitD)
    # One page. All choices visible. No book-flipping.
    #
    # Structure:
    # - Name/Look (quick evocative choices, not blank fields)
    # - Starting stats (2-3 arrays to choose from)
    # - Starting moves (pick 2 from 4 options)
    # - Starting gear (pick loadout, not shop)
    # - Bonds/relationships (fill-in-the-blank prompts)
    #
    # Every choice teaches the game:
    # "When you Hack and Slash..." tells players combat exists
    # "When you Read a Person..." tells players social is mechanical
    
    # LIFEPATH SYSTEMS (Traveller, Cyberpunk)
    # Random events build history AND skills.
    # Risk: Character can die in creation! (Traveller's famous feature)
    # Benefit: Rich emergent backstory, no "write a backstory" homework.
    #
    # Design: Each term/event should add:
    # - A skill or stat change
    # - A story beat or relationship
    # - A piece of equipment or debt
    
    # AVOID:
    # - Trap choices (options that seem good but aren't)
    # - Blank fields requiring creativity on demand
    # - Referencing multiple books
    # - Complex math before playing
    

---
  #### **Name**
The Golden Rule of Combat
  #### **Description**
Combat should resolve faster than it takes in fiction
  #### **When**
Designing combat systems
  #### **Example**
    # THE PROBLEM:
    # A 30-second sword fight takes 45 minutes to resolve.
    # Players check out. Momentum dies.
    
    # SOLUTIONS BY WEIGHT:
    
    ## Ultra-Light (Lasers & Feelings, etc.)
    # One roll resolves entire conflict.
    # GM describes the outcome based on roll quality.
    # Combat = 5 minutes maximum.
    
    ## Light (Blades in the Dark)
    # Single rolls with position/effect.
    # Desperate/risky/controlled + limited/standard/great
    # No HP tracking. Harm is a consequence.
    # Typical fight: 3-5 rolls, 15-20 minutes.
    
    ## Medium (Dungeon World)
    # Exchange blows through moves.
    # "Hack and Slash" resolves an attack AND defense.
    # No initiative order. Fiction determines who acts.
    # Typical fight: 10-15 minutes.
    
    ## Crunchy (D&D 5e)
    # Turn-based initiative.
    # Each character acts sequentially.
    # Requires: Fast turn timers, pre-rolled damage, terrain.
    # DESIGN: If going crunchy, make choices matter.
    #   Position, resource management, combos.
    #   Otherwise it's just "I attack" repeatedly.
    
    ## Tactical (D&D 4e, Lancer)
    # Grid-based. Powers with specific effects.
    # Every turn is a meaningful decision.
    # Combat is THE GAME. Accept it takes 60+ minutes.
    # Design for it: Interesting terrain, varied objectives.
    
    # THE RULE: Know your weight class. Don't design a
    # rules-light game with a crunchy combat system.
    

---
  #### **Name**
Core Dice Mechanic Selection
  #### **Description**
Choosing the right dice system for your game's feel
  #### **When**
Designing the central resolution mechanic
  #### **Example**
    # SINGLE DIE + MODIFIERS (d20 System)
    # Range: 1-20 + modifiers
    # Character: High variance (swingy), modifiers feel meaningful
    # Math: Linear probability (each +1 = 5% change)
    # Best for: Heroic variance, "anything can happen"
    # Pitfall: Low-level feels random, high-level modifiers dominate
    
    # 2d6 + MODIFIERS (PbtA)
    # Range: 2-12 + modifiers
    # Character: Bell curve (7 most common), predictable feel
    # Math: -1 = ~10% swing at middle, less at extremes
    # Best for: Narrative focus, three-tier outcomes (6-/7-9/10+)
    # Pitfall: Stat range must be narrow (+1 to +3)
    
    # DICE POOL - COUNT SUCCESSES (Shadowrun, WoD)
    # Roll Xd6, count successes
    # Character: Scaling competence, lots of dice = powerful
    # Math: Curved probability, threshold scaling
    # Best for: Cinematic action, "more dice more awesome"
    # Pitfall: Success counting slows play, bucket of dice
    
    # DICE POOL - TAKE HIGHEST (Blades in the Dark)
    # Roll Xd6, take highest result
    # Character: More dice = more reliable, but ceiling stays 6
    # Math: Geometric probability improvement
    # Best for: Heist/risk games, push your luck
    # Pitfall: Math is non-intuitive to players
    
    # STEP DICE (Earthdawn, Savage Worlds)
    # d4 -> d6 -> d8 -> d10 -> d12 by skill
    # Character: Obvious progression, better die = better
    # Math: Non-linear probability, hard to compare
    # Best for: Tactile progression feel, collecting dice
    # Pitfall: Probability comparison is complex
    
    # D100 / PERCENTILE (Call of Cthulhu, BRP)
    # Roll under skill percentage
    # Character: Transparent probability, "40% chance" is obvious
    # Math: Linear, simple to grasp
    # Best for: Realistic/gritty, skill specialization
    # Pitfall: Modifier math can overwhelm
    

---
  #### **Name**
Advantage and Disadvantage Systems
  #### **Description**
Clean modifiers that speed play and create drama
  #### **When**
Handling situational bonuses and penalties
  #### **Example**
    # THE PROBLEM WITH +2 BONUSES:
    # "I have high ground (+1), flanking (+2), blessed weapon (+1d6),
    #  but the enemy is in cover (-2) and I'm exhausted (-1)..."
    # Math overload. Play stops. Calculator comes out.
    
    # D&D 5E ADVANTAGE (revolutionary simplification)
    # Advantage: Roll 2d20, take higher
    # Disadvantage: Roll 2d20, take lower
    # They cancel out (no stacking).
    #
    # Math: Advantage ≈ +3.5 on average (but varies by target)
    # At DC 11: Advantage = +5 effective
    # At DC 2 or DC 20: Advantage = minimal effect
    #
    # DESIGN INSIGHT: Players don't need to know the math.
    # "Roll with advantage" is instantly understood.
    
    # BLADES IN THE DARK POSITION/EFFECT
    # Two axes of situational modifiers:
    # - Position: Desperate / Risky / Controlled
    # - Effect: Limited / Standard / Great
    #
    # No math. Pure fictional positioning.
    # "You're at Desperate position but Great effect"
    # Translates to: High risk, high reward
    
    # FORGED IN THE DARK DICE MODIFIERS
    # +1d / -1d modifiers stack simply
    # Devil's bargain: +1d but accept a complication
    # Push yourself: +1d but take stress
    # Assist: +1d from ally
    #
    # Players never calculate. They grab dice.
    
    # DESIGN PRINCIPLE:
    # If your modifier system needs a cheat sheet, simplify it.
    # "Roll with disadvantage" beats "+1 +2 -1 +1d4 -2"
    

## Anti-Patterns


---
  #### **Name**
Mother May I Design
  #### **Description**
Mechanics that force players to ask GM permission for everything
  #### **Why**
    When players constantly need to ask "Can I do X?" before taking action,
    agency transfers to the GM. Players become passive petitioners. The GM
    becomes a bottleneck and arbiter of all fun. This burns out GMs and
    frustrates players who want to be protagonists.
    
  #### **Instead**
    Give players clear procedures and resources they control.
    "You have 3 Flashback slots per score. Spend one to establish you
    already prepared for this." No permission needed.
    
    Define what characters CAN do, not what they CAN'T.
    "Fighters can Cleave: when you drop an enemy, immediately attack another."
    Player owns this power. GM doesn't adjudicate it.
    

---
  #### **Name**
The Death Spiral
  #### **Description**
Mechanics where taking damage makes you less effective, accelerating defeat
  #### **Why**
    When wounds give penalties to action, injured characters become unable
    to contribute. The losing side loses faster. One bad roll cascades into
    certain defeat. Combat becomes a foregone conclusion after the first hit.
    Players with hurt characters sit out for the rest of the fight.
    
  #### **Instead**
    Separate "how hurt you are" from "how effective you are."
    HP represents stamina/luck until zero (sudden death/incapacitation).
    Wounds can have narrative weight without mechanical penalties.
    
    Or lean INTO it deliberately (Dread's Jenga tower) where
    escalating tension is the point.
    

---
  #### **Name**
Dump Stats
  #### **Description**
Allowing players to minimize stats they consider useless
  #### **Why**
    When certain abilities rarely matter (Charisma for fighters, Strength
    for wizards), players dump them to 8 and never engage with those
    challenges. The game loses texture. Characters become one-dimensional.
    The GM can't create varied challenges.
    
  #### **Instead**
    Make every stat matter to every character, even if differently.
    Charisma = morale saves, reaction rolls, henchmen loyalty.
    Strength = encumbrance, forcing doors, climbing.
    
    Or use unified stats (Blades in the Dark's Action Ratings)
    where there are no dump options.
    

---
  #### **Name**
Analysis Paralysis in Creation
  #### **Description**
Too many choices that freeze new players during character creation
  #### **Why**
    Presented with 50 skills, 200 feats, and 12 classes, new players feel
    overwhelmed. They fear making "wrong" choices. They spend an hour
    optimizing before playing one minute. Session zero becomes session-only.
    
  #### **Instead**
    Constrained choices: Pick from 3 options, not 30.
    Defaults: "If you don't want to choose, take this."
    Playbooks: One-page packages that work.
    Growth: Start simple, add complexity through play.
    Respec: Allow changing choices after seeing the game in action.
    

---
  #### **Name**
The Combat Slog
  #### **Description**
Fights that take an hour of real time to resolve minutes of fiction
  #### **Why**
    When combat takes 45 minutes for what should be a 2-minute fight,
    players check out. The story grinds to a halt. The GM dreads encounters.
    Players avoid fights not for story reasons but because they're boring.
    
  #### **Instead**
    Set encounter budgets: Most fights should take 15-20 minutes.
    Decisive blows: When the outcome is clear, end it narratively.
    Morale rules: Enemies flee or surrender at half strength.
    One-roll combat: For minor encounters, one roll determines outcome.
    Timers: "Your turn is 30 seconds. Don't know? You Dodge."
    

---
  #### **Name**
Quantum Ogre Railroading
  #### **Description**
Illusory choices where all paths lead to the same encounter
  #### **Why**
    "Whether you go left or right, you encounter the ogre." Players sense
    their choices don't matter. Agency becomes theater. Trust erodes.
    Eventually players disengage: "Just tell us what happens."
    
  #### **Instead**
    Prep situations, not plots. The ogre is in location A.
    If players go to B, B has its own content.
    Fronts/clocks advance regardless of player choices.
    Some content never gets seen. That's okay.
    
    Or be transparent: "This is a linear adventure."
    Railroads with informed consent are fine.
    

---
  #### **Name**
Whiff Factor
  #### **Description**
Spending resources and time on actions that produce nothing
  #### **Why**
    "You miss. Nothing happens. Next turn." The player wasted their action,
    nothing changed, and play has no forward momentum. Repeated whiffs
    make players feel ineffective and bored.
    
  #### **Instead**
    Fail forward: Failure changes the situation, even negatively.
    "Your sword strikes the pillar. Stone chips fly. The guards notice."
    Partial success tiers: 7-9 in PbtA means something DOES happen.
    Resource cost: Even on a miss, you learn something or force a response.
    

---
  #### **Name**
Trap Options
  #### **Description**
Character choices that appear viable but are mechanically inferior
  #### **Why**
    Players who take the "cool but bad" option feel betrayed when they
    discover it doesn't work. System mastery becomes a barrier. New players
    are punished for not reading optimization guides. The game has a
    "hidden curriculum" that feels exclusionary.
    
  #### **Instead**
    All options should be viable. If something looks good, it IS good.
    Playtest with new players who pick intuitively.
    If an option is niche, SAY SO in the text.
    Cut options that don't carry their weight.
    

---
  #### **Name**
GM Dependency
  #### **Description**
Rules that require GM interpretation for basic play
  #### **Why**
    "The GM decides if this applies" 100 times per session burns out GMs.
    Different GMs run the same game differently, confusing players.
    New GMs feel unqualified without extensive system mastery.
    Online play becomes impossible without shared understanding.
    
  #### **Instead**
    Clear procedures: Step 1, Step 2, Step 3.
    Examples in text that establish precedent.
    Player-facing rules they can invoke.
    Default rulings for common edge cases.
    

---
  #### **Name**
Feat Tax
  #### **Description**
Required choices that gate basic competence
  #### **Why**
    "You need Weapon Focus, Weapon Specialization, and Power Attack
    to be a functional fighter." The first 6 levels are just paying taxes
    before you can play the character concept you wanted.
    
  #### **Instead**
    Baseline competence without choices.
    All fighters can fight. Feats/advances add options, not requirements.
    If everyone takes it, bake it into the class.
    No trap choices that skip "mandatory" feats.
    