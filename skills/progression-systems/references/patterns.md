# Progression Systems Specialist

## Patterns


---
  #### **Name**
Logarithmic XP Curve
  #### **Description**
    Use logarithmic scaling where each level requires progressively more XP,
    but the RATIO of increase diminishes. This creates the perception of
    achievable goals while extending content.
    
  #### **Context**
Level scaling that feels fair across 100+ levels
  #### **Implementation**
    ```javascript
    // The Diablo II formula - proven over 20+ years
    function xpForLevel(level, baseXP = 100, exponent = 1.5) {
      return Math.floor(baseXP * Math.pow(level, exponent));
    }
    
    // Level 1: 100 XP, Level 10: 3,162 XP, Level 50: 35,355 XP
    // The key insight: Level 50 takes ~11x level 10, not 50x
    
    // For softer curves (casual games):
    function casualXPCurve(level, baseXP = 100) {
      return Math.floor(baseXP * level * Math.log2(level + 1));
    }
    
    // For steeper curves (hardcore ARPGs):
    function hardcoreXPCurve(level, baseXP = 100) {
      return Math.floor(baseXP * Math.pow(level, 2) * Math.log10(level + 1));
    }
    ```
    
  #### **Rationale**
    Linear XP curves (100, 200, 300...) make late levels trivial.
    Exponential curves (100, 200, 400...) make late levels impossible.
    Logarithmic curves find the sweet spot where progress always feels possible.
    

---
  #### **Name**
Diamond Skill Tree Topology
  #### **Description**
    Structure skill trees as diamonds: narrow start, wide middle, narrow end.
    This forces early commitment but allows mid-game exploration before
    converging on a final build identity.
    
  #### **Context**
Skill trees with 50+ nodes and meaningful build diversity
  #### **Implementation**
    ```javascript
    // Path of Exile's passive tree uses this principle
    const skillTreeStructure = {
      // Tier 1: 3 starting nodes - establishes archetype
      tier1: {
        nodeCount: 3,
        philosophy: "Choose your core identity",
        examples: ["Warrior", "Mage", "Rogue"]
      },
    
      // Tier 2-4: Explosion of options - 15-25 nodes each
      tier2to4: {
        nodeCount: [15, 20, 25],
        philosophy: "Explore hybrid possibilities",
        interconnections: "HIGH - allow switching between branches"
      },
    
      // Tier 5-6: Convergence - 10-5 nodes
      tier5to6: {
        nodeCount: [10, 5],
        philosophy: "Define your endgame identity",
        keystones: "Mutually exclusive powerful effects"
      }
    };
    
    // The golden rule: Any two starting classes should have
    // at least one viable hybrid build path
    ```
    
  #### **Rationale**
    Trees that are wide at the start overwhelm new players.
    Trees that are narrow throughout feel linear.
    Diamond topology creates the "ah-ha!" moment when players discover synergies.
    

---
  #### **Name**
Reward Schedule Layering
  #### **Description**
    Layer multiple reward timelines: immediate (every action), short-term
    (every session), medium-term (weekly), and long-term (seasonal).
    Each layer reinforces the others.
    
  #### **Context**
Games-as-service or live games with ongoing engagement
  #### **Implementation**
    ```javascript
    const rewardLayers = {
      immediate: {
        frequency: "Every 1-5 minutes",
        rewards: ["XP ticks", "Gold drops", "Small loot"],
        psychology: "Variable ratio reinforcement",
        example: "Diablo's constant loot explosions"
      },
    
      shortTerm: {
        frequency: "Every 30-60 minutes",
        rewards: ["Level ups", "Skill points", "Equipment upgrades"],
        psychology: "Session goals - 'one more level'",
        example: "Reaching a new zone in PoE"
      },
    
      mediumTerm: {
        frequency: "Daily/Weekly",
        rewards: ["Daily login bonus", "Weekly challenges", "Bounties"],
        psychology: "Habit formation - routine engagement",
        warning: "MUST be completable, not FOMO-inducing"
      },
    
      longTerm: {
        frequency: "Monthly/Seasonal",
        rewards: ["Season rewards", "Prestige", "Exclusive cosmetics"],
        psychology: "Investment and identity",
        example: "Battle pass final rewards, Season journey"
      }
    };
    
    // Critical: Each layer should be achievable WITHOUT the layer above
    // Players who miss dailies shouldn't be locked out of seasonal rewards
    ```
    
  #### **Rationale**
    Single-layer reward systems create burnout (too fast) or abandonment (too slow).
    Layered systems let players engage at their preferred depth.
    

