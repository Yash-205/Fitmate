export interface Gym {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
  hours: {
    weekdays: string;
    weekends: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  trainerIds: string[];
  membershipOptions: {
    name: string;
    price: string;
    features: string[];
  }[];
  gallery: string[];
  rating: number;
  totalMembers: number;
}

export const gymsData: Gym[] = [
  {
    id: "downtown-fitness-hub",
    name: "Downtown Fitness Hub",
    location: "Downtown District",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200",
    description: "Our flagship location in the heart of downtown, featuring state-of-the-art equipment, spacious training areas, and a vibrant fitness community. Perfect for professionals seeking premium facilities with expert guidance.",
    amenities: [
      "Olympic Weightlifting Platform",
      "Cardio Theater with 50+ Machines",
      "Functional Training Zone",
      "Steam Room & Sauna",
      "Locker Rooms with Showers",
      "Smoothie Bar & Nutrition Counter",
      "Free Parking",
      "WiFi throughout facility"
    ],
    features: [
      "24/7 Access for Members",
      "Personal Training Available",
      "Group Fitness Classes",
      "Nutrition Consultation",
      "Body Composition Analysis",
      "Mobile App Integration"
    ],
    hours: {
      weekdays: "24 Hours",
      weekends: "24 Hours"
    },
    contact: {
      phone: "(555) 123-4567",
      email: "downtown@fitcoachpro.com",
      address: "123 Main Street, Downtown District, CA 90210"
    },
    trainerIds: ["sarah-johnson", "marcus-williams"],
    membershipOptions: [
      {
        name: "Basic",
        price: "$49/month",
        features: ["24/7 Gym Access", "Locker Room Access", "Free WiFi"]
      },
      {
        name: "Premium",
        price: "$89/month",
        features: ["24/7 Gym Access", "All Basic Features", "2 Personal Training Sessions/month", "Nutrition Consultation"]
      },
      {
        name: "Elite",
        price: "$149/month",
        features: ["24/7 Gym Access", "All Premium Features", "Unlimited Group Classes", "4 Personal Training Sessions/month", "Priority Booking"]
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
      "https://images.unsplash.com/photo-1623874514711-0f321325f318?w=800"
    ],
    rating: 4.8,
    totalMembers: 850
  },
  {
    id: "westside-performance",
    name: "Westside Performance Center",
    location: "West District",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200",
    description: "A cutting-edge performance facility designed for athletes and fitness enthusiasts who demand excellence. Featuring specialized training zones, recovery amenities, and expert coaching across multiple disciplines.",
    amenities: [
      "Indoor Track & Turf Field",
      "Olympic Lifting Platforms (6)",
      "Boxing & MMA Area",
      "Recovery Zone with Massage Chairs",
      "Cryotherapy Chamber",
      "Physical Therapy Office",
      "Athlete Lounge",
      "Pro Shop"
    ],
    features: [
      "Sports Performance Testing",
      "Video Analysis Technology",
      "Nutritionist on Staff",
      "Youth Athletic Programs",
      "Sports-Specific Training",
      "Injury Prevention Screening"
    ],
    hours: {
      weekdays: "5:00 AM - 11:00 PM",
      weekends: "7:00 AM - 9:00 PM"
    },
    contact: {
      phone: "(555) 234-5678",
      email: "westside@fitcoachpro.com",
      address: "456 West Avenue, West District, CA 90211"
    },
    trainerIds: ["sarah-johnson", "emily-chen"],
    membershipOptions: [
      {
        name: "Athlete",
        price: "$79/month",
        features: ["Full Facility Access", "Performance Testing", "Recovery Zone Access"]
      },
      {
        name: "Pro Athlete",
        price: "$129/month",
        features: ["All Athlete Features", "Video Analysis", "2 PT Sessions/month", "Nutrition Planning"]
      },
      {
        name: "Championship",
        price: "$199/month",
        features: ["All Pro Features", "Unlimited PT Sessions", "Cryotherapy Access", "Priority Scheduling", "Custom Programming"]
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
      "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800"
    ],
    rating: 4.9,
    totalMembers: 620
  },
  {
    id: "elite-strength-academy",
    name: "Elite Strength Academy",
    location: "North District",
    image: "https://images.unsplash.com/photo-1623874514711-0f321325f318?w=1200",
    description: "A powerlifter's paradise and strength athlete's dream. Specializing in serious strength training with top-tier equipment, experienced coaching, and a supportive community of dedicated lifters.",
    amenities: [
      "Competition Powerlifting Equipment",
      "Strongman Training Area",
      "Deadlift Platforms (8)",
      "Monolift & Specialty Bars",
      "Chalk Stations",
      "Equipped Lifting Room",
      "Sports Massage Therapist",
      "Supplement Store"
    ],
    features: [
      "Powerlifting Coaching",
      "Strongman Training",
      "Competition Prep Programs",
      "Form Analysis & Video Review",
      "Strength Testing Days",
      "Community Events & Competitions"
    ],
    hours: {
      weekdays: "5:00 AM - 10:00 PM",
      weekends: "8:00 AM - 8:00 PM"
    },
    contact: {
      phone: "(555) 345-6789",
      email: "elite@fitcoachpro.com",
      address: "789 North Boulevard, North District, CA 90212"
    },
    trainerIds: ["marcus-williams"],
    membershipOptions: [
      {
        name: "Lifter",
        price: "$59/month",
        features: ["Full Equipment Access", "Open Gym Training", "Chalk Provided"]
      },
      {
        name: "Competitor",
        price: "$99/month",
        features: ["All Lifter Features", "Monthly Form Check", "Competition Discounts", "Programming Assistance"]
      },
      {
        name: "Champion",
        price: "$169/month",
        features: ["All Competitor Features", "Weekly Coaching Sessions", "Custom Programming", "Competition Handling", "Priority Equipment Access"]
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1623874514711-0f321325f318?w=800",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800"
    ],
    rating: 5.0,
    totalMembers: 420
  },
  {
    id: "mindful-movement-studio",
    name: "Mindful Movement Studio",
    location: "East District",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200",
    description: "A serene sanctuary dedicated to yoga, Pilates, and mindful movement practices. Our studio provides a peaceful environment for developing flexibility, strength, and inner balance through expert-led classes.",
    amenities: [
      "Heated Yoga Studio",
      "Pilates Reformer Room",
      "Meditation Garden",
      "Aromatherapy Integration",
      "Natural Lighting",
      "Premium Mat & Prop Storage",
      "Tea Lounge",
      "Changing Rooms with Showers"
    ],
    features: [
      "Variety of Yoga Styles",
      "Pilates Classes",
      "Meditation Sessions",
      "Workshops & Retreats",
      "Private Instruction Available",
      "Online Class Library"
    ],
    hours: {
      weekdays: "6:00 AM - 9:00 PM",
      weekends: "8:00 AM - 7:00 PM"
    },
    contact: {
      phone: "(555) 456-7890",
      email: "mindful@fitcoachpro.com",
      address: "321 East Lane, East District, CA 90213"
    },
    trainerIds: ["emily-chen"],
    membershipOptions: [
      {
        name: "Zen",
        price: "$69/month",
        features: ["Unlimited Classes", "Mat Storage", "Tea Lounge Access"]
      },
      {
        name: "Flow",
        price: "$99/month",
        features: ["All Zen Features", "1 Private Session/month", "Workshop Discounts", "Online Library Access"]
      },
      {
        name: "Harmony",
        price: "$139/month",
        features: ["All Flow Features", "3 Private Sessions/month", "Free Guest Passes (4/month)", "Retreat Priority", "Exclusive Events"]
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
      "https://images.unsplash.com/photo-1593810451137-5dc55105dace?w=800"
    ],
    rating: 4.9,
    totalMembers: 380
  }
];
