import { Server } from 'http';
import { startServer } from './startServer';
import { stopServer } from './stopServer';

import { Logger } from './logger';
import { Config, MockResponse, RequestSpy } from './types';
import { createRequestSpy } from './requestSpy';

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
  const requestSpy: RequestSpy = createRequestSpy();

  const start = async (): Promise<void> => {
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

  const mockNextResponse = (response: MockResponse) => {
    logger.info(`➡️ Received a single mock response.`);
    mockResponses.push(response);
  };

  const mockNextResponses = (responses: MockResponse[]) => {
    logger.info(`➡️ Received ${responses.length} mock responses.`);
    mockResponses.push(...responses);
  };

  return {
    start,
    stop,
    mockNextResponse,
    mockNextResponses,
    requestSpy,
  };
};

export default mocr;
