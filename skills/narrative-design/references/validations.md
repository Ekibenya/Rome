# Narrative Design - Validations

## Dialogue uses reading language instead of speaking language

### **Id**
dialogue-writing-not-speaking
### **Severity**
critical
### **Description**
Dialogue with formal constructs that sound unnatural when voiced
### **Pattern**
  #### **File Glob**
**/*.{ink,yarn,json,yaml,csv,txt}
  #### **Match**
"[^"]*\b(do not|can not|will not|shall not|I am|you are|they are|it is|we are|there is|that is)\b[^"]*"
  #### **Exclude**
# |// |formal|robot|ancient|narrator
### **Message**
Dialogue may read as written, not spoken. Use contractions: 'do not' -> 'don't', 'I am' -> 'I'm'. Exception: intentionally formal characters.
### **Autofix**


## Long exposition in dialogue without interaction

### **Id**
exposition-dump-detected
### **Severity**
critical
### **Description**
Blocks of explanatory text without player engagement
### **Pattern**
  #### **File Glob**
**/*.{ink,yarn,json,yaml}
  #### **Match**
(As you know|Let me explain|The history of|Long ago|It all began|You see,|Allow me to tell you)
  #### **Exclude**
# comment|mock|test
### **Message**
Potential exposition dump detected. Consider: environmental storytelling, player discovery, or breaking into interactive dialogue.
### **Autofix**


## Dialogue or script removes player choice without justification

### **Id**
player-agency-removed
### **Severity**
critical
### **Description**
Narrative forces player into specific action or emotion
### **Pattern**
  #### **File Glob**
**/*.{ink,yarn,json,yaml,md}
  #### **Match**
(you feel|you decide|you think|player feels|player decides|without choice|forced to|must accept|no option)
  #### **Exclude**
# |// |design note|comment
### **Message**
Narrative may be prescribing player emotion or action. Player should CHOOSE to feel or do. Offer alternatives or frame as character suggestion.
### **Autofix**


## Individual dialogue lines exceed spoken length

### **Id**
dialogue-too-long
### **Severity**
high
### **Description**
Lines too long for comfortable voice performance
### **Pattern**
  #### **File Glob**
**/*.{ink,yarn,json,yaml,csv}
  #### **Match**
"[^"]{250,}"
  #### **Exclude**
description|note|comment|context
### **Message**
Dialogue line exceeds 250 characters. Break into multiple lines for natural speech rhythm and actor breath points.
### **Autofix**


## Dialogue without speaker identification

### **Id**
missing-character-attribution
### **Severity**
high
### **Description**
Lines that don't clearly indicate who is speaking
### **Pattern**
  #### **File Glob**
**/*.{ink,yarn,json,csv}
  #### **Match**
^\s*"[^"]+"\s*$
  #### **Exclude**
speaker:|character:|from:|name:
### **Message**
Dialogue may lack speaker attribution. Every line should clearly indicate who is speaking for VO and localization.
### **Autofix**


## Dialogue options that lead to same outcome

### **Id**
branching-without-consequence
### **Severity**
high
### **Description**
Choice architecture without meaningful divergence
### **Pattern**
  #### **File Glob**
**/*.{ink,yarn,json,yaml}
  #### **Match**
(choice|option|branch|decision).*->\s*(same|converge|merge|identical)
  #### **Exclude**
test|mock|example
### **Message**
Branching structure may converge without meaningful difference. Ensure choices have distinct consequences or clearly different journey.
### **Autofix**


## Dialogue without localization context notes

### **Id**
missing-localization-context
### **Severity**
high
### **Description**
Translatable text without guidance for localizers
### **Pattern**
  #### **File Glob**
**/*.{json,csv,yaml}
  #### **Match**
(id|key|string_id).*:.*["'][^"']+["']
  #### **Exclude**
context:|note:|comment:|desc:|speaker:|emotion:
### **Message**
Dialogue entry may lack localization context. Include: speaker, emotion, intended meaning, any wordplay to adapt.
### **Autofix**


## Bark category with too few variants

### **Id**
insufficient-bark-variants
### **Severity**
high
### **Description**
Bark pools that will cause noticeable repetition
### **Pattern**
  #### **File Glob**
**/*.{json,yaml}
  #### **Match**
(bark|callout|combat_line|ambient_line).*:\s*\[[^\]]{1,200}\]
  #### **Exclude**
