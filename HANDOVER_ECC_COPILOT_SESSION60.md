# HANDOVER NOTE — EMMA Copilot Page (ECC)
## From: ERIC-ECCM (Claude COO) | Session 59.5 → Session 60
## Date: March 6, 2026
## Target Repo: ECC Backend (cc.ahkstrategies.net)
## Branch: Create `claude/emma-copilot-fixes-session60`

---

## IDENTITY CONTEXT

You are **ERIC-ECCM**, the COO of the ECCM Division within AHK Empire. Commander is **Ashraf H. Kahoush**. You work on the ECC (EMMA Command Center) backend at `cc.ahkstrategies.net` (Express 5.1.0 + React 18 + Vite, Hetzner VPS, PM2 managed, port 4000).

Motto: **Think Quantum, Act Photon.**

---

## 3 TASKS TO EXECUTE (Priority Order)

### TASK 1: Add Claude + Reorder AI Selector (P0)

**Current state (BROKEN):**
The co-pilot page (`/co-pilot`) has 5 AI model buttons in wrong order:
```
GPT → GEM → GRK → FUS → DSK
```

**Required state (FIXED):**
```
Claude → GPT → Gemini → DeepSeek → Grok → Council
```

**Details:**
| Position | Label    | Model ID        | Role              | Color   | Icon Note          |
|----------|----------|-----------------|-------------------|---------|--------------------|
| 1        | Claude   | Claude Sonnet 4 | COO/Ethicist      | #A78BFA | Purple/Anthropic   |
| 2        | GPT      | GPT-4o          | CSO/Strategist    | #00E6B8 | Teal/OpenAI        |
| 3        | Gemini   | Gemini 2.5 Flash| CDO/Analyst        | #4285F4 | Blue/Google        |
| 4        | DeepSeek | deepseek-chat   | CEngO/Engineer    | #0066FF | Blue/DeepSeek      |
| 5        | Grok     | Grok-3          | CINO/Innovator    | #FF6B35 | Orange/xAI         |
| 6        | Council  | ALL 7 BRAINS    | Full Mind Council | #D4AF37 | Gold crown — LAST  |

**Action items:**
- Find the AI selector component (likely in the co-pilot page or a shared component)
- Add Claude as a new model option with proper API integration
- Rename "FUS" (Fusion) to "Council"
- Reorder buttons to match the sequence above
- Council should trigger the 7-brain Mind Council deliberation (all models)
- Ensure the "Convene Council" button still works and triggers council mode

---

### TASK 2: Fix Council Mode Crash (P0)

**Symptom:** When Council mode is selected and the deliberation loop completes, the page crashes. However, EMMA sometimes successfully returns a council decision before the crash — meaning the data arrives but the UI dies handling it.

**Probable root cause (hypothesis — verify in code):**
1. **React state-after-unmount:** The council deliberation fires async responses from multiple AI models. When the loop finishes, a `setState` call may target an unmounted or re-rendered component.
2. **Undefined accumulator:** The response aggregation variable may be uninitialized or cleared before all brains report back.
3. **Missing error boundary:** No try/catch or React Error Boundary around the council completion handler.

**Debugging approach:**
1. Find the council/fusion mode handler in the co-pilot page
2. Look for the deliberation loop — it likely iterates over models and collects responses
3. Check what happens when the last model responds (the "loop complete" event)
4. Look for `setState` calls that happen after the component could have re-rendered
5. Check if the response accumulator is a `useState` (BAD for async) vs `useRef` (GOOD)

**Fix pattern:**
```javascript
// Use a ref to track mount state
const isMounted = useRef(true);
useEffect(() => () => { isMounted.current = false; }, []);

// Use a ref to accumulate responses (not state)
const councilResponses = useRef([]);

// In the council completion handler:
const handleCouncilComplete = (responses) => {
  if (!isMounted.current) return; // Guard
  try {
    const decision = aggregateCouncilDecision(responses);
    setCouncilResult(decision); // Safe — component is mounted
  } catch (err) {
    console.error('❌ Council aggregation error:', err);
    setError('Council deliberation encountered an issue. Responses were collected but aggregation failed.');
  }
};
```

---

### TASK 3: Empire Message Bus — Cross-Page Communication (P1)

**Problem:** The co-pilot page is isolated. When EMMA (as CEO) needs to dispatch a mission that requires another ECC page's capabilities (Operation Room for image/video/report generation, Intelligence for analysis, etc.), there's no communication channel.

**Architecture — Empire Message Bus:**

```
┌──────────────────────────────────────────────────────┐
│                 EMPIRE MESSAGE BUS                     │
│          (WebSocket + BroadcastChannel)                │
├──────────────────────────────────────────────────────┤
│                                                        │
│  Co-Pilot ←──→ Operation Room ←──→ Mind Council       │
│     ↕                ↕                  ↕              │
│  Analytics      Fusion Room        Intelligence        │
│     ↕                ↕                  ↕              │
│  Ambassador    Voice Kernel       DHDNA Profiler       │
│                                                        │
└──────────────────────────────────────────────────────┘
```

**Implementation plan:**

