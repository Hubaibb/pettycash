const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  date: String,
  description: String,
  amount: Number,
  type: String
});

module.exports = mongoose.model("Transaction", TransactionSchema);
