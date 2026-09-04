// Curated fallback data used by route handlers when the live PostgreSQL
// database is not reachable (e.g. the static preview environment).

export const services = [
  {
    id: "svc-custom-software",
    slug: "custom-software-development",
    title: "Custom Software Development",
    tagline: "Tailor-made systems",
    description:
      "Tailor-made web, desktop and SaaS applications engineered to fit the way your business actually works.",
    icon: "code",
    active: true,
    sortOrder: 1,
  },
  {
    id: "svc-web",
    slug: "website-design-development",
    title: "Website Design & Development",
    tagline: "Websites that convert",
    description:
      "High-performing corporate sites, e-commerce and web platforms with modern UX and rock-solid SEO foundations.",
    icon: "monitor",
    active: true,
    sortOrder: 2,
  },
  {
    id: "svc-mobile",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Native & cross-platform",
    description:
      "Native and cross-platform iOS & Android apps built for scale, performance and delightful user experiences.",
    icon: "phone",
    active: true,
    sortOrder: 3,
  },
  // {
  //   id: "svc-cloud",
  //   slug: "cloud-devops",
  //   title: "Cloud & DevOps",
  //   tagline: "AWS · Azure · GCP",
  //   description:
  //     "Cloud migration, architecture and CI/CD automation on AWS, Azure & GCP — reliable, secure and cost-optimised.",
  //   icon: "cloud",
  //   active: true,
  //   sortOrder: 4,
  // },
  // {
  //   id: "svc-security",
  //   slug: "cybersecurity-networking",
  //   title: "Cybersecurity & Networking",
  //   tagline: "Protect and connect",
  //   description:
  //     "End-to-end network design, firewall configuration, endpoint security and 24/7 threat monitoring for peace of mind.",
  //   icon: "shield",
  //   active: true,
  //   sortOrder: 5,
  // },
  {
    id: "svc-erp",
    slug: "erp-crm-systems",
    title: "ERP, CRM & Business Systems",
    tagline: "Run leaner",
    description:
      "Streamline sales, HR, inventory and finance with integrated ERP, CRM and workflow automation solutions.",
    icon: "grid",
    active: true,
    sortOrder: 6,
  },
  // {
  //   id: "svc-ai",
  //   slug: "ai-data-analytics",
  //   title: "AI, Data & Analytics",
  //   tagline: "Decisions from data",
  //   description:
  //     "Turn data into decisions with dashboards, machine learning pipelines and AI-powered automation tailored to your KPIs.",
  //   icon: "chart",
  //   active: true,
  //   sortOrder: 7,
  // },
  // {
  //   id: "svc-support",
  //   slug: "it-support-amc",
  //   title: "IT Support & AMC",
  //   tagline: "Always-on support",
  //   description:
  //     "Reliable on-site and remote IT support, annual maintenance contracts and managed services that keep you running.",
  //   icon: "wrench",
  //   active: true,
  //   sortOrder: 8,
  // },
];

export const portfolioItems = [
  {
    id: "pf-nima-ams",
    title: "NIMA Association Management System",
    category: "Association Platform",
    description:
      "Complete digital ecosystem for Nashik Industries & Manufacturers Association — member directory, events, renewals, payments and push notifications across mobile and web.",
    image: null,
    link: null,
    active: true,
    sortOrder: 1,
  },
  {
    id: "pf-corporate-web",
    title: "Corporate Website & Booking Platform",
    category: "Web Development",
    description:
      "High-performing corporate site with online booking, CMS-driven content and SEO foundations that turn visitors into customers.",
    image: null,
    link: null,
    active: true,
    sortOrder: 2,
  },
  {
    id: "pf-erp-retail",
    title: "Retail ERP & Inventory Suite",
    category: "ERP / CRM",
    description:
      "Integrated billing, inventory and reporting suite deployed across multiple retail branches with role-based access.",
    image: null,
    link: null,
    active: true,
    sortOrder: 3,
  },
];

export const teamMembers = [
  {
    id: "tm-rohit-pawar",
    name: "Rohit Pawar",
    role: "Founder & Director",
    image: "/Rohit_Pawar.png",
    tone: "from-indigo-500 to-blue-600",
    message:
      "Rohit Pawar is the Director of NextGen Mahatech, focused on driving business growth through innovation, technology, and strategic partnerships. With an entrepreneurial mindset and a passion for digital transformation, he is committed to delivering practical and innovative solutions that create long-term value for clients and businesses.",
    quote: "Innovation, Technology & Growth — Building Solutions for a Better Future.",
    extendedMessage: null,
    vision: null,
    leadership: null,
    closing: null,
    active: true,
    sortOrder: 1,
  },
  {
    id: "tm-kailash-wagh",
    name: "Kailash Wagh",
    role: "Founder & Director",
    image: "/Kailash.png",
    tone: "from-fuchsia-500 to-pink-600",
    message:
      "As the Founder and Director of NextGen Maha Tech, I am excited to build next-generation, technology-driven solutions that simplify, strengthen, and enhance the way associations are managed.",
    quote: null,
    extendedMessage:
      "At NextGen Maha Tech we focus on creating innovative, smart, and scalable Association Management Solutions tailored to the evolving needs of modern organizations. Our mission is to empower associations with technology that streamlines operations, boosts member engagement, improves communication, and facilitates better decision-making.",
    vision:
      "I believe that technology’s role goes beyond merely automating processes—it should also foster meaningful relationships and create new opportunities for growth. With this vision, we have developed a future-ready platform that integrates digital innovation, operational efficiency, and user-centric design.",
    leadership:
      "As a leader, I am dedicated to driving innovation, building strong partnerships, and delivering solutions that provide real, measurable value to our clients. Our goal is to establish NextGen Maha Tech as a trusted technology partner for associations looking to embrace digital transformation and prepare for the future.",
    closing: "We are not just building software; we are shaping the next generation of association management.",
    active: true,
    sortOrder: 2,
  },
];

export const testimonials = [
  {
    id: "t1",
    client: "Rahul Deshmukh",
    role: "Operations Director, Manufacturing SME",
    quote:
      "NextGen Mahatech rebuilt our order-management platform from scratch. Delivery was on-time, communication was excellent, and our operations run 40% faster today.",
    rating: 5,
  },
  {
    id: "t2",
    client: "Sneha Patil",
    role: "CEO, Retail Chain (Nashik)",
    quote:
      "Their team designed and deployed our entire IT and network infrastructure across three branches. Truly a one-stop technology partner.",
    rating: 5,
  },
  {
    id: "t3",
    client: "Amit Joshi",
    role: "Founder, Logistics Startup",
    quote:
      "From ERP customisation to ongoing AMC support, they handle it all. Response times are quick and the engineers actually understand our business.",
    rating: 5,
  },
];
