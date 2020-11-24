import { Server, ServerResponse } from 'http';
import { startServer } from './startServer';
import { stopServer } from './stopServer';

import { Logger } from './logger';
import { Config, MockResponse, RequestSpy } from './types';

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
  const mockResponses: MockResponse[] = [];

  const start = async (requestSpy?: RequestSpy): Promise<void> => {
    server = await startServer({
      config,
      logger,
      mockResponses,
      requestSpy,
    });
  };

  const stop = async () => {
    await stopServer(server, logger);
  };

  const mockNextResponse = (data: any) => {
    mockResponses.push(data);
  };

  return {
    start,
    stop,
    mockNextResponse,
  };
};

export { createRequestSpy } from './requestSpy';
export default mocr;
