import express from 'express';
import path from 'path';
import type { Request, Response } from 'express';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schema/index.js';
import { authenticateToken } from './services/auth.js';
import cors from 'cors'; // Import CORS
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  // Add CORS middleware for deployed frontend
  app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

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
    // Serve React build files in production
    const clientPath = path.join(__dirname, '../../client/dist');
    console.log(`Resolved clientPath: ${clientPath}`);
    app.use(express.static(clientPath));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(clientPath, 'index.html'));
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