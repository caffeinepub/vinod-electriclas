import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, Zap, Settings, Cpu } from 'lucide-react';

const services = [
  {
    icon: Settings,
    title: 'Control Panels',
    description: 'Custom-designed control panels for industrial automation and process control. Built to specification with quality components, comprehensive testing, and full documentation.',
  },
  {
    icon: Zap,
    title: 'Distribution Panels',
    description: 'Reliable power distribution panels and switchboards for commercial and industrial facilities. Engineered for safety, efficiency, and easy maintenance.',
  },
  {
    icon: Gauge,
    title: 'Energy Meters',
    description: 'Precision energy meters and monitoring solutions for accurate power measurement. Digital and analog options with data logging and remote monitoring capabilities.',
  },
  {
    icon: Cpu,
    title: 'Motor Starters & VFDs',
    description: 'Motor control solutions including soft starters, variable frequency drives, and motor protection systems. Optimized for performance and energy efficiency.',
  },
];

const productImages = [
  {
    src: '/assets/generated/vinod-electriclas-panel-1.dim_1600x900.jpg',
    alt: 'Electrical control panel with circuit breakers and wiring',
  },
  {
    src: '/assets/generated/vinod-electriclas-panel-2.dim_1600x900.jpg',
    alt: 'Industrial electrical distribution panel interior',
  },
  {
    src: '/assets/generated/vinod-electriclas-meter-1.dim_1600x900.jpg',
    alt: 'Digital energy meter close-up display',
  },
  {
    src: '/assets/generated/vinod-electriclas-meter-2.dim_1600x900.jpg',
    alt: 'Multiple installed energy meters in electrical panel',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Products & Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive electrical equipment for industrial and commercial applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-warm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Product Gallery */}
        <div className="mt-12">
          <div className="text-center space-y-4 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold">Our Work</h3>
            <p className="text-muted-foreground">
              Real installations of panels and meters
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productImages.map((image, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-warm bg-card aspect-video"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
