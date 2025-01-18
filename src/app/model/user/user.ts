import { User as UserInterface } from "../../../../../interface/user";

export class User implements UserInterface {
    id: number;
    username: string;
    createdAt: Date;

    constructor(id: number, username: string, createdAt: Date) {
        this.id = id;
        this.username = username;
        this.createdAt = createdAt;
    }

}
