/**
 * Callie X Group — CMS content types.
 *
 * Every field a human can edit in /admin lives here. This is the single
 * source of truth: the Firestore documents in `content/{page}` are shaped
 * exactly like these types, the admin editor renders forms from the
 * SCHEMAS config (schema.ts) that's built on top of these types, and the
 * public pages read them straight — nothing on the front end is hardcoded
 * copy or a hardcoded image URL.
 */

export interface Metric {
  id: string;
  order: number;
  value: string;
  label: string;
}

export type ProductCategory = "Fintech & Crypto" | "Real Estate & Auto" | "Lifestyle & Commerce";

export interface Product {
  id: string;
  order: number;
  name: string;
  logoUrl: string;
  embedLink: string;
  /** Must match one of ProductCategory exactly — used to power the catalog filter tabs. */
  category: ProductCategory;
  tagline: string;
  description: string;
  /** Pipe-separated, e.g. "Instant settlement|Zero downtime|Over 100+ billers" — same
   *  delimited-string convention already used by innovation.headlineItalic below. */
  highlights: string;
}

export interface ChinaService {
  id: string;
  no: string;
  title: string;
  body: string;
  iconKey: "dollar" | "shield" | "card" | "ship" | "car";
}

export interface FeatureSlide {
  id: string;
  order: number;
  title: string;
  body: string;
  imageUrl: string;
  overlayLabel: string;
}

export interface BoardMember {
  id: string;
  order: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  imageUrl: string;
  hoverCardExtra?: string;
}

export interface AwardItem {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface CoreValueItem {
  title: string;
  body: string;
}

export interface Office {
  id: string;
  order: number;
  name: string;
  badge?: string;
  city: string;
  country: string;
  address: string;
  phone?: string;
  email?: string;
}

/** content/brand */
export interface BrandContent {
  headerLogoUrl: string;
  footerLogoUrl: string;
  faviconUrl: string;
  headerLogoWidthPx: number;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  footerSupportEmail: string;
  footerSupportPhone: string;
  footerTagline: string;
  copyrightText: string;
  brandColor: string;
}

/** content/home */
export interface HomeContent {
  hero: {
    bgVideoUrl: string;
    bgPosterUrl: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
  };
  productsSectionTitle: string;
  metrics: Metric[];
  products: Product[];
  innovation: {
    headlineLine1: string;
    headlineLine2: string;
    headlineItalic: string;
    body: string;
    imageUrl: string;
  };
  paymentBand: {
    exploreCta: string;
    manageTitle: string;
    payBillsLabel: string;
    managePayLabel: string;
    mockImage1Url: string;
    mockImage2Url: string;
    mockImage3Url: string;
  };
  bigStats: {
    eyebrowHighlight: string;
    eyebrowSuffix: string;
    bgImageUrl: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  china: {
    eyebrow: string;
    title: string;
    imageUrl: string;
    services: ChinaService[];
  };
  coreFeaturesHeader: {
    eyebrow: string;
    title: string;
    bannerImageUrl: string;
  };
  featureSlides: FeatureSlide[];
}

/** content/about */
export interface AboutContent {
  hero: {
    bgPosterUrl: string;
    title: string;
  };
  boardEyebrow: string;
  awardsEyebrow: string;
  historyEyebrow: string;
  coreValuesEyebrow: string;
  mission: {
    introTitle: string;
    introLine: string;
    bullets: string[];
  };
  vision: {
    title: string;
    body: string;
  };
  board: BoardMember[];
  team: {
    title: string;
    images: string[];
  };
  awards: {
    sectionTitle: string;
    accentWord: string;
    subtitle: string;
    items: AwardItem[];
  };
  history: {
    title: string;
    lead: string;
    imageUrl: string;
    bodyHtml: string;
  };
  coreValues: {
    introTitle: string;
    introBody: string;
    items: CoreValueItem[];
  };
}

/** content/contact */
export interface ContactContent {
  hero: {
    bgPosterUrl: string;
    title: string;
    locationsEyebrow: string;
    locationsTitle: string;
    locationsSubtitle: string;
  };
  offices: Office[];
  newsletter: {
    sectionEyebrow: string;
    title: string;
    body: string;
    successTitle: string;
    successMessage: string;
  };
}

export type PageKey = "home" | "about" | "contact" | "brand";

export interface ContentMap {
  home: HomeContent;
  about: AboutContent;
  contact: ContactContent;
  brand: BrandContent;
}

export interface NewsletterSubscriber {
  email: string;
  createdAt: string;
  source: string;
}
