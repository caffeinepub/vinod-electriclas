import { Shield, Clock, FileCheck, Award, Headphones, Truck } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Rigorous testing and quality control for every panel, meter, and motor',
  },
  {
    icon: FileCheck,
    title: 'Full Documentation',
    description: 'Complete technical documentation, schematics, and test certificates',
  },
  {
    icon: Shield,
    title: 'Customization',
    description: 'Tailored solutions designed to meet your specific requirements',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    description: 'On-time delivery with careful packaging and logistics coordination',
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    description: 'Expert after-sales support and technical assistance when you need it',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Efficient production timelines without compromising on quality',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference of working with a trusted electrical equipment provider
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
