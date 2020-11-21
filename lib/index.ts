import { Server } from 'http';
import { startServer } from './startServer';
import { stopServer } from './stopServer';

import { Logger } from './logger';
import { Config, RequestSpy } from './types';

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

  const start = async (requestSpy?: RequestSpy): Promise<void> => {
    server = await startServer({ config, logger, requestSpy });
  };

  const stop = async () => {
    await stopServer(server, logger);
  };

  return {
    start,
    stop,
  };
};

export { createRequestSpy } from './requestSpy';
export default mocr;
