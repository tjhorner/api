const Ghost = require('@tryghost/content-api')

const ghost = new Ghost({
  url: process.env.GHOST_BASE_URL,
  key: process.env.GHOST_API_KEY,
  version: "v3"
})

const HARD_LIMIT = 10

module.exports = () => {
  return {
    async link() {
      const { url } = await ghost.settings.browse()
      return url
    },

    async posts(args) {
      const limit = Math.max(1, Math.min(args.limit, HARD_LIMIT))
      
      const posts = await ghost.posts.browse({
        limit, page: args.page,
        fields: [
          "id",
          "title",
          "custom_excerpt",
          "feature_image",
          "url",
          "featured",
          "published_at"
        ],
        include: [ "tags" ],
        order: `published_at ${args.order}`
      })
    
      return posts.map(post => {
        return {
          id: post.id,
          publishedAt: post.published_at,
          title: post.title,
          excerpt: post.custom_excerpt,
          featureImageUrl: post.feature_image,
          featured: post.featured,
          link: post.url,
          tags: post.tags.map(tag => {
            return {
              name: tag.name,
              slug: tag.slug
            }
          })
        }
      })
    }
  }
}