# FitMate - Seeded User Credentials

All users have the password: **123456**

## Gym Owners (5 users)

| Email | Password | Gym Name |
|-------|----------|----------|
| info@fitcoreelite.com | 123456 | FitCore Elite |
| contact@powerhousefitness.com | 123456 | PowerHouse Fitness |
| hello@zenyogastudio.com | 123456 | Zen Yoga Studio |
| info@ironvalleygym.com | 123456 | Iron Valley Gym |
| performance@apexcenter.com | 123456 | Apex Performance Center |

## Trainers (10 users)

| Email | Password | Name | Specialty | Gym Affiliation |
|-------|----------|------|-----------|-----------------|
| sarah.johnson@fitmate.com | 123456 | Sarah Johnson | Weight Loss & Nutrition | FitCore Elite |
| mike.rodriguez@fitmate.com | 123456 | Mike Rodriguez | Strength & Muscle Building | FitCore Elite |
| lisa.wang@fitmate.com | 123456 | Lisa Wang | HIIT & Cardio | FitCore Elite |
| marcus.thompson@fitmate.com | 123456 | Marcus Thompson | CrossFit & Functional Training | PowerHouse Fitness |
| amanda.foster@fitmate.com | 123456 | Amanda Foster | Powerlifting & Olympic Lifting | PowerHouse Fitness |
| emily.rodriguez@fitmate.com | 123456 | Emily Rodriguez | Yoga & Mindfulness | Zen Yoga Studio |
| daniel.park@fitmate.com | 123456 | Daniel Park | Pilates & Core Conditioning | Zen Yoga Studio |
| ryan.mitchell@fitmate.com | 123456 | Ryan Mitchell | Boxing & Combat Sports | Iron Valley Gym |
| nicole.adams@fitmate.com | 123456 | Nicole Adams | Sports Performance & Conditioning | Apex Performance Center |
| kevin.zhang@fitmate.com | 123456 | Kevin Zhang | Senior Fitness & Rehabilitation | Apex Performance Center |

## Learners (22 users)

### Learners with Trainer AND Gym (7 users)
| Email | Password | Name | Trainer | Gym |
|-------|----------|------|---------|-----|
| sarah.m@email.com | 123456 | Sarah Martinez | Sarah Johnson | FitCore Elite |
| jessica.l@email.com | 123456 | Jessica Lee | Sarah Johnson | FitCore Elite |
| michael.c@email.com | 123456 | Michael Chen | Mike Rodriguez | FitCore Elite |
| emily.r@email.com | 123456 | Emily Rodriguez | Emily Rodriguez (Trainer) | Zen Yoga Studio |
| david.t@email.com | 123456 | David Thompson | Marcus Thompson | PowerHouse Fitness |
| robert.k@email.com | 123456 | Robert Kim | Lisa Wang | FitCore Elite |
| james.w@email.com | 123456 | James Wilson | Amanda Foster | PowerHouse Fitness |

### Learners with Trainer but NO Gym (3 users)
| Email | Password | Name | Trainer |
|-------|----------|------|---------|
| chris.b@email.com | 123456 | Chris Baker | Ryan Mitchell |
| sophia.a@email.com | 123456 | Sophia Anderson | Nicole Adams |
| marcus.j@email.com | 123456 | Marcus Johnson | Sarah Johnson |

### Learners with Gym but NO Trainer (5 users)
| Email | Password | Name | Gym |
|-------|----------|------|-----|
| linda.m@email.com | 123456 | Linda Martinez | Zen Yoga Studio |
| thomas.w@email.com | 123456 | Thomas White | FitCore Elite |
| rachel.g@email.com | 123456 | Rachel Green | PowerHouse Fitness |
| kevin.b@email.com | 123456 | Kevin Brown | Iron Valley Gym |
| monica.l@email.com | 123456 | Monica Lewis | Apex Performance Center |

### Learners with NEITHER Trainer NOR Gym (6 users)
| Email | Password | Name |
|-------|----------|------|
| patricia.b@email.com | 123456 | Patricia Brown |
| daniel.m@email.com | 123456 | Daniel Miller |
| jennifer.d@email.com | 123456 | Jennifer Davis |
| brian.w@email.com | 123456 | Brian Wilson |
| amanda.t@email.com | 123456 | Amanda Taylor |
| steven.g@email.com | 123456 | Steven Garcia |

### Special Case: Learner with Trainer AND Gym (1 user)
| Email | Password | Name | Trainer | Gym |
|-------|----------|------|---------|-----|
| george.m@email.com | 123456 | George Martinez | Kevin Zhang | Apex Performance Center |

## Summary

- **Total Users**: 37
- **Gym Owners**: 5
- **Trainers**: 10 (some affiliated with gyms, some independent)
- **Learners**: 22 (various combinations of trainer/gym relationships)

## Testing Scenarios

1. **Gym Owner Dashboard**: Login as any gym owner to see their trainers and members
2. **Trainer Dashboard**: Login as a trainer to see their clients
3. **Learner Dashboard**: Login as different learners to see various states:
   - With trainer and gym
   - With trainer only
   - With gym only
   - Independent (no trainer or gym)
