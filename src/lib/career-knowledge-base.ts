/**
 * Career Knowledge Base - EXPANDED
 * Comprehensive industry data, role definitions, skill prerequisites, and career transition patterns
 */

export interface CareerRole {
  id: string;
  name: string;
  industry: string;
  level: 'junior' | 'mid' | 'senior' | 'lead' | 'specialist';
  requiredSkills: string[];
  optionalSkills: string[];
  marketDemand: 1 | 2 | 3 | 4 | 5;
  yearsExperienceRequired: number;
  typicalLearningPath: string[];
  salaryRange: { min: number; max: number };
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'domain';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  learningTime: number;
  prerequisites: string[];
  marketDemand: 1 | 2 | 3 | 4 | 5;
  resources: string[];
  description: string;
}

export interface CareerTransition {
  from: string;
  to: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  skillGapSize: 'small' | 'medium' | 'large';
  typicalTimeMonths: number;
  successRate: number;
  commonPath: string[];
  recommendations: string[];
}

// ─────────────────────────────────────────────────────────

export const CAREER_KNOWLEDGE_BASE = {
  roles: {
    // ─── Technology - Data & Analytics ───
    'junior-analyst': {
      id: 'junior-analyst',
      name: 'Junior Data Analyst',
      industry: 'technology',
      level: 'junior',
      requiredSkills: ['sql', 'excel', 'statistics-basics', 'data-visualization'],
      optionalSkills: ['python', 'tableau', 'business-acumen', 'sql-optimization'],
      marketDemand: 4,
      yearsExperienceRequired: 0,
      typicalLearningPath: ['sql-fundamentals', 'excel-advanced', 'statistics-basics', 'data-visualization'],
      salaryRange: { min: 30000000, max: 45000000 },
      description: 'Entry-level role analyzing data and creating reports for business insights',
    },
    'mid-analyst': {
      id: 'mid-analyst',
      name: 'Mid-Level Data Analyst',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['sql', 'python', 'statistics-intermediate', 'tableau', 'business-acumen'],
      optionalSkills: ['power-bi', 'r-programming', 'database-design', 'data-warehousing'],
      marketDemand: 4,
      yearsExperienceRequired: 3,
      typicalLearningPath: ['python-fundamentals', 'statistics-intermediate', 'tableau-advanced', 'business-intelligence'],
      salaryRange: { min: 50000000, max: 75000000 },
      description: 'Creates advanced analytics solutions and dashboards for stakeholders',
    },
    'senior-analyst': {
      id: 'senior-analyst',
      name: 'Senior Data Analyst',
      industry: 'technology',
      level: 'senior',
      requiredSkills: ['sql-advanced', 'python', 'statistics-advanced', 'tableau', 'business-strategy'],
      optionalSkills: ['r-programming', 'data-warehousing', 'power-bi-advanced', 'storytelling'],
      marketDemand: 3,
      yearsExperienceRequired: 5,
      typicalLearningPath: ['sql-advanced', 'statistics-advanced', 'business-strategy', 'leadership-basics'],
      salaryRange: { min: 75000000, max: 110000000 },
      description: 'Leads analytics initiatives and provides strategic insights to leadership',
    },

    // ─── Technology - Machine Learning ───
    'ml-engineer-junior': {
      id: 'ml-engineer-junior',
      name: 'Junior ML Engineer',
      industry: 'technology',
      level: 'junior',
      requiredSkills: ['python', 'ml-fundamentals', 'statistics-intermediate', 'linear-algebra'],
      optionalSkills: ['tensorflow', 'pytorch', 'sql', 'git', 'docker-basics'],
      marketDemand: 5,
      yearsExperienceRequired: 1,
      typicalLearningPath: ['python-advanced', 'ml-fundamentals', 'statistics-intermediate', 'linear-algebra', 'deep-learning'],
      salaryRange: { min: 55000000, max: 80000000 },
      description: 'Builds and trains machine learning models for production systems',
    },
    'ml-engineer-mid': {
      id: 'ml-engineer-mid',
      name: 'Mid-Level ML Engineer',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['python', 'ml-fundamentals', 'deep-learning', 'statistics-intermediate', 'system-design'],
      optionalSkills: ['mlops', 'tensorflow-advanced', 'pytorch-advanced', 'kubernetes', 'cloud-ml'],
      marketDemand: 5,
      yearsExperienceRequired: 3,
      typicalLearningPath: ['deep-learning', 'mlops-fundamentals', 'system-design', 'tensorflow-advanced'],
      salaryRange: { min: 75000000, max: 120000000 },
      description: 'Develops production ML systems with focus on scalability and performance',
    },
    'ml-engineer-senior': {
      id: 'ml-engineer-senior',
      name: 'Senior ML Engineer',
      industry: 'technology',
      level: 'senior',
      requiredSkills: ['python', 'ml-fundamentals', 'statistics-advanced', 'deep-learning', 'system-design', 'production-ml'],
      optionalSkills: ['mlops-advanced', 'tensorflow-advanced', 'pytorch-advanced', 'gcp-ml', 'aws-ml', 'leadership'],
      marketDemand: 5,
      yearsExperienceRequired: 5,
      typicalLearningPath: ['deep-learning-advanced', 'statistics-advanced', 'mlops-fundamentals', 'system-design', 'production-ml'],
      salaryRange: { min: 100000000, max: 150000000 },
      description: 'Designs end-to-end ML systems and mentors junior engineers',
    },

    // ─── Technology - AI & Research ───
    'ai-researcher': {
      id: 'ai-researcher',
      name: 'AI Researcher',
      industry: 'technology',
      level: 'senior',
      requiredSkills: ['python', 'ml-fundamentals', 'statistics-advanced', 'deep-learning', 'research-methodology', 'mathematics'],
      optionalSkills: ['paper-writing', 'tensorflow-research', 'pytorch-research', 'academic-publishing', 'theoretical-cs'],
      marketDemand: 4,
      yearsExperienceRequired: 5,
      typicalLearningPath: ['deep-learning-advanced', 'statistics-advanced', 'research-methodology', 'mathematics-advanced'],
      salaryRange: { min: 90000000, max: 160000000 },
      description: 'Conducts research on novel AI/ML techniques and publishes findings',
    },
    'nlp-engineer': {
      id: 'nlp-engineer',
      name: 'NLP Engineer',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['python', 'ml-fundamentals', 'nlp-basics', 'statistics-intermediate', 'tensorflow', 'pytorch'],
      optionalSkills: ['transformers', 'huggingface', 'bert', 'gpt', 'speech-processing'],
      marketDemand: 5,
      yearsExperienceRequired: 2,
      typicalLearningPath: ['python-advanced', 'ml-fundamentals', 'nlp-basics', 'transformers', 'deep-learning'],
      salaryRange: { min: 70000000, max: 130000000 },
      description: 'Develops NLP systems for text processing, understanding, and generation',
    },
    'cv-engineer': {
      id: 'cv-engineer',
      name: 'Computer Vision Engineer',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['python', 'ml-fundamentals', 'cv-basics', 'deep-learning', 'tensorflow', 'pytorch'],
      optionalSkills: ['opencv', 'yolo', 'cnn-advanced', 'image-processing', 'tensorflow-lite'],
      marketDemand: 5,
      yearsExperienceRequired: 2,
      typicalLearningPath: ['python-advanced', 'ml-fundamentals', 'cv-basics', 'cnn-advanced', 'deep-learning'],
      salaryRange: { min: 70000000, max: 130000000 },
      description: 'Builds computer vision systems for image recognition and processing',
    },

    // ─── Technology - Software Engineering ───
    'junior-frontend': {
      id: 'junior-frontend',
      name: 'Junior Frontend Developer',
      industry: 'technology',
      level: 'junior',
      requiredSkills: ['javascript', 'html-css', 'react', 'git'],
      optionalSkills: ['typescript', 'tailwind-css', 'testing', 'ui-design-basics'],
      marketDemand: 5,
      yearsExperienceRequired: 0,
      typicalLearningPath: ['html-css', 'javascript', 'react', 'typescript', 'testing'],
      salaryRange: { min: 35000000, max: 55000000 },
      description: 'Develops user interfaces for web applications',
    },
    'mid-frontend': {
      id: 'mid-frontend',
      name: 'Mid-Level Frontend Developer',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['javascript', 'typescript', 'react', 'testing', 'git'],
      optionalSkills: ['next-js', 'state-management', 'performance-optimization', 'accessibility'],
      marketDemand: 5,
      yearsExperienceRequired: 3,
      typicalLearningPath: ['javascript-advanced', 'typescript', 'react-advanced', 'state-management', 'testing-advanced'],
      salaryRange: { min: 55000000, max: 90000000 },
      description: 'Develops complex frontend features and maintains code quality',
    },
    'junior-backend': {
      id: 'junior-backend',
      name: 'Junior Backend Developer',
      industry: 'technology',
      level: 'junior',
      requiredSkills: ['python', 'sql', 'rest-api', 'git'],
      optionalSkills: ['nodejs', 'docker-basics', 'database-design', 'testing'],
      marketDemand: 5,
      yearsExperienceRequired: 0,
      typicalLearningPath: ['python', 'sql', 'rest-api', 'docker-basics', 'testing'],
      salaryRange: { min: 35000000, max: 55000000 },
      description: 'Develops server-side logic and APIs for applications',
    },
    'mid-backend': {
      id: 'mid-backend',
      name: 'Mid-Level Backend Developer',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['python', 'sql-advanced', 'rest-api', 'system-design', 'testing'],
      optionalSkills: ['microservices', 'docker', 'kubernetes', 'distributed-systems', 'message-queues'],
      marketDemand: 5,
      yearsExperienceRequired: 3,
      typicalLearningPath: ['python-advanced', 'sql-advanced', 'system-design', 'microservices', 'docker'],
      salaryRange: { min: 55000000, max: 90000000 },
      description: 'Designs and implements scalable backend systems',
    },
    'fullstack-engineer': {
      id: 'fullstack-engineer',
      name: 'Fullstack Engineer',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['javascript', 'typescript', 'react', 'nodejs', 'sql', 'git'],
      optionalSkills: ['docker', 'cloud-deployment', 'system-design', 'devops-basics'],
      marketDemand: 4,
      yearsExperienceRequired: 3,
      typicalLearningPath: ['javascript-advanced', 'react', 'nodejs', 'sql', 'system-design'],
      salaryRange: { min: 60000000, max: 100000000 },
      description: 'Develops both frontend and backend of applications',
    },

    // ─── Technology - DevOps & Infrastructure ───
    'devops-engineer': {
      id: 'devops-engineer',
      name: 'DevOps Engineer',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['linux', 'docker', 'kubernetes', 'ci-cd', 'cloud-platforms'],
      optionalSkills: ['terraform', 'ansible', 'monitoring', 'security-basics', 'scripting'],
      marketDemand: 5,
      yearsExperienceRequired: 2,
      typicalLearningPath: ['linux', 'scripting', 'docker', 'kubernetes', 'ci-cd', 'cloud-platforms'],
      salaryRange: { min: 60000000, max: 110000000 },
      description: 'Manages deployment, infrastructure, and operational processes',
    },
    'cloud-architect': {
      id: 'cloud-architect',
      name: 'Cloud Architect',
      industry: 'technology',
      level: 'senior',
      requiredSkills: ['cloud-platforms', 'system-design', 'security-basics', 'devops-basics'],
      optionalSkills: ['terraform', 'cost-optimization', 'multi-cloud', 'enterprise-architecture'],
      marketDemand: 4,
      yearsExperienceRequired: 5,
      typicalLearningPath: ['cloud-platforms-advanced', 'system-design', 'security-advanced', 'cost-optimization'],
      salaryRange: { min: 90000000, max: 160000000 },
      description: 'Designs cloud infrastructure and strategies for organizations',
    },

    // ─── Product & Management ───
    'product-manager': {
      id: 'product-manager',
      name: 'Product Manager',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['business-acumen', 'communication', 'product-thinking', 'data-analysis', 'user-research'],
      optionalSkills: ['sql', 'prototyping', 'agile', 'analytics', 'market-analysis'],
      marketDemand: 4,
      yearsExperienceRequired: 3,
      typicalLearningPath: ['business-acumen', 'product-management-fundamentals', 'user-research', 'data-analysis'],
      salaryRange: { min: 70000000, max: 120000000 },
      description: 'Defines product strategy and leads cross-functional teams',
    },
    'product-manager-senior': {
      id: 'product-manager-senior',
      name: 'Senior Product Manager',
      industry: 'technology',
      level: 'senior',
      requiredSkills: ['business-acumen', 'communication', 'product-strategy', 'data-analysis', 'leadership'],
      optionalSkills: ['market-analysis', 'financial-modeling', 'negotiation', 'public-speaking'],
      marketDemand: 3,
      yearsExperienceRequired: 5,
      typicalLearningPath: ['product-strategy', 'business-strategy', 'leadership-development', 'financial-modeling'],
      salaryRange: { min: 110000000, max: 180000000 },
      description: 'Leads product vision and strategy for multiple teams',
    },
    'project-manager': {
      id: 'project-manager',
      name: 'Project Manager',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['communication', 'project-management', 'agile', 'risk-management'],
      optionalSkills: ['scrum', 'kanban', 'budget-management', 'stakeholder-management'],
      marketDemand: 4,
      yearsExperienceRequired: 3,
      typicalLearningPath: ['project-management', 'agile', 'communication-advanced', 'risk-management'],
      salaryRange: { min: 60000000, max: 100000000 },
      description: 'Manages project timelines, resources, and stakeholder communication',
    },

    // ─── Technology - Design ───
    'ux-designer': {
      id: 'ux-designer',
      name: 'UX Designer',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['user-research', 'design-thinking', 'prototyping', 'communication'],
      optionalSkills: ['figma', 'usability-testing', 'information-architecture', 'accessibility'],
      marketDemand: 4,
      yearsExperienceRequired: 2,
      typicalLearningPath: ['user-research', 'design-thinking', 'prototyping', 'figma', 'usability-testing'],
      salaryRange: { min: 55000000, max: 95000000 },
      description: 'Designs user experiences and interfaces for applications',
    },
    'ui-designer': {
      id: 'ui-designer',
      name: 'UI Designer',
      industry: 'technology',
      level: 'mid',
      requiredSkills: ['visual-design', 'figma', 'design-systems', 'communication'],
      optionalSkills: ['animation', 'interaction-design', 'css-basics', 'prototyping'],
      marketDemand: 4,
      yearsExperienceRequired: 2,
      typicalLearningPath: ['visual-design', 'figma', 'design-systems', 'interaction-design'],
      salaryRange: { min: 50000000, max: 85000000 },
      description: 'Creates visual design and UI components for applications',
    },

    // ─── Business & Finance ───
    'business-analyst': {
      id: 'business-analyst',
      name: 'Business Analyst',
      industry: 'finance',
      level: 'mid',
      requiredSkills: ['business-acumen', 'sql', 'data-analysis', 'communication', 'requirements-gathering'],
      optionalSkills: ['excel-advanced', 'power-bi', 'statistical-analysis', 'market-research'],
      marketDemand: 4,
      yearsExperienceRequired: 2,
      typicalLearningPath: ['business-acumen', 'sql', 'data-analysis', 'requirements-gathering'],
      salaryRange: { min: 50000000, max: 85000000 },
      description: 'Analyzes business needs and recommends solutions',
    },
    'financial-analyst': {
      id: 'financial-analyst',
      name: 'Financial Analyst',
      industry: 'finance',
      level: 'mid',
      requiredSkills: ['financial-analysis', 'excel-advanced', 'sql', 'financial-modeling', 'accounting-basics'],
      optionalSkills: ['python', 'power-bi', 'market-research', 'investment-analysis'],
      marketDemand: 4,
      yearsExperienceRequired: 2,
      typicalLearningPath: ['financial-analysis', 'excel-advanced', 'financial-modeling', 'accounting-basics'],
      salaryRange: { min: 55000000, max: 100000000 },
      description: 'Analyzes financial data to support business decisions',
    },
    'data-scientist-finance': {
      id: 'data-scientist-finance',
      name: 'Data Scientist (Finance)',
      industry: 'finance',
      level: 'mid',
      requiredSkills: ['python', 'ml-fundamentals', 'statistics-intermediate', 'sql', 'financial-analysis'],
      optionalSkills: ['time-series-analysis', 'r-programming', 'deep-learning-finance', 'risk-modeling'],
      marketDemand: 4,
      yearsExperienceRequired: 2,
      typicalLearningPath: ['python', 'statistics-intermediate', 'ml-fundamentals', 'financial-analysis'],
      salaryRange: { min: 70000000, max: 130000000 },
      description: 'Applies data science to financial problems and risk analysis',
    },

    // ─── Marketing & Growth ───
    'growth-marketer': {
      id: 'growth-marketer',
      name: 'Growth Marketer',
      industry: 'marketing',
      level: 'mid',
      requiredSkills: ['digital-marketing', 'data-analysis', 'sql', 'marketing-tools', 'experimentation'],
      optionalSkills: ['python', 'analytics', 'copywriting', 'user-psychology'],
      marketDemand: 4,
      yearsExperienceRequired: 2,
      typicalLearningPath: ['digital-marketing', 'data-analysis', 'marketing-tools', 'experimentation'],
      salaryRange: { min: 50000000, max: 90000000 },
      description: 'Drives user acquisition and retention through data-driven strategies',
    },
    'data-scientist-marketing': {
      id: 'data-scientist-marketing',
      name: 'Data Scientist (Marketing)',
      industry: 'marketing',
      level: 'mid',
      requiredSkills: ['python', 'ml-fundamentals', 'statistics-intermediate', 'sql', 'analytics'],
      optionalSkills: ['attribution-modeling', 'customer-segmentation', 'churn-prediction', 'recommendation-systems'],
      marketDemand: 4,
      yearsExperienceRequired: 2,
      typicalLearningPath: ['python', 'statistics-intermediate', 'ml-fundamentals', 'customer-segmentation'],
      salaryRange: { min: 70000000, max: 130000000 },
      description: 'Uses data science for marketing optimization and customer insights',
    },

    // ─── Healthcare & Other ───
    'healthcare-data-analyst': {
      id: 'healthcare-data-analyst',
      name: 'Healthcare Data Analyst',
      industry: 'healthcare',
      level: 'mid',
      requiredSkills: ['sql', 'data-analysis', 'statistics-intermediate', 'healthcare-basics', 'communication'],
      optionalSkills: ['python', 'r-programming', 'hipaa-compliance', 'epidemiology'],
      marketDemand: 4,
      yearsExperienceRequired: 2,
      typicalLearningPath: ['sql', 'data-analysis', 'statistics-intermediate', 'healthcare-basics'],
      salaryRange: { min: 55000000, max: 95000000 },
      description: 'Analyzes healthcare data for clinical and operational insights',
    },
  } as Record<string, CareerRole>,

  skills: {
    // ─── Programming Languages ───
    'python': {
      id: 'python',
      name: 'Python Programming',
      category: 'technical',
      level: 'advanced',
      learningTime: 120,
      prerequisites: [],
      marketDemand: 5,
      resources: ['Python for Data Science', 'Real Python', 'Codecademy', 'DataCamp'],
      description: 'Core programming language for data, ML, and backend work',
    },
    'javascript': {
      id: 'javascript',
      name: 'JavaScript',
      category: 'technical',
      level: 'intermediate',
      learningTime: 100,
      prerequisites: [],
      marketDemand: 5,
      resources: ['JavaScript.info', 'Eloquent JavaScript', 'MDN Web Docs'],
      description: 'Essential for frontend and full-stack development',
    },
    'typescript': {
      id: 'typescript',
      name: 'TypeScript',
      category: 'technical',
      level: 'intermediate',
      learningTime: 60,
      prerequisites: ['javascript'],
      marketDemand: 5,
      resources: ['TypeScript Handbook', 'TypeScript for JavaScript Programmers'],
      description: 'Typed superset of JavaScript for safer code',
    },
    'sql': {
      id: 'sql',
      name: 'SQL',
      category: 'technical',
      level: 'intermediate',
      learningTime: 40,
      prerequisites: [],
      marketDemand: 5,
      resources: ['SQLZoo', 'Mode Analytics SQL Tutorial', 'Coursera SQL'],
      description: 'Query and manage databases',
    },
    'sql-advanced': {
      id: 'sql-advanced',
      name: 'Advanced SQL',
      category: 'technical',
      level: 'advanced',
      learningTime: 80,
      prerequisites: ['sql'],
      marketDemand: 4,
      resources: ['Advanced SQL Course', 'SQL Performance Explained'],
      description: 'Complex queries, optimization, and window functions',
    },
    'r-programming': {
      id: 'r-programming',
      name: 'R Programming',
      category: 'technical',
      level: 'intermediate',
      learningTime: 100,
      prerequisites: [],
      marketDemand: 3,
      resources: ['R for Data Science', 'DataCamp R courses', 'RStudio tutorials'],
      description: 'Statistical programming and data visualization',
    },
    'java': {
      id: 'java',
      name: 'Java Programming',
      category: 'technical',
      level: 'intermediate',
      learningTime: 120,
      prerequisites: [],
      marketDemand: 4,
      resources: ['Java Programming MOOC', 'Oracle Java Tutorials', 'Head First Java'],
      description: 'Enterprise application development',
    },
    'golang': {
      id: 'golang',
      name: 'Go (Golang)',
      category: 'technical',
      level: 'intermediate',
      learningTime: 80,
      prerequisites: [],
      marketDemand: 4,
      resources: ['Go Official Tutorial', 'Learn Go with Tests', 'A Tour of Go'],
      description: 'Systems programming and microservices',
    },

    // ─── Frontend ───
    'html-css': {
      id: 'html-css',
      name: 'HTML & CSS',
      category: 'technical',
      level: 'beginner',
      learningTime: 40,
      prerequisites: [],
      marketDemand: 5,
      resources: ['MDN Web Docs', 'FreeCodeCamp', 'Khan Academy'],
      description: 'Fundamentals of web development',
    },
    'react': {
      id: 'react',
      name: 'React.js',
      category: 'technical',
      level: 'intermediate',
      learningTime: 80,
      prerequisites: ['javascript'],
      marketDemand: 5,
      resources: ['React Official Docs', 'React Documentation', 'Frontend Masters React'],
      description: 'JavaScript library for building user interfaces',
    },
    'next-js': {
      id: 'next-js',
      name: 'Next.js',
      category: 'technical',
      level: 'intermediate',
      learningTime: 60,
      prerequisites: ['react', 'javascript'],
      marketDemand: 5,
      resources: ['Next.js Documentation', 'Next.js by Example', 'Lee Robinson Courses'],
      description: 'React framework for production applications',
    },
    'vue-js': {
      id: 'vue-js',
      name: 'Vue.js',
      category: 'technical',
      level: 'intermediate',
      learningTime: 70,
      prerequisites: ['javascript'],
      marketDemand: 3,
      resources: ['Vue.js Official Guide', 'Vue.js by Example', 'Egghead Vue'],
      description: 'Progressive JavaScript framework',
    },
    'tailwind-css': {
      id: 'tailwind-css',
      name: 'Tailwind CSS',
      category: 'technical',
      level: 'beginner',
      learningTime: 30,
      prerequisites: ['html-css'],
      marketDemand: 5,
      resources: ['Tailwind CSS Documentation', 'Tailwind UI', 'Adam Wathan Courses'],
      description: 'Utility-first CSS framework',
    },
    'state-management': {
      id: 'state-management',
      name: 'State Management (Redux, Zustand)',
      category: 'technical',
      level: 'intermediate',
      learningTime: 50,
      prerequisites: ['react'],
      marketDemand: 4,
      resources: ['Redux Documentation', 'Redux Essentials', 'Frontend Masters Redux'],
      description: 'Managing application state in React',
    },

    // ─── Backend ───
    'nodejs': {
      id: 'nodejs',
      name: 'Node.js',
      category: 'technical',
      level: 'intermediate',
      learningTime: 80,
      prerequisites: ['javascript'],
      marketDemand: 5,
      resources: ['Node.js Documentation', 'Node.js by Example', 'Frontend Masters Node'],
      description: 'JavaScript runtime for server-side development',
    },
    'express-js': {
      id: 'express-js',
      name: 'Express.js',
      category: 'technical',
      level: 'intermediate',
      learningTime: 50,
      prerequisites: ['nodejs'],
      marketDemand: 5,
      resources: ['Express Documentation', 'Express.js Tutorials', 'MDN Express Guide'],
      description: 'Minimal web application framework',
    },
    'rest-api': {
      id: 'rest-api',
      name: 'REST API Design',
      category: 'domain',
      level: 'intermediate',
      learningTime: 40,
      prerequisites: [],
      marketDemand: 5,
      resources: ['RESTful API Best Practices', 'REST API Tutorial', 'API Design Course'],
      description: 'Designing and building REST APIs',
    },
    'graphql': {
      id: 'graphql',
      name: 'GraphQL',
      category: 'technical',
      level: 'intermediate',
      learningTime: 60,
      prerequisites: ['rest-api'],
      marketDemand: 4,
      resources: ['GraphQL Official Site', 'How to GraphQL', 'Apollo Documentation'],
      description: 'Query language for APIs',
    },
    'database-design': {
      id: 'database-design',
      name: 'Database Design',
      category: 'domain',
      level: 'intermediate',
      learningTime: 60,
      prerequisites: ['sql'],
      marketDemand: 4,
      resources: ['Database Design Course', 'Normalization Concepts', 'Database Modeling'],
      description: 'Designing efficient database schemas',
    },

    // ─── Data Science & ML ───
    'statistics-basics': {
      id: 'statistics-basics',
      name: 'Statistics Fundamentals',
      category: 'domain',
      level: 'beginner',
      learningTime: 60,
      prerequisites: [],
      marketDemand: 5,
      resources: ['Statistics 101', 'Khan Academy Statistics', 'Probability and Statistics'],
      description: 'Basic statistical concepts and hypothesis testing',
    },
    'statistics-intermediate': {
      id: 'statistics-intermediate',
      name: 'Statistics Intermediate',
      category: 'domain',
      level: 'intermediate',
      learningTime: 80,
      prerequisites: ['statistics-basics'],
      marketDemand: 5,
      resources: ['Statistical Methods for Data Science', 'Coursera Advanced Statistics'],
      description: 'Advanced statistical methods and experimental design',
    },
    'statistics-advanced': {
      id: 'statistics-advanced',
      name: 'Advanced Statistics & Probability',
      category: 'domain',
      level: 'advanced',
      learningTime: 100,
      prerequisites: ['statistics-intermediate', 'linear-algebra'],
      marketDemand: 4,
      resources: ['Graduate Statistics', 'Probability Theory', 'Bayesian Methods'],
      description: 'Bayesian methods, stochastic processes, advanced probability',
    },
    'linear-algebra': {
      id: 'linear-algebra',
      name: 'Linear Algebra',
      category: 'domain',
      level: 'intermediate',
      learningTime: 80,
      prerequisites: [],
      marketDemand: 5,
      resources: ['3Blue1Brown Linear Algebra', 'MIT Linear Algebra', 'Linear Algebra Done Right'],
      description: 'Vectors, matrices, eigenvalues for ML',
    },
    'ml-fundamentals': {
      id: 'ml-fundamentals',
      name: 'Machine Learning Fundamentals',
      category: 'domain',
      level: 'intermediate',
      learningTime: 100,
      prerequisites: ['python', 'statistics-basics'],
      marketDemand: 5,
      resources: ['ML Specialization by Andrew Ng', 'Fast.ai ML', 'Scikit-learn Documentation'],
      description: 'Supervised and unsupervised learning algorithms',
    },
    'deep-learning': {
      id: 'deep-learning',
      name: 'Deep Learning Basics',
      category: 'domain',
      level: 'intermediate',
      learningTime: 80,
      prerequisites: ['ml-fundamentals', 'linear-algebra'],
      marketDemand: 5,
      resources: ['Deep Learning Specialization', 'Fast.ai Part 1', 'Neural Networks Course'],
      description: 'Neural networks, CNNs, RNNs, transformers',
    },
    'deep-learning-advanced': {
      id: 'deep-learning-advanced',
      name: 'Advanced Deep Learning',
      category: 'domain',
      level: 'advanced',
      learningTime: 120,
      prerequisites: ['deep-learning', 'statistics-advanced'],
      marketDemand: 4,
      resources: ['Advanced DL Research Papers', 'Stanford CS231n', 'Fast.ai Part 2'],
      description: 'Cutting-edge DL architectures, optimization, interpretability',
    },
    'nlp-basics': {
      id: 'nlp-basics',
      name: 'NLP Basics',
      category: 'domain',
      level: 'intermediate',
      learningTime: 70,
      prerequisites: ['ml-fundamentals', 'python'],
      marketDemand: 5,
      resources: ['NLTK Tutorial', 'Fast.ai NLP', 'NLP with Python'],
      description: 'Natural language processing fundamentals',
    },
    'transformers': {
      id: 'transformers',
      name: 'Transformers & BERT',
      category: 'domain',
      level: 'advanced',
      learningTime: 80,
      prerequisites: ['nlp-basics', 'deep-learning'],
      marketDemand: 5,
      resources: ['Attention is All You Need', 'Hugging Face Course', 'BERT Paper'],
      description: 'Modern transformer architectures for NLP',
    },
    'cv-basics': {
      id: 'cv-basics',
      name: 'Computer Vision Basics',
      category: 'domain',
      level: 'intermediate',
      learningTime: 70,
      prerequisites: ['ml-fundamentals', 'python'],
      marketDemand: 5,
      resources: ['OpenCV Tutorial', 'Fast.ai Vision', 'Computer Vision Handbook'],
      description: 'Image processing and computer vision fundamentals',
    },
    'time-series-analysis': {
      id: 'time-series-analysis',
      name: 'Time Series Analysis',
      category: 'domain',
      level: 'intermediate',
      learningTime: 70,
      prerequisites: ['statistics-intermediate', 'python'],
      marketDemand: 4,
      resources: ['Time Series Course', 'ARIMA Models', 'Forecasting Course'],
      description: 'Time series forecasting and analysis',
    },

    // ─── DevOps & Cloud ───
    'docker': {
      id: 'docker',
      name: 'Docker',
      category: 'technical',
      level: 'intermediate',
      learningTime: 50,
      prerequisites: ['linux'],
      marketDemand: 5,
      resources: ['Docker Documentation', 'Docker Mastery', 'Play with Docker'],
      description: 'Container orchestration and deployment',
    },
    'docker-basics': {
      id: 'docker-basics',
      name: 'Docker Basics',
      category: 'technical',
      level: 'beginner',
      learningTime: 30,
      prerequisites: [],
      marketDemand: 5,
      resources: ['Docker Get Started', 'Docker Tutorial', 'Docker for Beginners'],
      description: 'Introduction to Docker containers',
    },
    'kubernetes': {
      id: 'kubernetes',
      name: 'Kubernetes',
      category: 'technical',
      level: 'advanced',
      learningTime: 100,
      prerequisites: ['docker'],
      marketDemand: 5,
      resources: ['Kubernetes Official Docs', 'Kubernetes the Hard Way', 'Linux Academy K8s'],
      description: 'Container orchestration and management',
    },
    'linux': {
      id: 'linux',
      name: 'Linux Administration',
      category: 'technical',
      level: 'intermediate',
      learningTime: 80,
      prerequisites: [],
      marketDemand: 5,
      resources: ['Linux Academy', 'Linux Command Line Basics', 'Ubuntu Server Guide'],
      description: 'Linux system administration and command line',
    },
    'ci-cd': {
      id: 'ci-cd',
      name: 'CI/CD Pipelines',
      category: 'domain',
      level: 'intermediate',
      learningTime: 60,
      prerequisites: ['git'],
      marketDemand: 5,
      resources: ['Jenkins Documentation', 'GitHub Actions', 'GitLab CI/CD'],
      description: 'Continuous integration and deployment',
    },
    'cloud-platforms': {
      id: 'cloud-platforms',
      name: 'Cloud Platforms (AWS/GCP/Azure)',
      category: 'technical',
      level: 'intermediate',
      learningTime: 100,
      prerequisites: [],
      marketDemand: 5,
      resources: ['AWS Free Tier', 'Google Cloud Skills Boost', 'Azure Learn'],
      description: 'Major cloud platforms and services',
    },
    'terraform': {
      id: 'terraform',
      name: 'Terraform',
      category: 'technical',
      level: 'intermediate',
      learningTime: 60,
      prerequisites: ['cloud-platforms'],
      marketDemand: 4,
      resources: ['Terraform Documentation', 'Terraform for AWS', 'Terraform Best Practices'],
      description: 'Infrastructure as code tool',
    },

    // ─── Soft Skills & Business ───
    'communication': {
      id: 'communication',
      name: 'Communication Skills',
      category: 'soft',
      level: 'intermediate',
      learningTime: 40,
      prerequisites: [],
      marketDemand: 5,
      resources: ['Toastmasters', 'Communication Workshops', 'TED Talks'],
      description: 'Presenting ideas effectively to diverse audiences',
    },
    'leadership': {
      id: 'leadership',
      name: 'Leadership',
      category: 'soft',
      level: 'advanced',
      learningTime: 80,
      prerequisites: ['communication'],
      marketDemand: 4,
      resources: ['Leadership Courses', 'Harvard ManageMentor', 'Coursera Leadership'],
      description: 'Team leadership and management',
    },
    'business-acumen': {
      id: 'business-acumen',
      name: 'Business Acumen',
      category: 'soft',
      level: 'intermediate',
      learningTime: 60,
      prerequisites: [],
      marketDemand: 4,
      resources: ['Business Fundamentals', 'Industry Reports', 'Company Analysis'],
      description: 'Understanding business metrics, strategy, and industry',
    },
    'product-thinking': {
      id: 'product-thinking',
      name: 'Product Thinking',
      category: 'soft',
      level: 'intermediate',
      learningTime: 60,
      prerequisites: ['business-acumen'],
      marketDemand: 4,
      resources: ['Inspired by Marty Cagan', 'Product School', 'Reforge'],
      description: 'User-centric product development mindset',
    },
    'product-management-fundamentals': {
      id: 'product-management-fundamentals',
      name: 'Product Management Fundamentals',
      category: 'domain',
      level: 'intermediate',
      learningTime: 70,
      prerequisites: ['product-thinking', 'business-acumen'],
      marketDemand: 4,
      resources: ['Product Management Course', 'Reforge PM', 'Cracking the PM Interview'],
      description: 'PM principles, roadmapping, stakeholder management',
    },
    'project-management': {
      id: 'project-management',
      name: 'Project Management',
      category: 'domain',
      level: 'intermediate',
      learningTime: 60,
      prerequisites: ['communication'],
      marketDemand: 4,
      resources: ['Project Management Fundamentals', 'Agile Course', 'PMP Prep'],
      description: 'Managing projects and teams effectively',
    },
    'agile': {
      id: 'agile',
      name: 'Agile & Scrum',
      category: 'domain',
      level: 'intermediate',
      learningTime: 40,
      prerequisites: [],
      marketDemand: 5,
      resources: ['Agile Manifesto', 'Scrum.org', 'Agile 101'],
      description: 'Agile methodology and Scrum framework',
    },

    // ─── Other Technical Skills ───
    'git': {
      id: 'git',
      name: 'Git & Version Control',
      category: 'technical',
      level: 'beginner',
      learningTime: 20,
      prerequisites: [],
      marketDemand: 5,
      resources: ['Git Tutorial', 'GitHub Learning Lab', 'Pro Git Book'],
      description: 'Version control for collaboration',
    },
    'testing': {
      id: 'testing',
      name: 'Testing & QA',
      category: 'domain',
      level: 'intermediate',
      learningTime: 50,
      prerequisites: [],
      marketDemand: 4,
      resources: ['Testing Best Practices', 'Jest Documentation', 'Cypress Guide'],
      description: 'Unit testing, integration testing, QA',
    },
    'excel-advanced': {
      id: 'excel-advanced',
      name: 'Advanced Excel',
      category: 'technical',
      level: 'intermediate',
      learningTime: 30,
      prerequisites: [],
      marketDemand: 4,
      resources: ['Excel Advanced', 'Excel Tips', 'DataCamp Excel'],
      description: 'Advanced Excel formulas and data analysis',
    },
    'tableau': {
      id: 'tableau',
      name: 'Tableau',
      category: 'technical',
      level: 'intermediate',
      learningTime: 50,
      prerequisites: [],
      marketDemand: 4,
      resources: ['Tableau Desktop Training', 'Tableau Public', 'DataCamp Tableau'],
      description: 'Business intelligence and data visualization',
    },
    'power-bi': {
      id: 'power-bi',
      name: 'Power BI',
      category: 'technical',
      level: 'intermediate',
      learningTime: 50,
      prerequisites: [],
      marketDemand: 4,
      resources: ['Power BI Documentation', 'Microsoft Learn', 'Enterprise DNA'],
      description: 'Microsoft business intelligence tool',
    },
    'data-visualization': {
      id: 'data-visualization',
      name: 'Data Visualization',
      category: 'domain',
      level: 'intermediate',
      learningTime: 50,
      prerequisites: [],
      marketDemand: 4,
      resources: ['Storytelling with Data', 'Visualization Best Practices', 'D3.js Guide'],
      description: 'Creating effective data visualizations',
    },
    'user-research': {
      id: 'user-research',
      name: 'User Research Methods',
      category: 'domain',
      level: 'intermediate',
      learningTime: 50,
      prerequisites: [],
      marketDemand: 4,
      resources: ['Qualitative Research', 'UX Research Methods', 'User Testing'],
      description: 'Understanding user needs and behavior',
    },
    'figma': {
      id: 'figma',
      name: 'Figma Design Tool',
      category: 'technical',
      level: 'intermediate',
      learningTime: 40,
      prerequisites: [],
      marketDemand: 4,
      resources: ['Figma Learning', 'Figma Design Courses', 'Figma Tutorials'],
      description: 'UI/UX design tool for collaboration',
    },
    'research-methodology': {
      id: 'research-methodology',
      name: 'Research Methodology',
      category: 'domain',
      level: 'advanced',
      learningTime: 100,
      prerequisites: ['statistics-advanced'],
      marketDemand: 3,
      resources: ['Academic Research Methods', 'Research Design Course', 'Scientific Method'],
      description: 'Scientific method, experiment design, hypothesis testing',
    },
    'system-design': {
      id: 'system-design',
      name: 'System Design & Architecture',
      category: 'domain',
      level: 'advanced',
      learningTime: 100,
      prerequisites: ['sql', 'backend-development'],
      marketDemand: 5,
      resources: ['System Design Interview', 'Designing Data-Intensive Applications', 'Grokking System Design'],
      description: 'Scalable system architecture and design patterns',
    },
    'production-ml': {
      id: 'production-ml',
      name: 'Production ML Systems',
      category: 'domain',
      level: 'advanced',
      learningTime: 120,
      prerequisites: ['ml-fundamentals', 'system-design', 'mlops-fundamentals'],
      marketDemand: 5,
      resources: ['ML System Design', 'Production ML Practices', 'MLOps.community'],
      description: 'Deploying, monitoring, and maintaining ML systems at scale',
    },
    'mlops-fundamentals': {
      id: 'mlops-fundamentals',
      name: 'MLOps Fundamentals',
      category: 'domain',
      level: 'intermediate',
      learningTime: 80,
      prerequisites: ['python', 'ml-fundamentals', 'git'],
      marketDemand: 5,
      resources: ['MLOps.community', 'Made With ML', 'MLOps Resources'],
      description: 'Deploying and monitoring ML models in production',
    },
  } as Record<string, Skill>,

  transitions: [
    // Data Analyst Path
    {
      from: 'junior-analyst',
      to: 'mid-analyst',
      difficulty: 2,
      skillGapSize: 'medium',
      typicalTimeMonths: 24,
      successRate: 85,
      commonPath: ['mid-analyst'],
      recommendations: ['Master Python and SQL deeply', 'Learn advanced statistics', 'Develop BI tools expertise'],
    },
    {
      from: 'mid-analyst',
      to: 'senior-analyst',
      difficulty: 3,
      skillGapSize: 'medium',
      typicalTimeMonths: 30,
      successRate: 70,
      commonPath: ['senior-analyst'],
      recommendations: ['Develop business strategy mindset', 'Master storytelling with data', 'Lead analytics initiatives'],
    },

    // Data Analyst to ML Engineer
    {
      from: 'junior-analyst',
      to: 'ml-engineer-junior',
      difficulty: 4,
      skillGapSize: 'large',
      typicalTimeMonths: 18,
      successRate: 45,
      commonPath: ['ml-engineer-junior'],
      recommendations: ['Master Python first', 'Learn linear algebra and ML fundamentals', 'Build ML projects'],
    },
    {
      from: 'mid-analyst',
      to: 'ml-engineer-junior',
      difficulty: 3,
      skillGapSize: 'large',
      typicalTimeMonths: 12,
      successRate: 65,
      commonPath: ['ml-engineer-junior'],
      recommendations: ['Deepen Python skills', 'Learn linear algebra basics', 'Complete ML fundamentals'],
    },

    // ML Engineer Path
    {
      from: 'ml-engineer-junior',
      to: 'ml-engineer-mid',
      difficulty: 2,
      skillGapSize: 'medium',
      typicalTimeMonths: 18,
      successRate: 80,
      commonPath: ['ml-engineer-mid'],
      recommendations: ['Master deep learning', 'Learn system design', 'Deploy production models'],
    },
    {
      from: 'ml-engineer-mid',
      to: 'ml-engineer-senior',
      difficulty: 3,
      skillGapSize: 'medium',
      typicalTimeMonths: 24,
      successRate: 75,
      commonPath: ['ml-engineer-senior'],
      recommendations: ['Master advanced statistics', 'Learn MLOps deeply', 'Lead team projects'],
    },
    {
      from: 'ml-engineer-senior',
      to: 'ai-researcher',
      difficulty: 3,
      skillGapSize: 'medium',
      typicalTimeMonths: 24,
      successRate: 55,
      commonPath: ['ai-researcher'],
      recommendations: ['Learn research methodology', 'Study advanced math', 'Publish research papers'],
    },

    // Frontend Developer Path
    {
      from: 'junior-frontend',
      to: 'mid-frontend',
      difficulty: 2,
      skillGapSize: 'medium',
      typicalTimeMonths: 18,
      successRate: 85,
      commonPath: ['mid-frontend'],
      recommendations: ['Master React deeply', 'Learn TypeScript', 'Improve performance optimization'],
    },

    // Backend Developer Path
    {
      from: 'junior-backend',
      to: 'mid-backend',
      difficulty: 2,
      skillGapSize: 'medium',
      typicalTimeMonths: 18,
      successRate: 85,
      commonPath: ['mid-backend'],
      recommendations: ['Master system design', 'Learn microservices', 'Improve database optimization'],
    },

    // Product Manager Path
    {
      from: 'product-manager',
      to: 'product-manager-senior',
      difficulty: 3,
      skillGapSize: 'medium',
      typicalTimeMonths: 30,
      successRate: 65,
      commonPath: ['product-manager-senior'],
      recommendations: ['Develop business strategy', 'Master stakeholder management', 'Lead larger teams'],
    },

    // Data Analyst to Product Manager
    {
      from: 'mid-analyst',
      to: 'product-manager',
      difficulty: 2,
      skillGapSize: 'medium',
      typicalTimeMonths: 18,
      successRate: 70,
      commonPath: ['product-manager'],
      recommendations: ['Develop product thinking', 'Learn user research', 'Improve communication skills'],
    },

    // Backend to DevOps
    {
      from: 'mid-backend',
      to: 'devops-engineer',
      difficulty: 2,
      skillGapSize: 'medium',
      typicalTimeMonths: 12,
      successRate: 75,
      commonPath: ['devops-engineer'],
      recommendations: ['Master Docker and Kubernetes', 'Learn CI/CD pipelines', 'Study infrastructure'],
    },

    // Business Analyst to Product Manager
    {
      from: 'business-analyst',
      to: 'product-manager',
      difficulty: 2,
      skillGapSize: 'small',
      typicalTimeMonths: 12,
      successRate: 80,
      commonPath: ['product-manager'],
      recommendations: ['Learn product thinking', 'Improve technical knowledge', 'Develop user research skills'],
    },
  ] as CareerTransition[],
};

