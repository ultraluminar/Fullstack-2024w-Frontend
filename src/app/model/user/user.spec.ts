import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User(12345, "Maxmustermann123", new Date)).toBeTruthy();
  });
});
