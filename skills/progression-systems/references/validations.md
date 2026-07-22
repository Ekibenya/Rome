# Progression Systems - Validations

## XP Curve Sanity Check

### **Id**
xp-curve-sanity
### **Description**
Validates that XP curves don't become impossible
### **Severity**
error
### **Category**
balance
### **Check**
  // Check that level N+1 doesn't require more than 3x level N
  function validateXPCurve(xpFunction, maxLevel = 100) {
    for (let level = 1; level < maxLevel; level++) {
      const current = xpFunction(level);
      const next = xpFunction(level + 1);
      const ratio = next / current;
  
      if (ratio > 3) {
        return {
          valid: false,
          error: `Level ${level + 1} requires ${ratio.toFixed(2)}x level ${level} - max is 3x`,
          suggestion: "Use logarithmic scaling or reduce exponent"
        };
      }
    }
    return { valid: true };
  }
  
### **Pattern**
  (xpForLevel|levelXP|experienceRequired|xpRequired)\s*[=:]\s*\(.*\)\s*=>
  
### **Fix Template**
  // Recommended XP curve formula (Diablo II style)
  const xpForLevel = (level) => Math.floor(100 * Math.pow(level, 1.5));
  
  // For softer curve:
  const casualXP = (level) => Math.floor(100 * level * Math.log2(level + 1));
  

## Level Cap Must Be Defined

### **Id**
level-cap-defined
### **Description**
Ensures max level is explicitly set to prevent unbounded progression
### **Severity**
warning
### **Category**
design
### **Pattern**
  (maxLevel|MAX_LEVEL|levelCap|LEVEL_CAP)\s*[=:]\s*\d+
  
### **Anti Pattern**
  level\s*[<>]=?\s*(?!.*maxLevel|MAX_LEVEL|levelCap)
  
### **Message**
Level comparison without cap check - define MAX_LEVEL constant
### **Fix Template**
  const MAX_LEVEL = 100;
  if (player.level < MAX_LEVEL) {
    // Level up logic
  }
  

## Catch-Up Mechanic Exists

### **Id**
catch-up-mechanism
### **Description**
Checks for presence of catch-up XP or leveling acceleration
### **Severity**
warning
### **Category**
design
### **Patterns**
  - rested(XP|Bonus|Multiplier)
  - catchUp(Bonus|Multiplier|XP)
  - levelBehindBonus
  - underlevelBonus
### **Message**
No catch-up mechanism detected - consider rested XP or underdog bonus
### **Implementation Guide**
  // Rested XP (WoW style)
  function calculateXP(baseXP, player) {
    let multiplier = 1.0;
  
    if (player.restedXP > 0) {
      multiplier = 2.0;
      player.restedXP -= baseXP;
    }
  
    return baseXP * multiplier;
  }
  
  // Underdog bonus (for multiplayer)
  function getUnderdogBonus(playerLevel, averageLevel) {
    const levelDiff = averageLevel - playerLevel;
    if (levelDiff > 0) {
      return 1 + (levelDiff * 0.05); // +5% per level behind
    }
    return 1;
  }
  

## All Skills Must Be Reachable

### **Id**
skill-tree-reachability
### **Description**
Validates that no skill is locked behind impossible prerequisites
### **Severity**
error
### **Category**
logic
### **Check**
  function validateSkillTree(tree) {
    const reachable = new Set(['root']);
    let changed = true;
  
    while (changed) {
      changed = false;
      for (const [skill, prereqs] of Object.entries(tree.skills)) {
        if (!reachable.has(skill) && prereqs.every(p => reachable.has(p))) {
          reachable.add(skill);
          changed = true;
        }
      }
    }
  
    const unreachable = Object.keys(tree.skills).filter(s => !reachable.has(s));
    if (unreachable.length > 0) {
      return { valid: false, unreachable };
    }
    return { valid: true };
  }
  
### **Message**
Skill tree has unreachable nodes - check prerequisites

## Skill Points Must Match Content

### **Id**
skill-point-budget
### **Description**
Validates that max skill points can't unlock everything
### **Severity**
warning
### **Category**
balance
### **Pattern**
  (totalSkillPoints|MAX_SKILL_POINTS|skillPointsPerLevel\s*\*\s*maxLevel)
  
