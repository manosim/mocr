import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { StartOptions } from './types';

export const startServer = async ({
  config,
  logger,
  mockResponses,
  requestSpy,
}: StartOptions): Promise<Server> => {
  return new Promise((resolve) => {
    const requestListener = (req: IncomingMessage, res: ServerResponse) => {
      logger.info(`➡️ Received request (${req.method})`);

      let body: string;

      req.on('data', (chunk) => {
        body = `${body || ''}${chunk}`;
      });

      req.on('end', () => {
        if (requestSpy) {
          const isReqJson = req.headers['content-type'] === 'application/json';
          requestSpy.recordRequest(
            req,
            isReqJson && body ? JSON.parse(body) : body
          );
        }

        res.statusCode = 200;

        if (mockResponses.length) {
          logger.info(`➡️ Found a mock response. Will return it.`);
          const mockResponse = mockResponses.splice(0, 1)[0];
          const contentType =
            typeof mockResponse === 'string'
              ? 'text/plain'
              : 'application/json';
          res.setHeader('Content-Type', contentType);
          res.end(JSON.stringify(mockResponse));
        } else {
          res.setHeader('Content-Type', 'text/plain');
          res.end('Hello World');
        }
      });
    };

    const server: Server = createServer(requestListener);

    server.listen(config.port, () => {
      logger.info(`🚀 Server running at http://localhost:${config.port}/.`);
      resolve(server);
    });
  });
};
