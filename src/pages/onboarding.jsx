import React from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Onboarding = () => {
  return (
    <div className="text-center px-4 py-20">
      {/* Heading */}
      <h1 className="text-4xl sm:text-6xl font-extrabold mb-12">I am a...</h1>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <Link to="/">
          <Button className="bg-blue-500 text-lg w-full sm:w-auto px-8 py-6 lg:px-20 lg:py-10 hover:bg-blue-600">
            Candidate
          </Button>
        </Link>
        <Link to="/">
          <Button className="bg-red-500 text-lg w-full sm:w-auto px-8 py-6 lg:px-20 lg:py-10 hover:bg-red-600">
            Recruiter
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Onboarding;
