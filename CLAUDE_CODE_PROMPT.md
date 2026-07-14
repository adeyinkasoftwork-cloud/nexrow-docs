# Claude Code Prompt — Build the "Nexrow" Documentation Website

Paste everything below into Claude Code (VS Code extension) as a single message. It is self-contained: it includes the design brief AND the full documentation copy, so Claude Code does not need to invent content.

---

## ROLE & GOAL

You are building a single-page documentation website for a Solana startup concept called **Nexrow** (single-link USDC escrow for cross-border freelancers). This is a pitch/documentation site for the Sumiro Studio bounty. It must look like a top-tier product-documentation site (think the polish of Stripe Docs, Linear's marketing pages, Vercel, and Mintlify), with a persistent left sidebar navigation, a scrollable content area with distinct sections, an on-page "on this page" table of contents on wider screens, and a working **light/dark mode toggle** that persists across reloads.

Do not treat any of the documentation copy below as placeholder. Render ALL of it. Your job is layout, design, interaction, and faithfully placing the provided content into well-structured sections.

## TECH CONSTRAINTS

- Use a single static site. Preferred stack: **Next.js (App Router) + Tailwind CSS + TypeScript**. If you judge a plain **Vite + React + Tailwind** setup is faster to scaffold, that's acceptable — pick one and be consistent.
- No backend, no database. Everything is static content rendered from a typed content module (e.g. `content.ts`) so sections are data-driven and easy to edit.
- Dark/light mode via a class strategy (`class="dark"` on `<html>`), toggle button in the header, preference saved to `localStorage`, and respect `prefers-color-scheme` on first visit. No flash of wrong theme (inline script in `<head>` to set the class before paint).
- Fully responsive: sidebar collapses into a hamburger/drawer on mobile; the right-hand "on this page" TOC hides below `lg`.
- Smooth scroll to anchors; active-section highlighting in both the sidebar and the right TOC using an IntersectionObserver.
- Accessible: semantic headings, keyboard-navigable nav, sufficient contrast in both themes, `aria-current` on active links.

## DESIGN DIRECTION (blend the best docs sites)

- **Typography:** a clean sans (Inter or Geist) for body/UI, and a slightly tighter, confident heading scale. Generous line-height for body copy. Monospace (JetBrains Mono / Geist Mono) for code, the state machine, and the data model.
- **Layout:** three columns on desktop — left sidebar (sticky, ~260px), center content (max-width ~760px for readability), right "On this page" TOC (~220px). Center content is comfortably padded.
- **Color / BRAND:** neutral, near-monochrome base (zinc/neutral grays) for text and surfaces, with the **Nexrow brand gradient** as the single expressive accent. Use the gradient for the wordmark, primary CTAs, active nav indicator, section-heading accents, hero, and the left border of "key-insight" callouts. Keep body copy neutral; let the gradient carry brand moments. Define everything as CSS variables so both themes share structure.

  **Nexrow gradient stops (violet → indigo → electric blue → cyan):**
  ```
  0%   #B76BFF  (Rich Violet)
  15%  #9A6EFF  (Soft Purple)
  35%  #764CFF  (Royal Purple)
  50%  #4E3BFF  (Indigo)
  68%  #255CFF  (Royal Blue)
  82%  #178CFF  (Electric Blue)
  92%  #27B7FF  (Bright Azure)
  100% #48D2FF  (Cyan Blue)
  ```
  Primary linear gradient (use for wordmark, hero text, CTA fills):
  ```css
  background: linear-gradient(135deg,#B76BFF 0%,#9A6EFF 15%,#764CFF 35%,#4E3BFF 50%,#255CFF 68%,#178CFF 82%,#27B7FF 92%,#48D2FF 100%);
  ```
  Radial variant (use for hero glow / background accents, low opacity):
  ```css
  background: radial-gradient(circle,#B76BFF 0%,#8A63FF 25%,#5D46FF 50%,#2C69FF 72%,#179CFF 88%,#48D2FF 100%);
  ```
  Solid accent tokens for links / active states (pick from the gradient, don't gradient tiny text):
  - Accent primary (links, active nav): `#764CFF` in light mode, `#9A6EFF` in dark mode (raise for contrast).
  - Accent secondary / hover: `#255CFF` light, `#27B7FF` dark.
  - Glow accents: Purple Glow `#C487FF`, Blue Glow `#4CC9FF` (for focus rings, subtle shadows).
  - Deep shadows for depth on cards/hero: Shadow Blue `#1236A9`, Shadow Purple `#4420A7`.

  **Gradient usage rules:** gradient text via `background-clip: text` for the wordmark and hero heading only; solid accent colors for links and body-adjacent UI so contrast stays accessible; a faint radial gradient glow behind the hero and behind section anchors; gradient fill on the primary CTA button with a subtle white gloss highlight (`#FFFFFF` at 15-30% opacity) for the premium glossy look. Ensure the chosen link/accent solids meet WCAG AA on both light and dark surfaces (test #764CFF on white and #9A6EFF on near-black).
- **Components to build:** section wrapper with anchor + copy-link-on-hover heading; callout/admonition boxes (info, warning, key-insight) with left accent border; a responsive comparison **table** component for the competitive matrix (must be readable and horizontally scrollable on mobile); "stat" chips for OKRs/KRs; a stepper/numbered-flow component for UX flows and the 14-day build map; a slide-list component for the pitch deck (each slide as a card); a pill/badge component for roadmap Now/Next/Later.
- **Header:** product name "Nexrow" left, section quick-links optional, theme toggle + a "Built for the Sumiro Studio bounty" tag on the right.
- **Footer:** small, with the one-line thesis and a link to sumiro.studio.
- **Micro-polish:** hover states, subtle borders (not heavy shadows), rounded-xl cards, tasteful use of whitespace. It should feel calm and expensive, not busy.

## INFORMATION ARCHITECTURE (sidebar order = section order)

1. Overview (thesis + the one-liner)
2. The Ten Questions (direct answers)
3. Problem & Users
4. Why Solana
5. Why Now
6. Product (PRD)
7. MVP Scope
8. Product Architecture
9. UX Flow
10. Product Roadmap
11. OKRs
12. Revenue Model
13. Go-to-Market
14. Marketing Strategy
15. Competitive Matrix
16. Pitch Deck
17. Appendix (glossary, risks, naming)

Group these in the sidebar under short category labels: **Thesis** (1-5), **Product** (6-9), **Plan** (10-14), **Analysis & Pitch** (15-17).

## CONTENT (render all of this, verbatim in meaning; format nicely)

> Naming note to honor throughout: the product is **Nexrow** (next-generation escrow, compressed). Tagline: "escrow, in one link." Never use em dashes in body copy. Use commas, colons, parentheses, or separate sentences instead.

### 1. Overview / Thesis
One-liner: Nexrow is a single shareable link that holds a client's USDC in escrow the moment a deal is agreed, and releases it to the freelancer on approval in seconds, for a fraction of a cent, with no bank, no account, and no 10% cut.

Thesis body: Cross-border freelancers get paid late, in the wrong currency, through platforms that take 10-20% and hold funds for days. The person doing the work carries all the trust risk: they deliver first and hope the client pays. Nexrow flips this. The wedge is the link. The company is what grows on top of it: invoicing, reputation, recurring clients, and a payments graph of who reliably pays whom. Upwork is a marketplace that happens to do escrow. Nexrow is escrow that becomes a network. We start where the pain is sharpest and the users are already crypto-native: the Superteam-style global freelancer earning in USDC who has no good way to make a stranger pay them safely.

### 2. The Ten Questions
Render each as a Q (bold) + A. Use the exact answers:
- What is the startup idea? A single-link USDC escrow for freelancers. Agree scope, client funds the link, work is delivered, client approves, funds release instantly. Timeout auto-release protects the freelancer if the client goes silent.
- What problem does it solve? The freelancer-side trust gap in cross-border work: deliver-first-hope-to-get-paid, plus slow settlement, FX loss, and platform fees of 10-20%. For clients, it solves "how do I not get scammed paying a stranger overseas."
- Who is the target user? Cross-border independent workers who already touch crypto: Superteam bounty hunters, Solana/web3 freelancers (designers, devs, writers), and small agencies in Nigeria, India, SEA, LATAM. Beachhead: the Superteam Earn community itself.
- Why should this exist on Solana specifically? USDC on Solana settles in ~400ms for sub-cent fees. Escrow of a $150 job is economically pointless on Ethereum and impossible on rails that need a bank. Solana Pay, Blinks, and a mature USDC float make a link-native, mobile-first escrow actually viable. The network choice is load-bearing, not cosmetic.
- What makes the idea possible now? Deep USDC liquidity on Solana, Blinks/Actions making a payment shareable as a link on X, and a large already-onboarded population of crypto-paid freelancers who feel this pain weekly.
- What would the first version look like? One page. Freelancer creates an escrow (amount, description, wallet), gets a link, client funds it, funds lock in a program-owned escrow account, freelancer delivers off-platform, client clicks Release, and if the client never acts funds auto-release after a timeout.
- How would it make money? 0.5-1% fee on release (versus Upwork's ~10%). Later: flat fee per large escrow, premium features, and compliant float/yield on held USDC.
- What competitors exist? Upwork/Fiverr escrow, traditional escrow.com, crypto invoicing tools (Request), and generic multisig/Squads.
- Why is this better/faster/cheaper? Cheaper (~1% vs ~10%), faster (seconds vs days), simpler (a link, not an account or marketplace), portable (any client, any chat, no lock-in).
- Why should Sumiro launch this? It's the exact shape Sumiro already ships (Sharebox = paid action as a single link). The target user is Sumiro's own network (Superteam partner). Clean 14-day MVP with an obvious money moment and a real path from feature to company.

### 3. Problem & Users
Problem statement: Independent cross-border workers have no lightweight, trustless way to guarantee they'll be paid for work delivered to a stranger, and clients have no cheap way to prove they'll pay only for work received. Existing solutions are marketplace-locked, expensive, fiat-slow, or too technical.
Personas: Ada (Lagos designer paid in USDC, chases invoices, lost money to a client who ghosted; wants proof of funds before starting and instant payout). Marcus (runs a small DAO/startup, hires globally, wants to pay only for delivered work without wiring money to strangers).

### 4. Why Solana (render as a callout-rich list)
Fees: sub-cent, so a 1% take on a $100 job is viable and small escrows make sense; on Ethereum gas can exceed the fee. Speed: ~400ms finality, Release feels like Venmo. USDC depth: the settlement asset freelancers already hold. Distribution: Solana Pay (QR funding) and Blinks/Actions (fund-from-a-tweet). Population: users already on Solana via Superteam. Culture: consumer-app, low-friction ethos fits a one-link tap-to-pay product.

### 5. Why Now
Three things converged: deep USDC liquidity on Solana, Blinks/Actions making a payment shareable as a link on X, and a large already-onboarded population of crypto-paid freelancers (Superteam, bounty platforms) who feel this pain weekly.

### 6. Product (PRD)
Goals: G1 create a fundable escrow link in under 60 seconds with no signup; G2 guarantee payment on approval or timeout without trusting the client; G3 keep take-rate under 1% at launch; G4 make the client flow feel like paying an invoice.
Non-goals (v1): dispute arbitration, fiat on/off ramp, milestone splitting, teams, native mobile apps, reputation scoring.
User stories: create escrow and send link; client funds it; client releases; auto-release on timeout; freelancer sees live status of every escrow.
Functional requirements (FR1-FR8): create escrow (amount, title, desc, wallet, timeout); generate link + Blink; fund via wallet or Solana Pay QR; on-chain escrow account with state machine Created→Funded→Released/Refunded/Auto-released; release + cancel-before-funding; timeout auto-release; per-wallet dashboard; fee on release routed to treasury.
Non-functional: sub-3s perceived flow, mobile-first, no account to fund, wallet-only auth, audited program, graceful RPC failure.
Acceptance criteria: a freelancer with no prior account can create and share a funded escrow, and a client with a wallet can fund and release it, freelancer receives funds minus fee, on devnet, in under 5 minutes.
Risks: dispute abuse (v1 trust-first + timeout, arbitration is v2); regulation (non-custodial, get counsel before fiat); contract risk (audit + low caps).

### 7. MVP Scope
In scope: create escrow; shareable link + Blink; fund via wallet/Solana Pay; on-chain state machine; release by client; cancel-before-fund; timeout auto-release; per-wallet status dashboard; fee on release.
Out of scope: arbitration, fiat ramps, milestones, teams, native mobile app, reputation, rich notifications.
Definition of done: on mainnet with low caps, a new freelancer creates and shares a funded escrow, a client funds and releases it, freelancer receives funds minus fee, one session, audited program, no manual intervention.
14-day build map (render as a numbered stepper mirroring Sumiro's process): Days 1-3 positioning + naming + scope freeze; Days 4-8 branding, landing, escrow UI, wallet/Solana Pay integration; Days 9-11 Anchor program + devnet + polish; Days 12-14 audit pass on low caps, pitch, launch pack, thread.

### 8. Product Architecture
Overview: thin web client, a Solana program (Anchor) that is the source of truth for funds, USDC as the value layer, and a light indexer/backend only for read convenience and notifications. Money never touches our servers.
Components: Frontend (Next.js + React, wallet adapter for Phantom/Backpack/Solflare, Solana Pay QR, Blinks endpoint). On-chain program (Anchor/Rust; PDA per escrow holding USDC in a program-controlled token account; instructions initialize_escrow, fund_escrow, release, cancel, timeout_release; fee routed to treasury on release). Backend/indexer (minimal, non-custodial, non-authoritative; listens to events for dashboard reads and notifications). Notifications (email/Telegram, roadmap).
State machine (render in monospace/diagram style): Created → Funded → (Released | Refunded | AutoReleased). Timeout enforced by on-chain clock, callable by anyone after expiry.
Data model (escrow account, render as a table or code block): id/PDA, creator (freelancer wallet), payer (client wallet set on fund), amount, mint (USDC), status, created_at, funded_at, timeout_at, fee_bps.
Trust & security: funds custodied by the program not us; audited before mainnet; low caps at launch; upgrade authority timelocked/renounced per audit; timeout triggerable by anyone so the freelancer never depends on us being online.

### 9. UX Flow (render as three numbered flows + a dashboard note)
Freelancer create: land, click Create escrow; enter amount, title, scope, timeout, confirm wallet; sign initialize_escrow; get link + QR + Blink; send to client.
Client fund: open link, see an invoice-like card (who, how much, for what, "your money is held not spent"); connect wallet or scan Solana Pay QR; approve fund_escrow; card flips to Funded.
Release: freelancer delivers off-platform; client clicks Release and approves; funds move to freelancer minus fee instantly; if client never returns, after timeout anyone triggers timeout_release and the freelancer is paid.
Design principles callout: feels like paying an invoice not using a chain; every screen answers "where is my money right now"; no jargon on the client side; mobile-first, thumb-reachable primary action.

### 10. Product Roadmap (render as three Now/Next/Later columns or badged cards)
Now (0-4 wks, MVP): Anchor escrow program, single-link create+fund+release+timeout, wallet connect, Solana Pay QR, status dashboard, devnet→audited mainnet low caps.
Next (1-3 mo): milestone escrows, invoicing layer, email/Telegram notifications, freelancer profile, Blink distribution on X, basic reputation.
Later (3-9 mo): dispute/arbitration, team/agency accounts, recurring retainers, fiat off-ramp partners, payments graph & credit signals, embeddable API.

### 11. OKRs (render Objectives as headers, KRs as stat chips)
Q1 Prove the loop. O1 ship an escrow strangers actually use: 100 mainnet escrows; 60% of funded escrows reach Release/Auto-release; median create-to-fund under 10 min. O2 validate the Superteam beachhead: 30 unique Superteam freelancers complete a real paid job; 3 unsolicited public testimonials.
Q2 Prove it's a business. O3 show willingness to pay the fee: $50k cumulative GMV; <5% churn to competitors after first use; fee revenue covers infra + audit amortization. O4 build the network wedge: 20% of new escrows from a previously-seen client wallet; reputation v1 with 200 profiles.

### 12. Revenue Model
Primary: 0.5-1% fee on successful release, deducted from released amount; scales with volume; aligned incentive (we earn when the freelancer gets paid).
Secondary (roadmap): flat fee per large escrow (e.g. $1 flat above $2,000); premium subscription for agencies/power freelancers ($9-19/mo) with milestones, invoicing, team seats; compliant float/yield on held USDC; embedded/API B2B2C later.
Unit economics: cost per escrow near-zero on Solana; at 1% fee contribution margin is effectively the fee minus negligible infra; constraint is GMV not cost, which is why the repeat-client loop matters.

### 13. Go-to-Market
Beachhead: the Superteam Earn community (they are the users, already here, sponsor is a Superteam partner). Launch by dogfooding real paid work through Nexrow and screen-recording it.
Wedge motion: single-link virality; every escrow link is a marketing surface; the client experiences Nexrow as a payer and becomes a potential repeat client or freelancer; links travel through Telegram, X DMs, Discord.
Channels: X threads + Blinks (fund from the timeline); Superteam Discord/Telegram and regional chapters (Nigeria, India, SEA, Vietnam, Turkey); founder-led public build logs and "I got paid in 3 seconds" clips; payment-horror-story content.
Positioning: For cross-border freelancers tired of getting paid late and losing 10% to platforms, Nexrow is a single link that holds your client's money before you start and pays you the instant they approve, no bank, no account, no marketplace.
Launch sequence: devnet demo + thread; mainnet low-cap beta with 30 hand-picked freelancers; public launch with testimonials + Blink; chapter-by-chapter regional rollout.

### 14. Marketing Strategy
Core narrative: "You did the work. Now hope you get paid." → "Never work on trust again." Emotional hook (ghosted-after-delivery) + a 15-second instant-release proof clip.
Content pillars: payment pain stories; build-in-public; educational how-escrow-protects-you; proof/testimonials.
Community-led growth: referral (reduced fee for both) when a user brings a paying client; Superteam chapter ambassadors; public leaderboard of GMV protected.
Solana-unique distribution: Blinks let a funding action live inside a tweet, a channel no fiat competitor has.
Metrics: activation (create→fund rate), virality (clients who become creators), retention (repeat clients), word-of-mouth.

### 15. Competitive Matrix (render as the responsive table)
Columns: Nexrow, Upwork/Fiverr escrow, Escrow.com, Request/crypto invoicing, Squads/multisig.
Rows:
- Take rate: ~1% | 10-20% | 0.89-3.25%+ | ~0-1% | gas only
- Settlement: Seconds | Days | Days | Minutes | Minutes
- Needs a bank: No | Yes | Yes | No | No
- Needs an account: No (wallet) | Yes | Yes | No | Yes (setup)
- Marketplace lock-in: No | Yes | No | No | No
- Handles disputes: v2 | Yes | Yes | No | Manual
- Built for solo freelancer: Yes | Yes | No | Partly | No
- Works over any chat/link: Yes | No | No | Partly | Partly
- Mobile-first: Yes | Partly | No | Partly | No
Reading (callout): incumbents win on dispute handling and trust brand but lose on cost, speed, lock-in, simplicity; crypto tools win on cost but aren't usable escrow for a solo freelancer; Nexrow's whitespace is escrow-grade guarantee with link-level simplicity at near-zero cost, with disputes deliberately deferred and roadmapped.

### 16. Pitch Deck (render each slide as a numbered card)
1 Title: Nexrow, get paid the moment they say yes. 2 Problem: you deliver first and hope (Ada's story). 3 Solution: a link that holds the client's money before you start and pays you in seconds on approval. 4 Demo: 15s create→fund→release, real USDC. 5 Why now: USDC depth + Blinks + onboarded freelancers. 6 Why Solana: sub-cent, ~400ms, Solana Pay, Blinks. 7 Market: global freelance economy; beachhead Superteam-style crypto freelancers in NG/IN/SEA/LATAM. 8 Product: MVP + roadmap link→invoicing→reputation→network. 9 Business model: ~1% on release vs Upwork's ~10%; premium + float later. 10 Competition: the matrix and our whitespace. 11 GTM: Superteam beachhead, single-link virality, chapter rollout, Blinks. 12 Plan: Q1 loop, Q2 business (OKRs). 13 Why Sumiro: same shape as Sharebox, their network is the user, clean 14-day MVP. 14 Ask: build it in the sprint, launch with the Superteam community.

### 17. Appendix
Glossary (client-facing): Escrow = money held safely until work is approved. Release = pay the freelancer. Timeout = auto-pay the freelancer if the client goes quiet.
Top risks ranked: disputes/trust at scale (arbitration roadmap); money-transmission regulation (non-custodial design + counsel); smart-contract exploit (audit + caps); cold-start beyond Superteam (single-link virality + chapters).
One honest line for judges: the hard part is disputes, and we deliberately don't pretend to solve it in v1; we solve the 80% case (honest client, ghosting risk) with approve-or-timeout, and name arbitration as the v2 that turns a feature into a company.
Naming rationale: "Nexrow" means held safely and kept-your-word; short, works as a verb, clean domain surface, no crypto jargon.

## DELIVERABLES

1. A runnable project (`npm install && npm run dev` works).
2. All content above in a typed `content.ts` (or `content/` folder) so sections are data-driven.
3. The three-column responsive layout, working theme toggle with no flash, active-section highlighting, and all the components listed (callouts, comparison table, stat chips, steppers, slide cards, roadmap badges).
4. A short `README.md` explaining how to run it and where to edit content.
5. Polished styling in BOTH light and dark themes (check contrast in each).

## BUILD ORDER (follow this)

1. Scaffold the project and Tailwind + theme setup (with the no-flash inline script). Verify dark/light toggle works on an empty page first.
2. Create `content.ts` with every section from the CONTENT block, typed.
3. Build the layout shell: header (logo + toggle + bounty tag), sticky sidebar with grouped nav, content column, right TOC. Wire IntersectionObserver active states.
4. Build reusable components: Section, Callout, ComparisonTable, StatChip, Stepper, SlideCard, RoadmapColumn, QA.
5. Map content into sections in IA order.
6. Responsive pass (mobile drawer, hide right TOC below lg, horizontal-scroll table).
7. Polish: typography scale, spacing, hover states, copy-link-on-heading, footer.
8. Write the README. Run and self-check both themes.

Do not stop after scaffolding. Complete all sections with the real content provided. When done, print the run command and a list of every section you rendered so I can verify nothing was skipped.
