export interface RobotsConfig {
  userAgent: string;
  allow: string[];
  disallow: string[];
  sitemap: string;
}

export const robotsConfiguration = (): RobotsConfig => {
  return {
    userAgent: "*",
    allow: ["/"],
    disallow: [],
    sitemap: "https://inderveerkaur.netlify.app/sitemap.xml"
  };
};

// Example output generator for edge runtimes
export function generateRobotsTxt(): string {
  const config = robotsConfiguration();
  return [
    `User-agent: ${config.userAgent}`,
    ...config.allow.map(path => `Allow: ${path}`),
    ...config.disallow.map(path => `Disallow: ${path}`),
    `Sitemap: ${config.sitemap}`
  ].join('\n');
}