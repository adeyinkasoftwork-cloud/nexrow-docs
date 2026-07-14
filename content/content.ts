/**
 * Nexrow documentation content.
 *
 * Every section on the site is rendered from this file. To change the site's
 * copy, edit here: nothing in `components/` or `app/` hardcodes prose.
 *
 * House style: no em dashes in body copy. Use commas, colons, parentheses, or
 * separate sentences instead.
 */

export type Callout = {
  kind: "callout";
  variant: "info" | "warning" | "key";
  title: string;
  body: string;
};

export type BlockBody =
  | { kind: "lead"; text: string }
  | { kind: "prose"; paragraphs: string[] }
  | { kind: "bullets"; items: string[] }
  | { kind: "qa"; items: { q: string; a: string }[] }
  | Callout
  | { kind: "definitions"; items: { term: string; detail: string }[] }
  | { kind: "cards"; items: { title: string; body: string }[] }
  | { kind: "code"; caption?: string; code: string }
  | {
      kind: "table";
      columns: string[];
      rows: { label: string; cells: string[] }[];
      highlightColumn?: number;
    }
  | { kind: "dataModel"; fields: { field: string; type: string; note: string }[] }
  | { kind: "stepper"; steps: { label: string; title: string; body: string }[] }
  | {
      kind: "okr";
      objectives: { id: string; period: string; title: string; krs: string[] }[];
    }
  | {
      kind: "roadmap";
      columns: { phase: "Now" | "Next" | "Later"; window: string; items: string[] }[];
    }
  | { kind: "slides"; items: { n: number; title: string; body: string }[] };

/** A block may carry an optional h3 heading, which feeds the "On this page" TOC. */
export type Block = BlockBody & { heading?: string };

export type SectionGroup = "Thesis" | "Product" | "Plan" | "Analysis & Pitch";

export type Section = {
  id: string;
  /** Short label used in the sidebar. */
  navLabel: string;
  /** Full h2 shown in the content column. */
  title: string;
  /** One-line description under the h2. */
  summary: string;
  group: SectionGroup;
  blocks: Block[];
};

export const site = {
  name: "Nexrow",
  tagline: "escrow, in one link.",
  bountyTag: "Built for the Sumiro Studio bounty",
  thesisLine:
    "Escrow that becomes a network: hold the client's USDC before the work starts, release it the moment they approve.",
  sumiroUrl: "https://sumiro.studio",
};

export const groupOrder: SectionGroup[] = [
  "Thesis",
  "Product",
  "Plan",
  "Analysis & Pitch",
];

