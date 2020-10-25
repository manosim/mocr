import { Logger } from './logger';
import { startServer } from './startServer';
import { stopServer } from './stopServer';

describe('stopServer.ts', () => {
  const mockLogger = new Logger(false);

  it('stops an existing running http server', async () => {
    const server = await startServer({ config: {}, logger: mockLogger });
    const stop = async () => await stopServer(server, mockLogger as Logger);
    expect(stop).not.toThrowError();
  });

  it('tries to stop an running http server', async () => {
    const server = undefined;
    try {
      await stopServer(server, mockLogger as Logger);
    } catch (message) {
      expect(message).toBe('✋ Mock server is not running');
    }
  });
});
