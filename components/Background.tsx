import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Light Mode Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob dark:hidden"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 dark:hidden"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 dark:hidden"></div>

      {/* Dark Mode Blobs (More subtle, darker colors) */}
      <div className="hidden dark:block absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/40 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="hidden dark:block absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/40 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};
