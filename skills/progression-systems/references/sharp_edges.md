# Progression Systems - Sharp Edges

## Power Creep Death Spiral

### **Id**
power-creep-spiral
### **Severity**
critical
### **Description**
  Each content update adds stronger rewards, requiring stronger enemies,
  requiring stronger rewards. Within 2-3 years, original content is
  irrelevant and numbers become incomprehensible.
  
### **Symptoms**
  - Damage numbers in millions/billions
  - Old dungeons one-shot by new players
  - Gear from 2 patches ago is vendor trash
  - New players can't engage with veterans
### **Root Causes**
  - Multiplicative stat scaling
  - No power budget enforcement
  - Vertical-only progression philosophy
  - Pressure to make new content 'feel' powerful
### **Prevention**
  ```javascript
  // Enforce power budget at design level
  const POWER_BUDGET = {
    max_player_dps: 100000,
    max_enemy_hp: 10000000,
    max_damage_multiplier: 5.0
  };
  
  function validateNewContent(content) {
    if (content.rewards.dps > POWER_BUDGET.max_player_dps) {
      throw new Error("Power budget exceeded - use horizontal reward");
    }
  }
  
  // Cap multiplicative bonuses
  function calculateDamage(base, multipliers) {
    const cappedMultiplier = Math.min(
      multipliers.reduce((a, b) => a * b, 1),
      POWER_BUDGET.max_damage_multiplier
    );
    return base * cappedMultiplier;
  }
  ```
  
### **Real World Examples**
  - Diablo III pre-Loot 2.0: Billions of damage, meaningless numbers
  - World of Warcraft: Stat squishes every 2-3 expansions
  - Destiny 2: Sunsetting controversy from power creep

## The 'Solved Game' Problem

### **Id**
optimal-build-discovery
### **Severity**
high
### **Description**
  Within weeks of release, the community discovers the one optimal
  build. All other choices become "wrong," destroying build diversity.
  
### **Symptoms**
  - Every guide recommends the same build
  - Players feel 'forced' into one playstyle
  - Content balanced around optimal build
  - Non-optimal players can't complete content
### **Root Causes**
  - Multiplicative synergies between specific skills
  - One damage type clearly superior
  - Defensive options too weak to consider
  - Content rewards only DPS, not utility
### **Prevention**
  ```javascript
  // Design principle: Content should reward different builds
  const contentDesign = {
    bossA: {
      weakness: "burst damage",
      resistance: "sustained damage",
      mechanic: "dodge-heavy"
    },
    bossB: {
      weakness: "sustained damage",
      resistance: "burst damage",
      mechanic: "tank-and-spank"
    },
    bossC: {
      weakness: "utility/control",
      mechanic: "add management",
      ignoresDPS: true // DPS build struggles here
    }
  };
  
  // Synergy caps prevent "solved" stacking
  function calculateSynergyBonus(synergies) {
    // First synergy: full value
    // Each additional: 50% of previous
    return synergies.reduce((total, syn, i) => {
      return total + syn.value * Math.pow(0.5, i);
    }, 0);
  }
  ```
  
### **Real World Examples**
  - Path of Exile: Meta builds dominate each league
  - Elden Ring: Rivers of Blood dominated PvP
  - Every MMO: 'You're not using optimal rotation?'

## Time Investment > Skill Expression

### **Id**
time-vs-skill-progression
### **Severity**
high
### **Description**
  When progression is purely time-based, skilled players feel
  unrewarded and unskilled players feel carried. Neither is engaged.
  
### **Symptoms**
  - AFK farming is optimal strategy
  - Skill expression doesn't matter
  - New players with time beat veterans without time
  - Content feels like a job, not a game
### **Root Causes**
  - XP granted per time, not performance
  - No skill-based bonus rewards
  - Content too easy to fail
  - Player power entirely from gear, not skill
