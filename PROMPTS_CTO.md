# Prompts para o CTO.new (T0 → T9)

Como usar:
1. Carregar primeiro todos os ficheiros do projeto no repositório `babelbee` (o agente precisa do `README.md`, `TICKETS.md` e da pasta `brand/`).
2. No CTO.new, selecionar o repositório `babelbee` e colar **um** prompt de cada vez (o bloco cinzento inteiro).
3. Esperar pelo PR, rever com a `CHECKLIST_REVISAO_PR.md` (ou trazer-mo), fazer merge, e só depois enviar o seguinte.
4. Antes do T6, preencher no prompt os dados da Polar (Organization ID e links de checkout), ver `SETUP_GRATIS.md` passo 7.

---

## T0: Project scaffold

```
Repository: babelbee. Read README.md and TICKETS.md first for full context.

GLOBAL CONSTRAINTS (apply to every task):
- Chrome extension, Manifest V3, TypeScript, Vite. No backend server. Zero running costs.
- Never auto-send messages on any website; only insert text into fields.
- No user data leaves the browser except: (a) prompts sent to Google Gemini API when the user chose BYOK mode, (b) license key validation with Polar.
- Product name in code/UI: "Babelbee". Do not use third-party trademarks in the extension name.
- Keep code small, typed, and covered by unit tests (Vitest). Update README "Development" section when adding commands.

TASK T0 — Project scaffold
Goal: Working MV3 extension skeleton with build, lint, tests and CI.

Scope:
- Vite + TypeScript build producing `dist/` loadable via "Load unpacked".
- `manifest.json` with: service worker (background), side panel, options page, permissions `storage`, `contextMenus`, `sidePanel`, `activeTab`.
- ESLint + Prettier, Vitest with one sample test.
- GitHub Actions workflow: install, lint, test, build on every PR, and upload the built `dist/` folder as a downloadable artifact (so the owner can test each PR without installing anything).
- Folder structure: `src/background/`, `src/sidepanel/`, `src/options/`, `src/content/`, `src/lib/`.
- Icons: use the ready-made files in `brand/` (`icon-16.png`, `icon-32.png`, `icon-48.png`, `icon-128.png`) for the manifest `icons` and `action.default_icon`; copy them into the build. Do not create new icons. UI accent colour: honey `#F5B301`, text `#1D1A14`.

Acceptance criteria:
- `npm run build` produces `dist/`; loading it in Chrome shows no errors.
- `npm run lint` and `npm test` pass; CI is green.
- The Babelbee icon shows in the browser toolbar and on the extensions page.
- README has a "Development" section with the commands.

Only do T0. Keep changes limited to this task. Open a pull request when done, with a short summary and how to test it manually.
```

---

## T1: Context menu + side panel flow

```
Repository: babelbee. Read README.md and TICKETS.md first for full context.

Tasks T0 to T0 are already merged. Build on the existing code; do not redo earlier work.

GLOBAL CONSTRAINTS (apply to every task):
- Chrome extension, Manifest V3, TypeScript, Vite. No backend server. Zero running costs.
- Never auto-send messages on any website; only insert text into fields.
- No user data leaves the browser except: (a) prompts sent to Google Gemini API when the user chose BYOK mode, (b) license key validation with Polar.
- Product name in code/UI: "Babelbee". Do not use third-party trademarks in the extension name.
- Keep code small, typed, and covered by unit tests (Vitest). Update README "Development" section when adding commands.

TASK T1 — Context menu + side panel flow
Goal: User selects a customer message on any page, right-clicks "Reply with Babelbee", and the side panel opens with that message loaded.

Scope:
- Context menu item visible only when text is selected.
- Side panel UI: customer message (editable textarea), tone selector (Friendly / Professional / Apologetic / Short), "Generate reply" button, output textarea, "Copy" button.
- Pass selected text from background to side panel via `chrome.runtime` messaging / `chrome.storage.session`.
- "Generate reply" calls a stub `generateReply()` from `src/lib/ai/` returning placeholder text (real AI comes in T2).
- Clean, minimal UI (plain CSS, light + dark via `prefers-color-scheme`).

Acceptance criteria:
- Selecting text on any website → right-click → side panel opens with the text pre-filled.
- Copy button copies the generated reply to clipboard.
- Unit tests for the messaging helper.

Only do T1. Keep changes limited to this task. Open a pull request when done, with a short summary and how to test it manually.
```

---

## T2: AI providers (Chrome built-in AI + BYOK Gemini)

```
Repository: babelbee. Read README.md and TICKETS.md first for full context.

Tasks T0 to T1 are already merged. Build on the existing code; do not redo earlier work.

