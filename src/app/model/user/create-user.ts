import { CreateUser as CreateUserInterface } from '../../../../../interface/create-user';

export class CreateUser implements CreateUserInterface {
    username: string;
    email: string;
    password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
