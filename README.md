# mocr [![npm][npm-image]][npm-url] [![github-ci][github-ci-image]][github-ci-url]

A mock http server used in tests

## Features

- Easy to use, mock http server
- Spy on the requests received by the server
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

| Name       | Default   | Description                                                                                                  |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| debug      | false     | When set to true, logging will be enabled.                                                                   |
| port       | 9091      | The port that the server will be running.                                                                    |
| requestSpy | undefined | Can be a spy or a call. See [usage](#usage) below. If defined, will be called with `(request, requestBody)`. |

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

    const { request, body } = requestSpy.mock.calls[0];

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(request.method).toBe(/* Expected Method, ie. POST, PUT */);
    expect(body).toHaveBeenCalledWith(/* Expected Request Body */);
  });
});
```

## Methods

### mocr

Used to create an instance of _mocr_. Also accepts _optional_ configuration.

### createRequestSpy

Creates a fresh request spy. This will get record all _incoming_ requests along with their body/data(if any). To be used for validating requests/content leaveing your application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

[github-ci-image]: https://github.com/manosim/mocr/workflows/Run%20Tests/badge.svg
[github-ci-url]: https://github.com/manosim/mocr/actions
[npm-image]: https://badge.fury.io/js/mocr.svg
[npm-url]: https://www.npmjs.com/package/mocr
