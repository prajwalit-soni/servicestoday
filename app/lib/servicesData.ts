export interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  availability?: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 1,
    name: "Plumber",
    icon: "🔧",
    description: "Professional plumbing services",
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "Electrician",
    icon: "⚡",
    description: "Expert electrical solutions",
    color: "#F59E0B",
  },
  {
    id: 3,
    name: "Beautician",
    icon: "💅",
    description: "Beauty & grooming services",
    color: "#EC4899",
  },
  {
    id: 4,
    name: "AC Repair",
    icon: "❄️",
    description: "AC service & repair",
    color: "#06B6D4",
  },
  {
    id: 5,
    name: "Carpenter",
    icon: "🪚",
    description: "Woodwork & furniture repair",
    color: "#8B4513",
  },
  {
    id: 6,
    name: "Cleaning",
    icon: "🧹",
    description: "Home & office cleaning",
    color: "#10B981",
  },
  {
    id: 7,
    name: "Painter",
    icon: "🎨",
    description: "Interior & exterior painting",
    color: "#6366F1",
  },
  {
    id: 8,
    name: "Pest Control",
    icon: "🐜",
    description: "Professional pest management",
    color: "#EF4444",
  },
  {
    id: 9,
    name: "Salon for Women",
    icon: "💇‍♀️",
    description: "Hair & beauty services",
    color: "#DB2777",
  },
  {
    id: 10,
    name: "Salon for Men",
    icon: "💈",
    description: "Grooming & haircut services",
    color: "#0891B2",
  },
  {
    id: 11,
    name: "Massage & Spa",
    icon: "🧖",
    description: "Relaxation & wellness",
    color: "#7C3AED",
  },
  {
    id: 12,
    name: "Appliance Repair",
    icon: "🔌",
    description: "Washing machine, fridge repair",
    color: "#059669",
  },
  {
    id: 13,
    name: "Home Security",
    icon: "🔒",
    description: "CCTV & security installation",
    color: "#DC2626",
  },
  {
    id: 14,
    name: "Gardening",
    icon: "🌱",
    description: "Garden maintenance & landscaping",
    color: "#16A34A",
  },
];

