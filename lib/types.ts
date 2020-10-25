import { Server } from 'http';
import { Logger } from './logger';

export type Config = {
  debug?: boolean;
  port?: number;
};

export type StartOptions = {
  config: Config;
  logger: Logger;
};
