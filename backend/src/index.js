const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./schema");
const resolvers = require("./resolvers");

const app = express();

mongoose.connect(
  "mongodb+srv://fanialxkidz_db_user:TubesIAE@cluster0.bvzdexd.mongodb.net/pettycash?retryWrites=true&w=majority&appName=Cluster0"
)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log("MongoDB Error:", err));

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
