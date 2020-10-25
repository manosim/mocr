import { createServer, IncomingMessage, Server, ServerResponse } from 'http';

import { Config } from './types';

const defaultConfig: Config = {
  port: 9091,
};

let server: Server | undefined;

export const startServer = async (initialConfig?: Config): Promise<void> => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };

  return new Promise((resolve) => {
    server = createServer((req: IncomingMessage, res: ServerResponse) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World');
    });

    server.listen(config.port, () => {
      console.log(`🚀 Server running at http://localhost:${config.port}/.`);
      resolve();
    });
  });
};

export const stopServer = async () => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close(() => {
        console.log('✋ Mock server has stopped');
        server = undefined;
        resolve();
      });
    } else {
      reject('✋ Mock server is not running');
    }
  });
};
