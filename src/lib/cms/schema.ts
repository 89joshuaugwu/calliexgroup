import type { PageKey } from "./types";

/**
 * Schema-driven admin forms.
 *
 * Instead of hand-building a bespoke React form for every one of Callie X
 * Group's ~30 editable content blocks, every page's editable shape is
 * described ONCE here. <SchemaPageEditor> (components/admin) reads this
 * config and renders the right input for each field, including add/
 * remove/reorder for repeating rows (metrics, board members, offices...).
 *
 * Field `key` is a full dot-path into that page's content document, e.g.
 * "hero.title" or "china.services". Whole-array fields (metrics, offices,
 * board, products, featureSlides, china.services) are edited as a single
 * "repeater-object" field so add/remove/reorder works generically.
 */

export type FieldType = "text" | "textarea" | "richtext" | "image" | "url" | "color";

export interface TextFieldSchema {
  type: FieldType;
  key: string;
  label: string;
  hint?: string;
}

export interface ObjectRepeaterFieldSchema {
  type: "repeater-object";
  key: string;
  label: string;
  hint?: string;
  itemTitle: (item: Record<string, unknown>, index: number) => string;
  fields: TextFieldSchema[];
  emptyItem: () => Record<string, unknown>;
  maxItems?: number;
}

export interface StringRepeaterFieldSchema {
  type: "repeater-string";
  key: string;
  label: string;
  hint?: string;
  itemLabel: string;
}

export type FieldSchema = TextFieldSchema | ObjectRepeaterFieldSchema | StringRepeaterFieldSchema;

export interface SectionSchema {
  id: string;
  title: string;
  description?: string;
  fields: FieldSchema[];
}

export interface PageSchema {
  pageKey: PageKey;
  label: string;
  intro: string;
  sections: SectionSchema[];
}

const idNow = (prefix: string) => `${prefix}-${Date.now().toString(36)}`;

// ─────────────────────────────────────────────── HOME ──