export const services: Service[] = [
  // Plumber Services
  {
    id: 1,
    name: "Plumber Consultation",
    category: "Plumber",
    description: "Expert consultation for plumbing issues",
    price: 49,
    rating: 4.73,
    reviewCount: 12450,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
    availability: "Available Now",
  },
  {
    id: 2,
    name: "Flush Tank Repair",
    category: "Plumber",
    description: "Quick flush tank repair service",
    price: 149,
    rating: 4.76,
    reviewCount: 8920,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
  },
  {
    id: 3,
    name: "Drain Blockage Removal",
    category: "Plumber",
    description: "Professional drain cleaning",
    price: 199,
    rating: 4.77,
    reviewCount: 6540,
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400",
  },

  // Electrician Services
  {
    id: 4,
    name: "Electrician Consultation",
    category: "Electrician",
    description: "Professional electrical consultation",
    price: 49,
    rating: 4.75,
    reviewCount: 10230,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
    availability: "Available Now",
  },
  {
    id: 5,
    name: "Fan Repair",
    category: "Electrician",
    description: "Ceiling fan repair service",
    price: 149,
    rating: 4.79,
    reviewCount: 7850,
    image: "https://ankurelectricals.com/cdn/shop/files/4_bc717dfd-19d2-41c2-8bcb-906d27c669a2.png?v=1729681211&width=810",
  },
  {
    id: 6,
    name: "Switchboard Replacement",
    category: "Electrician",
    description: "Repair & replace switchboards",
    price: 99,
    rating: 4.83,
    reviewCount: 5420,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
  },

  // Beautician/Beauty Services
  {
    id: 7,
    name: "Facial & Cleanup",
    category: "Beautician",
    description: "Sara fruit cleanup at home",
    price: 699,
    rating: 4.86,
    reviewCount: 15670,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400",
  },
  {
    id: 8,
    name: "Waxing Service",
    category: "Beautician",
    description: "Full arms, legs & underarms",
    price: 899,
    originalPrice: 999,
    rating: 4.87,
    reviewCount: 18340,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    badge: "Popular",
  },
  {
    id: 9,
    name: "Pedicure & Manicure",
    category: "Beautician",
    description: "Crystal rose pedicure",
    price: 759,
    rating: 4.83,
    reviewCount: 12890,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400",
  },

  // AC Repair
  {
    id: 10,
    name: "AC Service (Foam-jet)",
    category: "AC Repair",
    description: "Foam-jet service for 2 ACs",
    price: 1098,
    originalPrice: 1198,
    rating: 4.76,
    reviewCount: 22340,
    image: "https://images.unsplash.com/photo-1631545804765-6bc1b4660e89?w=400",
    availability: "Instant",
    badge: "Most Booked",
  },
  {
    id: 11,
    name: "AC Repair",
    category: "AC Repair",
    description: "Expert AC repair service",
    price: 299,
    rating: 4.74,
    reviewCount: 19870,
    image: "https://images.unsplash.com/photo-1635274534126-7c2d8f9f1e4e?w=400",
    availability: "Instant",
  },
  {
    id: 12,
    name: "AC Installation",
    category: "AC Repair",
    description: "Professional AC installation",
    price: 1099,
    rating: 4.70,
    reviewCount: 8450,
    image: "https://airtasker-seo-assets-prod.s3.amazonaws.com/en_US/1742460159447-air-conditioner-installation-cost-hero.jpg",
  },

  // Carpenter
  {
    id: 13,
    name: "Cupboard Repair",
    category: "Carpenter",
    description: "Wardrobe & cupboard fixing",
    price: 89,
    rating: 4.78,
    reviewCount: 6780,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    availability: "Instant",
  },
  {
    id: 14,
    name: "Door Lock Installation",
    category: "Carpenter",
    description: "Door lock repair & installation",
    price: 129,
    rating: 4.79,
    reviewCount: 5340,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
  },

  // Cleaning Services
  {
    id: 15,
    name: "Bathroom Deep Cleaning",
    category: "Cleaning",
    description: "Intense cleaning for 2 bathrooms",
    price: 979,
    originalPrice: 1058,
    rating: 4.80,
    reviewCount: 16540,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400",
  },
  {
    id: 16,
    name: "Sofa Cleaning",
    category: "Cleaning",
    description: "Professional sofa deep cleaning",
    price: 649,
    rating: 4.82,
    reviewCount: 9870,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
  },

  // Painter
  {
    id: 17,
    name: "Wall Painting",
    category: "Painter",
    description: "1 BHK wall painting service",
    price: 2499,
    rating: 4.68,
    reviewCount: 4320,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
  },

  // Pest Control
  {
    id: 18,
    name: "General Pest Control",
    category: "Pest Control",
    description: "Complete pest control service",
    price: 1399,
    rating: 4.79,
    reviewCount: 7650,
    image: "https://images.unsplash.com/photo-1626815256062-c9b8a6eb3e03?w=400",
  },

  // Salon for Women
  {
    id: 19,
    name: "Hair Cut & Styling",
    category: "Salon for Women",
    description: "Professional hair styling",
    price: 599,
    rating: 4.84,
    reviewCount: 14230,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
  },

  // Salon for Men
  {
    id: 20,
    name: "Men's Haircut & Beard",
    category: "Salon for Men",
    description: "Haircut with beard styling",
    price: 399,
    rating: 4.81,
    reviewCount: 11540,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400",
  },

  // Massage & Spa
  {
    id: 21,
    name: "Swedish Massage",
    category: "Massage & Spa",
    description: "Relaxing full body massage",
    price: 1299,
    rating: 4.82,
    reviewCount: 9450,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
  },

  // Appliance Repair
  {
    id: 22,
    name: "Washing Machine Repair",
    category: "Appliance Repair",
    description: "Automatic machine check-up",
    price: 199,
    rating: 4.77,
    reviewCount: 10230,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400",
  },
];

export const quickLinks = [
  "Trending Services",
  "Most Booked",
  "Instant Services",
  "New Offers",
  "Popular Near You",
  "Recently Viewed",
];

export const popularSearches = [
  "AC Service",
  "Plumber",
  "Electrician",
  "Beauty Parlour",
  "Home Cleaning",
  "Pest Control",
  "Carpenter",
  "Painting",
];

