# Game Design Core

## Patterns


---
  #### **Name**
The 30/30/30 Loop Design
  #### **Description**
Design three nested loops that create engagement at second, minute, and hour timescales
  #### **When**
Starting any game design, evaluating if core loop is solid
  #### **Example**
    # Every game needs three interlocking loops:
    
    ## 30-SECOND LOOP (Micro)
    The second-to-second experience. Must be inherently satisfying.
    - Doom: shoot-kill-move
    - Mario: run-jump-land
    - Tetris: rotate-place-clear
    - Hades: attack-dash-attack
    
    TEST: Is this action fun with no goals, no progression, no rewards?
    If not, no amount of meta-game will save it.
    
    ## 30-MINUTE LOOP (Meso)
    The session structure. Creates rhythm and natural break points.
    - Roguelikes: run-death-restart
    - Match-3: level-reward-next
    - Shooters: mission-loadout-mission
    - MOBAs: match-results-queue
    
    TEST: Do players naturally pause here? Is there a "just one more" hook?
    
    ## 30-HOUR LOOP (Macro)
    The long-term progression. Creates goals and mastery.
    - Unlocks, upgrades, new abilities
    - Narrative progression
    - Skill development and rankings
    - Collection and completion
    
    TEST: Is there always something to work toward? Does mastery feel earned?
    
    # The magic happens when loops reinforce each other:
    - Micro success -> Meso progress -> Macro advancement
    - Macro goals -> Meso structure -> Micro motivation
    

---
  #### **Name**
Meaningful Decisions Framework
  #### **Description**
Structure choices so every decision matters and has interesting trade-offs
  #### **When**
Designing any player choice, from combat to character building
  #### **Example**
    # Sid Meier: "A game is a series of interesting decisions"
    
    ## What makes a decision meaningful:
    
    1. NO DOMINANT STRATEGY
       Bad: Sword does 10 damage, Axe does 5
       Good: Sword is fast but weak, Axe is slow but breaks armor
    
    2. INCOMPLETE INFORMATION
       Bad: You know exactly what happens
       Good: You're gambling on outcomes, weighing probabilities
    
    3. SITUATIONAL VALUE
       Bad: One choice is always optimal
       Good: Best choice depends on context, changes throughout game
    
    4. PERMANENT CONSEQUENCES
       Bad: Can be undone instantly
       Good: Live with your choices (or at least for a while)
    
    5. TRADE-OFFS, NOT PUZZLES
       Bad: One right answer to discover
       Good: Multiple valid approaches with different costs/benefits
    
    ## The Decision Checklist:
    For every player decision, ask:
    - Can players reasonably argue for different choices?
    - Do experienced players make different choices in different situations?
    - Does the choice reflect player personality/playstyle?
    - Is there genuine uncertainty about the outcome?
    
    If the answer is "no" to most of these, it's not a decision - it's a puzzle or a trap.
    

---
  #### **Name**
Vlambeer Juice Philosophy
  #### **Description**
Make every action feel incredible through layered feedback
  #### **When**
