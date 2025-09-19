import SectionWrapper from './SectionWrapper';
import { useLanguage } from '../contexts/LanguageContext';

const logos = [
  { name: 'IMD', url: '/imd-logo.png' },
  { name: 'CGWB', url: '/cgwb-logo.png' },
  { name: 'Ministry of Jal Shakti', url: '/jal-shakti-logo.png' },
];

const References = () => {
  const { t } = useLanguage();
  return (
    <SectionWrapper id="references" title={t('referencesTitle')}>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
        <p className="font-semibold text-white">IMD</p>
        <p className="font-semibold text-white">CGWB</p>
        <p className="font-semibold text-white">Ministry of Jal Shakti</p>
      </div>
      <p className="text-center text-white/80 text-sm mt-8">
        {t('referencesDesc')}
      </p>
    </SectionWrapper>
  );
};

export default References;
