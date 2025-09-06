import { Leaf, Coins } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

const Impact = () => {
  return (
    <SectionWrapper id="impact" title="Unlock Tangible Benefits">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 bg-gradient-to-br from-primary/20 to-surface rounded-2xl border border-primary/50 flex flex-col justify-center items-center text-center">
          <Leaf className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-2xl font-bold text-text mb-2">Environmental Impact</h3>
          <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
            1 Lakh+
          </p>
          <p className="text-text-secondary">Liters of water saved per year for an average household.</p>
        </div>
        <div className="p-8 bg-gradient-to-br from-secondary/20 to-surface rounded-2xl border border-secondary/50 flex flex-col justify-center items-center text-center">
          <Coins className="w-12 h-12 text-secondary mb-4" />
          <h3 className="text-2xl font-bold text-text mb-2">Financial Savings</h3>
          <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent mb-2">
            2 Years
          </p>
          <p className="text-text-secondary">Average payback period on your initial investment.</p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Impact;
