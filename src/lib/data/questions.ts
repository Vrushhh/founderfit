import { Question } from '../types';

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 'current_role',
    number: 1,
    question: 'What do you currently do?',
    contextHint: 'Your current domain gives you unfair domain insights you can monetize.',
    options: [
      {
        id: 'it_software',
        label: 'IT / Software',
        subtitle: 'Engineering, QA, DevOps, Tech Support',
        archetypeWeights: { builder: 30, consultant: 10 },
        signalWeights: { builderOrientation: 35, independencePreference: 15 }
      },
      {
        id: 'finance',
        label: 'Finance & Accounts',
        subtitle: 'CA, FP&A, Banking, Audit, Investment',
        archetypeWeights: { consultant: 25, operator: 15 },
        signalWeights: { riskAppetite: -10, incomeAmbition: 15 }
      },
      {
        id: 'sales',
        label: 'Sales & Business Dev',
        subtitle: 'B2B Sales, Account Exec, SDR, Direct Sales',
        archetypeWeights: { seller: 35, community_builder: 10 },
        signalWeights: { salesOrientation: 40, peopleOrientation: 25, riskAppetite: 20 }
      },
      {
        id: 'marketing',
        label: 'Marketing & Growth',
        subtitle: 'Performance Ads, SEO, Brand, Social Media',
        archetypeWeights: { creator: 25, seller: 15, product_entrepreneur: 10 },
        signalWeights: { salesOrientation: 20, builderOrientation: 10 }
      },
      {
        id: 'operations',
        label: 'Operations & Supply Chain',
        subtitle: 'Logistics, Process Ops, Project Management',
        archetypeWeights: { operator: 35, local_entrepreneur: 15 },
        signalWeights: { independencePreference: 10, peopleOrientation: 15 }
      },
      {
        id: 'hr',
        label: 'Human Resources & Talent',
        subtitle: 'Recruitment, HRBP, Training, Employee Relations',
        archetypeWeights: { consultant: 20, seller: 15, community_builder: 15 },
        signalWeights: { peopleOrientation: 35, salesOrientation: 15 }
      },
      {
        id: 'design_creative',
        label: 'Design & Creative',
        subtitle: 'UI/UX, Graphic Design, Copywriting, Video',
        archetypeWeights: { creator: 35, builder: 15 },
        signalWeights: { builderOrientation: 20, independencePreference: 25 }
      },
      {
        id: 'consulting',
        label: 'Consulting & Strategy',
        subtitle: 'Management Consulting, Advisory, Analytics',
        archetypeWeights: { consultant: 35, operator: 10 },
        signalWeights: { incomeAmbition: 20, riskAppetite: 15 }
      },
      {
        id: 'education',
        label: 'Education & EdTech',
        subtitle: 'Teaching, Curriculum, Coaching, Academia',
        archetypeWeights: { consultant: 25, creator: 20, community_builder: 15 },
        signalWeights: { peopleOrientation: 25, riskAppetite: -10 }
      },
      {
        id: 'healthcare',
        label: 'Healthcare & Pharma',
        subtitle: 'Clinical, Medical Services, Bio-tech, Admin',
        archetypeWeights: { local_entrepreneur: 20, consultant: 20 },
        signalWeights: { riskAppetite: -10, capitalReadiness: 10 }
      },
      {
        id: 'other',
        label: 'Other Corporate Field',
        subtitle: 'General Administration, Support, Legal',
        archetypeWeights: { operator: 15, consultant: 15 },
        signalWeights: { independencePreference: 15 }
      }
    ]
  },
  {
    id: 'natural_strengths',
    number: 2,
    question: 'What are you naturally good at?',
    contextHint: 'Where do colleagues or friends naturally come to you for help?',
    options: [
      {
        id: 'selling',
        label: 'Selling',
        subtitle: 'Persuading, pitching, and getting commitments',
        archetypeWeights: { seller: 35 },
        signalWeights: { salesOrientation: 40, riskAppetite: 15 }
      },
      {
        id: 'talking_to_people',
        label: 'Talking to people',
        subtitle: 'Building rapport quickly, active listening',
        archetypeWeights: { community_builder: 25, seller: 20, consultant: 15 },
        signalWeights: { peopleOrientation: 35, salesOrientation: 20 }
      },
      {
        id: 'building_things',
        label: 'Building things',
        subtitle: 'Turning ideas into tangible tools or workflows',
        archetypeWeights: { builder: 40, product_entrepreneur: 15 },
        signalWeights: { builderOrientation: 40, independencePreference: 20 }
      },
      {
        id: 'managing_people',
        label: 'Managing people',
        subtitle: 'Coordinating teams, delegating, resolving conflict',
        archetypeWeights: { operator: 30, community_builder: 20 },
        signalWeights: { peopleOrientation: 30, riskAppetite: 10 }
      },
      {
        id: 'analyzing_numbers',
        label: 'Analyzing numbers',
        subtitle: 'Finding patterns in data, financial models, metrics',
        archetypeWeights: { consultant: 30, builder: 15 },
        signalWeights: { independencePreference: 20, riskAppetite: -10 }
      },
      {
        id: 'creating_content',
        label: 'Creating content',
        subtitle: 'Writing, video editing, storytelling, visuals',
        archetypeWeights: { creator: 40 },
        signalWeights: { builderOrientation: 15, peopleOrientation: 15 }
      },
      {
        id: 'organizing_things',
        label: 'Organizing things',
        subtitle: 'SOPs, project planning, operational efficiency',
        archetypeWeights: { operator: 35, local_entrepreneur: 15 },
        signalWeights: { independencePreference: 10, riskAppetite: -10 }
      },
      {
        id: 'solving_problems',
        label: 'Solving problems',
        subtitle: 'Deconstructing messy challenges into clear solutions',
        archetypeWeights: { builder: 25, consultant: 25 },
        signalWeights: { builderOrientation: 25, riskAppetite: 15 }
      },
      {
        id: 'teaching',
        label: 'Teaching',
        subtitle: 'Explaining complex concepts simply',
        archetypeWeights: { consultant: 30, creator: 20, community_builder: 20 },
        signalWeights: { peopleOrientation: 30, salesOrientation: 10 }
      },
      {
        id: 'negotiating',
        label: 'Negotiating',
        subtitle: 'Closing terms, deal structuring, win-win agreements',
        archetypeWeights: { seller: 30, operator: 15 },
        signalWeights: { salesOrientation: 35, incomeAmbition: 20 }
      }
    ]
  },
  {
    id: 'energizing_work',
    number: 3,
    question: 'What kind of work gives you energy?',
    contextHint: 'What makes hours feel like minutes without leaving you drained?',
    options: [
      {
        id: 'working_independently',
        label: 'Working independently',
        subtitle: 'Headphones on, deep uninterrupted flow',
        archetypeWeights: { builder: 25, consultant: 20, creator: 20 },
        signalWeights: { independencePreference: 40, peopleOrientation: -20 }
      },
      {
        id: 'meeting_people',
        label: 'Meeting people',
        subtitle: 'Hearing stories, networking, in-person discussions',
        archetypeWeights: { community_builder: 30, seller: 20, local_entrepreneur: 15 },
        signalWeights: { peopleOrientation: 40, salesOrientation: 20 }
      },
      {
        id: 'building_things_energy',
        label: 'Building things',
        subtitle: 'Shipping a functioning system, product, or tool',
        archetypeWeights: { builder: 35, product_entrepreneur: 20 },
        signalWeights: { builderOrientation: 35, independencePreference: 20 }
      },
      {
        id: 'finding_customers',
        label: 'Finding customers',
        subtitle: 'The thrill of pitching, overcoming objections, closing',
        archetypeWeights: { seller: 40 },
        signalWeights: { salesOrientation: 40, riskAppetite: 25 }
      },
      {
        id: 'managing_teams',
        label: 'Managing teams',
        subtitle: 'Unblocking others and driving collective execution',
        archetypeWeights: { operator: 35, community_builder: 15 },
        signalWeights: { peopleOrientation: 30, timeAvailability: 10 }
      },
      {
        id: 'creating_something',
        label: 'Creating something',
        subtitle: 'A fresh piece of work, brand, design or writeup',
        archetypeWeights: { creator: 35, product_entrepreneur: 20 },
        signalWeights: { builderOrientation: 20, independencePreference: 20 }
      },
      {
        id: 'researching_analyzing',
        label: 'Researching and analyzing',
        subtitle: 'Diving deep into reports, markets, and mechanics',
        archetypeWeights: { consultant: 35, builder: 15 },
        signalWeights: { independencePreference: 25, salesOrientation: -15 }
      },
      {
        id: 'teaching_others',
        label: 'Teaching others',
        subtitle: 'Mentoring, guiding, unlocking someone else’s skill',
        archetypeWeights: { consultant: 25, community_builder: 25, creator: 15 },
        signalWeights: { peopleOrientation: 30 }
      }
    ]
  },
  {
    id: 'work_frustration',
    number: 4,
    question: 'What frustrates you most about your current job?',
    contextHint: 'The root friction often defines what boundary your business must protect.',
    options: [
      {
        id: 'repetitive_work',
        label: 'Repetitive work',
        subtitle: 'Mind-numbing tasks with zero intellectual spark',
        archetypeWeights: { builder: 20, creator: 20 },
        signalWeights: { builderOrientation: 20 }
      },
      {
        id: 'my_manager',
        label: 'My manager',
        subtitle: 'Micromanagement and endless status updates',
        archetypeWeights: { consultant: 20, builder: 15 },
        signalWeights: { independencePreference: 35 }
      },
      {
        id: 'office_politics',
        label: 'Office politics',
        subtitle: 'Who kissed whose ring instead of actual merit',
        archetypeWeights: { builder: 20, product_entrepreneur: 15 },
        signalWeights: { independencePreference: 30 }
      },
      {
        id: 'low_salary',
        label: 'Low salary',
        subtitle: 'Effort is 10x, but bank account only moves at appraisal rate',
        archetypeWeights: { seller: 25, product_entrepreneur: 20 },
        signalWeights: { incomeAmbition: 35, riskAppetite: 20 }
      },
      {
        id: 'long_hours',
        label: 'Long hours',
        subtitle: 'No life outside the screen and weekend Slack pings',
        archetypeWeights: { consultant: 20, operator: 15 },
        signalWeights: { timeAvailability: -15, independencePreference: 25 }
      },
      {
        id: 'no_autonomy',
        label: 'No autonomy',
        subtitle: 'Cannot make any real decision without 4 approvals',
        archetypeWeights: { builder: 20, seller: 20, creator: 15 },
        signalWeights: { independencePreference: 40 }
      },
      {
        id: 'no_growth',
        label: 'No growth',
        subtitle: 'Hit the ceiling; next 3 years look identical to this year',
        archetypeWeights: { seller: 20, product_entrepreneur: 20, builder: 15 },
        signalWeights: { incomeAmbition: 25, riskAppetite: 15 }
      },
      {
        id: 'not_connected',
        label: "I don't feel connected to the work",
        subtitle: 'If my project vanished tomorrow, nobody would care',
        archetypeWeights: { creator: 25, community_builder: 20, local_entrepreneur: 15 },
        signalWeights: { peopleOrientation: 20 }
      }
    ]
  },
  {
    id: 'starting_capital',
    number: 5,
    question: 'How much money could you realistically put into a business?',
    contextHint: 'Be honest. An initial experiment should never put your rent or EMIs at risk.',
    options: [
      {
        id: 'cap_10k',
        label: '₹10,000',
        subtitle: 'Strictly sweat equity & zero-overhead digital services',
        archetypeWeights: { consultant: 25, creator: 25, seller: 20 },
        signalWeights: { capitalReadiness: 10, riskAppetite: -15 }
      },
      {
        id: 'cap_25k',
        label: '₹25,000',
        subtitle: 'Covers domain, basic software tools, and landing page',
        archetypeWeights: { builder: 20, seller: 25, consultant: 20 },
        signalWeights: { capitalReadiness: 25 }
      },
      {
        id: 'cap_50k',
        label: '₹50,000',
        subtitle: 'Enough for modest outreach tools or pilot inventory test',
        archetypeWeights: { builder: 20, operator: 20, creator: 20 },
        signalWeights: { capitalReadiness: 45, riskAppetite: 10 }
      },
      {
        id: 'cap_1lakh',
        label: '₹1 lakh',
        subtitle: 'Comfortable runway for agency tools, paid ads test, or freelancers',
        archetypeWeights: { operator: 25, product_entrepreneur: 25, community_builder: 20 },
        signalWeights: { capitalReadiness: 70, riskAppetite: 20 }
      },
      {
        id: 'cap_5lakh_plus',
        label: '₹5 lakh+',
        subtitle: 'Can invest in working capital, equipment, or physical setup',
        archetypeWeights: { product_entrepreneur: 35, local_entrepreneur: 35 },
        signalWeights: { capitalReadiness: 95, riskAppetite: 30 }
      }
    ]
  },
  {
    id: 'weekly_time',
    number: 6,
    question: 'How much time could you give it initially?',
    contextHint: 'While keeping your day job. Consistency beats burn-out weekend sprints.',
    options: [
      {
        id: 'time_5h',
        label: '5 hours per week',
        subtitle: '~45 mins on weekdays or 1 focused Saturday morning',
        archetypeWeights: { consultant: 30, creator: 20 },
        signalWeights: { timeAvailability: 15, riskAppetite: -10 }
      },
      {
        id: 'time_10h',
        label: '10 hours per week',
        subtitle: '1-1.5 hours in the evening and part of the weekend',
        archetypeWeights: { builder: 25, seller: 25, consultant: 20 },
        signalWeights: { timeAvailability: 40 }
      },
      {
        id: 'time_20h',
        label: '20 hours per week',
        subtitle: 'Disciplined early mornings, evenings, and full weekend half-days',
        archetypeWeights: { builder: 25, operator: 25, seller: 20 },
        signalWeights: { timeAvailability: 75, riskAppetite: 15 }
      },
      {
        id: 'time_fulltime',
        label: 'Almost full time',
        subtitle: 'Have flexible shifts, sabbatical, or prepared for intensive build',
        archetypeWeights: { operator: 25, local_entrepreneur: 25, product_entrepreneur: 25 },
        signalWeights: { timeAvailability: 95, riskAppetite: 30 }
      }
    ]
  },
  {
    id: 'sales_comfort',
    number: 7,
    question: 'How comfortable are you with selling?',
    contextHint: 'Every business needs revenue, but the sales mechanism can vary wildly.',
    options: [
      {
        id: 'hate_selling',
        label: 'I hate selling',
        subtitle: 'Prefer inbound demand, automated checkouts, or purely referral-driven',
        archetypeWeights: { builder: 30, creator: 20 },
        signalWeights: { salesOrientation: 5, independencePreference: 25 }
      },
      {
        id: 'can_learn',
        label: 'I can learn',
        subtitle: 'Not natural yet, but ready to follow a proven script or framework',
        archetypeWeights: { consultant: 25, operator: 25, builder: 15 },
        signalWeights: { salesOrientation: 35, riskAppetite: 10 }
      },
      {
        id: 'comfortable',
        label: 'I am comfortable',
        subtitle: 'Fine hopping on Zoom calls and demonstrating value to buyers',
        archetypeWeights: { seller: 30, consultant: 25, community_builder: 20 },
        signalWeights: { salesOrientation: 70, peopleOrientation: 25 }
      },
      {
        id: 'enjoy_selling',
        label: 'I enjoy selling',
        subtitle: 'Get a genuine rush from prospecting, objection handling & closing deals',
        archetypeWeights: { seller: 40 },
        signalWeights: { salesOrientation: 95, peopleOrientation: 30, riskAppetite: 20 }
      }
    ]
  },
  {
    id: 'attractive_model',
    number: 8,
    question: 'What kind of business sounds most attractive?',
    contextHint: 'Where does your gut lean when you imagine running it day-to-day?',
    options: [
      {
        id: 'model_online',
        label: 'Online business',
        subtitle: 'Location independent, laptop only, digital delivery',
        archetypeWeights: { builder: 25, creator: 20, consultant: 20 },
        signalWeights: { independencePreference: 30 }
      },
      {
        id: 'model_local',
        label: 'Local business',
        subtitle: 'Physical presence in my city, tangible community impact',
        archetypeWeights: { local_entrepreneur: 45, operator: 20 },
        signalWeights: { peopleOrientation: 25 }
      },
      {
        id: 'model_service',
        label: 'Service business',
        subtitle: 'Trading specialized skill or execution for clear client fees',
        archetypeWeights: { consultant: 30, operator: 25, seller: 20 },
        signalWeights: { riskAppetite: -10 }
      },
      {
        id: 'model_product',
        label: 'Product business',
        subtitle: 'Physical or packaged goods with brand differentiation',
        archetypeWeights: { product_entrepreneur: 45 },
        signalWeights: { builderOrientation: 20, riskAppetite: 20 }
      },
      {
        id: 'model_agency',
        label: 'Agency',
        subtitle: 'B2B team delivering high-ticket outcomes (leads, code, content)',
        archetypeWeights: { seller: 30, operator: 25, creator: 20 },
        signalWeights: { salesOrientation: 25, incomeAmbition: 20 }
      },
      {
        id: 'model_content',
        label: 'Content business',
        subtitle: 'Newsletter, audience, courses, sponsored media, UGC',
        archetypeWeights: { creator: 45, community_builder: 20 },
        signalWeights: { builderOrientation: 15, independencePreference: 25 }
      },
      {
        id: 'model_technology',
        label: 'Technology',
        subtitle: 'Software tools, AI automation workflows, SaaS platform',
        archetypeWeights: { builder: 45 },
        signalWeights: { builderOrientation: 45, riskAppetite: 15 }
      },
      {
        id: 'model_dont_know',
        label: "I don't know yet",
        subtitle: 'Open to whichever model mathematically fits my constraints best',
        archetypeWeights: { consultant: 15, seller: 15, operator: 15 },
        signalWeights: { riskAppetite: 0 }
      }
    ]
  },
  {
    id: 'target_income',
    number: 9,
    question: 'What monthly income would make you seriously consider leaving your job?',
    contextHint: 'The benchmark where business cashflow reliably replaces your corporate salary.',
    options: [
      {
        id: 'inc_30k',
        label: '₹30,000 / month',
        subtitle: 'A meaningful side safety cushion to start testing freedom',
        archetypeWeights: { creator: 20, consultant: 20 },
        signalWeights: { incomeAmbition: 20, riskAppetite: -15 }
      },
      {
        id: 'inc_50k',
        label: '₹50,000 / month',
        subtitle: 'Replaces junior/mid-level expenses in most Indian cities',
        archetypeWeights: { consultant: 25, creator: 20, seller: 15 },
        signalWeights: { incomeAmbition: 40 }
      },
      {
        id: 'inc_1lakh',
        label: '₹1 lakh / month',
        subtitle: 'The gold standard milestone: true financial independence base',
        archetypeWeights: { seller: 25, builder: 25, operator: 20 },
        signalWeights: { incomeAmbition: 65, riskAppetite: 15 }
      },
      {
        id: 'inc_2lakh',
        label: '₹2 lakh / month',
        subtitle: 'Matches senior IT/Corporate salary with high savings potential',
        archetypeWeights: { seller: 30, builder: 25, product_entrepreneur: 20 },
        signalWeights: { incomeAmbition: 85, riskAppetite: 25 }
      },
      {
        id: 'inc_5lakh_plus',
        label: '₹5 lakh+ / month',
        subtitle: 'Wealth-building scale requiring agency leverage or products',
        archetypeWeights: { product_entrepreneur: 30, seller: 30, builder: 25 },
        signalWeights: { incomeAmbition: 100, riskAppetite: 35 }
      }
    ]
  },
  {
    id: 'core_motivation',
    number: 10,
    question: 'What matters most to you right now?',
    contextHint: 'The real emotional driver behind starting something of your own.',
    options: [
      {
        id: 'freedom',
        label: 'Freedom & Control',
        subtitle: 'Controlling my own calendar, work location, and daily hours',
        archetypeWeights: { consultant: 25, creator: 25, builder: 20 },
        signalWeights: { independencePreference: 40 }
      },
      {
        id: 'money',
        label: 'Uncapped Income',
        subtitle: 'Breaking out of the 8-12% annual corporate increment cycle',
        archetypeWeights: { seller: 35, product_entrepreneur: 25 },
        signalWeights: { incomeAmbition: 40, riskAppetite: 20 }
      },
      {
        id: 'meaningful_work',
        label: 'Meaningful work',
        subtitle: 'Working on problems I actually care about with visible direct impact',
        archetypeWeights: { community_builder: 25, creator: 20, consultant: 20 },
        signalWeights: { peopleOrientation: 25 }
      },
      {
        id: 'status',
        label: 'Professional status',
        subtitle: 'Being known as a founder, owner, or recognized domain specialist',
        archetypeWeights: { product_entrepreneur: 25, community_builder: 20, seller: 20 },
        signalWeights: { incomeAmbition: 25, riskAppetite: 20 }
      },
      {
        id: 'building_own',
        label: 'Building something of my own',
        subtitle: 'Creating an asset that compounds in value rather than building someone else’s dream',
        archetypeWeights: { builder: 35, product_entrepreneur: 25 },
        signalWeights: { builderOrientation: 35, independencePreference: 25 }
      },
      {
        id: 'leaving_corporate',
        label: 'Leaving corporate life',
        subtitle: 'Escaping office politics, redundant meetings, and performance appraisal anxiety',
        archetypeWeights: { consultant: 25, operator: 20, seller: 20 },
        signalWeights: { independencePreference: 35, riskAppetite: 15 }
      }
    ]
  }
];
