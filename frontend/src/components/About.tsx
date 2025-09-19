import { Droplet, Target, TrendingUp } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  const aboutItems = [
    {
      icon: Target,
      title: t('waterCrisis'),
      description: t('waterCrisisDesc'),
    },
    {
      icon: Droplet,
      title: t('ourSolution'),
      description: t('ourSolutionDesc'),
    },
    {
      icon: TrendingUp,
      title: t('sustainableFuture'),
      description: t('sustainableFutureDesc'),
    },
  ];
  return (
    <SectionWrapper id="about" title={t('aboutTitle')}>
      <div className="grid md:grid-cols-3 gap-8 backdrop-blur-xl">
        {aboutItems.map((item, index) => (
          <div key={index} className="p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-border text-center flex flex-col items-center">
            <div className="mb-4 bg-primary/10 p-3 rounded-full">
              <item.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-white/80">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default About;