### **Prevention**
  ```javascript
  // Reward both time AND skill
  function calculateRunReward(run) {
    const baseReward = run.completed ? 100 : 0;
  
    // Time bonus: faster = more per hour
    const timeBonus = Math.max(0, 1 - (run.time / run.parTime)) * 50;
  
    // Skill bonus: no deaths, optional objectives
    const skillBonus =
      (run.deaths === 0 ? 30 : 0) +
      (run.optionalObjectives * 10);
  
    // Performance multiplier: affects drop quality
    const performanceMultiplier = 1 + (skillBonus / 100);
  
    return {
      xp: baseReward + timeBonus,
      lootQualityBonus: performanceMultiplier,
      currencyBonus: skillBonus
    };
  }
  ```
  
### **Real World Examples**
  - Mobile games: Auto-battle becomes optimal
  - Lost Ark: 'daily chores' feeling
  - Contrast: Hades rewards skilled play with Heat

## Permanent Choice Paralysis

### **Id**
irreversible-choice-regret
### **Severity**
high
### **Description**
  Forcing permanent, irreversible choices causes paralysis and regret.
  Players research extensively before playing, or quit after "messing up."
  
### **Symptoms**
  - Players spend more time on wikis than playing
  - 'Did I waste my points?' anxiety
  - Community demands respec systems
  - New players avoid committing to anything
### **Root Causes**
  - No respec mechanism
  - Choices too consequential too early
  - Information asymmetry (player doesn't know what's good)
  - Choices visible but implications hidden
### **Prevention**
  ```javascript
  // Tiered permanence: Early = flexible, Late = committed
  const choiceDesign = {
    earlyGame: {
      permanence: "freely reversible",
      cost: "none",
      philosophy: "Experimentation zone"
    },
  
    midGame: {
      permanence: "reversible with cost",
      cost: "moderate currency",
      philosophy: "Commitment with safety net"
    },
  
    endGame: {
      permanence: "costly to reverse",
      cost: "rare currency or quest",
      philosophy: "Meaningful but not punishing"
    }
  };
  
  // Preview system: Show outcomes before committing
  function previewChoice(choice) {
    return {
      currentStats: player.stats,
      projectedStats: simulateChoice(choice),
      synergies: findSynergies(choice),
      warnings: findAntiSynergies(choice),
      reversalCost: calculateReversalCost()
    };
  }
  ```
  
### **Real World Examples**
  - Diablo II original: One chance to allocate stats
  - Path of Exile: Complex tree, regret orbs as solution
  - Elden Ring: Respec locked until mid-game, limited respecs

## FOMO-Driven Engagement Collapse

### **Id**
reward-schedule-burnout
### **Severity**
high
### **Description**
  Daily/weekly rewards that require consistent engagement eventually
  cause burnout. Players feel obligated, not excited, then quit entirely.
  
### **Symptoms**
  - Players log in, do dailies, log out
  - Streaks feel like chains, not achievements
  - 'I can't take a vacation' complaints
  - Sudden mass exodus after extended play
### **Root Causes**
  - Missing a day = permanent loss
  - Daily rewards exceed weekly value
  - No catch-up mechanism
  - Streak bonuses too powerful to risk
### **Prevention**
  ```javascript
  // Flexible reward systems
  const healthyRewardSchedule = {
    dailyQuests: {
      count: 3,
      completion: "Any 5 in a week = full weekly reward",
      rollover: "Unclaimed dailies stack up to 3 days",
      streakBonus: "Cosmetic only, no power"
    },
  
    weeklyGoals: {
      completion: "Play 4/7 days = full weekly",
      catchUp: "Missed weekly can be earned via double progress next week",
      absolute: "Hard cap prevents no-life advantage"
    },
  
    seasonPass: {
      pacing: "Completable playing 3-4 days/week",
      endOfSeason: "Remaining levels purchasable (cosmetic only)",
      noPowerGating: "All power available through normal play"
    }
  };
  
  // Diminishing returns on daily play
  function calculateDailyReward(playTime, daysThisWeek) {
    const baseReward = 100;
    // First 30 mins: full reward
    // Next 30 mins: 50% reward
    // After 1 hour: 10% reward (anti-grind)
    const timeMultiplier = Math.min(1, playTime / 30) +
      Math.min(0.5, Math.max(0, playTime - 30) / 60) +
      Math.max(0, playTime - 60) * 0.001;
  
    return baseReward * timeMultiplier;
  }
  ```
  
