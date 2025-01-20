import {Answer as AnswerInterface} from '../../../../../interface/answer'

export class Answer implements AnswerInterface {
    id: number;
    questionId: number;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    constructor(
        id: number,
        questionId: number,
        body: string,
        createdAt: Date,
        updatedAt: Date,
        userId: number,
    ) {
        this.id = id;
        this.questionId = questionId;
        this.body = body;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
    }
}