test|mock
### **Message**
Bark category may have insufficient variants. High-frequency barks need 10-15+ variants. Low-frequency need 4-6 minimum.
### **Autofix**


## Bark definition without playback cooldown

### **Id**
bark-without-cooldown
### **Severity**
high
### **Description**
Barks that can repeat immediately
### **Pattern**
  #### **File Glob**
**/*.{json,yaml}
  #### **Match**
(bark|callout|line).*:
  #### **Exclude**
cooldown|delay|timeout|min_interval
### **Message**
Bark may lack cooldown/delay specification. Barks need minimum interval to prevent immediate repetition.
### **Autofix**


## Voice line without performance direction

### **Id**
voice-line-missing-direction
### **Severity**
high
### **Description**
Dialogue for voice recording without emotional context
### **Pattern**
  #### **File Glob**
**/*.{json,yaml,csv}
  #### **Match**
(voice_line|vo_|dialogue).*:.*["'][^"']{20,}["']
  #### **Exclude**
emotion:|tone:|direction:|context:|\(.*\)
### **Message**
Voice line may lack performance direction. Include: emotion, context, what character wants, any subtext.
### **Autofix**


## Quest objective without clear player motivation

### **Id**
quest-missing-motivation
### **Severity**
medium
### **Description**
Objectives that tell WHAT but not WHY
### **Pattern**
  #### **File Glob**
**/*.{json,yaml,ink}
  #### **Match**
(objective|quest|task|goal).*:.*"(Go to|Find|Collect|Kill|Speak to|Return to)
  #### **Exclude**
because|to save|to help|to discover|to prevent
### **Message**
Quest objective may lack motivation framing. Include WHY this matters, not just WHAT to do.
### **Autofix**


## Sequential plot without causal connection

### **Id**
and-then-plotting
### **Severity**
medium
### **Description**
Events connected by 'and then' instead of 'therefore' or 'but'
### **Pattern**
  #### **File Glob**
**/*.{md,txt,yaml}
  #### **Match**
(and then|next,|after that,|then they|then the player)
  #### **Exclude**
therefore|because|but|however|as a result|which causes
### **Message**
Plot may use 'and then' sequencing instead of causal 'therefore/but' connections. Events should cause each other.
### **Autofix**


## Moral choice with obviously correct option

### **Id**
moral-choice-unbalanced
### **Severity**
medium
### **Description**
Ethical choices where one option is clearly superior
### **Pattern**
  #### **File Glob**
**/*.{ink,yarn,json,yaml}
  #### **Match**
(choice|option|decision).*(good|evil|right|wrong|moral|immoral)
  #### **Exclude**
gray|ambiguous|cost|sacrifice|trade-off|consequence
### **Message**
Moral choice may be unbalanced. Both options should have real costs and benefits. Avoid clear 'right answer'.
### **Autofix**


## World information delivered through dialogue instead of environment

### **Id**
lore-not-environmental
### **Severity**
medium
### **Description**
Lore dumps in dialogue rather than discoverable elements
### **Pattern**
  #### **File Glob**
**/*.{ink,yarn,json,yaml}
  #### **Match**
(the history|the legend|it is said|according to|the prophecy|the ancient)
  #### **Exclude**
item_description|codex|optional|book|note|environmental
### **Message**
Lore may be delivered through dialogue. Consider: item descriptions, environmental details, optional discovery for those who seek.
### **Autofix**


## Hardcoded pronouns that won't localize

### **Id**
hardcoded-gender-pronouns
### **Severity**
medium
### **Description**
Gendered language that doesn't adapt for localization
### **Pattern**
  #### **File Glob**
**/*.{json,yaml,ink,yarn}
  #### **Match**
(he or she|him or her|his or her|s/he|\(s\)he)
  #### **Exclude**
# |comment|note
### **Message**
Hardcoded gender constructs may not localize. Consider: neutral wording, or variable-based pronoun system.
### **Autofix**


## Wordplay without localization warning

### **Id**
pun-not-flagged
### **Severity**
medium
### **Description**
Puns or idioms that need adaptation flags
### **Pattern**
  #### **File Glob**
**/*.{json,yaml,csv}
  #### **Match**
