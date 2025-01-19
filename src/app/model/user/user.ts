import { User as UserInterface } from "../../../../../interface/user";

export class User implements UserInterface {
    id: number;
    isAdmin: boolean;
    username: string;
    createdAt: Date;

    constructor(id: number, isAdmin: boolean, username: string, createdAt: Date) {
        this.id = id;
        this.isAdmin = isAdmin;
        this.username = username;
        this.createdAt = createdAt;
    }

}
