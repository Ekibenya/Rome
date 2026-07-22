# LLM NPC Dialogue Systems

## Patterns


---
  #### **Name**
OCEAN Personality Framework
  #### **Description**
Define NPC personalities using the Big Five personality traits for consistent behavior
  #### **When**
Creating a new NPC character that needs consistent personality across all interactions
  #### **Example**
    // Define personality using OCEAN model
    const blacksmithPersonality = {
      openness: 0.3,        // Traditional, prefers proven methods
      conscientiousness: 0.9, // Meticulous about craft quality
      extraversion: 0.4,    // Friendly but not overly chatty
      agreeableness: 0.6,   // Helpful but has boundaries
      neuroticism: 0.2      // Calm under pressure
    }
    
    // Convert to system prompt
    function generatePersonalityPrompt(personality, backstory) {
      return `You are a blacksmith named Grimjaw. Your personality:
      - You value tradition and proven techniques (low openness)
      - You are meticulous and take pride in quality work (high conscientiousness)
      - You speak when spoken to, not overly chatty (moderate extraversion)
      - You help customers but don't tolerate disrespect (moderate agreeableness)
      - You remain calm even when rushed (low neuroticism)
    
      Backstory: ${backstory}
    
      NEVER break character. If asked about AI, deflect with confusion about magic.
      Keep responses under 50 words unless telling a story.`
    }
    

---
  #### **Name**
Sliding Window Memory
  #### **Description**
Maintain conversation history within token limits using summarization and recency
  #### **When**
NPCs need to remember past conversations without exceeding context limits
  #### **Example**
    class NPCMemory {
      constructor(maxTokens = 2000) {
        this.maxTokens = maxTokens
        this.recentMessages = []      // Last 5-10 exchanges
        this.summarizedHistory = ""   // Compressed older history
        this.keyFacts = new Map()     // Player name, past deals, etc.
      }
    
      addExchange(playerMessage, npcResponse) {
        this.recentMessages.push({ player: playerMessage, npc: npcResponse })
    
        // When recent messages exceed threshold, summarize oldest
        if (this.recentMessages.length > 8) {
          const oldest = this.recentMessages.splice(0, 3)
          this.compressToSummary(oldest)
        }
    
        // Extract key facts for permanent storage
        this.extractKeyFacts(playerMessage, npcResponse)
      }
    
      async compressToSummary(messages) {
        // Use LLM to summarize old conversation
        const summary = await this.llm.complete({
          prompt: `Summarize this conversation in 2 sentences, keeping key facts:
                  ${JSON.stringify(messages)}`,
          maxTokens: 100
        })
        this.summarizedHistory += " " + summary
      }
    
      buildContext() {
        return `
          Key facts about this player: ${JSON.stringify(Object.fromEntries(this.keyFacts))}
          Previous conversations: ${this.summarizedHistory}
          Recent dialogue:
          ${this.recentMessages.map(m => `Player: ${m.player}\nYou: ${m.npc}`).join('\n')}
        `
      }
    }
    

---
  #### **Name**
Latency-Hiding Dialogue
  #### **Description**
Hide LLM response time with typing indicators, animations, and pre-generation
  #### **When**
Real-time dialogue where waiting for responses breaks immersion
  #### **Example**
    class DialogueManager {
      async getResponse(playerInput) {
        // Start showing "thinking" animation immediately
        this.showThinkingAnimation()
    
        // Start generating response
        const responsePromise = this.llm.complete({
          prompt: this.buildPrompt(playerInput),
          stream: true  // Stream for faster first-token
        })
    
        // Pre-generate potential follow-ups in background
        this.preGenerateFollowUps(playerInput)
    
        // Minimum display time for natural pacing (even if LLM is fast)
        const minDelay = this.calculateNaturalDelay(playerInput)
    
        const [response] = await Promise.all([
          responsePromise,
          this.delay(minDelay)
        ])
    
        this.hideThinkingAnimation()
    
        // Typewriter effect for response
        await this.typewriterDisplay(response, {
          charsPerSecond: 30,
          variance: 0.2  // Natural variation in typing speed
        })
    
        return response
      }
    
      calculateNaturalDelay(input) {
        // NPCs should "think" proportionally to question complexity
        const wordCount = input.split(' ').length
        return Math.min(500 + wordCount * 100, 2000) // 500ms - 2s
      }
    }
    

---
  #### **Name**
