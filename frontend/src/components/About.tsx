import { Droplet, Target, TrendingUp } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

const aboutItems = [
  {
    icon: Target,
    title: 'The Water Crisis',
    description: 'Urban areas face increasing water scarcity due to climate change and population growth, straining traditional water sources.',
  },
  {
    icon: Droplet,
    title: 'Our Solution',
    description: 'AquaGenius provides personalized, data-driven assessments for rooftop rainwater harvesting, empowering you to become water-independent.',
  },
  {
    icon: TrendingUp,
    title: 'Sustainable Future',
    description: 'By harnessing rainwater, we reduce reliance on municipal supplies, recharge groundwater, and build resilient communities.',
  },
];

const About = () => {
  return (
    <SectionWrapper id="about" title="Your Partner in Water Sustainability">
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
