/* Single source of truth for the outcomes board, the experience section and the
   stack map. Mirrors the CV: one freelance practice with its clients, then the
   full-time roles that came before it. */

/* Headline results, shown first. `metric` is the big figure on the card. */
export const OUTCOMES = [
  {
    id: 'onboarding',
    metric: '4 mo → 30 min',
    title: 'Client onboarding became a configuration task',
    body:
      'Designed a multi-tenant React application framework that turned each new client from a four-month project into a half-hour of configuration.',
    client: 'Mehrwerk',
    role: 'Frontend Lead · team of 5',
    tags: ['React', 'Next.js', 'Ionic', 'GraphQL']
  },
  {
    id: 'basket',
    metric: '+5%',
    title: 'Mobile add-to-basket rate, shipped to 100% of traffic',
    body:
      'Owned the add-to-basket CTA experiment end to end — SSR variant for multi-size products, size selection, captcha retry, a11y, Cypress E2E. The winning variant lifted the rate by 5% (relative).',
    client: 'ABOUT YOU',
    role: '40M+ MAU e-commerce',
    tags: ['React', 'TypeScript', 'SSR', 'Cypress']
  },
  {
    id: 'experiments',
    metric: 'Weeks → same day',
    title: 'Frontend removed from the A/B experiment critical path',
    body:
      'Replaced per-experiment feature flags with prefix-based activation, so new experiments launch with no frontend release. Enables ~6 experiments a month across the growth and recommendation teams.',
    client: 'ABOUT YOU',
    role: '40M+ MAU e-commerce',
    tags: ['React', 'TypeScript', 'A/B testing']
  },
  {
    id: 'markets',
    metric: '90+ markets',
    title: 'One dealer search, two automotive brands',
    body:
      'A white-label Dealer Search built for Volkswagen, then integrated into Audi as a micro-frontend rather than a fork. Live on Audi.de across more than ninety markets.',
    client: 'Accenture · VW / Audi',
    role: 'Senior React Developer',
    tags: ['React', 'TypeScript', 'Micro-frontends', 'Webpack']
  },
  {
    id: 'editor',
    metric: '1M+ MAU',
    title: 'Content updates without a developer in the loop',
    body:
      'Built a UI Editor that lets non-technical editors publish content changes to web and native apps in real time, for a platform with 1M+ monthly active users.',
    client: 'Mehrwerk',
    role: 'Frontend Lead · team of 5',
    tags: ['React', 'React Native', 'GraphQL', 'MongoDB']
  },
  {
    id: 'icons',
    metric: '~120 icons',
    title: 'Web/native icon gap closed in a single release',
    body:
      'Automated the migration of the shared icon set to the new icon system (Node.js, Figma REST API, PNG → SVG) — one regression-verified release, no changes for product teams.',
    client: 'ABOUT YOU',
    role: '40M+ MAU e-commerce',
    tags: ['Node.js', 'Figma REST API', 'Monorepo']
  }
];

/* The freelance practice: one continuous line on the CV. Clients carry no dates
   on purpose — the practice does. Order is by weight, not chronology. */
