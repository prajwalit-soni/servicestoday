export interface ServiceDetail {
  id: string;
  name: string;
  rating: number;
  totalBookings: string;
  earliest: string;
  earliestDay: string;
  image: string;
  categories: ServiceCategory[];
  offers: Offer[];
  trustMarkers: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  image: string;
  packages: ServicePackage[];
}

export interface ServicePackage {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  rating: number;
  reviews: string;
  image: string;
  isPackage?: boolean;
  items?: PackageItem[];
  tag?: string;
}

export interface PackageItem {
  category: string;
  service: string;
}

export interface Offer {
  title: string;
  subtitle: string;
  icon: "discount" | "coupon" | "gift";
}

export const serviceDetails: Record<string, ServiceDetail> = {
  salon: {
    id: "salon",
    name: "Salon Luxe",
    rating: 4.89,
    totalBookings: "1.8 M bookings",
    earliest: "Mon, 1:00 PM",
    earliestDay: "Monday",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "super-saver",
        name: "Super saver packages",
        image: "/assets/images/package.svg",
        packages: [
          {
            id: "custom-package",
            title: "Make your own package",
            description: "",
            price: 5371,
            originalPrice: 6714,
            duration: "5 hrs",
            rating: 4.9,
            reviews: "1.1M reviews",
            image: "/assets/images/custom-package.svg",
            isPackage: true,
            tag: "PACKAGE",
            items: [
              {
                category: "Waxing",
                service: "Full arms (including underarms) - RICA gold, Full legs - RICA gold",
              },
              {
                category: "Facial & cleanup",
                service: "Korean glass skin facial",
              },
              {
                category: "Manicure",
                service: "Ice cream delight manicure",
              },
              {
                category: "Pedicure",
                service: "Ice-cream delight pedicure",
              },
              {
                category: "Facial hair removal",
                service: "Eyebrows",
              },
            ],
          },
        ],
      },
      {
        id: "waxing",
        name: "Waxing",
        image: "/assets/images/waxing.svg",
        packages: [
          {
            id: "full-body-wax",
            title: "Full body waxing - RICA",
            description: "Full arms, Full legs, Underarms, Bikini line",
            price: 1499,
            originalPrice: 1899,
            duration: "90 mins",
            rating: 4.87,
            reviews: "856K reviews",
            image: "/assets/images/waxing-1.svg",
          },
          {
            id: "honey-wax",
            title: "Honey waxing - Full body",
            description: "Full arms, Full legs, Underarms, Bikini line",
            price: 1299,
            originalPrice: 1599,
            duration: "90 mins",
            rating: 4.85,
            reviews: "654K reviews",
            image: "/assets/images/waxing-2.svg",
          },
        ],
      },
      {
        id: "facial",
        name: "Bridal facial",
        image: "/assets/images/facial.svg",
        packages: [
          {
            id: "korean-facial",
            title: "Korean glass skin facial",
            description: "7-step Korean facial for glowing skin",
            price: 1999,
            originalPrice: 2499,
            duration: "75 mins",
            rating: 4.91,
            reviews: "423K reviews",
            image: "/assets/images/korean-facial.svg",
          },
        ],
      },
      {
        id: "manicure",
        name: "Pedicure & manicure",
        image: "/assets/images/manicure.svg",
        packages: [
          {
            id: "ice-cream-mani-pedi",
            title: "Ice cream delight mani-pedi",
            description: "Relaxing manicure and pedicure combo",
            price: 1399,
            originalPrice: 1799,
            duration: "120 mins",
            rating: 4.88,
            reviews: "567K reviews",
            image: "/assets/images/mani-pedi.svg",
          },
        ],
      },
      {
        id: "threading",
        name: "Threading & face wax",
        image: "/assets/images/threading.svg",
        packages: [
          {
            id: "eyebrow-threading",
            title: "Eyebrow threading",
            description: "Professional eyebrow shaping",
            price: 99,
            originalPrice: 149,
            duration: "15 mins",
            rating: 4.86,
            reviews: "892K reviews",
            image: "/assets/images/threading-1.svg",
          },
        ],
      },
    ],
    offers: [
      {
        title: "Get ₹50 coupon",
        subtitle: "After first service delivery",
        icon: "discount",
      },
    ],
    trustMarkers: [
      "4.5+ Rated Beauticians",
      "Luxury Salon Experience",
      "Premium Branded Products",
    ],
  },
  plumber: {
    id: "plumber",
    name: "Expert Plumbing Services",
    rating: 4.82,
    totalBookings: "2.3 M bookings",
    earliest: "Today, 3:00 PM",
    earliestDay: "Today",
    image: "/assets/images/plumber.svg",
    categories: [
      {
        id: "tap-repair",
        name: "Tap & Mixer Repair",
        image: "/assets/images/tap.svg",
        packages: [
          {
            id: "tap-repair-basic",
            title: "Tap repair/replacement",
            description: "Installation, repair, or replacement of taps",
            price: 149,
            originalPrice: 199,
            duration: "30 mins",
            rating: 4.8,
            reviews: "654K reviews",
            image: "/assets/images/tap-repair.svg",
          },
        ],
      },
      {
        id: "drainage",
        name: "Drainage & Pipe Issues",
        image: "/assets/images/drainage.svg",
        packages: [
          {
            id: "blockage-removal",
            title: "Drain blockage removal",
            description: "Clear blocked drains and pipes",
            price: 299,
            originalPrice: 399,
            duration: "45 mins",
            rating: 4.75,
            reviews: "432K reviews",
            image: "/assets/images/drainage-1.svg",
          },
        ],
      },
    ],
    offers: [
      {
        title: "Get ₹100 off",
        subtitle: "On first plumbing service",
        icon: "discount",
      },
    ],
    trustMarkers: [
      "Verified Professionals",
      "Same Day Service",
      "Quality Parts & Tools",
    ],
  },
  electrician: {
    id: "electrician",
    name: "Professional Electrician Services",
    rating: 4.78,
    totalBookings: "1.9 M bookings",
    earliest: "Today, 4:00 PM",
    earliestDay: "Today",
    image: "/assets/images/electrician.svg",
    categories: [
      {
        id: "switch-repair",
        name: "Switch & Socket",
        image: "/assets/images/switch.svg",
        packages: [
          {
            id: "switch-replacement",
            title: "Switch/Socket replacement",
            description: "Replace faulty switches or sockets",
            price: 99,
            originalPrice: 149,
            duration: "20 mins",
            rating: 4.82,
            reviews: "543K reviews",
            image: "/assets/images/switch-1.svg",
          },
        ],
      },
      {
        id: "fan-installation",
        name: "Fan Services",
        image: "/assets/images/fan.svg",
        packages: [
          {
            id: "fan-install",
            title: "Ceiling fan installation",
            description: "Complete fan installation with wiring",
            price: 249,
            originalPrice: 349,
            duration: "45 mins",
            rating: 4.77,
            reviews: "387K reviews",
            image: "/assets/images/fan-1.svg",
          },
        ],
      },
    ],
    offers: [
      {
        title: "Flat ₹75 off",
        subtitle: "On electrical services",
        icon: "coupon",
      },
    ],
    trustMarkers: [
      "Certified Electricians",
      "Safe & Reliable",
      "Warranty on Services",
    ],
  },
  beautician: {
    id: "beautician",
    name: "Beautician Services",
    rating: 4.88,
    totalBookings: "1.2 M bookings",
    earliest: "Mon, 2:00 PM",
    earliestDay: "Monday",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "salon-classic",
        name: "Classic Salon Packages",
        image: "/assets/images/package.svg",
        packages: [
          {
            id: "classic-waxing",
            title: "Classic Honey Waxing Combo",
            description: "Full arms, full legs, and underarms with pure honey wax",
            price: 699,
            originalPrice: 999,
            duration: "60 mins",
            rating: 4.84,
            reviews: "230K reviews",
            image: "/assets/images/placeholder.svg",
          },
          {
            id: "clean-up-facial",
            title: "Fruit Facial & Cleanup",
            description: "Deep skin cleaning with organic fruit extracts",
            price: 599,
            originalPrice: 799,
            duration: "45 mins",
            rating: 4.87,
            reviews: "154K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "Get ₹75 off",
        subtitle: "On beauty services",
        icon: "discount",
      }
    ],
    trustMarkers: [
      "Top-rated Beauticians",
      "Sanitized Kits Used",
      "100% Brand Products Only",
    ]
  },
  "ac-repair": {
    id: "ac-repair",
    name: "AC Repair & Services",
    rating: 4.82,
    totalBookings: "1.4 M bookings",
    earliest: "Today, 1:30 PM",
    earliestDay: "Today",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "ac-servicing",
        name: "AC Servicing",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "foam-jet-ac",
            title: "AC Service (Foam-jet)",
            description: "Deep cleaning with foam-jet technology for 2x cooling",
            price: 549,
            originalPrice: 699,
            duration: "45 mins",
            rating: 4.86,
            reviews: "320K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      },
      {
        id: "ac-repair-fixing",
        name: "AC Repairs",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "ac-gas-leak",
            title: "AC Gas Leakage Fix & Refill",
            description: "Leak detection, repair, and complete gas charging",
            price: 2499,
            originalPrice: 2999,
            duration: "90 mins",
            rating: 4.79,
            reviews: "115K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "Flat ₹150 off",
        subtitle: "On foam-jet service",
        icon: "coupon",
      }
    ],
    trustMarkers: [
      "Verified Technicians",
      "Up to 30 days warranty",
      "No-spill cleaning process",
    ]
  },
  carpenter: {
    id: "carpenter",
    name: "Professional Carpenter Services",
    rating: 4.79,
    totalBookings: "850K bookings",
    earliest: "Today, 4:00 PM",
    earliestDay: "Today",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "carpenter-repair",
        name: "Furniture Repair & Fixing",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "cupboard-fix",
            title: "Cupboard Repair / Hinge Fix",
            description: "Repair loose hinges, alignment issues, and drawer runners",
            price: 149,
            originalPrice: 199,
            duration: "30 mins",
            rating: 4.81,
            reviews: "82K reviews",
            image: "/assets/images/placeholder.svg",
          },
          {
            id: "door-lock-fix",
            title: "Door Lock Installation",
            description: "Install or replace standard cylindrical or handle locks",
            price: 249,
            originalPrice: 349,
            duration: "45 mins",
            rating: 4.78,
            reviews: "64K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "10% off",
        subtitle: "On bookings above ₹500",
        icon: "discount",
      }
    ],
    trustMarkers: [
      "Background-checked experts",
      "Equipped with modern tools",
      "Post-service cleanup included",
    ]
  },
  cleaning: {
    id: "cleaning",
    name: "Home Deep Cleaning",
    rating: 4.84,
    totalBookings: "1.9 M bookings",
    earliest: "Tomorrow, 9:00 AM",
    earliestDay: "Tomorrow",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "deep-clean",
        name: "Deep Cleaning Solutions",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "bathroom-deep-clean",
            title: "Bathroom Deep Cleaning (2 Bathrooms)",
            description: "Hard water stain removal, tile scrubbing, and sanitization",
            price: 979,
            originalPrice: 1299,
            duration: "120 mins",
            rating: 4.82,
            reviews: "190K reviews",
            image: "/assets/images/placeholder.svg",
          },
          {
            id: "sofa-deep-clean",
            title: "Sofa Deep Cleaning (5-Seater)",
            description: "Vacuuming, shampooing, and wet-dry cleaning of fabric sofa",
            price: 849,
            originalPrice: 1099,
            duration: "90 mins",
            rating: 4.85,
            reviews: "112K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "Get ₹200 Coupon",
        subtitle: "Valid on Full Home Deep Cleaning",
        icon: "gift",
      }
    ],
    trustMarkers: [
      "Biodegradable chemicals used",
      "High-power industrial vacuums",
      "Experienced cleaning teams",
    ]
  },
  painter: {
    id: "painter",
    name: "Home Painting Services",
    rating: 4.76,
    totalBookings: "450K bookings",
    earliest: "Tomorrow, 10:00 AM",
    earliestDay: "Tomorrow",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "wall-painting",
        name: "Interior & Exterior Wall Paint",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "room-wall-paint",
            title: "Single Room Makeover Painting",
            description: "Two coats of premium plastic emulsion paint with putty repair",
            price: 3499,
            originalPrice: 4299,
            duration: "1 Day",
            rating: 4.73,
            reviews: "32K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "Free Consultation",
        subtitle: "Get free shade recommendations",
        icon: "discount",
      }
    ],
    trustMarkers: [
      "On-time completion guarantee",
      "Laser measurements & spot pricing",
      "Furniture masking protection",
    ]
  },
  "pest-control": {
    id: "pest-control",
    name: "General Pest Control",
    rating: 4.81,
    totalBookings: "620K bookings",
    earliest: "Today, 3:00 PM",
    earliestDay: "Today",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "pest-insect",
        name: "Insect & Bug Control",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "cockroach-pest",
            title: "General Cockroach & Ant Control",
            description: "Odourless gel treatment and spray in kitchen and bathroom",
            price: 799,
            originalPrice: 999,
            duration: "45 mins",
            rating: 4.83,
            reviews: "78K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "Warranty protection",
        subtitle: "Free second visit if pests return",
        icon: "coupon",
      }
    ],
    trustMarkers: [
      "Govt. approved non-toxic chemicals",
      "Safe for pets and children",
      "Long-lasting effect (up to 90 days)",
    ]
  },
  "salon-for-women": {
    id: "salon-for-women",
    name: "Salon for Women",
    rating: 4.90,
    totalBookings: "2.4 M bookings",
    earliest: "Today, 12:30 PM",
    earliestDay: "Today",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "women-hair",
        name: "Hair & Skincare",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "women-haircut",
            title: "Premium Haircut & Blowdry",
            description: "Therapeutic hair wash, haircut, and blowdry styling",
            price: 799,
            originalPrice: 1199,
            duration: "60 mins",
            rating: 4.88,
            reviews: "410K reviews",
            image: "/assets/images/placeholder.svg",
          },
          {
            id: "women-waxing-pkg",
            title: "Full Body Waxing (RICA)",
            description: "Full arms, legs, and underarms with premium RICA gold wax",
            price: 1399,
            originalPrice: 1799,
            duration: "90 mins",
            rating: 4.92,
            reviews: "820K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "First user offer",
        subtitle: "Get ₹100 off your first beauty service",
        icon: "discount",
      }
    ],
    trustMarkers: [
      "Luxury skincare products only",
      "Disposable sheets and gowns",
      "Highly trained female stylists",
    ]
  },
  "salon-for-men": {
    id: "salon-for-men",
    name: "Salon for Men",
    rating: 4.79,
    totalBookings: "1.6 M bookings",
    earliest: "Today, 2:00 PM",
    earliestDay: "Today",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "men-grooming",
        name: "Haircut & Styling",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "men-haircut-beard",
            title: "Haircut & Beard Grooming",
            description: "Trending haircut, beard shaping, and relaxing head massage",
            price: 399,
            originalPrice: 599,
            duration: "45 mins",
            rating: 4.82,
            reviews: "285K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "Grooming deal",
        subtitle: "Save ₹50 on haircut combos",
        icon: "discount",
      }
    ],
    trustMarkers: [
      "Single-use blades & towels",
      "Experienced male stylists",
      "Relaxing salon vibe at home",
    ]
  },
  "massage-spa": {
    id: "massage-spa",
    name: "Massage & Spa Therapy",
    rating: 4.86,
    totalBookings: "980K bookings",
    earliest: "Today, 5:00 PM",
    earliestDay: "Today",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "swedish-deep",
        name: "Relaxing Massages",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "swedish-massage-pkg",
            title: "Swedish Full Body Massage",
            description: "Stress relief massage with premium aromatic oils",
            price: 1499,
            originalPrice: 1999,
            duration: "60 mins",
            rating: 4.87,
            reviews: "150K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "Wellness discount",
        subtitle: "Flat ₹200 off on first massage",
        icon: "coupon",
      }
    ],
    trustMarkers: [
      "Certified spa therapists",
      "Eco-friendly massage oils",
      "Portable folding beds brought along",
    ]
  },
  "appliance-repair": {
    id: "appliance-repair",
    name: "Appliance Repairs",
    rating: 4.77,
    totalBookings: "1.1 M bookings",
    earliest: "Today, 3:30 PM",
    earliestDay: "Today",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "washer-repair",
        name: "Washing Machine & Fridge",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "washing-machine-pkg",
            title: "Washing Machine Repair/Inspection",
            description: "Diagnose sound, water leakage, or spinning issues",
            price: 199,
            originalPrice: 299,
            duration: "30 mins",
            rating: 4.8,
            reviews: "82K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "Appliance deal",
        subtitle: "Inspection fee waived if repaired",
        icon: "discount",
      }
    ],
    trustMarkers: [
      "Genuine spare parts only",
      "90 days warranty on spare parts",
      "Certified multi-brand technicians",
    ]
  },
  "home-security": {
    id: "home-security",
    name: "Home Security & Automation",
    rating: 4.82,
    totalBookings: "320K bookings",
    earliest: "Tomorrow, 11:00 AM",
    earliestDay: "Tomorrow",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "cctv-setup",
        name: "CCTV & Smart Locks",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "cctv-2-cam",
            title: "CCTV Camera Installation (2 Cameras)",
            description: "Full configuration of DVR/NVR, cabling, and mobile viewing setup",
            price: 1999,
            originalPrice: 2499,
            duration: "180 mins",
            rating: 4.84,
            reviews: "12K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "Security discount",
        subtitle: "Get 15% off on smart locks",
        icon: "coupon",
      }
    ],
    trustMarkers: [
      "Certified security engineers",
      "Warranty on wire layouts",
      "Secure cloud setup guidance",
    ]
  },
  gardening: {
    id: "gardening",
    name: "Gardening & Lawn Care",
    rating: 4.74,
    totalBookings: "210K bookings",
    earliest: "Mon, 9:00 AM",
    earliestDay: "Monday",
    image: "/assets/images/placeholder.svg",
    categories: [
      {
        id: "garden-maint",
        name: "Garden Maintenance",
        image: "/assets/images/placeholder.svg",
        packages: [
          {
            id: "garden-cleanup",
            title: "Garden Cleaning & Weeding",
            description: "Removal of wild weeds, soil turning, and lawn pruning",
            price: 499,
            originalPrice: 699,
            duration: "120 mins",
            rating: 4.79,
            reviews: "8K reviews",
            image: "/assets/images/placeholder.svg",
          }
        ]
      }
    ],
    offers: [
      {
        title: "Green offer",
        subtitle: "Get free plant seeds pack",
        icon: "gift",
      }
    ],
    trustMarkers: [
      "Experienced botanist consultation",
      "Premium organic manure",
      "Hedge trimmer & lawn mower equipped",
    ]
  }
};
