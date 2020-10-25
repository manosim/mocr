# mocr [![npm][npm-image]][npm-url] [![github-ci][github-ci-image]][github-ci-url]

A mock http server used in tests

## Features

- Easy to use, mock http server
- Designed to work with unit tests
- Strongly typed. Types included
- Zero dependencies

## Installation

```
yarn add -D mocr
# or
npm install --save-dev mocr
```

## Configuration

How to pass config?

| Config Name | Default Value | Description                               |
| ----------- | ------------- | ----------------------------------------- |
| debug       | false         | When set to true, logging will be enabled |
| port        | 9091          | The port that the server will be running. |

## Usage

```js
import mocr from 'mocr';

describe('my tests', () => {
  const mockServer = mocr({
    /* Configuration */
  });

  beforeAll(async () => {
    await mockServer.start();
  });

  beforeEach(async () => {
    // Reset the request spy
  });

  afterAll(async () => {
    await mockServer.stop();
  });

  it('should make a call to the backend when pressing the button', () => {
    const requestSpy = jest.fn();
    // Press the button
    expect(requestSpy).toHaveBeenCalledWith(/* Expected Data */);
  });
});
```

[github-ci-image]: https://github.com/manosim/mocr/workflows/Run%20Tests/badge.svg
[github-ci-url]: https://github.com/manosim/mocr/actions
[npm-image]: https://badge.fury.io/js/mocr.svg
[npm-url]: https://www.npmjs.com/package/mocr

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