### **Check**
  function validateSkillPointBudget(totalPoints, totalSkillCost) {
    const ratio = totalPoints / totalSkillCost;
  
    if (ratio >= 1.0) {
      return {
        valid: false,
        error: "Players can unlock all skills - no meaningful choice",
        ratio: ratio,
        suggestion: "Reduce total points or add more skills"
      };
    }
  
    // Optimal: 40-60% of tree is unlockable
    if (ratio < 0.3 || ratio > 0.7) {
      return {
        valid: true,
        warning: `Skill budget ratio is ${(ratio * 100).toFixed(0)}% - optimal is 40-60%`
      };
    }
  
    return { valid: true };
  }
  
### **Fix Template**
  // Rule of thumb: Player should unlock 40-60% of tree
  const MAX_LEVEL = 50;
  const SKILL_POINTS_PER_LEVEL = 1;
  const TOTAL_SKILL_POINTS = MAX_LEVEL * SKILL_POINTS_PER_LEVEL; // 50
  
  // Design 80-125 skill points worth of skills
  const TOTAL_SKILL_COST = 100; // Player can get 50% of tree
  

## Skill Choices Must Be Meaningful

### **Id**
meaningful-choice-validation
### **Description**
Checks for identical or strictly-better skill options
### **Severity**
warning
### **Category**
design
### **Pattern**
  // Flag skills that are numerically similar
  (damage|bonus|effect)\s*:\s*(\d+)\s*%?
  
### **Check**
  function validateMeaningfulChoice(skills) {
    const warnings = [];
  
    for (let i = 0; i < skills.length; i++) {
      for (let j = i + 1; j < skills.length; j++) {
        const a = skills[i];
        const b = skills[j];
  
        // Check if one is strictly better
        if (a.sameTier && b.sameTier && a.cost === b.cost) {
          if (isStrictlyBetter(a.effects, b.effects)) {
            warnings.push(`${a.name} is strictly better than ${b.name}`);
          }
        }
      }
    }
  
    return { valid: warnings.length === 0, warnings };
  }
  
### **Message**
Detected skill options where one is always better - add situational tradeoffs

## Rare Drops Must Have Pity

### **Id**
pity-timer-exists
### **Description**
Any drop below 5% should have a pity/mercy timer
### **Severity**
warning
### **Category**
fairness
### **Patterns**
  - dropRate|dropChance|lootChance
### **Check**
  function validatePityExists(dropTable) {
    for (const [item, config] of Object.entries(dropTable)) {
      if (config.chance < 0.05 && !config.pity && !config.guaranteedAt) {
        return {
          valid: false,
          item: item,
          message: `${item} has ${config.chance * 100}% drop but no pity timer`
        };
      }
    }
    return { valid: true };
  }
  
### **Fix Template**
  // Add pity to rare drops
  const legendaryDrop = {
    chance: 0.01, // 1% per attempt
    pity: {
      enabled: true,
      incrementPerFail: 0.005, // +0.5% per miss
      guaranteedAt: 100 // 100 attempts = guaranteed
    }
  };
  

## Reward Timing Layers

### **Id**
reward-timing-validation
### **Description**
Validates presence of immediate, short, medium, and long-term rewards
### **Severity**
info
### **Category**
design
### **Patterns**
  #### **Immediate**
    - (xp|gold|currency).*tick
    - onKill|onHit|instant
  #### **Short Term**
    - levelUp|skillPoint|unlock
  #### **Medium Term**
    - daily|weekly|quest
  #### **Long Term**
    - season|prestige|achievement
### **Check**
  function validateRewardLayers(code) {
    const layers = {
      immediate: false,
      shortTerm: false,
      mediumTerm: false,
      longTerm: false
    };
  
    // Check for each layer
    // Return which layers are missing
  
    const missing = Object.entries(layers)
      .filter(([k, v]) => !v)
      .map(([k]) => k);
  
    if (missing.length > 0) {
      return {
        valid: false,
        missing: missing,
        message: `Missing reward layers: ${missing.join(', ')}`
      };
    }
    return { valid: true };
  }
  
