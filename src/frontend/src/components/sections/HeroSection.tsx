import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="section-container py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>Electrical Panels, Energy Meters & Motors</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Quality Electrical Panels, Meters & Motors for Your Business
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Vinod Electriclas delivers reliable electrical panels, precision energy meters, and high-performance motors. From control panels to motor starters, we provide quality products and solutions for industrial and commercial applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={scrollToContact} className="text-lg px-8">
                Request a Quote
              </Button>
              <Button size="lg" variant="outline" onClick={() => {
                const element = document.querySelector('#services');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}>
                Our Products
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-warm">
              <img
                src="/assets/generated/vinod-electriclas-hero-real.dim_1600x900.png"
                alt="Electrical distribution panels and energy meters installation"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