---
  #### **Name**
Catch-Up Acceleration
  #### **Description**
    Implement catch-up mechanics that accelerate progression for trailing
    players WITHOUT punishing leaders. The gap should narrow naturally,
    not through leader penalties.
    
  #### **Context**
Multiplayer games or games with frequent content updates
  #### **Implementation**
    ```javascript
    // World of Warcraft's Rested XP system - the gold standard
    function calculateXPMultiplier(playerLevel, contentLevel, isRested) {
      let multiplier = 1.0;
    
      // Catch-up: Old content gives bonus XP
      const levelDifference = contentLevel - playerLevel;
      if (levelDifference < -5) {
        // Player is overleveled - no bonus, slight reduction
        multiplier *= 0.9;
      } else if (levelDifference > 5) {
        // Player is underleveled - catch-up bonus
        multiplier *= 1.0 + (levelDifference * 0.05); // +5% per level behind
      }
    
      // Rested XP: Rewards taking breaks
      if (isRested) {
        multiplier *= 2.0;
      }
    
      return multiplier;
    }
    
    // Alternative: Hades-style "God Mode"
    // Each death permanently increases damage resistance
    // Catch-up through persistence, not time
    ```
    
  #### **Rationale**
    Catch-up should feel like a helping hand, not a handout.
    "Rested XP" is genius because it reframes NOT playing as accumulating bonus.
    

---
  #### **Name**
Meaningful Prestige Reset
  #### **Description**
    Prestige systems should make players feel like masters returning to
    teach, not students repeating lessons. Carry forward KNOWLEDGE (unlocks,
    blueprints) not POWER (stats, gear).
    
  #### **Context**
Games with prestige/rebirth/ascension systems
  #### **Implementation**
    ```javascript
    // Clicker Heroes 2 / Realm Grinder approach
    const prestigeDesign = {
      whatResets: [
        "Character level",
        "Current gear",
        "Active currencies",
        "Map progress"
      ],
    
      whatPersists: [
        "Unlocked features",
        "Knowledge/blueprints",
        "Cosmetics",
        "Achievement progress"
      ],
    
      whatAccelerates: {
        example: "Each prestige grants +10% base XP permanently",
        cap: "Cap at 500% to prevent trivialization",
        feeling: "The early game should feel FASTER, not EASIER"
      },
    
      newContent: {
        rule: "Each prestige tier MUST unlock new mechanics",
        examples: [
          "Prestige 1: Unlock crafting",
          "Prestige 2: Unlock enchanting",
          "Prestige 3: Unlock challenge modes"
        ]
      }
    };
    
    // The golden ratio: First prestige at 60% of base content
    // Most players should prestige 3-5 times for "full" experience
    ```
    
  #### **Rationale**
    Bad prestige: "Do everything again but slightly faster"
    Good prestige: "Do everything again with new tools and knowledge"
    

---
  #### **Name**
Horizontal Progression Islands
  #### **Description**
    Once vertical power growth caps, expand horizontally into "islands" -
    self-contained progression systems that don't inflate main power.
    
  #### **Context**
Endgame design, preventing power creep
  #### **Implementation**
    ```javascript
    // Guild Wars 2's Mastery system
    const horizontalProgressionIslands = {
      mainProgression: {
        type: "Vertical",
        cap: "Level 80, BiS gear achievable",
        timeline: "40-60 hours"
      },
    
      horizontalIslands: [
        {
          name: "Mounts",
          progression: "Unlock abilities, not stats",
          example: "Raptor: Longer jump, not more damage"
        },
        {
          name: "Crafting Mastery",
          progression: "New recipes, not stronger gear",
          example: "Legendary weapons = cosmetic + convenience"
        },
        {
          name: "Story Achievements",
          progression: "Titles, cosmetics, lore",
          example: "No power gain, pure expression"
        },
        {
          name: "Challenge Modes",
          progression: "Skill expression",
          example: "Leaderboards, time trials"
        }
      ],
    
      // The key insight: Islands should be OPTIONAL but ATTRACTIVE
      // Players choose based on interest, not power necessity
    };
    ```
    
  #### **Rationale**
    Infinite vertical progression leads to power creep and content trivialization.
    Horizontal progression lets completionists engage without breaking balance.
    

