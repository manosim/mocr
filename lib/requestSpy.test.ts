import { IncomingMessage } from 'http';
import { Socket } from 'net';

import { createRequestSpy } from './requestSpy';

describe('requestSpy.ts', () => {
  const mockIncomingRequest = new IncomingMessage(new Socket());

  it('creates a request spy', async () => {
    const requestSpy = createRequestSpy();
    expect(requestSpy.calls).toHaveLength(0);
    expect(requestSpy.recordRequest).toBeDefined();
    expect(requestSpy.reset).toBeDefined();
  });

  it('records a call', async () => {
    const requestSpy = createRequestSpy();
    requestSpy.recordRequest(mockIncomingRequest);
    expect(requestSpy.calls).toHaveLength(1);
  });

  it('records a call with body(JSON)', async () => {
    const requestSpy = createRequestSpy();

    requestSpy.recordRequest(mockIncomingRequest, { hello: 'world' });

    expect(requestSpy.calls).toHaveLength(1);
    expect(requestSpy.calls[0].body).toEqual({ hello: 'world' });
  });

  it('resets/clears all requests', async () => {
    const requestSpy = createRequestSpy();

    requestSpy.recordRequest(mockIncomingRequest);
    requestSpy.reset();

    expect(requestSpy.calls).toHaveLength(0);
  });
});
