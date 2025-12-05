import React from 'react';
import { GitHubAsset, PlatformInfo } from '../types';
import { formatBytes } from '../utils/platform';
import { Card } from './Card';

interface AssetListProps {
  assets: GitHubAsset[];
  platform: PlatformInfo;
}

export const AssetList: React.FC<AssetListProps> = ({ assets, platform }) => {
  // Filter relevant assets to avoid clutter (similar to original logic but slightly broader)
  const filtered = assets.filter(a => {
    const n = a.name.toLowerCase();
    // Don't show source code zip/tar.gz usually
    if (n.includes('source code')) return false;
    return true;
  });

  // Prioritize showing assets for the user's OS at the top, then others
  const sorted = [...filtered].sort((a, b) => {
    const nA = a.name.toLowerCase();
    const nB = b.name.toLowerCase();
    let scoreA = 0;
    let scoreB = 0;

    if (platform.os === 'windows' && (nA.endsWith('.exe') || nA.endsWith('.msi'))) scoreA += 10;
    if (platform.os === 'mac' && (nA.endsWith('.dmg'))) scoreA += 10;
    if (platform.os === 'linux' && (nA.endsWith('.deb') || nA.endsWith('.rpm'))) scoreA += 10;
    
    if (platform.os === 'windows' && (nB.endsWith('.exe') || nB.endsWith('.msi'))) scoreB += 10;
    if (platform.os === 'mac' && (nB.endsWith('.dmg'))) scoreB += 10;
    if (platform.os === 'linux' && (nB.endsWith('.deb') || nB.endsWith('.rpm'))) scoreB += 10;

    return scoreB - scoreA;
  });

  return (
    <section className="w-full max-w-4xl mx-auto px-4 pb-20 animate-slide-up" style={{ animationDelay: '400ms' }}>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 px-2">Tous les fichiers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.slice(0, 10).map((asset, index) => (
          <Card key={asset.name} className="!p-4 !rounded-2xl hover:bg-white/90 dark:hover:bg-gray-800/80 group cursor-default">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-200 truncate pr-2">{asset.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{formatBytes(asset.size)}</p>
                </div>
              </div>
              <a 
                href={asset.browser_download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                aria-label={`Download ${asset.name}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
         <a href="https://github.com/rustdesk/rustdesk/releases" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
            Voir toutes les options sur GitHub &rarr;
         </a>
      </div>
    </section>
  );
};
