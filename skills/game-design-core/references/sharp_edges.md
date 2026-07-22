# Game Design Core - Sharp Edges

## Core Loop Afterthought

### **Id**
core-loop-afterthought
### **Summary**
Building systems before proving the core loop is fun
### **Severity**
critical
### **Situation**
Adding progression, economy, story, or polish to a game whose moment-to-moment gameplay hasn't been validated
### **Why**
  The core loop is the foundation. If shooting isn't fun, no amount of unlockable
  guns will save it. If matching isn't satisfying, progression won't matter.
  Every hour spent on meta-systems for a broken core is wasted. You cannot
  polish a rock into a diamond. Most cancelled games die here: the team builds
  outward from a core that was never proven.
  
### **Solution**
  The Gray Box Test:
  1. Build the core mechanic with programmer art
  2. No progression, no rewards, no story
  3. Play it for 10 minutes
  4. Is it fun yet?
  
  If no: iterate on the core
  If yes: now add one layer
  
  Valve's approach:
  - Orange Box prototype
  - Playtest daily
  - Core loop locked before production
  
  Ask: "Would I play this with no rewards?"
  If the answer is no, the core is broken.
  
### **Symptoms**
  - It'll be fun once we add progression
  - Core loop not playtested standalone
  - Adding features to hide core problems
  - Designer knows the game isn't fun but is "waiting for it to come together"
### **Detection Pattern**


## Feature Creep Spiral

### **Id**
feature-creep-spiral
### **Summary**
Adding features without cutting scope
### **Severity**
critical
### **Situation**
Every idea becomes a feature, no ideas are killed, scope only grows
### **Why**
  Every feature has hidden costs:
  - Implementation time
  - Testing time
  - Balancing time
  - Tutorial/teaching time
  - Maintenance time
  - Interaction with other features
  
  A game with 20 half-finished features is worse than one with 5 polished
  features. Players don't count features - they feel quality. The game that
  ships beats the game that doesn't.
  
  Sid Meier's rule: "Take out what doesn't work, not what you like."
  
### **Solution**
  The Feature Test (for every proposed feature):
  1. Does this improve the core loop?
  2. What do we cut to make time for this?
  3. Would players miss it if we shipped without it?
  
  If you can't answer #2, you can't add the feature.
  
  Scope Management:
  - Kill features publicly and celebrate cuts
  - "Feature graveyard" document
  - Every addition needs a subtraction
  - Playable builds at every stage
  
  The Three-Feature Rule:
  What are the three things players will remember?
  Everything else is negotiable.
  
### **Symptoms**
  - Feature list only grows, never shrinks
  - We'll add that too
  - No features cut in months
  - Team afraid to say no to ideas
  - Release date keeps slipping
### **Detection Pattern**


## Designing For Yourself

### **Id**
designing-for-yourself
### **Summary**
Building the game you want, not the game your audience wants
### **Severity**
critical
### **Situation**
Designer preferences override playtest data, target audience not defined
### **Why**
  You are the worst possible playtester for your own game:
  - You know every secret
  - You understand every system
  - You have hundreds of hours of practice
  - You know the designer intent
  
  Fresh players have none of this. What's obvious to you is invisible to them.
  Your muscle memory is their learning curve. Your "easy" is their "impossible."
  
### **Solution**
  The Stranger Test:
  1. Find someone who's never seen the game
  2. Sit them in front of it
  3. Say nothing
  4. Take notes on everything they struggle with
  
  Golden rules of playtest observation:
  - Never explain anything
  - Never defend any choice
  - "Why did you do that?" not "You should have..."
  - Watch hands and face, not screen
  
  Target Audience Definition:
  - Write a player persona
  - Name them, give them a life
  - Design for them, not you
  
  If you have to explain why something is fun, it isn't.
  
### **Symptoms**
  - They're playing it wrong
  - They just need to read the tutorial
  - No external playtests
  - Designer is their own primary tester
  - Target audience is "gamers"
### **Detection Pattern**


## Complexity Masquerading As Depth

### **Id**
complexity-masquerading-as-depth
### **Summary**
Adding more systems thinking it creates strategic depth
### **Severity**
high
### **Situation**
Game has many interconnected systems but decisions still feel obvious
### **Why**
  Complexity != Depth
  
  Complexity: How many things can I do?
  Depth: How many interesting decisions emerge?
  
  Chess has 6 piece types. Go has 1 stone type.
  Both have infinite depth.
  
  More systems create:
  - Cognitive overload
  - Spreadsheet gameplay
  - Analysis paralysis
  - "I'll just do what worked last time"
  
  Depth comes from interesting interactions between simple systems,
  not from system count.
  
