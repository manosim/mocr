import { IncomingMessage } from 'http';
import { RequestRecord, RequestSpy } from './types';

export const createRequestSpy: () => RequestSpy = () => {
  const calls: RequestRecord[] = [];

  const reset = () => {
    calls.splice(0, calls.length);
  };

  const recordRequest = (request: IncomingMessage, body?: string | {}) => {
    calls.push({ request, body });
  };

  return {
    calls,
    reset,
    recordRequest,
  };
};
