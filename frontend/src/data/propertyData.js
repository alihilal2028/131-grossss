// Property Data for 131 Grosvenor Avenue
// This file contains all the property information and image URLs

export const propertyData = {
  address: {
    street: "131 Grosvenor Avenue",
    neighborhood: "Capitol Hill",
    city: "Burnaby",
    province: "British Columbia",
    full: "131 Grosvenor Avenue, Capitol Hill, Burnaby, BC"
  },
  price: 3188000,
  priceFormatted: "$3,188,000",
  beds: 7,
  baths: 7,
  sqft: 3587,
  sqftFormatted: "3,587 sq ft",
  lotSize: "33 x 122 ft (4,026 sq ft)",
  yearBuilt: 2025,
  mls: "R3069844",
  taxes: "$5,761 (2025)",
  heating: "Radiant In-Floor with A/C",
  community: "Capitol Hill",
  
  headline: "Capitol Hill's most cinematic view residence.",
  tagline: "Sweeping views of downtown Vancouver, water and North Shore mountains from a brand new architectural masterpiece.",
  
  openHouse: {
    date: "Saturday Nov 29",
    time: "2:00 PM – 4:00 PM"
  },
  
  agent: {
    name: "Adil Dinani PREC*",
    brokerage: "Royal LePage West Real Estate Services",
    phone: "(604) 837-4622",
    email: "adil@dinani.ca",
    office: "2185 Austin Ave, Coquitlam, BC",
    website: "https://www.dinani.ca/",
    social: {
      instagram: "https://www.instagram.com/adildinani/",
      linkedin: "https://ca.linkedin.com/in/adil-dinani-00034825",
      youtube: "https://www.youtube.com/@AdilDinaniPREC"
    },
    profiles: {
      royalLePage: "https://www.royallepage.ca/en/agent/british-columbia/coquitlam/adil-dinani/3033/",
      realtor: "https://www.realtor.ca/agent/1480845/adil-dinani-2185-austin-avenue-coquitlam-british-columbia-v3k3r9",
      rew: "https://www.rew.ca/agents/1314/adil-a-dinani"
    }
  },
  
  highlights: [
    "Miele-equipped chef's kitchen with custom quartz hood",
    "Indoor-outdoor living with sliders to private backyard",
    "11 and 13 foot ceilings throughout main level",
    "Dream primary retreat with floor-to-ceiling windows",
    "Control4 smart home automation system",
    "Radiant in-floor heating and central A/C",
    "Lower level media room for cinema experience",
    "Legal 2-bedroom suite for rental income"
  ],
  
  description: `This brand-new architectural masterpiece crowns Capitol Hill with arguably the most cinematic views in Burnaby. Wake up to sweeping panoramas of downtown Vancouver's glittering skyline, the sparkling waters of Burrard Inlet, and the majestic North Shore mountains—all from your dream primary retreat with floor-to-ceiling windows.

The main level showcases soaring 11 and 13-foot ceilings that flood the open-concept living spaces with natural light. A Miele-equipped chef's kitchen features a stunning custom quartz hood and seamlessly flows to the dining and living areas. Massive sliders open to your private backyard oasis, blurring the line between indoor and outdoor living.

Every detail has been considered: Control4 automation puts your home at your fingertips, radiant in-floor heating ensures year-round comfort, and central A/C keeps summers cool. The lower level delivers a dedicated media room for the ultimate cinema experience, plus a legal 2-bedroom suite offering excellent rental income potential.

This is more than a home—it's a lifestyle statement.`,
  
  features: {
    kitchen: [
      "Miele appliances throughout",
      "Custom quartz range hood",
      "Waterfall edge island",
      "Double wall ovens",
      "Prep kitchen adjacent"
    ],
    primary: [
      "Floor-to-ceiling windows",
      "Panoramic city views",
      "Custom feature wall",
      "Walk-in closet with glass cabinets",
      "Spa-like ensuite with double vanity"
    ],
    outdoor: [
      "Private backyard",
      "Multiple balconies",
      "Glass railings throughout",
      "Outdoor entertaining space"
    ],
    technology: [
      "Control4 smart home system",
      "Radiant in-floor heating",
      "Central air conditioning",
      "EV-ready garage"
    ]
  }
};

