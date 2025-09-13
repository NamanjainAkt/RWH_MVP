import { useState, useEffect } from 'react';
import { Droplets, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#impact', label: 'Impact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/60 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2">
            <Droplets className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-white">AquaGenius</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a
              href="#get-started"
              className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              Get Started
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-6 h-6 text-text" />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-0 left-0 w-full bg-surface border-b border-border shadow-lg"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center mb-4">
                <a href="#" className="flex items-center gap-2">
                  <Droplets className="w-8 h-8 text-primary" />
                  <span className="text-xl font-bold text-text">AquaGenius</span>
                </a>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6 text-text" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#get-started"
                  className="mt-4 px-5 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