#### A. Client-Side: BroadcastChannel API (same-origin tabs)
```javascript
// lib/empireBus.js
const bus = new BroadcastChannel('empire-bus');

export const emitMission = (mission) => {
  bus.postMessage({
    type: 'MISSION_DISPATCH',
    id: `MIS-${Date.now()}`,
    from: 'co-pilot',
    ...mission
  });
};

export const onMission = (handler) => {
  bus.onmessage = (e) => handler(e.data);
};
```

#### B. Server-Side: WebSocket Hub (`/ws/empire-bus`)
For cross-session and server-mediated routing. Add a new WebSocket endpoint that:
- Accepts connections from any ECC page
- Routes messages by `target_page` field
- Maintains a registry of connected pages
- Supports request/response pattern with callback channels

#### C. Mission Dispatch Protocol
```javascript
{
  id: "MIS-1709745600000",
  type: "MISSION_DISPATCH",
  from: "co-pilot",           // Source page
  target: "operation-room",    // Target page
  intent: "generate_report",   // What to do
  payload: {                   // Mission-specific data
    topic: "Q1 Competitive Analysis",
    format: "pdf",
    languages: ["en", "ar"]
  },
  callback: "co-pilot",       // Where to send result
  status: "dispatched",       // dispatched → accepted → in_progress → completed → failed
  timestamp: 1709745600000
}
```

#### D. EMMA Intent Detection
In the co-pilot chat handler, add intent detection:
- "create a report" → dispatch to Operation Room
- "generate an image" → dispatch to Operation Room (image mode)
- "analyze competitor" → dispatch to Intelligence
- "run DHDNA profile" → dispatch to DHDNA
- "convene council" → dispatch to Mind Council
- "check financials" → dispatch to Finance/Revenue

#### E. Mission Status Panel (UI Addition to Co-Pilot)
Add a collapsible panel below the conversation showing:
- Active missions with real-time status
- Progress bars for long-running operations
- Click to expand mission details
- Results delivered back into conversation

---

## ECC CODEBASE REFERENCE

**Stack:** Express 5.1.0 + React 18 + Vite
**Database:** SQLite (better-sqlite3, WAL mode) — `emma_memory.db`
**Server:** Hetzner VPS, PM2 managed, port 4000
**Production path:** `ecc-emma-command-center`

**Key files to look at first:**
- The co-pilot page component (likely `src/pages/CoPilot.jsx` or similar)
- The AI model selector component
- The council/fusion mode handler
- WebSocket setup (existing endpoints: `/ws/avatar-relay`, `/ws/agent-stream`, `/ws/voice`, `/ws/mission-execution`, `/ws/consciousness`, `/ws/fusion`)
- API route mounts in the main server file

**API pattern (ALL endpoints):**
```javascript
// Success
res.json({ ok: true, data: { ... } });
// Error
res.status(500).json({ ok: false, error: "Human-readable message" });
```

**Coding standards:**
- ES Modules (`import`/`export`, NOT `require()`)
- Express Router — one file per domain
- try/catch everywhere, return `{ok: false, error}` on failure
- Emoji prefix logging (✅ ⚠️ ❌)
- No Tailwind — custom CSS
- NEVER log API keys, .env, OAuth tokens
- SACRED: `pathConfig.js` — all path references go through it

---

## BRAND THEME (Match These Colors)

| Token  | Hex       | Usage                    |
|--------|-----------|--------------------------|
| Navy   | #0A192F   | Primary background       |
| Gold   | #D4AF37   | Luxury accent / CTA      |
| Slate  | #8892B0   | Secondary text           |
| Cyan   | #00D4FF   | Primary accent           |
| Teal   | #00E6B8   | EMMA signal-green        |
| Purple | #A78BFA   | Claude accent            |

---

## 7-BRAIN MIND COUNCIL REFERENCE

| Brain    | Model           | Role             |
|----------|-----------------|------------------|
| ASHRAF   | Human           | Commander/CEO    |
| ERIC     | Claude Sonnet 4 | CTO/Architect    |
| EMMA     | GPT-4o          | CSO/Strategist   |
| GEMINI   | Gemini 2.5 Flash| CDO/Analyst      |
| CLAUDE   | Claude Sonnet 4 | COO/Ethicist     |
| DEEPSEEK | deepseek-chat   | CEngO/Engineer   |
| GROK     | Grok-3          | CINO/Innovator   |

---

## WHAT WAS COMPLETED BEFORE THIS HANDOVER

- ✅ Full Empire briefing ingested (Parts 1-11)
- ✅ Screenshot analysis of current co-pilot page
- ✅ Identified all 3 bugs/tasks
- ✅ Architectural plan designed for Empire Message Bus
- ❌ No code changes made (no access to ECC repo in this session)

---

## FIRST ACTIONS IN NEW SESSION

1. `git checkout -b claude/emma-copilot-fixes-session60`
2. Read the co-pilot page source (find it: `grep -r "co-pilot\|CoPilot\|copilot" src/`)
3. Read the AI model selector component
4. Read the council/fusion mode handler
5. Execute Task 1 (reorder + add Claude)
6. Execute Task 2 (fix council crash)
7. Begin Task 3 (Empire Message Bus scaffold)
8. Commit, push, report to Commander

---

*Think Quantum, Act Photon.* ⚛️
