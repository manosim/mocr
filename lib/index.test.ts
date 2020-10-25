import fetch from 'node-fetch';

import { Logger } from './logger';
import { mocr } from '.';

describe('index.ts', () => {
  const DEFAULT_SERVER_URL = 'http://localhost:9091';

  it('starts an http server', async () => {
    const mockServer = mocr();
    await mockServer.start();

    const response = await fetch(DEFAULT_SERVER_URL);
    const body = await response.text();

    await mockServer.stop();

    expect(body).toBe('Hello World');
  });

  it('starts an http server on a different port(7091)', async () => {
    const mockServer = mocr({ port: 7091 });
    await mockServer.start();

    try {
      await fetch(DEFAULT_SERVER_URL);
    } catch (err) {
      expect(err.code).toBe('ECONNREFUSED');
    }

    const responseCasePort = await fetch('http://localhost:7091');
    expect(responseCasePort.status).toBe(200);

    await mockServer.stop();
  });

  it('starts an http server with debug option', async () => {
    jest.spyOn(Logger.prototype, 'info').mockImplementation(() => {});

    const mockServer = mocr({ debug: true });
    await mockServer.start();

    expect(Logger.prototype.info).toHaveBeenCalledTimes(1);
    expect(Logger.prototype.info).toHaveBeenCalledWith(
      '🚀 Server running at http://localhost:9091/.'
    );

    (Logger.prototype.info as any).mockReset();
    const response = await fetch(DEFAULT_SERVER_URL);
    const body = await response.text();
    expect(Logger.prototype.info).toHaveBeenCalledTimes(1);
    expect(Logger.prototype.info).toHaveBeenCalledWith(
      '➡️ Received request (GET)'
    );

    (Logger.prototype.info as any).mockReset();
    await mockServer.stop();
    expect(Logger.prototype.info).toHaveBeenCalledTimes(1);
    expect(Logger.prototype.info).toHaveBeenCalledWith(
      '✋ Mock server has stopped'
    );

    expect(body).toBe('Hello World');
  });
});