### **Real World Examples**
  - Destiny 2: 'Destiny is my job' feeling
  - Genshin Impact: Resin system fatigue
  - Contrast: Sea of Thieves - No FOMO, healthy engagement

## Prestige as Punishment

### **Id**
prestige-punishment-loop
### **Severity**
medium
### **Description**
  When prestige resets too much or unlocks too little, players feel
  punished for progressing rather than rewarded for mastery.
  
### **Symptoms**
  - Players resist prestige even when optimal
  - 'Why would I erase my progress?'
  - Prestige feels mandatory, not exciting
  - Early prestigers regret it
### **Root Causes**
  - Too much resets, not enough persists
  - New unlocks are minor buffs, not new gameplay
  - Prestige just means 'do it again faster'
  - No visible milestone for prestige count
### **Prevention**
  ```javascript
  // Prestige should feel like graduation
  const prestigeDesign = {
    // The "70/30 Rule": Reset 70% of numbers, keep 30% of identity
    resets: {
      level: true,
      currency: true,
      equipment: true,
      mapProgress: true
    },
  
    persists: {
      unlockedFeatures: true,
      masteryKnowledge: true,
      cosmeticRewards: true,
      achievementProgress: true
    },
  
    // Each prestige MUST unlock something NEW
    prestigeUnlocks: {
      1: "Unlock crafting system",
      2: "Unlock enchanting system",
      3: "Unlock challenge modes",
      4: "Unlock character customization",
      5: "Unlock new game mode"
    },
  
    // Visible mastery
    prestigeDisplay: {
      border: "Prestige tier changes profile border",
      title: "Exclusive titles per tier",
      leaderboard: "Separate prestige leaderboard"
    }
  };
  ```
  
### **Real World Examples**
  - Cookie Clicker: Prestige feels like losing (early design)
  - Rogue Legacy: Prestige unlocks new abilities
  - Hades: Mirror upgrades make prestige feel like power

## Hidden Soft Caps

### **Id**
hidden-soft-cap-frustration
### **Severity**
medium
### **Description**
  When players hit invisible diminishing returns, they feel cheated.
  "Why did leveling suddenly take 10x longer?"
  
### **Symptoms**
  - Player complaints about 'hitting a wall'
  - Confusion about why progress slowed
  - Suspicion of hidden paywalls
  - Guides needed to explain soft caps
### **Root Causes**
  - Soft caps not communicated in-game
  - No UI indication of diminishing returns
  - Curve changes abruptly
  - No explanation of design intent
### **Prevention**
  ```javascript
  // Always communicate caps
  function displayLevelProgress(currentXP, currentLevel) {
    const nextLevelXP = xpForLevel(currentLevel + 1);
    const progress = currentXP / nextLevelXP;
  
    // Show when approaching soft cap
    const softCapLevel = 50;
    if (currentLevel >= softCapLevel - 5) {
      return {
        progress: progress,
        warning: `Beyond level ${softCapLevel}, leveling slows significantly.`,
        explanation: "This is the transition to endgame progression.",
        alternative: "Paragon system unlocks for continued growth."
      };
    }
  
    return { progress: progress };
  }
  
  // Smooth curves, no sudden cliffs
  function xpForLevel(level) {
    // Gradual scaling increase, never sudden jumps
    const base = 100;
    const scalingFactor = 1 + (level * 0.02); // 2% harder per level
    return Math.floor(base * Math.pow(level, 1.5) * scalingFactor);
  }
  ```
  
