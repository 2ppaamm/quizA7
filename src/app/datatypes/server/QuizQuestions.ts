import { BaseServerData } from '../BaseServerData';
import { Question } from './Question';

export interface QuizQuestions extends BaseServerData {
    test: number;
    questions: Question[];
}