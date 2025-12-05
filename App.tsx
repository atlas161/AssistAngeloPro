import React, { useEffect, useState } from 'react';
import { Background } from './components/Background';
import { ThemeToggle } from './components/ThemeToggle';
import { Hero } from './components/Hero';
import { AssetList } from './components/AssetList';
import { detectPlatform, selectBestAsset } from './utils/platform';
import { fetchLatestRelease } from './services/github';
import { AppState, PlatformInfo, GitHubAsset } from './types';

const App: React.FC = () => {
  const [platform, setPlatform] = useState<PlatformInfo>({ os: 'other', arch: 'x86_64', mobile: false });
  const [state, setState] = useState<AppState>({ release: null, loading: true, error: null });
  const [bestAsset, setBestAsset] = useState<GitHubAsset | null>(null);

  useEffect(() => {
    // 1. Detect Platform
    const p = detectPlatform();
    setPlatform(p);

    // 2. Fetch Data
    const initData = async () => {
      try {
        const release = await fetchLatestRelease();
        setState({ release, loading: false, error: null });
        
        // 3. Find Best Asset
        const best = selectBestAsset(release.assets, p);
        setBestAsset(best);
      } catch (err) {
        setState({ release: null, loading: false, error: "Erreur de connexion GitHub" });
      }
    };

    initData();
  }, []);

  return (
    <div className="relative min-h-screen font-sans selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-100">
      <Background />
      
      {/* Navigation / Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 backdrop-blur-sm"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80 backdrop-blur-sm"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 backdrop-blur-sm"></div>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-24 pb-12 flex flex-col items-center justify-center min-h-[80vh]">
        <Hero 
          platform={platform} 
          bestAsset={bestAsset} 
          loading={state.loading} 
          versionName={state.release?.name || state.release?.tag_name || ''} 
        />
        
        {!state.loading && state.release && (
          <AssetList assets={state.release.assets} platform={platform} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 text-gray-400 dark:text-gray-600 text-xs font-medium">
        <p>&copy; 2025 Assistance RustDesk. Designé avec simplicité.</p>
      </footer>
    </div>
  );
};

export default App;
