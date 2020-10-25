import fetch from 'node-fetch';

import { startServer, stopServer } from '.';

test('starts an http server', async () => {
  await startServer();

  const response = await fetch('http://localhost:9091', {});
  const body = await response.text();

  await stopServer();

  expect(body).toBe('Hello World');
});