export function getRole(roleId: string): CareerRole | undefined {
  return CAREER_KNOWLEDGE_BASE.roles[roleId];
}

export function getSkill(skillId: string): Skill | undefined {
  return CAREER_KNOWLEDGE_BASE.skills[skillId];
}

export function getTransition(fromRoleId: string, toRoleId: string): CareerTransition | undefined {
  return CAREER_KNOWLEDGE_BASE.transitions.find(
    (t) => t.from === fromRoleId && t.to === toRoleId
  );
}

export function getAllRoles(): CareerRole[] {
  return Object.values(CAREER_KNOWLEDGE_BASE.roles);
}

export function getAllSkills(): Skill[] {
  return Object.values(CAREER_KNOWLEDGE_BASE.skills);
}

export function findRolesByIndustry(industry: string): CareerRole[] {
  return Object.values(CAREER_KNOWLEDGE_BASE.roles).filter(
    (role) => role.industry === industry
  );
}

export function findRolesBySkills(requiredSkills: string[]): CareerRole[] {
  return Object.values(CAREER_KNOWLEDGE_BASE.roles).filter((role) =>
    requiredSkills.some((skill) => role.requiredSkills.includes(skill))
  );
}

export function findRolesByLevel(level: string): CareerRole[] {
  return Object.values(CAREER_KNOWLEDGE_BASE.roles).filter(
    (role) => role.level === level
  );
}

export function findSkillsByCategory(category: string): Skill[] {
  return Object.values(CAREER_KNOWLEDGE_BASE.skills).filter(
    (skill) => skill.category === category
  );
}

export function findTransitionsFrom(roleId: string): CareerTransition[] {
  return CAREER_KNOWLEDGE_BASE.transitions.filter((t) => t.from === roleId);
}

export function findTransitionsTo(roleId: string): CareerTransition[] {
  return CAREER_KNOWLEDGE_BASE.transitions.filter((t) => t.to === roleId);
}
