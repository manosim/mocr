import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { StartOptions } from './types';

export const startServer = async ({
  config,
  logger,
}: StartOptions): Promise<Server> => {
  return new Promise((resolve) => {
    const server: Server = createServer(
      (req: IncomingMessage, res: ServerResponse) => {
        logger.info(`➡️ Received request (${req.method})`);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World');
      }
    );

    server.listen(config.port, () => {
      logger.info(`🚀 Server running at http://localhost:${config.port}/.`);
      resolve(server);
    });
  });
};
