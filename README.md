# mocr [![npm][npm-image]][npm-url] [![github-ci][github-ci-image]][github-ci-url]

> A mock http server used in tests

<p align="center">
  <img src="https://user-images.githubusercontent.com/6333409/99885443-dcd40e00-2c2c-11eb-9261-6cfd3d7de5a0.png" alt="Mocr Logo" width="125" height="125" />
</p>

## Features

- Easy to use, mock http server
- Spy/track requests received by the server
- Designed to work with end-to-end & unit tests
- Strongly typed, types included
- Zero dependencies

## Installation

```
yarn add -D mocr
# or
npm install --save-dev mocr
```

## Configuration

All config options mentioned below are **_optional_**.

| Name       | Default   | Description                                                                                                 |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| debug      | false     | When set to true, logging will be enabled.                                                                  |
| port       | 9091      | The port that the server will be running.                                                                   |
| requestSpy | undefined | This spy can track all the requests that reach the server. See [createRequestSpy](#createRequestSpy) below. |

## Usage

```js
import mocr, { createRequestSpy } from 'mocr';

describe('my tests', () => {
  const requestSpy = createRequestSpy();

  const mockServer = mocr({
    /* Configuration */
  });

  beforeAll(async () => {
    // Start the server
    await mockServer.start(requestSpy);
  });

  beforeEach(async () => {
    // Reset the request spy
    requestSpy.reset();
  });

  afterAll(async () => {
    // Stop the server
    await mockServer.stop();
  });

  it('should make a call to the backend when pressing the button', () => {
    // Press the button

    const { request, body } = requestSpy.calls[0];

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(request.method).toBe(/* Expected Method, ie. POST, PUT */);
    expect(body).toHaveBeenCalledWith(/* Expected Request Body */);
  });
});
```

## Methods

### mocr

Used to create an instance of _mocr_ - it accepts _optional_ configuration. You can have as many _mocr_ servers running in parallel as long as they run on a [different port](#configuration).

### createRequestSpy

Creates a fresh request spy. This records/tracks all _incoming_ requests to the mock server along with their body/data(if any). To be used for validating requests/content leaving your application. Below you can find all available methods for a RequestSpy.

| Name  | Description                                                           |
| ----- | --------------------------------------------------------------------- |
| calls | An array of all the calls. `[ {request: IncomingMessage. body: string {} } ]` |
| reset | Empties the `calls` array.                                            |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

[github-ci-image]: https://github.com/manosim/mocr/workflows/Run%20Tests/badge.svg
[github-ci-url]: https://github.com/manosim/mocr/actions
[npm-image]: https://badge.fury.io/js/mocr.svg
[npm-url]: https://www.npmjs.com/package/mocr
