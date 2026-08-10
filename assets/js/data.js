/* Single source of truth for the ledger, the concurrency curve and the stack map. */

export const TIMELINE_START = '2014-01';
export const TIMELINE_END = '2026-12';

export const ENGAGEMENTS = [
  {
    id: 'aboutyou',
    company: 'ABOUT YOU',
    role: 'Frontend Engineer',
    kind: 'Contract',
    place: 'Remote',
    site: 'aboutyou.de',
    url: 'https://aboutyou.de',
    start: '2026-06',
    end: null,
    featured: true,
    summary:
      'Customer-facing features in a large-scale React/TypeScript e-commerce monorepo powering the mobile and desktop web shops, with a gRPC data layer and container/presentational package architecture.',
    bullets: [
      'Built and hardened the "Coins" loyalty wallet — bonus display updates, a faster coin-redemption animation and the missions modal. Removed UI flickering and fixed the content_view analytics event to fire exactly once.',
      'Checkout and pricing: migrated the coupon sticky bar to the Price Overhaul v2 pricing model and corrected the express-checkout flag to read from SCAYLE commerce-engine state.',
      'Shipped with Storybook stories, Jest/RTL tests, Cypress E2E coverage and WCAG 2.1 AA accessibility. Authored the team’s git-worktree parallel-branch workflow guide.'
    ],
    stack: [
      'React', 'TypeScript', 'Monorepo (Yarn workspaces)', 'Linaria', 'React Query',
      'Zustand', 'gRPC', 'Storybook', 'Jest', 'RTL', 'Cypress', 'GitLab CI', 'SCAYLE'
    ]
  },
  {
    id: 'selectcode',
    company: 'SelectCode GmbH',
    role: 'Fullstack Developer',
    kind: 'Contract',
    place: 'Remote',
    site: 'meingpt.com',
    url: 'https://meingpt.com',
    start: '2025-12',
    end: '2026-04',
    featured: true,
    summary:
      'An enterprise-grade, privacy-focused AI platform with RAG capabilities and multi-LLM support.',
    bullets: [
      'Developed collaborative features — shared AI assistants and chat workflows — in React and Zustand.',
      'Implemented secure TRPC/Prisma endpoints covering organization hierarchies, RBAC via Lucia Auth, and Stripe subscriptions.'
    ],
    stack: [
      'TypeScript', 'React', 'NestJS', 'TRPC', 'Prisma', 'PostgreSQL',
      'Playwright', 'RAG', 'OpenAI API', 'Kubernetes'
    ]
  },
  {
    id: 'mehrwerk',
    company: 'Mehrwerk GmbH',
    role: 'Frontend Lead',
    kind: 'Contract',
    place: 'Remote',
    site: 'mehrwerk.de',
    url: 'https://mehrwerk.de',
    start: '2021-09',
    end: '2025-12',
    featured: true,
    summary:
      'Four years leading frontend for a loyalty and benefits platform, run alongside parallel contracts.',
    bullets: [
      'Led a team of 5 and architected a scalable React application framework that cut client onboarding from 4 months to 30 minutes.',
      'Built a UI Editor for real-time content updates across web and native, serving 1M+ monthly active users.',
      'Designed and owned the full load-testing suite — smoke, stress, soak and spike — for SSR and GraphQL services using k6 and Grafana Cloud.'
    ],
    stack: [
      'TypeScript', 'React', 'Ionic', 'React Native', 'Next.js', 'Node.js',
      'Kotlin', 'GraphQL', 'MongoDB', 'Jest', 'Cypress', 'AWS', 'k6'
    ]
  },
  {
    id: 'ebay',
    company: 'eBay GmbH (Adevinta)',
    role: 'Senior React Developer',
    kind: 'Contract',
    place: 'Remote',
    site: 'kijijiautos.ca',
    url: 'https://kijijiautos.ca',
    start: '2022-02',
    end: '2022-12',
    featured: true,
    summary:
      'Dealer retail team on Kijiji Autos, Canada’s largest online auto platform.',
    bullets: [
      'Delivered React features across the dealer-facing product surface.'
    ],
    stack: ['React', 'TypeScript', 'ESLint', 'Jest', 'TestCafe', 'AWS']
  },
  {
    id: 'smart',
    company: 'Accenture · smart / Daimler',
    role: 'Senior React Developer',
    kind: 'Contract',
    place: 'Remote',
    site: 'future.smart.com',
    url: 'https://future.smart.com',
    start: '2021-05',
    end: '2022-01',
    featured: true,
    summary:
      'The smart IAA landing page for the brand’s future product reveal.',
    bullets: [
      'Implemented immersive, animated React components for a high-traffic automotive brand launch.'
    ],
    stack: ['React', 'TypeScript', 'Styled Components', 'Webpack', 'AEM', 'Jest']
  },
  {
    id: 'lemon',
    company: 'lemon.markets GmbH',
    role: 'Senior React Developer',
    kind: 'Contract',
    place: 'Remote',
    site: 'lemon.markets',
    url: 'https://lemon.markets',
    start: '2021-06',
    end: '2021-09',
    summary: 'Blog and CMS surfaces for a fintech brokerage API product.',
    bullets: ['Built custom Prismic-powered slices for Blog and CMS pages.'],
    stack: ['React', 'Next.js', 'TypeScript', 'Prismic', 'ESLint', 'Jest']
  },
  {
    id: 'vw',
    company: 'Accenture · VW / Audi',
    role: 'Senior React Developer',
    kind: 'Contract',
    place: 'Remote',
    site: null,
    url: null,
    start: '2020-11',
    end: '2021-05',
    featured: true,
    summary: 'White Label Dealer Search, shipped across two automotive brands.',
    bullets: [
      'Implemented a White Label Dealer Search app for VW and integrated it into Audi using a micro-frontend approach, supporting Audi.de across 90+ markets.'
    ],
    stack: ['React', 'TypeScript', 'Styled Components', 'Webpack', 'Jest']
  },
  {
    id: 'factoreleven',
    company: 'Factor Eleven',
    role: 'Senior React Developer',
    kind: 'Contract',
    place: 'Remote',
    site: 'factor-eleven.de',
    url: 'https://factor-eleven.de',
    start: '2019-09',
    end: '2021-05',
    summary: 'AdManager platform and the component ecosystem around it.',
    bullets: [
      'Architected and implemented a React-based AdManager application and component ecosystem.',
      'Built a shared UI library reused across multiple projects for consistency.'
    ],
    stack: [
      'React', 'GraphQL', 'Apollo', 'Jest', 'Enzyme', 'Cypress',
      'SASS', 'CSS Modules', 'Webpack', 'GitLab'
    ]
  },
  {
    id: 'tooltime',
    company: 'ToolTime',
    role: 'Senior React Developer',
    kind: 'Contract',
    place: 'Berlin',
    site: 'tooltime.de',
    url: 'https://tooltime.de',
    start: '2020-02',
    end: '2020-03',
    summary: 'Field service management for tradespeople.',
    bullets: ['Designed and implemented a React-based field service management application.'],
    stack: ['TypeScript', 'React', 'GraphQL', 'Apollo', 'Jest', 'Cypress', 'CircleCI', 'AWS']
  },
  {
    id: 'careem',
    company: 'Careem',
    role: 'Senior Software Developer',
    kind: 'Full-time',
    place: 'Berlin',
    site: 'careem.com',
    url: 'https://careem.com',
    start: '2018-06',
    end: '2019-08',
    featured: true,
    summary: 'Corporate customers department at the Middle East’s largest ride-hailing platform.',
    bullets: [
      'Built React components and led architectural decisions for the corporate customers department.',
      'Maintained a shared Web UI library used across the Careem ecosystem.',
      'Contributed to LMD (last-mile delivery) and CareemNow (food delivery). Scrum master for a team of 6.'
    ],
    stack: [
      'React', 'React Native', 'Redux', 'Saga', 'TypeScript', 'Jest', 'Cypress',
      'Webpack', 'Kotlin', 'Scala', 'MySQL', 'AWS', 'Docker', 'Jenkins'
    ]
  },
  {
    id: 'circula',
    company: 'Circula GmbH',
    role: 'Frontend Developer',
    kind: 'Full-time',
    place: 'Berlin',
    site: 'circula.com',
    url: 'https://circula.com',
    start: '2017-11',
    end: '2018-05',
    summary: 'Expense management for accountants and supervisors.',
    bullets: ['Built expense management tools for accountants and supervisors.'],
    stack: ['React', 'Redux', 'Ruby on Rails', 'RSpec', 'Docker']
  },
  {
    id: 'mesmo',
    company: 'Mes.mo GmbH / Gastroguide',
    role: 'Full Stack Developer',
    kind: 'Full-time',
    place: 'Stuttgart',
    site: 'gastroguide.de',
    url: 'https://gastroguide.de',
    start: '2015-01',
    end: '2017-10',
    summary: 'Seven products for restaurants, built end to end.',
    bullets: [
      'Architected a reservation system, website constructor, advertising system, file manager, form builder, menu builder and a REST API for mobile apps.'
    ],
    stack: ['React', 'Redux', 'Flux', 'PHP', 'MySQL', 'AWS']
  },
  {
    id: 'ukeess',
    company: 'UKEESS',
    role: 'Full Stack Developer',
    kind: 'Full-time',
    place: 'Lviv, UA',
    site: 'cma.ua',
    url: 'https://cma.ua',
    start: '2014-04',
    end: '2014-12',
    summary: 'Where it started — e-commerce plugin work.',
    bullets: ['Developed and maintained Magento plugins for e-commerce clients.'],
    stack: ['Magento', 'PHP']
  }
];

/* Skill groups mirror the CV. `aliases` let a chip match stack entries that
   are named differently on individual engagements. */
export const SKILL_GROUPS = [
  {
    label: 'Core',
    items: ['React', 'TypeScript', 'Next.js', 'Node.js']
  },
  {
    label: 'Mobile',
    items: ['Ionic', 'React Native']
  },
  {
    label: 'Backend',
    items: ['NestJS', 'TRPC', 'GraphQL', 'Prisma', 'PostgreSQL', 'MongoDB']
  },
  {
    label: 'Testing',
    items: ['Jest', 'Cypress', 'Playwright', 'k6']
  },
  {
    label: 'Infra',
    items: ['AWS', 'Docker', 'CI/CD', 'Kubernetes']
  },
  {
    label: 'AI / LLM',
    items: ['RAG', 'OpenAI API', 'LLM integration']
  }
];

export const SKILL_ALIASES = {
  'CI/CD': ['GitLab CI', 'CircleCI', 'Jenkins', 'GitLab'],
  'LLM integration': ['OpenAI API', 'RAG'],
  'Node.js': ['Node.js', 'NestJS']
};
