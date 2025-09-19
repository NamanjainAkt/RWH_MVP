import { Edit3, Server, FileText } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { useLanguage } from '../contexts/LanguageContext';

const HowItWorks = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: Edit3,
      title: t('enterDetails'),
      description: t('enterDetailsDesc'),
    },
    {
      icon: Server,
      title: t('fetchData'),
      description: t('fetchDataDesc'),
    },
    {
      icon: FileText,
      title: t('generateReport'),
      description: t('generateReportDesc'),
    },
  ];
  return (
    <SectionWrapper id="how-it-works" title={t('howItWorksTitle')}>
      <div className="relative">
        <div className="absolute left-1/2 top-12 bottom-12 w-0.5 bg-border hidden md:block" />
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              {/* <div className="absolute -top-6 md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 h-0.5 w-full bg-border md:hidden" /> */}
              <div className="z-10 flex items-center justify-center w-16 h-16 bg-surface border-2 border-primary rounded-full mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-white/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HowItWorks;
