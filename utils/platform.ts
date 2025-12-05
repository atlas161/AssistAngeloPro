import { PlatformInfo, GitHubAsset } from '../types';

export function detectPlatform(): PlatformInfo {
  const ua = navigator.userAgent.toLowerCase();
  const p: PlatformInfo = { os: "other", arch: "x86_64", mobile: false };

  if (/windows/.test(ua)) p.os = "windows";
  else if (/mac os|macintosh/.test(ua)) p.os = "mac";
  else if (/linux/.test(ua)) p.os = "linux";
  else if (/android/.test(ua)) { p.os = "android"; p.mobile = true; }
  else if (/iphone|ipad|ipod/.test(ua)) { p.os = "ios"; p.mobile = true; }

  if (/arm64|aarch64/.test(ua)) p.arch = "arm64";
  else if (/x86_64|win64|x64|amd64/.test(ua)) p.arch = "x86_64";
  else if (/i686|x86|win32/.test(ua)) p.arch = "x86";

  return p;
}

export function formatBytes(bytes: number, decimals = 1) {
  if (!bytes) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function selectBestAsset(assets: GitHubAsset[], platform: PlatformInfo): GitHubAsset | null {
  const is = (ext: string) => assets.filter(a => a.name.toLowerCase().endsWith(ext));

  if (platform.os === "windows") {
    let c = assets.filter(a => /\.msi$/.test(a.name.toLowerCase()) || /\.exe$/.test(a.name.toLowerCase()));
    
    // Filter out unsigned if possible, or prioritize
    // Simple logic based on arch
    if (platform.arch === "arm64") {
        c = c.filter(a => a.name.toLowerCase().includes("arm64") || a.name.toLowerCase().includes("aarch64"));
    } else if (platform.arch === "x86") {
        c = c.filter(a => a.name.toLowerCase().includes("x86") || a.name.toLowerCase().includes("x86_32") || a.name.toLowerCase().includes("32"));
    } else {
        c = c.filter(a => a.name.toLowerCase().includes("x86_64") || a.name.toLowerCase().includes("64"));
    }
    
    // Prioritize .exe over .msi for simple users, or vice versa. 
    // Original code: sort .msi first.
    c = c.sort((a, b) => a.name.endsWith(".msi") && b.name.endsWith(".exe") ? -1 : 1);
    return c[0] || null;
  }

  if (platform.os === "mac") {
    let c = is(".dmg");
    if (platform.arch === "arm64") {
        c = c.filter(a => a.name.toLowerCase().includes("arm64") || a.name.toLowerCase().includes("aarch64"));
    } else {
        c = c.filter(a => a.name.toLowerCase().includes("x64") || a.name.toLowerCase().includes("x86_64"));
    }
    return c[0] || is(".pkg")[0] || null;
  }

  if (platform.os === "linux") {
    let c = assets.filter(a => /\.deb$|\.rpm$|appimage/i.test(a.name));
    if (platform.arch === "arm64") {
        c = c.filter(a => /arm64|aarch64/i.test(a.name));
    } else {
        c = c.filter(a => /x86_64|amd64|x64/i.test(a.name));
    }
    return c[0] || null;
  }

  if (platform.os === "android") {
    const c = assets.filter(a => a.name.toLowerCase().endsWith(".apk"));
    // Prefer universal or arm64
    return c.find(a => a.name.includes("aarch64")) || c[0] || null;
  }

  return null;
}
