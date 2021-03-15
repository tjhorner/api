require('dotenv').config()

const { ApolloServer } = require('apollo-server')
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
  playground: true
})

server.listen().then(({ url }) => {
  console.log(url)
})