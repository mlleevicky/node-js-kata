const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoHelpers = require('./helpers/mongo');

const app = express();

// Construct a GraphQL schema
const schema = buildSchema(`
 type Query {
   hello: String
   author(field: String, value: String): Author
   authors(field: String, value: String): [Author]
   book(field: String, value: String): Book
   books(field: String, value: String): [Book]
   magazine(field: String, value: String): Magazine
   magazines(field: String, value: String): [Magazine]
 }
  type Author {
   email: String
   firstname: String
   lastname: String
 }
  type Book {
   title: String
   isbn: String
   authors: String
   description: String
 }
  type Magazine {
   title: String
   isbn: String
   authors: String
   publishedAt: String
 }
`);

// Resolver functions for schema fields
const resolvers = {
    hello: () => 'Hello world!',
    author: (args) => mongoHelpers.getEntity(args, "author"),
    authors: (args) => mongoHelpers.getEntities(args, "author"),
    book: (args) => mongoHelpers.getEntity(args, "book"),
    books: (args) => mongoHelpers.getEntities(args, "book"),
    magazine: (args) => mongoHelpers.getEntity(args, "magazine"),
    magazines: (args) => mongoHelpers.getEntities(args, "magazine"),
};


app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      rootValue: resolvers
    }),
);

module.exports = app;
