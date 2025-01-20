import { Question as QuestionInterface } from '../../../../../interface/question';

export class Question implements QuestionInterface {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;

    constructor(
        id: number,
        title: string,
        body: string,
        createdAt: Date,
        updatedAt: Date,
        userId: number,
    ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
    }
}
