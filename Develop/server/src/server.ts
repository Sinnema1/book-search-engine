import express from 'express';
import path from 'path';
import type { Request, Response } from 'express';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schema/index.js';
import { authenticateToken } from './services/auth.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  try {
    await server.start();
    await db();

    const PORT = process.env.PORT || 3001;
    const app = express();

    // Add CORS middleware
    app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Apollo Server middleware
    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({ req }: { req: Request }) => {
          try {
            const context = authenticateToken({ req });
            if (process.env.NODE_ENV === 'development') {
              console.log(`Authenticated user: ${JSON.stringify(context.user)}`);
            }
            return { user: context.user || null };
          } catch (error) {
            console.error('Error authenticating token:', error);
            return { user: null };
          }
        },
      })
    );

    // Serve React build files in production
    if (process.env.NODE_ENV === 'production') {
      const clientPath = path.join(__dirname, '../../client/dist');
      
      // Log paths for debugging
      console.log(`__dirname: ${__dirname}`);
      console.log(`Resolved clientPath: ${clientPath}`);

      // Check if the React build directory and index.html exist
      try {
        const clientDirExists = await fs.stat(clientPath);
        if (!clientDirExists.isDirectory()) {
          console.error(`Error: ${clientPath} is not a directory.`);
          return;
        }

        const indexFileExists = await fs.stat(path.join(clientPath, 'index.html'));
        if (!indexFileExists.isFile()) {
          console.error(`Error: index.html does not exist in ${clientPath}.`);
          return;
        }

        console.log('React build files found.');
        app.use(express.static(clientPath));

        app.get('*', (_req: Request, res: Response) => {
          res.sendFile(path.join(clientPath, 'index.html'));
        });
      } catch (error: any) {
        console.error(`Error verifying client files: ${error.message}`);
      }
    }

    // Health check endpoint
    app.get('/health', (_req: Request, res: Response) => {
      res.status(200).send('Server is healthy!');
    });

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startApolloServer();