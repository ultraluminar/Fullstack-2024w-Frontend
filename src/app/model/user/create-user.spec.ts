import { CreateUser } from './create-user';

describe('CreateUser', () => {
  it('should create an instance', () => {
    expect(new CreateUser("Maxmustermann123", "maxmustermann@beispiel.com", "passwort123")).toBeTruthy();
  });
});
