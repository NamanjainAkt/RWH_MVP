import { Calculator, BarChart2, Database, Languages, FileDown, LucideProps } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface Feature {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Calculator,
    title: 'Real-time RWH Potential Calculator',
    description: 'Instantly calculate your rooftop\'s water harvesting capacity based on area, rainfall, and filter efficiency.',
  },
  {
    icon: BarChart2,
    title: 'Cost–Benefit & ROI Analysis',
    description: 'Receive a detailed financial breakdown, including installation costs, potential savings, and return on investment.',
  },
  {
    icon: Database,
    title: 'Government Data Integration',
    description: 'Leverages official data from IMD & CGWB for the most accurate rainfall and groundwater level information.',
  },
  {
    icon: Languages,
    title: 'Multi-language Support',
    description: 'Accessible to a diverse audience with support for multiple regional languages for wider adoption.',
  },
  {
    icon: FileDown,
    title: 'Downloadable PDF Reports',
    description: 'Generate and download comprehensive, shareable reports of your assessment for planning and records.',
  },
];

const Features = () => {
  return (
    <SectionWrapper id="features" title="Powerful Features, Simplified">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-surface rounded-2xl border border-border transition-all duration-300 hover:border-primary hover:-translate-y-1">
            <div className="mb-4 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text">{feature.title}</h3>
            </div>
            <p className="text-text-secondary text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Features;
