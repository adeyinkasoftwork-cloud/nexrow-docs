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
      {
        kind: "callout",
        variant: "info",
        title: "Status, as of July 2026: this is built, not just proposed",
        body: "The escrow program is deployed and running on Solana devnet (program DJ7iTN4V1Du3N6akVUvQdyn6QVb9B7jgWPEkeuh89kX2), and the app signs real create, fund, release, and cancel transactions against it. The 36-test suite includes five security guards that were mutation-verified: each guard was deleted, the program rebuilt, and the matching test confirmed to fail, then the guard was restored byte-identical. What is not yet true is stated plainly throughout: devnet only (not mainnet), unaudited, and an upgrade authority still held by a single developer key. The rest of this page documents what exists, and marks what is still ahead.",
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
            a: "It now exists and runs on Solana devnet. A freelancer creates an escrow (amount, description, payout wallet, timeout) and gets a shareable link, the client opens it and funds a program-owned vault, the freelancer delivers off-platform, the client clicks Release, and if the client never acts the funds auto-release after the timeout. Create, fund, release, and cancel all sign real on-chain transactions. It is devnet only and unaudited so far.",
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
          "Decentralized or staked arbitration (a basic single-arbiter dispute path did ship, see below)",
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
          { term: "FR2", detail: "Generate a shareable link, copyable and with a scannable QR of that link. (A native Solana Pay request and a Blink are roadmap, not shipped.)" },
          { term: "FR3", detail: "Fund via connected wallet, signing a real on-chain transaction." },
          {
            term: "FR4",
            detail:
              "On-chain escrow account with the state machine Created → Funded → Released / Refunded / AutoReleased, plus, when a party opens a dispute, Funded → Disputed → ResolvedRelease / ResolvedRefund / ResolvedSplit.",
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
          "Wallet sign-in via a nonce and signature (email/password auth also shipped)",
          "Audited before mainnet (the program is currently unaudited and devnet only)",
          "Graceful RPC failure",
        ],
      },
      {
        heading: "Acceptance criteria",
        kind: "callout",
        variant: "key",
        title: "One sentence, testable, and now passing on devnet",
        body: "A freelancer with no prior account can create and share a funded escrow, and a client with a wallet can fund and release it, and the freelancer receives the funds minus the fee, on devnet, in under 5 minutes. This runs end to end against the deployed program today. Mainnet, an audit, and low caps are the remaining gate before real money.",
      },
      {
        heading: "Risks",
        kind: "definitions",
        items: [
          {
            term: "Dispute abuse",
            detail:
              "The 80% case is handled by approve-or-timeout. A basic dispute path also shipped: either party can freeze a funded escrow, and an arbiter resolves it (release, refund, or split). The arbiter is a single hot key today, which is itself a risk, see the Appendix.",
          },
          {
            term: "Regulation",
            detail:
              "Non-custodial by design: funds move wallet to program vault to wallet, and there is no pooled Nexrow balance. Get counsel before touching fiat.",
          },
          {
            term: "Contract risk",
            detail: "Deployed to devnet with a 36-test suite and five mutation-verified guards, but unaudited. External audit and low caps before mainnet.",
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
    summary: "What shipped, and what deliberately did not.",
    group: "Product",
    blocks: [
      {
        heading: "Shipped (live on devnet)",
        kind: "bullets",
        items: [
          "Create escrow, signing initialize_escrow on-chain",
          "Shareable link with a copyable URL and a QR of that link",
          "Fund via connected wallet, signing a real on-chain transaction",
          "On-chain state machine, including the dispute and resolution states",
          "Release by the client",
          "Cancel before funding",
          "Timeout auto-release, cranked by a scheduled keeper",
          "Per-wallet dashboard, read back from the chain",
          "Fee on release, routed to the treasury from the Config PDA",
          "Supabase auth, profiles, settings, notifications, and dispute records, with RLS",
          "Wallet sign-in via a nonce and signature",
          "Dispute open plus a single-arbiter resolution console (release, refund, split)",
          "Non-custodial wallet view (no pooled Nexrow balance, no deposit or withdraw)",
        ],
      },
      {
        heading: "Out of scope (still)",
        kind: "bullets",
        items: [
          "Decentralized or staked arbitration",
          "Fiat ramps",
          "Milestones",
          "Teams",
          "Native mobile app",
          "Reputation",
          "Solana Pay funding and Blinks distribution",
          "Email and Telegram notifications (in-app notifications did ship)",
        ],
      },
      {
        heading: "Definition of done",
        kind: "callout",
        variant: "key",
        title: "Done means live, not demoable",
        body: "The full loop is live on devnet: a new freelancer creates and shares a funded escrow, a client funds and releases it, and the freelancer receives the funds minus the fee, in one session with no manual intervention. The remaining gate to calling it done for real money is mainnet, an external audit, low caps, and moving the upgrade and arbiter authorities off single keys.",
      },
      {
        heading: "What actually got built",
        kind: "stepper",
        steps: [
          {
            label: "Step 1",
            title: "Positioning, naming, scope freeze",
            body: "Locked the one-liner, the name, and the boundary of v1.",
          },
          {
            label: "Step 2",
            title: "Branding, landing, escrow UI",
            body: "Brand system and landing page, the escrow creation and funding UI, and the wallet adapter.",
          },
          {
            label: "Step 3",
            title: "Anchor program, tested, deployed to devnet",
            body: "Wrote the on-chain program (escrow plus a Config PDA for treasury and arbiter, disputes, and arbiter resolution), covered it with a 36-test LiteSVM suite, mutation-verified five of the security guards, and deployed to devnet.",
          },
          {
            label: "Step 4",
            title: "Wired the frontend, Supabase, keeper, arbiter console",
            body: "Wired create, fund, release, and cancel to the deployed program, stood up Supabase (auth, profiles, settings, notifications, dispute records, RLS) with wallet sign-in, added the timeout keeper, and built the arbiter console. Audit and mainnet are the remaining post-sprint work.",
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
    summary: "What was built. The program is the source of truth for funds, and no pooled balance ever touches our servers.",
    group: "Product",
    blocks: [
      {
        heading: "Overview",
        kind: "prose",
        paragraphs: [
          "A Next.js web client, a Solana program (Anchor, deployed to devnet) that is the source of truth for funds, USDC as the value layer, and Supabase as an off-chain record and index layer for reads, accounts, and notifications.",
          "One thing was added that was not in the original plan: a Config PDA, a platform singleton that holds the treasury and arbiter authorities outside any escrow. It exists so that the escrow creator (the freelancer) can never name themselves the arbiter and self-resolve. The admin can rotate treasury or arbiter through update_config without redeploying the program.",
          "No pooled Nexrow balance ever exists: funds move wallet to program vault to wallet directly. The one honest caveat is the program's upgrade authority, covered under Trust and security below.",
        ],
      },
      {
        heading: "Components",
        kind: "cards",
        items: [
          {
            title: "Frontend",
            body: "Next.js and React, with a wallet adapter for Phantom, Backpack, and Solflare. The share surface is a link (/e/[id]) with a copy button and a QR of that link. A native Solana Pay request and a Blink are on the roadmap, not shipped.",
          },
          {
            title: "On-chain program",
            body: "Anchor and Rust, deployed to devnet at DJ7iTN4V1Du3N6akVUvQdyn6QVb9B7jgWPEkeuh89kX2. A PDA per escrow owns a per-escrow vault token account. Instructions: initialize_config, update_config, initialize_escrow, fund_escrow, release, cancel, timeout_release, open_dispute, resolve_release, resolve_refund, resolve_split. The fee is routed to the treasury on release.",
          },
          {
            title: "Config PDA",
            body: "A platform singleton (seed \"config\"), created once, holding admin, treasury, and arbiter. Kept off the escrow so neither party can appoint the arbiter. The admin can rotate keys via update_config with no redeploy. This was not in the original design.",
          },
          {
            title: "Supabase",
            body: "The off-chain record and index layer: auth, profiles, settings, notifications, and dispute records (evidence and messages), all under row-level security. Non-authoritative for funds. If it goes down, the money is unaffected and reads self-heal from the chain.",
          },
          {
            title: "Keeper (auto-release crank)",
            body: "A scheduled server-side job that signs timeout_release for expired escrows with a dedicated keeper key. On the current Vercel Hobby cron it runs about once a day, so auto-release is not instant at the moment the window closes. Anyone can also trigger timeout_release directly against the program.",
          },
          {
            title: "Arbiter console",
            body: "A dispute-resolution surface gated by a logged-in session, a server-only admin allowlist, and a per-resolution operator-wallet step-up signature. The on-chain resolve_* instructions still require the arbiter key recorded in the Config PDA.",
          },
        ],
      },
      {
        heading: "State machine",
        kind: "code",
        caption: "The actual on-chain states. Timeout is enforced by the on-chain clock and is callable by anyone after expiry. Disputes freeze the escrow, and only the arbiter can resolve them.",
        // Pure ASCII on purpose: box-drawing glyphs are not in the font's latin
        // subset, so they fall back to another face and the diagram misaligns.
        code: `  +---------+   fund_escrow    +--------+      release     +----------+
  | Created | ---------------> | Funded | ---------------> | Released |
  +---------+  (client funds)  +--------+ (client approves)+----------+
       |                         |    |
       | cancel                  |    | timeout_release
       | (creator, before fund)  |    | (anyone, after timeout_at)
       v                         |    v
  +----------+                   |  +--------------+
  | Refunded |                   |  | AutoReleased |
  +----------+                   |  +--------------+
                                 | open_dispute
                                 | (either party)
                                 v
                            +----------+
                            | Disputed |
                            +----------+
                                 | resolve_release / resolve_refund /
                                 | resolve_split   (arbiter only)
                                 v
             +-----------------+ +----------------+ +---------------+
             | ResolvedRelease | | ResolvedRefund | | ResolvedSplit |
             +-----------------+ +----------------+ +---------------+

  initialize_config runs once, setting the treasury and arbiter in a
  Config PDA the parties do not control. initialize_escrow is signed by
  the freelancer and creates the account in Created. The program vault
  holds the USDC, never Nexrow.`,
      },
      {
        heading: "Data model",
        kind: "dataModel",
        fields: [
          {
            field: "escrow PDA",
            type: "Pubkey",
            note: "Program-derived from [\"escrow\", creator, seed]. One per escrow.",
          },
          {
            field: "creator",
            type: "Pubkey",
            note: "Freelancer who created the link. Authority for cancel only, never a payout.",
          },
          {
            field: "freelancer_wallet",
            type: "Pubkey",
            note: "Where the payout goes. May differ from creator.",
          },
          {
            field: "payer",
            type: "Pubkey",
            note: "Client wallet. Pubkey::default() until funded, then set to whoever funds.",
          },
          { field: "mint", type: "Pubkey", note: "The SPL mint held in escrow (USDC)." },
          { field: "vault", type: "Pubkey", note: "This escrow's token account, a PDA whose authority is the escrow." },
          { field: "amount", type: "u64", note: "Escrowed amount, in the mint's base units." },
          {
            field: "fee_bps",
            type: "u16",
            note: "Fee in basis points, snapshotted at creation (default 100, 1%). Deducted on release.",
          },
          {
            field: "timeout_at",
            type: "i64",
            note: "Unix timestamp. After this, anyone can trigger timeout_release.",
          },
          { field: "seed", type: "u64", note: "Caller nonce, so one creator can hold many live escrows." },
          {
            field: "status",
            type: "enum",
            note: "Created, Funded, Released, Refunded, AutoReleased, Disputed, ResolvedRelease, ResolvedRefund, ResolvedSplit.",
          },
        ],
      },
      {
        kind: "callout",
        variant: "info",
        title: "The Config account",
        body: "Separate from the escrow, a single Config PDA (seed \"config\") holds admin, treasury, and arbiter. It is created once by initialize_config and updated only by the admin via update_config. Keeping treasury and arbiter here, out of the escrow struct, is what stops a freelancer from naming themselves the arbiter. This account did not exist in the original plan.",
      },
      {
        heading: "Trust & security",
        kind: "bullets",
        items: [
          "Funds sit in a per-escrow program vault, not in any Nexrow-controlled wallet. There is no pooled balance.",
          "Between the two counterparties, the money is neutral: the creator can only cancel or receive a payout, never trigger one to themselves, and the client is the only one who can release.",
          "Timeout is triggerable by anyone after expiry, so the freelancer never depends on Nexrow being online. In practice the keeper does it, roughly once a day on the current host.",
          "A dispute freezes the escrow. Only the arbiter recorded in the Config PDA can resolve it, and neither party can appoint that arbiter.",
          "Unaudited, and devnet only. An external audit and low caps come before mainnet.",
        ],
      },
      {
        heading: "The strongest evidence: mutation-verified guards",
        kind: "callout",
        variant: "key",
        title: "We did not just write tests, we proved they bite",
        body: "The program ships with a 36-test LiteSVM suite, one test per non-negotiable invariant. For five of the security guards we went further and mutation-verified them: each guard was deleted from the source, the program rebuilt, and the corresponding test confirmed to fail, then the guard was restored byte-identical. That is direct evidence the guard is load-bearing and the test would catch its removal, which is a stronger claim than a passing test on its own. It is still not a substitute for an external audit.",
      },
      {
        kind: "callout",
        variant: "warning",
        title: "The honest limit on \"non-custodial\"",
        body: "Against the currently deployed rules, if Nexrow disappeared every funded escrow could still be released or timed out by the counterparties directly against the program. But the program's upgrade authority is a single developer keypair (A9JyaJtpFKNvf1pD1phs7GPq1mEi2VpCniyFD9kfCiSW). Whoever holds it can deploy different rules and reach every escrow, so any flat \"Nexrow cannot touch your money\" claim is not true as written today. The mitigation is to move the upgrade authority to a multisig before mainnet. Until then, this stays on devnet.",
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
            body: "Get the link and a QR of it. Send it to the client in whatever chat they already use.",
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
            title: "Connect",
            body: "Connect a wallet. (Scanning the QR opens the same link on a phone; native Solana Pay funding is roadmap.)",
          },
          {
            label: "03",
            title: "Approve",
            body: "Approve fund_escrow, a real on-chain transaction. The card flips to Funded, and the freelancer can start with proof of funds.",
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
            body: "If the client never returns, then after the timeout the funds release to the freelancer. The keeper does this automatically, though on the current host it runs about once a day, so it is not instant at the moment the window closes. Anyone can also trigger timeout_release directly.",
          },
        ],
      },
      {
        heading: "Flow 4: If it goes wrong, a dispute",
        kind: "stepper",
        steps: [
          {
            label: "01",
            title: "Freeze",
            body: "Either party opens a dispute on a funded escrow. That flips it to Disputed, which freezes both release and the timeout crank.",
          },
          {
            label: "02",
            title: "Review",
            body: "Evidence and messages are recorded off-chain in Supabase. An arbiter reviews them in the arbiter console.",
          },
          {
            label: "03",
            title: "Resolve",
            body: "The arbiter resolves on-chain: release to the freelancer, refund to the client, or a split. Today the arbiter is a single key, and moving it to a Squads multisig is the roadmap fix.",
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
        kind: "callout",
        variant: "key",
        title: "Already live on devnet, the base the roadmap builds on",
        body: "Deployed Anchor program, on-chain create, fund, release, cancel, and timeout, dispute plus single-arbiter resolution, the auto-release keeper, Supabase auth, profiles, settings, notifications and dispute records, wallet sign-in, and the non-custodial wallet view. Backed by a 36-test suite with five mutation-verified guards. The roadmap below is what comes after that.",
      },
      {
        kind: "roadmap",
        columns: [
          {
            phase: "Now",
            window: "hardening toward mainnet",
            items: [
              "External security audit",
              "Move the program upgrade authority to a multisig",
              "Move the arbiter to a Squads multisig",
              "Faster auto-release crank (the Hobby cron runs ~once a day)",
              "Mainnet at low caps",
            ],
          },
          {
            phase: "Next",
            window: "1-3 months",
            items: [
              "Solana Pay funding and Blink distribution on X",
              "Invoicing layer",
              "Milestone escrows",
              "Freelancer profiles and reputation v1",
              "Email and Telegram notifications",
            ],
          },
          {
            phase: "Later",
            window: "3-9 months",
            items: [
              "Decentralized or staked arbitration",
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
          "A 0.5-1% fee on successful release, deducted from the released amount. The deployed default is 1% (100 basis points), snapshotted into each escrow at creation and routed to the treasury on release. It scales with volume, and the incentive is aligned: we only earn when the freelancer actually gets paid.",
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
          "X threads, and (roadmap) Blinks so a client can fund straight from the timeline.",
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
        body: "On the roadmap, Blinks let the funding action live inside a tweet. Escrow.com cannot put a fundable escrow in a timeline, and Upwork does not want to. Today the share surface is a link and a QR, and the Blink is the next step.",
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
          { label: "Handles disputes", cells: ["Basic (single arbiter)", "Yes", "Yes", "No", "Manual"] },
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
        body: "Incumbents win on dispute handling and trust brand, but lose on cost, speed, lock-in, and simplicity. Crypto tools win on cost, but are not usable escrow for a solo freelancer. Nexrow's whitespace is escrow-grade guarantee with link-level simplicity at near-zero cost, with a basic single-arbiter dispute path shipped and decentralized arbitration roadmapped.",
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
            body: "15 seconds: create, fund, release. Real USDC on devnet, against the deployed program.",
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
            body: "Built and live on devnet: on-chain escrow, disputes, keeper, Supabase, wallet sign-in. 36 tests, five security guards mutation-verified. Roadmap: link → invoicing → reputation → network.",
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
            body: "It is already built and running on devnet. Back the audit, the move to multisig authorities, and the mainnet launch with the Superteam community.",
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
            detail: "Auto-pay the freelancer if the client goes quiet. Handled by the keeper, and triggerable by anyone.",
          },
          {
            term: "Dispute",
            detail: "Either party freezes the escrow so no one can move the money until an arbiter decides.",
          },
          {
            term: "Arbiter",
            detail: "The neutral party who resolves a dispute (release, refund, or split). A single key today, a multisig later.",
          },
        ],
      },
      {
        heading: "Top risks, ranked against what is actually exposed now",
        kind: "definitions",
        items: [
          {
            term: "1. Upgrade-authority key compromise",
            detail: "The program's upgrade authority is a single developer keypair. Whoever holds it can deploy different rules and reach every escrow. Mitigation: move it to a multisig before mainnet, and stay on devnet until then. This is the real one now.",
          },
          {
            term: "2. Unaudited contract",
            detail: "A 36-test suite and five mutation-verified guards raise confidence, but they are not an audit. Mitigation: external audit and low caps before mainnet.",
          },
          {
            term: "3. Single-arbiter compromise or capture",
            detail: "One hot key resolves every dispute. Mitigation: move the arbiter to a Squads multisig.",
          },
          {
            term: "4. Money-transmission regulation",
            detail: "Mitigation: non-custodial design (no pooled balance, no deposit or withdraw), plus counsel before touching fiat.",
          },
          {
            term: "5. Disputes and trust at scale",
            detail: "A basic single-arbiter path shipped, but it does not scale and is centralized. Mitigation: the decentralized-arbitration roadmap.",
          },
          {
            term: "6. Cold-start beyond Superteam",
            detail: "Mitigation: single-link virality, plus the chapter network.",
          },
        ],
      },
      {
        heading: "One honest line for judges",
        kind: "callout",
        variant: "warning",
        title: "What is real, and what we are not claiming",
        body: "What is real: the program is deployed to devnet, the app signs real create, fund, release, and cancel transactions, disputes and single-arbiter resolution work, and five of the security guards are mutation-verified, not just tested. What we are not claiming: it is not on mainnet, it is not audited, the upgrade authority and the arbiter are still single keys, and the dispute path is basic. We solve the 80% case (an honest client, with ghosting risk) with approve-or-timeout, and we name the audit, the multisig authorities, and decentralized arbitration as the work that turns a working prototype into something that can hold real money.",
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
