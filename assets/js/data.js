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
    metric: 'days–weeks → same day',
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
    id: 'metering',
    metric: '20k+ users',
    title: 'Token metering became usage limits and a paid add-on',
    body:
      'An enterprise AI platform used by ~50 companies and 20k+ users had no view of what its LLM '
      + 'calls cost. I shipped token-usage metering across a multi-provider platform (OpenAI, Gemini, '
      + 'Anthropic, Azure) — a Prisma data model, a tRPC service and AI-middleware hooks capturing '
      + 'provider-reported and estimated tokens, including failed and rate-limited calls. It became the '
      + 'basis for per-company usage limits and a new revenue stream from paid extra tokens, purchasable '
      + 'through a Shopify integration I built.',
    client: 'SelectCode · meinGPT',
    role: 'Enterprise AI platform, ~50 companies',
    tags: ['tRPC', 'Prisma', 'Vercel AI SDK', 'Multi-LLM']
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
      highlights: [
        'Delivered the loyalty Status Program end to end into the Coins wallet — gRPC integration, deep-linked entry points for campaigns, mobile and desktop — from API contract to 100% production rollout.',
        'Closed the web/native icon gap: automated migration of ~120 shared icons to the new icon system (Node.js, Figma REST API, PNG → SVG) in a single regression-verified release.'
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
      role: 'Frontend Lead · team of 5 · 4 years (2021–2025), incl. 1.5 years full-time',
      site: 'mehrwerk.de',
      url: 'https://mehrwerk.de',
      bullets: [
        'Owned the platform architecture: wrote the RFC and ADRs for the platform concept, then designed and built the multi-tenant React application framework over 4 years that cut client onboarding from ~4 months to 30 minutes, turning each new client into a configuration task instead of a project.',
        'Led a team of five: hired frontend engineers, including my successor as Frontend Lead, ran technical 1:1s, set the coding standards and ran code reviews.',
        'Joined the weekly planning session with the CTO and the backend and product leads for the 15-engineer organisation: roadmap priorities, hiring and staffing decisions.',
        'Documented the team’s engineering practices, code of conduct and workflows in Confluence, defined how the frontend and backend teams work together, and ran the joint frontend–backend meetings.',
        'Built a UI Editor that let non-technical editors publish content changes to web and native apps in real time, removing developer involvement from content updates for 1M+ monthly active users.',
        'Designed and owned the k6/Grafana Cloud load-testing suite (smoke, stress, soak, spike) for SSR and GraphQL services, giving every release a measured capacity limit before it hit production.',
        'Set up and owned CI/CD on GitHub Actions, Azure and Rancher (Kubernetes); ~3 years of hands-on Azure.',
        'Led the WCAG accessibility migration across web and native apps — audit, remediation standards, implementation — bringing the platform to compliance required by enterprise clients.',
        'Backend exposure: Kotlin / Java with Spring Boot on the JVM, MongoDB.'
      ],
      highlights: [
        'Wrote the RFC and ADRs for the platform concept, then designed and built the multi-tenant React application framework over 4 years.',
        'Led a team of five: hired frontend engineers, including my successor as Frontend Lead, ran technical 1:1s, set the coding standards and ran code reviews.',
        'Joined the weekly planning session with the CTO and the backend and product leads for the 15-engineer organisation.',
        'Documented engineering practices, code of conduct and workflows in Confluence, defined how frontend and backend work together, and ran the joint FE–BE meetings.',
        'Owned the k6/Grafana Cloud load-testing suite and the WCAG accessibility migration across web and native apps.',
        'Backend exposure: Kotlin / Java with Spring Boot on the JVM, MongoDB.'
      ],
      stack: [
        'TypeScript', 'React', 'Vue 2/3', 'Tailwind CSS', 'Ionic', 'React Native', 'Next.js', 'Node.js',
        'Kotlin', 'Java', 'Spring Boot', 'GraphQL', 'MongoDB', 'Jest', 'Cypress',
        'AWS', 'Azure', 'Rancher', 'Kubernetes', 'GitHub Actions', 'k6'
      ]
    },
    {
      id: 'selectcode',
      company: 'SelectCode GmbH',
      tagline: 'meinGPT, enterprise AI platform, ~50 companies, 20k+ users',
      role: 'Fullstack Developer',
      site: 'meingpt.com',
      url: 'https://meingpt.com',
      bullets: [
        'Built streaming chat with tool calling (Vercel AI SDK) and collaborative features — shared AI assistants, chat workflows — for a privacy-focused RAG platform with multi-LLM support (React, Zustand).',
        'Built a custom Data Vault ingestion service (Python/FastAPI): document chunking (LangChain text splitters) and loading into a Weaviate vector store, feeding the platform’s retrieval pipeline.',
        'Designed and shipped LLM token-usage metering across a multi-provider GenAI platform (OpenAI, Gemini, Anthropic, Azure): Prisma data model, tRPC service and AI-middleware hooks capturing provider-reported and estimated tokens, including failed and rate-limited calls. This became the basis for per-company usage limits and a new revenue stream from paid extra tokens, which I made purchasable through a Shopify integration.',
        'Implemented secure tRPC/Prisma endpoints for organisation hierarchies, RBAC (Lucia Auth) and Stripe subscriptions — the billing and permission layer enterprise customers are sold on.'
      ],
      highlights: [
        'Implemented secure tRPC/Prisma endpoints for organisation hierarchies, RBAC (Lucia Auth) and Stripe subscriptions — the billing and permission layer enterprise customers are sold on.'
      ],
      stack: [
        'TypeScript', 'React', 'Next.js', 'NestJS', 'tRPC', 'Prisma', 'PostgreSQL',
        'Python', 'FastAPI', 'Weaviate', 'pgvector', 'Langfuse', 'Vercel AI SDK',
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
      highlights: [
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

/* The CV's skills block, verbatim — what cv.md, llms.txt and the JSON-LD
   publish. Separate from SKILL_GROUPS below, because those have to match the
   `stack` entries of real roles to be clickable. */
export const CV_SKILLS = [
  { label: 'Core', items: ['React', 'TypeScript', 'Next.js (App Router)', 'Node.js', 'Tailwind CSS'] },
  { label: 'Mobile', items: ['Ionic', 'React Native'] },
  {
    label: 'Backend',
    items: [
      'NestJS', 'tRPC', 'GraphQL', 'gRPC', 'Prisma', 'PostgreSQL', 'MongoDB',
      'Kotlin / Java (Spring Boot)', 'Python (FastAPI)', 'also PHP'
    ]
  },
  { label: 'Testing', items: ['Jest', 'Cypress', 'Playwright', 'Storybook', 'k6'] },
  {
    label: 'Infra',
    items: [
      'AWS', 'Azure', 'Docker', 'Kubernetes', 'Rancher', 'CI/CD',
      'GitHub Actions', 'GitLab CI', 'Datadog'
    ]
  },
  {
    label: 'AI / LLM',
    items: [
      'RAG', 'Embeddings & vector search (Weaviate, pgvector)', 'Vercel AI SDK',
      'Streaming', 'Tool calling', 'Langfuse tracing',
      'Multi-LLM (OpenAI, Anthropic, Gemini, Azure)', 'Claude Code'
    ]
  }
];

/* The clickable chips under Stack. Every item here must match at least one
   role's `stack`, directly or through `SKILL_ALIASES` — a chip showing 0 is a
   spelling bug, not a reason to drop the chip. */
export const SKILL_GROUPS = [
  {
    label: 'Core',
    items: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS']
  },
  {
    label: 'Mobile',
    items: ['Ionic', 'React Native']
  },
  {
    label: 'Backend',
    items: [
      'NestJS', 'tRPC', 'GraphQL', 'gRPC', 'Prisma', 'PostgreSQL', 'MongoDB',
      'Kotlin / Java', 'Spring Boot', 'Python', 'FastAPI', 'PHP'
    ]
  },
  {
    label: 'Testing',
    items: ['Jest', 'Cypress', 'Playwright', 'Storybook', 'k6']
  },
  {
    label: 'Infra',
    items: [
      'AWS', 'Azure', 'Docker', 'Kubernetes', 'Rancher', 'CI/CD',
      'GitHub Actions', 'GitLab CI', 'Datadog'
    ]
  },
  {
    label: 'AI / LLM',
    items: ['RAG', 'Vector search', 'Vercel AI SDK', 'Langfuse', 'Multi-LLM']
  }
];

export const SKILL_ALIASES = {
  'CI/CD': ['GitLab CI', 'CircleCI', 'Jenkins', 'GitLab', 'GitHub Actions'],
  'GitLab CI': ['GitLab CI', 'GitLab'],
  'Kotlin / Java': ['Kotlin', 'Java'],
  'Vector search': ['Weaviate', 'pgvector'],
  'Multi-LLM': ['OpenAI API'],
  'Node.js': ['Node.js', 'NestJS']
};
