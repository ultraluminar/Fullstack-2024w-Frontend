import{CreateQuestion as CreateQuestionInterface} from '../../../../../interface/create-question'

export class CreateQuestion implements CreateQuestionInterface {
    title: string;
    body: string;
    constructor(title: string, body:string){
        this.title = title;
        this.body = body;
    }
}
