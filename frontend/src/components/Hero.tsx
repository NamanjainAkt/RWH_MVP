import { motion } from 'framer-motion';
import { MoveRight, PlayCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 rounded-lg">
        <img
          src="/BG.jpg"
          alt="Eco-friendly water solution background"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0  backdrop-blur-sm rounded-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-background/20 to-black rounded-lg"></div>

      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-white tracking-tighter mb-6">
            {t('heroTitle')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-green-600">
              {t('heroSubtitle')}
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white mb-10">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary rounded-full shadow-lg shadow-primary/30 hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300"
            >
              {t('getStarted')} <MoveRight className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-text bg-surface/50 border border-border rounded-full hover:bg-surface transform hover:scale-105 transition-all duration-300"
            >
              <PlayCircle className="w-5 h-5 text-accent" /> {t('learnMore')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