### **Real World Examples**
  - Genshin Impact: World Level scaling confusion
  - Many MMOs: XP curve steepens without explanation
  - Contrast: Dark Souls - Clear SL meta explained by community

## Loot Inflation

### **Id**
loot-dilution-meaninglessness
### **Severity**
medium
### **Description**
  When loot drops constantly and 99.9% is instant vendor trash,
  each individual drop loses excitement.
  
### **Symptoms**
  - Players don't look at drops anymore
  - Inventory management is a chore
  - 'Why does this boss drop 50 items?'
  - Good items don't feel special
### **Root Causes**
  - Drop rate too high
  - Item variety without item differentiation
  - No smart loot filtering
  - Quantity > Quality philosophy
### **Prevention**
  ```javascript
  // Quality over Quantity loot design
  const lootPhilosophy = {
    // Diablo IV "Fewer but Better" approach
    dropRate: {
      common: "Rare (tutorial only)",
      magic: "Uncommon (mostly salvage)",
      rare: "Common (progression items)",
      legendary: "Uncommon (build-defining)",
      unique: "Rare (chase items)"
    },
  
    smartLoot: {
      enabled: true,
      rules: [
        "80% of drops = usable by current class",
        "Stat rolls weighted toward player build",
        "Auto-salvage threshold by rarity"
      ]
    },
  
    excitementPreservation: {
      legendaryDrops: {
        visualCue: "Beam of light, unique sound",
        dropChance: "~1 per hour of play",
        guaranteedRelevance: "Always has class-appropriate stats"
      }
    }
  };
  
  // Consolidation over inflation
  function calculateLoot(enemy) {
    if (enemy.isBoss) {
      // One good drop, not 50 bad ones
      return [generateGuaranteedRelevantItem(enemy.tier)];
    }
    // Normal enemies: Currency, not junk items
    return [{ type: 'currency', amount: enemy.tier * 10 }];
  }
  ```
  
### **Real World Examples**
  - Diablo III launch: 'No legendaries, then worthless legendaries'
  - Borderlands: 'Legendaries everywhere = not legendary'
  - Contrast: Elden Ring - Few drops, all memorable

## Level Scaling Makes Levels Meaningless

### **Id**
level-scaling-paradox
### **Severity**
medium
### **Description**
  When everything scales to player level, leveling provides no
  tangible benefit. Why level up if the world levels too?
  
### **Symptoms**
  - 'What's the point of leveling?'
  - Numbers go up but nothing changes
  - No power fantasy fulfillment
  - Early zones never feel conquered
### **Root Causes**
  - 100% enemy scaling to player level
  - No 'breakpoints' where player becomes stronger
  - Flat scaling without skill expression
  - Desire for 'go anywhere' trumps progression feel
### **Prevention**
  ```javascript
  // Hybrid scaling: Zones have level ranges
  function calculateEnemyLevel(zoneBaseLevel, playerLevel) {
    const minLevel = zoneBaseLevel;
    const maxLevel = zoneBaseLevel + 20; // Zone has a ceiling
  
    // Enemies scale up to meet player, but cap at zone max
    const scaledLevel = Math.min(
      playerLevel,
      maxLevel
    );
  
    // But never below zone minimum (preserve challenge on entry)
    return Math.max(scaledLevel, minLevel);
  }
  
  // Power breakpoints every 10 levels
  const powerBreakpoints = {
    10: { bonus: "+20% damage to sub-10 enemies" },
    20: { bonus: "+50% damage to sub-15 enemies, can skip basic attacks" },
    30: { bonus: "Auto-kill enemies 20+ levels below" }
  };
  
  // The key insight:
  // Scaling preserves challenge in CURRENT content
  // Breakpoints provide power fantasy in OLD content
  ```
  
### **Real World Examples**
  - Oblivion: Bandits in glass armor at level 30
  - Assassin's Creed Odyssey: Level scaling backlash
  - Contrast: Witcher 3 - Fixed level zones, clear progression

