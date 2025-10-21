import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProgramsSection from '../components/ProgramsSection';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProgramsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;