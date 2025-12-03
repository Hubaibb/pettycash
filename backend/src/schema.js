const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Transaction {
    id: ID!
    date: String!
    description: String!
    amount: Int!
    type: String!
  }

  type Query {
    hello: String
  }
`);

module.exports = schema;
