import fetch from 'node-fetch';

import { mocr } from '.';

test('starts an http server', async () => {
  const mockServer = mocr({ debug: false });
  await mockServer.start();

  const response = await fetch('http://localhost:9091');
  const body = await response.text();

  await mockServer.stop();

  expect(body).toBe('Hello World');
});
