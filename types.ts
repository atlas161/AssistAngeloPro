export interface GitHubAsset {
  name: string;
  size: number;
  browser_download_url: string;
  content_type: string;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  assets: GitHubAsset[];
  published_at: string;
}

export interface PlatformInfo {
  os: 'windows' | 'mac' | 'linux' | 'android' | 'ios' | 'other';
  arch: 'x86_64' | 'x86' | 'arm64';
  mobile: boolean;
}

export interface AppState {
  release: GitHubRelease | null;
  loading: boolean;
  error: string | null;
}
