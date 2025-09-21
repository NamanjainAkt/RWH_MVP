import { useState, useEffect } from 'react';
import { Droplets, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#features', label: t('features') },
    { href: '#how-it-works', label: t('howItWorks') },
    { href: '#impact', label: t('impact') },
  ];

  const dashboardLinks = [
    { to: '/vendor-dashboard', label: 'Vendor Dashboard' },
    { to: '/municipal-dashboard', label: 'Municipal Dashboard' },
    { to: '/calculator', label: 'Calculator' }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

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
          <Link to="/" className="flex items-center gap-2">
            <Droplets className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-white">{t('brandName')}</span>
          </Link>
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
            {dashboardLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <div 
            onClick={toggleLanguage}
            className='flex items-center py-1.5 w-16 text-xs font-medium text-white hover:text-primary transition-colors duration-300 border border-white/20 rounded-md hover:border-primary/50 px-2'>
               <Globe className="w-3 h-3 mr-4" />
              <span>{language === 'en' ? 'हिं' : 'EN'}</span>
            </div>
            <a
              href="#get-started"
              className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              {t('getStarted')}
            </a>
          </div>
          <div className={`md:hidden w-2 h-2 flex items-center mx-2 px-2 mr-8`}>
            <button className='border-none' onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-6 h-6 text-white" />
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
                  <span className="text-xl font-bold text-black">{t('brandName')}</span>
                </a>
                <div className='w-2 h-2 flex items-center mx-2 px-2 mr-8'>
                  <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6 text-black border-none " />
                </button>
                </div>
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
                {dashboardLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-text-secondary hover:text-primary transition-colors duration-300 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-black hover:text-primary transition-colors duration-300 border border-black/20 rounded-md hover:border-primary/50 mb-2"
                >
                  <Globe className="w-3 h-3" />
                  <span>{language === 'en' ? 'हिं' : 'EN'}</span>
                </button>
                <a
                  href="#get-started"
                  className="mt-4 px-5 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('getStarted')}
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
