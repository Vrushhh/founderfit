import type { Archetype, ArchetypeId } from "./types";

export const archetypes: Record<ArchetypeId, Archetype> = {
  builder: {
    id: "builder",
    name: "The Builder",
    line: "You would rather build the machine than run behind people.",
    blurb: "Software, automation, tools and digital products that keep working after you switch off your laptop.",
  },
  seller: {
    id: "seller",
    name: "The Seller",
    line: "You can start earning the moment you start talking to buyers.",
    blurb: "Lead generation, sales services, recruitment and distribution — revenue first, assets later.",
  },
  operator: {
    id: "operator",
    name: "The Operator",
    line: "You make messy things run on time.",
    blurb: "Managed services, home services, logistics and operations-heavy businesses.",
  },
  creator: {
    id: "creator",
    name: "The Creator",
    line: "Your attention and taste are the asset.",
    blurb: "Content, personal brand, creative services, media and online education.",
  },
  consultant: {
    id: "consultant",
    name: "The Consultant",
    line: "You already own something valuable: your work experience.",
    blurb: "Consulting, advisory, freelancing and training — lowest capital, fastest first rupee.",
  },
  product: {
    id: "product",
    name: "The Product Entrepreneur",
    line: "You want a product with your name on the box.",
    blurb: "D2C, niche ecommerce and subscription products for a specific set of customers.",
  },
  community: {
    id: "community",
    name: "The Community Builder",
    line: "People trust you and stay in touch with you.",
    blurb: "Communities, memberships, events and niche professional networks.",
  },
  local: {
    id: "local",
    name: "The Local Entrepreneur",
    line: "You want a real business in your own city.",
    blurb: "Food, fitness, pet care, education centres and home services with offline demand.",
  },
};

export const archetypeOrder: ArchetypeId[] = [
  "builder",
  "seller",
  "operator",
  "creator",
  "consultant",
  "product",
  "community",
  "local",
];