---
  #### **Name**
The Meaningful Choice Framework
  #### **Description**
    Every upgrade choice must pass the "meaningful choice" test:
    Are there scenarios where each option is optimal?
    
  #### **Context**
Skill point allocation, talent selection, item choices
  #### **Implementation**
    ```javascript
    // The Three Pillars of Meaningful Choice
    const meaningfulChoiceFramework = {
      pillar1_distinctIdentity: {
        rule: "Each option must FEEL different to play",
        bad: "+5% fire damage vs +5% ice damage",
        good: "Fireball (burst) vs Ice Storm (area control)"
      },
    
      pillar2_situationalOptimality: {
        rule: "No option is best in ALL situations",
        bad: "+10% damage (always good)",
        good: "+20% damage vs bosses OR +30% damage vs groups"
      },
    
      pillar3_expressionNotMath: {
        rule: "Choice expresses playstyle, not spreadsheet skills",
        bad: "Option A is 3% better DPS",
        good: "Option A rewards aggressive play, B rewards patience"
      },
    
      // The litmus test:
      test: `
        Ask 100 players which option they prefer.
        If >70% choose the same option, it's not meaningful.
        Target: 30-40-30 split across three options.
      `
    };
    ```
    
  #### **Rationale**
    Choices that have obvious answers aren't choices - they're traps.
    True choice creates build diversity and replayability.
    

---
  #### **Name**
Power Budget Architecture
  #### **Description**
    Define a total "power budget" for each player milestone. All sources
    of power (gear, skills, passives) draw from this budget, preventing
    uncontrolled scaling.
    
  #### **Context**
Balancing multiple progression vectors
  #### **Implementation**
    ```javascript
    // Define power in a normalized unit
    const powerBudget = {
      level1: { totalBudget: 100, breakdown: {
        baseStat: 50,
        skills: 30,
        gear: 20
      }},
    
      level50: { totalBudget: 1000, breakdown: {
        baseStat: 200,   // 4x growth
        skills: 400,     // 13x growth (main scaling)
        gear: 300,       // 15x growth
        passives: 100    // New source
      }},
    
      level100: { totalBudget: 5000, breakdown: {
        baseStat: 300,   // Diminishing returns
        skills: 1500,
        gear: 2000,
        passives: 800,
        setBonus: 400    // New source unlocked late
      }}
    };
    
    // The scaling ratio should follow:
    // Early game: Stats > Skills > Gear (easy to understand)
    // Mid game: Skills > Gear > Stats (build identity emerges)
    // End game: Gear > Skills > Stats (farming motivation)
    ```
    
  #### **Rationale**
    Without a budget, stacking multipliers creates exponential power growth.
    A budget forces tradeoffs: more of X means less of Y.
    

---
  #### **Name**
Anti-Grind Checkpoints
  #### **Description**
    Place guaranteed progression checkpoints that prevent "bad luck"
    streaks from blocking progress entirely. Players should never feel
    stuck due to RNG.
    
  #### **Context**
Loot-driven games, gacha elements, RNG progression
  #### **Implementation**
    ```javascript
    // Pity system design
    const antiGrindCheckpoints = {
      lootPity: {
        implementation: "Track attempts since last rare drop",
        threshold: "2x expected attempts = guaranteed drop",
        example: "1% drop rate? Guaranteed at 200 attempts",
        hidden: false // Always show progress to pity
      },
    
      upgradeProtection: {
        implementation: "Failed upgrades increase success chance",
        example: "+10% per failure, resets on success",
        alternative: "3 failures = free success"
      },
    
      progressFloor: {
        implementation: "Minimum XP/rewards per time unit",
        example: "Always gain at least 1000 XP per hour of play",
        purpose: "Respects player time investment"
      },
    
      // The critical UX element:
      visibility: {
        rule: "ALWAYS show progress toward checkpoint",
        bad: "Hidden pity timer",
        good: "42/200 attempts toward guaranteed legendary"
      }
    };
    ```
    
  #### **Rationale**
    RNG creates excitement but also frustration.
    Checkpoints preserve excitement while capping frustration.
    

