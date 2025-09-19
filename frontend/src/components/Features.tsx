import { Calculator, BarChart2, Database, Languages, FileDown, LucideProps } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Feature {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
}

const Features = () => {
  const { t } = useLanguage();
  
  const features: Feature[] = [
    {
      icon: Calculator,
      title: t('realTimeCalculator'),
      description: t('realTimeCalculatorDesc'),
    },
    {
      icon: BarChart2,
      title: t('costBenefitAnalysis'),
      description: t('costBenefitAnalysisDesc'),
    },
    {
      icon: Database,
      title: t('govDataIntegration'),
      description: t('govDataIntegrationDesc'),
    },
    {
      icon: Languages,
      title: t('multiLanguage'),
      description: t('multiLanguageDesc'),
    },
    {
      icon: FileDown,
      title: t('downloadReports'),
      description: t('downloadReportsDesc'),
    },
  ];
  return (
    <SectionWrapper id="features" title={t('featuresTitle')}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-black/40 rounded-2xl border border-border transition-all duration-300 hover:border-primary hover:-translate-y-1">
            <div className="mb-4 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white">{feature.title}</h3>
            </div>
            <p className="text-white/80 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Features;
