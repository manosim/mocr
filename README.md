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
import mocr from 'mocr';

describe('my tests', () => {
  const requestSpy = jest.fn();

  const mockServer = mocr({
    /* Configuration */
  });

  beforeAll(async () => {
    // Start the server
    await mockServer.start(requestSpy);
  });

  beforeEach(async () => {
    // Reset the request spy
    requestSpy.mockReset();
  });

  afterAll(async () => {
    // Stop the server
    await mockServer.stop();
  });

  it('should make a call to the backend when pressing the button', () => {
    const requestSpy = jest.fn();

    // Press the button

    const request = requestSpy.mock.calls[0][0];
    const requestBody = requestSpy.mock.calls[0][1];

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(request.method).toBe(/* Expected Method, ie. POST, PUT */);
    expect(requestBody).toHaveBeenCalledWith(/* Expected Request Body */);
  });
});
```

[github-ci-image]: https://github.com/manosim/mocr/workflows/Run%20Tests/badge.svg
[github-ci-url]: https://github.com/manosim/mocr/actions
[npm-image]: https://badge.fury.io/js/mocr.svg
[npm-url]: https://www.npmjs.com/package/mocr

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
