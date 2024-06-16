/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/tools', '/edit', '/login'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/tools', '/edit', '/login']
      }
    ],
    additionalSitemaps: [`${process.env.SITE_URL}/server-sitemap.xml`]
  }
}
