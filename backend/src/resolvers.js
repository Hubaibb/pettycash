const Transaction = require("./models/transaction");
const User = require("./models/user");
const Category = require("./models/category");
const Account = require("./models/account");

module.exports = {
  // ========== Transaction Queries ==========
  getTransactions: async () => {
    try {
      const transactions = await Transaction.find()
        .populate('user_id')
        .populate('category_id')
        .populate('account_id');
      
      return transactions.map(tx => ({
        id: tx._id,
        date: tx.date.toISOString(),
        description: tx.description,
        amount: tx.amount,
        type: tx.type,
        user: tx.user_id,
        category: tx.category_id,
        account: tx.account_id,
        created_at: tx.created_at.toISOString()
      }));
    } catch (error) {
      throw new Error(`Error fetching transactions: ${error.message}`);
    }
  },

  getTransaction: async ({ id }) => {
    try {
      const transaction = await Transaction.findById(id)
        .populate('user_id')
        .populate('category_id')
        .populate('account_id');
      
      if (!transaction) {
        throw new Error('Transaction not found');
      }

      return {
        id: transaction._id,
        date: transaction.date.toISOString(),
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        user: transaction.user_id,
        category: transaction.category_id,
        account: transaction.account_id,
        created_at: transaction.created_at.toISOString()
      };
    } catch (error) {
      throw new Error(`Error fetching transaction: ${error.message}`);
    }
  },

  getTransactionsByType: async ({ type }) => {
    try {
      const transactions = await Transaction.find({ type })
        .populate('user_id')
        .populate('category_id')
        .populate('account_id');
      
      return transactions.map(tx => ({
        id: tx._id,
        date: tx.date.toISOString(),
        description: tx.description,
        amount: tx.amount,
        type: tx.type,
        user: tx.user_id,
        category: tx.category_id,
        account: tx.account_id,
        created_at: tx.created_at.toISOString()
      }));
    } catch (error) {
      throw new Error(`Error fetching transactions by type: ${error.message}`);
    }
  },

  // ========== User Queries ==========
  getUsers: async () => {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  },

  getUser: async ({ id }) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  },

  // ========== Category Queries ==========
  getCategories: async () => {
    try {
      return await Category.find();
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  },

  getCategory: async ({ id }) => {
    try {
      const category = await Category.findById(id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      throw new Error(`Error fetching category: ${error.message}`);
    }
  },

  // ========== Account Queries ==========
  getAccounts: async () => {
    try {
      return await Account.find();
    } catch (error) {
      throw new Error(`Error fetching accounts: ${error.message}`);
    }
  },

  getAccount: async ({ id }) => {
    try {
      const account = await Account.findById(id);
      if (!account) {
        throw new Error('Account not found');
      }
      return account;
    } catch (error) {
      throw new Error(`Error fetching account: ${error.message}`);
    }
  },

  getTotalBalance: async () => {
    try {
      const accounts = await Account.find();
      return accounts.reduce((total, acc) => total + acc.balance, 0);
    } catch (error) {
      throw new Error(`Error calculating total balance: ${error.message}`);
    }
  },

  // ========== User Mutations ==========
  addUser: async ({ input }) => {
    try {
      const newUser = new User(input);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(`Error adding user: ${error.message}`);
    }
  },

  updateUser: async ({ id, input }) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, input, { new: true });
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  deleteUser: async ({ id }) => {
    try {
      const result = await User.findByIdAndDelete(id);
      return result ? true : false;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },

  // ========== Category Mutations ==========
  addCategory: async ({ input }) => {
    try {
      const newCategory = new Category(input);
      await newCategory.save();
      return newCategory;
    } catch (error) {
      throw new Error(`Error adding category: ${error.message}`);
    }
  },

  updateCategory: async ({ id, input }) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, input, { new: true });
      if (!updatedCategory) {
        throw new Error('Category not found');
      }
      return updatedCategory;
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  },

  deleteCategory: async ({ id }) => {
    try {
      const result = await Category.findByIdAndDelete(id);
      return result ? true : false;
    } catch (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  },

  // ========== Account Mutations ==========
  addAccount: async ({ input }) => {
    try {
      const newAccount = new Account(input);
      await newAccount.save();
      return newAccount;
    } catch (error) {
      throw new Error(`Error adding account: ${error.message}`);
    }
  },

  updateAccount: async ({ id, input }) => {
    try {
      const updatedAccount = await Account.findByIdAndUpdate(id, input, { new: true });
      if (!updatedAccount) {
        throw new Error('Account not found');
      }
      return updatedAccount;
    } catch (error) {
      throw new Error(`Error updating account: ${error.message}`);
    }
  },

  deleteAccount: async ({ id }) => {
    try {
      const result = await Account.findByIdAndDelete(id);
      return result ? true : false;
    } catch (error) {
      throw new Error(`Error deleting account: ${error.message}`);
    }
  },

  // ========== Transaction Mutations ==========
  addTransaction: async ({ input }) => {
    try {
      // Validate references exist
      const user = await User.findById(input.user_id);
      if (!user) throw new Error('User not found');

      const category = await Category.findById(input.category_id);
      if (!category) throw new Error('Category not found');

      const account = await Account.findById(input.account_id);
      if (!account) throw new Error('Account not found');

      // Create transaction
      const newTransaction = new Transaction(input);
      await newTransaction.save();

      // Update account balance
      if (input.type === 'income') {
        account.balance += input.amount;
      } else {
        account.balance -= input.amount;
      }
      await account.save();

      // Populate and return
      await newTransaction.populate(['user_id', 'category_id', 'account_id']);
      
      return {
        id: newTransaction._id,
        date: newTransaction.date.toISOString(),
        description: newTransaction.description,
        amount: newTransaction.amount,
        type: newTransaction.type,
        user: newTransaction.user_id,
        category: newTransaction.category_id,
        account: newTransaction.account_id,
        created_at: newTransaction.created_at.toISOString()
      };
    } catch (error) {
      throw new Error(`Error adding transaction: ${error.message}`);
    }
  },

  updateTransaction: async ({ id, input }) => {
    try {
      const oldTransaction = await Transaction.findById(id);
      if (!oldTransaction) {
        throw new Error('Transaction not found');
      }

      // Revert old balance change
      const oldAccount = await Account.findById(oldTransaction.account_id);
      if (oldTransaction.type === 'income') {
        oldAccount.balance -= oldTransaction.amount;
      } else {
        oldAccount.balance += oldTransaction.amount;
      }
      await oldAccount.save();

      // Update transaction
      const updatedTransaction = await Transaction.findByIdAndUpdate(id, input, { new: true })
        .populate(['user_id', 'category_id', 'account_id']);

      // Apply new balance change
      const newAccount = await Account.findById(input.account_id);
      if (input.type === 'income') {
        newAccount.balance += input.amount;
      } else {
        newAccount.balance -= input.amount;
      }
      await newAccount.save();

      return {
        id: updatedTransaction._id,
        date: updatedTransaction.date.toISOString(),
        description: updatedTransaction.description,
        amount: updatedTransaction.amount,
        type: updatedTransaction.type,
        user: updatedTransaction.user_id,
        category: updatedTransaction.category_id,
        account: updatedTransaction.account_id,
        created_at: updatedTransaction.created_at.toISOString()
      };
    } catch (error) {
      throw new Error(`Error updating transaction: ${error.message}`);
    }
  },

  deleteTransaction: async ({ id }) => {
    try {
      const transaction = await Transaction.findById(id);
      if (!transaction) {
        return false;
      }

      // Revert balance change
      const account = await Account.findById(transaction.account_id);
      if (transaction.type === 'income') {
        account.balance -= transaction.amount;
      } else {
        account.balance += transaction.amount;
      }
      await account.save();

      // Delete transaction
      await Transaction.findByIdAndDelete(id);
      return true;
    } catch (error) {
      throw new Error(`Error deleting transaction: ${error.message}`);
    }
  }
};