### **Message**
Consider adding reward layers for better engagement pacing

## Avoid Pure Loss Penalties

### **Id**
no-loss-penalty
### **Description**
Warns when player can LOSE progress on failure
### **Severity**
warning
### **Category**
psychology
### **Patterns**
  - player\.xp\s*-=|xp\s*=.*-
  - level--|-=.*level
  - player\.(currency|gold|gems)\s*-=(?!.*cost|purchase|buy)
  - lose.*progress|progress.*lost
### **Message**
Progress loss detected - consider failure as 'no gain' not 'loss'
### **Alternatives**
  // Instead of XP loss on death:
  // Option 1: XP freeze (keep XP, can't gain until recover)
  // Option 2: Bonus XP zone created at death location
  // Option 3: "Soul" system (retrieve within 10 min or lose)
  

## Check Multiplicative Stacking

### **Id**
multiplicative-stacking-check
### **Description**
Warns when multiple multipliers stack exponentially
### **Severity**
warning
### **Category**
balance
### **Patterns**
  - \*\s*\(1\s*\+.*\)\s*\*\s*\(1\s*\+
  - damage\s*\*=.*\*=
  - \.reduce\([^)]*\*
### **Message**
Multiple multiplicative bonuses detected - consider additive or capped
### **Fix Template**
  // Instead of multiplicative:
  // damage = base * (1 + bonus1) * (1 + bonus2) * (1 + bonus3)
  
  // Use additive:
  const totalBonus = bonus1 + bonus2 + bonus3;
  const damage = base * (1 + totalBonus);
  
  // Or capped multiplicative:
  const multiplier = Math.min(
    (1 + bonus1) * (1 + bonus2) * (1 + bonus3),
    MAX_MULTIPLIER
  );
  const damage = base * multiplier;
  

## Power Budget Defined

### **Id**
power-budget-enforcement
### **Description**
Checks that power caps are defined for the game
### **Severity**
info
### **Category**
design
### **Patterns**
  - POWER_BUDGET|MAX_DAMAGE|DAMAGE_CAP
  - maxDPS|dpsLimit|damageCeiling
### **Anti Pattern**
  damage.*=(?!.*Math\\.min|cap|limit|max)
  
### **Message**
Consider defining a power budget to prevent creep
### **Implementation Guide**
  // Define power budget at design level
  const POWER_BUDGET = {
    MAX_PLAYER_DPS: 1000000,
    MAX_ENEMY_HP: 100000000,
    MAX_MULTIPLIER: 5.0,
    MAX_CRIT_CHANCE: 0.75,
    MAX_CRIT_DAMAGE: 3.0
  };
  
  function validatePowerBudget(playerStats) {
    const dps = calculateDPS(playerStats);
    if (dps > POWER_BUDGET.MAX_PLAYER_DPS) {
      console.warn(`DPS ${dps} exceeds budget - check scaling`);
    }
  }
  

## Dailies Must Be Completable

### **Id**
daily-completability
### **Description**
Validates that daily tasks can be done in reasonable time
### **Severity**
warning
### **Category**
respect
### **Check**
  function validateDailyTasks(dailies, avgTaskTime) {
    const totalTime = dailies.reduce((sum, d) => sum + d.estimatedMinutes, 0);
  
    if (totalTime > 45) {
      return {
        valid: false,
        totalTime: totalTime,
        message: `Daily tasks take ${totalTime} min - max 45 min recommended`
      };
    }
  
    return { valid: true };
  }
  
### **Message**
Daily tasks exceed 45-minute budget - respect player time
### **Implementation Guide**
  // Design dailies for 15-30 minute completion
  const dailyQuests = {
    maxActive: 3,
    timeEstimate: "15-30 minutes total",
    rollover: true, // Can stack up to 3 days
    skipPenalty: false // Missing a day doesn't break streaks
  };
  

## Battle Pass Achievable

### **Id**
battle-pass-pacing
### **Description**
Validates battle pass can be completed by casual players
### **Severity**
warning
### **Category**
fairness
### **Check**
  function validateBattlePass(config) {
    const { seasonDays, totalTiers, xpPerTier, dailyXP, weeklyXP } = config;
  
    // Assume casual: plays 4 days/week, 30 min/day
    const casualDays = Math.floor(seasonDays * (4/7));
    const casualXP = (casualDays * dailyXP) + (Math.floor(seasonDays / 7) * weeklyXP);
    const casualTiers = Math.floor(casualXP / xpPerTier);
  
    if (casualTiers < totalTiers) {
      return {
        valid: false,
        casualTiers: casualTiers,
        message: `Casual player reaches tier ${casualTiers}/${totalTiers}`,
        suggestion: "Reduce XP/tier or add catch-up mechanisms"
      };
    }
  
    return { valid: true };
  }
  
### **Fix Template**
  // Battle pass pacing for 60-day season
  const battlePass = {
    totalTiers: 100,
    xpPerTier: 10000,
    totalXPNeeded: 1000000,
  
    dailyXP: {
      quests: 3000,
      passivePlay: 2000
    },
    weeklyXP: 50000,
  
    // Casual (4 days/week, 30 min): Completes by day 55
    // Regular (5 days/week, 1 hour): Completes by day 40
    // Hardcore: Completes by day 25
  };
  

## Streaks Should Have Grace

### **Id**
streak-grace-period
### **Description**
Checks that streak systems have grace periods
### **Severity**
info
### **Category**
psychology
### **Patterns**
  - streak.*reset|resetStreak|breakStreak
### **Check**
  function validateStreakGrace(streakConfig) {
    if (!streakConfig.gracePeriod && !streakConfig.freezeToken) {
      return {
        valid: false,
        message: "Streak system has no grace period or freeze option"
      };
    }
    return { valid: true };
  }
  
### **Fix Template**
  const streakSystem = {
    gracePeriod: 24 * 60 * 60 * 1000, // 24 hours grace
    freezeTokens: {
      earnedPer: "week",
      maxStored: 3,
      effect: "Freeze streak for 1 day"
    },
    // Alternative: Degradation instead of reset
    degradation: {
      missedDay: -1, // Lose 1 day of streak, not reset to 0
      minStreak: 0
    }
  };
  

## Prestige Must Add New Content

### **Id**
prestige-unlocks-new-content
### **Description**
Validates that each prestige tier unlocks new mechanics
### **Severity**
warning
### **Category**
design
### **Patterns**
  - prestigeUnlock|unlockOnPrestige|prestigeReward
### **Check**
  function validatePrestigeValue(prestigeTiers) {
    for (const [tier, rewards] of Object.entries(prestigeTiers)) {
      const hasNewContent = rewards.some(r =>
        r.type === 'mechanic' ||
        r.type === 'mode' ||
        r.type === 'feature'
      );
  
      if (!hasNewContent) {
        return {
          valid: false,
          tier: tier,
          message: `Prestige tier ${tier} only gives stat bonuses - add new content`
        };
      }
    }
    return { valid: true };
  }
  
### **Implementation Guide**
  // Each prestige should unlock something NEW to do
  const prestigeRewards = {
    1: {
      statBonus: "+25% XP",
      newContent: "Unlock Crafting System" // New mechanic
    },
    2: {
      statBonus: "+50% XP",
      newContent: "Unlock Challenge Modes" // New mode
    },
    3: {
      statBonus: "+75% XP",
      newContent: "Unlock Character Customization" // New feature
    }
  };
  

## Prestige Must Preserve Knowledge

### **Id**
prestige-preserves-knowledge
### **Description**
Checks that prestige doesn't erase learned unlocks
### **Severity**
warning
### **Category**
psychology
### **Patterns**
  - prestige|rebirth|ascension|newGamePlus
### **Check**
  function validatePrestigePreservation(prestigeConfig) {
    const mustPreserve = [
      'unlockedFeatures',
      'discoveredRecipes',
      'completedAchievements',
      'cosmetics'
    ];
  
    const preserved = prestigeConfig.persists || [];
    const missing = mustPreserve.filter(p => !preserved.includes(p));
  
    if (missing.length > 0) {
      return {
        valid: false,
        missing: missing,
        message: `Prestige resets ${missing.join(', ')} - these should persist`
      };
    }
    return { valid: true };
  }
  