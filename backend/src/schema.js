const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  # User Type
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    created_at: String!
  }

  # Category Type
  type Category {
    id: ID!
    name: String!
    description: String
    created_at: String!
  }

  # Account Type
  type Account {
    id: ID!
    name: String!
    balance: Int!
    created_at: String!
  }

  # Transaction Type dengan relasi
  type Transaction {
    id: ID!
    date: String!
    description: String!
    amount: Int!
    type: String!
    user: User!
    category: Category!
    account: Account!
    created_at: String!
  }

  # Queries
  type Query {
    # Transaction Queries
    getTransactions: [Transaction]
    getTransaction(id: ID!): Transaction
    getTransactionsByType(type: String!): [Transaction]
    
    # User Queries
    getUsers: [User]
    getUser(id: ID!): User
    
    # Category Queries
    getCategories: [Category]
    getCategory(id: ID!): Category
    
    # Account Queries
    getAccounts: [Account]
    getAccount(id: ID!): Account
    getTotalBalance: Int
  }

  # Input Types
  input UserInput {
    name: String!
    email: String!
    role: String
  }

  input CategoryInput {
    name: String!
    description: String
  }

  input AccountInput {
    name: String!
    balance: Int
  }

  input TransactionInput {
    date: String
    description: String!
    amount: Int!
    type: String!
    user_id: ID!
    category_id: ID!
    account_id: ID!
  }

  # Mutations
  type Mutation {
    # User Mutations
    addUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): Boolean
    
    # Category Mutations
    addCategory(input: CategoryInput): Category
    updateCategory(id: ID!, input: CategoryInput): Category
    deleteCategory(id: ID!): Boolean
    
    # Account Mutations
    addAccount(input: AccountInput): Account
    updateAccount(id: ID!, input: AccountInput): Account
    deleteAccount(id: ID!): Boolean
    
    # Transaction Mutations
    addTransaction(input: TransactionInput): Transaction
    updateTransaction(id: ID!, input: TransactionInput): Transaction
    deleteTransaction(id: ID!): Boolean
  }
`);
