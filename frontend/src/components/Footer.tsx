import { Droplets, Twitter, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-black/90 border-t border-border rounded-xl mx-4 my-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Droplets className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-white">{t('brandName')}</span>
            </a>
            <p className="text-text-secondary text-sm max-w-xs">
              {t('tagline')}
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-white/60 mb-4">{t('platform')}</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-sm text-text-secondary hover:text-primary">{t('about')}</a></li>
                <li><a href="#features" className="text-sm text-text-secondary hover:text-primary">{t('features')}</a></li>
                <li><a href="#how-it-works" className="text-sm text-text-secondary hover:text-primary">{t('howItWorks')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white/60 mb-4">{t('community')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">{t('workshops')}</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">{t('getInvolved')}</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">{t('contactUs')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white/60 mb-4">{t('legal')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">{t('privacyPolicy')}</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">{t('termsOfService')}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} {t('brandName')}. {t('copyright')}
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a href="#" className="text-text-secondary hover:text-primary"><Twitter size={20} /></a>
            <a href="#" className="text-text-secondary hover:text-primary"><Linkedin size={20} /></a>
            <a href="#" className="text-text-secondary hover:text-primary"><Github size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
