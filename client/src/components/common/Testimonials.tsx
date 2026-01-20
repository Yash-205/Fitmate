import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jessica Martinez",
    role: "Lost 35 lbs in 4 months",
    content: "FitCoach Pro completely transformed my life. The personalized plan and constant support from my trainer kept me motivated. I've never felt better!",
    rating: 5,
    initials: "JM",
  },
  {
    name: "David Thompson",
    role: "Gained 20 lbs of muscle",
    content: "The muscle building program exceeded my expectations. My trainer's expertise and the structured workout plans made all the difference. Highly recommend!",
    rating: 5,
    initials: "DT",
  },
  {
    name: "Rachel Lee",
    role: "Marathon Runner",
    content: "As an athlete, I needed specialized training. The athletic performance program helped me PR my marathon time by 15 minutes. Outstanding coaching!",
    rating: 5,
    initials: "RL",
  },
  {
    name: "Michael Brown",
    role: "Busy Professional",
    content: "With my hectic schedule, I thought fitness was impossible. The flexible scheduling and quick workouts fit perfectly into my life. Down 25 lbs!",
    rating: 5,
    initials: "MB",
  },
  {
    name: "Amanda Foster",
    role: "New Mom",
    content: "After having my baby, I struggled to get back in shape. The supportive community and understanding trainers made my postpartum fitness journey amazing.",
    rating: 5,
    initials: "AF",
  },
  {
    name: "James Wilson",
    role: "Senior Executive",
    content: "At 55, I wasn't sure if I could get fit again. My trainer proved age is just a number. I'm stronger and healthier than I was in my 30s!",
    rating: 5,
    initials: "JW",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-gray-600">
            Real results from real people. See how our clients transformed their lives 
            with personalized coaching and dedication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-gray-200">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-orange-600 fill-orange-600" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-orange-100 text-orange-600">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
