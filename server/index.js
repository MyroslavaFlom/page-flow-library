require('dotenv').config();
const { app, startApollo } = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  await startApollo(app);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL: http://localhost:${PORT}/graphql`);
  });
}

start();