export const HOME_SCHEMA: PageSchema = {
  pageKey: "home",
  label: "Home",
  intro: "The landing page: hero, products, innovation banner, payment band, stats, China desk, and feature slides.",
  sections: [
    {
      id: "hero",
      title: "Hero",
      description: "Full-bleed section visitors see first. Video (if set) plays over the poster image.",
      fields: [
        { type: "text", key: "hero.title", label: "Headline" },
        { type: "textarea", key: "hero.subtitle", label: "Subheadline (typewriter effect)" },
        { type: "text", key: "hero.ctaText", label: "Button text" },
        { type: "url", key: "hero.ctaHref", label: "Button link" },
        { type: "image", key: "hero.bgPosterUrl", label: "Background poster image", hint: "1920\u00d71080 or larger, 16:9" },
        { type: "url", key: "hero.bgVideoUrl", label: "Background video URL (optional, MP4/WebM)", hint: "Leave blank to use the poster image only" },
      ],
    },
    {
      id: "metrics",
      title: "Hero metrics",
      description: "The bordered stat cells overlaid on the hero video.",
      fields: [
        {
          type: "repeater-object",
          key: "metrics",
          label: "Metrics",
          itemTitle: (item) => `${item.value ?? ""} \u2014 ${item.label ?? ""}`,
          fields: [
            { type: "text", key: "value", label: "Value (e.g. 1.9+M)" },
            { type: "text", key: "label", label: "Label" },
          ],
          emptyItem: () => ({ id: idNow("metric"), order: 0, value: "", label: "" }),
        },
      ],
    },
    {
      id: "products",
      title: "Products grid",
      description: "The portfolio-company grid (B Cars, Dolla, Jetpay, etc). Each card links to /products, and the same data powers the full catalog cards on the Products page.",
      fields: [
        { type: "text", key: "productsSectionTitle", label: "Section title" },
        {
          type: "repeater-object",
          key: "products",
          label: "Products",
          itemTitle: (item) => String(item.name ?? "Untitled product"),
          fields: [
            { type: "text", key: "name", label: "Product name" },
            { type: "image", key: "logoUrl", label: "Logo (square, transparent PNG)" },
            { type: "url", key: "embedLink", label: "Link" },
            { type: "text", key: "category", label: "Category", hint: "Must be exactly: Fintech & Crypto, Real Estate & Auto, or Lifestyle & Commerce — powers the catalog filter tabs" },
            { type: "text", key: "tagline", label: "Tagline" },
            { type: "textarea", key: "description", label: "Description" },
            { type: "text", key: "highlights", label: "Highlights", hint: "Up to 3 short phrases separated by | — e.g. Instant settlement|Zero downtime|Over 100+ billers" },
          ],
          emptyItem: () => ({
            id: idNow("product"),
            order: 0,
            name: "",
            logoUrl: "",
            embedLink: "/products",
            category: "Fintech & Crypto",
            tagline: "",
            description: "",
            highlights: "",
          }),
        },
      ],
    },
    {
      id: "innovation",
      title: "Innovation banner",
      fields: [
        { type: "text", key: "innovation.headlineLine1", label: "Headline \u2014 line 1" },
        { type: "text", key: "innovation.headlineLine2", label: "Headline \u2014 line 2" },
        { type: "text", key: "innovation.headlineItalic", label: "Word(s) to italicize", hint: "Comma-separated, must match text in the two lines above" },
        { type: "textarea", key: "innovation.body", label: "Body copy" },
        { type: "image", key: "innovation.imageUrl", label: "Banner image", hint: "16:9, ~1600px wide" },
      ],
    },
    {
      id: "paymentBand",
      title: "Payment band",
      description: "Three-image layered visual (static portrait + two sliding cards).",
      fields: [
        { type: "text", key: "paymentBand.exploreCta", label: "Eyebrow (e.g. EXPLORE POSSIBILITIES)" },
        { type: "text", key: "paymentBand.manageTitle", label: "Title" },
        { type: "text", key: "paymentBand.payBillsLabel", label: "Card 1 label" },
        { type: "text", key: "paymentBand.managePayLabel", label: "Card 2 label" },
        { type: "image", key: "paymentBand.mockImage1Url", label: "Image 1 \u2014 background portrait (static)", hint: "600\u00d7800, 3:4" },
        { type: "image", key: "paymentBand.mockImage2Url", label: "Image 2 \u2014 slides in on scroll", hint: "400\u00d7200, 2:1" },
        { type: "image", key: "paymentBand.mockImage3Url", label: "Image 3 \u2014 slides in on scroll", hint: "400\u00d7200, 2:1" },
      ],
    },
    {
      id: "bigStats",
      title: "Big stats band",
      fields: [
        { type: "text", key: "bigStats.eyebrowHighlight", label: "Eyebrow \u2014 highlighted part" },
        { type: "text", key: "bigStats.eyebrowSuffix", label: "Eyebrow \u2014 remainder" },
        { type: "image", key: "bigStats.bgImageUrl", label: "Background image" },
        { type: "text", key: "bigStats.stat1Value", label: "Stat 1 value" },
        { type: "text", key: "bigStats.stat1Label", label: "Stat 1 label" },
        { type: "text", key: "bigStats.stat2Value", label: "Stat 2 value" },
        { type: "text", key: "bigStats.stat2Label", label: "Stat 2 label" },
        { type: "text", key: "bigStats.stat3Value", label: "Stat 3 value" },
        { type: "text", key: "bigStats.stat3Label", label: "Stat 3 label" },
      ],
    },
    {
      id: "china",
      title: "China desk",
      fields: [
        { type: "text", key: "china.eyebrow", label: "Eyebrow" },
        { type: "text", key: "china.title", label: "Title" },
        { type: "image", key: "china.imageUrl", label: "Image" },
        {
          type: "repeater-object",
          key: "china.services",
          label: "Services (shown in order, numbered)",
          itemTitle: (item) => `${item.no ?? ""}. ${item.title ?? ""}`,
          fields: [
            { type: "text", key: "no", label: "Number (e.g. 01)" },
            { type: "text", key: "title", label: "Title" },
            { type: "textarea", key: "body", label: "Description" },
          ],
          emptyItem: () => ({ id: idNow("svc"), no: "0", title: "", body: "", iconKey: "dollar" }),
        },
      ],
    },
    {
      id: "coreFeaturesHeader",
      title: "Core features header",
      fields: [
        { type: "text", key: "coreFeaturesHeader.eyebrow", label: "Eyebrow" },
        { type: "text", key: "coreFeaturesHeader.title", label: "Title" },
        { type: "image", key: "coreFeaturesHeader.bannerImageUrl", label: "Banner image" },
      ],
    },
    {
      id: "featureSlides",
      title: "Feature slides",
      description: "Full-bleed scrolling cards after the core features header.",
      fields: [
        {
          type: "repeater-object",
          key: "featureSlides",
          label: "Slides",
          itemTitle: (item) => String(item.title ?? "Untitled slide"),
          fields: [
            { type: "text", key: "title", label: "Title" },
            { type: "textarea", key: "body", label: "Body copy" },
            { type: "image", key: "imageUrl", label: "Background image" },
            { type: "text", key: "overlayLabel", label: "Overlay label (small caps text)" },
          ],
          emptyItem: () => ({ id: idNow("slide"), order: 0, title: "", body: "", imageUrl: "", overlayLabel: "" }),
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────── ABOUT ──

export const ABOUT_SCHEMA: PageSchema = {
  pageKey: "about",
  label: "About",
  intro: "Mission, vision, board, team, awards, history, and core values.",
  sections: [
    {
      id: "hero",
      title: "Hero",
      fields: [
        { type: "text", key: "hero.title", label: "Headline" },
        { type: "image", key: "hero.bgPosterUrl", label: "Background image" },
      ],
    },
    {
      id: "labels",
      title: "Section labels",
      description: "Small eyebrow text above each section below.",
      fields: [
        { type: "text", key: "boardEyebrow", label: "Board section eyebrow" },
        { type: "text", key: "awardsEyebrow", label: "Awards section eyebrow" },
        { type: "text", key: "historyEyebrow", label: "History section eyebrow" },
        { type: "text", key: "coreValuesEyebrow", label: "Core values eyebrow" },
      ],
    },
    {
      id: "mission",
      title: "Mission",
      fields: [
        { type: "text", key: "mission.introTitle", label: "Title" },
        { type: "text", key: "mission.introLine", label: "Intro line" },
        {
          type: "repeater-string",
          key: "mission.bullets",
          label: "Mission bullets",
          itemLabel: "Bullet",
        },
      ],
    },
    {
      id: "vision",
      title: "Vision",
      fields: [
        { type: "text", key: "vision.title", label: "Title" },
        { type: "textarea", key: "vision.body", label: "Body copy" },
      ],
    },
    {
      id: "board",
      title: "Board members",
      description: "Tap-to-reveal cards with contact details.",
      fields: [
        {
          type: "repeater-object",
          key: "board",
          label: "Board members",
          itemTitle: (item) => `${item.name ?? "Untitled"} \u2014 ${item.role ?? ""}`,
          fields: [
            { type: "text", key: "name", label: "Name" },
            { type: "text", key: "role", label: "Role" },
            { type: "text", key: "email", label: "Email" },
            { type: "text", key: "phone", label: "Phone" },
            { type: "image", key: "imageUrl", label: "Portrait photo", hint: "600\u00d7800 portrait" },
            { type: "text", key: "hoverCardExtra", label: "Extra note (optional)" },
          ],
          emptyItem: () => ({
            id: idNow("board"),
            order: 0,
            name: "",
            role: "",
            email: "",
            phone: "",
            imageUrl: "",
            hoverCardExtra: "",
          }),
        },
      ],
    },
    {
      id: "team",
      title: "Team photos",
      fields: [
        { type: "text", key: "team.title", label: "Section title" },
        {
          type: "repeater-string",
          key: "team.images",
          label: "Team photos",
          itemLabel: "Photo URL",
        },
      ],
    },
    {
      id: "awards",
      title: "Awards & Philanthropy",
      fields: [
        { type: "text", key: "awards.sectionTitle", label: "Title (first part)" },
        { type: "text", key: "awards.accentWord", label: "Title (accent word)" },
        { type: "textarea", key: "awards.subtitle", label: "Subtitle" },
        {
          type: "repeater-object",
          key: "awards.items",
          label: "Award items",
          itemTitle: (item) => String(item.title ?? "Untitled award"),
          fields: [
            { type: "text", key: "title", label: "Title" },
            { type: "text", key: "subtitle", label: "Subtitle" },
            { type: "image", key: "imageUrl", label: "Image" },
          ],
          emptyItem: () => ({ title: "", subtitle: "Callie X", imageUrl: "" }),
        },
      ],
    },
    {
      id: "history",
      title: "History",
      fields: [
        { type: "text", key: "history.title", label: "Title" },
        { type: "textarea", key: "history.lead", label: "Lead paragraph" },
        { type: "image", key: "history.imageUrl", label: "Image" },
        { type: "richtext", key: "history.bodyHtml", label: "Body (rich text)" },
      ],
    },
    {
      id: "coreValues",
      title: "Core values",
      fields: [
        { type: "text", key: "coreValues.introTitle", label: "Title" },
        { type: "textarea", key: "coreValues.introBody", label: "Intro copy" },
        {
          type: "repeater-object",
          key: "coreValues.items",
          label: "Values",
          itemTitle: (item) => String(item.title ?? "Untitled value"),
          fields: [
            { type: "text", key: "title", label: "Title" },
            { type: "textarea", key: "body", label: "Description" },
          ],
          emptyItem: () => ({ title: "", body: "" }),
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────── CONTACT ──

export const CONTACT_SCHEMA: PageSchema = {
  pageKey: "contact",
  label: "Contact",
  intro: "Office locations and the newsletter signup box.",
  sections: [
    {
      id: "hero",
      title: "Hero",
      fields: [
        { type: "text", key: "hero.title", label: "Headline" },
        { type: "image", key: "hero.bgPosterUrl", label: "Background image" },
        { type: "text", key: "hero.locationsEyebrow", label: "Locations eyebrow" },
        { type: "text", key: "hero.locationsTitle", label: "Locations title" },
        { type: "textarea", key: "hero.locationsSubtitle", label: "Locations subtitle" },
      ],
    },
    {
      id: "offices",
      title: "Offices",
      fields: [
        {
          type: "repeater-object",
          key: "offices",
          label: "Offices",
          itemTitle: (item) => `${item.name ?? "Untitled office"} (${item.city ?? ""})`,
          fields: [
            { type: "text", key: "name", label: "Office name" },
            { type: "text", key: "badge", label: "Badge (e.g. HQ, INT) \u2014 optional" },
            { type: "text", key: "city", label: "City" },
            { type: "text", key: "country", label: "Country" },
            { type: "textarea", key: "address", label: "Address" },
            { type: "text", key: "phone", label: "Phone \u2014 optional" },
            { type: "text", key: "email", label: "Email \u2014 optional" },
          ],
          emptyItem: () => ({
            id: idNow("office"),
            order: 0,
            name: "",
            badge: "",
            city: "",
            country: "Nigeria",
            address: "",
            phone: "",
            email: "",
          }),
        },
      ],
    },
    {
      id: "newsletter",
      title: "Newsletter box",
      fields: [
        { type: "text", key: "newsletter.sectionEyebrow", label: "Eyebrow" },
        { type: "text", key: "newsletter.title", label: "Title" },
        { type: "textarea", key: "newsletter.body", label: "Body copy" },
        { type: "text", key: "newsletter.successTitle", label: "Success title" },
        { type: "textarea", key: "newsletter.successMessage", label: "Success message" },
      ],
    },
  ],
};

// ─────────────────────────────────────────────── BRAND ──

export const BRAND_SCHEMA: PageSchema = {
  pageKey: "brand",
  label: "Brand",
  intro: "Global settings used across every page \u2014 logos, socials, and footer.",
  sections: [
    {
      id: "logos",
      title: "Logos & favicon",
      fields: [
        { type: "image", key: "headerLogoUrl", label: "Header logo (SVG or transparent PNG)" },
        { type: "image", key: "footerLogoUrl", label: "Footer logo" },
        { type: "image", key: "faviconUrl", label: "Favicon" },
      ],
    },
    {
      id: "social",
      title: "Social links",
      fields: [
        { type: "url", key: "facebookUrl", label: "Facebook URL" },
        { type: "url", key: "instagramUrl", label: "Instagram URL" },
        { type: "url", key: "linkedinUrl", label: "LinkedIn URL" },
      ],
    },
    {
      id: "footer",
      title: "Footer",
      fields: [
        { type: "text", key: "footerSupportEmail", label: "Support email" },
        { type: "text", key: "footerSupportPhone", label: "Support phone" },
        { type: "textarea", key: "footerTagline", label: "Footer tagline" },
        { type: "text", key: "copyrightText", label: "Copyright line" },
        { type: "color", key: "brandColor", label: "Brand color" },
      ],
    },
  ],
};

export const PAGE_SCHEMAS: Record<PageKey, PageSchema> = {
  home: HOME_SCHEMA,
  about: ABOUT_SCHEMA,
  contact: CONTACT_SCHEMA,
  brand: BRAND_SCHEMA,
};
