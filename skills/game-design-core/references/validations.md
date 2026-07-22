# Game Design Core - Validations

## GDD Missing Core Loop Definition

### **Id**
gdd-missing-core-loop
### **Severity**
critical
### **Type**
regex
### **Pattern**
  - (?i)^(?!.*core\s*loop).*game\s*design\s*document
  - (?i)^(?!.*gameplay\s*loop).*design\s*spec
### **Message**
Game design document without core loop definition. The core loop must be defined before any other systems.
### **Fix Action**
  Add a Core Loop section that answers:
  - What does the player do second-to-second?
  - What does the player do minute-to-minute?
  - What keeps players coming back hour after hour?
  
### **Applies To**
  - **/gdd*.md
  - **/design*.md
  - **/game-design*.md

## GDD Missing Target Audience

### **Id**
gdd-missing-target-audience
### **Severity**
error
### **Type**
regex
### **Pattern**
  - (?i)^(?!.*target\s*audience|player\s*persona).*game\s*design
### **Message**
No target audience defined. You must know who you're designing for.
### **Fix Action**
  Add a Target Audience section including:
  - Player persona with name and description
  - Gaming habits and preferences
  - Skill level expectations
  - Time investment expectations
  
### **Applies To**
  - **/gdd*.md
  - **/design*.md

## GDD Missing Design Risks

### **Id**
gdd-missing-risk-assessment
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)^(?!.*risk|concern|assumption).*game\s*design\s*document
### **Message**
No design risks or assumptions documented. Every design has unknowns that should be tested.
### **Fix Action**
  Add a Design Risks section:
  - What assumptions are we making?
  - What needs to be validated through playtesting?
  - What could go wrong with this design?
  
### **Applies To**
  - **/gdd*.md
  - **/design*.md

## GDD Missing Success Criteria

### **Id**
gdd-missing-success-metrics
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)^(?!.*success\s*metric|success\s*criteria|KPI).*game\s*design
### **Message**
No success metrics defined. How will you know if the design works?
### **Fix Action**
  Add measurable success criteria:
  - Session length targets
  - Retention metrics
  - Player behavior goals
  - Playtesting benchmarks
  
### **Applies To**
  - **/gdd*.md
  - **/design*.md

## Mechanic Without Trade-off

### **Id**
mechanic-no-tradeoff
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)better\s+(in\s+)?every\s+way
  - (?i)strictly\s+better
  - (?i)no\s+downside
  - (?i)always\s+(the\s+)?best
### **Message**
Design describes an option with no downsides. Meaningful choices require trade-offs.
### **Fix Action**
  Add trade-offs:
  - What does the player give up by choosing this?
  - In what situations is this NOT the best choice?
  - How does this interact with other choices?
  
### **Applies To**
  - **/design*.md
  - **/gdd*.md
  - **/mechanic*.md

## Mechanic With Obvious Solution

### **Id**
mechanic-one-right-answer
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)optimal\s+(strategy|choice|path)
  - (?i)the\s+best\s+(way|option|choice)\s+is
  - (?i)always\s+choose
  - (?i)never\s+choose
### **Message**
Design suggests a dominant strategy. If there's always a right answer, there's no real choice.
### **Fix Action**
  Create situational value:
  - When would the opposite choice be correct?
  - What information changes the best choice?
  - How do different playstyles affect the choice?
  
### **Applies To**
  - **/design*.md
  - **/balance*.md

## Progression Designed Before Core Loop

### **Id**
progression-before-core
### **Severity**
error
### **Type**
regex
### **Pattern**
  - (?i)progression\s+system(?!.*after\s+core|once\s+core|core.*validated)
  - (?i)unlock\s+(system|tree)(?!.*core\s+loop\s+validated)
### **Message**
Progression system designed without core loop validation. Progression can't make a boring game fun.
### **Fix Action**
  Before designing progression:
  1. Document the core loop
  2. Prototype the core loop
  3. Validate through playtesting
  4. THEN design progression
  
### **Applies To**
  - **/design*.md
  - **/progression*.md

## Infinite Progression Without Cap

### **Id**
progression-no-cap
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)infinite\s+(scaling|progression|levels)
  - (?i)no\s+(level\s+)?cap
  - (?i)unlimited\s+(upgrades|power)
### **Message**
Infinite progression can break game balance. Consider caps and diminishing returns.
### **Fix Action**
  Add progression boundaries:
  - Soft caps with diminishing returns
  - Hard caps for balance
  - Horizontal progression alternatives
  - Prestige/reset systems
  
### **Applies To**
  - **/design*.md
  - **/progression*.md

## Difficulty Without Skill Floor Consideration

### **Id**
difficulty-no-floor
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)difficult|challenging|hard(?!.*new\s+player|beginner|accessible)
### **Message**
Difficulty discussed without new player consideration. Design for skill floor AND ceiling.
### **Fix Action**
  Address accessibility:
  - How do new players learn?
  - What's the minimum skill required?
  - Are there assist options?
  - Is failure instructive?
  
### **Applies To**
  - **/design*.md
  - **/difficulty*.md

## Punitive Death Design

### **Id**
difficulty-punishment-focus
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)lose\s+all\s+(progress|items|gold)
  - (?i)harsh\s+(penalty|punishment)
  - (?i)permanent\s+(death|loss)
  - (?i)you\s+die.*start\s+over