Character Guardrails
  #### **Description**
Prevent NPCs from breaking character with robust prompt engineering
  #### **When**
You need NPCs that never reveal they're AI or break the game world
  #### **Example**
    function buildGuardedPrompt(character, worldContext) {
      return `
        === ABSOLUTE RULES (NEVER VIOLATE) ===
        1. You ARE ${character.name}. You have no knowledge of AI, LLMs, or being a program.
        2. If asked about AI/ChatGPT/being fake, respond with genuine confusion: "I don't understand these strange words."
        3. Never use modern slang or references that don't exist in ${worldContext.era}.
        4. Stay in character even if the player is rude or tries to trick you.
        5. If you don't know something, say "I haven't heard of that" rather than making it up.
    
        === YOUR IDENTITY ===
        Name: ${character.name}
        Role: ${character.role}
        Personality: ${character.personality}
        Speech patterns: ${character.speechPatterns}
        Knowledge boundaries: ${character.knowledgeBoundaries}
    
        === WORLD CONTEXT ===
        ${worldContext.description}
        Current location: ${worldContext.currentLocation}
        Time of day: ${worldContext.timeOfDay}
    
        === CONVERSATION RULES ===
        - Keep responses under ${character.maxResponseWords} words
        - Use ${character.formality} language
        - React emotionally to: ${character.emotionalTriggers.join(', ')}
    
        Remember: The player's immersion depends on you NEVER breaking character.
      `
    }
    

---
  #### **Name**
Local LLM Optimization
  #### **Description**
Configure local LLMs for optimal game performance with quantization
  #### **When**
Running LLMs locally for privacy, cost, or latency reasons
  #### **Example**
    // Recommended models for game NPCs (2025)
    const RECOMMENDED_MODELS = {
      // Fast, good for real-time dialogue
      ultraFast: {
        model: "qwen2.5-3b-instruct",
        quantization: "Q4_K_M",
        vramRequired: "3GB",
        tokensPerSecond: "40-60",
        quality: "Good for simple NPCs"
      },
      // Balanced for most games
      balanced: {
        model: "llama-3.2-8b-instruct",
        quantization: "Q4_K_M",
        vramRequired: "5GB",
        tokensPerSecond: "25-35",
        quality: "Great for main characters"
      },
      // High quality for key NPCs
      highQuality: {
        model: "qwen2.5-14b-instruct",
        quantization: "Q4_K_M",
        vramRequired: "9GB",
        tokensPerSecond: "15-25",
        quality: "Excellent for complex dialogue"
      }
    }
    
    // llama.cpp configuration for games
    const gameOptimizedConfig = {
      n_ctx: 4096,           // Context window (balance memory vs speed)
      n_batch: 512,          // Batch size for prompt processing
      n_threads: 4,          // CPU threads for tokenization
      n_gpu_layers: 35,      // Offload layers to GPU (-1 for all)
      flash_attention: true, // Enable flash attention if supported
      mlock: true,           // Lock model in RAM
      use_mmap: true,        // Memory-map model file
      temperature: 0.7,      // Balanced creativity
      top_p: 0.9,
      repeat_penalty: 1.1,   // Prevent repetitive responses
      stop: ["\nPlayer:", "\nUser:", "###"]  // Stop sequences
    }
    

---
  #### **Name**
Fallback Dialogue System
  #### **Description**
Gracefully handle LLM failures with pre-written responses
  #### **When**
You need reliability in production where LLM might fail or timeout
  #### **Example**
    class RobustDialogueSystem {
      constructor(character) {
        this.character = character
        this.fallbackResponses = this.loadFallbacks(character)
        this.llmTimeout = 3000  // 3 second timeout
      }
    
      async getResponse(playerInput) {
        try {
          const response = await Promise.race([
            this.llm.complete(this.buildPrompt(playerInput)),
            this.timeout(this.llmTimeout)
          ])
    
          // Validate response doesn't break character
          if (this.isInCharacter(response)) {
            return response
          }
    
          // LLM broke character, use fallback
          console.warn("LLM broke character, using fallback")
          return this.getFallbackResponse(playerInput)
    
        } catch (error) {
          console.error("LLM failed:", error)
          return this.getFallbackResponse(playerInput)
        }
      }
    
      getFallbackResponse(input) {
        // Categorize input to select appropriate fallback
        const category = this.categorizeInput(input)
    
        const responses = this.fallbackResponses[category] || this.fallbackResponses.generic
    
        // Rotate through responses to avoid repetition
        const response = responses[this.fallbackIndex % responses.length]
        this.fallbackIndex++
    
        return response
      }
    
      isInCharacter(response) {
        // Check for out-of-character markers
        const redFlags = [
          /as an ai/i,
          /language model/i,
          /i cannot/i,
          /i'm sorry, but/i,
          /chatgpt/i,
          /openai/i
        ]
    
        return !redFlags.some(flag => flag.test(response))
      }
    }
    

