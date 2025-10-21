import React from 'react';
import Header from '../components/Header';
import ProgramsSection from '../components/ProgramsSection';
import Footer from '../components/Footer';

const Programs: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 font-['Inter'] mb-4">CDL Training Programs</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose from our comprehensive CDL training programs designed to get you road-ready and job-ready.
            </p>
          </div>
          <ProgramsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Programs;