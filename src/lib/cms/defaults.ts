import type { AboutContent, BrandContent, ContactContent, HomeContent } from "./types";

/**
 * Seed content — this is the REAL Callie X Group copy, carried over from
 * the WordPress theme's `inc/defaults.php` (CX_CMS defaults) so the site
 * is never blank. It's the fallback `scripts/seed-cms.mjs` pushes into
 * Firestore on first run, and what every field in /admin starts from.
 *
 * Image URLs still pointing at images.unsplash.com or blordgroup.ng are
 * PLACEHOLDERS inherited from the old theme (it was hot-linking Blord
 * Group's own site images — see README § Media migration). Replace every
 * one of these through Callie X CMS → the relevant page → image field,
 * which uploads straight to Cloudinary. Nothing else needs to change:
 * the moment a field is edited in /admin it overrides the value below.
 */

const PLACEHOLDER = {
  heroPoster: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80",
  innovation: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
  sky: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
  trucks: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1600&q=80",
  officePortrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
} as const;

export const DEFAULT_BRAND: BrandContent = {
  headerLogoUrl: "/brand/logo-full.svg",
  footerLogoUrl: "/brand/logo-footer.svg",
  faviconUrl: "/brand/favicon.svg",
  headerLogoWidthPx: 160,
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  linkedinUrl: "https://linkedin.com",
  footerSupportEmail: "info@calliexgroup.co",
  footerSupportPhone: "0802 600 0075",
  footerTagline:
    "Callie X Group is a registered Fintech company committed to redefining financial services in Nigeria.",
  copyrightText: "\u00A9 2026 Callie X Group. All Rights Reserved.",
  brandColor: "#0033FF",
};