### **Solution**
  The Simplification Test:
  1. Remove one system entirely
  2. Does the game get worse?
  3. If not, it was complexity, not depth
  
  Signs of true depth:
  - Experts play differently than beginners
  - Debates exist about "best" strategy
  - Meta evolves over time
  - High-level play looks different
  
  Design for elegant interactions:
  - Few rules, many outcomes
  - Mechanics that combine interestingly
  - Emergent complexity from simple parts
  
  Mark Rosewater's lesson from Magic:
  "Restrictions breed creativity."
  
### **Symptoms**
  - Players use guides to understand basic play
  - New players overwhelmed
  - No emergent strategies
  - Dominant strategies exist despite complexity
  - Adding more to solve "it feels shallow"
### **Detection Pattern**


## Tutorial As Bandaid

### **Id**
tutorial-as-bandaid
### **Summary**
Using tutorials to fix unintuitive design
### **Severity**
high
### **Situation**
Adding more tutorial text because players don't understand a mechanic
### **Why**
  Tutorials are a tax on player patience. Every tutorial popup is an admission
  that the design failed to communicate. Players skip tutorials. Players forget
  tutorials. Players resent tutorials.
  
  If your design needs explaining, the design is the problem.
  
  Miyamoto's observation: "Players should understand the game just by playing it."
  
### **Solution**
  The No-Tutorial Test:
  - Remove all tutorial text
  - Can a player figure out the basics?
  - If not, redesign, don't re-explain
  
  Environmental Teaching:
  - Level design guides attention
  - Gating requires demonstrated understanding
  - Safe spaces to experiment
  
  Just-In-Time Over Just-In-Case:
  - Teach when relevant, not before
  - Show, don't tell
  - Let players discover
  
  Nintendo's Approach (Super Mario):
  1. First goomba can't kill you
  2. First pit can be walked around
  3. First mystery block is obvious
  4. Complexity builds on mastered basics
  
  If players need the tutorial, your first level failed.
  
### **Symptoms**
  - Tutorial text growing longer
  - We'll explain it in the tutorial
  - Players skip tutorial and fail
  - Multiple tutorials added over development
  - Tutorials for every system
### **Detection Pattern**


## Balanced Means Boring

### **Id**
balanced-means-boring
### **Summary**
Pursuing perfect balance at the expense of fun
### **Severity**
high
### **Situation**
All options are equally viable, no option feels powerful
### **Why**
  Perfect balance means no decisions matter. If all weapons are equal,
  picking one is meaningless. If all characters are the same power level,
  character selection is cosmetic.
  
  Players want to find "the good stuff." Discovery is fun. Power spikes
  are memorable. "Broken" combos become stories.
  
  Blizzard's philosophy: "Everything is overpowered, so nothing is."
  
### **Solution**
  Strategic Imbalance:
  - Intentional power differences
  - Rock-paper-scissors relationships
  - Contextual strength (situationally powerful)
  
  Meta Management:
  - Rotate balance patches
  - Let players discover before nerfing
  - "Flavor of the month" keeps game fresh
  
  The Fun Imbalance:
  - Early game: Obvious best options (help new players)
  - Mid game: Situational choices emerge
  - Late game: Everything viable at high skill
  
  Fighting Game Wisdom:
  - Tier lists create metagame
  - Low-tier heroes are for showing off
  - Perfect balance = dead scene
  
### **Symptoms**
  - All options perform identically
  - No discussions about "meta"
  - No discovery moments
  - Purely skill matchups (options irrelevant)
  - Constant nerfs, never buffs
### **Detection Pattern**


## Punishment Over Teaching

### **Id**
punishment-over-teaching
### **Summary**
Making failure painful instead of instructive
### **Severity**
high
### **Situation**
Large penalties for death/failure, long setbacks, frustrating loss loops
### **Why**
  Punishment doesn't teach - it discourages.
  
  When failure hurts too much:
  - Players stop experimenting
  - Risk-taking dies
  - Frustration builds
  - Players quit
  
  The goal is learning, not suffering. Dead players should know WHY they
  died and be EXCITED to try again.
  
  Dark Souls works not because it's hard, but because death is fast and
  teaching is clear.
  