export const PRACTICE = {
  id: 'freelance',
  title: 'Freelance Senior Frontend / Full-Stack Engineer',
  kind: 'Freelancer / IT contractor',
  place: 'Remote, Germany',
  start: '2019-09',              // "YYYY-MM", always
  end: null,                     // null while the practice is running
  summary:
    'Multi-year and repeat engagements for German and international product companies.',
  clients: [
    {
      id: 'aboutyou',
      company: 'ABOUT YOU SE & Co. KG',
      tagline: 'E-commerce, 40M+ MAU',
      role: 'Senior Frontend Engineer',
      site: 'aboutyou.de',
      url: 'https://aboutyou.de',
      bullets: [
        'Removed frontend from the A/B experiment critical path: replaced per-experiment feature flags with prefix-based activation, so new experiments launch with no frontend release — lead time down from days–weeks (ticket, sprint, deploy) to same-day self-serve. Enables ~6 experiments/month across the growth and recommendation teams.',
        'Owned the mobile add-to-basket CTA experiment end to end: SSR variant for multi-size products, size selection, captcha retry, a11y, Cypress E2E. Winning variant lifted mobile add-to-basket rate by 5% (relative), shipped to 100% of traffic.',
        'Delivered the loyalty Status Program end to end into the Coins wallet — gRPC integration, deep-linked entry points for campaigns, mobile and desktop — from API contract to 100% production rollout. Storybook and integration coverage across every tier and error state.',
        'Closed the web/native icon gap: automated migration of ~120 shared icons to the new icon system (Node.js, Figma REST API, PNG → SVG) in a single regression-verified release, no changes for product teams.'
      ],
      stack: [
        'React', 'TypeScript', 'Linaria', 'gRPC', 'Monorepo (Yarn workspaces)', 'Node.js',
        'Storybook', 'Jest', 'RTL', 'Cypress', 'GitLab CI', 'Datadog'
      ]
    },
    {
      id: 'mehrwerk',
      company: 'Mehrwerk GmbH',
      tagline: 'B2B2C loyalty & content platform, 1M+ MAU',
      role: 'Frontend Lead · team of 5',
      site: 'mehrwerk.de',
      url: 'https://mehrwerk.de',
      bullets: [
        'Owned the platform architecture: designed a multi-tenant React application framework that cut client onboarding from ~4 months to 30 minutes, turning each new client into a configuration task instead of a project.',
        'Built a UI Editor that let non-technical editors publish content changes to web and native apps in real time, removing developer involvement from content updates for 1M+ monthly active users.',
        'Designed and owned the k6/Grafana Cloud load-testing suite (smoke, stress, soak, spike) for SSR and GraphQL services, giving every release a measured capacity limit before it hit production.',
        'Led the WCAG accessibility migration across web and native apps — audit, remediation standards, implementation — bringing the platform to compliance required by enterprise clients.'
      ],
      stack: [
        'TypeScript', 'React', 'Vue 2/3', 'Ionic', 'React Native', 'Next.js', 'Node.js',
        'Kotlin', 'GraphQL', 'MongoDB', 'Jest', 'Cypress', 'AWS', 'k6'
      ]
    },
    {
      id: 'selectcode',
      company: 'SelectCode GmbH',
      tagline: 'meinGPT, enterprise AI platform',
      role: 'Fullstack Developer',
      site: 'meingpt.com',
      url: 'https://meingpt.com',
      bullets: [
        'Built collaborative features — shared AI assistants and chat workflows — for a privacy-focused RAG platform with multi-LLM support (React, Zustand).',
        'Implemented secure tRPC/Prisma endpoints for organisation hierarchies, RBAC (Lucia Auth) and Stripe subscriptions — the billing and permission layer enterprise customers are sold on.'
      ],
      stack: [
        'TypeScript', 'React', 'NestJS', 'tRPC', 'Prisma', 'PostgreSQL',
        'Playwright', 'RAG', 'OpenAI API', 'Kubernetes'
      ]
    },
    {
      id: 'ebay',
      company: 'eBay GmbH (Adevinta)',
      tagline: 'Kijiji Autos, Canada’s largest auto marketplace',
      role: 'Senior React Developer · dealer retail team',
      site: 'kijijiautos.ca',
      url: 'https://kijijiautos.ca',
      bullets: [
        'Delivered React features across the dealer-facing product surface used by Canadian car dealers to manage and sell inventory.'
      ],
      stack: ['React', 'TypeScript', 'Jest', 'TestCafe', 'AWS']
    },
    {
      id: 'accenture',
      company: 'Accenture',
      tagline: 'Automotive clients — VW, Audi, smart / Daimler',
      role: 'Senior React Developer',
      site: null,
      url: null,
      bullets: [
        'Implemented a white-label Dealer Search app for VW and integrated it into Audi via micro-frontends — live on Audi.de across 90+ markets.',
        'Built the smart IAA landing page with immersive animated React components for the brand’s future product reveal.'
      ],
      stack: ['React', 'TypeScript', 'Styled Components', 'Webpack', 'AEM', 'Jest']
    },
    {
      id: 'factoreleven',
      company: 'Factor Eleven',
      tagline: 'Ad-tech',
      role: 'Senior React Developer',
      site: 'factor-eleven.de',
      url: 'https://factor-eleven.de',
      bullets: [
        'Architected the React-based AdManager application and a shared UI library reused across the company’s products, so new features were built once and shipped everywhere.'
      ],
      stack: [
        'React', 'GraphQL', 'Apollo', 'Jest', 'Enzyme', 'Cypress',
        'SASS', 'CSS Modules', 'Webpack', 'GitLab'
      ]
    },
    {
      id: 'lemon',
      company: 'lemon.markets',
      tagline: 'Fintech',
      role: 'Senior React Developer',
      site: 'lemon.markets',
      url: 'https://lemon.markets',
      bullets: [
        'Built Prismic-powered Blog and CMS pages in Next.js, letting the marketing team publish without engineering support.'
      ],
      stack: ['React', 'Next.js', 'TypeScript', 'Prismic']
    },
    {
      id: 'tooltime',
      company: 'ToolTime',
      tagline: 'Field-service SaaS',
      role: 'Senior React Developer',
      site: 'tooltime.de',
      url: 'https://tooltime.de',
      bullets: [
        'Designed and implemented a React/GraphQL field-service management application for tradespeople.'
      ],
      stack: ['TypeScript', 'React', 'GraphQL', 'Apollo', 'Jest', 'Cypress', 'CircleCI', 'AWS']
    }
  ]
};