### **Message**
Punitive death system detected. Ensure failure teaches, not just punishes.
### **Fix Action**
  Balance punishment with learning:
  - Is the cause of death clear?
  - Is restart time fast (<30 seconds)?
  - Does the player know how to improve?
  - Consider roguelike meta-progression
  
### **Applies To**
  - **/design*.md
  - **/death*.md
  - **/failure*.md

## Single Currency Economy

### **Id**
economy-single-currency
### **Severity**
info
### **Type**
regex
### **Pattern**
  - (?i)(?:only|single|one)\s+(currency|resource)
### **Message**
Single currency economy may lack depth. Consider if multiple currencies would add meaningful choices.
### **Fix Action**
  Evaluate currency complexity:
  - Does adding currency add decisions?
  - Would it just add math?
  - Consider soft vs. hard currency
  - Free-to-play implications
  
### **Applies To**
  - **/economy*.md
  - **/monetization*.md

## Economy Without Sink

### **Id**
economy-inflation-risk
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)earn\s+(currency|gold|coins)(?!.*spend|sink|remove)
### **Message**
Currency earning without spending mechanisms leads to inflation.
### **Fix Action**
  Add currency sinks:
  - Consumables
  - Maintenance costs
  - Upgrade costs that scale
  - Cosmetic purchases
  
### **Applies To**
  - **/economy*.md
  - **/design*.md

## FOMO-Based Retention

### **Id**
retention-fomo-mechanics
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)limited\s+time\s+(only|event|offer)
  - (?i)miss\s+(out|this|your\s+chance)
  - (?i)disappear(s|ing)?
  - (?i)streak\s+(bonus|reward|system)
  - (?i)daily\s+(login|reward).*lose
### **Message**
FOMO-based retention detected. Consider if this respects player time.
### **Fix Action**
  Evaluate retention ethics:
  - Is this creating desire or obligation?
  - Would players feel relieved to miss it?
  - Consider catch-up mechanics
  - Respect player autonomy
  
### **Applies To**
  - **/retention*.md
  - **/monetization*.md
  - **/live-ops*.md

## Playtest Without Research Questions

### **Id**
playtest-no-questions
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)playtest\s+(session|plan)(?!.*question|hypothesis|goal)
### **Message**
Playtest planned without specific questions. Know what you're testing.
### **Fix Action**
  Define playtest goals:
  - What specific question are we answering?
  - What behavior would confirm/deny our hypothesis?
  - What metrics will we track?
  
### **Applies To**
  - **/playtest*.md
  - **/testing*.md

## Playtest Without Metrics

### **Id**
playtest-no-metrics
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)playtest(?!.*track|measure|metric|observe)
### **Message**
Playtest without defined metrics. Measure behavior, not just feedback.
### **Fix Action**
  Add measurable observations:
  - Time to complete sections
  - Number of deaths/failures
  - Time spent in menus vs. gameplay
  - Quit points and retry rates
  
### **Applies To**
  - **/playtest*.md

## Text-Heavy Tutorial

### **Id**
tutorial-text-heavy
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)tutorial\s+(text|message|popup|dialog)
  - (?i)explain\s+(in\s+)?text
  - (?i)tell\s+(the\s+)?player
### **Message**
Text-based tutorial approach. Players skip text. Design for learning through play.
### **Fix Action**
  Replace text with design:
  - Gating that requires mechanic use
  - Safe spaces to experiment
  - Environmental guidance
  - Show, don't tell
  
### **Applies To**
  - **/tutorial*.md
  - **/onboarding*.md

## Front-Loaded Tutorial

### **Id**
tutorial-front-loaded
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)(all|every)\s+mechanic.*tutorial
  - (?i)tutorial\s+(covers|explains|teaches)\s+(all|everything)
  - (?i)before\s+play(ing)?.*learn
### **Message**
Tutorial teaches everything upfront. Players forget what they don't use immediately.
### **Fix Action**
  Implement just-in-time teaching:
  - Teach when the mechanic becomes relevant
  - Space learning over time
  - Let players discover advanced techniques
  
### **Applies To**
  - **/tutorial*.md
  - **/onboarding*.md

## Perfect Balance as Goal

### **Id**
balance-perfect-target
### **Severity**
info
### **Type**
regex
### **Pattern**
  - (?i)perfectly\s+balanced
  - (?i)all\s+options\s+equal
  - (?i)no\s+tier\s+list
### **Message**
Perfect balance may reduce interesting decisions. Consider strategic imbalance.
### **Fix Action**
  Evaluate balance philosophy:
  - Does imbalance create discovery?
  - Are there situational advantages?
  - Can meta evolve over time?
  
### **Applies To**
  - **/balance*.md
  - **/design*.md

## Balance Through Numbers Only

### **Id**
balance-numbers-only
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - (?i)increase\s+damage
  - (?i)reduce\s+(health|speed)
  - (?i)buff.*nerf
### **Message**
Balance changes focused on numbers. Consider if the design needs reworking instead.
### **Fix Action**
  Consider design changes:
  - Is the mechanic working as intended?
  - Would a redesign work better than number changes?
  - Are we treating symptoms or causes?
  
### **Applies To**
  - **/balance*.md
  - **/patch*.md