Polish phase, making actions feel impactful, fixing "floaty" feel
  #### **Example**
    # Jan Willem Nijman's GDC "Art of Screenshake" talk in action
    
    ## A Simple Attack - Before Juice:
    - Player presses attack button
    - Attack animation plays
    - Damage number appears
    
    ## The Same Attack - After Juice:
    TIMING:
    - Hitstop (freeze 2-4 frames on impact)
    - Hitlag (slow-motion micro-moment)
    
    CAMERA:
    - Screen shake (intensity based on impact)
    - Camera kick (slight push in direction)
    - Zoom pulse (subtle 2% zoom on impact)
    
    VISUAL:
    - Impact particles
    - Hit flash on enemy
    - Damage number with weight (bounces, fades)
    - Motion blur on attack
    - Trail effect on weapon
    
    AUDIO:
    - Impact sound (pitch-randomized)
    - Crunch/meat sound for damage
    - Enemy pain vocalization
    - Environmental response
    
    FEEL:
    - Controller rumble (if available)
    - Knockback on enemy
    - Slight player push-back (Newton's 3rd law)
    
    ## The Rule: Actions should feel MORE powerful than they are
    Players can't feel damage numbers. They feel feedback.
    

---
  #### **Name**
Flow Channel Design
  #### **Description**
Keep players in the optimal challenge zone between boredom and frustration
  #### **When**
Designing difficulty, progression pacing, adaptive systems
  #### **Example**
    # Jenova Chen's Flow Theory in Games
    
         ANXIETY
         /         \
        /           \     <- Stay in this channel
       /    FLOW     \
      /     ZONE      \
     /                 \
    BOREDOM
    
    ## Keeping Players in Flow:
    
    1. DYNAMIC DIFFICULTY
       - Track player performance silently
       - Adjust parameters without breaking immersion
       - "Rubber band" systems (enemies miss more when player is low health)
    
    2. SKILL-GATED PROGRESSION
       - New challenges unlock only when ready
       - "Invisible walls" that open when mastery demonstrated
       - Optional hard content for advanced players
    
    3. MASTERY REVEALS DEPTH
       - Surface layer accessible to beginners
       - Hidden complexity rewards investment
       - Advanced techniques discoverable but not required
    
    4. FAILURE IS FAST
       - Quick restart, minimal punishment
       - Learn through iteration, not reading
       - Death teaches, not punishes
    
    ## The Difficulty Truth:
    Players don't want "easy" or "hard"
    Players want to feel "skilled"
    
    The best difficulty is the one where players believe
    they succeeded through their own competence.
    

---
  #### **Name**
Friction vs. Flow Design
  #### **Description**
Know when to add friction (meaningful resistance) vs remove it (frustrating obstacles)
  #### **When**
Evaluating any mechanic that slows players down
  #### **Example**
    # Not all friction is bad. Not all smoothness is good.
    
    ## GOOD FRICTION (Meaningful Resistance)
    
    Design Intent: Creates tension, makes success feel earned
    
    Examples:
    - Reload times in shooters (creates vulnerability windows)
    - Stamina systems (prevents button mashing)
    - Resource scarcity (forces meaningful choices)
    - Travel time (makes world feel vast)
    - Crafting requirements (makes gear feel earned)
    
    ## BAD FRICTION (Frustrating Obstacles)
    
    Design Intent: None - just annoys players
    
    Examples:
    - Long, unskippable cutscenes
    - Inventory management tedium
    - Excessive menu navigation
    - Grinding for grinding's sake
    - Wait timers not tied to gameplay
    
    ## The Friction Test:
    1. Does this friction create interesting decisions?
    2. Does overcoming it feel satisfying?
    3. Does it serve the game's core fantasy?
    4. Would players choose to keep it if given an option?
    
    If no to most: it's not friction, it's annoyance.
    

---
  #### **Name**
Player Motivation Frameworks
  #### **Description**
Design for intrinsic motivation, understand what different players want
  #### **When**
Understanding your audience, designing reward systems, retention analysis
  #### **Example**
    ## SELF-DETERMINATION THEORY (SDT)
    
    Three universal human needs games can fulfill:
    
    AUTONOMY - "I'm in control"
    - Meaningful choices
    - Multiple valid paths
    - Player-driven goals
    
    COMPETENCE - "I'm getting better"
    - Clear skill progression
    - Fair challenges
    - Mastery visible
    
    RELATEDNESS - "I belong"
    - Community
    - Shared experiences
    - Competition/cooperation
    
    ## BARTLE'S PLAYER TYPES
    
    KILLERS (15%) - Acting on players
    - Want to dominate, compete, win
    - Need: Leaderboards, PvP, visible rankings
    
    ACHIEVERS (10%) - Acting on world
    - Want to complete, collect, master
    - Need: Achievements, unlocks, 100% markers
    
    SOCIALIZERS (50%) - Interacting with players
    - Want to connect, share, belong
    - Need: Chat, guilds, shared experiences
    
    EXPLORERS (25%) - Interacting with world
    - Want to discover, understand, find
    - Need: Hidden secrets, lore, easter eggs
    
    ## LAZZARO'S 8 KINDS OF FUN
    
    1. Sensation - Game as sense pleasure
    2. Fantasy - Game as make-believe
    3. Narrative - Game as drama
    4. Challenge - Game as obstacle course
    5. Fellowship - Game as social framework
    6. Discovery - Game as uncharted territory
    7. Expression - Game as self-discovery
    8. Submission - Game as pastime
    
    DESIGN IMPLICATION: Know which types of fun your game provides.
    Don't try to serve all of them. Master 2-3.
    

---
  #### **Name**
MDA Framework Application
  #### **Description**
Design from aesthetics backward through dynamics to mechanics
  #### **When**
Starting design, debugging why game doesn't "feel right"
  #### **Example**
    # Mechanics -> Dynamics -> Aesthetics
    # (But design in reverse)
    
    ## AESTHETICS (What players feel)
    The emotional experience. What you're actually selling.
    - Tension, triumph, wonder, humor, fear
    - "How do we want players to feel?"
    
    ## DYNAMICS (What players do)
    Emergent behavior from mechanics interaction.
    - Risk-taking, cooperation, exploration
    - "What behaviors will create those feelings?"
    
    ## MECHANICS (What the rules are)
    The verbs, systems, and numbers.
    - Jump height, damage values, resource rates
    - "What rules will encourage those behaviors?"
    
    ## Example: Horror Game
    
    AESTHETIC GOAL: Fear, vulnerability, relief
    
    DYNAMICS NEEDED:
    - Resource hoarding
    - Avoidance over confrontation
    - High-stakes decision making
    
    MECHANICS THAT CREATE THIS:
    - Scarce ammunition
    - Strong, unkillable enemies
    - One-hit deaths
    - Limited saves
    
    ## Common Mistake:
    Designing mechanics first, hoping aesthetics emerge.
    
    ## Better Approach:
    Define the feeling. Work backward to the rules.
    

---
  #### **Name**
Onboarding Without Tutorials
  #### **Description**
Teach through play, not popups - communicate through design
  #### **When**
Designing first-time user experience, any teaching moment
  #### **Example**
    # Miyamoto: "The player should understand the game just by playing it"
    
    ## THE NINTENDO APPROACH:
    
    1. SAFE INTRODUCTION
       - First enemy can't kill you
       - First gap can be walked over
       - First puzzle has only one solution
    
    2. ESCALATING CHALLENGE
       - Add one element at a time
       - Master before complicating
       - Combine after individual mastery
    
    3. ENVIRONMENTAL TEACHING
       - Level design guides attention
       - Collectibles mark the path
       - Environmental storytelling for mechanics
    
    ## CONCRETE TECHNIQUES:
    
    GATING:
    - Can't leave first area until jump is used
    - Door requires newly learned ability
    - Hidden but findable progression gates
    
    REPETITION:
    - Same obstacle 3 times, increasing difficulty
    - Safe practice → low stakes → high stakes
    
    NEGATIVE SPACE:
    - What you don't do teaches too
    - Closed paths guide toward open ones
    
    JUST-IN-TIME:
    - Teach when needed, not before
    - Context makes lessons memorable
    
    ## The Tutorial Test:
    Play with no text, no popups.
    If players can't figure it out, the design failed - not the player.
    

---
  #### **Name**
Risk-Reward Calibration
  #### **Description**
Design gambling without the lawsuit - make risk feel worth taking
  #### **When**
Designing combat, exploration incentives, player choices
  #### **Example**
    # Players crave risk when stakes feel fair
    
    ## THE RISK-REWARD SPECTRUM:
    
    LOW RISK / LOW REWARD (Safe Path)
    - Always available, always viable
    - Slow but steady progress
    - For cautious players or recovery
    
    MEDIUM RISK / MEDIUM REWARD (Normal Play)
    - Some chance of failure
    - Faster progress when successful
    - Where most play happens
    
    HIGH RISK / HIGH REWARD (Big Plays)
    - High chance of failure
    - Massive payoff on success
    - Creates memorable moments
    
    ## DESIGN PRINCIPLES:
    
    1. RISK MUST BE OPT-IN
       Forced risk isn't exciting, it's frustrating.
       "I chose this" vs "I had no choice"
    
    2. INFORMATION BEFORE DECISION
       Player must understand the stakes.
       Surprise difficulty spikes feel cheap.
    
    3. NEAR-MISSES ARE POWERFUL
       Barely failing is more engaging than easy success.
       "I almost had it" creates retry motivation.
    
    4. STREAKS CREATE DRAMA
       Consecutive successes/failures feel meaningful.
       Gambling psychology: hot/cold streaks feel real.
    
    ## Example: Healing System
    
    SAFE: Heal at save points (no cost, no risk)
    RISKY: Heal items drop from combat (risk for reward)
    HIGH RISK: Heal by attacking enemies (aggressive play rewarded)
    
    Best design: All options available, player chooses style.
    

---
  #### **Name**
Emergence vs. Authored Design
  #### **Description**
Balance between designed experiences and systemic surprises
  #### **When**
Deciding game structure, understanding player stories
  #### **Example**
    # The Spectrum of Player Experience
    
    FULLY AUTHORED                    FULLY EMERGENT
    |<-------------------------------->|
    Linear       Open       Sandbox    Simulation
    Story        World
    
    ## AUTHORED EXPERIENCES
    - Designer controls the moment
    - Guaranteed quality
    - "Best bits" carefully crafted
    - Everyone sees the same thing
    
    Games: Uncharted, Portal, Last of Us
    
    Strengths:
    - Emotional beats land
    - Pacing is perfect
    - Quality control
    
    Weaknesses:
    - Low replayability
    - No player ownership
    - "Theme park" feel
    
    ## EMERGENT EXPERIENCES
    - Systems create stories
    - Player-driven narratives
    - Unique playthroughs
    - Unpredictable moments
    
    Games: Dwarf Fortress, RimWorld, Breath of the Wild
    
    Strengths:
    - Infinite replayability
    - Player ownership
    - Community stories
    
    Weaknesses:
    - No guaranteed quality
    - Players can miss "good parts"
    - Harder to balance
    
    ## THE HYBRID APPROACH:
    Most great games mix both.
    
    - Authored: Main story, set pieces, tutorials
    - Emergent: Combat, exploration, player expression
    
    The art is knowing when to let go.
    

---
  #### **Name**
Skill Ceiling vs. Skill Floor
  #### **Description**
Design for both newcomers and experts simultaneously
  #### **When**
Designing mechanics, considering accessibility, competitive viability
  #### **Example**
    # Every mechanic has two metrics:
    
    SKILL FLOOR: How hard to use at all?
    - Can a new player execute this?
    - How many inputs required?
    - How punishing is failure?
    
    SKILL CEILING: How much room to improve?
    - Can experts still optimize?
    - Is there a mastery curve?
    - Does practice reward?
    
    ## QUADRANT ANALYSIS:
    
    HIGH FLOOR / LOW CEILING (Avoid)
    - Hard to learn, nothing to master
    - Frustrating, unrewarding
    
    LOW FLOOR / LOW CEILING (Casual)
    - Easy to learn, easy to master
    - Accessible but shallow
    
    HIGH FLOOR / HIGH CEILING (Hardcore)
    - Hard to learn, lots to master
    - For dedicated audiences
    
    LOW FLOOR / HIGH CEILING (Ideal)
    - Easy to learn, hard to master
    - Satisfies everyone
    
    ## ACHIEVING LOW FLOOR / HIGH CEILING:
    
    SIMPLE INPUTS, COMPLEX OUTPUTS
    - One button does something cool
    - Timing/spacing creates depth
    
    OPTIONAL COMPLEXITY
    - Basic play is viable
    - Advanced techniques for experts
    
    EMERGENT MASTERY
    - Systems interact in complex ways
    - Experts discover combinations
    
    ## Examples:
    
    Chess: Easy rules, infinite depth
    Rocket League: Drive, boost, jump -> infinite aerials
    Hades: Attack, dash -> animation cancels, boss patterns
    

---
  #### **Name**
Feedback Loop Design
  #### **Description**
Create self-balancing and reinforcing systems that maintain engagement
  #### **When**
Designing progression, difficulty, multiplayer balance
  #### **Example**
    # Two types of feedback loops:
    
    ## POSITIVE FEEDBACK (Reinforcing)
    Success makes future success easier.
    Winner gets stronger.
    
    EFFECT: Snowballing, decisive endings
    
    Good for:
    - Creating power fantasy
    - Ending matches decisively
    - Short sessions
    
    Risks:
    - Runaway leaders
    - Early game decides outcome
    - Frustrating for losers
    
    Examples:
    - Mario Kart: Lead gives time for power-ups
    - MOBAs: Kills give XP advantage
    - Board games: Territory = income = more territory
    
    ## NEGATIVE FEEDBACK (Balancing)
    Success makes future success harder.
    Winner faces new challenges.
    
    EFFECT: Comebacks, prolonged tension
    
    Good for:
    - Competitive fairness
    - Dramatic reversals
    - Long sessions
    
    Risks:
    - Skill feels unrewarded
    - "Rubberbanding" feels cheap
    - Can extend losing games
    
    Examples:
    - Mario Kart: Blue shell targets leader
    - Golf handicaps
    - Dynamic difficulty
    
    ## THE ART: Combine both loops
    
    EARLY GAME: Positive feedback (build advantage)
    LATE GAME: Negative feedback (keep it close)
    END GAME: Positive feedback (decisive finish)
    

## Anti-Patterns


---
  #### **Name**
Designing for Yourself
  #### **Description**
Building the game you want, not the game your audience wants
  #### **Why**
You are not your player. You know all the secrets, have all the skills, understand all systems. Fresh eyes see differently. Your "obvious" is their "confusing."
  #### **Instead**
Playtest with strangers. Watch silently. Never explain. If you have to explain, the design failed.

---
  #### **Name**
Feature Before Core
  #### **Description**
Adding features before the core loop is proven fun
  #### **Why**
No amount of progression, story, or polish saves a boring core. You're building on sand. Every feature multiplies the cost of fixing the foundation.
  #### **Instead**
Gray box prototype. No art, no UI, no progression. If it's not fun in 30 seconds, iterate on the core, not the wrapper.

---
  #### **Name**
Complexity as Depth
  #### **Description**
Adding more systems thinking it adds strategic depth
  #### **Why**
Players don't want more options - they want more interesting options. Complexity creates cognitive load, not engagement. Spreadsheet games feel like work.
  #### **Instead**
Remove systems until one more removal would hurt. Depth comes from interesting interactions between simple systems, not from system count.

---
  #### **Name**
Tutorial As Band-Aid
  #### **Description**
Using tutorials to fix unintuitive design
  #### **Why**
If players need the tutorial, the design already failed. Tutorials teach mechanics; design teaches players. Text explains; design demonstrates.
  #### **Instead**
Redesign the first level. Environmental teaching. Gating that requires understanding. Make the tutorial unnecessary.

---
  #### **Name**
Balanced = Fair
  #### **Description**
Assuming perfect mathematical balance creates fun gameplay
  #### **Why**
Perfect balance often means no decisions matter. Imbalance creates metagame, discovery, and drama. Players enjoy finding "the good stuff."
  #### **Instead**
Unfair-but-fun beats balanced-but-boring. Create intentional power spikes. Rotate balance to keep meta fresh.

---
  #### **Name**
Punishing Failure, Not Teaching
  #### **Description**
Making failure painful instead of instructive
  #### **Why**
Punishment doesn't teach - it discourages. Players stop experimenting. Risk-taking dies. Game becomes "don't fail" instead of "try things."
  #### **Instead**
Quick restarts. Show what went wrong. Failure as information. Roguelikes succeed because death teaches.

---
  #### **Name**
Engagement Through Obligation
  #### **Description**
Using daily rewards, FOMO, and artificial friction to retain players
  #### **Why**
Players feel trapped, not engaged. Obligation breeds resentment. When they quit, they never return. You've made a skinner box, not a game.
  #### **Instead**
Make returning feel good, not missing feel bad. Respect player time. Let them leave wanting more, not dreading less.

---
  #### **Name**
Designing for 100% Completion
  #### **Description**
Expecting all players to see all content
  #### **Why**
Most players never finish. You're optimizing for the 5% who 100% the game. The other 95% are your real audience. Late-game content has the fewest eyes.
  #### **Instead**
Front-load quality. Best content in first 30 minutes. Every player sees the core. Completionists get volume, not quality.

---
  #### **Name**
Ignoring Playtest Data
  #### **Description**
Dismissing player feedback because "they're playing wrong"
  #### **Why**
There is no "wrong" way to play. If players consistently fail/struggle/quit at the same point, that's a design problem, not a player problem. Designer intent is invisible to players.
  #### **Instead**
Observe without judging. If many players do it, design for it. Players are always right about their experience, even if wrong about solutions.