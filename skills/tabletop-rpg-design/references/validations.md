# Tabletop Rpg Design - Validations

## Punishing Difficulty Numbers on d20

### **Id**
punishing-target-numbers
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - DC\s*(1[8-9]|2[0-5])
  - target.*number.*(1[8-9]|2[0-9])
  - difficulty.*(1[8-9]|2[0-5])
### **Message**
High target numbers (18+) on d20 create feel-bad failure rates. DC 18 = 15% success for untrained, 35% for trained (+4).
### **Fix Action**
Consider lower DCs with interesting failure consequences, or advantage/disadvantage system
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/rules/**
  - **/mechanics/**

## Binary Pass/Fail Without Gradation

### **Id**
whiff-factor-binary
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - success.*failure.*nothing
  - fail.*try again
  - on a failure.*happens
### **Message**
Binary success/failure creates whiff factor. Players spending actions for 'nothing happens' is unfun.
### **Fix Action**
Add partial success tier (7-9 in PbtA) or fail-forward consequences
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/rules/**
  - **/mechanics/**

## Multiple Modifier Sources

### **Id**
modifier-stacking-complexity
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - \+[0-9].*\+[0-9].*\+[0-9]
  - bonus.*stack
  - cumulative.*modifier
  - add.*bonus.*from
### **Message**
Multiple stacking modifiers slow play and create rules-lawyer opportunities. Consider advantage/disadvantage or position/effect instead.
### **Fix Action**
Collapse to 3 max modifier sources: base + situational + special
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/rules/**

## Wound Penalties Creating Death Spiral

### **Id**
death-spiral-penalty
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - wound.*-[0-9]
  - injury.*penalty
  - damage.*reduces.*ability
  - hurt.*disadvantage
### **Message**
Wound penalties create death spirals where injured characters become less effective, accelerating their demise.
### **Fix Action**
Separate 'wounded state' from 'combat effectiveness' or make wounds narrative only
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/combat/**

## Excessive Skill List

### **Id**
skill-list-bloat
### **Severity**
info
### **Type**
regex
### **Pattern**
  - skills?:.*\n(.*\n){15,}
  - skill list:.*\n(.*\n){12,}
### **Message**
Skill lists beyond 12 skills create choice paralysis and unused options. PbtA uses 5 stats, BitD uses 12 action ratings.
### **Fix Action**
Consolidate overlapping skills. 'Athletics' covers climb, swim, run. 'Influence' covers persuade, intimidate, deceive.
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/character/**

## Obvious Dump Stat Design

### **Id**
dump-stat-trap
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - charisma.*only.*social
  - intelligence.*wizard
  - rarely.*used.*stat
### **Message**
Stats that don't matter for certain builds become dump stats. Every stat should matter to every character.
### **Fix Action**
Add secondary uses: Charisma for morale, Intelligence for knowledge, Strength for encumbrance
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/character/**

## Potentially Unviable Option

### **Id**
trap-option-design
### **Severity**
info
### **Type**
regex
### **Pattern**
  - situational.*use
  - rarely.*applicable
  - niche.*ability
### **Message**
Niche options that rarely apply can be trap choices for inexperienced players. Consider if this option earns its rules-space.
### **Fix Action**
Either make the option more broadly useful or explicitly label it as situational
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/abilities/**
  - **/feats/**

## Complex Character Creation

### **Id**
character-creation-time
### **Severity**
info
### **Type**
regex
### **Pattern**
  - step [5-9]
  - step 1[0-9]
  - calculate.*derived
  - consult.*table
### **Message**
Character creation with 5+ steps or table lookups takes too long for one-shots. Target 15 minutes.
### **Fix Action**
Use playbooks, pregens, or 'quick start' rules for one-shots
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/character/**

## Combat Duration Risk

### **Id**
combat-slog-indicators
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - round.*[5-9]
  - each.*round.*player
  - initiative.*order.*maintain
  - track.*hit points
### **Message**
Systems tracking many rounds, individual initiative, and HP can lead to 45+ minute combats. Consider streamlined alternatives.
### **Fix Action**
Add morale rules, decisive blow mechanics, or one-roll resolution for minor encounters
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/combat/**

## Single Character Required for Task

### **Id**
spotlight-hoarding
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - only.*can
  - requires.*class
  - must have.*skill
  - necessary.*ability
### **Message**
Tasks requiring specific characters create spotlight hoarding. Other players sit idle.
### **Fix Action**
Allow multiple solutions or group actions where everyone participates
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/rules/**

## Complex Initiative System

### **Id**
initiative-complexity
### **Severity**
info
### **Type**
regex
### **Pattern**
  - roll.*initiative.*modifier
  - initiative.*order.*each.*round
  - re-roll.*initiative
### **Message**
Complex initiative systems slow combat start. Consider side-based, popcorn, or fiction-first initiative.
### **Fix Action**
Simplify: side initiative (party rolls once), popcorn (players choose order), or no initiative (fictional positioning)
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/combat/**

## Rules Requiring GM Interpretation

### **Id**
gm-dependency
### **Severity**
info
### **Type**
regex
### **Pattern**
  - GM decides
  - DM discretion
  - referee determines
  - narrator chooses
### **Message**
Frequent GM interpretation requirements burn out GMs and create table-to-table inconsistency.
### **Fix Action**
Add procedures, tables, or default rulings. 'If unclear, assume the player succeeds with a complication.'
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/rules/**

## Vague Procedural Guidance

### **Id**
missing-procedure
### **Severity**
info
### **Type**
regex
### **Pattern**
  - when.*appropriate
  - as.*needed
  - the GM should
  - if.*makes sense
### **Message**
Vague guidance ('when appropriate') leaves GMs guessing. Clear procedures help new GMs.
### **Fix Action**
Add step-by-step procedure or triggers: 'Roll for random encounter every 2 turns'
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/gm/**

## Forced Encounter Design

### **Id**
quantum-ogre
### **Severity**
info
### **Type**
regex
### **Pattern**
  - regardless.*path
  - whichever.*direction
  - no matter.*choice
### **Message**
Encounters that happen regardless of player choice (quantum ogre) undermine agency. Players sense illusory choice.
### **Fix Action**
Prep situations in locations. If players don't go there, the content stays there (or advances independently via clocks).
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/adventures/**

## Critical Clue Behind Single Roll

### **Id**
clue-behind-roll
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - roll.*find.*clue
  - check.*discover.*evidence
  - perception.*notice.*hidden
  - search.*success.*reveals
### **Message**
Locking critical clues behind single rolls stalls investigations on failed rolls.
### **Fix Action**
GUMSHOE principle: finding clues is automatic, rolls are for extra details. Or use Three-Clue Rule (redundant paths).
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/investigation/**
  - **/mystery/**

## No Safety Tool Reference

### **Id**
missing-safety-tools
### **Severity**
info
### **Type**
regex
### **Pattern**
  - ^(?!.*x-card)(?!.*lines.*veils)(?!.*safety).*$
### **Message**
Consider including safety tool references (X-Card, Lines and Veils, Script Change) in core rules or Session Zero guidance.
### **Fix Action**
Add a Safety Tools section referencing established techniques
### **Applies To**
  - **/session-zero/**
  - **/introduction/**
  - **/core-rules/**

## Permission-Based Design

### **Id**
mother-may-i
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - ask.*GM.*permission
  - GM.*allows
  - if.*GM.*permits
  - request.*DM.*approval
### **Message**
Permission-based mechanics ('ask the GM if...') transfer agency to GM and create bottlenecks.
### **Fix Action**
Give players resources they can spend without permission. Flashbacks in BitD, Fate points, etc.
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/rules/**

## Level-Based Number Inflation

### **Id**
numerical-inflation
### **Severity**
info
### **Type**
regex
### **Pattern**
  - level.*\+[0-9]
  - per.*level.*bonus
  - scale.*with.*level
### **Message**
If progression is primarily numerical (+X per level), gameplay doesn't change. Level 10 feels like level 1 with bigger numbers.
### **Fix Action**
Add capability expansion: new abilities that change WHAT you can do, not just how well you do it
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/advancement/**
  - **/progression/**

## Prerequisite Chain Depth

### **Id**
feat-tax-pattern
### **Severity**
info
### **Type**
regex
### **Pattern**
  - requires.*prerequisite
  - must.*have.*before
  - unlock.*after.*taking
### **Message**
Deep prerequisite chains (feat taxes) delay character concepts. Players spend early levels paying entry fees.
### **Fix Action**
Reduce chains to 1 prerequisite max, or remove prerequisites entirely
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/feats/**
  - **/abilities/**

## Exhaustive Equipment Lists

### **Id**
equipment-list-length
### **Severity**
info
### **Type**
regex
### **Pattern**
  - equipment.*table
  - price.*list
  - item.*cost.*weight
### **Message**
Long equipment lists with individual prices slow character creation and create shopping sessions.
### **Fix Action**
Use loadout systems (light/medium/heavy), abstract wealth, or equipment kits
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/equipment/**
  - **/gear/**

## Social HP System

### **Id**
social-combat-hp
### **Severity**
info
### **Type**
regex
### **Pattern**
  - social.*hit points
  - influence.*points
  - persuasion.*damage
  - reduce.*resistance
### **Message**
Social 'HP' systems make NPCs feel like obstacles to whittle down, not characters to engage with.
### **Fix Action**
Use disposition shifts, NPC wants/fears, or single-roll social resolution
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/social/**
  - **/intrigue/**

## PbtA Stat Range Issues

### **Id**
pbta-stat-range
### **Severity**
warning
### **Type**
regex
### **Pattern**
  - stat.*\+[4-9]
  - modifier.*\+[4-9]
  - bonus.*greater.*\+3
### **Message**
2d6+stat systems break with stats beyond +3. A +4 modifier makes 10+ (full success) nearly guaranteed (83%).
### **Fix Action**
Keep PbtA stats in -1 to +3 range. Use different advancement (new moves, not higher stats).
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/pbta/**
  - **/apocalypse/**

## FitD Action Rating Proliferation

### **Id**
fitd-action-bloat
### **Severity**
info
### **Type**
regex
### **Pattern**
  - action.*rating.*1[5-9]
  - actions:.*\n(.*\n){14,}
### **Message**
Forged in the Dark works with ~12 action ratings. More creates overlap and decision paralysis.
### **Fix Action**
Consolidate similar actions. If in doubt, cut rather than add.
### **Applies To**
  - **/*.md
  - **/*.txt
  - **/fitd/**
  - **/blades/**