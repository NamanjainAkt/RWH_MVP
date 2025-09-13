import { Droplets, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/90 border-t border-border rounded-xl mx-4 my-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Droplets className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-white">AquaGenius</span>
            </a>
            <p className="text-text-secondary text-sm max-w-xs">
              Smart, data-driven guidance for sustainable water solutions.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-white/60 mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-sm text-text-secondary hover:text-primary">About</a></li>
                <li><a href="#features" className="text-sm text-text-secondary hover:text-primary">Features</a></li>
                <li><a href="#how-it-works" className="text-sm text-text-secondary hover:text-primary">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white/60 mb-4">Community</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">Workshops</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">Get Involved</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white/60 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} AquaGenius. A project for SIH 2025.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a href="#" className="text-text-secondary hover:text-primary"><Twitter size={20} /></a>
            <a href="#" className="text-text-secondary hover:text-primary"><Linkedin size={20} /></a>
            <a href="#" className="text-text-secondary hover:text-primary"><Github size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
