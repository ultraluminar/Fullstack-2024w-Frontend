import {CreateAnswer as CreateAnswerInterface} from '../../../../../interface/create-answer'

export class CreateAnswer implements CreateAnswerInterface{
    body: string;

    constructor(body: string){
        this.body = body;
    }
}
