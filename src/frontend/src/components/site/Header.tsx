import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Products' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm border-b shadow-sm'
          : 'bg-background'
      }`}
    >
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/WhatsApp Image 2026-02-07 at 9.27.57 PM.jpeg"
              alt="Vinod Electriclas logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-foreground">
              Vinod Electriclas
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                onClick={() => scrollToSection(link.href)}
                className="text-foreground hover:text-primary"
              >
                {link.label}
              </Button>
            ))}
            <Button
              onClick={() => scrollToSection('#contact')}
              className="ml-4"
            >
              Request a Quote
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    onClick={() => scrollToSection(link.href)}
                    className="justify-start text-lg"
                  >
                    {link.label}
                  </Button>
                ))}
                <Button
                  onClick={() => scrollToSection('#contact')}
                  className="mt-4"
                >
                  Request a Quote
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