["'][^"']*\b(dead|grave|killing|break|hit|struck|fall|caught|shot)\b[^"']*["']
  #### **Exclude**
loc_note|pun|wordplay|adapt|idiom
### **Message**
Potential wordplay detected. If intentional, add localization note for translators to adapt appropriately.
### **Autofix**


## UI text without expansion room

### **Id**
text-length-not-considered
### **Severity**
medium
### **Description**
Interface text that won't fit when translated
### **Pattern**
  #### **File Glob**
**/*.{json,yaml}
  #### **Match**
(button_text|label|menu_item|ui_text).*:.*["'][^"']{15,}["']
  #### **Exclude**
max_length|expansion|loc_warning
### **Message**
UI text may not have room for translation expansion. German can be 30% longer than English. Design for longest language.
### **Autofix**


## Cutscene character behaves unlike gameplay

### **Id**
cutscene-character-contradiction
### **Severity**
medium
### **Description**
Character capabilities differ in cinematics
### **Pattern**
  #### **File Glob**
**/*.{json,yaml,md}
  #### **Match**
(cutscene|cinematic|scene).*:(captured|defeated|fails|loses|falls|trapped)
  #### **Exclude**
earned|player_choice|skill_check|consequence
### **Message**
Cutscene may contradict player capability. If player can dodge in gameplay, character shouldn't fail to dodge in cutscene.
### **Autofix**


## Narrative urgency without mechanical enforcement

### **Id**
false-urgency
### **Severity**
medium
### **Description**
"Hurry!" in dialogue but no time limit in gameplay
### **Pattern**
  #### **File Glob**
**/*.{ink,yarn,json,yaml}
  #### **Match**
(hurry|quickly|no time|urgent|immediately|right now|before it's too late)
  #### **Exclude**
timer|countdown|time_limit|deadline|timed
### **Message**
Dialogue suggests urgency without mechanical support. Either add timer, or remove false urgency from dialogue.
### **Autofix**


## Same phrase appears multiple times

### **Id**
repeated-dialogue-pattern
### **Severity**
low
### **Description**
Dialogue lines that may cause perceived repetition
### **Pattern**
  #### **File Glob**
**/*.{json,yaml,csv}
  #### **Match**
(["'][^"']{10,30}["']).*\1
  #### **Exclude**
intentional|refrain|callback|catchphrase
### **Message**
Same phrase appears multiple times. Ensure variation or intentional callback. Players notice repetition.
### **Autofix**


## Quest objectives use passive voice

### **Id**
passive-voice-in-objective
### **Severity**
low
### **Description**
Objectives that don't emphasize player as actor
### **Pattern**
  #### **File Glob**
**/*.{json,yaml}
  #### **Match**
(objective|task|goal).*:.*"(The|A|An).*must be|should be|needs to be
  #### **Exclude**
active_variant
### **Message**
Objective uses passive voice. Use active: 'Find the artifact' not 'The artifact must be found'. Player is agent.
### **Autofix**


## Voice line without alt takes

### **Id**
missing-alternative-dialogue
### **Severity**
low
### **Description**
Single take without performance variations
### **Pattern**
  #### **File Glob**
**/*.{json,yaml}
  #### **Match**
(voice_line|vo_line).*:.*"[^"]+"
  #### **Exclude**
_alt|_var|variant|alternative|take_
### **Message**
Voice line may lack alternative takes. Consider: intense/casual/interrupted versions for actor choice.
### **Autofix**


## Long exchange without natural interruption points

### **Id**
dialogue-missing-interruption
### **Severity**
low
### **Description**
Back-and-forth that feels unnatural
### **Pattern**
  #### **File Glob**
**/*.{ink,yarn,json}
  #### **Match**
(speaker_a|speaker_b|npc|player).*{5,}
  #### **Exclude**
interrupt|\.\.\.|--|cut_off
### **Message**
Long dialogue exchange may lack natural interruption. Real conversation has overlaps, interruptions, trailing off.
### **Autofix**


## Dialogue tells emotion instead of demonstrating

### **Id**
emotion-told-not-shown
### **Severity**
low
### **Description**
Characters stating their feelings rather than expressing them
### **Pattern**
  #### **File Glob**
**/*.{ink,yarn,json,yaml}
  #### **Match**
"(I am angry|I am sad|I feel|I'm feeling|I am so|I'm so|This makes me)
  #### **Exclude**
sarcastic|ironic|teaching_moment
### **Message**
Character may be telling emotion instead of showing. 'I'm angry' is weaker than angry dialogue. Show through word choice and action.
### **Autofix**
