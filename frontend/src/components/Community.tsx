import { MoveRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {Link} from 'react-router-dom';

const Community = () => {
  const { t } = useLanguage();
  return (
    <section id="get-started" className="py-20 sm:py-32 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-black/90 p-10 md:p-16 rounded-3xl border border-border">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-400 mb-4">
              {t('joinMovement')}
            </h2>
            <p className="max-w-2xl mx-auto text-indigo-200 mb-8">
              {t('joinMovementDesc')}
            </p>
            <Link
              to="/calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary rounded-full shadow-lg shadow-primary/30 hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300"
            >
              {t('assessNow')} <MoveRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