GLOBAL CONSTRAINTS (apply to every task):
- Chrome extension, Manifest V3, TypeScript, Vite. No backend server. Zero running costs.
- Never auto-send messages on any website; only insert text into fields.
- No user data leaves the browser except: (a) prompts sent to Google Gemini API when the user chose BYOK mode, (b) license key validation with Polar.
- Product name in code/UI: "Babelbee". Do not use third-party trademarks in the extension name.
- Keep code small, typed, and covered by unit tests (Vitest). Update README "Development" section when adding commands.

TASK T2 — AI providers (Chrome built-in AI + BYOK Gemini)
Goal: Real reply generation at zero cost to us.

Scope:
- Interface `AIProvider { isAvailable(): Promise<boolean>; generate(prompt: string): Promise<string> }`.
- `ChromeBuiltInProvider`: uses Chrome's built-in Prompt API (`LanguageModel` global, Gemini Nano). Handle availability states (`unavailable`, `downloadable`, `downloading`, `available`), show download progress in side panel.
- `GeminiByokProvider`: calls Google Gemini API (Flash model) with a user-supplied API key stored in `chrome.storage.local`. Options page field + "Test key" button + link to Google AI Studio to get a free key.
- Provider selection: Auto (built-in if available, else BYOK) / force one, in Options.
- Prompt builder in `src/lib/ai/prompt.ts`: inputs = customer message, tone, shop profile (T3, use empty defaults for now), selected template (T4, optional). Output must be: reply only, no preamble, same language as the customer message, max ~120 words, polite, never promise refunds or dates not in the shop profile.
- Multilingual (core differentiator): detect the customer message language (use Chrome's built-in Language Detector API when available, else ask the model). Side panel shows: (1) translation of the customer message into the seller's language (setting, default from browser locale), (2) the reply in the customer's language, (3) a back-translation of the reply into the seller's language so they can check it before sending. Use Chrome's built-in Translator API when available; fall back to the active AI provider.
- Clear error messages: no provider available → guide user to Options.

Acceptance criteria:
- On a machine with built-in AI, replies generate with no API key.
- With a valid Gemini key, replies generate on any machine.
- Prompt builder fully unit-tested (snapshot tests for each tone).
- No API key is ever logged or sent anywhere except Google's API endpoint.

Only do T2. Keep changes limited to this task. Open a pull request when done, with a short summary and how to test it manually.
```

---

## T3: Shop profile settings

```
Repository: babelbee. Read README.md and TICKETS.md first for full context.

Tasks T0 to T2 are already merged. Build on the existing code; do not redo earlier work.

GLOBAL CONSTRAINTS (apply to every task):
- Chrome extension, Manifest V3, TypeScript, Vite. No backend server. Zero running costs.
- Never auto-send messages on any website; only insert text into fields.
- No user data leaves the browser except: (a) prompts sent to Google Gemini API when the user chose BYOK mode, (b) license key validation with Polar.
- Product name in code/UI: "Babelbee". Do not use third-party trademarks in the extension name.
- Keep code small, typed, and covered by unit tests (Vitest). Update README "Development" section when adding commands.

TASK T3 — Shop profile settings
Goal: Replies use the seller's real policies.

Scope:
- Options page section "Shop profile": shop name, seller signature name, processing time, shipping times (domestic/international), return/refund policy (free text), custom orders accepted (yes/no), default language, default tone.
- Stored in `chrome.storage.sync`.
- Injected into the prompt builder as facts the AI may use; AI must not invent facts beyond these.

Acceptance criteria:
- Saving and reloading Options keeps values.
- Generated replies mention the correct processing/shipping times when the customer asks about shipping.
- Unit tests for profile → prompt mapping.

Only do T3. Keep changes limited to this task. Open a pull request when done, with a short summary and how to test it manually.
```

---

## T4: Reply templates library

```
Repository: babelbee. Read README.md and TICKETS.md first for full context.

Tasks T0 to T3 are already merged. Build on the existing code; do not redo earlier work.

GLOBAL CONSTRAINTS (apply to every task):
- Chrome extension, Manifest V3, TypeScript, Vite. No backend server. Zero running costs.
- Never auto-send messages on any website; only insert text into fields.
- No user data leaves the browser except: (a) prompts sent to Google Gemini API when the user chose BYOK mode, (b) license key validation with Polar.
- Product name in code/UI: "Babelbee". Do not use third-party trademarks in the extension name.
- Keep code small, typed, and covered by unit tests (Vitest). Update README "Development" section when adding commands.

TASK T4 — Reply templates library
Goal: Reusable scenarios that steer the AI.

Scope:
- Default templates: Shipping delay, Where is my order, Return/refund request, Custom order inquiry, Thank you + review request, Item damaged, Price negotiation.
- CRUD in Options (name + instructions text). Stored in `chrome.storage.sync`.
- Side panel: template dropdown (optional) above "Generate reply".
- Template instructions are added to the prompt.

Acceptance criteria:
- User can add, edit, delete, and reset to defaults.
- Selecting a template visibly changes the reply style/content.
- Unit tests for template storage helpers.

Only do T4. Keep changes limited to this task. Open a pull request when done, with a short summary and how to test it manually.
```

---

## T5: Marketplace message page integration (enhancement)

```
Repository: babelbee. Read README.md and TICKETS.md first for full context.

Tasks T0 to T4 are already merged. Build on the existing code; do not redo earlier work.

GLOBAL CONSTRAINTS (apply to every task):
- Chrome extension, Manifest V3, TypeScript, Vite. No backend server. Zero running costs.
- Never auto-send messages on any website; only insert text into fields.
- No user data leaves the browser except: (a) prompts sent to Google Gemini API when the user chose BYOK mode, (b) license key validation with Polar.
- Product name in code/UI: "Babelbee". Do not use third-party trademarks in the extension name.
- Keep code small, typed, and covered by unit tests (Vitest). Update README "Development" section when adding commands.

TASK T5 — Marketplace message page integration (enhancement)
Goal: One-click button next to the reply box on Etsy, eBay and Vinted message pages.

Scope:
- Content script matching Etsy, eBay and Vinted messaging URLs only (add one site at a time; Etsy first).
- All CSS selectors in a single file `src/content/selectors.ts` (easy to update when sites change).
- Inject a small "✨ Babelbee" button near the reply textarea. Clicking it reads the last customer message in the thread, generates a reply, and inserts it into the textarea (dispatch `input` events so the site detects it). Never clicks Send.
- If selectors fail, do nothing visible and log a single debug warning; the context-menu flow (T1) remains the fallback.

Acceptance criteria:
- Button appears on supported pages; text is inserted; site's Send button becomes enabled.
- No errors on non-matching pages.
- Unit tests for message extraction using saved HTML fixtures.

Only do T5. Keep changes limited to this task. Open a pull request when done, with a short summary and how to test it manually.
```

---

## T6: Freemium limits + Pro license (Polar.sh)

```
Repository: babelbee. Read README.md and TICKETS.md first for full context.

Tasks T0 to T5 are already merged. Build on the existing code; do not redo earlier work.

GLOBAL CONSTRAINTS (apply to every task):
- Chrome extension, Manifest V3, TypeScript, Vite. No backend server. Zero running costs.
- Never auto-send messages on any website; only insert text into fields.
- No user data leaves the browser except: (a) prompts sent to Google Gemini API when the user chose BYOK mode, (b) license key validation with Polar.
- Product name in code/UI: "Babelbee". Do not use third-party trademarks in the extension name.
- Keep code small, typed, and covered by unit tests (Vitest). Update README "Development" section when adding commands.

TASK T6 — Freemium limits + Pro license (Polar.sh)
Goal: Monetization without a backend.

Scope:
- Free plan: 15 generated replies per calendar month, max 3 custom templates. Counter in `chrome.storage.local`, resets monthly.
- Pro: unlimited. Options page field "License key" → activate via Polar's public customer-portal License Keys API (`/v1/customer-portal/license-keys/activate`, then `/v1/customer-portal/license-keys/validate`, with `organization_id` from a config constant; no secret keys in the extension — check current Polar docs). Store the activation id. Re-validate at most once per 7 days; allow 14-day offline grace period.
- "Upgrade" buttons link to Polar checkout URLs defined as config constants in one file (`CHECKOUT_URL_MONTHLY`, `CHECKOUT_URL_YEARLY`, `CHECKOUT_URL_LIFETIME`).
- Side panel shows remaining free replies and an upgrade prompt when the limit is reached.
- "Deactivate license" button (for moving to another computer).

Acceptance criteria:
- Free limit enforced; resets on new month (unit-tested with mocked dates).
- Valid key unlocks Pro; invalid/expired key shows clear error.
- Network failures during validation don't lock out a previously valid user within the grace period.

Config values (fill in before sending):
- POLAR_ORGANIZATION_ID = REPLACE_ME
- CHECKOUT_URL_MONTHLY = REPLACE_ME
- CHECKOUT_URL_YEARLY = REPLACE_ME
- CHECKOUT_URL_LIFETIME = REPLACE_ME

Only do T6. Keep changes limited to this task. Open a pull request when done, with a short summary and how to test it manually.
```

---

## T7: Onboarding + privacy policy

```
Repository: babelbee. Read README.md and TICKETS.md first for full context.

Tasks T0 to T6 are already merged. Build on the existing code; do not redo earlier work.

GLOBAL CONSTRAINTS (apply to every task):
- Chrome extension, Manifest V3, TypeScript, Vite. No backend server. Zero running costs.
- Never auto-send messages on any website; only insert text into fields.
- No user data leaves the browser except: (a) prompts sent to Google Gemini API when the user chose BYOK mode, (b) license key validation with Polar.
- Product name in code/UI: "Babelbee". Do not use third-party trademarks in the extension name.
- Keep code small, typed, and covered by unit tests (Vitest). Update README "Development" section when adding commands.

TASK T7 — Onboarding + privacy policy
Goal: Smooth first run and Chrome Web Store compliance.

Scope:
- On install, open an onboarding tab: 3 steps (how to use, set shop profile, choose AI provider) with links to Options.
- `PRIVACY.md` and an HTML version for the landing page: what data is stored (locally), what is sent (only to Google Gemini in BYOK mode and Polar for license checks), no tracking, no selling of data.
- Remove any unused permissions from the manifest.

Acceptance criteria:
- Fresh install opens onboarding once.
- Privacy policy accurately reflects the code.
- Manifest permissions are the minimum required.

Only do T7. Keep changes limited to this task. Open a pull request when done, with a short summary and how to test it manually.
```

---

## T8: Landing page + store listing assets

```
Repository: babelbee. Read README.md and TICKETS.md first for full context.

Tasks T0 to T7 are already merged. Build on the existing code; do not redo earlier work.

GLOBAL CONSTRAINTS (apply to every task):
- Chrome extension, Manifest V3, TypeScript, Vite. No backend server. Zero running costs.
- Never auto-send messages on any website; only insert text into fields.
- No user data leaves the browser except: (a) prompts sent to Google Gemini API when the user chose BYOK mode, (b) license key validation with Polar.
- Product name in code/UI: "Babelbee". Do not use third-party trademarks in the extension name.
- Keep code small, typed, and covered by unit tests (Vitest). Update README "Development" section when adding commands.

TASK T8 — Landing page + store listing assets
Goal: Marketing assets ready for launch.

Scope:
- Static landing page in `/site` deployed with Cloudflare Pages (free; build output dir `site/`): hero, 3 benefits, how it works, pricing (Free / Pro 9$/month or 79$/year / Lifetime 49$ launch offer), FAQ, privacy link, waitlist embed placeholder (Tally form URL constant).
- `store/` folder: Chrome Web Store description (short + long, English, SEO keywords: etsy seller replies, translate customer messages, AI reply, ebay messages, vinted messages, reply in any language, no API key). Plus translated short descriptions for ES, FR, DE, IT, PT, PL, NL., 5 screenshot specs (1280x800) with captions.

Acceptance criteria:
- Landing page deploys to Cloudflare Pages; responsive on mobile.
- Store texts within Chrome Web Store and Microsoft Edge Add-ons character limits.
- `npm run package` creates a versioned zip usable for Edge Add-ons, Chrome Web Store and manual "Load unpacked" testers.

Config values (fill in before sending, or leave as constants to edit later):
- WAITLIST_URL = REPLACE_ME (Tally link)
- CONTACT_EMAIL = REPLACE_ME
Note: a finished landing page already exists in site/ (index.html, privacy.html, logo.svg, og.png). Reuse and improve it instead of starting from scratch. Store texts already drafted in STORE_LISTING.md: reuse them.

Only do T8. Keep changes limited to this task. Open a pull request when done, with a short summary and how to test it manually.
```

---

## T9: Operations handbook (for the future buyer)

```
Repository: babelbee. Read README.md and TICKETS.md first for full context.

Tasks T0 to T8 are already merged. Build on the existing code; do not redo earlier work.

GLOBAL CONSTRAINTS (apply to every task):
- Chrome extension, Manifest V3, TypeScript, Vite. No backend server. Zero running costs.
- Never auto-send messages on any website; only insert text into fields.
- No user data leaves the browser except: (a) prompts sent to Google Gemini API when the user chose BYOK mode, (b) license key validation with Polar.
- Product name in code/UI: "Babelbee". Do not use third-party trademarks in the extension name.
- Keep code small, typed, and covered by unit tests (Vitest). Update README "Development" section when adding commands.

TASK T9 — Operations handbook (for the future buyer)
Goal: Make the business transferable — this raises the sale price.

Scope:
- `OPERATIONS.md`: architecture overview, how to release a new version to Microsoft Edge Add-ons and the Chrome Web Store, how to update selectors when Etsy/eBay change, how Polar licensing works, how to transfer ownership (Edge Add-ons, Chrome Web Store, Polar organization, Cloudflare Pages, GitHub repo, domain), weekly maintenance checklist.
- Ensure test coverage ≥ 70% on `src/lib/`.
- Version bump script and `CHANGELOG.md`.

Acceptance criteria:
- A new developer can build, test, and release using only the docs.
- Coverage threshold enforced in CI.

Only do T9. Keep changes limited to this task. Open a pull request when done, with a short summary and how to test it manually.
```