export const DEFAULT_HOME: HomeContent = {
  hero: {
    bgVideoUrl: "",
    bgPosterUrl: PLACEHOLDER.heroPoster,
    title: "Building Simple Solutions for Complex Problems.",
    subtitle:
      "Callie X Group is a forward-thinking group of companies driving innovation in fintech and real estate, delivering simple, smart solutions that solve complex problems for businesses and individuals.",
    ctaText: "Our Products",
    ctaHref: "/products",
  },
  productsSectionTitle: "Our Products",
  metrics: [
    { id: "metric-0", order: 0, value: "1.9+M", label: "Trusted clients around the globe" },
    { id: "metric-1", order: 1, value: "100%", label: "Verified Properties in real estate" },
    { id: "metric-2", order: 2, value: "99.99%", label: "Uptime Guarantee" },
  ],
  products: [
    { id: "product-0", order: 0, name: "B Cars", logoUrl: "", embedLink: "/products", category: "Real Estate & Auto", tagline: "Automotive Sourcing & Importation", description: "End-to-end verified luxury and commercial vehicle procurement, shipping, and clearing from global hubs.", highlights: "Global procurement|Customs clearance|Verified inspection" },
    { id: "product-1", order: 1, name: "B Homes", logoUrl: "", embedLink: "/products", category: "Real Estate & Auto", tagline: "Prime Real Estate & Property Investments", description: "Verified luxury residential and commercial property development, sales, and land acquisitions across top African cities.", highlights: "100% Verified titles|Prime locations|High-yield ROI" },
    { id: "product-2", order: 2, name: "Billpoint", logoUrl: "", embedLink: "/products", category: "Fintech & Crypto", tagline: "Smart Everyday Payments & Utilities", description: "The all-in-one payment gateway for instant utility bills, airtime recharge, TV subscriptions, and merchant checkout.", highlights: "Instant settlement|Zero downtime|Over 100+ billers" },
    { id: "product-3", order: 3, name: "Bitshop", logoUrl: "", embedLink: "/products", category: "Fintech & Crypto", tagline: "Secure Digital Asset Custody", description: "Institutional-grade digital asset wallet offering frictionless storage, swaps, and multi-chain crypto asset management.", highlights: "Multi-sig security|Instant swaps|Cold-storage backing" },
    { id: "product-4", order: 4, name: "Blunt", logoUrl: "", embedLink: "/products", category: "Lifestyle & Commerce", tagline: "Luxury Apparel & Tech Gadgets", description: "Curated lifestyle brand delivering premium fashion apparel, bespoke accessories, and high-end consumer technology.", highlights: "Authentic luxury|Express delivery|Exclusive drops" },
    { id: "product-5", order: 5, name: "Dolla", logoUrl: "", embedLink: "/products", category: "Fintech & Crypto", tagline: "Cross-Border Remittance & Transfers", description: "Next-gen global financial pipeline powering lightning-fast cross-border fiat transfers, currency exchange, and multi-currency wallets.", highlights: "Competitive FX rates|Global reach|Real-time tracking" },
    { id: "product-6", order: 6, name: "Famous", logoUrl: "", embedLink: "/products", category: "Lifestyle & Commerce", tagline: "Digital Influence & Brand Growth", description: "Strategic digital marketing and social media acceleration platform helping brands and creators achieve exponential reach.", highlights: "Audience growth|Brand strategy|Campaign analytics" },
    { id: "product-7", order: 7, name: "Jetpay", logoUrl: "", embedLink: "/products", category: "Fintech & Crypto", tagline: "High-Volume Crypto Settlement", description: "Seamless cryptocurrency exchange and liquidity provider built for fast, secure crypto-to-fiat transactions and merchant payouts.", highlights: "Over $120M+ yearly volume|Deep liquidity|Automated payouts" },
  ],
  innovation: {
    headlineLine1: "Where Innovation",
    headlineLine2: "Meets Excellence",
    headlineItalic: "Innovation,Excellence",
    body: "At Callie X Group, we redefine the ordinary in fintech, turning innovative ideas into powerful solutions that speak directly to your financial needs.",
    imageUrl: PLACEHOLDER.innovation,
  },
  paymentBand: {
    exploreCta: "EXPLORE POSSIBILITIES",
    manageTitle: "Manage your Payments with Callie X Group.",
    payBillsLabel: "Pay Bills",
    managePayLabel: "Manage Payment Methods",
    mockImage1Url: PLACEHOLDER.sky,
    mockImage2Url: PLACEHOLDER.sky,
    mockImage3Url: PLACEHOLDER.sky,
  },
  bigStats: {
    eyebrowHighlight: "Thousands of users",
    eyebrowSuffix: "have faith in us",
    bgImageUrl: PLACEHOLDER.sky,
    stat1Value: "$120M",
    stat1Label: "Yearly Crypto Transactions",
    stat2Value: "$7M+",
    stat2Label: "Through Dolla App",
    stat3Value: "$10B",
    stat3Label: "Billpoint Operations",
  },
  china: {
    eyebrow: "GLOBAL REACH",
    title: "Callie X Group in China",
    imageUrl: PLACEHOLDER.trucks,
    services: [
      { id: "svc-0", no: "01", title: "Procurement & Sourcing", body: "Connect with trusted suppliers and secure the best prices.", iconKey: "dollar" },
      { id: "svc-1", no: "02", title: "Quality Check", body: "Inspect and verify goods before shipment.", iconKey: "shield" },
      { id: "svc-2", no: "03", title: "Flexible Payment", body: "Pay in Naira, USDT, or BTC.", iconKey: "card" },
      { id: "svc-3", no: "04", title: "Shipping Support", body: "Coordinate packaging and delivery (shipping cost excluded).", iconKey: "ship" },
      { id: "svc-4", no: "05", title: "Car Import Service", body: "Source and ship cars from China to Nigeria with full assistance.", iconKey: "car" },
    ],
  },
  coreFeaturesHeader: {
    eyebrow: "Core Features",
    title: "Features that help you run your business",
    bannerImageUrl: PLACEHOLDER.sky,
  },
  featureSlides: [
    { id: "slide-0", order: 0, title: "Cryptocurrency Exchange", body: "Jetpay offers a seamless, secure way for customers to exchange cryptocurrencies.", imageUrl: PLACEHOLDER.sky, overlayLabel: "CRYPTOCURRENCY EXCHANGE" },
    { id: "slide-1", order: 1, title: "Social Media Growth", body: "Grow your brand presence with tailored strategies for creators and businesses.", imageUrl: PLACEHOLDER.trucks, overlayLabel: "SOCIAL MEDIA GROWTH" },
    { id: "slide-2", order: 2, title: "Secure Payment Processing", body: "Billpoint enables users to handle all essential payments, including airtime and more.", imageUrl: PLACEHOLDER.sky, overlayLabel: "SECURE PAYMENTS" },
    { id: "slide-3", order: 3, title: "Secure Digital Wallet", body: "Bitshop functions as a digital wallet, allowing users to store and manage cryptocurrencies securely.", imageUrl: PLACEHOLDER.trucks, overlayLabel: "DIGITAL WALLET" },
    { id: "slide-4", order: 4, title: "Fintech Solutions", body: "Callie X Group provides a variety of fintech services under one group.", imageUrl: PLACEHOLDER.sky, overlayLabel: "FINTECH" },
    { id: "slide-5", order: 5, title: "User-Centric, Reliable Apps", body: "Callie X Group is committed to customer-centric service and reliability.", imageUrl: PLACEHOLDER.trucks, overlayLabel: "RELIABLE APPS" },
  ],
};

