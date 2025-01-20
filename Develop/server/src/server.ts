import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schema/index.js';
import { authenticateToken } from './services/auth.js';
import cors from 'cors'; // Import CORS

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  // Add CORS middleware
  app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from your frontend origin

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }: { req: Request }) => {
        try {
          const context = authenticateToken({ req });
          console.log(
            process.env.NODE_ENV === 'development'
              ? `Authenticated user: ${JSON.stringify(context.user)}`
              : ''
          );
          return { user: context.user || null }; // Ensure user is valid or null
        } catch (error) {
          console.error('Error authenticating token:', error);
          return { user: null }; // Return null user if authentication fails
        }
      },
    })
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('Server is healthy!');
  });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();