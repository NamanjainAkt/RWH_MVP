import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Impact from '../components/Impact';
import Community from '../components/Community';
import References from '../components/References';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className='bg-black/60 bg-cover rounded-lg'>
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Impact />
        <Community />
        <References />
      </main>
      <Footer />
    </div>
  );
}

export default Home;