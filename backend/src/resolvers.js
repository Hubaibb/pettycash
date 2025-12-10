const Transaction = require("./models/transaction");

module.exports = {
  getTransactions: async () => {
    return await Transaction.find();
  },

  addTransaction: async ({ input }) => {
    const newTransaction = new Transaction(input);
    await newTransaction.save();
    return newTransaction;
  },

  deleteTransaction: async ({ id }) => {
    const result = await Transaction.findByIdAndDelete(id);
    return result ? true : false;
  }
};
