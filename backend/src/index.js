const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./schema");
const resolvers = require("./resolvers");

const app = express();

// Mengambil URI dari environment variable docker-compose, atau fallback ke localhost jika dijalankan manual
const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/pettycash';

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

console.log(`Connecting to database at: ${dbUri}`); // Optional: untuk debugging

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000/graphql");
});
