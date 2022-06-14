const { ApolloServer, PubSub } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');




//GraphQL
const pubsub = new PubSub();

const prisma = new PrismaClient({
  errorFormat: 'minimal'
});

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );






// Yelp
const yelp = require('yelp-fusion');
const apiKey = '8SKDv-Jd7EFDq2nPpvs4J8wCA2AJNyB69-7ip4ZY_iFRgp1gfLW-_0mDhx9GT-hicLsv43kHqLSXbEctdR50POz7Qp-DKYf5ssfhArR2mN2HCyFV7bV2nJnIE99NYnYx';

const client = yelp.client(apiKey);

const PORT = process.env.PORT || 3001;

// Express and parsing
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


// Callback functions, API requests
app.post("/api", (req, res) => {

  if (req.body.location){
    var searchRequest = {
      term: req.body.term,
      radius: req.body.radius,
      price: req.body.price,
      location: req.body.location
    }
  }else{
    var searchRequest = {
      term: req.body.term,
      radius: req.body.radius,
      price: req.body.price,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    }
  };
  console.log(searchRequest);
  client.search(searchRequest).then(response => {

    var response_length = response.jsonBody.businesses.length;
    for (let i = 0; i < response_length; i++){
      response.jsonBody.businesses[i]["prio"] = 0;
    }
    res.json(response.jsonBody.businesses);
  });

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});