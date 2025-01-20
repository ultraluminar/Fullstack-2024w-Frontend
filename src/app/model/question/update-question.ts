import {UpdateQuestion as UpdateQuestionInterface} from '../../../../../interface/update-question'

export class UpdateQuestion {
    title: string;
    body: string;
    constructor(title: string, body: string){
        this.title = title;
        this.body = body;
    }
}
