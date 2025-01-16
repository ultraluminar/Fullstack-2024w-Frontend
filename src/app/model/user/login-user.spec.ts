import { LoginUser } from './login-user';

describe('LoginUser', () => {
  it('should create an instance', () => {
    expect(new LoginUser("Maxmustermann123", "passwort123")).toBeTruthy();
  });
});
