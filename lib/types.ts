import { IncomingMessage } from 'http';
import { Logger } from './logger';

export type Config = {
  debug?: boolean;
  port?: number;
};

export type StartOptions = {
  config: Config;
  logger: Logger;
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