### **Solution**
  Failure as Information:
  - Clear cause of death
  - Quick restart
  - Minimal lost progress
  - Visible improvement path
  
  The Roguelike Model:
  - Death resets run, not learning
  - Each attempt teaches something
  - Progression happens despite death
  - "I almost had it" feeling
  
  Punishment Budget:
  - 10 seconds of pain, max
  - Quick feedback loop
  - Try again in < 30 seconds
  
  Celeste's Approach:
  - Instant respawn
  - Room-by-room checkpoints
  - Death is expected
  - Assist mode available
  
### **Symptoms**
  - Long reload/respawn times
  - Large progress loss on death
  - Players save-scumming
  - Rage quits at specific points
  - Unfair death complaints
### **Detection Pattern**


## Engagement Through Obligation

### **Id**
engagement-through-obligation
### **Summary**
Using FOMO, dailies, and artificial friction to retain players
### **Severity**
high
### **Situation**
Daily rewards that disappear, limited-time events, wait timers
### **Why**
  There's a difference between:
  - Players wanting to play
  - Players afraid to miss out
  
  Obligation creates resentment. Players feel trapped, not engaged.
  When they finally quit, they quit forever. You've traded short-term
  retention for long-term hatred.
  
  These games are remembered as manipulative, not fun.
  
### **Solution**
  Desire Over Duty:
  - Make returning feel good, not missing feel bad
  - Rewards for playing, not penalties for absence
  - Respect player time
  
  Sustainable Engagement:
  - Players should want to play, not feel forced
  - "I want to play" > "I have to play"
  - Leave players wanting more, not dreading less
  
  The Breath of Fresh Air Test:
  Would players miss this if they took a week off?
  If they'd feel RELIEVED to skip, you've built a prison.
  
  Exception: Games explicitly designed as habits (fitness apps, language learning)
  Even then, gentle encouragement > punishment.
  
### **Symptoms**
  - Streak mechanics
  - Disappearing rewards
  - FOMO-driven events
  - Players complaining about "having to" play
  - High churn after streak breaks
### **Detection Pattern**


## Ignoring Playtest Data

### **Id**
ignoring-playtest-data
### **Summary**
Dismissing player feedback because it conflicts with designer vision
### **Severity**
critical
### **Situation**
Playtests show problems, designer argues players are wrong
### **Why**
  There is no "wrong" way to play. If players consistently:
  - Fail at the same point
  - Misunderstand the same mechanic
  - Skip the same content
  - Get frustrated at the same moment
  
  That's not a player problem. That's a design problem.
  
  Players are always right about their experience. They might be wrong
  about solutions, but they're never wrong about their feelings.
  
### **Solution**
  The Observation Rule:
  - Watch, don't explain
  - Note patterns, not individuals
  - Three players same problem = design problem
  
  Data Over Opinion:
  - Heatmaps > hunches
  - Completion rates > intentions
  - Time-in-section > designer estimates
  
  Designer Humility:
  - "Why do players do this?" not "Players shouldn't do this"
  - Design for actual behavior, not ideal behavior
  - Your intent is invisible to players
  
  Post-Playtest Process:
  1. What did they struggle with?
  2. Where did they quit?
  3. What did they skip?
  4. What made them laugh/smile?
  5. What would they change?
  
  Actions speak louder than feedback forms.
  
### **Symptoms**
  - Explaining away negative feedback
  - They just need to learn
  - Same issues in multiple playtests
  - Designer defends during feedback
  - Changes not made after playtests
### **Detection Pattern**


## Over Designing Before Prototyping

### **Id**
over-designing-before-prototyping
### **Summary**
Writing detailed design documents for unvalidated ideas
### **Severity**
high
### **Situation**
Spending weeks on GDD before any playable prototype exists
### **Why**
  Design documents are fiction until validated by play.
  
  You cannot design fun on paper. Fun emerges from play. The game in
  your head and the game on screen are different games. Every hour
  spent documenting unproven ideas is an hour not spent discovering
  what works.
  
  The industry graveyard is full of beautiful GDDs for games that
  were never fun.
  
