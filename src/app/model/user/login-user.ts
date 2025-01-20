import { LoginUser as LoginUserInterface } from '../../../../../interface/login-user';

export class LoginUser implements LoginUserInterface {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
