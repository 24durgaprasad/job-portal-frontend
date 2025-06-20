import React from 'react';
import { Button } from './ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="mx-20 my-5 h-18 overflow-hidden flex items-center justify-between">
    <Link to="/onboarding"> <img src="/logo2.png" alt="logo" className="w-40 h-40" /> </Link> 

      {/* Show user button when signed in */}
      <SignedIn>
        <UserButton />
      </SignedIn>

      {/* Show sign in button when signed out */}
      <SignedOut>
        <SignInButton>
      <Link to="/" >   <Button variant="outline" className="bg-black hover:bg-gray-800 hover:text-white">
            Login
          </Button> </Link> 
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default Header;
