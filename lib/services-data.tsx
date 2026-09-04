import type { ReactNode } from "react";

export type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: string;
  tone: string;
  features: string[];
  deliverables: string[];
};

export const serviceIcons: Record<string, ReactNode> = {
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </>
  ),
  phone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </>
  ),
  cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  grid: (
    <>
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  chart: (
    <>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    tagline: "Tailor-made systems",
    description: "Web, desktop and SaaS applications engineered for the way your business works.",
    longDescription:
      "Off-the-shelf software rarely fits a growing business. We design and build bespoke solutions around your workflows — automating processes, removing manual work, and scaling exactly when you do. From discovery to deployment, one accountable team owns the outcome.",
    icon: "code",
    tone: "from-indigo-500 to-blue-600",
    features: ["Requirements & domain analysis", "Modular, maintainable architecture", "Integrations with existing tools", "Scalable cloud-native builds"],
    deliverables: ["Custom web & SaaS applications", "Desktop tools & internal platforms", "Automation & workflow systems", "Technical documentation & handover"],
  },
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    tagline: "Websites that convert",
    description: "Corporate sites and platforms with modern UX and solid SEO foundations.",
    longDescription:
      "Your website is your hardest-working salesperson. We craft fast, accessible, conversion-focused websites — from brand-led corporate sites to full e-commerce builds — engineered to rank, load fast, and turn visitors into customers.",
    icon: "monitor",
    tone: "from-fuchsia-500 to-pink-600",
    features: ["UX/UI & brand-aligned design", "Responsive, accessible front-end", "SEO & performance optimisation", "CMS & easy content editing"],
    deliverables: ["Corporate & marketing websites", "E-commerce & booking platforms", "CMS portals", "Analytics & conversion tracking"],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Native & cross-platform",
    description: "iOS & Android apps built for scale, performance and great UX.",
    longDescription:
      "Reach your users wherever they are. We build native and cross-platform mobile apps that feel fast and intuitive, backed by solid APIs, offline support, and app-store-ready polish — from MVP to full-scale product.",
    icon: "phone",
    tone: "from-amber-500 to-orange-600",
    features: ["iOS, Android & cross-platform", "Product & UX strategy", "Secure APIs & cloud sync", "App Store / Play Store launch"],
    deliverables: ["Consumer & enterprise apps", "Field-force & delivery apps", "Dashboards & internal tools", "MVP to production releases"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "AWS · Azure · GCP",
    description: "Migration, architecture and CI/CD on AWS, Azure & GCP.",
    longDescription:
      "Move faster and pay for what you use. We architect secure, cost-optimised cloud infrastructure, automate deployments with CI/CD pipelines, and modernise legacy systems — so your platform is reliable, observable and ready to scale.",
    icon: "cloud",
    tone: "from-sky-500 to-cyan-600",
    features: ["Cloud migration & architecture", "CI/CD & Infrastructure-as-Code", "Kubernetes & containerisation", "Cost optimisation & monitoring"],
    deliverables: ["Managed cloud environments", "Automated deployment pipelines", "Disaster recovery & backups", "SLO / observability dashboards"],
  },
  // {
  //   slug: "cybersecurity-networking",
  //   title: "Cybersecurity & Networking",
  //   tagline: "Protect and connect",
  //   description: "Network design, firewalls, endpoint security & 24/7 monitoring.",
  //   longDescription:
  //     "Security is not a feature — it's a foundation. We design resilient networks, harden endpoints, configure firewalls, and monitor threats around the clock, giving you the confidence to focus on growth without worrying about breaches.",
  //   icon: "shield",
  //   tone: "from-emerald-500 to-teal-600",
  //   features: ["Network design & deployment", "Firewall & VPN configuration", "Endpoint protection & EDR", "24/7 threat monitoring"],
  //   deliverables: ["Secure network architecture", "Security audits & compliance", "Incident response plans", "Managed detection & response"],
  // },
  {
    slug: "erp-crm-systems",
    title: "ERP, CRM & Business Systems",
    tagline: "Run leaner",
    description: "Integrated ERP, CRM and workflow automation for smarter operations.",
    longDescription:
      "Connect your sales, HR, inventory and finance in one view. We implement, customise and integrate ERP & CRM systems — and automate the workflows between them — so your teams stop toggling between tools and start making decisions faster.",
    icon: "grid",
    tone: "from-violet-500 to-purple-600",
    features: ["ERP & CRM selection & rollout", "Customisation & module builds", "Business process automation", "Data migration & training"],
    deliverables: ["Configured ERP/CRM stacks", "Sales-force & HR automation", "Integration middleware", "Team training & playbooks"],
  },

  {
    slug: "it-support-amc",
    title: "IT Support & AMC",
    tagline: "Always-on support",
    description: "On-site and remote support, AMC and managed services.",
    longDescription:
      "Keep the lights on and the business moving. Our team provides responsive on-site and remote support, annual maintenance contracts, and fully managed services — so every desk, server and application just works, without you chasing vendors.",
    icon: "wrench",
    tone: "from-lime-500 to-green-600",
    features: ["Helpdesk & remote support", "Annual maintenance contracts", "Hardware & server upkeep", "Backups & updates management"],
    deliverables: ["SLA-backed support", "Preventive maintenance", "Vendor management", "Asset & ticket tracking"],
  },
];