// Image URLs organized by category
export const propertyImages = {
  hero: [
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/wn6yumk2_front_exterior_symmetrical_view.jpg",
      alt: "Front exterior symmetrical view",
      category: "exterior"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/6n2lghw8_front_exterior_view_at_dusk.jpg",
      alt: "Front exterior view at dusk",
      category: "exterior"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/vhzds1nq_city_skyline_view_at_sunset.jpg",
      alt: "City skyline view at sunset",
      category: "view"
    }
  ],
  
  exterior: [
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/wn6yumk2_front_exterior_symmetrical_view.jpg",
      alt: "Front exterior symmetrical view",
      featured: true
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/6n2lghw8_front_exterior_view_at_dusk.jpg",
      alt: "Front exterior view at dusk"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/citxu3ev_rear_exterior_view.jpg",
      alt: "Rear exterior view"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/tgisqcsr_backyard_with_lawn_and_garage.jpg",
      alt: "Backyard with lawn and garage"
    }
  ],
  
  living: [
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/7ndtzyom_open_concept_living_dining_kitchen.jpg",
      alt: "Open concept living dining kitchen",
      featured: true
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/0v9auw6n_living_room_with_fireplace_and_shelving.jpg",
      alt: "Living room with fireplace and shelving"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/6cpbexe6_combined_living_and_dining_space.jpg",
      alt: "Combined living and dining space"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/slfy1f45_open_floor_plan_view_from_kitchen.jpg",
      alt: "Open floor plan view from kitchen"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/fd9e61cd_foyer_with_console_and_stairs.jpg",
      alt: "Foyer with console and stairs"
    }
  ],
  
  kitchen: [
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/pjh5g1wm_kitchen_view_showing_island_and_dining.jpg",
      alt: "Kitchen view showing island and dining",
      featured: true
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/kki8syqa_kitchen_with_island_and_double_ovens.jpg",
      alt: "Kitchen with island and double ovens"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/ybjoj0d9_modern_kitchen_with_large_island.jpg",
      alt: "Modern kitchen with large island"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/ujsha971_secondary_prep_kitchen.jpg",
      alt: "Secondary prep kitchen"
    }
  ],
  
  bedrooms: [
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/jhsswpwe_primary_bedroom_with_feature_wall.jpg",
      alt: "Primary bedroom with feature wall",
      featured: true
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/eo9ugr3f_primary_bedroom_with_panoramic_windows.jpg",
      alt: "Primary bedroom with panoramic windows"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/onbd9gb5_another_view_primary_bedroom.jpg",
      alt: "Another view of primary bedroom"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/l8v2bk26_secondary_bedroom.jpg",
      alt: "Secondary bedroom"
    }
  ],
  
  bathrooms: [
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/9h9xzmty_bathroom_with_glass_shower.jpg",
      alt: "Bathroom with glass shower",
      featured: true
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/wfiyo005_luxurious_bathroom_with_double_vanity.jpg",
      alt: "Luxurious bathroom with double vanity"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/k11purcm_elegant_powder_room.jpg",
      alt: "Elegant powder room"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/yxlh6ytb_bathroom_with_tub_shower_combo.jpg",
      alt: "Bathroom with tub shower combo"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/3q9t6huu_secondary_bathroom.jpg",
      alt: "Secondary bathroom"
    }
  ],
  
  special: [
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/r884u3vt_dark_media_room.jpg",
      alt: "Dark media room",
      featured: true
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/d4t8bpor_lower_lounge_with_bar.jpg",
      alt: "Lower lounge with bar"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/w83x8btg_home_office_den.jpg",
      alt: "Home office den"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/rot89ksn_walk_in_closet_with_glass_cabinets.jpg",
      alt: "Walk-in closet with glass cabinets"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/509hjcp3_walk_in_closet_with_shelving.jpg",
      alt: "Walk-in closet with shelving"
    }
  ],
  
  outdoor: [
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/2vsbu7ao_balcony_view_at_night.jpg",
      alt: "Balcony view at night",
      featured: true
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/jfjahfa4_upper_deck_with_sectional.jpg",
      alt: "Upper deck with sectional"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/vhzds1nq_city_skyline_view_at_sunset.jpg",
      alt: "City skyline view at sunset"
    }
  ],
  
  suite: [
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/54um291b_secondary_suite_kitchen.jpg",
      alt: "Secondary suite kitchen"
    },
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/xy44kwth_unfurnished_room.jpg",
      alt: "Unfurnished room"
    }
  ],
  
  details: [
    {
      url: "https://customer-assets.emergentagent.com/job_cinematic-villa/artifacts/vo33k447_upper_hallway_and_stairs.jpg",
      alt: "Upper hallway and stairs"
    }
  ]
};

// All images flattened for gallery
export const allImages = [
  ...propertyImages.exterior,
  ...propertyImages.living,
  ...propertyImages.kitchen,
  ...propertyImages.bedrooms,
  ...propertyImages.bathrooms,
  ...propertyImages.special,
  ...propertyImages.outdoor,
  ...propertyImages.suite,
  ...propertyImages.details
];

export default propertyData;