### **Solution**
  Prototype First:
  - Ugly but playable > Beautiful but theoretical
  - One week prototype > One month document
  - Find the fun, then document it
  
  Living Documentation:
  - Documents evolve with the game
  - Prototypes prove, documents record
  - Update docs after discoveries
  
  The Jonathan Blow Approach:
  - Write code, not docs
  - Play every day
  - Design emerges from play
  
  Minimum Viable Document:
  - Core loop (one paragraph)
  - Target experience (one sentence)
  - Three features that matter
  - Everything else discovered through play
  
### **Symptoms**
  - 100-page GDD, no prototype
  - Weeks of design before code
  - Detailed systems for unproven core
  - Design docs not updated after playtests
  - It's all in the document
### **Detection Pattern**


## Optimizing For Completionists

### **Id**
optimizing-for-completionists
### **Summary**
Designing late-game content as if most players will see it
### **Severity**
medium
### **Situation**
Spending equal effort on early and late game content
### **Why**
  The harsh truth of player behavior:
  - 90% start your game
  - 50% finish the tutorial
  - 25% reach the midpoint
  - 10% see the credits
  - 5% do everything
  
  Every hour spent on 100% completion content is seen by almost no one.
  Your best content should be in the first 30 minutes, not the last.
  
### **Solution**
  Front-Load Quality:
  - First impression is everything
  - Best content early
  - Diminishing returns on late-game polish
  
  Content Investment Strategy:
  - First hour: Maximum quality
  - Main path: High quality
  - Side content: Good quality
  - Completion content: Volume over quality
  
  The Netflix Principle:
  Viewers decide in 5 minutes. Players in 5 seconds.
  Your "skip" is their "uninstall."
  
  Completionist Content:
  - Quantity > polish
  - Reuse systems creatively
  - Let dedicated fans forgive rough edges
  
### **Symptoms**
  - Equal time on early/late content
  - Best set pieces at the end
  - Early game rushed for "the good part"
  - Retention drops at tutorial
  - It gets good after 10 hours
### **Detection Pattern**


## Progression As Fun Substitute

### **Id**
progression-as-fun-substitute
### **Summary**
Relying on unlocks and numbers going up to create engagement
### **Why**
  Progression systems can't make a boring game fun. They can only:
  - Extend engagement with an already-fun game
  - Provide goals to work toward
  - Create anticipation and pacing
  
  If the core loop isn't fun, players are just clicking through
  animations waiting for the next unlock. That's not engagement,
  that's sunk cost.
  
  The test: Would players still play with all content unlocked?
  
### **Situation**
Players only engaged during unlock moments, bored between
### **Solution**
  Progression as Enhancement:
  - Core loop must be fun at minute 1
  - Unlocks add variety, not fun
  - New content changes HOW you play, not WHETHER it's fun
  
  Roguelike Wisdom:
  - Run is fun independent of progression
  - Unlocks add variety, not viability
  - New players can still win
  
  The Core Loop Test:
  - Give a player all unlocks
  - Remove all progression
  - Is it still fun?
  
  If no: fix the core loop, not the progression.
  
### **Symptoms**
  - Excitement only at unlocks
  - Boredom between milestones
  - Players grinding, not playing
  - When do I get to the good stuff?
  - Progression skip purchases
### **Detection Pattern**


## Kitchen Sink Design

### **Id**
kitchen-sink-design
### **Summary**
Adding every mechanic that might be fun
### **Severity**
high
### **Situation**
Game tries to do everything, masters nothing
### **Why**
  Every mechanic you add:
  - Competes for player attention
  - Needs teaching
  - Interacts with other mechanics
  - Can break or be broken
  
  A game that does 3 things exceptionally beats a game that does
  20 things adequately. Players remember what you do best, not
  what you also do.
  
  Pokemon is about catching creatures. The battles are simple.
  Breath of the Wild is about exploration. Combat is secondary.
  Celeste is about jumping. Story is minimal.
  
### **Solution**
  The Focus Test:
  What is this game ABOUT? (One sentence)
  Everything supports this or gets cut.
  
  The Three-Feature Rule:
  Name three features players will remember.
  Those get 80% of your attention.
  
  System Justification:
  For every system, ask:
  - Does this make the core better?
  - Could the game ship without it?
  - What are we NOT doing because of this?
  
  Subtraction Design:
  Remove systems until removing one more would hurt.
  What remains is the game.
  
### **Symptoms**
  - It's like X meets Y meets Z meets...
  - Features compete for tutorials
  - Players confused about the point
  - Equal time on all systems
  - Can't describe in one sentence
### **Detection Pattern**
