// ─────────────────────────────────────────────
//  Central mock data — replace with API calls
// ─────────────────────────────────────────────

export type MenuItemType = {
  name: string;
  description: string;
  price: string;
};

export type RestaurantType = {
  id: number;
  name: string;
  slug: string;
  description: string;
  cuisine: string;
  tags: string[];
  rating: number;
  price: string;
  location: string;
  certified: boolean;
  cta: "Book a Table" | "Order Delivery";
  image: string;
  // Detail page
  heroImage: string;
  badge?: string;
  longDescription: string;
  stats: { label: string; value: string }[];
  menuItems: MenuItemType[];
  gallery: string[];
  address: string;
  hours: string[];
  phone: string;
  email: string;
};

export const RESTAURANTS: RestaurantType[] = [
  {
    id: 1,
    slug: "the-saffron-grill",
    name: "The Saffron Grill",
    description: "Authentic Persian cuisine with a modern fine dining twist...",
    cuisine: "Persian",
    tags: ["Persian", "Fine Dining", "HMC Approved"],
    rating: 4.8,
    price: "£££",
    location: "Mayfair, London",
    certified: true,
    cta: "Book a Table",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
    heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400",
    badge: "HMC Certified ⭐⭐",
    longDescription:
      "A sophisticated fusion of traditional saffron-infused recipes and modern culinary techniques, served in an atmosphere of unparalleled luxury. Every dish is a testament to centuries of Persian culinary heritage.",
    stats: [
      { label: "Halal Certification", value: "HMC Approved" },
      { label: "Years of Excellence", value: "12 Years" },
      { label: "Signature Dishes", value: "14 Masterpieces" },
    ],
    menuItems: [
      {
        name: "Saffron Risotto with Gold Leaf",
        description:
          "Arborio rice infused with Grade 1 Persian saffron, finished with 24k gold leaf and aged Parmigiano-Reggiano.",
        price: "£42",
      },
      {
        name: "Lamb Shank Slow Braised",
        description:
          "48-hour braised halal lamb shank, pomegranate molasses glaze, saffron-scented basmati and toasted almonds.",
        price: "£38",
      },
      {
        name: "Wild Caught Seabass",
        description:
          "Pan-seared seabass, white asparagus, champagne velouté, and preserved lemon.",
        price: "£48",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    ],
    address: "24 Luxury Row, Mayfair, London, W1J 7BR",
    hours: ["Mon – Sat: 18:00 – 23:30", "Sun: 12:00 – 15:00, 18:00 – 22:00"],
    phone: "+44 (0) 20 7946 0100",
    email: "hello@saffront.com",
  },
  {
    id: 2,
    slug: "buns-and-grills",
    name: "Buns & Grills",
    description: "Award winning smash burgers made with 100% halal beef...",
    cuisine: "American",
    tags: ["American", "Fast Casual", "Alcohol-Free"],
    rating: 4.5,
    price: "££",
    location: "Shoreditch, London",
    certified: false,
    cta: "Order Delivery",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600",
    heroImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400",
    badge: "Best Burger 2024",
    longDescription:
      "Smash burger specialists bringing New York street-food energy to East London. Every patty is made fresh daily from 100% certified halal beef, double smashed on a screaming-hot griddle.",
    stats: [
      { label: "Halal Certification", value: "Self-Certified" },
      { label: "Burgers Sold", value: "250k+" },
      { label: "Signature Dishes", value: "8 Burgers" },
    ],
    menuItems: [
      {
        name: "The Original Smash",
        description:
          "Double smash patty, American cheese, pickles, house sauce, brioche bun.",
        price: "£12",
      },
      {
        name: "BBQ Bacon Stack",
        description:
          "Triple smash patty, beef bacon, BBQ sauce, caramelised onions, cheddar.",
        price: "£16",
      },
      {
        name: "Crispy Chicken Deluxe",
        description:
          "Southern fried halal chicken thigh, sriracha mayo, slaw, dill pickles.",
        price: "£13",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600",
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600",
    ],
    address: "58 Brick Lane, Shoreditch, London, E1 6RF",
    hours: ["Mon – Thu: 11:00 – 22:00", "Fri – Sun: 11:00 – 23:00"],
    phone: "+44 (0) 20 7946 0202",
    email: "orders@bunsandgrills.com",
  },
  {
    id: 3,
    slug: "ottoman-kitchen",
    name: "Ottoman Kitchen",
    description: "Traditional Turkish dining with premium cuts and live music...",
    cuisine: "Turkish",
    tags: ["Turkish", "Group Dining", "Prayer Room"],
    rating: 4.2,
    price: "££",
    location: "Camden, London",
    certified: false,
    cta: "Book a Table",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    heroImage: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1400",
    longDescription:
      "Bringing the warmth of an Istanbul mangal house to Camden. Premium halal cuts cooked over charcoal, meze platters, and live traditional music every weekend.",
    stats: [
      { label: "Halal Certification", value: "HMC Approved" },
      { label: "Years Serving", value: "8 Years" },
      { label: "Meze Selections", value: "20+ Dishes" },
    ],
    menuItems: [
      {
        name: "Mixed Grill Platter",
        description:
          "Adana kebab, shish tawook, lamb chops, kofte, served with rice and chargrilled vegetables.",
        price: "£28",
      },
      {
        name: "Slow Roast Lamb Shoulder",
        description: "12-hour slow-roasted lamb, pomegranate, freekeh and herbs.",
        price: "£32",
      },
      {
        name: "Ottoman Mezze Board",
        description: "Hummus, baba ghanoush, muhammara, warm pide bread.",
        price: "£16",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600",
    ],
    address: "12 Camden High St, Camden, London, NW1 0JH",
    hours: ["Tue – Fri: 17:00 – 23:00", "Sat – Sun: 12:00 – 23:00"],
    phone: "+44 (0) 20 7946 0303",
    email: "info@ottomankitchen.co.uk",
  },
  {
    id: 4,
    slug: "masala-street",
    name: "Masala Street",
    description: "Mumbai-inspired street food brought to the heart of London...",
    cuisine: "Indian",
    tags: ["Indian", "Street Food", "HMC Approved"],
    rating: 4.7,
    price: "££",
    location: "Soho, London",
    certified: true,
    cta: "Book a Table",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600",
    heroImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1400",
    badge: "HMC Certified",
    longDescription:
      "Vibrant Mumbai street flavours elevated to a West End dining experience. Bold spices, bold interiors, and bold portions — all HMC certified halal.",
    stats: [
      { label: "Halal Certification", value: "HMC Approved" },
      { label: "Years in Soho", value: "6 Years" },
      { label: "Curry Varieties", value: "18 Dishes" },
    ],
    menuItems: [
      {
        name: "Butter Chicken Masala",
        description:
          "Slow-cooked HMC chicken in a velvety tomato and cream sauce, served with garlic naan.",
        price: "£18",
      },
      {
        name: "Lamb Rogan Josh",
        description:
          "Kashmiri-spiced slow-braised halal lamb, aromatic gravy, steamed basmati.",
        price: "£22",
      },
      {
        name: "Pani Puri Chaat",
        description:
          "Crispy semolina puri, spiced chickpeas, tamarind water, mint chutney.",
        price: "£9",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    ],
    address: "34 Greek Street, Soho, London, W1D 5DL",
    hours: ["Mon – Sun: 12:00 – 23:00"],
    phone: "+44 (0) 20 7946 0404",
    email: "bookings@masalastreet.co.uk",
  },
  {
    id: 5,
    slug: "the-prime-cut",
    name: "The Prime Cut",
    description: "Expertly aged halal steaks served in an upscale atmosphere...",
    cuisine: "Steakhouse",
    tags: ["Steakhouse", "Gourmet"],
    rating: 4.6,
    price: "£££",
    location: "Kensington, London",
    certified: false,
    cta: "Book a Table",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600",
    heroImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1400",
    longDescription:
      "London's finest halal steakhouse. We source only the finest dry-aged cuts from certified halal farms and let the quality speak for itself — no shortcuts, no compromises.",
    stats: [
      { label: "Halal Certification", value: "Farm Certified" },
      { label: "Dry-Age Days", value: "28+ Days" },
      { label: "Cut Varieties", value: "10 Cuts" },
    ],
    menuItems: [
      {
        name: "28-Day Dry-Aged Ribeye",
        description:
          "400g prime halal ribeye, bone marrow butter, hand-cut chips, peppercorn sauce.",
        price: "£58",
      },
      {
        name: "Tomahawk to Share",
        description:
          "1.2kg dry-aged tomahawk, chimichurri, roasted garlic, truffle fries.",
        price: "£110",
      },
      {
        name: "Wagyu Striploin",
        description:
          "Grade 9+ Wagyu striploin, foie-gras butter, compressed cucumber.",
        price: "£75",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
      "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600",
    ],
    address: "88 Kensington High St, Kensington, London, W8 5SE",
    hours: ["Mon – Sat: 17:00 – 23:00", "Sun: Closed"],
    phone: "+44 (0) 20 7946 0505",
    email: "reservations@theprimecut.co.uk",
  },
  {
    id: 6,
    slug: "lemongrass-halal",
    name: "Lemongrass Halal",
    description: "Vibrant Thai flavours with 100% certified halal ingredients...",
    cuisine: "Thai",
    tags: ["Thai", "Seafood", "Takeaway"],
    rating: 4.3,
    price: "££",
    location: "Greenwich, London",
    certified: false,
    cta: "Order Delivery",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600",
    heroImage: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1400",
    longDescription:
      "Bringing the bustling street markets of Bangkok to South-East London. Every dish is crafted with fresh ingredients and 100% halal-certified proteins.",
    stats: [
      { label: "Halal Certification", value: "Self-Certified" },
      { label: "Years in Greenwich", value: "4 Years" },
      { label: "Thai Specialities", value: "22 Dishes" },
    ],
    menuItems: [
      {
        name: "Pad Thai Goong",
        description:
          "Stir-fried rice noodles, halal prawns, bean sprouts, peanuts, tamarind sauce.",
        price: "£16",
      },
      {
        name: "Green Curry Chicken",
        description:
          "Fragrant green curry, coconut milk, Thai aubergine, kaffir lime, jasmine rice.",
        price: "£15",
      },
      {
        name: "Tom Yum Seafood",
        description: "Spicy sour broth, mixed halal seafood, galangal, lemongrass, mushrooms.",
        price: "£14",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600",
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600",
    ],
    address: "7 Greenwich Market, Greenwich, London, SE10 9HZ",
    hours: ["Mon – Sun: 11:30 – 22:30"],
    phone: "+44 (0) 20 7946 0606",
    email: "hello@lemongrasshalal.co.uk",
  },
];
