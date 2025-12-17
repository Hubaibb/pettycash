require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const schema = require("./schema");
const resolvers = require("./resolvers");

const app = express();
app.use(cors());

const dbUri = process.env.MONGO_URI;
console.log(`Connecting to database at: ${dbUri}`);

mongoose.connect(dbUri)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB connection error:", err.message));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running at http://localhost:4000/graphql");
});