export const DEFAULT_ABOUT: AboutContent = {
  hero: { bgPosterUrl: PLACEHOLDER.heroPoster, title: "About Us" },
  boardEyebrow: "BOARD MEMBERS",
  awardsEyebrow: "Recognition & Awards",
  historyEyebrow: "Our History",
  coreValuesEyebrow: "Our Guiding Principles",
  mission: {
    introTitle: "Our Mission",
    introLine: "At Callie X Group, our mission is to:",
    bullets: [
      "Redefine finance and technology through creative innovation and accessible digital solutions.",
      "Build trusted brands across fintech, real estate, and lifestyle sectors that reflect integrity, excellence, and reliability.",
      "Empower people and communities by creating opportunities, inspiring entrepreneurship, and driving inclusive economic growth.",
      "Bridge the gap between traditional finance and modern technology, making financial freedom possible for everyone.",
    ],
  },
  vision: {
    title: "Our Vision",
    body: "To become Africa's leading technology driven conglomerate, empowering individuals and businesses through innovative financial solutions, sustainable investments, and world class digital experiences that inspire growth and create lasting impact.",
  },
  board: [
    { id: "board-0", order: 0, name: "Linus Williams", role: "CEO", email: "ceo@calliexgroup.com", phone: "+234 801 234 5678", imageUrl: PLACEHOLDER.officePortrait },
    { id: "board-1", order: 1, name: "Ojiosom Clinton", role: "GMD", email: "clintonberrio50@gmail.com", phone: "0916 940 4701", imageUrl: PLACEHOLDER.officePortrait },
    { id: "board-2", order: 2, name: "Akpunonu Blessing Obianuju", role: "General Manager", email: "uju@calliexgroup.co", phone: "+234 802 600 0032", imageUrl: PLACEHOLDER.officePortrait },
  ],
  team: {
    title: "The Callie X Group Team",
    images: [PLACEHOLDER.team, PLACEHOLDER.team, PLACEHOLDER.team],
  },
  awards: {
    sectionTitle: "Awards & ",
    accentWord: "Philanthropy",
    subtitle: "Recognized for excellence in fintech innovation while making meaningful contributions to our communities.",
    items: [
      { title: "Recognition Award to CEO", subtitle: "Callie X", imageUrl: PLACEHOLDER.officePortrait },
      { title: "Youth Influencer of the Year", subtitle: "Callie X", imageUrl: PLACEHOLDER.officePortrait },
      { title: "Distinguished Achievements", subtitle: "Callie X", imageUrl: PLACEHOLDER.officePortrait },
    ],
  },
  history: {
    title: "A Journey of Innovation & Impact",
    lead: "Since 2019, our story has been one of bold ideas, enduring values, and a relentless pursuit of progress that uplifts communities.",
    imageUrl: PLACEHOLDER.trucks,
    bodyHtml:
      "<p>Founded in 2019, Callie X Group is a leading Nigerian fintech and investment company driven by innovation, integrity, and a vision to empower lives through technology and enterprise.</p><p>Established under visionary leadership, the company began as a cryptocurrency trading firm and has since evolved into a diversified business group with interests spanning fintech, real estate, luxury gadgets, automobiles, and lifestyle solutions.</p><p>Today, Callie X Group continues to redefine possibilities through innovation, excellence, and strategic growth.</p>",
  },
  coreValues: {
    introTitle: "Core Values That Define Us",
    introBody:
      "We are driven by integrity, innovation, and excellence \u2014 values that shape our culture, guide our decisions, and inspire us to create lasting impact.",
    items: [
      { title: "Integrity", body: "We operate with honesty, transparency, and accountability in all our dealings." },
      { title: "Innovation", body: "We constantly push boundaries to deliver smarter, faster, and more efficient solutions." },
      { title: "Excellence", body: "We set high standards and consistently strive to exceed expectations." },
      { title: "Empowerment", body: "We believe in creating opportunities that uplift people and strengthen communities." },
    ],
  },
};

