import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 to-orange-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-white mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-orange-100 mb-8">
            Join thousands of satisfied clients who achieved their fitness goals with FitCoach Pro. 
            Start your free 7-day trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
              Schedule Consultation
            </Button>
          </div>
          <p className="mt-6 text-orange-100">
            ✓ No commitment required  ✓ Cancel anytime  ✓ Results guaranteed
          </p>
        </div>
      </div>
    </section>
  );
}
