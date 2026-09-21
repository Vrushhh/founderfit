import { BusinessBlueprint } from '../types';

export const BUSINESS_BLUEPRINTS: Record<string, Omit<BusinessBlueprint, 'fitScore' | 'whyThisFitsYou'>> = {
  ai_automation_agency: {
    id: 'ai_automation_agency',
    name: 'AI Automation & Workflow Agency',
    tagline: 'Streamline business operations using no-code AI & API automations',
    archetypeId: 'builder',
    capitalRange: '₹15,000 to ₹35,000',
    timeCommitment: '10 to 15 hours / week',
    businessType: 'Agency',
    firstTarget: '2 paying B2B pilot clients at ₹30,000 / month',
    exampleOffer:
      'Automated Lead Qualification & WhatsApp CRM Sync for real estate brokers, dental clinics, or education consultants.',
    pricingModel: '₹25,000 setup fee + ₹15,000 monthly maintenance retainer',
    firstCustomerStrategy:
      'Map 15 mid-sized local service businesses in your city using manual Excel/WhatsApp workflows. Offer a free 3-day proof-of-concept audit in exchange for a case study or paid rollout.',
    businessModelExplanation:
      'You connect off-the-shelf AI models (OpenAI, Claude) and automation engines (Make.com, n8n, Zapier) to automate repetitive data entry, customer follow-ups, and lead sorting for non-technical business owners who have money but zero technical patience.',
    targetCustomerTypes: [
      {
        title: 'High-Ticket Service Clinics',
        description: 'Dental, aesthetic, or IVF clinics losing leads due to delayed WhatsApp responses.'
      },
      {
        title: 'Real Estate Brokers & Agencies',
        description: 'Agents drowning in unverified 99acres/MagicBricks leads requiring instant automated qualification.'
      },
      {
        title: 'B2B Professional Services',
        description: 'CA firms and logistics coordinators burdened with manual PDF invoice data extraction.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Inventory Your Tech Stack', detail: 'Sign up for Make.com / n8n and test a basic webhook-to-WhatsApp automated trigger.' },
      { day: 2, task: 'Pick One Narrow Problem', detail: 'Focus strictly on "Instant WhatsApp lead qualification within 60 seconds of ad form fill".' },
      { day: 3, task: 'Build a 3-Minute Loom Demo', detail: 'Record your screen showing a form submit triggering instant personalized AI response.' },
      { day: 4, task: 'Identify 20 Target Businesses', detail: 'Find 20 local clinics, interior designers, or brokers running Meta ads in Bengaluru/Mumbai/Pune.' },
      { day: 5, task: 'Cold WhatsApp / LinkedIn Outreach', detail: 'Send the 3-minute video to founders: "I noticed a 4-hour delay on your lead form; here is how we cut it to 30 seconds."' },
      { day: 6, task: 'Conduct 2 Discovery Calls', detail: 'Diagnose where their manual data bottlenecks lie without pitching complex technical jargon.' },
      { day: 7, task: 'Submit Your First Fixed-Scope Pilot', detail: 'Pitch a 14-day implementation at ₹25,000 with a 100% money-back guarantee if it fails to save 5 hrs/week.' }
    ],
    first30Days: [
      { week: 1, focus: 'Niche Definition & Tool Sandbox', deliverables: ['Working Make.com/n8n blueprint', '1-page service scope doc', '30 curated prospect list'] },
      { week: 2, focus: 'Direct Outreach & Loom Video Pitches', deliverables: ['Send 30 personalized video pitches', 'Follow up on WhatsApp & LinkedIn', 'Book 4 discovery calls'] },
      { week: 3, focus: 'Pilot Delivery for Client #1', deliverables: ['Sign 1st client at ₹25k', 'Build and test production automation', 'Collect client praise screenshot'] },
      { week: 4, focus: 'Retainer Upsell & Referral Ask', deliverables: ['Turn client into ₹15k/mo retainer', 'Request introduction to 2 fellow business owners', 'Systematize template for re-use'] }
    ],
    whatToAvoid: [
      { model: 'Complex Multi-Tenant SaaS', reason: 'Requires 6+ months of unvalidated coding before your first rupee of cashflow.' },
      { model: 'General "Do Everything" Freelancing', reason: 'Competing on Upwork for ₹500/hr against low-cost bids leads to quick burnout.' }
    ],
    mindsetShift: 'Sell the outcome (more qualified appointments), never the code or API endpoints.'
  },

  micro_saas_workflow: {
    id: 'micro_saas_workflow',
    name: 'Niche Micro-SaaS / Internal Workflow Tool',
    tagline: 'Lightweight software solving one annoying corporate pain point',
    archetypeId: 'builder',
    capitalRange: '₹20,000 to ₹50,000',
    timeCommitment: '15 to 20 hours / week',
    businessType: 'Digital Product',
    firstTarget: '10 monthly subscribers at ₹1,999 / month',
    exampleOffer:
      'One-click automated GST invoice reconciliation & vendor compliance tracker for Indian SMB accountants.',
    pricingModel: '₹1,499 - ₹3,499 / month per workspace',
    firstCustomerStrategy:
      'Interview 10 finance or operations leads in your immediate professional circle. Build only the single feature they complain about daily, and offer 3 months free in exchange for beta usage.',
    businessModelExplanation:
      'A hyper-focused single-purpose software application that automates one tedious daily task for a specific professional demographic. Because the scope is small, one engineer can build, ship, and maintain it solo.',
    targetCustomerTypes: [
      {
        title: 'B2B Accounting & Audit Teams',
        description: 'Struggling with mismatched GSTR-2B files and vendor follow-ups.'
      },
      {
        title: 'Mid-Sized Recruitment Consultancies',
        description: 'Needing quick parsing of Indian resume formats directly into WhatsApp notifications.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Deconstruct Your Work Pain', detail: 'Write down the 3 repetitive manual scripts or spreadsheets you personally use at your job.' },
      { day: 2, task: 'Validation Interviews', detail: 'Message 5 peers in other companies: "Do you also spend 2 hours every Friday doing this?"' },
      { day: 3, task: 'Define Minimal Scope (V1)', detail: 'Cut 80% of desired features. Keep strictly 1 input screen and 1 clean automated output.' },
      { day: 4, task: 'Build Front-End Mockup', detail: 'Create a clean Next.js UI showing the exact before/after value proposition.' },
      { day: 5, task: 'Connect Core API Logic', detail: 'Wire the single core function that produces the high-value output.' },
      { day: 6, task: 'Beta Demo with 3 Users', detail: 'Watch them use it over screen share without giving hints. Note where they get stuck.' },
      { day: 7, task: 'Launch Pre-Order / Beta Access', detail: 'Offer an annual lifetime discount (e.g. ₹9,999) to validate willingness to pay.' }
    ],
    first30Days: [
      { week: 1, focus: 'Problem Validation & Wireframing', deliverables: ['5 user problem interviews completed', 'Figma/Next.js mockup ready'] },
      { week: 2, focus: 'Functional Prototype Build', deliverables: ['Core functionality working end-to-end', 'Auth and database connected'] },
      { week: 3, focus: 'Closed Beta with 10 Users', deliverables: ['10 active trial users onboarded', 'Bugs identified and resolved'] },
      { week: 4, focus: 'First Paid Conversions', deliverables: ['Convert 3-5 users to paid plans', 'Set up customer feedback loop'] }
    ],
    whatToAvoid: [
      { model: 'Consumer Social Apps', reason: 'Extremely high churn and zero monetization without millions of users.' },
      { model: 'Feature Bloat', reason: 'Building 10 mediocre features instead of 1 indisputable time-saver.' }
    ],
    mindsetShift: 'Build software that saves hours of boring corporate labor every single week.'
  },

  b2b_lead_gen_agency: {
    id: 'b2b_lead_gen_agency',
    name: 'B2B Outbound Lead Generation Agency',
    tagline: 'Help Indian B2B companies book qualified sales appointments with decision makers',
    archetypeId: 'seller',
    capitalRange: '₹15,000 to ₹40,000',
    timeCommitment: '10 to 15 hours / week',
    businessType: 'Agency',
    firstTarget: '3 monthly retainer clients at ₹40,000 / month',
    exampleOffer:
      'Guaranteed 8-12 qualified sales meetings per month for Indian IT service firms, software consultancies, or corporate training providers.',
    pricingModel: '₹35,000 monthly retainer + ₹3,000 per qualified meeting showed',
    firstCustomerStrategy:
      'Audit 15 founders on LinkedIn whose profiles say "Founder at [B2B IT/Services]". Send them a customized 3-point critique of their cold outbound pitch with a sample 50-prospect verified list.',
    businessModelExplanation:
      'Most Indian founders and service business owners hate cold calling and outbound prospecting. You take over their email infrastructure (Instantly/Smartlead), scrape verified decision-makers (Apollo/LinkedIn), write high-converting copy, and route interested replies directly into their calendars.',
    targetCustomerTypes: [
      {
        title: 'Custom Software & Dev Agencies',
        description: 'Need pipeline of US/Europe/Gulf clients looking for dev outsourcing.'
      },
      {
        title: 'Corporate Training & Wellness Providers',
        description: 'Looking to connect with CHROs and VP HRs at Indian tech enterprises.'
      },
      {
        title: 'Commercial Interior Designers',
        description: 'Seeking facilities heads moving into new corporate office parks in Gurugram/BLR.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Set Up Cold Email Infra', detail: 'Purchase 2 secondary domains (.co or .io) and set up SPF, DKIM, DMARC records on Google Workspace.' },
      { day: 2, task: 'Warm Up Email Inboxes', detail: 'Plug inboxes into Smartlead or Instantly for 14-day automated warmup.' },
      { day: 3, task: 'Define Ideal Customer Profile (ICP)', detail: 'Select IT service companies with 15-50 employees who rely purely on word-of-mouth.' },
      { day: 4, task: 'Scrape 100 Verified Leads', detail: 'Use Apollo.io to pull decision makers (Founders, MDs) with verified corporate emails.' },
      { day: 5, task: 'Draft Personalized Copy Sequences', detail: 'Write 3 short (under 75 words) pain-focused emails focused on booked appointments.' },
      { day: 6, task: 'Launch Your Own Agency Campaign', detail: 'Prospect 50 founders using your own cold email and LinkedIn framework.' },
      { day: 7, task: 'Book First Discovery Call', detail: 'Secure first call and present a performance-based trial (pay per qualified meeting).' }
    ],
    first30Days: [
      { week: 1, focus: 'Domain Setup & Infrastructure Warmup', deliverables: ['2 secondary domains configured', 'Smartlead account running warmups'] },
      { week: 2, focus: 'Niche Scripting & Outreach', deliverables: ['50 personalized LinkedIn DMs sent', '3 discovery calls booked'] },
      { week: 3, focus: 'Sign First Retainer Client', deliverables: ['Onboard client at ₹35,000 setup/pilot', 'Set up client lead list on Apollo'] },
      { week: 4, focus: 'First Meeting Deliveries', deliverables: ['Deliver first 3 qualified meetings to client calendar', 'Collect testimonial'] }
    ],
    whatToAvoid: [
      { model: 'No-Name B2C Cold Calling', reason: 'High regulatory friction (DND compliance) and low conversion margins.' },
      { model: 'Pure Commission With Zero Retainer', reason: 'Clients will blame you for their poor closing ability after you book the call.' }
    ],
    mindsetShift: 'You are selling booked sales pipeline, not "emails sent" or "clicks".'
  },

  recruitment_talent_agency: {
    id: 'recruitment_talent_agency',
    name: 'Specialized Niche Talent Placement Agency',
    tagline: 'High-ticket contingency recruitment for hard-to-hire corporate roles',
    archetypeId: 'seller',
    capitalRange: '₹10,000 to ₹30,000',
    timeCommitment: '10 to 15 hours / week',
    businessType: 'Agency',
    firstTarget: '2 candidate placements at 8.33% of annual CTC (₹80k - ₹1.5L per placement)',
    exampleOffer:
      'Pre-vetted senior backend engineers, Growth Marketers, or Risk Analysts delivered within 10 days with zero upfront retainer.',
    pricingModel: '8.33% (1 month gross salary) contingency fee on successful joining',
    firstCustomerStrategy:
      'Check LinkedIn jobs for series A/B Indian startups that have had open engineering or marketing listings for more than 45 days. Contact the hiring manager directly with 2 anonymized high-match candidate profiles.',
    businessModelExplanation:
      'Startups and growing firms struggle to find trustworthy candidates who actually show up for interviews. Using your network, LinkedIn Recruiter/Sales Nav, and specialized screening, you connect hiring managers with qualified candidates and earn a success fee on joining day.',
    targetCustomerTypes: [
      {
        title: 'Funded Tech Startups (Series A-C)',
        description: 'Ramping up engineering teams and tired of sluggish generalist agencies.'
      },
      {
        title: 'Boutique Financial Consulting Firms',
        description: 'Searching for specialized valuation and M&A analysts.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Pick a Tight Role Niche', detail: 'Choose one role you understand deeply: e.g. "Senior React/Go Developers" or "B2B SDRs".' },
      { day: 2, task: 'Draft Standard Placement Agreement', detail: 'Prepare a standard 1-page contingency terms sheet with 90-day replacement clause.' },
      { day: 3, task: 'Identify 15 Stale Job Postings', detail: 'Look for job posts active for 30+ days on LinkedIn/Wellfound with hiring manager listed.' },
      { day: 4, task: 'Source 3 Strong Passive Candidates', detail: 'Reach out to candidates open to new opportunities matching the job specs.' },
      { day: 5, task: 'Send Warm Email to Hiring Manager', detail: '"I noticed your open Tech Lead role. I have 2 vetted candidates open to talking—no upfront fees."' },
      { day: 6, task: 'Secure First Search Mandate', detail: 'Get the agreement signed to formally submit candidate profiles.' },
      { day: 7, task: 'Schedule First 2 Client Interviews', detail: 'Coordinate scheduling and brief candidates on the company interview process.' }
    ],
    first30Days: [
      { week: 1, focus: 'Niche Selection & Legal Terms', deliverables: ['Signed template contract', 'List of 25 target hiring managers'] },
      { week: 2, focus: 'Candidate Pipeline Building', deliverables: ['Build spreadsheet of 20 vetted candidates in niche', 'Screen 8 candidates'] },
      { week: 3, focus: 'Submissions & Interview Cycles', deliverables: ['Submit 6 candidate profiles across 2 clients', '4 interviews scheduled'] },
      { week: 4, focus: 'Offer Stage & Closing', deliverables: ['1 offer extended', 'Prepare candidate for notice period negotiation'] }
    ],
    whatToAvoid: [
      { model: 'Mass Entry-Level Hiring', reason: 'Paperwork nightmare, low margin, and massive candidate drop-off rates.' },
      { model: 'Working with Clients Who Take 3 Weeks to Reply', reason: 'Wastes your candidates and destroys momentum.' }
    ],
    mindsetShift: 'Speed and candidate quality beat mass resume spam every time.'
  },

  fractional_advisory: {
    id: 'fractional_advisory',
    name: 'Fractional Corporate Advisory & Consulting',
    tagline: 'Monetize your senior domain expertise on a high-margin monthly retainer',
    archetypeId: 'consultant',
    capitalRange: '₹10,000 to ₹25,000',
    timeCommitment: '5 to 10 hours / week',
    businessType: 'Consulting',
    firstTarget: '2 SMB or startup clients on ₹35,000 / month retainers',
    exampleOffer:
      'Fractional Head of Finance / Growth / HR / Strategy for early-stage companies needing senior leadership 5 hours a week without paying a ₹30 LPA salary.',
    pricingModel: '₹35,000 - ₹75,000 / month per client (includes weekly 90-min strategy call + async review)',
    firstCustomerStrategy:
      'Reach out to former bosses, ex-colleagues who moved to startups, or early-stage founders in your city. Offer a free 1-hour diagnostic audit on their current operational bottleneck.',
    businessModelExplanation:
      'Startups with 10-40 employees cannot afford a full-time ₹35 LPA Director of Finance, HR, or Marketing. By working with them 4 to 8 hours per week as their "Fractional Lead", you provide executive clarity at a fraction of the cost while commanding ₹4,000+ effective hourly rates.',
    targetCustomerTypes: [
      {
        title: 'Seed & Bootstrapped Startups',
        description: 'Founders needing seasoned operational guidance before hiring a full-time leader.'
      },
      {
        title: 'Traditional Family Businesses Digitizing',
        description: 'Owners who need modern corporate frameworks for finance, marketing, or employee retention.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Catalog Your Executive Wins', detail: 'List the 5 biggest corporate achievements, cost savings, or revenue wins you engineered.' },
      { day: 2, task: 'Package a "Fractional Scope"', detail: 'Define exact boundaries: 4 hours/week, weekly planning call, unlimited Slack guidance.' },
      { day: 3, task: 'Polish LinkedIn Positioning', detail: 'Update headline from "Manager at XYZ" to "Fractional [Domain] Advisor for Growing SMBs".' },
      { day: 4, task: 'List 20 Warm Corporate Contacts', detail: 'Identify ex-colleagues, founders, and vendor partners who already trust your judgment.' },
      { day: 5, task: 'Send 10 Soft Catch-Up Notes', detail: '"I’m advising a couple of growing businesses on their [Domain] setup. How is your team handling X?"' },
      { day: 6, task: 'Deliver One Free 45-Min Audit', detail: 'Conduct a value-packed audit showing 3 clear improvements they can make immediately.' },
      { day: 7, task: 'Propose a 90-Day Fractional Retainer', detail: 'Offer to guide the implementation for ₹35k/month for 3 months.' }
    ],
    first30Days: [
      { week: 1, focus: 'Offer Packaging & Advisory Deck', deliverables: ['1-page Advisory One-Sheet', 'List of 20 warm network contacts'] },
      { week: 2, focus: 'Warm Conversations & Audits', deliverables: ['6 informal catch-up calls', '2 diagnostic audits delivered'] },
      { week: 3, focus: 'Closing Retainer #1', deliverables: ['Sign 1st client at ₹35k/mo', 'Set up shared Slack channel & weekly cadence'] },
      { week: 4, focus: 'Delivering Early Wins', deliverables: ['Implement 1 high-visibility quick win for client', 'Source second pipeline lead'] }
    ],
    whatToAvoid: [
      { model: 'Low-Fee Hourly Billing', reason: 'Incentivizes burning time instead of delivering high-leverage strategic clarity.' },
      { model: 'Taking on Operational Scut Work', reason: 'You are an advisor/architect, not an offshore data entry assistant.' }
    ],
    mindsetShift: 'Sell your decade of lessons and mistakes, not your manual keyboard hours.'
  },

  corporate_training_program: {
    id: 'corporate_training_program',
    name: 'B2B Corporate Training & Capability Lab',
    tagline: 'High-ticket customized workshops for enterprise teams',
    archetypeId: 'consultant',
    capitalRange: '₹10,000 to ₹25,000',
    timeCommitment: '5 to 10 hours / week',
    businessType: 'Consulting',
    firstTarget: '1 corporate workshop booking at ₹45,000 - ₹75,000 for a half-day session',
    exampleOffer:
      'Practical 4-Hour "AI Tools for Business Analysts" or "Financial Modeling for Non-Finance Managers" intensive workshop.',
    pricingModel: '₹45,000 to ₹90,000 per workshop session (up to 25 attendees)',
    firstCustomerStrategy:
      'Pitch directly to L&D (Learning & Development) or HR heads at mid-sized IT and professional services companies who have allocated annual training budgets.',
    businessModelExplanation:
      'Companies have mandatory L&D budgets that expire if unspent. By offering practical, actionable, hands-on training that solves real skill gaps (e.g. AI workflows, consultative selling, executive communication), you monetize your knowledge in high-ticket single-day bursts.',
    targetCustomerTypes: [
      {
        title: 'Mid-Sized IT & Services Companies',
        description: 'Need to upskill junior developers or business analysts on modern AI tools.'
      },
      {
        title: 'Fast-Growing Corporate Enterprises',
        description: 'Looking to train first-time managers on effective delegation and 1-on-1s.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Pick a High-Demand Skill', detail: 'Choose a skill with immediate ROI: e.g. "Practical AI for Operations" or "Negotiation for Sales".' },
      { day: 2, task: 'Build a 10-Slide Workshop Curriculum', detail: 'Focus on 70% hands-on exercises and case studies, 30% theory.' },
      { day: 3, task: 'Create a 1-Page Workshop Brochure', detail: 'Include learning objectives, syllabus, target audience, and enterprise ROI.' },
      { day: 4, task: 'Map 25 L&D Heads in Your City', detail: 'Filter LinkedIn for "Head of L&D" or "Training Lead" at companies with 200-1000 employees.' },
      { day: 5, task: 'Send Value-First Pitch to 15 Leads', detail: 'Offer a complimentary 30-minute lunch-and-learn preview for their team leads.' },
      { day: 6, task: 'Deliver First Lunch-and-Learn', detail: 'Demonstrate actionable frameworks that wow attendees and earn praise.' },
      { day: 7, task: 'Submit Formal Proposal for Paid Half-Day', detail: 'Propose a comprehensive 4-hour workshop for ₹50,000.' }
    ],
    first30Days: [
      { week: 1, focus: 'Curriculum & Slide Deck Polish', deliverables: ['10-slide master deck', 'Participant workbook PDF'] },
      { week: 2, focus: 'L&D Outreach & Discovery Calls', deliverables: ['Contact 25 corporate training heads', 'Book 2 discovery calls'] },
      { week: 3, focus: 'Pilot Delivery / Lunch & Learn', deliverables: ['Conduct 30-min preview session', 'Gather participant NPS scores'] },
      { week: 4, focus: 'Close First Paid Corporate Contract', deliverables: ['Sign paid workshop agreement', 'Schedule date and send pre-read'] }
    ],
    whatToAvoid: [
      { model: 'Cheap ₹499 Consumer Webinars', reason: 'Exhausting customer support, high refund rates, and razor-thin ad margins.' },
      { model: 'Over-Academic Theory', reason: 'Corporate teams want practical tools they can apply the very next morning.' }
    ],
    mindsetShift: 'Corporate budgets are 100x bigger than consumer wallets for the exact same information.'
  },

  content_ugc_agency: {
    id: 'content_ugc_agency',
    name: 'B2B Content & Short-Form Creative Agency',
    tagline: 'Turn corporate products and services into high-retention video & written assets',
    archetypeId: 'creator',
    capitalRange: '₹15,000 to ₹40,000',
    timeCommitment: '10 to 15 hours / week',
    businessType: 'Agency',
    firstTarget: '3 monthly retainers at ₹35,000 / month',
    exampleOffer:
      '12 high-converting Instagram Reels / LinkedIn video assets per month for D2C brands, fintech apps, or high-end service providers.',
    pricingModel: '₹35,000 - ₹60,000 monthly retainer for 12 scripted & edited video deliverables',
    firstCustomerStrategy:
      'Pick 5 Indian D2C or fintech brands running poorly formatted video ads. Re-script and re-edit one of their clips with an irresistible hook, and DM it to their Head of Growth.',
    businessModelExplanation:
      'Brands are desperately competing on short-form video platforms (Instagram Reels, YouTube Shorts, Meta Ads). They struggle to produce high volumes of authentic, hook-driven content. You manage the scriptwriting, creator coordination/recording, and post-production editing.',
    targetCustomerTypes: [
      {
        title: 'Emerging Indian D2C Brands',
        description: 'Beauty, snacks, fashion, or fitness brands needing fresh ad creatives weekly.'
      },
      {
        title: 'B2B SaaS & Tech Founders',
        description: 'Wanting thought-leadership video snippets cut from their podcast or webinar appearances.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Analyze Top 20 Viral Ad Hooks', detail: 'Study the top performing Meta Ad Library creatives in India right now.' },
      { day: 2, task: 'Define Your Retainer Package', detail: 'Package: 12 videos, scripts included, 48-hour revision turnaround, format-ready.' },
      { day: 3, task: 'Build a 3-Sample Portfolio', detail: 'Create 3 spec videos for real brands showing hook, problem, solution, CTA.' },
      { day: 4, task: 'Identify 25 Ad-Active Brands', detail: 'Use Meta Ad Library to find brands actively spending money on mediocre video creatives.' },
      { day: 5, task: 'Send Free Creative Upgrades', detail: 'Send the re-edited video with: "Loved your product, noticed your hook dropped viewers at second 3; here is a fix."' },
      { day: 6, task: 'Hop on Pitch Call with Growth Lead', detail: 'Show how creative fatigue kills their ROAS and how a monthly retainer solves it.' },
      { day: 7, task: 'Close First Paid Monthly Retainer', detail: 'Sign first brand at ₹35,000/month on a 30-day pilot basis.' }
    ],
    first30Days: [
      { week: 1, focus: 'Creative Portfolio & Offer Standardization', deliverables: ['3 high-impact sample videos', 'Notion client onboarding portal'] },
      { week: 2, focus: 'Targeted Outreach via Instagram & LinkedIn', deliverables: ['25 custom outreach messages sent', '3 discovery calls booked'] },
      { week: 3, focus: 'Deliver Client Batch #1', deliverables: ['Sign 1st client', 'Deliver first batch of 6 edited reels'] },
      { week: 4, focus: 'Performance Review & Client #2', deliverables: ['Review ad metrics with client', 'Secure client #2 from referral or outreach'] }
    ],
    whatToAvoid: [
      { model: 'General Graphic Design Freelancing', reason: 'High competition and easily commoditized compared to performance video.' },
      { model: 'Unlimited Revision Scopes', reason: 'Will trap your evenings in endless font-color change cycles.' }
    ],
    mindsetShift: 'You aren’t selling video editing; you are selling higher ROAS and lower customer acquisition costs.'
  },

  executive_ghostwriting: {
    id: 'executive_ghostwriting',
    name: 'Executive Thought-Leadership Ghostwriting',
    tagline: 'Write high-impact LinkedIn posts and newsletters for busy Indian founders & CXOs',
    archetypeId: 'creator',
    capitalRange: '₹10,000 to ₹20,000',
    timeCommitment: '5 to 10 hours / week',
    businessType: 'Service',
    firstTarget: '2 corporate CXOs or startup founders at ₹30,000 / month each',
    exampleOffer:
      'Turn a 45-minute monthly voice memo into 16 high-reach LinkedIn posts and 2 strategic newsletters.',
    pricingModel: '₹30,000 to ₹50,000 / month per executive',
    firstCustomerStrategy:
      'Find 10 funded founders or VCs who post sporadically on LinkedIn (e.g. 1 post every 3 months). Ghostwrite 2 punchy posts based on their past interviews and send them over: "Loved your podcast; I adapted your key insight into these two posts for you to publish."' ,
    businessModelExplanation:
      'Every CXO in India wants a strong personal brand on LinkedIn for recruiting, fundraising, and inbound customer trust, but they have zero time to sit and write. You conduct one bi-weekly interview, extract their stories, and ghostwrite their entire content schedule.',
    targetCustomerTypes: [
      {
        title: 'Funded Tech Founders (Seed to Series B)',
        description: 'Need strong presence to attract top tier engineering and executive talent.'
      },
      {
        title: 'Managing Partners at VC / Advisory Firms',
        description: 'Need authoritative industry commentary to maintain deal flow.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Study Top LinkedIn Thought Leaders', detail: 'Analyze the structure of top performing executive posts in the Indian startup ecosystem.' },
      { day: 2, task: 'Formulate Content Archetypes', detail: 'Prepare 4 proven post templates: The Vulnerable Lesson, The Counter-Intuitive Truth, The Breakdown, The Playbook.' },
      { day: 3, task: 'Pick 10 Target Founders', detail: 'Identify active founders who recently raised funding or announced major product milestones.' },
      { day: 4, task: 'Draft 2 Sample Posts Per Founder', detail: 'Listen to their podcast interviews or news coverage and write 2 ready-to-post drafts.' },
      { day: 5, task: 'Send Value-First DMs', detail: 'Message them on LinkedIn: "No charge—thought you would like to share this thought with your network today."' },
      { day: 6, task: 'Founder Reaction & Pitch Call', detail: 'When they reply thanking you, pitch the monthly package: "I do this for founders in 45 mins/month."' },
      { day: 7, task: 'Onboard 1st Retainer Client', detail: 'Sign agreement for ₹30,000/mo and conduct the first 45-minute audio brain-dump.' }
    ],
    first30Days: [
      { week: 1, focus: 'Sample Crafting & Outreach', deliverables: ['10 custom sample posts drafted', 'Outreach sent to 10 CXOs'] },
      { week: 2, focus: 'Onboarding First CXO Client', deliverables: ['Contract signed at ₹30k/mo', 'First audio interview conducted'] },
      { week: 3, focus: 'First Content Batch Delivery', deliverables: ['Deliver 8 scheduled LinkedIn posts', 'Client reviews and schedules'] },
      { week: 4, focus: 'Impressions Review & Upsell', deliverables: ['Report 50k+ organic views generated', 'Sign client #2'] }
    ],
    whatToAvoid: [
      { model: 'Writing for Everyone', reason: 'Stick strictly to B2B executives who can easily expense ₹30k from their marketing budgets.' },
      { model: 'Generic AI-Written Fluff', reason: 'Real executive content requires genuine personal stories, not generic motivational quotes.' }
    ],
    mindsetShift: 'Capture their authentic voice; do not invent fictional opinions.'
  },

  managed_operations_agency: {
    id: 'managed_operations_agency',
    name: 'Managed Back-Office Operations & SOP Agency',
    tagline: 'Deliver reliable remote operational teams and SOP execution for growing companies',
    archetypeId: 'operator',
    capitalRange: '₹25,000 to ₹60,000',
    timeCommitment: '15 to 20 hours / week',
    businessType: 'Managed Operations',
    firstTarget: '2 SMB clients at ₹45,000 / month',
    exampleOffer:
      'Dedicated remote operations coordinator managing customer onboarding, vendor invoicing, and weekly KPI reporting.',
    pricingModel: '₹45,000 - ₹75,000 / month per managed operational desk',
    firstCustomerStrategy:
      'Target founders of growing e-commerce or service agencies (15-30 employees) who are personally bogged down in WhatsApp customer support and invoice tracking.',
    businessModelExplanation:
      'Growing businesses inevitably hit operational bottlenecks where the founder becomes a bottleneck. You document their messy processes into clean SOPs (Notion/Loom), place a pre-trained junior operator, and oversee quality assurance so the founder gets their sanity back.',
    targetCustomerTypes: [
      {
        title: 'Scaling D2C / E-commerce Brands',
        description: 'Drowning in NDR (non-delivery reports), courier disputes, and customer return tracking.'
      },
      {
        title: 'Creative & Marketing Agencies',
        description: 'Need project management coordination between freelance designers and demanding corporate clients.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Pick a Painful Operational Workflow', detail: 'Focus on "E-commerce NDR & Courier Reconciliation" or "Agency Client Onboarding SOPs".' },
      { day: 2, task: 'Build a Notion SOP Template', detail: 'Document a step-by-step checklist that eliminates 80% of common operational errors.' },
      { day: 3, task: 'Identify 15 Overwhelmed Founders', detail: 'Look for growing e-com brands or service firms posting complaints about operational chaos.' },
      { day: 4, task: 'Send Diagnostic Operations Audit', detail: '"I’ll review your top 3 daily operational friction points and give you an SOP map for free."' },
      { day: 5, task: 'Conduct 30-Min Operations Call', detail: 'Identify the exact repetitive tasks draining the founder’s time.' },
      { day: 6, task: 'Pitch Managed Service Package', detail: 'Offer to run the workflow end-to-end with daily quality checks for ₹45,000/month.' },
      { day: 7, task: 'Deliver Week-1 SOP Playbook', detail: 'Deploy the systematized SOP and begin handling the process.' }
    ],
    first30Days: [
      { week: 1, focus: 'SOP Standardization & Template Build', deliverables: ['Master Operations Playbook in Notion', 'Target list of 20 founders'] },
      { week: 2, focus: 'Diagnostic Audits & Client Pitching', deliverables: ['3 operations audits conducted', '1 proposal presented'] },
      { week: 3, focus: 'Client Onboarding & Process Handover', deliverables: ['Sign 1st client at ₹45k/mo', 'Full process handover completed'] },
      { week: 4, focus: 'Stabilization & Second Desk Prep', deliverables: ['Zero operational escalations in 7 days', 'Source candidate for desk #2'] }
    ],
    whatToAvoid: [
      { model: 'Unstructured "Virtual Assistant" Work', reason: 'You become a low-rate errand runner instead of an indispensable operational partner.' },
      { model: 'Taking Over Unclear Processes', reason: 'Never agree to manage a process that the client cannot first explain or demonstrate.' }
    ],
    mindsetShift: 'Systems create freedom; you are selling peace of mind to chaotic founders.'
  },

  niche_d2c_brand: {
    id: 'niche_d2c_brand',
    name: 'Niche Specialized D2C Product Brand',
    tagline: 'High-margin, problem-solving physical goods for a specific passionate demographic',
    archetypeId: 'product_entrepreneur',
    capitalRange: '₹1,50,000 to ₹3,50,000',
    timeCommitment: '15 to 20 hours / week',
    businessType: 'Digital Product',
    firstTarget: '50 product orders in month 1 at ₹1,499 average order value',
    exampleOffer:
      'Ergonomic lumbar support & orthopedic desk wellness accessories designed specifically for Indian corporate professionals with 8+ hours of screen time.',
    pricingModel: '₹1,299 to ₹2,499 retail price with 60%+ gross margin',
    firstCustomerStrategy:
      'Pre-sell a pilot batch of 50 units to corporate peers and local co-working spaces with an exclusive launch discount before placing mass factory orders.',
    businessModelExplanation:
      'Instead of competing with generic e-commerce giants, you identify a painful lifestyle problem among corporate desk workers (back pain, posture, desk clutter) and source or custom-manufacture a premium solution with superior branding, packaging, and community trust.',
    targetCustomerTypes: [
      {
        title: 'Desk-Bound Corporate Professionals',
        description: 'Experiencing chronic back/neck pain from 10-hour laptop shifts and seeking real ergonomic relief.'
      },
      {
        title: 'Work-From-Home / Remote Workers',
        description: 'Investing in aesthetic, functional home office desk setups.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Identify 1 High-Margin Niche Product', detail: 'Research ergonomic posture correctors or memory foam desk accessories with 65%+ margin.' },
      { day: 2, task: 'Sample Sourcing from Local Manufacturers', detail: 'Order samples from 3 Indian manufacturers (Delhi/NCR, Surat, or Bengaluru industrial hubs).' },
      { day: 3, task: 'Conduct Blind Quality Testing', detail: 'Have 5 desk-worker friends test samples for 3 days and collect unfiltered ergonomic feedback.' },
      { day: 4, task: 'Design Clean Minimalist Branding', detail: 'Create premium logo, box packaging mockups, and unboxing aesthetic.' },
      { day: 5, task: 'Build High-Converting Shopify Store', detail: '1-product store with clear before/after pain-relief diagrams and doctor endorsements.' },
      { day: 6, task: 'Pre-Launch Pitch to Colleagues', detail: 'Offer exclusive 40% launch discount to 25 office peers to test payment conversion.' },
      { day: 7, task: 'Order First Batch of 50 Units', detail: 'Use pre-order revenue to fund production without risking heavy upfront savings.' }
    ],
    first30Days: [
      { week: 1, focus: 'Sampling & Product Selection', deliverables: ['Approved product sample', 'Supplier manufacturing agreement'] },
      { week: 2, focus: 'Shopify Store & Creative Assets', deliverables: ['Live high-speed Shopify page', '10 lifestyle product photos & reels'] },
      { week: 3, focus: 'Pre-Order Campaign & Meta Ad Testing', deliverables: ['₹10k Meta ad test launched', 'First 25 customer orders captured'] },
      { week: 4, focus: 'Fulfillment & Customer Reviews', deliverables: ['50 orders shipped via Shiprocket', 'Gather 15 5-star photo reviews'] }
    ],
    whatToAvoid: [
      { model: 'Generic Dropshipping Cheap Chinese Trinkets', reason: 'High return-to-origin (RTO) rates, slow shipping, and zero brand equity in India.' },
      { model: 'Ordering 1,000 Units Upfront', reason: 'Never tie up large savings in inventory before testing direct consumer ad conversion.' }
    ],
    mindsetShift: 'Validate demand through pre-orders before committing capital to warehouse inventory.'
  },

  professional_community: {
    id: 'professional_community',
    name: 'Curated B2B Peer Mastermind & Network',
    tagline: 'High-trust, private peer advisory network for ambitious corporate professionals',
    archetypeId: 'community_builder',
    capitalRange: '₹15,000 to ₹35,000',
    timeCommitment: '5 to 10 hours / week',
    businessType: 'Service',
    firstTarget: '20 founding members at ₹2,500 / month (or ₹24,000 / year upfront)',
    exampleOffer:
      'Private mastermind for Indian engineering managers and tech leads making the transition to VP / CTO roles.',
    pricingModel: '₹2,500 / month or ₹24,000 / year (includes monthly guest dinner, peer hot-seats, private WhatsApp group)',
    firstCustomerStrategy:
      'Personally invite 10 respected leaders in your domain to join as "Founding Advisory Fellows" with zero membership fee. Once active, announce 15 curated paid applicant spots.',
    businessModelExplanation:
      'Corporate executives feel isolated at the top and cannot discuss compensation, office politics, or burnout with company colleagues. A vetted, confidential peer circle gives them an honest sounding board and valuable industry connections.',
    targetCustomerTypes: [
      {
        title: 'Mid-to-Senior Engineering Managers',
        description: 'Navigating executive politics, salary benchmarking, and career leaps.'
      },
      {
        title: 'Product Managers & Startup Founders',
        description: 'Seeking unfiltered feedback on metrics, fundraising, and vendor recommendations.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Define Membership Thesis', detail: 'Specify the exact niche: e.g. "Senior Devs Transitioning to First-Time Tech Leads".' },
      { day: 2, task: 'Draft Membership Code of Conduct', detail: 'Strict confidentiality (Chatham House Rule) and zero unsolicited self-promotion.' },
      { day: 3, task: 'Line Up 2 Guest Speakers', detail: 'Invite 2 well-known industry leaders to do a 45-min AMA for your founding cohort.' },
      { day: 4, task: 'Invite 5 Anchor Members', detail: 'Personally call 5 talented peers: "I’m putting together 15 sharp minds for monthly hot-seats."' },
      { day: 5, task: 'Build 1-Page Application Portal', detail: 'Application form asking: "What is your biggest current career hurdle?" to filter quality.' },
      { day: 6, task: 'Host First Kickoff Session on Zoom', detail: 'Facilitate a structured 60-min session where each member shares 1 major challenge.' },
      { day: 7, task: 'Open 10 Paid Founding Member Slots', detail: 'Offer early-bird membership at ₹19,999/year for the next 10 vetted applicants.' }
    ],
    first30Days: [
      { week: 1, focus: 'Cohort Design & Advisory Anchor Recruitment', deliverables: ['Charter document', '5 anchor members confirmed'] },
      { week: 2, focus: 'Application Funnel & Vetting', deliverables: ['25 applications received', '15 screening calls conducted'] },
      { week: 3, focus: 'Inaugural Cohort Launch', deliverables: ['15 paid members onboarded', 'First masterclass with guest speaker delivered'] },
      { week: 4, focus: 'Member Intros & Retention Cadence', deliverables: ['Pair members for 1-on-1 peer chats', 'Schedule next month’s agenda'] }
    ],
    whatToAvoid: [
      { model: 'Free Discord / WhatsApp Groups', reason: 'Becomes a spam channel with zero engagement and zero pricing power.' },
      { model: 'Accepting Everyone Who Applies', reason: 'The value of a community is directly proportional to who you reject.' }
    ],
    mindsetShift: 'You are the curator and host; the members provide the recurring value to each other.'
  },

  boutique_local_services: {
    id: 'boutique_local_services',
    name: 'Managed Boutique Local Service / Franchise Hub',
    tagline: 'Professionalize high-demand city-level services with corporate reliability',
    archetypeId: 'local_entrepreneur',
    capitalRange: '₹2,50,000 to ₹6,000,000',
    timeCommitment: '20+ hours / week',
    businessType: 'Local Niche',
    firstTarget: '30 recurring monthly household or corporate subscribers',
    exampleOffer:
      'Premium specialized pet care & boarding hub or commercial deep-cleaning subscription for corporate offices and premium gated societies.',
    pricingModel: '₹3,500 to ₹12,000 monthly service subscription',
    firstCustomerStrategy:
      'Run localized WhatsApp community campaigns and set up weekend demo kiosks inside 3 high-density residential societies (1000+ flats) in your neighborhood.',
    businessModelExplanation:
      'India’s urban middle class is willing to pay 2x-3x for reliable, hygienic, well-trained local services that guarantee punctual arrival, police-verified staff, and digital payments. You bridge the trust deficit in local fragmented services.',
    targetCustomerTypes: [
      {
        title: 'Affluent Gated Societies & High-Rise Apartments',
        description: 'Dual-income working couples with pets or children needing trustworthy home services.'
      },
      {
        title: 'Boutique Offices & Co-working Centers',
        description: 'Require scheduled deep sanitization and reliable facility management.'
      }
    ],
    first7Days: [
      { day: 1, task: 'Analyze Neighborhood Service Gaps', detail: 'Survey 20 neighbors in your society: "Which local service gives you the biggest headache?"' },
      { day: 2, task: 'Select 1 High-Density Service', detail: 'Focus on specialized pet care, premium upholstery cleaning, or organic home maintenance.' },
      { day: 3, task: 'Source Commercial Equipment & Staff', detail: 'Interview 2 experienced ground supervisors and inspect standard equipment.' },
      { day: 4, task: 'Design Professional Uniforms & ID Cards', detail: 'Trust is visual: clean uniforms, ID tags, and branded checklists create instant authority.' },
      { day: 5, task: 'Obtain Society RWA Approval for Pilot', detail: 'Meet RWA secretary to offer free lobby or club-house deep clean demo.' },
      { day: 6, task: 'Execute Weekend Kiosk Demonstration', detail: 'Show residents live demonstration and collect 15 trial bookings.' },
      { day: 7, task: 'Complete First 5 Paid Customer Services', detail: 'Deliver service with 100% satisfaction check and ask for society WhatsApp share.' }
    ],
    first30Days: [
      { week: 1, focus: 'Market Research & Equipment Sourcing', deliverables: ['Service pricing menu', '2 trained team members hired'] },
      { week: 2, focus: 'Society Partnerships & Kiosks', deliverables: ['Permissions secured in 2 societies', '30 trial leads captured'] },
      { week: 3, focus: 'Delivery & Quality Verification', deliverables: ['Deliver 20 paid jobs', 'Establish digital feedback loop'] },
      { week: 4, focus: 'Subscription Conversions', deliverables: ['Convert 12 one-time clients into monthly retainers', 'Calculate unit economics'] }
    ],
    whatToAvoid: [
      { model: 'Heavy Food & Beverage Restaurant Capex', reason: 'Huge rent burn, perishable waste, and 80%+ failure rate within 12 months.' },
      { model: 'Unvetted Freelance Ground Staff', reason: 'One unprofessional incident destroys your brand trust across the entire residential society.' }
    ],
    mindsetShift: 'Professional hygiene, punctuality, and staff vetting are your real competitive moats.'
  }
};
