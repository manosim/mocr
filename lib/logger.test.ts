import { Logger } from './logger';

describe('logger.ts', () => {
  const logMessage = 'Hello World';

  beforeAll(() => {
    jest.spyOn(global.console, 'info');
    jest.spyOn(global.console, 'warn');
    jest.spyOn(global.console, 'error');
  });

  beforeEach(() => {
    (console.info as any).mockReset();
    (console.warn as any).mockReset();
    (console.error as any).mockReset();
  });

  it('should log a message - info', () => {
    const logger = new Logger();
    logger.info(logMessage);
    expect(console.info).toHaveBeenCalledWith(logMessage);
  });

  it('should not log a message when disabled - info', () => {
    const logger = new Logger(false);
    logger.info(logMessage);
    expect(console.info).not.toHaveBeenCalled();
  });

  it('should log a message - warn', () => {
    const logger = new Logger();
    logger.warn(logMessage);
    expect(console.warn).toHaveBeenCalledWith(logMessage);
  });

  it('should not log a message when disabled - warn', () => {
    const logger = new Logger(false);
    logger.warn(logMessage);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should log a message - error', () => {
    const logger = new Logger();
    logger.error(logMessage);
    expect(console.error).toHaveBeenCalledWith(logMessage);
  });

  it('should not log a message when disabled - error', () => {
    const logger = new Logger(false);
    logger.error(logMessage);
    expect(console.error).not.toHaveBeenCalled();
  });
});
