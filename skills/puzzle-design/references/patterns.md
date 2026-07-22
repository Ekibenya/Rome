# Puzzle Design

## Patterns


---
  #### **Name**
Introduce, Twist, Combine (ITC)
  #### **Description**
The core framework for teaching puzzle mechanics progressively
  #### **When**
Designing a sequence of puzzles that build on each other
  #### **Example**
    # The Portal 2 method (and most great puzzle games):
    
    ## 1. INTRODUCE - Teach one mechanic in isolation
    Puzzle 1: "Here's a button. Step on it to open the door."
    - No fail state, no complexity
    - Player cannot NOT learn the mechanic
    - Make it feel clever even though it's trivial
    
    ## 2. TWIST - Show unexpected depth of the mechanic
    Puzzle 2: "The button opens the door, but it's across a gap."
    - Now player must think about the button differently
    - Still only one mechanic, but used creatively
    - Often includes an "aha" about the mechanic's properties
    
    Puzzle 3: "Weighted cube stays on button when you step off."
    - Introduces tool that extends the mechanic
    - Still building on the same core concept
    
    ## 3. COMBINE - Intersect with previously learned mechanics
    Puzzle 4: "Use portal to get cube across gap to button."
    - Two mechanics the player already knows
    - Difficulty comes from combination, not newness
    - Players feel smart for making the connection
    
    ## Key insight:
    Players should feel they're getting smarter, not that puzzles
    are getting harder. The difficulty comes from creative
    application, not from new rules they don't understand.
    

---
  #### **Name**
The One New Thing Rule
  #### **Description**
Never introduce more than one new concept per puzzle
  #### **When**
Designing puzzle progression, encountering teaching failures
  #### **Example**
    # WRONG: Multiple new concepts at once
    Puzzle introduces:
    - New mechanic (light beams)
    - New tool (mirrors)
    - New environment hazard (darkness kills)
    - New enemy type (light-sensitive creatures)
    
    Player doesn't know what they don't understand.
    They can't isolate which piece they're missing.
    Frustration follows.
    
    # RIGHT: One thing at a time
    Puzzle 1: Light beam crosses room. Walk through it.
      - Teaches: Light beams exist (no puzzle yet)
    
    Puzzle 2: Light beam blocked. Push block to unblock it.
      - Teaches: Light can be blocked
      - Puzzle: Simple obstacle removal
    
    Puzzle 3: Light beam needs redirecting. Here's a mirror.
      - Teaches: Mirrors redirect light
      - Puzzle: Point mirror at target
    
    Puzzle 4: Multiple mirrors needed.
      - No new concepts--just depth
      - Puzzle: Chain of mirrors
    
    # The test:
    If a playtester fails, can you identify EXACTLY which
    concept they didn't understand? If not, you introduced
    too many things at once.
    

---
  #### **Name**
Visual Language Consistency
  #### **Description**
Use consistent visual cues that players learn to read
  #### **When**
Designing puzzle elements, creating new mechanics
  #### **Example**
    # From The Witness:
    - Black = line must pass through
    - White = line must not pass through
    - Colored squares = separation rules
    - Same symbol = same rule, ALWAYS
    
    Once a player learns what a symbol means, it NEVER
    means something different. Trust is everything.
    
    # Practical visual language:
    - Interactable objects glow/highlight
    - Same color = same type (red buttons = danger, green = go)
    - Consistent iconography (gear = settings everywhere)
    - Shape language (round = friendly, sharp = danger)
    
    # Building visual vocabulary:
    1. First appearance: Obvious, isolated, harmless
       "Here's a blue crystal. It glows when you approach."
    
    2. Second appearance: Simple function
       "Blue crystal powers this door."
    
    3. Third appearance: Player recognizes instantly
       "I see blue crystals--I know what they do."
    
    # The rule:
    If something looks the same, it works the same.
    If it works differently, it must look different.
    

---
  #### **Name**
Undo Without Punishment
  #### **Description**
Let players experiment freely without harsh consequences
  #### **When**
