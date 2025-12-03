"use strict";
// Complete Mock Data for FitMate Application
Object.defineProperty(exports, "__esModule", { value: true });
exports.learners = exports.trainers = exports.gyms = void 0;
exports.getGymById = getGymById;
exports.getTrainerById = getTrainerById;
exports.getLearnerById = getLearnerById;
exports.getTrainersByGymId = getTrainersByGymId;
exports.getLearnersByTrainerId = getLearnersByTrainerId;
exports.getLearnersByGymId = getLearnersByGymId;
exports.getLearnersWithoutTrainer = getLearnersWithoutTrainer;
exports.getLearnersWithoutGym = getLearnersWithoutGym;
exports.getIndependentLearners = getIndependentLearners;
// ========== GYMS DATA ==========
exports.gyms = [
    {
        id: "gym-1",
        name: "FitCore Elite",
        location: "Downtown, New York",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
        rating: 4.8,
        memberCount: 287,
        trainerIds: ["trainer-1", "trainer-2", "trainer-3"],
        amenities: ["Swimming Pool", "Sauna", "Personal Training", "Group Classes", "Cafe"],
        description: "Premier fitness facility with state-of-the-art equipment and expert trainers. Perfect for serious athletes and fitness enthusiasts.",
        monthlyPrice: 199,
        openingHours: "5:00 AM - 11:00 PM",
        contactEmail: "info@fitcoreelite.com",
        contactPhone: "+1 (555) 123-4567",
        reviews: [
            {
                id: "review-gym1-1",
                userId: "learner-1",
                userName: "Sarah Martinez",
                userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
                rating: 5,
                comment: "Amazing facility! The trainers are knowledgeable and the equipment is top-notch.",
                date: "2024-11-15"
            },
            {
                id: "review-gym1-2",
                userId: "learner-3",
                userName: "Michael Chen",
                userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                rating: 5,
                comment: "Best gym in the city! Clean, well-maintained, and great atmosphere.",
                date: "2024-11-10"
            }
        ]
    },
    {
        id: "gym-2",
        name: "PowerHouse Fitness",
        location: "Midtown, New York",
        image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
        rating: 4.6,
        memberCount: 195,
        trainerIds: ["trainer-4", "trainer-5"],
        amenities: ["Free Weights", "Cardio Zone", "CrossFit Area", "Yoga Studio"],
        description: "Hardcore training environment for those who want to push their limits. Specializing in strength training and CrossFit.",
        monthlyPrice: 149,
        openingHours: "6:00 AM - 10:00 PM",
        contactEmail: "contact@powerhousefitness.com",
        contactPhone: "+1 (555) 234-5678",
        reviews: [
            {
                id: "review-gym2-1",
                userId: "learner-5",
                userName: "David Thompson",
                userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
                rating: 4,
                comment: "Great for strength training. Wish they had more cardio equipment though.",
                date: "2024-11-20"
            }
        ]
    },
    {
        id: "gym-3",
        name: "Zen Yoga Studio",
        location: "Brooklyn, New York",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
        rating: 4.9,
        memberCount: 142,
        trainerIds: ["trainer-6", "trainer-7"],
        amenities: ["Yoga Classes", "Meditation Room", "Pilates", "Wellness Cafe"],
        description: "Peaceful sanctuary for yoga, meditation, and mindful movement. All levels welcome.",
        monthlyPrice: 129,
        openingHours: "7:00 AM - 9:00 PM",
        contactEmail: "hello@zenyogastudio.com",
        contactPhone: "+1 (555) 345-6789",
        reviews: [
            {
                id: "review-gym3-1",
                userId: "learner-4",
                userName: "Emily Rodriguez",
                userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
                rating: 5,
                comment: "The most peaceful and welcoming yoga studio. Instructors are amazing!",
                date: "2024-11-25"
            }
        ]
    },
    {
        id: "gym-4",
        name: "Iron Valley Gym",
        location: "Queens, New York",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800",
        rating: 4.5,
        memberCount: 168,
        trainerIds: ["trainer-8"],
        amenities: ["Olympic Lifting", "Boxing Ring", "Heavy Bags", "Recovery Zone"],
        description: "No-frills, hardcore gym for serious lifters and fighters. Old-school atmosphere.",
        monthlyPrice: 89,
        openingHours: "24/7",
        contactEmail: "info@ironvalleygym.com",
        contactPhone: "+1 (555) 456-7890",
        reviews: [
            {
                id: "review-gym4-1",
                userId: "learner-7",
                userName: "James Wilson",
                userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
                rating: 5,
                comment: "Real gym for real lifters. Love the 24/7 access!",
                date: "2024-11-18"
            }
        ]
    },
    {
        id: "gym-5",
        name: "Apex Performance Center",
        location: "Manhattan, New York",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
        rating: 4.7,
        memberCount: 224,
        trainerIds: ["trainer-9"],
        amenities: ["Sports Performance", "Recovery Pool", "Nutrition Consulting", "Physical Therapy"],
        description: "Elite training center for athletes and high performers. Integrated approach to fitness.",
        monthlyPrice: 249,
        openingHours: "5:30 AM - 10:00 PM",
        contactEmail: "performance@apexcenter.com",
        contactPhone: "+1 (555) 567-8901",
        reviews: [
            {
                id: "review-gym5-1",
                userId: "learner-9",
                userName: "Sophia Anderson",
                userAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
                rating: 5,
                comment: "Worth every penny! The performance coaching is next level.",
                date: "2024-11-22"
            }
        ]
    }
];
// ========== TRAINERS DATA ==========
exports.trainers = [
    {
        id: "trainer-1",
        name: "Sarah Johnson",
        specialty: "Weight Loss & Nutrition",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        rating: 5.0,
        experience: 8,
        clients: 24,
        sessionsCompleted: 1456,
        gymId: "gym-1",
        description: "Certified nutritionist and weight loss specialist with 8 years of experience. I focus on sustainable lifestyle changes and balanced nutrition.",
        certifications: ["ACE Certified Personal Trainer", "Precision Nutrition Level 2", "NASM Weight Loss Specialist"],
        sessionPrice: 80,
        availability: ["Mon-Fri: 6AM-2PM", "Sat: 8AM-12PM"],
        status: "active",
        reviews: [
            {
                id: "review-t1-1",
                userId: "learner-1",
                userName: "Sarah Martinez",
                userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
                rating: 5,
                comment: "Sarah helped me lose 30 pounds! She's patient, knowledgeable, and truly cares.",
                date: "2024-11-28"
            },
            {
                id: "review-t1-2",
                userId: "learner-2",
                userName: "Jessica Lee",
                userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
                rating: 5,
                comment: "Best investment I've made in my health. Her nutrition advice changed my life!",
                date: "2024-11-20"
            }
        ]
    },
    {
        id: "trainer-2",
        name: "Mike Rodriguez",
        specialty: "Strength & Muscle Building",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        rating: 4.9,
        experience: 10,
        clients: 18,
        sessionsCompleted: 2134,
        gymId: "gym-1",
        description: "Former competitive bodybuilder specializing in hypertrophy training and strength development. Let's build some serious muscle!",
        certifications: ["NSCA-CSCS", "ISSA Bodybuilding Specialist", "Sports Nutrition Certification"],
        sessionPrice: 90,
        availability: ["Mon-Fri: 2PM-9PM", "Sun: 10AM-2PM"],
        status: "active",
        reviews: [
            {
                id: "review-t2-1",
                userId: "learner-3",
                userName: "Michael Chen",
                userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                rating: 5,
                comment: "Mike knows his stuff! Gained 15 pounds of muscle in 6 months.",
                date: "2024-11-25"
            }
        ]
    },
    {
        id: "trainer-3",
        name: "Lisa Wang",
        specialty: "HIIT & Cardio",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        rating: 4.8,
        experience: 6,
        clients: 20,
        sessionsCompleted: 987,
        gymId: "gym-1",
        description: "High-energy trainer who loves pushing limits! Specializing in HIIT, metabolic conditioning, and endurance training.",
        certifications: ["ACE Certified", "TRX Certified", "Spinning Instructor"],
        sessionPrice: 75,
        availability: ["Mon-Fri: 5AM-1PM"],
        status: "active",
        reviews: [
            {
                id: "review-t3-1",
                userId: "learner-6",
                userName: "Robert Kim",
                userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
                rating: 5,
                comment: "Lisa's HIIT classes are intense but so effective! Lost 20 pounds in 3 months.",
                date: "2024-11-23"
            }
        ]
    },
    {
        id: "trainer-4",
        name: "Marcus Thompson",
        specialty: "CrossFit & Functional Training",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        rating: 4.9,
        experience: 7,
        clients: 16,
        sessionsCompleted: 1245,
        gymId: "gym-2",
        description: "CrossFit Level 2 trainer focused on functional movements and overall athletic performance. Train like an athlete!",
        certifications: ["CrossFit Level 2", "USA Weightlifting", "FMS Certified"],
        sessionPrice: 85,
        availability: ["Mon-Sat: 6AM-12PM"],
        status: "active",
        reviews: [
            {
                id: "review-t4-1",
                userId: "learner-5",
                userName: "David Thompson",
                userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
                rating: 4,
                comment: "Marcus is tough but fair. Really improved my overall fitness.",
                date: "2024-11-19"
            }
        ]
    },
    {
        id: "trainer-5",
        name: "Amanda Foster",
        specialty: "Powerlifting & Olympic Lifting",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
        rating: 5.0,
        experience: 9,
        clients: 12,
        sessionsCompleted: 1678,
        gymId: "gym-2",
        description: "Competitive powerlifter and Olympic lifting coach. Perfect your form and maximize your strength potential.",
        certifications: ["USA Powerlifting Coach", "USA Weightlifting Level 2", "NSCA-CPT"],
        sessionPrice: 95,
        availability: ["Tue-Sat: 3PM-8PM"],
        status: "active",
        reviews: [
            {
                id: "review-t5-1",
                userId: "learner-7",
                userName: "James Wilson",
                userAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
                rating: 5,
                comment: "Amanda is amazing! My squat and deadlift PRs have gone through the roof.",
                date: "2024-11-26"
            }
        ]
    },
    {
        id: "trainer-6",
        name: "Emily Rodriguez",
        specialty: "Yoga & Mindfulness",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        rating: 5.0,
        experience: 12,
        clients: 32,
        sessionsCompleted: 2567,
        gymId: "gym-3",
        description: "200hr RYT with over a decade of experience. Specializing in Vinyasa, Hatha, and restorative yoga practices.",
        certifications: ["RYT-500", "Meditation Teacher", "Reiki Level 2"],
        sessionPrice: 70,
        availability: ["Mon-Sun: 7AM-7PM"],
        status: "active",
        reviews: [
            {
                id: "review-t6-1",
                userId: "learner-4",
                userName: "Emily Rodriguez",
                userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
                rating: 5,
                comment: "Emily's classes are transformative. She creates such a peaceful environment.",
                date: "2024-11-27"
            }
        ]
    },
    {
        id: "trainer-7",
        name: "Daniel Park",
        specialty: "Pilates & Core Conditioning",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        rating: 4.8,
        experience: 5,
        clients: 22,
        sessionsCompleted: 876,
        gymId: "gym-3",
        description: "Certified Pilates instructor focused on core strength, flexibility, and posture correction.",
        certifications: ["PMA Certified Pilates Instructor", "Stott Pilates", "ACE Certified"],
        sessionPrice: 65,
        availability: ["Mon-Fri: 9AM-5PM"],
        status: "active",
        reviews: [
            {
                id: "review-t7-1",
                userId: "learner-11",
                userName: "Linda Martinez",
                userAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
                rating: 5,
                comment: "Daniel fixed my back pain issues! His attention to detail is incredible.",
                date: "2024-11-21"
            }
        ]
    },
    {
        id: "trainer-8",
        name: "Ryan Mitchell",
        specialty: "Boxing & Combat Sports",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
        rating: 4.7,
        experience: 11,
        clients: 15,
        sessionsCompleted: 1834,
        gymId: "gym-4",
        description: "Former professional boxer with 11 years coaching experience. Learn proper technique while getting in the best shape of your life.",
        certifications: ["USA Boxing Coach", "Personal Defense Instructor", "CPR/AED"],
        sessionPrice: 85,
        availability: ["Mon-Fri: 4PM-9PM", "Sat: 9AM-1PM"],
        status: "active",
        reviews: [
            {
                id: "review-t8-1",
                userId: "learner-8",
                userName: "Chris Baker",
                userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
                rating: 5,
                comment: "Ryan's boxing classes are the best workout I've ever had!",
                date: "2024-11-24"
            }
        ]
    },
    {
        id: "trainer-9",
        name: "Nicole Adams",
        specialty: "Sports Performance & Conditioning",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
        rating: 4.9,
        experience: 9,
        clients: 14,
        sessionsCompleted: 1456,
        gymId: "gym-5",
        description: "Sports performance specialist working with athletes of all levels. Improve speed, power, agility, and overall athletic performance.",
        certifications: ["NSCA-CSCS", "USAW Level 1", "Titleist Performance Institute"],
        sessionPrice: 100,
        availability: ["Mon-Fri: 6AM-2PM"],
        status: "active",
        reviews: [
            {
                id: "review-t9-1",
                userId: "learner-9",
                userName: "Sophia Anderson",
                userAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
                rating: 5,
                comment: "Nicole's training helped me improve my tennis game dramatically!",
                date: "2024-11-29"
            }
        ]
    },
    {
        id: "trainer-10",
        name: "Kevin Zhang",
        specialty: "Senior Fitness & Rehabilitation",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        rating: 4.9,
        experience: 8,
        clients: 19,
        sessionsCompleted: 1234,
        gymId: "gym-5",
        description: "Specializing in senior fitness, post-rehab training, and special populations. Safe, effective training for all ages.",
        certifications: ["NASM-CPT", "Senior Fitness Specialist", "Corrective Exercise Specialist"],
        sessionPrice: 75,
        availability: ["Mon-Fri: 9AM-4PM"],
        status: "active",
        reviews: [
            {
                id: "review-t10-1",
                userId: "learner-15",
                userName: "Patricia Brown",
                userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
                rating: 5,
                comment: "Kevin is so patient and understanding. Perfect for seniors like me!",
                date: "2024-11-17"
            }
        ]
    }
];
// ========== LEARNERS DATA ==========
exports.learners = [
    // Learners with trainer AND gym
    {
        id: "learner-1",
        name: "Sarah Martinez",
        email: "sarah.m@email.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        membershipType: "premium",
        joinDate: "2024-01-15",
        trainerId: "trainer-1",
        gymId: "gym-1",
        status: "on-track",
        program: "Weight Loss & Nutrition",
        currentWeight: 145,
        startWeight: 165,
        goalWeight: 140,
        sessionsCompleted: 36,
        totalSessions: 48,
        lastWorkout: "2 hours ago",
        metrics: {
            strength: 82,
            cardio: 90,
            flexibility: 65,
            consistency: 88
        },
        recentActivity: [
            { date: "2024-11-30", type: "Cardio + Strength", duration: 60, notes: "Great energy today!", completed: true },
            { date: "2024-11-28", type: "HIIT Training", duration: 45, notes: "Pushed hard, feeling strong", completed: true },
            { date: "2024-11-26", type: "Core & Flexibility", duration: 50, notes: "Improved flexibility", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 165, current: 145, unit: "lbs" },
            { title: "Body Fat %", target: 20, current: 24, unit: "%" },
            { title: "Weekly Workouts", target: 5, current: 4, unit: "sessions" }
        ],
        monthlySpend: 279,
        totalVisits: 89
    },
    {
        id: "learner-2",
        name: "Jessica Lee",
        email: "jessica.l@email.com",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
        membershipType: "premium",
        joinDate: "2024-02-10",
        trainerId: "trainer-1",
        gymId: "gym-1",
        status: "on-track",
        program: "Weight Loss & Nutrition",
        currentWeight: 135,
        startWeight: 155,
        goalWeight: 130,
        sessionsCompleted: 32,
        totalSessions: 48,
        lastWorkout: "1 day ago",
        metrics: {
            strength: 75,
            cardio: 85,
            flexibility: 70,
            consistency: 85
        },
        recentActivity: [
            { date: "2024-11-29", type: "Full Body Workout", duration: 55, notes: "Feeling stronger every week", completed: true },
            { date: "2024-11-27", type: "Cardio Session", duration: 40, notes: "Good run today", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 155, current: 135, unit: "lbs" },
            { title: "5K Run Time", target: 25, current: 28, unit: "minutes" }
        ],
        monthlySpend: 279,
        totalVisits: 67
    },
    {
        id: "learner-3",
        name: "Michael Chen",
        email: "michael.c@email.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        membershipType: "premium",
        joinDate: "2024-02-20",
        trainerId: "trainer-2",
        gymId: "gym-1",
        status: "active",
        program: "Strength & Muscle Building",
        currentWeight: 180,
        startWeight: 165,
        goalWeight: 185,
        sessionsCompleted: 28,
        totalSessions: 48,
        lastWorkout: "1 day ago",
        metrics: {
            strength: 95,
            cardio: 70,
            flexibility: 55,
            consistency: 75
        },
        recentActivity: [
            { date: "2024-11-29", type: "Upper Body Strength", duration: 75, notes: "New PR on bench press!", completed: true },
            { date: "2024-11-27", type: "Leg Day", duration: 80, notes: "Squats getting stronger", completed: true }
        ],
        goals: [
            { title: "Muscle Gain", target: 185, current: 180, unit: "lbs" },
            { title: "Bench Press", target: 225, current: 205, unit: "lbs" },
            { title: "Squat", target: 315, current: 285, unit: "lbs" }
        ],
        monthlySpend: 289,
        totalVisits: 72
    },
    {
        id: "learner-4",
        name: "Emily Rodriguez",
        email: "emily.r@email.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        membershipType: "standard",
        joinDate: "2024-03-10",
        trainerId: "trainer-6",
        gymId: "gym-3",
        status: "on-track",
        program: "Yoga & Flexibility",
        currentWeight: 125,
        startWeight: 125,
        goalWeight: 125,
        sessionsCompleted: 40,
        totalSessions: 48,
        lastWorkout: "5 hours ago",
        metrics: {
            strength: 70,
            cardio: 75,
            flexibility: 95,
            consistency: 92
        },
        recentActivity: [
            { date: "2024-11-30", type: "Vinyasa Flow", duration: 60, notes: "Nailed headstand!", completed: true },
            { date: "2024-11-29", type: "Restorative Yoga", duration: 45, notes: "Much needed recovery", completed: true }
        ],
        goals: [
            { title: "Flexibility Score", target: 95, current: 88, unit: "%" },
            { title: "Weekly Sessions", target: 5, current: 5, unit: "sessions" }
        ],
        monthlySpend: 199,
        totalVisits: 98
    },
    {
        id: "learner-5",
        name: "David Thompson",
        email: "david.t@email.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        membershipType: "basic",
        joinDate: "2024-04-05",
        trainerId: "trainer-4",
        gymId: "gym-2",
        status: "needs-attention",
        program: "CrossFit & Functional",
        currentWeight: 210,
        startWeight: 225,
        goalWeight: 190,
        sessionsCompleted: 18,
        totalSessions: 48,
        lastWorkout: "5 days ago",
        metrics: {
            strength: 60,
            cardio: 55,
            flexibility: 45,
            consistency: 40
        },
        recentActivity: [
            { date: "2024-11-25", type: "Full Body", duration: 40, notes: "Struggled with motivation", completed: true },
            { date: "2024-11-20", type: "Cardio", duration: 30, notes: "Short session", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 225, current: 210, unit: "lbs" },
            { title: "Consistency", target: 80, current: 40, unit: "%" }
        ],
        monthlySpend: 134,
        totalVisits: 35
    },
    {
        id: "learner-6",
        name: "Robert Kim",
        email: "robert.k@email.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        membershipType: "premium",
        joinDate: "2023-11-05",
        trainerId: "trainer-3",
        gymId: "gym-1",
        status: "on-track",
        program: "HIIT & Cardio",
        currentWeight: 175,
        startWeight: 195,
        goalWeight: 170,
        sessionsCompleted: 42,
        totalSessions: 48,
        lastWorkout: "Today",
        metrics: {
            strength: 78,
            cardio: 92,
            flexibility: 68,
            consistency: 90
        },
        recentActivity: [
            { date: "2024-11-30", type: "HIIT Class", duration: 45, notes: "Crushed it!", completed: true },
            { date: "2024-11-28", type: "Cardio Blast", duration: 50, notes: "New distance PR", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 195, current: 175, unit: "lbs" },
            { title: "10K Run", target: 45, current: 48, unit: "minutes" }
        ],
        monthlySpend: 274,
        totalVisits: 156
    },
    {
        id: "learner-7",
        name: "James Wilson",
        email: "james.w@email.com",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
        membershipType: "standard",
        joinDate: "2024-05-12",
        trainerId: "trainer-5",
        gymId: "gym-2",
        status: "active",
        program: "Powerlifting",
        currentWeight: 195,
        startWeight: 185,
        goalWeight: 205,
        sessionsCompleted: 25,
        totalSessions: 48,
        lastWorkout: "Yesterday",
        metrics: {
            strength: 90,
            cardio: 60,
            flexibility: 50,
            consistency: 70
        },
        recentActivity: [
            { date: "2024-11-29", type: "Deadlift Day", duration: 90, notes: "Hit 405 lbs!", completed: true },
            { date: "2024-11-26", type: "Squat Session", duration: 85, notes: "Form getting better", completed: true }
        ],
        goals: [
            { title: "Muscle Gain", target: 205, current: 195, unit: "lbs" },
            { title: "Deadlift", target: 500, current: 405, unit: "lbs" }
        ],
        monthlySpend: 244,
        totalVisits: 78
    },
    // Learners with trainer but NO gym (online training)
    {
        id: "learner-8",
        name: "Chris Baker",
        email: "chris.b@email.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        membershipType: "none",
        joinDate: "2024-06-01",
        trainerId: "trainer-8",
        status: "active",
        program: "Boxing & Combat",
        currentWeight: 172,
        startWeight: 180,
        goalWeight: 165,
        sessionsCompleted: 20,
        totalSessions: 36,
        lastWorkout: "2 hours ago",
        metrics: {
            strength: 80,
            cardio: 88,
            flexibility: 65,
            consistency: 78
        },
        recentActivity: [
            { date: "2024-11-30", type: "Shadow Boxing", duration: 45, notes: "Working on combinations", completed: true },
            { date: "2024-11-28", type: "Heavy Bag", duration: 40, notes: "Great cardio", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 180, current: 172, unit: "lbs" },
            { title: "Punching Speed", target: 90, current: 75, unit: "score" }
        ],
        monthlySpend: 85,
        totalVisits: 0
    },
    {
        id: "learner-9",
        name: "Sophia Anderson",
        email: "sophia.a@email.com",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
        membershipType: "none",
        joinDate: "2024-07-15",
        trainerId: "trainer-9",
        status: "on-track",
        program: "Sports Performance",
        currentWeight: 138,
        startWeight: 135,
        goalWeight: 142,
        sessionsCompleted: 18,
        totalSessions: 36,
        lastWorkout: "Yesterday",
        metrics: {
            strength: 85,
            cardio: 90,
            flexibility: 78,
            consistency: 82
        },
        recentActivity: [
            { date: "2024-11-29", type: "Agility Training", duration: 60, notes: "Speed drills improving", completed: true },
            { date: "2024-11-27", type: "Plyometrics", duration: 55, notes: "Jump height increased", completed: true }
        ],
        goals: [
            { title: "Muscle Gain", target: 142, current: 138, unit: "lbs" },
            { title: "Vertical Jump", target: 24, current: 20, unit: "inches" }
        ],
        monthlySpend: 100,
        totalVisits: 0
    },
    {
        id: "learner-10",
        name: "Marcus Johnson",
        email: "marcus.j@email.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        membershipType: "none",
        joinDate: "2024-08-20",
        trainerId: "trainer-1",
        status: "active",
        program: "Weight Loss & Nutrition",
        currentWeight: 198,
        startWeight: 215,
        goalWeight: 185,
        sessionsCompleted: 15,
        totalSessions: 36,
        lastWorkout: "3 days ago",
        metrics: {
            strength: 65,
            cardio: 70,
            flexibility: 60,
            consistency: 68
        },
        recentActivity: [
            { date: "2024-11-27", type: "Home Workout", duration: 35, notes: "Bodyweight exercises", completed: true },
            { date: "2024-11-24", type: "Walking", duration: 45, notes: "Evening walk", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 215, current: 198, unit: "lbs" },
            { title: "Daily Steps", target: 10000, current: 7500, unit: "steps" }
        ],
        monthlySpend: 80,
        totalVisits: 0
    },
    // Learners with gym but NO trainer (independent training)
    {
        id: "learner-11",
        name: "Linda Martinez",
        email: "linda.m@email.com",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
        membershipType: "standard",
        joinDate: "2024-03-15",
        gymId: "gym-3",
        status: "active",
        program: "Self-directed Yoga",
        currentWeight: 142,
        startWeight: 145,
        goalWeight: 140,
        sessionsCompleted: 24,
        totalSessions: 36,
        lastWorkout: "Today",
        metrics: {
            strength: 70,
            cardio: 75,
            flexibility: 85,
            consistency: 80
        },
        recentActivity: [
            { date: "2024-11-30", type: "Yoga Class", duration: 60, notes: "Loved the morning flow", completed: true },
            { date: "2024-11-28", type: "Stretching", duration: 30, notes: "Recovery day", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 145, current: 142, unit: "lbs" },
            { title: "Flexibility", target: 90, current: 85, unit: "%" }
        ],
        monthlySpend: 129,
        totalVisits: 72
    },
    {
        id: "learner-12",
        name: "Thomas White",
        email: "thomas.w@email.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        membershipType: "premium",
        joinDate: "2024-01-20",
        gymId: "gym-1",
        status: "on-track",
        program: "Self-directed Strength",
        currentWeight: 185,
        startWeight: 175,
        goalWeight: 190,
        sessionsCompleted: 38,
        totalSessions: 48,
        lastWorkout: "6 hours ago",
        metrics: {
            strength: 88,
            cardio: 72,
            flexibility: 60,
            consistency: 85
        },
        recentActivity: [
            { date: "2024-11-30", type: "Upper Body", duration: 70, notes: "Good pump today", completed: true },
            { date: "2024-11-29", type: "Lower Body", duration: 75, notes: "Leg day complete", completed: true }
        ],
        goals: [
            { title: "Muscle Gain", target: 190, current: 185, unit: "lbs" },
            { title: "Body Fat %", target: 12, current: 15, unit: "%" }
        ],
        monthlySpend: 199,
        totalVisits: 115
    },
    {
        id: "learner-13",
        name: "Rachel Green",
        email: "rachel.g@email.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        membershipType: "basic",
        joinDate: "2024-09-01",
        gymId: "gym-2",
        status: "active",
        program: "General Fitness",
        currentWeight: 128,
        startWeight: 132,
        goalWeight: 125,
        sessionsCompleted: 12,
        totalSessions: 24,
        lastWorkout: "2 days ago",
        metrics: {
            strength: 65,
            cardio: 78,
            flexibility: 70,
            consistency: 60
        },
        recentActivity: [
            { date: "2024-11-28", type: "Cardio", duration: 40, notes: "Treadmill run", completed: true },
            { date: "2024-11-26", type: "Circuit Training", duration: 35, notes: "Full body circuit", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 132, current: 128, unit: "lbs" },
            { title: "Cardio Endurance", target: 85, current: 78, unit: "%" }
        ],
        monthlySpend: 89,
        totalVisits: 36
    },
    {
        id: "learner-14",
        name: "Kevin Brown",
        email: "kevin.b@email.com",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
        membershipType: "premium",
        joinDate: "2024-02-28",
        gymId: "gym-4",
        status: "on-track",
        program: "Powerlifting",
        currentWeight: 210,
        startWeight: 195,
        goalWeight: 220,
        sessionsCompleted: 35,
        totalSessions: 48,
        lastWorkout: "Yesterday",
        metrics: {
            strength: 92,
            cardio: 58,
            flexibility: 48,
            consistency: 82
        },
        recentActivity: [
            { date: "2024-11-29", type: "Squat Day", duration: 85, notes: "Hit 365 lbs for reps", completed: true },
            { date: "2024-11-27", type: "Bench Press", duration: 75, notes: "Working on form", completed: true }
        ],
        goals: [
            { title: "Muscle Gain", target: 220, current: 210, unit: "lbs" },
            { title: "Squat Max", target: 500, current: 405, unit: "lbs" }
        ],
        monthlySpend: 89,
        totalVisits: 102
    },
    // Learners with NO trainer and NO gym (completely independent)
    {
        id: "learner-15",
        name: "Patricia Brown",
        email: "patricia.b@email.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        membershipType: "none",
        joinDate: "2024-10-01",
        status: "active",
        program: "Home Workouts",
        currentWeight: 152,
        startWeight: 155,
        goalWeight: 145,
        sessionsCompleted: 8,
        totalSessions: 24,
        lastWorkout: "Today",
        metrics: {
            strength: 55,
            cardio: 68,
            flexibility: 72,
            consistency: 65
        },
        recentActivity: [
            { date: "2024-11-30", type: "Home Yoga", duration: 30, notes: "Morning routine", completed: true },
            { date: "2024-11-28", type: "Walking", duration: 40, notes: "Neighborhood walk", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 155, current: 152, unit: "lbs" },
            { title: "Daily Activity", target: 30, current: 25, unit: "minutes" }
        ],
        monthlySpend: 0,
        totalVisits: 0
    },
    {
        id: "learner-16",
        name: "Daniel Miller",
        email: "daniel.m@email.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        membershipType: "none",
        joinDate: "2024-09-15",
        status: "needs-attention",
        program: "Calisthenics",
        currentWeight: 168,
        startWeight: 170,
        goalWeight: 165,
        sessionsCompleted: 6,
        totalSessions: 24,
        lastWorkout: "1 week ago",
        metrics: {
            strength: 62,
            cardio: 60,
            flexibility: 55,
            consistency: 45
        },
        recentActivity: [
            { date: "2024-11-23", type: "Push-ups & Pull-ups", duration: 25, notes: "Short workout", completed: true },
            { date: "2024-11-18", type: "Running", duration: 20, notes: "Quick jog", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 170, current: 168, unit: "lbs" },
            { title: "Push-ups", target: 50, current: 30, unit: "reps" }
        ],
        monthlySpend: 0,
        totalVisits: 0
    },
    {
        id: "learner-17",
        name: "Jennifer Davis",
        email: "jennifer.d@email.com",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
        membershipType: "none",
        joinDate: "2024-08-10",
        status: "active",
        program: "Running & Cardio",
        currentWeight: 135,
        startWeight: 138,
        goalWeight: 132,
        sessionsCompleted: 16,
        totalSessions: 36,
        lastWorkout: "Yesterday",
        metrics: {
            strength: 60,
            cardio: 82,
            flexibility: 68,
            consistency: 75
        },
        recentActivity: [
            { date: "2024-11-29", type: "5K Run", duration: 32, notes: "Personal best!", completed: true },
            { date: "2024-11-27", type: "Interval Training", duration: 28, notes: "Speed work", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 138, current: 135, unit: "lbs" },
            { title: "5K Time", target: 25, current: 27, unit: "minutes" }
        ],
        monthlySpend: 0,
        totalVisits: 0
    },
    {
        id: "learner-18",
        name: "Brian Wilson",
        email: "brian.w@email.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        membershipType: "none",
        joinDate: "2024-11-01",
        status: "active",
        program: "Bodyweight Training",
        currentWeight: 178,
        startWeight: 180,
        goalWeight: 172,
        sessionsCompleted: 4,
        totalSessions: 12,
        lastWorkout: "2 days ago",
        metrics: {
            strength: 68,
            cardio: 65,
            flexibility: 58,
            consistency: 55
        },
        recentActivity: [
            { date: "2024-11-28", type: "Full Body Calisthenics", duration: 35, notes: "Getting the hang of it", completed: true },
            { date: "2024-11-25", type: "Core Workout", duration: 20, notes: "Planks and abs", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 180, current: 178, unit: "lbs" },
            { title: "Pull-ups", target: 10, current: 5, unit: "reps" }
        ],
        monthlySpend: 0,
        totalVisits: 0
    },
    {
        id: "learner-19",
        name: "Amanda Taylor",
        email: "amanda.t@email.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        membershipType: "none",
        joinDate: "2024-07-20",
        status: "on-track",
        program: "Yoga & Meditation",
        currentWeight: 118,
        startWeight: 118,
        goalWeight: 118,
        sessionsCompleted: 22,
        totalSessions: 36,
        lastWorkout: "Today",
        metrics: {
            strength: 62,
            cardio: 70,
            flexibility: 90,
            consistency: 85
        },
        recentActivity: [
            { date: "2024-11-30", type: "Yoga Flow", duration: 45, notes: "Morning practice", completed: true },
            { date: "2024-11-29", type: "Meditation", duration: 20, notes: "Stress relief", completed: true }
        ],
        goals: [
            { title: "Flexibility", target: 95, current: 90, unit: "%" },
            { title: "Daily Practice", target: 6, current: 5, unit: "days/week" }
        ],
        monthlySpend: 0,
        totalVisits: 0
    },
    {
        id: "learner-20",
        name: "Steven Garcia",
        email: "steven.g@email.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        membershipType: "none",
        joinDate: "2024-10-15",
        status: "needs-attention",
        program: "General Fitness",
        currentWeight: 192,
        startWeight: 195,
        goalWeight: 180,
        sessionsCompleted: 3,
        totalSessions: 12,
        lastWorkout: "2 weeks ago",
        metrics: {
            strength: 58,
            cardio: 52,
            flexibility: 50,
            consistency: 35
        },
        recentActivity: [
            { date: "2024-11-16", type: "Walking", duration: 30, notes: "Need to be more consistent", completed: true },
            { date: "2024-11-10", type: "Home Workout", duration: 20, notes: "Difficult to stay motivated", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 195, current: 192, unit: "lbs" },
            { title: "Consistency", target: 70, current: 35, unit: "%" }
        ],
        monthlySpend: 0,
        totalVisits: 0
    },
    {
        id: "learner-21",
        name: "Monica Lewis",
        email: "monica.l@email.com",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
        membershipType: "standard",
        joinDate: "2024-04-18",
        gymId: "gym-5",
        status: "on-track",
        program: "Athletic Performance",
        currentWeight: 132,
        startWeight: 128,
        goalWeight: 135,
        sessionsCompleted: 30,
        totalSessions: 48,
        lastWorkout: "1 hour ago",
        metrics: {
            strength: 82,
            cardio: 88,
            flexibility: 75,
            consistency: 88
        },
        recentActivity: [
            { date: "2024-11-30", type: "Speed & Agility", duration: 55, notes: "Crushing my goals!", completed: true },
            { date: "2024-11-29", type: "Strength Training", duration: 60, notes: "New squat PR", completed: true }
        ],
        goals: [
            { title: "Muscle Gain", target: 135, current: 132, unit: "lbs" },
            { title: "Sprint Speed", target: 100, current: 85, unit: "score" }
        ],
        monthlySpend: 249,
        totalVisits: 88
    },
    {
        id: "learner-22",
        name: "George Martinez",
        email: "george.m@email.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        membershipType: "premium",
        joinDate: "2023-12-10",
        trainerId: "trainer-10",
        gymId: "gym-5",
        status: "active",
        program: "Senior Fitness",
        currentWeight: 165,
        startWeight: 172,
        goalWeight: 160,
        sessionsCompleted: 44,
        totalSessions: 48,
        lastWorkout: "Yesterday",
        metrics: {
            strength: 72,
            cardio: 75,
            flexibility: 80,
            consistency: 92
        },
        recentActivity: [
            { date: "2024-11-29", type: "Low Impact Cardio", duration: 40, notes: "Feeling great!", completed: true },
            { date: "2024-11-27", type: "Balance & Stability", duration: 35, notes: "Improving steadily", completed: true }
        ],
        goals: [
            { title: "Weight Loss", target: 172, current: 165, unit: "lbs" },
            { title: "Balance Score", target: 90, current: 80, unit: "%" }
        ],
        monthlySpend: 324,
        totalVisits: 134
    }
];
// Helper functions to get related data
function getGymById(gymId) {
    return exports.gyms.find(gym => gym.id === gymId);
}
function getTrainerById(trainerId) {
    return exports.trainers.find(trainer => trainer.id === trainerId);
}
function getLearnerById(learnerId) {
    return exports.learners.find(learner => learner.id === learnerId);
}
function getTrainersByGymId(gymId) {
    return exports.trainers.filter(trainer => trainer.gymId === gymId);
}
function getLearnersByTrainerId(trainerId) {
    return exports.learners.filter(learner => learner.trainerId === trainerId);
}
function getLearnersByGymId(gymId) {
    return exports.learners.filter(learner => learner.gymId === gymId);
}
function getLearnersWithoutTrainer() {
    return exports.learners.filter(learner => !learner.trainerId);
}
function getLearnersWithoutGym() {
    return exports.learners.filter(learner => !learner.gymId);
}
function getIndependentLearners() {
    return exports.learners.filter(learner => !learner.trainerId && !learner.gymId);
}
