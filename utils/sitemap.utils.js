var sm = require('sitemap')
    , fs = require('fs');

var sitemap = sm.createSitemap({
    hostname: 'http://www.mywebsite.com',
    cacheTime: 600000,  //600 sec (10 min) cache purge period
    urls: [
        { url: '/' , changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'client/home.html' },
        { url: '/sitemap.xml', changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'client/home.prod.html' },
        { url: '/contactus'    , changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'client/home.prod.html' } /* useful to monitor template content files instead of generated static files */
    ]
});

fs.writeFileSync("client/sitemap.xml", sitemap.toString());