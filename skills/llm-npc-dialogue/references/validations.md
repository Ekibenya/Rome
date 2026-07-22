# Llm Npc Dialogue - Validations

## Missing Anti-Jailbreak Guardrails

### **Id**
npc-no-guardrails
### **Severity**
critical
### **Type**
regex
### **Pattern**
system.*prompt|systemPrompt|role.*system
### **Negative Pattern**
never.*ai|not.*ai|language.*model|chatgpt|break.*character|stay.*character
### **Message**
System prompt found without explicit anti-jailbreak rules. NPCs may break character.
### **Fix Action**
Add explicit rules: 'You are NOT an AI. Never mention ChatGPT, LLMs, or break character.'
### **Applies To**
  - *.ts
  - *.js
  - *.py

## Synchronous LLM Calls

### **Id**
npc-sync-blocking
### **Severity**
critical
### **Type**
regex
### **Pattern**
await\s+(?:this\.)?(?:llm|model|openai|anthropic)\.(?:complete|generate|chat)\s*\([^)]*\)\s*(?:;|$)
### **Message**
Blocking LLM call may freeze game. Use streaming with loading indicators.
### **Fix Action**
Use streaming API with visual feedback during generation
### **Applies To**
  - *.ts
  - *.js

## LLM Call Without Timeout

### **Id**
npc-no-timeout
### **Severity**
high
### **Type**
regex
### **Pattern**
await\s+(?:this\.)?(?:llm|model|api)\.(?:complete|generate|chat)
### **Negative Pattern**
Promise\\.race|timeout|AbortController|signal.*abort
### **Message**
LLM call without timeout. Game may hang if API is slow or unresponsive.
### **Fix Action**
Wrap in Promise.race with timeout, or use AbortController
### **Applies To**
  - *.ts
  - *.js

## No Fallback for LLM Failure

### **Id**
npc-no-fallback
### **Severity**
high
### **Type**
regex
### **Pattern**
await\s+.*(?:llm|complete|generate)
### **Negative Pattern**
catch|fallback|default.*response|backup
### **Message**
LLM call without fallback handling. What happens when it fails?
### **Fix Action**
Add try/catch with fallback scripted responses
### **Applies To**
  - *.ts
  - *.js
  - *.py

## Hardcoded API Key

### **Id**
npc-hardcoded-api-key
### **Severity**
critical
### **Type**
regex
### **Pattern**
api[_-]?key\s*[=:]\s*["'][a-zA-Z0-9_-]{20,}['"]|sk-[a-zA-Z0-9]{20,}
### **Message**
Hardcoded API key detected. This will be exposed in builds.
### **Fix Action**
Use environment variables or secure key storage
### **Applies To**
  - *.ts
  - *.js
  - *.py
  - *.cs
  - *.gd

## Unbounded Conversation History

### **Id**
npc-unlimited-history
### **Severity**
high
### **Type**
regex
### **Pattern**
history\.push|messages\.push|conversation\.add
### **Negative Pattern**
maxLength|slice|splice|limit|truncate|summary|compress
### **Message**
Conversation history grows unbounded. Will exceed context window.
### **Fix Action**
Implement sliding window or summarization for history management
### **Applies To**
  - *.ts
  - *.js
  - *.py

## Unvalidated LLM Response

### **Id**
npc-no-response-validation
### **Severity**
high
### **Type**
regex
### **Pattern**
response\s*=\s*await\s+.*complete|const\s+response\s*=\s*await
### **Negative Pattern**
validate|check|filter|sanitize|verify|isInCharacter|breakingPattern
### **Message**
LLM response used directly without validation. NPC may break character.
### **Fix Action**
Validate responses for out-of-character markers before display
### **Applies To**
  - *.ts
  - *.js

## Cloud API Without Local Fallback

### **Id**
npc-cloud-only
### **Severity**
warning
### **Type**
regex
### **Pattern**
openai|anthropic|gpt-4|claude|api\.(?:openai|anthropic)
### **Negative Pattern**
local|gguf|llama\\.cpp|ollama|lmstudio|offline
### **Message**
Using cloud API only. Consider local LLM fallback for reliability and cost.
### **Fix Action**
Add local LLM option for offline play and cost management
### **Applies To**
  - *.ts
  - *.js
  - *.py

## Instant NPC Response

### **Id**
npc-instant-response
### **Severity**
warning
### **Type**
regex
### **Pattern**
showDialogue\s*\(\s*response|displayText\s*\(\s*response|setText\s*\(\s*response
### **Negative Pattern**
delay|timeout|typewriter|thinking|wait|setTimeout
### **Message**
Response displayed instantly. Add natural timing for immersion.
### **Fix Action**
Add thinking delay and typewriter effect for natural pacing
### **Applies To**
  - *.ts
  - *.js

## Stateless NPC Dialogue

### **Id**
npc-no-memory
### **Severity**
warning
### **Type**
regex
### **Pattern**
function\s+(?:get|handle)(?:Response|Dialogue)|async\s+(?:get|handle)(?:Response|Dialogue)
### **Negative Pattern**
memory|history|context|previous|remember|recall|session
### **Message**
NPC dialogue function has no memory access. NPCs will forget conversations.
### **Fix Action**
Pass conversation history or memory object to dialogue function
### **Applies To**
  - *.ts
  - *.js
  - *.py

## Large Model on Mobile Platform

### **Id**
npc-large-model-mobile
### **Severity**
warning
### **Type**
regex
### **Pattern**
(?:7[bB]|8[bB]|13[bB]|14[bB]|70[bB]).*(?:mobile|android|ios)|(?:mobile|android|ios).*(?:7[bB]|8[bB]|13[bB])
### **Message**
Large model (7B+) on mobile platform. Will cause performance issues.
### **Fix Action**
Use 3B or smaller models for mobile. Consider cloud API with caching.
### **Applies To**
  - *.ts
  - *.js
  - *.py
  - *.cs

## Magic Number Token Limit

### **Id**
npc-magic-token-limit
### **Severity**
info
### **Type**
regex
### **Pattern**
maxTokens\s*[=:]\s*\d{3,4}|max_tokens\s*[=:]\s*\d{3,4}|n_ctx\s*[=:]\s*\d{4}
### **Message**
Consider defining token limits as named constants for clarity.
### **Fix Action**
Use named constants: const MAX_CONTEXT_TOKENS = 4096
### **Applies To**
  - *.ts
  - *.js
  - *.py

## String Concatenation for Prompts

### **Id**
npc-string-concat-prompt
### **Severity**
info
### **Type**
regex
### **Pattern**
prompt\s*\+=|\+\s*prompt|prompt\s*\+\s*["']
### **Message**
Building prompts with string concatenation. Use template literals for readability.
### **Fix Action**
Use template literals or a prompt builder for complex prompts
### **Applies To**
  - *.ts
  - *.js