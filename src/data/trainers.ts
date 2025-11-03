export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  image: string;
  experience: string;
  rating: number;
  clients: number;
  bio: string;
  certifications: string[];
  strengths: string[];
  successStories: {
    clientName: string;
    achievement: string;
    timeframe: string;
    image: string;
  }[];
  specializations: string[];
  availability: string[];
  gymLocations: string[];
}

export const trainersData: Trainer[] = [
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    specialty: "Weight Loss & Nutrition",
    image: "https://images.unsplash.com/photo-1609377375735-19f08578e372?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29tYW4lMjB3b3Jrb3V0fGVufDF8fHx8MTc2MTQ3MzU2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    experience: "8 years",
    rating: 4.9,
    clients: 250,
    bio: "With 8 years of dedicated experience in fitness and nutrition, Sarah has transformed hundreds of lives through her holistic approach to weight loss. She believes in sustainable lifestyle changes rather than quick fixes, combining personalized workout routines with practical nutrition guidance.",
    certifications: [
      "NASM Certified Personal Trainer",
      "Precision Nutrition Level 2",
      "ACE Weight Management Specialist",
      "CPR & First Aid Certified"
    ],
    strengths: [
      "Customized meal planning and nutrition coaching",
      "Metabolic conditioning and fat loss training",
      "Behavioral psychology for sustainable habits",
      "Body composition analysis and tracking"
    ],
    successStories: [
      {
        clientName: "Jennifer M.",
        achievement: "Lost 45 lbs and reversed pre-diabetes",
        timeframe: "6 months",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400"
      },
      {
        clientName: "David R.",
        achievement: "Dropped 3 pant sizes, gained energy and confidence",
        timeframe: "4 months",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400"
      },
      {
        clientName: "Maria S.",
        achievement: "Lost 30 lbs post-pregnancy, rebuilt core strength",
        timeframe: "5 months",
        image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400"
      }
    ],
    specializations: ["Weight Loss", "Nutrition Coaching", "Women's Fitness", "Metabolic Health"],
    availability: ["Monday 6am-2pm", "Wednesday 6am-2pm", "Friday 6am-2pm", "Saturday 8am-12pm"],
    gymLocations: ["downtown-fitness-hub", "westside-performance"]
  },
  {
    id: "marcus-williams",
    name: "Marcus Williams",
    specialty: "Strength & Muscle Building",
    image: "https://images.unsplash.com/photo-1682616324443-ca6b19317e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMG1hbiUyMHRyYWluaW5nfGVufDF8fHx8MTc2MTQ5NzU0OXww&ixlib=rb-4.1.0&q=80&w=1080",
    experience: "12 years",
    rating: 5.0,
    clients: 380,
    bio: "Marcus is a former competitive powerlifter with over 12 years of experience in strength training and muscle development. His evidence-based approach combines progressive overload, optimal recovery strategies, and performance nutrition to help clients achieve remarkable transformations.",
    certifications: [
      "CSCS - Certified Strength & Conditioning Specialist",
      "ISSA Master Trainer",
      "USA Powerlifting Level 1 Coach",
      "Sports Nutrition Specialist"
    ],
    strengths: [
      "Advanced strength programming and periodization",
      "Muscle hypertrophy and body recomposition",
      "Olympic lifting technique and coaching",
      "Athletic performance enhancement"
    ],
    successStories: [
      {
        clientName: "Tom B.",
        achievement: "Gained 25 lbs lean muscle, increased squat by 150 lbs",
        timeframe: "10 months",
        image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400"
      },
      {
        clientName: "Alex K.",
        achievement: "Went from beginner to competing in local powerlifting",
        timeframe: "12 months",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400"
      },
      {
        clientName: "Ryan P.",
        achievement: "Transformed physique, added 20 lbs muscle mass",
        timeframe: "8 months",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400"
      }
    ],
    specializations: ["Strength Training", "Muscle Building", "Powerlifting", "Athletic Performance"],
    availability: ["Tuesday 5am-1pm", "Thursday 5am-1pm", "Saturday 2pm-8pm", "Sunday 9am-3pm"],
    gymLocations: ["elite-strength-academy", "downtown-fitness-hub"]
  },
  {
    id: "emily-chen",
    name: "Emily Chen",
    specialty: "Yoga & Flexibility",
    image: "https://images.unsplash.com/photo-1758875569334-27579a49ed0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMHRyYWluZXIlMjBjb2FjaGluZ3xlbnwxfHx8fDE3NjE0ODMyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    experience: "6 years",
    rating: 4.8,
    clients: 190,
    bio: "Emily brings 6 years of expertise in yoga, flexibility training, and mind-body wellness. Her approach integrates traditional yoga philosophy with modern mobility science to help clients improve flexibility, reduce pain, and find balance in their fitness journey.",
    certifications: [
      "RYT-500 Registered Yoga Teacher",
      "Certified Flexibility Specialist",
      "Prenatal Yoga Instructor",
      "Meditation & Mindfulness Coach"
    ],
    strengths: [
      "Therapeutic yoga for injury recovery",
      "Advanced flexibility and mobility training",
      "Stress management and mindfulness",
      "Postural alignment and correction"
    ],
    successStories: [
      {
        clientName: "Linda W.",
        achievement: "Eliminated chronic back pain, improved posture",
        timeframe: "3 months",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400"
      },
      {
        clientName: "James H.",
        achievement: "Increased flexibility by 40%, reduced stress levels",
        timeframe: "4 months",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
      },
      {
        clientName: "Sophie L.",
        achievement: "Mastered advanced yoga poses, found mental clarity",
        timeframe: "6 months",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
      }
    ],
    specializations: ["Yoga", "Flexibility Training", "Mobility", "Stress Relief"],
    availability: ["Monday 3pm-9pm", "Wednesday 3pm-9pm", "Friday 3pm-9pm", "Sunday 10am-4pm"],
    gymLocations: ["mindful-movement-studio", "westside-performance"]
  }
];
