import { test } from './test';

describe('Simple test', () => {
  it(`test a simple function`, () => {
    expect(test(1, 2)).equal(3);
  });
});
