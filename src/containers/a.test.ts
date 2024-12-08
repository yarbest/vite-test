import { func } from './a';

it('returns 1', () => {
  expect(func()).toBe(1);
});

it('not returns 2', () => {
  expect(func()).not.toBe(2);
});
