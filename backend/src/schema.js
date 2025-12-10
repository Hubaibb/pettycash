const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Transaction {
    id: ID!
    date: String!
    description: String!
    amount: Int!
    type: String!
  }

  type Query {
    getTransactions: [Transaction]
  }

  input TransactionInput {
    date: String!
    description: String!
    amount: Int!
    type: String!
  }

  type Mutation {
    addTransaction(input: TransactionInput): Transaction
    deleteTransaction(id: ID!): Boolean
  }
`);
