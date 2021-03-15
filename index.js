require('dotenv').config()

const { ApolloServer } = require('apollo-server')
const responseCachePlugin = require('apollo-server-plugin-response-cache')
const fs = require('fs')
const { profile, location, nowPlaying, blog } = require('./resolvers')

const resolvers = {
  Query: {
    profile, location, nowPlaying, blog
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./schema.gql").toString("utf-8"),
  resolvers,
  introspection: true,
  playground: true,
  plugins: [ responseCachePlugin() ]
})

server.listen().then(({ url }) => {
  console.log(url)
})