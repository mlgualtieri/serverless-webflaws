const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const productTemplate = path.resolve(`src/pages/profile.js`)
  const user_id = 1000
    createPage({
      path: `/profile/${user_id}`,
      component: productTemplate,
      context: {
        // This time the entire product is passed down as context
        user_id: user_id,
      },
    })
}
