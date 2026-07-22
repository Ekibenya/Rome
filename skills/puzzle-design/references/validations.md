# Puzzle Design - Validations

## Missing Goal State Documentation

### **Id**
puzzle-no-goal-documented
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)puzzle\s*(?:\d+|[a-z])?\s*:(?![^:]*(?:goal|objective|win|success|complete))
### **Message**
Puzzle documentation lacks clear goal state. Players must know what they're trying to achieve.
### **Fix Action**
Add explicit goal state: 'Goal: Player must activate all four crystals to open the door'
### **Applies To**
  - *.md
  - *.txt
  - *design*.md
  - *puzzle*.md

## Missing Difficulty Rating

### **Id**
puzzle-no-difficulty-rating
### **Severity**
info
### **Type**
regex
### **Pattern**
  - (?i)puzzle\s*(?:\d+|[a-z])?\s*:(?![^:]*(?:difficulty|easy|medium|hard|rating))
### **Message**
Puzzle documentation lacks difficulty rating. Rate each puzzle for curve planning.
### **Fix Action**
Add difficulty rating: 'Difficulty: Medium (estimated 3-5 minutes)'
### **Applies To**
  - *design*.md
  - *puzzle*.md

## Testing Before Teaching

### **Id**
puzzle-missing-mechanic-intro
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)(?:introduces?|first)\s+(?:and|,)\s+(?:tests?|challenges?)
  - (?i)new\s+mechanic.*(?:difficult|hard|challenging)
### **Message**
Puzzle may teach and test simultaneously. Introduce mechanics in low-stakes puzzles first.
### **Fix Action**
Add introductory puzzle that teaches mechanic before testing it
### **Applies To**
  - *design*.md
  - *puzzle*.md

## Missing Puzzle Reset

### **Id**
puzzle-no-reset-mechanism
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - class\s+Puzzle(?![\\s\\S]*reset\\s*\\()
  - puzzle\\.(?:start|begin|init)(?![\\s\\S]*puzzle\\.reset)
### **Message**
Puzzle class has no reset mechanism. Players should be able to retry without punishment.
### **Fix Action**
Add reset() method that returns puzzle to initial state
### **Applies To**
  - *.ts
  - *.js
  - *.gd
  - *.cs

## Death as Puzzle Failure

### **Id**
puzzle-death-on-failure
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - puzzle.*(?:fail|wrong|incorrect).*(?:die|death|kill|respawn)
  - (?:die|death|kill).*puzzle.*(?:fail|wrong)
### **Message**
Player dies on puzzle failure. Consider puzzle-only reset instead.
### **Fix Action**
Reset puzzle state on failure instead of killing player
### **Applies To**
  - *.ts
  - *.js
  - *.gd
  - *.cs

## Color-Only Puzzle Element

### **Id**
puzzle-color-only
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)color\s*===?\s*["'](?:red|green|blue|yellow)
  - (?i)if\s*\(\s*(?:\.color|getColor|tile\.color)
  - (?i)switch\s*\(\s*color\s*\)
### **Message**
Color-based puzzle logic detected. Ensure alternative for colorblind players.
### **Fix Action**
Add shape, pattern, or symbol alongside color differentiation
### **Applies To**
  - *.ts
  - *.js
  - *.gd
  - *.cs

## Hardcoded Puzzle Solution

### **Id**
puzzle-hardcoded-solution
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - solution\s*=\s*["'][a-zA-Z0-9]+["']
  - password\s*=\s*["'][a-zA-Z0-9]+["']
  - code\s*===?\s*["']\d+["']
### **Message**
Hardcoded puzzle solution. Consider data-driven approach for easier testing.
### **Fix Action**
Move solutions to config/data file for easier adjustment and playtesting
### **Applies To**
  - *.ts
  - *.js
  - *.gd
  - *.cs

## Missing Partial Feedback

### **Id**
puzzle-no-partial-feedback
### **Severity**
info
### **Type**
regex
### **Pattern**
  - if\s*\(.*solution.*===.*\)\s*\{[^}]*success[^}]*\}\s*else\s*\{[^}]*(?:fail|wrong|incorrect)
### **Message**
Binary success/fail with no partial feedback. Consider showing progress hints.
### **Fix Action**
Add partial feedback: 'X of Y correct' or 'getting warmer/colder'
### **Applies To**
  - *.ts
  - *.js
  - *.gd
  - *.cs

## Missing Attempt Tracking

### **Id**
puzzle-unlimited-attempts
### **Severity**
info
### **Type**
regex
### **Pattern**
  - puzzle.*submit(?![\\s\\S]*attempts|[\\s\\S]*tries)
### **Message**
No attempt tracking for puzzle. Consider tracking for adaptive hints.
### **Fix Action**
Track attempts to trigger progressive hint system
### **Applies To**
  - *.ts
  - *.js
  - *.gd
  - *.cs

## Missing Playtest Data

### **Id**
puzzle-no-playtest-data
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)puzzle.*complete(?![\\s\\S]*(?:playtest|tested|solve\s*time))
### **Message**
Puzzle marked complete without playtest data. Always test with fresh eyes.
### **Fix Action**
Add playtest notes: solve time, hint usage, frustration points
### **Applies To**
  - *design*.md
  - *puzzle*.md
  - *changelog*.md

## Single Playtester

### **Id**
puzzle-single-tester
### **Severity**
info
### **Type**
regex
### **Pattern**
  - (?i)playtested?\s*(?:by|with|:)\s*(?:one|1|single)
  - (?i)(?:one|1)\s*playtester
### **Message**
Only one playtester. Multiple testers reveal patterns in player confusion.
### **Fix Action**
Test with at least 3 fresh players to identify consistent issues
### **Applies To**
  - *design*.md
  - *playtest*.md

## Hint Reveals Full Solution

### **Id**
puzzle-hint-spoils-solution
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - hint.*[=:].*(?:solution|answer|code|password)
  - showHint.*(?:solution|answer)
### **Message**
Hint appears to reveal full solution. Use progressive hints that guide, not spoil.
### **Fix Action**
Implement multi-level hints: direction → focus → partial → full (emergency only)
### **Applies To**
  - *.ts
  - *.js
  - *.gd
  - *.cs
  - *hints*.json

## No Hint System

### **Id**
puzzle-no-hint-system
### **Severity**
info
### **Type**
regex
### **Pattern**
  - class\s+Puzzle(?![\\s\\S]*hint)
  - puzzle(?![\\s\\S]*(?:hint|help|assist))
### **Message**
No hint system detected. Players need escape valve when stuck.
### **Fix Action**
Implement hint system: time-based triggers or player-requested hints
### **Applies To**
  - *.ts
  - *.js
  - *.gd
  - *.cs

## Linear Puzzle Dependency

### **Id**
puzzle-linear-dependency
### **Severity**
info
### **Type**
regex
### **Pattern**
  - requires.*puzzle\s*(?:\d+|[a-z])$
  - unlock.*after.*puzzle\s*(?:\d+|[a-z])$
### **Message**
Linear puzzle dependency. Consider parallel paths to prevent hard blocks.
### **Fix Action**
Add alternative puzzles that unlock the same progress
### **Applies To**
  - *design*.md
  - *config*.json
  - *progression*.json

## No Skip Mechanism

### **Id**
puzzle-no-skip-option
### **Severity**
info
### **Type**
regex
### **Pattern**
  - (?i)required.*puzzle(?![\\s\\S]*(?:skip|bypass|alternate))
  - mustComplete.*puzzle
### **Message**
Required puzzle with no skip option. Consider skip with optional penalty.
### **Fix Action**
Add skip option: time penalty, currency cost, or accessibility setting
### **Applies To**
  - *design*.md
  - *config*.json

## Audio-Only Puzzle Cue

### **Id**
puzzle-audio-only-cue
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)(?:listen|audio|sound).*(?:for|to).*(?:clue|hint|solution)
  - (?i)puzzle.*(?:requires?|needs?).*(?:audio|sound|listen)
### **Message**
Audio-only puzzle element. Provide visual alternative for deaf/hard-of-hearing players.
### **Fix Action**
Add visual indicator that mirrors audio cue
### **Applies To**
  - *design*.md
  - *.ts
  - *.js
  - *.gd
  - *.cs

## Timing-Critical Without Assist

### **Id**
puzzle-timing-critical
### **Severity**
info
### **Type**
regex
### **Pattern**
  - (?i)(?:time|timing|timed|timer).*(?:critical|required|must)
  - (?i)(?:must|need|require).*within.*(?:seconds?|milliseconds?)
### **Message**
Timing-critical puzzle element. Consider assist mode for motor-impaired players.
### **Fix Action**
Add accessibility option to extend time windows or skip timing requirements
### **Applies To**
  - *design*.md
  - *.ts
  - *.js

## Large Combination Space

### **Id**
puzzle-large-combination
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)(?:dial|switch|button)s?\s*[:=]\s*[5-9]|1[0-9]
  - (?i)(?:options?|positions?|states?)\s*[:=]\s*[5-9]|1[0-9]