export interface ServiceProvider {
  id: number;
  name: string;
  category: string;
  address: string;
  area: string;
  city: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  phone: string;
  isVerified: boolean;
  isOpen: boolean;
  closingTime?: string;
  tags: string[];
  priceRange?: string;
}

export const serviceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: "Perfect Plumbing Solutions",
    category: "Plumber",
    address: "Shop No. 12, Green Park Complex",
    area: "Banjara Hills",
    city: "Hyderabad",
    rating: 4.5,
    reviewCount: 2845,
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
    images: [
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
    ],
    phone: "8792070721",
    isVerified: true,
    isOpen: true,
    closingTime: "9:00 pm",
    tags: ["Top Rated", "Quick Service"],
  },
  {
    id: 2,
    name: "QuickFix Electricals",
    category: "Electrician",
    address: "Plot 45, Cyber Towers Road",
    area: "Madhapur",
    city: "Hyderabad",
    rating: 4.3,
    reviewCount: 1923,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    ],
    phone: "9876543210",
    isVerified: true,
    isOpen: true,
    closingTime: "10:00 pm",
    tags: ["24/7 Service", "Emergency"],
  },
  {
    id: 3,
    name: "Glow Beauty Salon",
    category: "Beautician",
    address: "2nd Floor, Fortune Plaza",
    area: "Jubilee Hills",
    city: "Hyderabad",
    rating: 4.7,
    reviewCount: 4562,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400",
    ],
    phone: "8123456789",
    isVerified: true,
    isOpen: true,
    closingTime: "8:00 pm",
    tags: ["Premium Service", "Top Rated"],
    priceRange: "₹ 500 - 2000",
  },
  {
    id: 4,
    name: "Cool Air AC Services",
    category: "AC Repair",
    address: "Building 8, Tech Park",
    area: "HITEC City",
    city: "Hyderabad",
    rating: 4.6,
    reviewCount: 3421,
    image: "https://images.unsplash.com/photo-1631545804765-6bc1b4660e89?w=400",
    images: [
      "https://images.unsplash.com/photo-1631545804765-6bc1b4660e89?w=400",
      "https://images.unsplash.com/photo-1635274534126-7c2d8f9f1e4e?w=400",
    ],
    phone: "7890123456",
    isVerified: true,
    isOpen: true,
    closingTime: "11:00 pm",
    tags: ["Same Day Service", "Warranty"],
  },
  {
    id: 5,
    name: "Master Carpenter Works",
    category: "Carpenter",
    address: "Lane 3, Industrial Area",
    area: "Kukatpally",
    city: "Hyderabad",
    rating: 4.4,
    reviewCount: 1678,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    ],
    phone: "9012345678",
    isVerified: true,
    isOpen: true,
    closingTime: "7:00 pm",
    tags: ["Custom Work", "Expert"],
  },
  {
    id: 6,
    name: "Sparkle Clean Services",
    category: "Cleaning",
    address: "Suite 201, Commercial Complex",
    area: "Gachibowli",
    city: "Hyderabad",
    rating: 4.8,
    reviewCount: 5234,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400",
    images: [
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    ],
    phone: "8234567890",
    isVerified: true,
    isOpen: true,
    closingTime: "6:00 pm",
    tags: ["Eco-Friendly", "Deep Cleaning"],
  },
  {
    id: 7,
    name: "Rainbow Painters",
    category: "Painter",
    address: "Workshop 5, Paint Street",
    area: "Ameerpet",
    city: "Hyderabad",
    rating: 4.2,
    reviewCount: 987,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
    ],
    phone: "7345678901",
    isVerified: true,
    isOpen: true,
    closingTime: "8:00 pm",
    tags: ["Professional", "Quality Paint"],
  },
  {
    id: 8,
    name: "Bug Busters Pest Control",
    category: "Pest Control",
    address: "Office 12, Service Lane",
    area: "Secunderabad",
    city: "Hyderabad",
    rating: 4.5,
    reviewCount: 2156,
    image: "https://images.unsplash.com/photo-1626815256062-c9b8a6eb3e03?w=400",
    images: [
      "https://images.unsplash.com/photo-1626815256062-c9b8a6eb3e03?w=400",
    ],
    phone: "9123456780",
    isVerified: true,
    isOpen: true,
    closingTime: "9:00 pm",
    tags: ["Safe Treatment", "Warranty"],
  },
];
