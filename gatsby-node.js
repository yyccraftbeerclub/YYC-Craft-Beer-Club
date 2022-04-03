const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
    query Blog {
        allDatoCmsPost(sort: {fields: [postedOn], order: DESC}) {
          nodes {
            copyNode {
              childMarkdownRemark {
                html
              }
            }
          }
          edges {
            node {
              slug
              title
              postedOn
            }
            next {
              title
              slug
            }
            previous {
              title
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsPost.edges.map(({ node: post, next, previous }) => {
        createPage({
          path: `blog/${post.slug}`,
          items: result.data.allDatoCmsPost.edges,
          itemsPerPage: 3,
          pathPrefix: '/blog',
          component: path.resolve(`./src/templates/post.js`),
          context: {
            slug: post.slug,
            next,
            previous
          },
        })
      })
      resolve()
    })
  })
}