### **Message**
Large combination space (5+ options). Ensure clues sufficiently narrow possibilities.
### **Fix Action**
Verify: Can player deduce answer without brute force? Add constraining clues.
### **Applies To**
  - *design*.md
  - *puzzle*.md

## Random Puzzle Generation

### **Id**
puzzle-random-generation
### **Severity**
info
### **Type**
regex
### **Pattern**
  - random.*puzzle
  - generatePuzzle.*Math\.random
  - shuffle.*puzzle
### **Message**
Randomly generated puzzle. Ensure generated puzzles are always solvable and fair.
### **Fix Action**
Add validation: all generated puzzles must pass solvability check
### **Applies To**
  - *.ts
  - *.js
  - *.gd
  - *.cs

## Consumable Required for Puzzle

### **Id**
puzzle-consumable-required
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)(?:consume|use\s+up|destroy).*(?:key|item).*puzzle
  - (?i)puzzle.*(?:requires?|needs?).*(?:consumable|one-time)
### **Message**
Consumable item required for puzzle. Ensure item can be re-obtained if used wrong.
### **Fix Action**
Add respawn mechanism or alternative path if consumable is used incorrectly
### **Applies To**
  - *design*.md
  - *.ts
  - *.js

## Irreversible State Change

### **Id**
puzzle-irreversible-state
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)permanent|irreversible|(?:can'?t|cannot)\s+undo
  - (?i)puzzle.*(?:destroy|break).*(?:can'?t|cannot)\s+(?:restore|reset)
### **Message**
Irreversible state change in puzzle. Verify this cannot softlock the player.
### **Fix Action**
Add auto-save before irreversible actions or provide reset mechanism
### **Applies To**
  - *design*.md
  - *.ts
  - *.js
  - *.gd
  - *.cs