import { Leaf, Coins } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { useLanguage } from '../contexts/LanguageContext';

const Impact = () => {
  const { t } = useLanguage();
  return (
    <SectionWrapper id="impact" title={t('impactTitle')}>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 bg-gradient-to-br from-primary/20 to-surface rounded-2xl border border-primary/50 flex flex-col justify-center items-center text-center">
          <Leaf className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-2xl font-bold text-text mb-2">{t('environmentalImpact')}</h3>
          <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
            {t('environmentalStat')}
          </p>
          <p className="text-text-secondary">{t('environmentalDesc')}</p>
        </div>
        <div className="p-8 bg-gradient-to-br from-secondary/20 to-surface rounded-2xl border border-secondary/50 flex flex-col justify-center items-center text-center">
          <Coins className="w-12 h-12 text-secondary mb-4" />
          <h3 className="text-2xl font-bold text-text mb-2">{t('financialSavings')}</h3>
          <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent mb-2">
            {t('financialStat')}
          </p>
          <p className="text-text-secondary">{t('financialDesc')}</p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Impact;
