import { UserRegister } from './user-register';

describe('UserRegister', () => {
  it('should create an instance', () => {
      const userRegister: UserRegister = { username: 'MaxMustmann123',email: 'maxmustermann@gmail.com', password: 'passwort123' };
      expect(userRegister).toBeTruthy();
  });
});
