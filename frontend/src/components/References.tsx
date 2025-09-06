import SectionWrapper from './SectionWrapper';

const logos = [
  { name: 'IMD', url: '/imd-logo.png' },
  { name: 'CGWB', url: '/cgwb-logo.png' },
  { name: 'Ministry of Jal Shakti', url: '/jal-shakti-logo.png' },
];

const References = () => {
  return (
    <SectionWrapper id="references" title="Powered by Credible Data">
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
        <p className="font-semibold text-text-secondary">IMD</p>
        <p className="font-semibold text-text-secondary">CGWB</p>
        <p className="font-semibold text-text-secondary">Ministry of Jal Shakti</p>
      </div>
      <p className="text-center text-sm text-text-secondary mt-8">
        We use official, up-to-date data from India's leading meteorological and water resource agencies to ensure the highest accuracy.
      </p>
    </SectionWrapper>
  );
};

export default References;
