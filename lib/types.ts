import { IncomingMessage } from 'http';
import { Logger } from './logger';

type Json = {
  [key: string]: any;
};

export type MockResponse = string | Json;

export type Config = {
  debug?: boolean;
  port?: number;
};

export type StartOptions = {
  config: Config;
  logger: Logger;
  mockResponses: MockResponse[];
  requestSpy?: RequestSpy;
};

export type RequestRecord = {
  request: IncomingMessage;
  body?: string | {};
};

export type RequestSpy = {
  calls: RequestRecord[];
  reset: () => void;
  recordRequest: (request: IncomingMessage, body?: string | {}) => void;
};