export const DEFAULT_CONTACT: ContactContent = {
  hero: {
    bgPosterUrl: PLACEHOLDER.heroPoster,
    title: "Get in Touch",
    locationsEyebrow: "Our Locations",
    locationsTitle: "Visit Our Offices",
    locationsSubtitle: "We have offices across Nigeria and China to serve you better. Get in touch with any of our locations.",
  },
  offices: [
    { id: "office-0", order: 0, name: "Callie X Group Head Office", badge: "HQ", city: "Awka", country: "Nigeria", address: "No 29 Dr Okey Anueyiagu Road, along Regina Road, Awka.", phone: "+234 802 500 0083", email: "info@calliexgroup.co" },
    { id: "office-1", order: 1, name: "Abuja Branch", badge: "", city: "Abuja", country: "Nigeria", address: "Aminu Kano Crescent, GCL Plaza", phone: "", email: "" },
    { id: "office-2", order: 2, name: "Lagos Branch", badge: "", city: "Lagos", country: "Nigeria", address: "Suite 5, Casa Kaysora, Plot 8 Adewunmi Drive, Lekki Phase 1, Lagos", phone: "+234 703 491 6751", email: "info@calliexgroup.co" },
    { id: "office-3", order: 3, name: "Port Harcourt Branch", badge: "", city: "Rivers", country: "Nigeria", address: "No 30 Sani Abacha Road, The Autograph Mall", phone: "+234 813 293 6753", email: "info@calliexgroup.co" },
    { id: "office-4", order: 4, name: "Asaba Branch", badge: "", city: "Delta", country: "Nigeria", address: "Suite 48, First Edition Plaza, opposite SPC, Nnebisi Road, Asaba, Delta State", phone: "+234 816 380 2690", email: "info@calliexgroup.co" },
    { id: "office-5", order: 5, name: "Benin Branch", badge: "", city: "Edo", country: "Nigeria", address: "55 Akenzua Street, off Airport Road, by Brother Pius School", phone: "+234 707 859 0603", email: "info@calliexgroup.co" },
    { id: "office-6", order: 6, name: "Callie X Group China", badge: "INT", city: "Guangzhou", country: "China", address: "Office 5106, Floor 5, GuoTai International Trade Market, Yuexiu District, Guangzhou, China", phone: "+234 802 500 0044", email: "calliexchina@gmail.com" },
  ],
  newsletter: {
    sectionEyebrow: "Stay Connected",
    title: "Subscribe to our newsletter!",
    body: "Get the latest updates on our services, news, and exclusive offers delivered to your inbox.",
    successTitle: "Thank you!",
    successMessage: "You've been subscribed to our newsletter. We'll keep you posted.",
  },
};
