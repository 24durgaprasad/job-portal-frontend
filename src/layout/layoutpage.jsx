import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/header";

const LayoutPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col text-white overflow-x-scroll ">
      <div className="relative flex-1 bg-slate-950">
        {/* Grid background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

        {/* Main content */}
        <main className="relative z-10">
          <Header />
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <div className="p-4 text-center bg-gray-800">
        Made with 💗 by DurgaprasadVulla
      </div>
    </div>
  );
};

export default LayoutPage;
