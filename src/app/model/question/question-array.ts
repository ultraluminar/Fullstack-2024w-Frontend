import { QuestionArray as QuestionArrayInterface } from '../../../../../interface/question-array'
import { Question } from './question'

export class QuestionArray extends Array<Question>implements QuestionArrayInterface {
    constructor(...questions: Question[]){
        super(...questions);
    }
}
