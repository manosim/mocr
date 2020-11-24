import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { StartOptions } from './types';

type JSON = {
  [x: string]: any;
};

interface StartServerResponse {
  server: Server;
  mockResponses: JSON[];
}

export const startServer = async ({
  config,
  logger,
  requestSpy,
}: StartOptions): Promise<StartServerResponse> => {
  const mockResponses: JSON[] = [];

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
          const mockResponse = mockResponses.splice(0, 1)[0];
          res.setHeader('Content-Type', 'application/json');
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
      resolve({ server, mockResponses });
    });
  });
};
