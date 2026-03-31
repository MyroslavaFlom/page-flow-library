const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const jwt = require('jsonwebtoken');
const { typeDefs } = require('./graphql/schema');
const resolvers = require('./graphql/index');
const jwtConfig = require('./config/jwt');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/books', require('./routes/books.routes'));
app.use('/api/authors', require('./routes/authors.routes'));
app.use('/api/categories', require('./routes/categories.routes'));

app.use(errorMiddleware);

async function startApollo(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return { user: null };
        try {
          const decoded = jwt.verify(token, jwtConfig.secret);
          return { user: decoded };
        } catch {
          return { user: null };
        }
      },
    })
  );
}

module.exports = { app, startApollo };