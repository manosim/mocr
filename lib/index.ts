import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { startServer } from './startServer';
import { stopServer } from './stopServer';

import { Logger } from './logger';
import { Config } from './types';

const defaultConfig: Config = {
  debug: false,
  port: 9091,
};

export const mocr = (initialConfig?: Config) => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };

  let server: Server | undefined;
  let logger = new Logger(config.debug);

  const start = async (): Promise<void> => {
    server = await startServer({ config, logger });
  };

  const stop = async () => {
    await stopServer(server, logger);
  };

  return {
    start,
    stop,
  };
};

export default mocr;