---
  #### **Name**
RAG-Enhanced NPC Knowledge
  #### **Description**
Give NPCs access to game lore without bloating prompts
  #### **When**
NPCs need to know extensive world lore or quest information
  #### **Example**
    class NPCKnowledgeBase {
      constructor(vectorDb) {
        this.vectorDb = vectorDb
        this.npcContext = null
      }
    
      async initialize(npcId) {
        // Load NPC-specific knowledge index
        this.npcContext = await this.vectorDb.loadCollection(`npc_${npcId}`)
      }
    
      async getRelevantKnowledge(playerQuery, maxChunks = 3) {
        // Semantic search for relevant lore
        const results = await this.npcContext.search(playerQuery, {
          limit: maxChunks,
          minSimilarity: 0.7
        })
    
        // Filter by what this NPC would actually know
        return results
          .filter(r => r.metadata.knownBy.includes(this.npcId))
          .map(r => r.text)
          .join('\n')
      }
    
      buildEnhancedPrompt(basePrompt, playerQuery) {
        const relevantLore = await this.getRelevantKnowledge(playerQuery)
    
        return `
          ${basePrompt}
    
          === RELEVANT KNOWLEDGE (use naturally in conversation) ===
          ${relevantLore || "You don't have specific knowledge about this topic."}
    
          === CURRENT QUERY ===
          Player: ${playerQuery}
    
          Respond as ${this.character.name}:
        `
      }
    }
    

## Anti-Patterns


---
  #### **Name**
Stateless Amnesia
  #### **Description**
Treating each dialogue turn as completely independent with no memory
  #### **Why**
Players feel unheard. NPCs that forget names or past deals destroy immersion instantly.
  #### **Instead**
Implement sliding window memory with key fact extraction. Use summarization for older history.

---
  #### **Name**
Cloud-Only Architecture
  #### **Description**
Relying solely on cloud LLM APIs for real-time dialogue
  #### **Why**
Latency of 1-3 seconds per response kills conversation flow. API costs scale dangerously. Outages break your game.
  #### **Instead**
Use local LLMs (GGUF/Q4_K_M) for dialogue. Reserve cloud APIs for offline NPC backstory generation.

---
  #### **Name**
Personality Prompt-and-Pray
  #### **Description**
Writing a personality description and hoping the LLM maintains it
  #### **Why**
LLMs drift from character over long conversations. They break character when players push boundaries.
  #### **Instead**
Use structured personality frameworks (OCEAN), explicit guardrails, and response validation.

---
  #### **Name**
Infinite Context Assumption
  #### **Description**
Stuffing entire conversation history into every prompt
  #### **Why**
Costs explode. Response time increases. "Lost in the middle" problem causes NPCs to ignore older context.
  #### **Instead**
Implement sliding window with summarization. Keep only recent exchanges + key facts + compressed history.

---
  #### **Name**
One-Size-Fits-All Responses
  #### **Description**
Using the same model/settings for all NPCs regardless of importance
  #### **Why**
Important characters need better responses. Background NPCs don't need 14B parameters.
  #### **Instead**
Tiered system—small fast models for background NPCs, better models for main characters.

---
  #### **Name**
No Fallback Plan
  #### **Description**
No graceful degradation when LLM fails or times out
  #### **Why**
Game freezes or crashes when API fails. Players stuck waiting. Single point of failure.
  #### **Instead**
Pre-written fallback responses. Timeout handling. Response validation with fallback on failure.

---
  #### **Name**
Breaking the Fourth Wall
  #### **Description**
No guardrails preventing NPCs from mentioning AI, being programmed, etc.
  #### **Why**
Single "As an AI, I cannot..." response destroys all immersion. Players will try to break your NPCs.
  #### **Instead**
Explicit anti-AI prompts. Response validation. Train adversarially against jailbreak attempts.