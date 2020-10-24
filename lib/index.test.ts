import { hello } from ".";

test('runs without a config', () => {
  const result = hello();
  expect(result).toBe('world')
})

test('runs with a config', () => {
  const config ={
    debug:true
  };
  const result = hello(config);
  expect(result).toBe('world')
})
