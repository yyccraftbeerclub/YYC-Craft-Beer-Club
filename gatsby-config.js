require('dotenv').config({
  path: `.env`
})
const path = require('path');

module.exports = {
	siteMetadata: {
		siteUrl: `https://yyccraftbeerclub.com`,
	},
  	plugins: [
    {
		resolve: "gatsby-source-datocms",
		options: {
		apiToken: process.env.DATO_API_TOKEN,
		},
    },
    {
		resolve: "gatsby-plugin-anchor-links",
		options: {
		offset: 0
		}
    },
    {
		resolve: "gatsby-plugin-root-import",
		options: {
			src: path.join(__dirname, 'src'),
			pages: path.join(__dirname, 'src/pages'),
			component: path.join(__dirname, 'src/components'),
			styles: path.join(__dirname, "src/styles"),
			layout: path.join(__dirname, "src/layouts"),
			utils: path.join(__dirname, "src/styles/utils")
		}
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
		resolve: "gatsby-source-filesystem",
		options: {
			name: "images",
			path: "./src/images/",
		},
		__key: "images",
    },
    {
		resolve: "gatsby-transformer-remark",
		options: {
			plugins: [
				`gatsby-plugin-minify`,
				{
					resolve: `gatsby-remark-images-datocms`,
					options: {
						apiToken: process.env.DATO_API_TOKEN,
					},
				},
				{
					resolve: `gatsby-plugin-offline`,
					options: {
						precachePages: [`/`, `/events`, `/blog/*`],
					},
				},
			]
		},
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
		options: {
		host: 'https://yyccraftbeerclub.com',
		env: {
			development: {
				policy: [{ userAgent: '*', disallow: ['/'] }]
			},
			production: {
				policy: [{ userAgent: '*', allow: '/' }]
			}
		}
		}
    },
    {
      resolve: 'gatsby-source-meetup-events',
      options: {
          groupId: `Calgary-Craft-Beer-Club`,
      },
  },
    "gatsby-remark-images-datocms",
    "gatsby-plugin-sitemap"
  ],
};