export const sections: Section[] = [
  // ─────────────────────────────────────────────────────────── 1. Overview ──
  {
    id: "overview",
    navLabel: "Overview",
    title: "Overview",
    summary: "The thesis, and the one line it all compresses into.",
    group: "Thesis",
    blocks: [
      {
        kind: "lead",
        text: "Nexrow is a single shareable link that holds a client's USDC in escrow the moment a deal is agreed, and releases it to the freelancer on approval in seconds, for a fraction of a cent, with no bank, no account, and no 10% cut.",
      },
      {
        heading: "Thesis",
        kind: "prose",
        paragraphs: [
          "Cross-border freelancers get paid late, in the wrong currency, through platforms that take 10-20% and hold funds for days. The person doing the work carries all the trust risk: they deliver first and hope the client pays.",
          "Nexrow flips this. The wedge is the link. The company is what grows on top of it: invoicing, reputation, recurring clients, and a payments graph of who reliably pays whom.",
          "Upwork is a marketplace that happens to do escrow. Nexrow is escrow that becomes a network. We start where the pain is sharpest and the users are already crypto-native: the Superteam-style global freelancer earning in USDC who has no good way to make a stranger pay them safely.",
        ],
      },
      {
        kind: "callout",
        variant: "key",
        title: "The key insight",
        body: "Escrow is not a feature of a marketplace. It is the smallest unit of trust in cross-border work, and it is shareable. A marketplace has to acquire both sides. A link brings the second side with it.",
      },
    ],
  },

  // ───────────────────────────────────────────────────── 2. Ten Questions ──
  {
    id: "ten-questions",
    navLabel: "The Ten Questions",
    title: "The Ten Questions",
    summary: "Direct answers, no hedging.",
    group: "Thesis",
    blocks: [
      {
        kind: "qa",
        items: [
          {
            q: "What is the startup idea?",
            a: "A single-link USDC escrow for freelancers. Agree scope, client funds the link, work is delivered, client approves, funds release instantly. Timeout auto-release protects the freelancer if the client goes silent.",
          },
          {
            q: "What problem does it solve?",
            a: "The freelancer-side trust gap in cross-border work: deliver-first-hope-to-get-paid, plus slow settlement, FX loss, and platform fees of 10-20%. For clients, it solves “how do I not get scammed paying a stranger overseas.”",
          },
          {
            q: "Who is the target user?",
            a: "Cross-border independent workers who already touch crypto: Superteam bounty hunters, Solana/web3 freelancers (designers, devs, writers), and small agencies in Nigeria, India, SEA, LATAM. Beachhead: the Superteam Earn community itself.",
          },
          {
            q: "Why should this exist on Solana specifically?",
            a: "USDC on Solana settles in ~400ms for sub-cent fees. Escrow of a $150 job is economically pointless on Ethereum and impossible on rails that need a bank. Solana Pay, Blinks, and a mature USDC float make a link-native, mobile-first escrow actually viable. The network choice is load-bearing, not cosmetic.",
          },
          {
            q: "What makes the idea possible now?",
            a: "Deep USDC liquidity on Solana, Blinks/Actions making a payment shareable as a link on X, and a large already-onboarded population of crypto-paid freelancers who feel this pain weekly.",
          },
          {
            q: "What would the first version look like?",
            a: "One page. Freelancer creates an escrow (amount, description, wallet), gets a link, client funds it, funds lock in a program-owned escrow account, freelancer delivers off-platform, client clicks Release, and if the client never acts funds auto-release after a timeout.",
          },
          {
            q: "How would it make money?",
            a: "0.5-1% fee on release (versus Upwork's ~10%). Later: flat fee per large escrow, premium features, and compliant float/yield on held USDC.",
          },
          {
            q: "What competitors exist?",
            a: "Upwork/Fiverr escrow, traditional escrow.com, crypto invoicing tools (Request), and generic multisig/Squads.",
          },
          {
            q: "Why is this better/faster/cheaper?",
            a: "Cheaper (~1% vs ~10%), faster (seconds vs days), simpler (a link, not an account or marketplace), portable (any client, any chat, no lock-in).",
          },
          {
            q: "Why should Sumiro launch this?",
            a: "It's the exact shape Sumiro already ships (Sharebox = paid action as a single link). The target user is Sumiro's own network (Superteam partner). Clean 14-day MVP with an obvious money moment and a real path from feature to company.",
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────── 3. Problem/Users ──
  {
    id: "problem-and-users",
    navLabel: "Problem & Users",
    title: "Problem & Users",
    summary: "Who is bleeding, and where.",
    group: "Thesis",
    blocks: [
      {
        heading: "Problem statement",
        kind: "prose",
        paragraphs: [
          "Independent cross-border workers have no lightweight, trustless way to guarantee they'll be paid for work delivered to a stranger, and clients have no cheap way to prove they'll pay only for work received.",
          "Existing solutions are marketplace-locked, expensive, fiat-slow, or too technical.",
        ],
      },
      {
        heading: "Personas",
        kind: "cards",
        items: [
          {
            title: "Ada, the freelancer",
            body: "Lagos designer paid in USDC. Chases invoices, and lost money to a client who ghosted after delivery. She wants proof of funds before she starts, and an instant payout when the work is accepted.",
          },
          {
            title: "Marcus, the client",
            body: "Runs a small DAO/startup and hires globally. He wants to pay only for delivered work, without wiring money to strangers or trusting an unknown contractor with an advance.",
          },
        ],
      },
      {
        kind: "callout",
        variant: "key",
        title: "The asymmetry",
        body: "Today the freelancer carries 100% of the trust risk and the client carries none. Nexrow does not move the risk to the client, it removes it from both by putting the money in a program neither side controls.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────── 4. Why Solana ──
  {
    id: "why-solana",
    navLabel: "Why Solana",
    title: "Why Solana",
    summary: "The network choice is load-bearing, not cosmetic.",
    group: "Thesis",
    blocks: [
      {
        kind: "definitions",
        items: [
          {
            term: "Fees",
            detail:
              "Sub-cent, so a 1% take on a $100 job is viable and small escrows make sense. On Ethereum, gas can exceed the fee itself.",
          },
          {
            term: "Speed",
            detail:
              "~400ms finality. Release feels like Venmo, not like a bank transfer.",
          },
          {
            term: "USDC depth",
            detail:
              "USDC is the settlement asset these freelancers already hold. No conversion story to sell.",
          },
          {
            term: "Distribution",
            detail:
              "Solana Pay gives QR funding, and Blinks/Actions let a client fund straight from a tweet.",
          },
          {
            term: "Population",
            detail:
              "The users are already on Solana, via Superteam and the bounty ecosystem.",
          },
          {
            term: "Culture",
            detail:
              "The consumer-app, low-friction ethos fits a one-link, tap-to-pay product.",
          },
        ],
      },
      {
        kind: "callout",
        variant: "key",
        title: "Why it would not work elsewhere",
        body: "Escrow on a $150 job is economically pointless on Ethereum (gas can exceed the fee) and impossible on rails that need a bank account on both ends. Solana is the only place where link-native, mobile-first, sub-cent escrow of small amounts is actually viable.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────── 5. Why Now ──
  {
    id: "why-now",
    navLabel: "Why Now",
    title: "Why Now",
    summary: "Three things converged, and none of them were true two years ago.",
    group: "Thesis",
    blocks: [
      {
        kind: "bullets",
        items: [
          "Deep USDC liquidity on Solana: the settlement asset is finally sitting in the users' wallets by default.",
          "Blinks/Actions: a payment can now be shareable as a link on X, so the funding step lives where the conversation already happens.",
          "A large, already-onboarded population of crypto-paid freelancers (Superteam, bounty platforms) who feel this pain weekly, not theoretically.",
        ],
      },
      {
        kind: "callout",
        variant: "info",
        title: "The window",
        body: "The rails, the distribution surface, and the users arrived at the same time. The product is not waiting on a technology that does not exist yet, it is waiting on someone to put a link around it.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────── 6. Product PRD ──
  {
    id: "product",
    navLabel: "Product (PRD)",
    title: "Product (PRD)",
    summary: "Goals, non-goals, requirements, and what done means.",
    group: "Product",
    blocks: [
      {
        heading: "Goals",
        kind: "definitions",
        items: [
          {
            term: "G1",
            detail:
              "Create a fundable escrow link in under 60 seconds, with no signup.",
          },
          {
            term: "G2",
            detail:
              "Guarantee payment on approval or timeout, without trusting the client.",
          },
          { term: "G3", detail: "Keep take-rate under 1% at launch." },
          { term: "G4", detail: "Make the client flow feel like paying an invoice." },
        ],
      },
      {
        heading: "Non-goals (v1)",
        kind: "bullets",
        items: [
          "Dispute arbitration",
          "Fiat on/off ramp",
          "Milestone splitting",
          "Teams",
          "Native mobile apps",
          "Reputation scoring",
        ],
      },
      {
        heading: "User stories",
        kind: "bullets",
        items: [
          "As a freelancer, I create an escrow and send the link.",
          "As a client, I fund the link.",
          "As a client, I release the funds when the work is delivered.",
          "As a freelancer, I get paid by auto-release if the client goes quiet.",
          "As a freelancer, I see the live status of every escrow I have created.",
        ],
      },
      {
        heading: "Functional requirements",
        kind: "definitions",
        items: [
          {
            term: "FR1",
            detail: "Create escrow: amount, title, description, wallet, timeout.",
          },
          { term: "FR2", detail: "Generate a shareable link plus a Blink." },
          { term: "FR3", detail: "Fund via connected wallet or Solana Pay QR." },
          {
            term: "FR4",
            detail:
              "On-chain escrow account with the state machine Created → Funded → Released / Refunded / Auto-released.",
          },
          { term: "FR5", detail: "Release, and cancel-before-funding." },
          { term: "FR6", detail: "Timeout auto-release." },
          { term: "FR7", detail: "Per-wallet dashboard." },
          { term: "FR8", detail: "Fee on release, routed to the treasury." },
        ],
      },
      {
        heading: "Non-functional requirements",
        kind: "bullets",
        items: [
          "Sub-3s perceived flow",
          "Mobile-first",
          "No account required to fund",
          "Wallet-only auth",
          "Audited program",
          "Graceful RPC failure",
        ],
      },
      {
        heading: "Acceptance criteria",
        kind: "callout",
        variant: "key",
        title: "One sentence, testable",
        body: "A freelancer with no prior account can create and share a funded escrow, and a client with a wallet can fund and release it, and the freelancer receives the funds minus the fee, on devnet, in under 5 minutes.",
      },
      {
        heading: "Risks",
        kind: "definitions",
        items: [
          {
            term: "Dispute abuse",
            detail:
              "v1 is trust-first plus timeout. Arbitration is explicitly v2, not a pretended v1 feature.",
          },
          {
            term: "Regulation",
            detail:
              "Non-custodial by design. Get counsel before touching fiat.",
          },
          {
            term: "Contract risk",
            detail: "Audit before mainnet, and launch with low caps.",
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────── 7. MVP Scope ──
  {
    id: "mvp-scope",
    navLabel: "MVP Scope",
    title: "MVP Scope",
    summary: "What ships in 14 days, and what deliberately does not.",
    group: "Product",
    blocks: [
      {
        heading: "In scope",
        kind: "bullets",
        items: [
          "Create escrow",
          "Shareable link plus Blink",
          "Fund via wallet or Solana Pay",
          "On-chain state machine",
          "Release by client",
          "Cancel before fund",
          "Timeout auto-release",
          "Per-wallet status dashboard",
          "Fee on release",
        ],
      },
      {
        heading: "Out of scope",
        kind: "bullets",
        items: [
          "Arbitration",
          "Fiat ramps",
          "Milestones",
          "Teams",
          "Native mobile app",
          "Reputation",
          "Rich notifications",
        ],
      },
      {
        heading: "Definition of done",
        kind: "callout",
        variant: "key",
        title: "Done means live, not demoable",
        body: "On mainnet with low caps: a new freelancer creates and shares a funded escrow, a client funds and releases it, and the freelancer receives the funds minus the fee. One session, audited program, no manual intervention.",
      },
      {
        heading: "14-day build map",
        kind: "stepper",
        steps: [
          {
            label: "Days 1-3",
            title: "Positioning, naming, scope freeze",
            body: "Lock the one-liner, the name, and the boundary of v1. Everything after this is execution, not debate.",
          },
          {
            label: "Days 4-8",
            title: "Branding, landing, escrow UI, integrations",
            body: "Brand system and landing page, the escrow creation and funding UI, wallet adapter, and Solana Pay integration.",
          },
          {
            label: "Days 9-11",
            title: "Anchor program, devnet, polish",
            body: "Ship the on-chain program, run the full loop on devnet, and polish the client-side funding experience.",
          },
          {
            label: "Days 12-14",
            title: "Audit pass, pitch, launch pack",
            body: "Audit pass on low caps, then the pitch, the launch pack, and the thread.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────── 8. Architecture ──
  {
    id: "architecture",
    navLabel: "Product Architecture",
    title: "Product Architecture",
    summary: "The program is the source of truth. Money never touches our servers.",
    group: "Product",
    blocks: [
      {
        heading: "Overview",
        kind: "prose",
        paragraphs: [
          "A thin web client, a Solana program (Anchor) that is the source of truth for funds, USDC as the value layer, and a light indexer/backend used only for read convenience and notifications.",
          "Money never touches our servers.",
        ],
      },
      {
        heading: "Components",
        kind: "cards",
        items: [
          {
            title: "Frontend",
            body: "Next.js and React, wallet adapter for Phantom/Backpack/Solflare, Solana Pay QR, and a Blinks endpoint.",
          },
          {
            title: "On-chain program",
            body: "Anchor/Rust. A PDA per escrow holds USDC in a program-controlled token account. Instructions: initialize_escrow, fund_escrow, release, cancel, timeout_release. The fee is routed to the treasury on release.",
          },
          {
            title: "Backend / indexer",
            body: "Minimal, non-custodial, and non-authoritative. It listens to events purely for dashboard reads and notifications. If it goes down, funds are unaffected.",
          },
          {
            title: "Notifications",
            body: "Email and Telegram. On the roadmap, not in v1.",
          },
        ],
      },
      {
        heading: "State machine",
        kind: "code",
        caption: "Timeout is enforced by the on-chain clock and is callable by anyone after expiry.",
        // Pure ASCII on purpose: box-drawing glyphs are not in the font's latin
        // subset, so they fall back to another face and the diagram misaligns.
        code: `  +---------+   fund_escrow    +--------+      release     +----------+
  | Created | ---------------> | Funded | ---------------> | Released |
  +---------+  (client funds)  +--------+ (client approves)+----------+
       |                            |
       | cancel                     | timeout_release
       | (creator, before fund)     | (anyone, after timeout_at)
       v                            v
  +----------+               +--------------+
  | Refunded |               | AutoReleased |
  +----------+               +--------------+

  initialize_escrow is signed by the freelancer and creates the account
  in the Created state. The program holds the USDC, never Nexrow.`,
      },
      {
        heading: "Data model",
        kind: "dataModel",
        fields: [
          {
            field: "id / PDA",
            type: "Pubkey",
            note: "Deterministic program-derived address, one per escrow.",
          },
          {
            field: "creator",
            type: "Pubkey",
            note: "Freelancer wallet. Set at initialize_escrow.",
          },
          {
            field: "payer",
            type: "Pubkey",
            note: "Client wallet. Set on fund, not known before.",
          },
          { field: "amount", type: "u64", note: "Escrowed amount, in base units." },
          { field: "mint", type: "Pubkey", note: "USDC." },
          {
            field: "status",
            type: "enum",
            note: "Created, Funded, Released, Refunded, AutoReleased.",
          },
          { field: "created_at", type: "i64", note: "Unix timestamp, on-chain clock." },
          { field: "funded_at", type: "i64", note: "Unix timestamp, set on fund." },
          {
            field: "timeout_at",
            type: "i64",
            note: "After this, anyone can trigger timeout_release.",
          },
          {
            field: "fee_bps",
            type: "u16",
            note: "Fee in basis points, deducted on release.",
          },
        ],
      },
      {
        heading: "Trust & security",
        kind: "bullets",
        items: [
          "Funds are custodied by the program, not by us.",
          "Audited before mainnet.",
          "Low caps at launch.",
          "Upgrade authority timelocked or renounced, per the audit.",
          "Timeout is triggerable by anyone, so the freelancer never depends on us being online.",
        ],
      },
      {
        kind: "callout",
        variant: "warning",
        title: "The non-custodial line",
        body: "If Nexrow disappears overnight, every funded escrow can still be released or timed out by the counterparties directly against the program. That property is the product, and we do not trade it away for convenience.",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────── 9. UX Flow ──
  {
    id: "ux-flow",
    navLabel: "UX Flow",
    title: "UX Flow",
    summary: "Three flows. Every screen answers one question: where is my money right now.",
    group: "Product",
    blocks: [
      {
        heading: "Flow 1: Freelancer creates",
        kind: "stepper",
        steps: [
          {
            label: "01",
            title: "Land and create",
            body: "Land on the page, click Create escrow. No signup, no account.",
          },
          {
            label: "02",
            title: "Enter the deal",
            body: "Amount, title, scope, timeout. Confirm the receiving wallet.",
          },
          {
            label: "03",
            title: "Sign",
            body: "Sign initialize_escrow. The escrow account exists on-chain, unfunded.",
          },
          {
            label: "04",
            title: "Share",
            body: "Get the link, the QR, and the Blink. Send it to the client in whatever chat they already use.",
          },
        ],
      },
      {
        heading: "Flow 2: Client funds",
        kind: "stepper",
        steps: [
          {
            label: "01",
            title: "Open the link",
            body: "The client sees an invoice-like card: who, how much, for what, and the line that matters, “your money is held, not spent.”",
          },
          {
            label: "02",
            title: "Connect or scan",
            body: "Connect a wallet, or scan the Solana Pay QR from a phone.",
          },
          {
            label: "03",
            title: "Approve",
            body: "Approve fund_escrow. The card flips to Funded, and the freelancer can start with proof of funds.",
          },
        ],
      },
      {
        heading: "Flow 3: Release",
        kind: "stepper",
        steps: [
          {
            label: "01",
            title: "Deliver",
            body: "The freelancer delivers off-platform, in whatever tool the work already lives in.",
          },
          {
            label: "02",
            title: "Client approves",
            body: "The client clicks Release and approves. Funds move to the freelancer, minus the fee, instantly.",
          },
          {
            label: "03",
            title: "Or the client goes quiet",
            body: "If the client never returns, then after the timeout anyone can trigger timeout_release and the freelancer is paid.",
          },
        ],
      },
      {
        heading: "Dashboard",
        kind: "prose",
        paragraphs: [
          "A per-wallet dashboard lists every escrow the connected wallet has created or funded, with live status. It is a read surface over on-chain state, so it is never the authority on where the money is, it only reports it.",
        ],
      },
      {
        kind: "callout",
        variant: "key",
        title: "Design principles",
        body: "It should feel like paying an invoice, not like using a chain. Every screen answers “where is my money right now.” No jargon on the client side. Mobile-first, with the primary action thumb-reachable.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────── 10. Roadmap ──
  {
    id: "roadmap",
    navLabel: "Product Roadmap",
    title: "Product Roadmap",
    summary: "From a link, to an invoicing layer, to a payments network.",
    group: "Plan",
    blocks: [
      {
        kind: "roadmap",
        columns: [
          {
            phase: "Now",
            window: "0-4 weeks, MVP",
            items: [
              "Anchor escrow program",
              "Single-link create, fund, release, timeout",
              "Wallet connect",
              "Solana Pay QR",
              "Status dashboard",
              "Devnet, then audited mainnet at low caps",
            ],
          },
          {
            phase: "Next",
            window: "1-3 months",
            items: [
              "Milestone escrows",
              "Invoicing layer",
              "Email and Telegram notifications",
              "Freelancer profile",
              "Blink distribution on X",
              "Basic reputation",
            ],
          },
          {
            phase: "Later",
            window: "3-9 months",
            items: [
              "Dispute and arbitration",
              "Team and agency accounts",
              "Recurring retainers",
              "Fiat off-ramp partners",
              "Payments graph and credit signals",
              "Embeddable API",
            ],
          },
        ],
      },
      {
        kind: "callout",
        variant: "info",
        title: "Read the roadmap as a compounding line",
        body: "Each phase makes the next one cheaper. The link brings clients in, invoicing keeps them, reputation makes the choice of freelancer non-random, and the payments graph is the thing no marketplace can copy without owning the escrow.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── 11. OKRs ──
  {
    id: "okrs",
    navLabel: "OKRs",
    title: "OKRs",
    summary: "Q1 proves the loop. Q2 proves it is a business.",
    group: "Plan",
    blocks: [
      {
        kind: "okr",
        objectives: [
          {
            id: "O1",
            period: "Q1",
            title: "Ship an escrow strangers actually use",
            krs: [
              "100 mainnet escrows",
              "60% of funded escrows reach Release or Auto-release",
              "Median create-to-fund under 10 min",
            ],
          },
          {
            id: "O2",
            period: "Q1",
            title: "Validate the Superteam beachhead",
            krs: [
              "30 unique Superteam freelancers complete a real paid job",
              "3 unsolicited public testimonials",
            ],
          },
          {
            id: "O3",
            period: "Q2",
            title: "Show willingness to pay the fee",
            krs: [
              "$50k cumulative GMV",
              "<5% churn to competitors after first use",
              "Fee revenue covers infra plus audit amortization",
            ],
          },
          {
            id: "O4",
            period: "Q2",
            title: "Build the network wedge",
            krs: [
              "20% of new escrows from a previously-seen client wallet",
              "Reputation v1 with 200 profiles",
            ],
          },
        ],
      },
      {
        kind: "callout",
        variant: "key",
        title: "The one metric that decides everything",
        body: "20% of new escrows coming from a previously-seen client wallet is the moment Nexrow stops being a tool and starts being a network. Every other KR is a precondition for that one.",
      },
    ],
  },

  // ────────────────────────────────────────────────────── 12. Revenue Model ──
  {
    id: "revenue",
    navLabel: "Revenue Model",
    title: "Revenue Model",
    summary: "We earn when the freelancer gets paid. Not before.",
    group: "Plan",
    blocks: [
      {
        heading: "Primary",
        kind: "prose",
        paragraphs: [
          "A 0.5-1% fee on successful release, deducted from the released amount. It scales with volume, and the incentive is aligned: we only earn when the freelancer actually gets paid.",
        ],
      },
      {
        heading: "Secondary (roadmap)",
        kind: "definitions",
        items: [
          {
            term: "Flat fee on large escrows",
            detail: "For example, $1 flat above $2,000, so big jobs are not overtaxed.",
          },
          {
            term: "Premium subscription",
            detail:
              "$9-19/mo for agencies and power freelancers: milestones, invoicing, team seats.",
          },
          {
            term: "Float / yield",
            detail: "Compliant yield on held USDC.",
          },
          {
            term: "Embedded / API",
            detail: "B2B2C escrow as a primitive other products can call. Later.",
          },
        ],
      },
      {
        heading: "Unit economics",
        kind: "prose",
        paragraphs: [
          "Cost per escrow is near-zero on Solana. At a 1% fee, contribution margin is effectively the fee minus negligible infra.",
          "The constraint is GMV, not cost. That is exactly why the repeat-client loop matters more than any pricing optimization.",
        ],
      },
      {
        kind: "callout",
        variant: "info",
        title: "The comparison that sells itself",
        body: "On a $2,000 job, Upwork takes roughly $200. Nexrow takes roughly $20. The freelancer keeps the difference, and the client pays a stranger without trusting them.",
      },
    ],
  },

  // ────────────────────────────────────────────────────── 13. Go-to-Market ──
  {
    id: "gtm",
    navLabel: "Go-to-Market",
    title: "Go-to-Market",
    summary: "Start in the room where the users already are.",
    group: "Plan",
    blocks: [
      {
        heading: "Beachhead",
        kind: "prose",
        paragraphs: [
          "The Superteam Earn community. They are the users, they are already here, and the sponsor is a Superteam partner. We launch by dogfooding real paid work through Nexrow and screen-recording it.",
        ],
      },
      {
        heading: "Wedge motion",
        kind: "prose",
        paragraphs: [
          "Single-link virality. Every escrow link is a marketing surface. The client experiences Nexrow as a payer, and becomes a potential repeat client or a freelancer themselves. The links travel through Telegram, X DMs, and Discord, which is exactly where the deals are already being agreed.",
        ],
      },
      {
        heading: "Channels",
        kind: "bullets",
        items: [
          "X threads plus Blinks, so a client can fund straight from the timeline.",
          "Superteam Discord/Telegram and the regional chapters: Nigeria, India, SEA, Vietnam, Turkey.",
          "Founder-led public build logs, and “I got paid in 3 seconds” clips.",
          "Payment-horror-story content, which the audience writes for us.",
        ],
      },
      {
        heading: "Positioning",
        kind: "callout",
        variant: "key",
        title: "The positioning statement",
        body: "For cross-border freelancers tired of getting paid late and losing 10% to platforms, Nexrow is a single link that holds your client's money before you start and pays you the instant they approve. No bank, no account, no marketplace.",
      },
      {
        heading: "Launch sequence",
        kind: "stepper",
        steps: [
          {
            label: "01",
            title: "Devnet demo plus thread",
            body: "Prove the loop publicly before a dollar is at risk.",
          },
          {
            label: "02",
            title: "Mainnet low-cap beta",
            body: "30 hand-picked freelancers, real jobs, real money, tight caps.",
          },
          {
            label: "03",
            title: "Public launch",
            body: "Testimonials plus a Blink, so the launch post is itself a funding surface.",
          },
          {
            label: "04",
            title: "Regional rollout",
            body: "Chapter by chapter, through the Superteam network.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────── 14. Marketing ──
  {
    id: "marketing",
    navLabel: "Marketing Strategy",
    title: "Marketing Strategy",
    summary: "Sell the fear, then show the 15-second proof.",
    group: "Plan",
    blocks: [
      {
        heading: "Core narrative",
        kind: "callout",
        variant: "key",
        title: "“You did the work. Now hope you get paid.” → “Never work on trust again.”",
        body: "The emotional hook is being ghosted after delivery, which every freelancer in this audience has lived. The proof is a 15-second instant-release clip. Fear, then relief, in under a minute.",
      },
      {
        heading: "Content pillars",
        kind: "bullets",
        items: [
          "Payment pain stories",
          "Build in public",
          "Educational: how escrow protects you",
          "Proof and testimonials",
        ],
      },
      {
        heading: "Community-led growth",
        kind: "bullets",
        items: [
          "Referral: a reduced fee for both sides when a user brings a paying client.",
          "Superteam chapter ambassadors.",
          "A public leaderboard of GMV protected.",
        ],
      },
      {
        heading: "Solana-unique distribution",
        kind: "callout",
        variant: "info",
        title: "The channel no fiat competitor has",
        body: "Blinks let the funding action live inside a tweet. Escrow.com cannot put a fundable escrow in a timeline, and Upwork does not want to.",
      },
      {
        heading: "Metrics",
        kind: "bullets",
        items: [
          "Activation: create-to-fund rate",
          "Virality: clients who become creators",
          "Retention: repeat clients",
          "Word-of-mouth",
        ],
      },
    ],
  },

  // ──────────────────────────────────────────────── 15. Competitive Matrix ──
  {
    id: "competitive-matrix",
    navLabel: "Competitive Matrix",
    title: "Competitive Matrix",
    summary: "Where the incumbents win, where they cannot follow, and where we sit.",
    group: "Analysis & Pitch",
    blocks: [
      {
        kind: "table",
        highlightColumn: 0,
        columns: [
          "Nexrow",
          "Upwork / Fiverr escrow",
          "Escrow.com",
          "Request / crypto invoicing",
          "Squads / multisig",
        ],
        rows: [
          {
            label: "Take rate",
            cells: ["~1%", "10-20%", "0.89-3.25%+", "~0-1%", "Gas only"],
          },
          {
            label: "Settlement",
            cells: ["Seconds", "Days", "Days", "Minutes", "Minutes"],
          },
          { label: "Needs a bank", cells: ["No", "Yes", "Yes", "No", "No"] },
          {
            label: "Needs an account",
            cells: ["No (wallet)", "Yes", "Yes", "No", "Yes (setup)"],
          },
          {
            label: "Marketplace lock-in",
            cells: ["No", "Yes", "No", "No", "No"],
          },
          { label: "Handles disputes", cells: ["v2", "Yes", "Yes", "No", "Manual"] },
          {
            label: "Built for solo freelancer",
            cells: ["Yes", "Yes", "No", "Partly", "No"],
          },
          {
            label: "Works over any chat/link",
            cells: ["Yes", "No", "No", "Partly", "Partly"],
          },
          { label: "Mobile-first", cells: ["Yes", "Partly", "No", "Partly", "No"] },
        ],
      },
      {
        heading: "Reading the matrix",
        kind: "callout",
        variant: "key",
        title: "Our whitespace",
        body: "Incumbents win on dispute handling and trust brand, but lose on cost, speed, lock-in, and simplicity. Crypto tools win on cost, but are not usable escrow for a solo freelancer. Nexrow's whitespace is escrow-grade guarantee with link-level simplicity at near-zero cost, with disputes deliberately deferred and roadmapped.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────── 16. Pitch Deck ──
  {
    id: "pitch-deck",
    navLabel: "Pitch Deck",
    title: "Pitch Deck",
    summary: "Fourteen slides.",
    group: "Analysis & Pitch",
    blocks: [
      {
        kind: "slides",
        items: [
          {
            n: 1,
            title: "Title",
            body: "Nexrow: get paid the moment they say yes.",
          },
          {
            n: 2,
            title: "Problem",
            body: "You deliver first, and hope. Ada's story.",
          },
          {
            n: 3,
            title: "Solution",
            body: "A link that holds the client's money before you start, and pays you in seconds on approval.",
          },
          {
            n: 4,
            title: "Demo",
            body: "15 seconds: create, fund, release. Real USDC.",
          },
          {
            n: 5,
            title: "Why now",
            body: "USDC depth, plus Blinks, plus a population of already-onboarded freelancers.",
          },
          {
            n: 6,
            title: "Why Solana",
            body: "Sub-cent fees, ~400ms finality, Solana Pay, Blinks.",
          },
          {
            n: 7,
            title: "Market",
            body: "The global freelance economy. Beachhead: Superteam-style crypto freelancers in NG, IN, SEA, LATAM.",
          },
          {
            n: 8,
            title: "Product",
            body: "MVP plus roadmap: link → invoicing → reputation → network.",
          },
          {
            n: 9,
            title: "Business model",
            body: "~1% on release, versus Upwork's ~10%. Premium and float later.",
          },
          {
            n: 10,
            title: "Competition",
            body: "The matrix, and our whitespace.",
          },
          {
            n: 11,
            title: "Go-to-market",
            body: "Superteam beachhead, single-link virality, chapter rollout, Blinks.",
          },
          {
            n: 12,
            title: "Plan",
            body: "Q1 prove the loop. Q2 prove the business. (The OKRs.)",
          },
          {
            n: 13,
            title: "Why Sumiro",
            body: "Same shape as Sharebox, their network is the user, and it is a clean 14-day MVP.",
          },
          {
            n: 14,
            title: "Ask",
            body: "Build it in the sprint, and launch it with the Superteam community.",
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────── 17. Appendix ──
  {
    id: "appendix",
    navLabel: "Appendix",
    title: "Appendix",
    summary: "Glossary, ranked risks, and the naming rationale.",
    group: "Analysis & Pitch",
    blocks: [
      {
        heading: "Glossary (client-facing)",
        kind: "definitions",
        items: [
          {
            term: "Escrow",
            detail: "Money held safely until the work is approved.",
          },
          { term: "Release", detail: "Pay the freelancer." },
          {
            term: "Timeout",
            detail: "Auto-pay the freelancer if the client goes quiet.",
          },
        ],
      },
      {
        heading: "Top risks, ranked",
        kind: "definitions",
        items: [
          {
            term: "1. Disputes and trust at scale",
            detail: "Mitigation: the arbitration roadmap. This is the real one.",
          },
          {
            term: "2. Money-transmission regulation",
            detail: "Mitigation: non-custodial design, plus counsel before fiat.",
          },
          {
            term: "3. Smart-contract exploit",
            detail: "Mitigation: audit, plus low caps at launch.",
          },
          {
            term: "4. Cold-start beyond Superteam",
            detail: "Mitigation: single-link virality, plus the chapter network.",
          },
        ],
      },
      {
        heading: "One honest line for judges",
        kind: "callout",
        variant: "warning",
        title: "We are not pretending to solve disputes",
        body: "The hard part is disputes, and we deliberately do not pretend to solve it in v1. We solve the 80% case (an honest client, with ghosting risk) using approve-or-timeout, and we name arbitration as the v2 that turns a feature into a company.",
      },
      {
        heading: "Naming rationale",
        kind: "prose",
        paragraphs: [
          "Nexrow is next-generation escrow, compressed. It means held safely, and kept-your-word.",
          "It is short, it works as a verb (“I'll Nexrow you the link”), it has a clean domain surface, and it carries no crypto jargon, which matters because half the people who receive the link have never used a wallet.",
        ],
      },
    ],
  },
];
