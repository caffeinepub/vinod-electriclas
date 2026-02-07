import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/WhatsApp Image 2026-02-07 at 9.27.57 PM.jpeg"
                alt="Vinod Electriclas logo"
                className="h-12 w-12 object-contain"
              />
              <span className="text-xl font-bold">Vinod Electriclas</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Quality electrical panels, meters, and motors for industrial and commercial applications. Trusted provider of reliable electrical equipment and solutions.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <div>+91-9868119838</div>
                  <div>+91-9213538815</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>vinodkumar0228@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Shahdara, Delhi</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Vinod Electriclas. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.vinodelectricals.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              www.vinodelectricals.com
            </a>
            <span className="text-muted-foreground/50">•</span>
            <a
              href="#/admin"
              className="text-muted-foreground hover:text-foreground transition-colors text-xs"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