/* Full-time roles before the practice. Newest first; these keep their dates. */
export const EMPLOYMENT = [
  {
    id: 'careem',
    company: 'Careem (acquired by Uber)',
    tagline: 'Ride-hailing & delivery super-app',
    role: 'Senior Software Developer',
    kind: 'Full-time',
    place: 'Berlin',
    site: 'careem.com',
    url: 'https://careem.com',
    start: '2018-06',
    end: '2019-08',
    bullets: [
      'Led frontend architecture for the corporate-customers product and maintained the shared Web UI library used across the Careem ecosystem.',
      'Contributed to last-mile delivery and CareemNow (food delivery) on a platform handling 380M+ requests a day for 10M+ monthly active users; Scrum master for a team of 6.'
    ],
    stack: [
      'React', 'React Native', 'Redux', 'Saga', 'TypeScript', 'Jest', 'Cypress',
      'Kotlin', 'Scala', 'MySQL', 'AWS', 'Docker', 'Jenkins'
    ]
  },
  {
    id: 'circula',
    company: 'Circula GmbH',
    tagline: 'Expense management',
    role: 'Frontend Developer',
    kind: 'Full-time',
    place: 'Berlin',
    site: 'circula.com',
    url: 'https://circula.com',
    start: '2017-11',
    end: '2018-05',
    bullets: [
      'Built expense-management tools for accountants and supervisors (React, Redux, Ruby on Rails).'
    ],
    stack: ['React', 'Redux', 'Ruby on Rails', 'RSpec', 'Docker']
  },
  {
    id: 'mesmo',
    company: 'Mes.mo GmbH / Gastroguide',
    tagline: 'Restaurant SaaS',
    role: 'Full Stack Developer',
    kind: 'Full-time',
    place: 'Stuttgart',
    site: 'gastroguide.de',
    url: 'https://gastroguide.de',
    start: '2015-01',
    end: '2017-10',
    bullets: [
      'Architected the restaurant platform: reservation system, website constructor, advertising system, form/menu builders and REST API for mobile apps. 15 restaurants on the platform.'
    ],
    stack: ['React', 'Redux', 'Flux', 'PHP', 'MySQL', 'AWS']
  },
  {
    id: 'ukeess',
    company: 'UKEESS',
    tagline: 'E-commerce agency',
    role: 'Full Stack Developer',
    kind: 'Full-time',
    place: 'Lviv, Ukraine',
    site: null,
    url: null,
    start: '2014-04',
    end: '2014-12',
    bullets: ['Developed and maintained Magento plugins for e-commerce clients (PHP).'],
    stack: ['Magento', 'PHP']
  }
];

/* Everything with a `stack` — what the stack chips match against. */
export const ROLES = [...PRACTICE.clients, ...EMPLOYMENT];

/* Skill groups mirror the CV. `SKILL_ALIASES` let a chip match stack entries
   that are named differently on individual roles. */
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
    items: ['NestJS', 'tRPC', 'GraphQL', 'gRPC', 'Prisma', 'PostgreSQL', 'MongoDB']
  },
  {
    label: 'Testing',
    items: ['Jest', 'Cypress', 'Playwright', 'Storybook', 'k6']
  },
  {
    label: 'Infra',
    items: ['AWS', 'Docker', 'CI/CD', 'Kubernetes', 'GitLab CI', 'Datadog']
  },
  {
    label: 'AI / LLM',
    items: ['RAG', 'OpenAI API', 'LLM Integration']
  }
];

export const SKILL_ALIASES = {
  'CI/CD': ['GitLab CI', 'CircleCI', 'Jenkins', 'GitLab'],
  'GitLab CI': ['GitLab CI', 'GitLab'],
  'LLM Integration': ['OpenAI API', 'RAG'],
  'Node.js': ['Node.js', 'NestJS']
};
