import {AnswerArray as AnswerArrayInterface} from '../../../../../interface/answer-array'
import { Answer } from './answer';

export class AnswerArray extends Array<Answer>implements AnswerArrayInterface{
    constructor(...answer: Answer[]){
        super(...answer);
    }
}
