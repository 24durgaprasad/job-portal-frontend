import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAuth } from "@clerk/clerk-react";
import LayoutPage from './layout/layoutpage';
import LandingPage from './pages/landingpage';
import Onboarding from './pages/onboarding';
import JobListing from "./pages/JobListing";
import PostJob from "./pages/PostJob";
import './App.css';

function App() {
  const { getToken } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const saveUser = async () => {
      try {
        const token = await getToken({ template: "your-template" });
        if (token) {
          await fetch(`${API_BASE_URL}/api/user/save`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        }
      } catch (error) {
        console.error("Error saving user:", error);
      }
    };

    saveUser();
  }, [getToken, API_BASE_URL]);

  const routes = createBrowserRouter([
    {
      element: <LayoutPage />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/onboarding",
          element: <Onboarding />,
        },
        {
          path: "/jobs",
          element: <JobListing />,
        },
        {
          path: "/post-job",
          element: <PostJob />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
