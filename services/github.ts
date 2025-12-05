import { GitHubRelease } from '../types';

const REPO_API = "https://api.github.com/repos/rustdesk/rustdesk/releases";

export async function fetchLatestRelease(): Promise<GitHubRelease> {
  const response = await fetch(`${REPO_API}/latest`, {
    headers: { Accept: "application/vnd.github+json" }
  });
  
  if (!response.ok) {
    throw new Error("Impossible de contacter GitHub");
  }

  const json = await response.json();
  return json;
}
