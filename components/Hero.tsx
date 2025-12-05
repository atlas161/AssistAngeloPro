import React from 'react';
import { PlatformInfo, GitHubAsset } from '../types';
import { Card } from './Card';

interface HeroProps {
  platform: PlatformInfo;
  bestAsset: GitHubAsset | null;
  loading: boolean;
  versionName: string;
}

const osNames: Record<string, string> = {
  windows: 'Windows',
  mac: 'macOS',
  linux: 'Linux',
  android: 'Android',
  ios: 'iOS',
  other: 'Système'
};

const archNames: Record<string, string> = {
  x86_64: '64-bit',
  x86: '32-bit',
  arm64: 'Apple Silicon / ARM'
};

export const Hero: React.FC<HeroProps> = ({ platform, bestAsset, loading, versionName }) => {
  const osLabel = osNames[platform.os] || 'Inconnu';
  const archLabel = archNames[platform.arch] || '';
  
  const handleDownload = (e: React.MouseEvent) => {
    if (!bestAsset) e.preventDefault();
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 pt-12 pb-8 animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 text-blue-600 dark:text-blue-300 backdrop-blur-md text-sm font-semibold mb-6 animate-slide-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>Angelo Pro vous accompagne</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          Ctrl + Alt + <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Assistance</span>
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium animate-slide-up" style={{ animationDelay: '200ms' }}>
          La simplicité ultime pour le support à distance.
        </p>
      </div>

      <Card className="animate-slide-up transform hover:scale-[1.01] transition-transform duration-500" delay="300ms">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Téléchargement Intelligent</h2>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-lg">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               <span className="text-sm font-medium">Détecté: {osLabel} {archLabel}</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3 w-full md:w-auto">
            {loading ? (
               <div className="h-14 w-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
            ) : bestAsset ? (
              <a 
                href={bestAsset.browser_download_url}
                onClick={handleDownload}
                className="group relative flex items-center justify-center space-x-3 w-full md:w-auto px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Télécharger</span>
              </a>
            ) : (
              <button disabled className="px-8 py-4 bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600 rounded-2xl font-bold cursor-not-allowed">
                Non disponible
              </button>
            )}
            
            <div className="text-xs font-medium text-gray-400 dark:text-gray-500">
               Version {versionName || '...'}
            </div>
          </div>

        </div>
      </Card>
    </section>
  );
};
