import { Question as QuestionInterface } from '../../../../../interface/question';

export class Question implements QuestionInterface {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    votes: number;

    constructor(
        id: number,
        title: string,
        body: string,
        createdAt: Date,
        updatedAt: Date,
        userId: number,
        votes: number
    ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.votes = votes;
    }
}
