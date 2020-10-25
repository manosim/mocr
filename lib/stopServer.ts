import { Server } from 'http';
import { Logger } from './logger';

export const stopServer = async (
  server: Server | undefined,
  logger: Logger
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close(() => {
        logger.info('✋ Mock server has stopped');
        resolve();
      });
    } else {
      reject('✋ Mock server is not running');
    }
  });
};
