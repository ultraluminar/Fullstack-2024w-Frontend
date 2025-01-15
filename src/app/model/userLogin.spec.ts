import { User } from './userLogin';

describe('User', () => {
  it('should create an instance', () => {
    const user: User = { username: 'MaxMustmann123', password: 'passwort123' };
    expect(user).toBeTruthy();
  });
});
