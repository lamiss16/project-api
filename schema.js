const { gql } = require('@apollo/server');

const typeDefs = `#graphql
type Singer {
  id: String!
  name: String!
  description: String!
}

type Album {
  id: String!
  title: String!
  description: String!
}

type Query {
  singer(id: String!): Singer
  singers: [Singer]
  album(id: String!): Album
  albums: [Album]
}

type Mutation {
  createSinger(name: String!, description: String!): Singer
  createAlbum(title: String!, description: String!): Album
}
`;

module.exports = typeDefs