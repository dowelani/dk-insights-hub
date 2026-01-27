export type ProductCategory = 'web-development' | 'data-analytics' | 'data-science' | 'digital-services';
export type ProductTier = 'basic' | 'standard' | 'premium' | 'extra';

export interface Product {
  id: string;
  title: string;
  description: string;
  priceZAR: number;
  priceUSD: number;
  features: string[];
  category: ProductCategory;
  tier: ProductTier;
  popular?: boolean;
}

export const categories: { id: ProductCategory; name: string; description: string }[] = [
  { id: 'web-development', name: 'Web Development', description: 'Professional websites and web applications' },
  { id: 'data-analytics', name: 'Data Analytics', description: 'Business intelligence and reporting solutions' },
  { id: 'data-science', name: 'Data Science', description: 'ML models and predictive analytics' },
  { id: 'digital-services', name: 'Digital Services', description: 'Branding, design, and digital solutions' },
];

export const products: Product[] = [
  // Web Development
  {
    id: 'web-basic',
    title: 'Basic Website',
    description: '1–3 pages, perfect for personal or small business sites',
    priceZAR: 1000,
    priceUSD: 55,
    features: ['Simple layout', 'Mobile-friendly', 'Contact form'],
    category: 'web-development',
    tier: 'basic',
  },
  {
    id: 'web-standard',
    title: 'Standard Website',
    description: '4–7 pages with custom design and SEO',
    priceZAR: 2500,
    priceUSD: 135,
    features: ['Custom design', 'SEO setup', 'Performance optimization'],
    category: 'web-development',
    tier: 'standard',
    popular: true,
  },
  {
    id: 'web-advanced',
    title: 'Advanced Website',
    description: '8+ pages with custom features and API-ready UI',
    priceZAR: 5500,
    priceUSD: 295,
    features: ['Custom UI/UX', 'API-ready UI', 'Multiple templates'],
    category: 'web-development',
    tier: 'premium',
  },
  {
    id: 'web-uiux',
    title: 'UI/UX Design Pack',
    description: 'Professional design package for your website',
    priceZAR: 1200,
    priceUSD: 65,
    features: ['Custom UI design', 'UX optimization', 'Design mockups'],
    category: 'web-development',
    tier: 'extra',
  },
  {
    id: 'web-speed',
    title: 'Speed Optimization',
    description: 'Boost your website performance',
    priceZAR: 600,
    priceUSD: 32,
    features: ['Performance audit', 'Code optimization', 'Faster load times'],
    category: 'web-development',
    tier: 'extra',
  },
  {
    id: 'web-maintenance',
    title: 'Monthly Website Maintenance',
    description: 'Keep your website updated and secure',
    priceZAR: 250,
    priceUSD: 15,
    features: ['Regular updates', 'Security patches', 'Content updates'],
    category: 'web-development',
    tier: 'extra',
  },

  // Data Analytics
  {
    id: 'analytics-basic',
    title: 'Basic Reporting Pack',
    description: 'Excel/Sheets dashboards with basic charts',
    priceZAR: 700,
    priceUSD: 38,
    features: ['Excel/Sheets dashboards', 'Basic charts', 'Monthly refresh'],
    category: 'data-analytics',
    tier: 'basic',
  },
  {
    id: 'analytics-business',
    title: 'Business Dashboards',
    description: 'Power BI / Tableau dashboards for business intelligence',
    priceZAR: 2000,
    priceUSD: 110,
    features: ['Automated KPIs', 'Multi-page dashboards', 'Export-ready reports'],
    category: 'data-analytics',
    tier: 'standard',
    popular: true,
  },
  {
    id: 'analytics-enterprise',
    title: 'Enterprise BI Setup',
    description: 'Complete business intelligence infrastructure',
    priceZAR: 4000,
    priceUSD: 215,
    features: ['Dashboard system', 'Data pipeline UI', 'User roles UI'],
    category: 'data-analytics',
    tier: 'premium',
  },
  {
    id: 'analytics-cleaning',
    title: 'Data Cleaning UI',
    description: 'Clean and prepare your data for analysis',
    priceZAR: 450,
    priceUSD: 25,
    features: ['Data validation', 'Error detection', 'Format standardization'],
    category: 'data-analytics',
    tier: 'extra',
  },
  {
    id: 'analytics-kpi',
    title: 'KPI Alert UI',
    description: 'Track and alert on key performance indicators',
    priceZAR: 300,
    priceUSD: 17,
    features: ['KPI tracking', 'Alert configuration', 'Notification UI'],
    category: 'data-analytics',
    tier: 'extra',
  },

  // Data Science
  {
    id: 'ds-basic',
    title: 'Basic ML Model',
    description: 'Regression/classification model with metrics',
    priceZAR: 2200,
    priceUSD: 120,
    features: ['Regression/classification model UI', 'Metrics page', 'Model report'],
    category: 'data-science',
    tier: 'basic',
  },
  {
    id: 'ds-predictive',
    title: 'Predictive Analytics',
    description: 'Forecasting and data exploration dashboards',
    priceZAR: 4500,
    priceUSD: 240,
    features: ['Forecasting dashboards', 'Data exploration UI', 'Model comparison view'],
    category: 'data-science',
    tier: 'standard',
    popular: true,
  },
  {
    id: 'ds-advanced',
    title: 'Advanced ML System',
    description: 'Multi-model interface with evaluation tools',
    priceZAR: 6000,
    priceUSD: 320,
    features: ['Multi-model interface', 'Evaluation & visualization pages', 'Custom algorithm configuration UI'],
    category: 'data-science',
    tier: 'premium',
  },
  {
    id: 'ds-monitoring',
    title: 'Model Monitoring UI',
    description: 'Monitor your ML models in production',
    priceZAR: 900,
    priceUSD: 50,
    features: ['Performance tracking', 'Drift detection UI', 'Alert system'],
    category: 'data-science',
    tier: 'extra',
  },
  {
    id: 'ds-pipeline',
    title: 'Data Pipeline UI',
    description: 'Data pipeline management interface',
    priceZAR: 1500,
    priceUSD: 82,
    features: ['Pipeline visualization', 'Job management UI', 'Status monitoring'],
    category: 'data-science',
    tier: 'extra',
  },

  // Digital Services
  {
    id: 'digital-starter',
    title: 'Starter Branding Pack',
    description: 'Logo and color palette for new brands',
    priceZAR: 850,
    priceUSD: 47,
    features: ['Logo + color palette', 'Brand basics', 'Digital assets'],
    category: 'digital-services',
    tier: 'basic',
  },
  {
    id: 'digital-full',
    title: 'Full Brand Identity',
    description: 'Complete branding package with social media kit',
    priceZAR: 1800,
    priceUSD: 95,
    features: ['Logo set', 'Social media kit', 'Mini style guide'],
    category: 'digital-services',
    tier: 'standard',
    popular: true,
  },
  {
    id: 'digital-landing',
    title: 'Landing Page Build',
    description: 'High-converting landing page design',
    priceZAR: 750,
    priceUSD: 40,
    features: ['Hero section', 'Services showcase', 'CTA + contact'],
    category: 'digital-services',
    tier: 'premium',
  },
  {
    id: 'digital-social',
    title: 'Social Media Analytics UI',
    description: 'Track your social media performance',
    priceZAR: 350,
    priceUSD: 19,
    features: ['Engagement metrics', 'Follower analytics', 'Content performance'],
    category: 'digital-services',
    tier: 'extra',
  },
  {
    id: 'digital-api',
    title: 'API Frontend Integration',
    description: 'Connect your frontend to any API',
    priceZAR: 500,
    priceUSD: 27,
    features: ['API connection UI', 'Data display components', 'Error handling'],
    category: 'digital-services',
    tier: 'extra',
  },
];

export const getProductsByCategory = (category: ProductCategory) => {
  return products.filter((p) => p.category === category);
};

export const getProductById = (id: string) => {
  return products.find((p) => p.id === id);
};