Designing puzzle reset mechanisms, handling failure states
  #### **Example**
    # The principle:
    Puzzles are about thinking, not execution.
    Punishing wrong attempts discourages experimentation.
    Experimentation is how players learn.
    
    # Implementation:
    
    ## Instant reset
    - Button press resets puzzle state immediately
    - No "are you sure?" for quick resets
    - Maintain player position if possible (don't make them walk back)
    
    ## Partial undo
    - Step back one move at a time
    - Shows cause and effect clearly
    - Braid's time rewind: any action can be undone
    
    ## Soft failure
    - "Wrong" doesn't mean "dead"
    - Puzzle resets, not the whole level
    - No loading screens for puzzle failures
    
    ## Checkpoint generosity
    - Save after each solved puzzle
    - Let players leave and return
    - Remember partial progress where logical
    
    # The anti-pattern:
    - Death from puzzle failure (requires level restart)
    - Long animations before retry
    - Resetting unrelated progress
    - "Gotcha" puzzles with hidden death
    
    # Remember:
    The player should fear being stuck, not being dead.
    

---
  #### **Name**
Parallel Puzzle Paths
  #### **Description**
Offer multiple puzzles so players can unstick themselves
  #### **When**
Designing puzzle progression, preventing hard blocks
  #### **Example**
    # The problem with linear puzzles:
    One stuck puzzle = stuck player = rage quit
    
    # The solution:
    
    ## Hub structure
    Central area with 3-5 puzzles accessible
    Player chooses which to attempt
    Solving any advances the game
    
    ## Branching paths
    Main path splits into A and B
    Both reconverge later
    Player needs to solve ONE, not both
    (They'll come back for the other)
    
    ## Side content
    Optional puzzles for extra rewards
    Harder than main path (for enthusiasts)
    Never required--always optional
    
    ## The Witness approach:
    11 areas, each with 7+ puzzles
    Solving ~80% of any area counts
    Stuck on one? Do another.
    
    ## Escape room approach:
    3 puzzles running simultaneously
    Each gives piece of final puzzle
    Team naturally splits by interest/skill
    
    # Key insight:
    Players have different puzzle strengths.
    Some excel at logic, others at spatial.
    Parallel paths let them play to strengths
    while building skills in weak areas.
    

---
  #### **Name**
Teaching and Testing Separation
  #### **Description**
Never test a mechanic in the same puzzle where you teach it
  #### **When**
Designing puzzle difficulty, pacing tutorial sections
  #### **Example**
    # WRONG: Teach and test simultaneously
    First puzzle with new mechanic:
    - Introduces light redirection
    - Requires precise timing
    - Enemies present
    - Can die and restart
    
    Player doesn't know if they failed because:
    - They don't understand redirection
    - Their timing was off
    - Enemies distracted them
    - Something else entirely
    
    # RIGHT: Separated teaching and testing
    
    ## Teaching puzzle (cannot fail):
    "Redirect this beam to the target."
    - Only one thing to do
    - Beam is already almost pointed right
    - Target lights up on success
    - No time pressure, no enemies, no death
    
    ## Practice puzzle (low stakes):
    "Redirect beam, but now target is farther."
    - Same mechanic, slightly harder
    - Still no pressure
    - Player gets comfortable
    
    ## Testing puzzle (real challenge):
    "Redirect multiple beams under time pressure."
    - Now we add complexity
    - Player already knows mechanic
    - Challenge comes from application, not learning
    
    # The guideline:
    Teaching puzzles: Players learn mechanics
    Testing puzzles: Players apply mechanics
    Never both at once.
    

---
  #### **Name**
Progressive Hint System
  #### **Description**
Hints that nudge toward discovery rather than revealing solutions
  #### **When**
Designing hint mechanics, help systems
  #### **Example**
    # Hint levels (escape room industry standard):
    
    ## Level 1: Confirmation of direction
    "You're on the right track with the symbols."
    - Validates player's current approach
    - Doesn't reveal anything new
    - Reduces second-guessing
    
    ## Level 2: Focus attention
    "Have you noticed anything about the paintings?"
    - Points to relevant area/element
    - Doesn't explain what to do
    - Player still has "aha" moment
    
    ## Level 3: Partial solution
    "The first symbol is related to the sun painting."
    - Reveals one piece of the answer
    - Demonstrates the logic pattern
    - Player applies pattern to rest
    
    ## Level 4: Full solution (emergency only)
    "The code is sun-moon-star based on the paintings."
    - Complete answer
    - Used only to prevent rage-quit
    - Should feel like last resort
    
    # Implementation:
    - Timed hints: Offer after N minutes stuck
    - Requested hints: Player asks for help
    - Environmental hints: Subtle clues in world
    - NPC hints: Characters observe and comment
    
    # The goal:
    Player should feel they solved it, even with hints.
    Best hints make player say "Oh! I should have seen that!"
    not "Okay, now I know the answer."
    

---
  #### **Name**
The Funnel
  #### **Description**
Start wide, narrow to solution, like Portal's puzzle design
  #### **When**
Designing puzzle spaces, guiding player attention
  #### **Example**
    # Portal's genius: Physical space guides mental space
    
    ## Wide entrance
    Player enters large room
    Many things to look at
    Seems overwhelming at first
    
    ## Natural focus
    Room shape guides eye
    Key elements more prominent
    Distractions eliminated gradually
    
    ## Narrow solution
    By the time player reaches solution area,
    they've naturally noticed the key elements
    Solution feels discoverable, not hidden
    
    # Practical application:
    
    ## Visual funnel:
    - Brighter lighting on important elements
    - Lines in environment point toward solution
    - Color coding groups related elements
    - Empty space draws attention to contents
    
    ## Cognitive funnel:
    - Early experiments rule out wrong approaches
    - Failed attempts teach something useful
    - Each attempt narrows possibility space
    - Solution emerges from elimination
    
    ## Physical funnel (escape rooms):
    - Arrange elements so discoveries lead to next clue
    - Physical path guides logical path
    - Reveal elements in designed order
    - Natural flow from puzzle to puzzle
    

---
  #### **Name**
Puzzle Dependency Mapping
  #### **Description**
Design which puzzles unlock which, avoiding frustration
  #### **When**
Ordering puzzles, designing game flow
  #### **Example**
    # The dependency graph:
    
    Puzzle A (teaches mechanic 1)
        ↓
    Puzzle B (uses mechanic 1)
        ↓
    Puzzle C (teaches mechanic 2)
        ↓
    Puzzle D (combines mechanics 1 + 2)
    
    # Rules for dependencies:
    
    ## 1. No hidden prerequisites
    If puzzle D requires knowledge from puzzle B,
    puzzle B must be required before D.
    Don't assume player did optional content.
    
    ## 2. Recognize skill progression
    Puzzle B should be easier than puzzle C
    if solving B is required for C.
    Don't gate behind harder content.
    
    ## 3. Provide parallel branches
    A → B → D
    A → C → D
    Player can do B OR C first.
    Unsticking path always available.
    
    ## 4. Clear gating
    Locked door clearly requires key.
    Player knows what they're looking for.
    No invisible dependencies.
    
    # Escape room approach:
    Map puzzles to a graph before building
    Identify critical path (minimum solves to win)
    Ensure no bottleneck depends on single puzzle
    Playtest the dependency order explicitly
    

---
  #### **Name**
Physical vs Logic vs Meta Puzzles
  #### **Description**
Different puzzle types require different design approaches
  #### **When**
Choosing puzzle types, ensuring variety
  #### **Example**
    # Physical puzzles (execution-based):
    - Pushing blocks
    - Timing jumps
    - Aiming projectiles
    
    Design considerations:
    - Skill floor: Everyone should be able to attempt
    - Skill ceiling: Masters can do it faster/cleaner
    - Undo: Must be easy to reset
    - Accessibility: Consider motor impairments
    
    Example: Portal 2's gel puzzles
    
    # Logic puzzles (deduction-based):
    - Sudoku-style
    - Pattern recognition
    - Sequence puzzles
    
    Design considerations:
    - All information available (no hidden data)
    - Deducible, not guessable
    - Working backwards should verify solution
    - Paper test: Can player solve on paper?
    
    Example: The Witness's line puzzles
    
    # Meta puzzles (rule-changing):
    - Mechanics that change meaning
    - Puzzles about the puzzle
    - Breaking the fourth wall
    
    Design considerations:
    - Establish normal rules first
    - Subversion must be learnable
    - Don't invalidate earlier learning
    - The twist should feel fair in hindsight
    
    Example: Baba Is You's rule manipulation
    
    # Mix for variety:
    A great puzzle game uses all three,
    paced to prevent fatigue.
    Logic heavy? Add physical break.
    Execution section? Follow with observation puzzle.
    

---
  #### **Name**
The Inevitable Solution
  #### **Description**
Solutions should feel like the only possible answer in hindsight
  #### **When**
Designing solutions, testing for fairness
  #### **Example**
    # From Jonathan Blow (The Witness):
    "A puzzle is not about hiding the solution.
     It's about hiding the PATH to the solution."
    
    # The test of inevitability:
    After solving, player should feel:
    "Of course! It couldn't be anything else!"
    NOT:
    "I guess that works too."
    
    # Designing for inevitability:
    
    ## 1. Single solution (often)
    Multiple solutions dilute the "aha"
    One elegant solution feels more satisfying
    Exception: Multiple valid approaches to same answer
    
    ## 2. Clean logic
    Each step follows from previous
    No leaps of faith required
    No "try everything until something works"
    
    ## 3. Foreshadowing
    The solution elements are visible from start
    Player has seen everything they need
    Nothing hidden, just unrecognized
    
    ## 4. Verification
    Solving should confirm understanding
    "I see why this works, not just that it works"
    The mechanism is now understood
    
    # The escape room standard:
    If 80% of teams solve it the same way,
    it's a good puzzle.
    If teams stumble onto it randomly,
    it's a bad puzzle.
    

## Anti-Patterns


---
  #### **Name**
Moon Logic
  #### **Description**
Solutions that only make sense in the designer's head
  #### **Why**
    Classic adventure game failure. "Use rubber chicken with pulley to cross ravine."
    Players can't deduce the solution. They resort to trying everything with everything.
    The "aha" becomes "what the hell" and trust in the game is destroyed.
    
  #### **Instead**
    Every solution must be deducible from available information.
    Test by asking: "What would a reasonable person try?"
    If your solution isn't in their top 5 attempts, redesign.
    

---
  #### **Name**
Pixel Hunting
  #### **Description**
Critical puzzle elements hidden or too small to notice
  #### **Why**
    Not testing observation--testing patience. Players scan every pixel desperately.
    When they find the hidden thing, they feel stupid, not smart.
    The puzzle was about finding the puzzle, not solving it.
    
  #### **Instead**
    Important elements should be noticeable. Use visual hierarchy.
    Puzzle is about figuring out what to DO, not what to SEE.
    Test by asking: "Did playtesters notice this element?"
    

---
  #### **Name**
Required Outside Knowledge
  #### **Description**
Puzzles requiring knowledge not provided in the game
  #### **Why**
    "You need to know Morse code to solve this."
    "The clue references a 1970s movie."
    Not everyone knows these things. Not fair. Not fun.
    The player who happens to know something feels lucky, not clever.
    
  #### **Instead**
    Teach everything needed within the game.
    If Morse code is required, a Morse chart is visible nearby.
    Cultural references are decoration, never required.
    

---
  #### **Name**
Guess the Verb
  #### **Description**
Player knows what to do but not how to express it
  #### **Why**
    "I need to break the window." Tries punch, hit, smash, attack, throw, kick...
    Game only accepts "BREAK WINDOW WITH ROCK"
    Failure of interface, not puzzle design.
    
  #### **Instead**
    Limited, clear interaction vocabulary.
    If something can be broken, one "break" action works.
    Visual feedback for "almost right" attempts.
    

---
  #### **Name**
Difficulty Spikes
  #### **Description**
Sudden jumps in difficulty without progression
  #### **Why**
    Puzzles 1-5 are easy. Puzzle 6 is brutally hard.
    Player hasn't developed skills needed.
    Feels like punishment, not challenge.
    
  #### **Instead**
    Graph your difficulty curve. Every puzzle slightly harder than last.
    Test by solving in order--does each feel like natural next step?
    Hard puzzles should be optional or have hints available.
    

---
  #### **Name**
Teaching While Testing
  #### **Description**
First encounter with mechanic is also the hard puzzle
  #### **Why**
    Player fails. Was it because they don't understand the mechanic?
    Or because the puzzle was hard? They can't tell.
    Frustration comes from not knowing what you don't know.
    
  #### **Instead**
    Teaching puzzles: Can't fail, learn mechanic
    Testing puzzles: Apply known mechanic under pressure
    Never combine first introduction with real challenge.
    

---
  #### **Name**
Punishment for Experimentation
  #### **Description**
Wrong attempts result in death, long resets, or lost progress
  #### **Why**
    Puzzles are solved through experimentation.
    If wrong guesses are punished, players stop experimenting.
    They look up solutions instead of playing.
    
  #### **Instead**
    Quick reset. No death. Minimal setback.
    Wrong attempts teach something useful.
    Make failure a learning moment, not a punishment.
    

---
  #### **Name**
Linear Puzzle Blocking
  #### **Description**
Single puzzle blocks all progress
  #### **Why**
    One puzzle player can't solve = entire game stuck.
    Different players struggle with different puzzle types.
    Rage quit is often the result.
    
  #### **Instead**
    Multiple puzzles available at once.
    Skip mechanic (with optional penalty).
    Hint system that actually helps.
    Parallel paths through content.
    

---
  #### **Name**
The Unfair Gotcha
  #### **Description**
Puzzle that tricks player with withheld information
  #### **Why**
    "Ha! The floor was a pressure plate the whole time!"
    Player couldn't have known. Didn't solve it--fell into it.
    Feels like the game cheated, not like clever design.
    
  #### **Instead**
    Foreshadowing, not hiding.
    The floor WAS visible as a pressure plate.
    Player should smack forehead: "I should have seen that!"
    

---
  #### **Name**
Timer Anxiety
  #### **Description**
Time pressure on puzzles that require thinking
  #### **Why**
    Puzzles require thought. Time pressure prevents thought.
    Player rushes, makes mistakes, feels stupid.
    Stress replaces the satisfaction of solving.
    
  #### **Instead**
    If time matters, make it visible and generous.
    Pause timer during "aha" moments.
    Or: Remove timer entirely from think-heavy puzzles.
    Save time pressure for execution puzzles.
    