const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const app = express();

const root = {
  hello: () => "Petty Cash Tracker API is running!"
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("GraphQL running on http://localhost:4000/graphql");
});
