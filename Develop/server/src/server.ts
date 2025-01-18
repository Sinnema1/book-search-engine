import express from 'express';
import path from 'path';
import db from './config/connection.js';
// REMOVED - Not using with Apollo and GraphQL
// import routes from './routes/index.js';

// installing apollo server and express middleware
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// import typeDefs and resolvers
import { typeDefs, resolvers } from './schema/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// initialize new instance of Apollo Server 
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// define asynchronous function to start Apollo Server instance
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server as any,
  ));

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  // REMOVED - Not using with Apollo and GraphQL
  // app.use(routes);

  // set up event listener for MongoDB connection to handle errors
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // starts Express.js server and listens for incoming requests
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// REMOVED - Not using with Apollo and GraphQL
// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

startApolloServer();