## Achievement Spam Devaluation

### **Id**
achievement-notification-fatigue
### **Severity**
low
### **Description**
  When achievements pop constantly for trivial actions, significant
  achievements are lost in the noise.
  
### **Symptoms**
  - Players dismiss achievement popups
  - No pride in actual achievements
  - Achievement hunting feels like busywork
  - 100% completion is trivial grind
### **Root Causes**
  - Too many achievements
  - Achievements for expected play
  - No achievement hierarchy
  - Equal presentation for unequal feats
### **Prevention**
  ```javascript
  const achievementDesign = {
    // Tier system: Different fanfare for different feats
    tiers: {
      milestone: {
        frequency: "Expected progression",
        presentation: "Subtle notification",
        examples: ["Reach level 10", "Complete tutorial"],
        sound: "Soft chime"
      },
  
      accomplishment: {
        frequency: "Moderate effort",
        presentation: "Medium notification",
        examples: ["Defeat first boss", "Craft rare item"],
        sound: "Achievement fanfare"
      },
  
      feat: {
        frequency: "Significant skill/time",
        presentation: "Full-screen celebration",
        examples: ["Complete without dying", "Find all secrets"],
        sound: "Triumphant orchestra",
        reward: "Exclusive title/cosmetic"
      },
  
      legendary: {
        frequency: "<1% of players",
        presentation: "Unique celebration + server announcement",
        examples: ["World first", "Impossible challenge"],
        sound: "Unique legendary theme",
        reward: "Unique cosmetic + permanent record"
      }
    },
  
    // The 70/20/10 rule
    distribution: {
      milestone: "70% - Most players get most of these",
      accomplishment: "20% - Engaged players get these",
      feat: "9% - Dedicated players only",
      legendary: "1% - The elite few"
    }
  };
  ```
  
### **Real World Examples**
  - Xbox 360 era: 'Achievement unlocked: Started the game'
  - Modern games: 500+ achievements, none memorable
  - Contrast: Dark Souls - Few achievements, each earned

## Battle Pass Completion Anxiety

### **Id**
battle-pass-math-failure
### **Severity**
medium
### **Description**
  When battle pass pacing requires more hours than casual players have,
  it creates anxiety and eventual abandonment.
  
### **Symptoms**
  - 'I paid but can't finish'
  - Calculators for 'can I make it?'
  - Play becomes obligation
  - Late-season desperate grinding
### **Root Causes**
  - Pacing based on hardcore players
  - Weekly requirements too demanding
  - XP curve back-loaded
  - FOMO from exclusive rewards
### **Prevention**
  ```javascript
  const healthyBattlePass = {
    // Pacing math: 60-day season, 100 tiers
    pacing: {
      tierXP: 10000,
      dailyXP: {
        casual: 5000,    // 30 min/day
        regular: 10000,  // 1 hour/day
        hardcore: 20000  // 2+ hours/day
      },
      weeklyBonus: 50000, // Completable in 2-3 play sessions
      calculatedFinish: {
        casual: "Day 55 (5 days buffer)",
        regular: "Day 35 (25 days buffer)",
        hardcore: "Day 20 (40 days buffer)"
      }
    },
  
    // Anti-FOMO measures
    antiFOMO: {
      allTiersUnlockable: true,  // Can earn everything eventually
      previousPassItems: "Available next season for purchase",
      endOfSeasonCatchUp: "Boosted XP in final week",
      purchaseOption: "Buy remaining tiers at end (no advantage)"
    },
  
    // XP curve should be FLAT, not exponential
    tierXPCurve: "10000 XP for every tier, tier 1 = tier 100"
  };
  ```
  
### **Real World Examples**
  - Fortnite: Generally achievable pacing
  - Halo Infinite: Battle pass never expires (good!)
  - Many games: Back-loaded passes cause burnout