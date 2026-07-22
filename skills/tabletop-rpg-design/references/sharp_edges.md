# Tabletop Rpg Design - Sharp Edges

## Human Probability Intuition Is Wrong

### **Id**
probability-intuition-failure
### **Severity**
critical
### **Situation**
  Designer creates mechanic thinking "33% seems reasonable for difficult tasks."
  Playtesters report success rates feel off. Investigations reveal fundamental
  misunderstanding of probability psychology.
  
### **Why**
  Humans are terrible at intuiting probability. A 70% success rate FEELS like 50%.
  We overweight failures and remember them more vividly. Dice don't know they
  "should" succeed eventually. Streaks happen and feel rigged.
  
  Key misunderstandings:
  - "Due": Players expect success after multiple failures (gambler's fallacy)
  - "Should": 80% success over 100 rolls includes runs of 5+ failures
  - "Feels bad": 70% success means 30% of moments are disappointment
  - "Swingy": d20 variance hides competence more than designers expect
  
  Real numbers that match intuition:
  - 85%+ feels "reliable" to players
  - 50% feels like "coin flip chaos"
  - 30% feels like "almost never works"
  - "Difficult" tasks at 40% success feel PUNISHING
  
### **Solution**
  Design for FEEL, not mathematical elegance:
  
  # Test your mechanics at a table, not in spreadsheets
  # What feels good:
  - Easy tasks: 95%+ (players get mad at 1-in-20 fails on "easy")
  - Standard tasks: 75-85% (mostly succeed, occasionally interesting failure)
  - Hard tasks: 60-70% (tense, meaningful risk)
  - Very hard tasks: 40-50% (feel like long shots)
  - Near impossible: 20-30% (miracle territory)
  
  # Give players agency over variance
  - Advantage/disadvantage for tactical play
  - Resources that ensure success (Stress in BitD)
  - "Take 10" or "working carefully" for low-stakes rolls
  
  # Frame failure expectations
  - "The dagger of truth succeeds 33% of the time, but reveals something useful even on failure" reframes the same odds.
  
### **Symptoms**
  - Playtesters say skills feel useless even with decent odds
  - Players hoard limited resources because failure feels inevitable
  - Crit-fishing becomes dominant strategy
  - Player frustration about character concept viability
### **Detection Pattern**
success.*[0-3][0-9]%|target.*1[5-9].*d20|difficult.*DC.*(15|16|17)

## Modifier Stacking Creates Hidden Complexity

### **Id**
hidden-complexity-explosion
### **Severity**
critical
### **Situation**
  Designer creates elegant base mechanic (2d6+stat). Then adds situational
  modifiers. Players at the table spend 2 minutes calculating before each roll.
  
### **Why**
  Each individual modifier seems reasonable:
  - +1 for high ground? Sure.
  - +2 for flanking? Obvious.
  - -2 for darkness? Makes sense.
  - +1d6 for blessed weapon? Flavorful.
  
  But modifiers MULTIPLY, they don't add:
  - 4 possible modifiers = 16 combinations to check
  - 6 possible modifiers = 64 combinations
  - 8 possible modifiers = 256 combinations
  
  Each roll becomes: "Wait, do I have... high ground? Am I flanking?
  Is it dark? Is my weapon blessed? Did the bard give me inspiration?
  Am I exhausted? Is the enemy prone? What was my skill again?"
  
### **Solution**
  MAXIMUM 3 modifier sources per roll:
  
  # Blades in the Dark approach:
  1. Base dice pool (from rating)
  2. +/- 1d from position/factors
  3. Optional: Push yourself, devil's bargain, assist
  
  # D&D 5e Advantage approach:
  - All situational modifiers → Advantage OR Disadvantage
  - They cancel out, no stacking
  - "You have advantage" = done
  
  # Bounded accuracy:
  - Modifiers cap at +/- 5 regardless of sources
  - Players don't need to count everything
  
  # Design rule:
  IF modifier calculation takes > 10 seconds, the system is too complex.
  
### **Symptoms**
  - Rolls take longer than actions
  - Players asking "wait, does X apply?"
  - Cheat sheets for modifier stacking
  - Rules lawyers dominating table time
  - New players feeling overwhelmed
### **Detection Pattern**
\+[0-9].*\+[0-9].*\+[0-9]|modifier.*stack|cumulative.*bonus

## Special Cases Accumulate Into Incoherence

### **Id**
special-case-proliferation
### **Severity**
high
### **Situation**
  Designer wants to add flavor to different weapons. Creates unique rules for
  swords, axes, maces, polearms, etc. Players can't remember which rule applies.
  
### **Why**
  Special cases seem flavorful in isolation:
  - "Maces ignore 2 points of armor" (sensible physics)
  - "Polearms get first strike against charges" (realistic)
  - "Daggers can be thrown as a bonus action" (cool versatility)
  - "Swords parry for +2 AC" (classic fencing)
  
  But in play:
  - Every weapon becomes an exception to look up
  - "What does my weapon do again?" every combat
  - Balance becomes impossible (one combo dominates)
  - Rule INTERACTIONS create geometric complexity
    (mace + charge + darkness + prone = 8 rules to check)
  
  The D&D 3.5 weapon table had 25+ unique properties.
  Nobody used them correctly.
  
### **Solution**
  TEMPLATES over unique rules:
  
  # Weapon Tags (like Dungeon World)
  # Small set of reusable properties
  Tags: Close, Reach, Messy, Precise, Forceful, Slow
  - Sword: Close, Precise
  - Axe: Close, Messy
  - Polearm: Reach, Slow
  - Dagger: Close, Precise, +Thrown
  
  # Players learn 6 tags, not 25 special cases
  
  # Alternative: All weapons are functionally similar
  # "A sword and an axe are both d8 damage"
  # Flavor is fiction, not mechanics
  # This is the Blades in the Dark approach
  
  # The 80/20 rule:
  If 80% of your weapons are special in different ways,
  none of them are special. Standouts need standout contrast.
  
### **Symptoms**
  - Players asking weapon rules mid-combat
  - Optimization guides ranking weapons by special rules
  - One weapon becoming best due to rule combo
  - Designer adding more rules to fix balance
### **Detection Pattern**
special.*weapon|unique.*property|exception.*when

## Long Skill Lists Create Paradox of Choice

### **Id**
skill-list-bloat
### **Severity**
high
### **Situation**
  Designer creates 40-skill list for verisimilitude. Players freeze during
  character creation. In play, obscure skills never trigger.
  
### **Why**
  "We need Acrobatics AND Athletics" seems reasonable.
  "Animal Handling separate from Nature" makes sense.
  "Craft (Basket Weaving)" exists for completeness.
  
  Result:
  - Character creation takes an hour of skill allocation
  - Analysis paralysis on every roll: "Is this Athletics or Acrobatics?"
  - 20 skills that never come up in 95% of campaigns
  - Dump skills everyone ignores (Profession: Sailor)
  - GM adjudicates edge cases constantly
  
  Pathfinder 1e: 35 skills
  D&D 5e: 18 skills
  Blades in the Dark: 12 action ratings
  Apocalypse World: 5 stats
  
  Correlation: Fewer skills = faster, more decisive play
  
### **Solution**
  # The 12-Skill Maximum Rule
  If you have more than 12 skills, you're splitting hairs.
  
  # Skill Collapse examples:
  # Instead of: Acrobatics, Athletics, Climb, Jump, Swim
  # Use: "Physical" or "Body"
  
  # Instead of: Deception, Intimidation, Persuasion, Performance
  # Use: "Influence" or "Sway"
  
  # Blades in the Dark's 12 Action Ratings:
  Attune, Command, Consort, Finesse, Hunt, Prowl,
  Skirmish, Study, Survey, Sway, Tinker, Wreck
  # Every action in the game maps to one of these.
  # No confusion about which skill applies.
  
  # Design test: Read your skill list.
  # For each skill, ask: "When did this LAST come up in a session?"
  # If you can't recall a specific instance, cut or merge it.
  
### **Symptoms**
  - Players cannot decide which skill to use
  - Skills with 0 ranks on every character sheet
  - Skill synergy rules adding complexity
  - Single-skill characters dominating identity
### **Detection Pattern**
skills:.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n.*\n

## Advancement That Doesn't Change Play

### **Id**
advancement-treadmill
### **Severity**
high
### **Situation**
  Characters level from 1 to 10. Monsters scale proportionally. The level 10
  experience is mechanically identical to level 1, just bigger numbers.
  
### **Why**
  Designers add levels because players expect progression.
  Monsters scale with levels because CR must match.
  Result: Level 10 fighter hits +15 vs AC 25 (50% hit rate)
          Level 1 fighter hits +5 vs AC 15 (50% hit rate)
  
  The numbers changed. The EXPERIENCE is identical.
  
  This is the "treadmill":
  - You run faster, but the world runs faster too
  - Nothing you gained matters against level-appropriate foes
  - Low-level threats become trivial (boring, not empowering)
  - The game ignores its own world (why are level 20 bandits guarding this?)
  
  World of Warcraft suffers this: Level 60 content is abandoned.
  Tabletop games can choose differently.
  
### **Solution**
  # Capability Expansion Over Number Inflation:
  
  Level 1: You can fight one enemy
  Level 5: You can fight multiple enemies (Cleave, etc.)
  Level 10: You can lead armies (mass combat rules unlock)
  
  # Bounded Accuracy (D&D 5e's innovation):
  - Bonuses don't scale as dramatically
  - Level 1 goblins still threaten level 10 characters (in numbers)
  - Ancient dragon is scary for mathematical reasons, not scaling
  
  # Blades in the Dark approach:
  - Crew tier provides narrative permission, not combat stats
  - Tier 3 crew can tackle Tier 3 scores
  - You don't become "stronger," you become more influential
  
  # OSR approach:
  - Levels provide HP/saves primarily
  - A level 10 fighter still rolls d20 + small modifier
  - Competence shows in survival, not domination
  
  # The Test: "Would a level 10 session PLAY differently than level 1?"
  # If it's just bigger damage vs bigger HP, you've failed.
  
### **Symptoms**
  - Players feeling no sense of growth
  - GM scaling all encounters to party level
  - Old content becoming "useless"
  - Players asking "what's the point of leveling?"
### **Detection Pattern**
\+[0-9]+.*level|scale.*CR|appropriate.*level

## Mechanics That Concentrate Spotlight

### **Id**
spotlight-hoarding-mechanics
### **Severity**
high
### **Situation**
  The Rogue has the only skill for picking locks. Every locked door means
  the Rogue acts while 4 other players watch. For 10 minutes. Repeatedly.
  
### **Why**
  Specialists make sense in fiction (the party lockpick expert).
  But unique capabilities create:
  - Spotlight hoarding (one player for one challenge type)
  - Passive waiting (others have nothing to do)
  - Fragility (if the Rogue is absent, locked doors are impossible)
  - Boredom (the Fighter player during social intrigue scenes)
  
  Traditional party roles exacerbate this:
  - Only the Cleric heals (Cleric acts every combat recovery)
  - Only the Wizard knows Arcana (Wizard player during mysteries)
  - Only the Thief finds traps (Thief player during dungeons)
  
### **Solution**
  # Shared Competence, Unique Excellence:
  
  Everyone can attempt to pick a lock at baseline.
  The Rogue does it better/faster/quieter.
  "Who wants to try?" instead of "Rogue, roll."
  
  # Group Actions (Blades in the Dark):
  One person leads, others can assist.
  Everyone participates. Best roller determines outcome.
  "The whole crew sneaks past the guards" involves everyone.
  
  # Scene Rotation Mechanics:
  Downtime activities give each character personal scenes.
  The Fighter's "training" scene, the Wizard's "research" scene.
  Mechanical prompts ensure spotlight rotation.
  
  # Multiple Solution Paths:
  Locked door? Rogue picks it, Fighter bashes it,
  Wizard finds a spell, Bard convinces someone to open it.
  No single solution path. Every character can contribute.
  
  # The 3-Player Test:
  Run your game with 3 players. Is one player passive
  for more than 10 minutes at a stretch? Fix that.
  
### **Symptoms**
  - One player acting while others watch
  - Class-specific moments excluding other players
  - Players leaving table during certain scenes
  - Session recaps focus on 1-2 characters
### **Detection Pattern**
only.*can|unique.*ability|specialist.*required

## Permadeath Without Narrative Weight

### **Id**
death-is-boring
### **Severity**
high
### **Situation**
  Character dies to random encounter. Player sits out for rest of session.
  New character appears next scene with minimal story justification.
  
### **Why**
  Character death can be meaningful:
  - Heroic sacrifice (player choice)
  - Consequence of dramatic failure (climactic moment)
  - Stakes enforcement (decisions have weight)
  
  Character death is often meaningless:
  - Random crit from random monster
  - Cascade failure (death spiral)
  - "Welp, I'm dead. Here's my new guy, Derek."
  
  Meaningless death:
  - Player excluded from play (boring)
  - No narrative impact (just a speed bump)
  - Discourages investment (why bother with backstory?)
  - Can feel punitive (bad luck → punishment)
  
### **Solution**
  # Graduated Consequences:
  
  Death should be the LAST consequence, not the first.
  1. Injury/Harm (short-term penalty)
  2. Trauma/Scars (long-term penalty)
  3. Debt/Obligation (narrative complication)
  4. Captured/Separated (removes from scene, not game)
  5. Death (final, meaningful, player-agreed)
  
  # Player Agency in Death:
  
  "You can survive, but [terrible consequence]. Or die here."
  Give the PLAYER the choice, not the dice.
  Death as player authorship, not random outcome.
  
  # The Blades in the Dark model:
  - Trauma removes characters (but they're alive)
  - Death requires specific fiction (not HP reaching zero)
  - Player can retire character instead of die
  
  # OSR model:
  - Death is common and expected
  - Character creation is 5 minutes
  - Investment is in the PARTY, not individuals
  - Replacement character enters immediately
  
  # Pick one philosophy and commit to it.
  
### **Symptoms**
  - Players detached from characters
  - Replacement characters that are basically the same
  - Sessions where someone dies early and sits out
  - Risk-averse play to avoid random death
### **Detection Pattern**
death.*0 HP|killed.*roll|die.*failure

## Initiative Systems That Kill Momentum

### **Id**
initiative-bottleneck
### **Severity**
high
### **Situation**
  Combat begins. Everyone rolls initiative. GM sorts. First player acts.
  15 minutes later, the last player in order takes their first turn.
  
### **Why**
  Traditional initiative:
  1. Everyone rolls (1-2 minutes with 6 players)
  2. GM sorts and records (1 minute)
  3. Each turn takes 2-3 minutes
  4. With 5 enemies: 10 turns to cycle
  5. 20-30 minutes before player 6 acts again
  
  Players wait. Phones come out. Engagement dies.
  "It's your turn. What do you do?" "Wait, what happened?"
  
  Furthermore:
  - Initiative modifiers create fixed turn order
  - Fast characters ALWAYS go first (boring)
  - One player always waits longest (unfun)
  
### **Solution**
  # Popcorn Initiative (13th Age):
  Current player chooses who goes next.
  "I fire my bow. Rogue, you're up!"
  Players stay engaged because they might be called.
  Last person before enemies picks first person after.
  
  # Side Initiative (B/X D&D):
  Each SIDE rolls once. Party goes or enemies go.
  Entire party acts in any order.
  "We go first - everyone, what do you do?"
  
  # Fiction-First (Dungeon World):
  No initiative roll. GM addresses whoever is in danger.
  "The orc swings at you - what do you do?"
  Spotlight moves based on fictional positioning.
  
  # Clock-Based (Blades in the Dark):
  No turns. Players describe actions, GM judges position/effect.
  Action flows narratively. "Clock fills" is the progress marker.
  
  # Speed-Based (but good):
  Fast turns (30-second timers enforced).
  Declare actions simultaneously, resolve in order.
  "I'm going to attack" / "I'm going to heal" - fast declarations.
  
  # The 2-Minute Rule:
  No single turn should take more than 2 minutes.
  If it does, your combat system is too complex.
  
### **Symptoms**
  - Players on phones during combat
  - Wakeup calls when it is finally your turn
  - Combat taking 60+ minutes
  - Players dreading initiative
### **Detection Pattern**
initiative.*roll|turn.*order|round.*sequence

## Exhaustive Equipment Lists That Slow Play

### **Id**
equipment-list-paralysis
### **Severity**
medium
### **Situation**
  Player wants to buy rope. Book has 15 types of rope across 3 pages.
  15-minute shopping trip ensues. Adventure never starts.
  
### **Why**
  Equipment lists aim for verisimilitude:
  - "We should have different types of rations"
  - "Silk rope vs hemp rope matters!"
  - "Prices for everything in the world"
  
  Result:
  - Character creation includes 30-minute shopping
  - Players ask "how much is a cow?" in every town
  - Encumbrance calculations never end
  - The game becomes a shopping simulator
  
  Nobody remembers if they bought a crowbar.
  The 10-foot pole meme exists because ITEMS DON'T MATTER
  except when they specifically do.
  
### **Solution**
  # Load/Loadout Systems:
  
  Blades in the Dark: "Light, Normal, Heavy load."
  Choose a number, then decide what's in it DURING play.
  "I check my belt. Do I have chalk?" (check a box)
  
  # Abstract Wealth:
  Resources track (Poor/Moderate/Wealthy/Rich)
  "Can I afford a horse?" → Roll Resources.
  No prices. No counting coins.
  
  # Kit-Based:
  "Explorer's Kit: rope, torches, rations, climbing gear"
  Buy the kit. Don't itemize. Done.
  
  # The Dungeon World Approach:
  Adventuring Gear: 5 uses.
  "I check my pack for a mirror."
  "Yes, you have one. Mark 1 use of Adventuring Gear."
  
  # If players are shopping for more than 5 minutes,
  # your equipment system has failed.
  
### **Symptoms**
  - Sessions starting with extended shopping
  - Players asking prices constantly
  - Arguments about encumbrance
  - Forgetting to buy critical items ruins adventures
### **Detection Pattern**
equipment.*list|price.*table|encumbrance.*weight

## Social Mechanics That Feel Like Combat

### **Id**
social-combat-failure
### **Severity**
medium
### **Situation**
  Designer creates elaborate social combat system. Players treat NPCs as HP
  bars to whittle down. Roleplay disappears. It's just "I roll Persuasion."
  
### **Why**
  Social "combat" systems assume:
  - NPCs have "social HP" (influence points, resistance)
  - Players attack with skills (Intimidate for damage)
  - Victory = HP reaches zero
  
  This:
  - Removes roleplay ("I roll to convince him")
  - Makes NPCs into obstacles, not characters
  - Creates weird fiction ("I intimidated him 6 times, he's convinced")
  - Misunderstands human interaction (it's not hit points)
  
### **Solution**
  # Disposition + Leverage (The Sprawl, etc.):
  NPCs have a stance: Hostile/Unfriendly/Neutral/Friendly/Helpful
  One roll determines if stance shifts.
  Leverage affects target difficulty.
  "She's Unfriendly. You need leverage to make her listen."
  
  # Fiction-First Social:
  What the player SAYS matters.
  A good argument changes the difficulty.
  The roll determines if delivery lands, not if the idea works.
  "That's a compelling point, roll with advantage."
  
  # NPC Wants and Fears:
  Every NPC has: Want, Fear, Weakness.
  Players discover these through roleplay.
  Knowing them gives mechanical advantage.
  "You found out he fears exposure. +2 to blackmail."
  
  # No Social HP:
  Single rolls with consequences.
  "On a failure, you've offended them. Stance worsens."
  Relationships aren't depleted, they're complicated.
  
  # The Roleplay Test:
  If your social system works identically with no acting,
  you've designed social combat. Consider if that's what you want.
  
### **Symptoms**
  - Treating NPC conversations as HP to deplete
  - Players not roleplaying, just rolling
  - NPCs feeling like obstacles
  - Social encounters feeling like grind
### **Detection Pattern**
social.*combat|influence.*points|persuasion.*damage

## Clues Locked Behind Skill Checks

### **Id**
investigation-bottleneck
### **Severity**
medium
### **Situation**
  Critical clue requires Perception check. Everyone fails. Investigation stalls.
  GM awkwardly forces the clue. Players feel stupid or cheated.
  
### **Why**
  Traditional mystery design:
  - Clue exists in location
  - Player must roll Investigate to find it
  - Failure = no clue
  
  Problems:
  - Random failure halts plot
  - GM has to improvise backup
  - Players don't feel clever (just lucky)
  - Stakes of rolls are wrong (fail = boring, not interesting)
  
### **Solution**
  # GUMSHOE System's Core Insight:
  Finding clues is automatic. The roll is for EXTRA information.
  "You find the bloodstain. Roll Forensics for details."
  Pass: "It's 3 hours old, the killer is left-handed."
  Fail: "It's blood. Human. Recent."
  Either way, investigation proceeds.
  
  # The Three-Clue Rule (Robin Laws):
  Every conclusion should have THREE paths to it.
  Miss one clue? Two others exist.
  Redundancy ensures progress.
  
  # Player-Facing Clues:
  Put the clue in the open. The INTERPRETATION is the puzzle.
  "You see the butler's shoes are muddy." (automatic)
  Players figure out what that means.
  
  # Fail Forward Investigation:
  Failure doesn't hide the clue.
  Failure adds complication (you find it, but they know you looked).
  Or time cost (you find it, but you're late to the rendezvous).
  
  # Never lock progression behind a single roll.
  
### **Symptoms**
  - Investigations stalling
  - GM handing out clues after failed rolls
  - Players feeling like dice determine story
  - Mystery solutions feeling random
### **Detection Pattern**
investigate.*check|perception.*find|hidden.*DC

## Character Death in One-Shots Removes Players

### **Id**
one-shot-character-death
### **Severity**
high
### **Situation**
  One-shot session. Hour 2 of 4. Character dies. Player sits for 2 hours
  or awkwardly introduces a new character with zero investment.
  
### **Why**
  One-shots have different death calculus:
  - No resurrection coming next session
  - No time to build new character properly
  - Player excluded from remainder of experience
  - Narrative has no time to address death meaningfully
  
  Character death works in campaigns (consequences matter, return possible).
  In one-shots, death is purely punitive.
  
### **Solution**
  # Death is Off the Table:
  Explicitly: "In this one-shot, death is not a consequence."
  Failure means capture, injury, complication - not removal.
  The story needs all protagonists for 4 hours.
  
  # Death as Endgame:
  Death only possible in climax.
  Dying in the final battle = heroic.
  Dying in hour 1 = sitting out.
  
  # Immediate Return:
  "Your ghost continues to aid the party."
  "You're unconscious but roll at disadvantage to advise."
  Mechanical presence continues even after "death."
  
  # Troupe Play:
  Each player has 2-3 characters.
  Death removes ONE character, player switches.
  Investment is distributed.
  
  # One-Shot-Specific Mechanics:
  Dread: Death = elimination, but that's the GENRE (horror).
  Everyone expects to die. The tower fall IS the drama.
  Know your game's relationship to death.
  
### **Symptoms**
  - Player sitting out of one-shot
  - New character appearing with no setup
  - Tension around death ruining fun
  - One-shots ending early due to TPK
### **Detection Pattern**
one-shot.*death|session.*character.*die