---
  #### **Name**
Session Goal Bracketing
  #### **Description**
    Design progression milestones to fit common play session lengths.
    15-minute, 30-minute, and 60-minute players should all have
    achievable goals.
    
  #### **Context**
Broad audience games, mobile/casual design
  #### **Implementation**
    ```javascript
    const sessionBrackets = {
      micro: {
        duration: "5-15 minutes",
        goals: ["Complete daily quest", "One dungeon run", "Quick PvP match"],
        reward: "Immediate satisfaction",
        example: "Slay the Spire: One floor of the Spire"
      },
    
      short: {
        duration: "30-45 minutes",
        goals: ["Level up once", "Complete zone", "Meaningful gear upgrade"],
        reward: "Progress feeling",
        example: "Hades: One full run"
      },
    
      standard: {
        duration: "60-90 minutes",
        goals: ["Story chapter", "Major milestone", "New ability unlock"],
        reward: "Achievement feeling",
        example: "Diablo: Clear an Act"
      },
    
      long: {
        duration: "2+ hours",
        goals: ["Prestige reset", "Major content completion", "Build finalization"],
        reward: "Investment payoff",
        example: "PoE: Reach maps on new character"
      },
    
      // Design rule: Every session should end with a "one more" hook
      // but also a natural stopping point
    };
    ```
    
  #### **Rationale**
    Players have different amounts of time.
    Respecting all playstyles builds loyalty.
    

---
  #### **Name**
New Game Plus Philosophy
  #### **Description**
    NG+ should transform, not just scale. Each cycle should reveal
    new dimensions of the game that weren't visible before.
    
  #### **Context**
Single-player games with replay value
  #### **Implementation**
    ```javascript
    const ngPlusPhilosophy = {
      tier1_basic: {
        changes: ["Enemies have more HP/damage", "Retain some gear"],
        feeling: "Victory lap with challenge",
        example: "Dark Souls NG+"
      },
    
      tier2_remixed: {
        changes: [
          "New enemy placements",
          "Altered boss patterns",
          "New item locations"
        ],
        feeling: "Familiar but surprising",
        example: "Resident Evil's second scenarios"
      },
    
      tier3_transformed: {
        changes: [
          "New story content/endings",
          "Unlock hidden mechanics",
          "Role reversal possibilities"
        ],
        feeling: "New game experience",
        example: "NieR: Automata's Route B-E"
      },
    
      // The golden question:
      test: "Would a player who loved the base game pay for NG+ as DLC?",
      target: "If yes for tier 2-3, you've succeeded"
    };
    ```
    
  #### **Rationale**
    Bad NG+: "Play the same game but everything has bigger numbers"
    Good NG+: "Play the same game with new eyes"
    

## Anti-Patterns


---
  #### **Name**
Exponential Power Creep
  #### **Description**
    Allowing multiplicative stacking that results in exponential power
    growth, trivializing content.
    
  #### **Bad Example**
    ```javascript
    // Broken: Multiplicative stacking
    damage = baseDamage * (1 + gearBonus) * (1 + skillBonus) * (1 + buffBonus);
    // Results in: 100 * 1.5 * 1.5 * 1.5 = 337.5 damage (3.4x multiplier!)
    ```
    
  #### **Good Example**
    ```javascript
    // Fixed: Additive with diminishing returns
    totalBonus = gearBonus + skillBonus + buffBonus;
    effectiveBonus = Math.log2(totalBonus + 1); // Diminishing returns
    damage = baseDamage * (1 + effectiveBonus);
    // Results in: 100 * 1.58 = 158 damage (controlled growth)
    ```
    
  #### **Consequences**
    - Old content becomes trivial
    - Balance becomes impossible
    - New players feel impossibly behind

