const { mergeResolvers } = require('@graphql-tools/merge');
const booksResolver = require('./resolvers/books.resolver');
const authorsResolver = require('./resolvers/authors.resolver');
const categoriesResolver = require('./resolvers/categories.resolver');
const authResolver = require('./resolvers/auth.resolver');

const resolvers = mergeResolvers([
  booksResolver,
  authorsResolver,
  categoriesResolver,
  authResolver,
]);

module.exports = resolvers;
