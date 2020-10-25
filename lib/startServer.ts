import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { StartOptions } from './types';

export const startServer = async ({
  config,
  logger,
  requestSpy,
}: StartOptions): Promise<Server> => {
  return new Promise((resolve) => {
    const requestListener = (req: IncomingMessage, res: ServerResponse) => {
      logger.info(`➡️ Received request (${req.method})`);

      if (requestSpy) {
        requestSpy(req);
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World');
    };

    const server: Server = createServer(requestListener);

    server.listen(config.port, () => {
      logger.info(`🚀 Server running at http://localhost:${config.port}/.`);
      resolve(server);
    });
  });
};
