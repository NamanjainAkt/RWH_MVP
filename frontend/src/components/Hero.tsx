import { motion } from 'framer-motion';
import { MoveRight, PlayCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 rounded-lg">
        <img
          src="https://images.pexels.com/photos/2290328/pexels-photo-2290328.jpeg"
          alt="Eco-friendly water solution background"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0  backdrop-blur-sm rounded-lg"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-background/20 to-transparent rounded-lg"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-white tracking-tighter mb-6">
            Assess Your Rainwater
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-green-600">
              Harvesting Potential
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white mb-10">
            Smart, data-driven guidance for sustainable water solutions. Turn your rooftop into a source of clean, reliable water.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary rounded-full shadow-lg shadow-primary/30 hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300"
            >
              Get Started <MoveRight className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-text bg-surface/50 border border-border rounded-full hover:bg-surface transform hover:scale-105 transition-all duration-300"
            >
              <PlayCircle className="w-5 h-5 text-accent" /> Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
