import {UpdateAnswer as UpdateAnswerInterface} from '../../../../../interface/update-answer'

export class UpdateAnswer implements UpdateAnswerInterface {
    body: string;
    constructor(body: string){
        this.body = body;
    }
}