---
  #### **Name**
False Choice Traps
  #### **Description**
    Presenting "choices" where one option is mathematically superior
    in all situations.
    
  #### **Bad Example**
    ```javascript
    // Bad: No real choice
    talent1: "+5% damage"
    talent2: "+3% damage and +2% move speed"
    // Talent 1 is ALWAYS worse
    ```
    
  #### **Good Example**
    ```javascript
    // Good: Situational tradeoffs
    talent1: "+15% single target damage"
    talent2: "+8% damage to all enemies in area"
    // Both are optimal in different content
    ```
    

---
  #### **Name**
Time-Gated FOMO
  #### **Description**
    Creating artificial urgency through limited-time content that
    punishes players for having lives outside the game.
    
  #### **Bad Example**
    ```javascript
    // Bad: Miss a day, miss the reward forever
    dailyQuest: {
      reward: "Unique cosmetic piece 7/30",
      missedDay: "Series broken, cannot complete set"
    }
    ```
    
  #### **Good Example**
    ```javascript
    // Good: Flexible completion
    weeklyProgress: {
      goal: "Complete 5 dailies this week",
      flexibility: "Do them any 5 days",
      catchUp: "Next week's dailies count toward missed sets"
    }
    ```
    

---
  #### **Name**
Prestige Punishment
  #### **Description**
    Making prestige resets feel like losing progress rather than
    gaining mastery.
    
  #### **Bad Example**
    ```javascript
    // Bad: Pure reset
    function prestige() {
      player.level = 1;
      player.skills = [];
      player.gear = [];
      player.prestigeCount++;
      // Player feels: "I lost everything"
    }
    ```
    
  #### **Good Example**
    ```javascript
    // Good: Knowledge persists
    function prestige() {
      player.level = 1;
      player.keepUnlockedSkillTree = true; // Can respec into known builds
      player.keepCraftingRecipes = true;   // Can recreate gear faster
      player.bonusXPMultiplier += 0.25;    // Speed through known content
      player.unlockNewMechanic();          // Something new to explore
      // Player feels: "I'm starting fresh with wisdom"
    }
    ```
    

---
  #### **Name**
Invisible Progress
  #### **Description**
    Hiding progression numbers or making them incomprehensible, leaving
    players unable to feel their growth.
    
  #### **Bad Example**
    ```javascript
    // Bad: Hidden math
    console.log("You deal damage: " + damage); // Just a number
    ```
    
  #### **Good Example**
    ```javascript
    // Good: Legible power
    console.log(`Damage: ${baseDamage} + ${gearDamage} + ${skillDamage} = ${totalDamage}`);
    console.log(`Your DPS increased by 15% since last level!`);
    ```
    

---
  #### **Name**
Reward Dilution
  #### **Description**
    Adding too many reward types that individually feel meaningless.
    
  #### **Bad Example**
    ```javascript
    // Bad: Currency soup
    rewards = {
      gold: 100,
      gems: 5,
      energy: 10,
      tokens: 3,
      shards: 2,
      essence: 50,
      points: 1000
      // Player thinks: "What do any of these mean?"
    };
    ```
    
  #### **Good Example**
    ```javascript
    // Good: Focused rewards
    rewards = {
      gold: 1000,        // Universal currency
      craftingMats: 10,  // Build progression
      seasonPoints: 50   // Time-limited goals
      // Player thinks: "Gold for now, mats for upgrades, points for season"
    };
    ```
    

---
  #### **Name**
Level Cap Paralysis
  #### **Description**
    Reaching max level and having nothing meaningful to progress toward.
    
  #### **Bad Example**
    ```javascript
    // Bad: Dead end
    if (player.level === MAX_LEVEL) {
      return "Congratulations! You beat the game.";
      // Player leaves
    }
    ```
    
  #### **Good Example**
    ```javascript
    // Good: Transition to endgame
    if (player.level === MAX_LEVEL) {
      unlockParagonSystem();  // Infinite incremental progression
      unlockMasteryTracks();  // Horizontal progression
      unlockSeasonalContent(); // Renewable goals
      // Player stays
    }
    ```
    