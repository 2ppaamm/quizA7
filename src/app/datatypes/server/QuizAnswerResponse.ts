import { BaseServerData } from '../BaseServerData';
import { Question } from './Question';

export interface QuizAnswerResponse extends BaseServerData {

    // if code = 201
    test: number;
    questions?: Question[];

    // if code = 206
    percentage?: number;
    score?: number;
    maxile?: number;
    kudos?: number;
}
