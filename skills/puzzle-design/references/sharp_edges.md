# Puzzle Design - Sharp Edges

## Puzzle The Curse Of Knowledge

### **Id**
puzzle-the-curse-of-knowledge
### **Summary**
Designer can't unsee the solution they created
### **Severity**
critical
### **Situation**
You design a puzzle, test it yourself, and think it's fine
### **Why**
  You KNOW the solution. You can't unknow it. Every element screams "obvious"
  to you because you put it there. Players see a room of possibilities.
  You see a solved puzzle. This blindness ruins more puzzles than any other mistake.
  
  Jonathan Blow spent years on The Witness and STILL couldn't predict what
  players would find hard. Every puzzle designer faces this fundamental problem.
  
### **Solution**
  # Fresh eyes are your only salvation
  
  ## The playtesting imperative:
  - Test with people who've never seen the puzzle
  - Watch them solve it (don't play for them)
  - Note where they get stuck
  - Ask what they were thinking when stuck
  - Resist the urge to "help" them
  
  ## Multiple playtesters required:
  First tester: Finds obvious problems
  Second tester: Confirms problems weren't flukes
  Third+ testers: Reveals patterns in confusion
  
  ## The "explain it" test:
  After they solve (or give up), explain the solution.
  Their reaction tells you everything:
  - "Oh, that makes sense!" = Fair puzzle, needed tuning
  - "How was I supposed to know that?" = Unfair puzzle, redesign
  
  ## Structured observation:
  Record time to solve
  Record number of wrong attempts
  Record verbal expressions of frustration
  This data is more valuable than opinions
  
  ## The humbling truth:
  If playtesters struggle, the puzzle is wrong.
  Not the playtesters. The puzzle.
  
### **Symptoms**
  - Playtesters struggle where you thought it was obvious
  - You catch yourself saying "just look at..."
  - Solution requires noticing what you highlighted
  - Puzzle feels easy because you designed it
### **Detection Pattern**


## Puzzle Unclear Goal State

### **Id**
puzzle-unclear-goal-state
### **Summary**
Player doesn't know what "solved" looks like
### **Severity**
critical
### **Situation**
Player has tools but doesn't know what they're trying to achieve
### **Why**
  "Hmm, I can push blocks and flip switches. But... what am I trying to DO?"
  
  Without clear goal state, players have no way to work backwards.
  They can't evaluate if attempts are getting closer.
  Random experimentation replaces logical deduction.
  Frustration follows confusion.
  
### **Solution**
  # Make the goal visible and obvious
  
  ## Physical clarity:
  - Door that needs opening is visible
  - Target location is marked
  - "Success" state shown or demonstrated
  - Before/after comparison possible
  
  ## The Zelda method:
  Show the treasure chest behind bars.
  Player knows: "I need to get that chest."
  Now they're solving, not wandering.
  
  ## The Portal method:
  Exit door is always visible from start.
  Getting there is the puzzle.
  Goal is never ambiguous.
  
  ## Test for goal clarity:
  Ask playtester after 10 seconds: "What are you trying to do?"
  If they can't answer clearly, goal isn't clear.
  
  ## Exception: Meta puzzles
  Some puzzles ARE about figuring out the goal.
  These need special care--goal discovery is the puzzle.
  But even here, player needs to know that's the puzzle.
  
### **Symptoms**
  - Players ask "What am I supposed to do?"
  - Random experimentation without direction
  - Solving by accident without understanding
  - Players walk past the solution repeatedly
### **Detection Pattern**


## Puzzle Invisible Interactions

### **Id**
puzzle-invisible-interactions
### **Summary**
Interactable elements don't look interactable
### **Severity**
critical
### **Situation**
Key puzzle element blends into background or lacks visual feedback
### **Why**
  Players have learned visual language: glowing = interactive, dull = scenery.
  If your important lever looks like a random pipe, they won't try it.
  The puzzle wasn't hard. It was invisible.
  
  Worse: they might find it eventually by pixel-hunting.
  Now they'll pixel-hunt EVERYTHING. Gameplay becomes frustrating scanning.
  
### **Solution**
  # Visual hierarchy of interactivity
  
  ## Immediately obvious:
  - Different color from environment
  - Glow, shimmer, or particle effect
  - Unique shape language (round = interactive, sharp = hazard)
  - Animation draws eye (subtle movement)
  
  ## Consistent visual language:
  - All buttons look like buttons
  - All levers look like levers
  - Learned visual vocabulary persists
  
  ## Feedback confirms interactivity:
  - Hover state shows "I can interact"
  - Near interaction range shows prompt
  - Sound confirms action registered
  
  ## The contrast test:
  Screenshot your puzzle, blur it heavily.
  Can you still identify interactive elements?
  They should stand out even blurred.
  
  ## Escape room lesson:
  Physical escape rooms use: color, material, positioning, lighting
  The "puzzle" is never finding the puzzle elements.
  It's figuring out how they connect.
  
### **Symptoms**
  - Players miss key elements entirely
  - Stuck players found solution after hint "try the bookshelf"
  - Interactive elements same visual weight as decoration
  - Players resort to clicking everything
### **Detection Pattern**


## Puzzle Broken Causality

### **Id**
puzzle-broken-causality
### **Summary**
Actions don't have visible, logical effects
### **Severity**
high
### **Situation**
Button pushed here affects something far away or invisible
### **Why**
  "I pushed a button. Something happened... somewhere. I don't know what."
  
  Learning happens through cause and effect.
  If effects are invisible, players can't learn.
  They push buttons randomly hoping something works.
  When it works, they don't know why. No "aha" moment.
  
### **Solution**
  # Make cause and effect crystal clear
  
  ## Immediate feedback:
  Button press → visible door opening
  Switch flip → lights change in view
  Block placement → connected element responds
  
  ## Camera helps:
  Brief camera pan to show effect
  Picture-in-picture of remote effect
  Audio cue from direction of effect
  
  ## The chain principle:
  A → B → C is fine if:
  - Player sees A affects B
  - Player sees B affects C
  - Each link is individually clear
  
  ## Portal's brilliance:
  Portal in = portal out. You see both.
  Cause and effect are spatially connected.
  Learning is automatic.
  
  ## Test question:
  After any action, does player know what changed?
  If not, add feedback until they do.
  
### **Symptoms**
  - Players don't connect actions with results
  - Confusion about what button did
  - Solving by trial and error instead of deduction
  - Players repeat same actions expecting different results
### **Detection Pattern**


## Puzzle Difficulty Spike

### **Id**
puzzle-difficulty-spike
### **Summary**
Sudden jump in difficulty breaks player flow
### **Severity**
high
### **Situation**
Easy puzzles → suddenly brutal puzzle → easier puzzles
### **Why**
  Player was cruising. Confidence building. Then WALL.
  Not a gradual increase--a cliff.
  They haven't built skills for this jump.
  Either they grind in frustration or quit entirely.
  
  Often caused by designer blind spot: puzzle seems "medium" because
  they know tricks to solve it.
  
### **Solution**
  # Smooth the difficulty curve
  
  ## Measure difficulty empirically:
  - Time to solve for playtesters
  - Number of hints requested
  - Frustration expressions observed
  - Order them by actual difficulty, not assumed
  
  ## Fill the gaps:
  If puzzles are 1, 2, 3, 8, 4, 5...
  That 8 needs to move or needs bridge puzzles before it.
  
  ## The witness method:
  Jonathan Blow's difficulty ordering process:
  - Create more puzzles than needed
  - Test all puzzles with fresh players
  - Order by actual measured difficulty
  - Cut puzzles that create gaps
  
  ## Escape room industry standard:
  Difficulty should ramp: 20% easy, 60% medium, 20% hard
  Never start with hard
  End with satisfaction, not frustration
  
  ## Red flags in playtesting:
  - Sudden increase in solve time
  - Players seeking hints on specific puzzle
  - Players stopping entirely at specific puzzle
  - Players describing puzzle as "unfair"
  
### **Symptoms**
  - One puzzle takes 10x longer than neighbors
  - Players cite specific puzzle as rage-quit point
  - Hints requested spike at certain puzzle
  - Players describe sudden "wall"
### **Detection Pattern**


## Puzzle Too Many Red Herrings

### **Id**
puzzle-too-many-red-herrings
### **Summary**
Fake clues overwhelm real clues
### **Severity**
high
### **Situation**
Red herrings and decoration drown out actual puzzle elements
### **Why**
  "I spent 20 minutes on that painting. Turns out it was just decoration."
  
  Red herrings can add depth. Too many create noise.
  Players can't tell signal from noise.
  Everything becomes suspicious.
  Nothing feels like a reliable clue.
  
### **Solution**
  # Signal to noise ratio
  
  ## The 1:1 maximum:
  For every red herring, have at least one real clue.
  If players are drowning in false leads, cut red herrings.
  
  ## Distinguish decoration from puzzles:
  - Decoration: Consistent style, blends in, no highlights
  - Puzzle elements: Visual distinction, interactive affordances
  
  ## Red herring rules:
  - Should be quickly dismissable with investigation
  - Should not require extensive testing to rule out
  - Should not be more interesting than real clues
  - Should not be required to notice the real clue
  
  ## Escape room wisdom:
  Professionals have moved AWAY from red herrings.
  Modern best practice: Everything in the room matters.
  If it's in the puzzle space, it's part of a puzzle.
  
  ## Testing for red herring overload:
  If players spend time on non-puzzle elements,
  either make those elements puzzles or remove them.
  
### **Symptoms**
  - Players fixate on decorative elements
  - High noise-to-signal ratio in player investigation
  - Frustration when "obvious" clue was decoration
  - Players distrust real clues thinking they're fake
### **Detection Pattern**


## Puzzle Information Outside Game

### **Id**
puzzle-information-outside-game
### **Summary**
Solution requires knowledge players may not have
### **Severity**
high
### **Situation**
Puzzle assumes knowledge of history, culture, or specialized domains
### **Why**
  "This puzzle requires knowing the NATO phonetic alphabet."
  "You need to recognize this painting from 1820."
  "The code is based on baseball statistics."
  
  Some players know this. Most don't.
  Those who know feel lucky, not clever.
  Those who don't feel cheated, not challenged.
  
### **Solution**
  # Self-contained puzzle worlds
  
  ## The rule:
  Every piece of information needed to solve the puzzle
  must be present within the game.
  
  ## If specialized knowledge is required:
  Provide it. Morse code chart on the wall.
  Reference book on the shelf.
  NPC who explains the history.
  
  ## Cultural assumptions to avoid:
  - Historical dates and events
  - Religious or mythological references
  - Pop culture from specific era/region
  - Scientific notation or formulas
  - Sports statistics
  - Language-specific wordplay
  
  ## The localization test:
  Could this puzzle be solved by someone from
  a different culture with the information provided?
  If not, either change the puzzle or add the information.
  
  ## Exception: Educational games
  If teaching history IS the point, fine.
  But the game should teach it first, test it second.
  
### **Symptoms**
  - Solutions require knowledge not in game
  - Success correlates with player background, not skill
  - Certain player demographics consistently fail
  - "I had to Google it" in playtester feedback
### **Detection Pattern**


## Puzzle Combinatorial Explosion

### **Id**
puzzle-combinatorial-explosion
### **Summary**
Too many possible combinations to try systematically
### **Severity**
high
### **Situation**
Puzzle with many dials, buttons, or options creates thousands of combinations
### **Why**
  4 dials with 10 positions each = 10,000 combinations.
  At 3 seconds each = 8+ hours of brute force.
  Players can't exhaustively try everything.
  But puzzle doesn't give enough clues to narrow it down.
  They either guess lucky or give up.
  
### **Solution**
  # Design for deduction, not exhaustion
  
  ## Constrain the possibility space:
  - Each clue eliminates possibilities
  - Working through clues narrows to single solution
  - Brute force is unnecessary if logic is followed
  
  ## The math check:
  Calculate total combinations possible.
  Count clues that reduce possibilities.
  Result should be deterministic, not probabilistic.
  
  ## Multi-lock principle:
  Large combinations should be split.
  10,000 possibilities → 4 puzzles of 10 each.
  Each sub-puzzle is solvable.
  Final combination is assembly of solved parts.
  
  ## Feedback on partial correctness:
  If 3 of 4 dials are right, indicate progress.
  "You're getting warmer" without "the answer is X."
  Mastermind-style feedback.
  
  ## The brute force test:
  If playtester starts trying random combinations,
  they don't understand the logic. Fix the logic, not them.
  
### **Symptoms**
  - Players try random combinations
  - Correct by luck, not logic
  - No clear path from clues to solution
  - Solve time is random, not skill-based
### **Detection Pattern**


## Puzzle Softlock Trap

### **Id**
puzzle-softlock-trap
### **Summary**
Player can get into an unsolvable state without knowing
### **Severity**
critical
### **Situation**
Resource used up, item consumed, or state changed that makes puzzle unsolvable
### **Why**
  "Wait, I needed that key for THIS door? I used it on the other one."
  
  Player is now stuck forever. They don't know they're stuck.
  They keep trying. Eventually realize. Have to restart.
  ALL progress lost. Trust destroyed. Game potentially uninstalled.
  
### **Solution**
  # Eliminate softlock possibilities
  
  ## The softlock test:
  At every decision point, can the player still win?
  If any choice leads to unwinnable state, fix it.
  
  ## Prevention strategies:
  - Keys work on all valid doors (or return if used wrong)
  - Consumables can be re-obtained
  - State changes can be undone
  - Resources respawn if depleted wrongly
  
  ## If softlock is possible, warn:
  Clear "point of no return" messaging
  Auto-save before irreversible choices
  "Are you sure?" for potentially locking actions
  
  ## The save system protection:
  Multiple auto-save slots
  Saves at puzzle start, not just checkpoint
  Player can backtrack to earlier saves
  
  ## Testing requirement:
  Playtesters should try to break the game.
  "What's the worst choice I could make here?"
  Every discovered softlock must be fixed.
  
### **Symptoms**
  - Players stuck but don't know why
  - Required item missing with no way to get another
  - Irreversible state change blocks progress
  - "I have to start over" moments
### **Detection Pattern**


## Puzzle Solution Ambiguity

### **Id**
puzzle-solution-ambiguity
### **Summary**
Multiple interpretations of what constitutes the solution
### **Severity**
medium
### **Situation**
Player does something that should work but doesn't count
### **Why**
  "I did exactly what was asked! Why didn't it work?"
  
  Player solved the puzzle their way. Game only accepts one way.
  Their solution was valid. Game invalidated their thinking.
  Feels arbitrary. Feels unfair. Trust broken.
  
### **Solution**
  # Accept all valid solutions
  
  ## Design for behavior, not sequence:
  If the puzzle is "light all the torches,"
  accept any order, any method.
  
  ## Anticipate player creativity:
  Players will find solutions you didn't expect.
  If it achieves the goal, accept it.
  If you don't want that solution, design it out.
  
  ## The "clever player" test:
  What would a creative player try?
  Would it work in real life?
  If yes, it should work in game.
  
  ## Escape room lesson:
  Physical rooms must accept physical solutions.
  "I solved it a different way" is valid if goal is met.
  Digital games should be equally flexible.
  
  ## If single solution is required:
  Make constraints crystal clear.
  "Connect the circuit using ONLY these paths."
  Unallowed approaches should be visibly impossible.
  
### **Symptoms**
  - Playtesters solve it "wrong" but logically
  - Frustration at "arbitrary" restrictions
  - Solution works in player's head but not in game
  - Multiple valid interpretations of puzzle goal
### **Detection Pattern**


## Puzzle Unclear Feedback

### **Id**
puzzle-unclear-feedback
### **Summary**
Player can't tell if their solution attempt is wrong or incomplete
### **Severity**
medium
### **Situation**
Input accepted but no feedback on correctness until final step
### **Why**
  Player enters: 3-7-5-2
  Answer is: 3-7-5-1
  Game says: "Wrong."
  
  Were they completely wrong? One digit off? Wrong format?
  They can't improve without feedback.
  Next attempt is a guess, not an improvement.
  
### **Solution**
  # Feedback at every step
  
  ## Immediate feedback options:
  - Green/red per digit (if appropriate)
  - "X correct, Y in wrong position" (Mastermind)
  - "Getting warmer/colder" indicator
  - Sound change as approaching solution
  
  ## Progressive confirmation:
  First step right → something clicks
  Second step right → something else responds
  Building toward final confirmation
  
  ## The silent failure problem:
  No feedback = no learning.
  Even "wrong" is better than nothing.
  Best is "wrong because X" or "X is right, Y is wrong."
  
  ## Escape room practice:
  Game masters provide "nudges" based on player state.
  Digital games need automated equivalent.
  Feedback system should feel like helpful GM.
  
### **Symptoms**
  - Players don't know why they failed
  - Same wrong attempts repeated
  - Frustration with opaque failure states
  - Success feels random, not logical
### **Detection Pattern**


## Puzzle Timing On Thinking

### **Id**
puzzle-timing-on-thinking
### **Summary**
Time pressure applied to puzzles requiring contemplation
### **Severity**
medium
### **Situation**
Countdown timer on logic puzzle that needs careful thought
### **Why**
  Logic puzzles need thinking time.
  Timer creates anxiety. Anxiety blocks thinking.
  Player rushes, makes mistakes, fails.
  Failure came from timer, not puzzle difficulty.
  
  They can't practice their logic faster.
  They can only solve correctly or solve rushed-wrong.
  
### **Solution**
  # Right pressure for right puzzle type
  
  ## Timing is for execution, not cognition:
  - Time: Physical dexterity challenges
  - Time: Reaction-based puzzles
  - Time: After puzzle is understood
  
  - No time: Logic deduction
  - No time: Pattern recognition
  - No time: First encounter with mechanic
  
  ## If time matters, decouple thinking and execution:
  "Here's the puzzle. Understand it." (No timer)
  "Now execute your solution." (Timer starts)
  
  ## Pause-friendly design:
  If timer must exist, allow pause.
  Pausing doesn't give advantage--thinking does.
  Let players think without pressure.
  
  ## Escape room nuance:
  60-minute rooms have time, but time is generous.
  Pressure is background motivation, not immediate stress.
  Panic kicks in only in final minutes, when most should be solved.
  
### **Symptoms**
  - Players fail from rushing, not misunderstanding
  - Correct solutions entered wrong under pressure
  - Timer anxiety prevents clear thinking
  - Players remember stress, not fun
### **Detection Pattern**


## Puzzle Accessibility Oversight

### **Id**
puzzle-accessibility-oversight
### **Summary**
Puzzle design excludes players with disabilities
### **Severity**
medium
### **Situation**
Color-based puzzle unplayable for colorblind players
### **Why**
  ~8% of men are colorblind.
  Pure red-green puzzle excludes them entirely.
  Hearing-impaired players miss audio-based puzzles.
  Motor-impaired players struggle with execution-heavy puzzles.
  
  Accessibility isn't optional--it's part of good design.
  
### **Solution**
  # Design for all players
  
  ## Color puzzles:
  - Never use color ONLY (add shapes, patterns, symbols)
  - Test with colorblind simulator
  - Provide colorblind mode with alternative visual language
  
  ## Audio puzzles:
  - Provide visual alternative (subtitles, visual meter)
  - Audio cues should also have visual component
  - Test with sound off--puzzle should still be solvable
  
  ## Motor challenges:
  - Provide assist options for timing-based puzzles
  - Allow difficulty adjustment for execution
  - Keyboard alternatives for mouse-required actions
  
  ## Cognitive accessibility:
  - Skip options for puzzles (with optional penalty)
  - Hint system that actually helps
  - No time pressure on thinking puzzles
  
  ## The CVAA test:
  Could a deaf person solve audio puzzles?
  Could a blind person solve with screen reader?
  Could motor-impaired person complete action puzzles?
  Build alternatives into design.
  
### **Symptoms**
  - Certain player groups can't complete specific puzzles
  - No alternative solve paths for differently-abled
  - Reliance on single sense or ability
  - Complaints about accessibility from players
### **Detection Pattern**
