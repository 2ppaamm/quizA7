import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterCodeAuthorizationResponse } from 'app/datatypes/server/MasterCodeAuthorizationResponse';
import { NotifyLoginResponse } from 'app/datatypes/server/NotifyLoginResponse';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { BaseService } from '../BaseService';
import { AuthService } from './auth.service';

@Injectable()
export class AuthorizationService extends BaseService {

    private NOTIFY_LOGIN_URL = '/test/protected';
    private CHECK_MASTER_CODE_URL = '/test/mastercode';

    constructor(private http: HttpClient, private authService: AuthService) {
        super()
    }

    /**
     * Notify the server of a new login access.
     */
    notifyLogin(): Observable<NotifyLoginResponse> {

        // question with katex
        return Observable.of({
            "message": "Request executed successfully",
            "test": 517,
            "questions": [
                { "id": 4200, "skill_id": 152, "difficulty_id": 2, "question": "In a school canteen, chairs are arranged around a rectangular table as shown below. <br> When 2 tables are joined together in a horizontal line, the chairs are arranged as shown below. <hr> How many chairs are needed if 4 tables are joined together in a horizontal line? <br> How many chairs are needed if 15 tables are joined together in a horizontal line? <br> <input min=\"0\" type=\"number\" id =\"imp5pg027q13_1\" class=\"lineinput\" placeholder=\"?\" \/> chairs are needed if 4 tables are joined. <br> <input min=\"0\" type=\"number\" id =\"imp5pg027q13_2\" class=\"lineinput\" placeholder=\"?\" \/> chairs are needed if 15 tables are joined.", "question_image": "\/images\/questions\/imp5_question_image\/imp5pg027q13.png", "answer0": "26", "answer0_image": null, "answer1": "92", "answer1_image": null, "answer2": null, "answer2_image": null, "answer3": null, "answer3_image": null, "correct_answer": 26, "status_id": 1, "source": "imp5pg027q13", "type_id": 2, "calculator": "s", "gamecodes_id": null },
                { "id": 4201, "skill_id": 152, "difficulty_id": 2, "question": "Look at the figures below which are formed by squares of the same size. <br> How many squares are there in Figure 5? <br> Which figure will need 28 squares? <br> How many squares are there in Figure 14? <br> There are <input min=\"0\" type=\"number\" id =\"imp5pg028q14_1\" class=\"lineinput\" placeholder=\"?\" \/> squares in Figure 5. <br> Figure <input min=\"0\" type=\"number\" id =\"imp5pg028q14_2\" class=\"lineinput\" placeholder=\"?\" \/> will need 28 squares. <br> Figure 14 will have <input min=\"0\" type=\"number\" id =\"imp5pg028q14_3\" class=\"lineinput\" placeholder=\"?\" \/> squares.", "question_image": "\/images\/questions\/imp5_question_image\/imp5pg028q14.png", "answer0": "15", "answer0_image": null, "answer1": "7", "answer1_image": null, "answer2": "105", "answer2_image": null, "answer3": null, "answer3_image": null, "correct_answer": 15, "status_id": 1, "source": "imp5pg028q14", "type_id": 2, "calculator": "s", "gamecodes_id": null },
                { "id": 4269, "skill_id": 151, "difficulty_id": 1, "question": "A milk bucket contains 12 litres of milk. The milk is poured equally into 5 jugs. <hr> How many litres of milk are there in each jug?", "question_image": null, "answer0": "$$\\frac{5}{17}$$ $$l$$", "answer0_image": null, "answer1": "$$\\frac{12}{17}$$ $$l$$", "answer1_image": null, "answer2": "$$\\frac{5}{12}$$ $$l$$", "answer2_image": null, "answer3": "2$$\\frac{2}{5}$$ $$l$$", "answer3_image": null, "correct_answer": 3, "status_id": 1, "source": "imp5pg040q7", "type_id": 1, "calculator": "s", "gamecodes_id": null },
                { "id": 4270, "skill_id": 151, "difficulty_id": 1, "question": "Ahmad had 20 kg of rice. He used 3 kg of rice to cook lunch. Then, he gave 7 kg of rice to his neighbour. Finally he poured the remaining rice equally into 3 containers.<hr> How much rice did each container contain?", "question_image": null, "answer0": "1 kg", "answer0_image": null, "answer1": "2$$\\frac{1}{3}$$ kg", "answer1_image": null, "answer2": "3$$\\frac{1}{3}$$ kg", "answer2_image": null, "answer3": "6 $$\\frac{2}{3}$$ kg", "answer3_image": null, "correct_answer": 2, "status_id": 1, "source": "imp5pg040q8", "type_id": 1, "calculator": "s", "gamecodes_id": null },
                { "id": 4271, "skill_id": 151, "difficulty_id": 1, "question": "Aaron took 2$$\\frac{1}{5}$$h to complete his exam paper. He took $$\\frac{1}{4}$$h longer than Millie.<hr> How long did Millie take to complete her exam paper?", "question_image": null, "answer0": "4 $$\\frac{3}{20}$$ h", "answer0_image": null, "answer1": "2$$\\frac{9}{20}$$ h", "answer1_image": null, "answer2": "2$$\\frac{2}{9}$$ h", "answer2_image": null, "answer3": "1$$\\frac{19}{20}$$ h", "answer3_image": null, "correct_answer": 3, "status_id": 1, "source": "imp5pg041q10", "type_id": 1, "calculator": "s", "gamecodes_id": null }
            ],
            "code": 201
        });

        // return Observable.of({ "message": "Request executed successfully", "test": 517, "questions": [{ "id": 4164, "skill_id": 149, "difficulty_id": 2, "question": "Find the value of 300000 \u00f7 20.", "question_image": null, "answer0": "150", "answer0_image": null, "answer1": "1500", "answer1_image": null, "answer2": "15 000", "answer2_image": null, "answer3": "150 000", "answer3_image": null, "correct_answer": 2, "status_id": 1, "source": "imp5pg015q5", "type_id": 1, "calculator": "s", "gamecodes_id": null }, { "id": 4171, "skill_id": 149, "difficulty_id": 3, "question": "In 9156988, the value of the digit in the millions place is ______ times the value of the digit in the hundreds place.", "question_image": null, "answer0": "10000", "answer0_image": null, "answer1": "1000", "answer1_image": null, "answer2": "100", "answer2_image": null, "answer3": "10", "answer3_image": null, "correct_answer": 0, "status_id": 1, "source": "imp5pg016q12", "type_id": 1, "calculator": "s", "gamecodes_id": null }, { "id": 4172, "skill_id": 149, "difficulty_id": 3, "question": "6 mangoes can be packed into one plastic bag. <hr>What is the minimum number of plastic bags needed to pack 100 mangoes?", "question_image": null, "answer0": "15", "answer0_image": null, "answer1": "16", "answer1_image": null, "answer2": "17", "answer2_image": null, "answer3": "18", "answer3_image": null, "correct_answer": 2, "status_id": 1, "source": "imp5pg016q13", "type_id": 1, "calculator": "s", "gamecodes_id": null }, { "id": 4173, "skill_id": 149, "difficulty_id": 3, "question": "Look at the pattern below. <br> What is the missing number?", "question_image": "\/images\/questions\/imp5_question_image\/imp5pg016q14.png", "answer0": "1", "answer0_image": null, "answer1": "2", "answer1_image": null, "answer2": "3", "answer2_image": null, "answer3": "4", "answer3_image": null, "correct_answer": 3, "status_id": 1, "source": "imp5pg016q14", "type_id": 1, "calculator": "s", "gamecodes_id": null }, { "id": 4175, "skill_id": 152, "difficulty_id": 1, "question": "I am thinking of a 6-digit number between 980000 and 990000. <br> The digit in tens is not 1. It is an odd number and a factor of 10. <br> The digit in the hundred thousands place is 2 more than the digit in the ones place. <br> The digit in the hundreds place is the same as the digit in the ten thousands place. <br> The digit in the thousands place stands for 4000. <hr> What is the number? <br> <input min=\"0\" type=\"number\" id =\"imp5pg017q1_1\" class=\"lineinput\" placeholder=\"?\" \/>", "question_image": null, "answer0": "984857", "answer0_image": null, "answer1": null, "answer1_image": null, "answer2": null, "answer2_image": null, "answer3": null, "answer3_image": null, "correct_answer": 984857, "status_id": 1, "source": "imp5pg017q1", "type_id": 2, "calculator": "s", "gamecodes_id": null }], "code": 201 });


        // return Observable.of({
        //     "message": "Request executed successfully",
        //     "test": 515,
        //     "questions": [
        //         { "id": 1922, "skill_id": 69, "difficulty_id": 1, "question": "Complete the number pattern. <hr> 4302, 5302, 6302, <input min=\"0\" type=\"number\" id =\"imp3pg006q10e_1\" class=\"lineinput\" placeholder=\"?\" \/>, <input min=\"0\" type=\"number\" id =\"imp3pg006q10e_2\" class=\"lineinput\" placeholder=\"?\" \/>, <input min=\"0\" type=\"number\" id =\"imp3pg006q10e_3\" class=\"lineinput\" placeholder=\"?\" \/>", "question_image": null, "answer0": "7302", "answer0_image": null, "answer1": "8302", "answer1_image": null, "answer2": "9302", "answer2_image": null, "answer3": null, "answer3_image": null, "correct_answer": 7302, "status_id": 1, "source": "imp3pg006q10e", "type_id": 2, "calculator": null, "gamecodes_id": null },
        //         { "id": 1928, "skill_id": 68, "difficulty_id": 2, "question": "The greatest 3-digit number is <input min=\"0\" type=\"number\" id =\"imp3pg007q6_1\" class=\"lineinput\" placeholder=\"?\" \/>", "question_image": null, "answer0": "999", "answer0_image": null, "answer1": null, "answer1_image": null, "answer2": null, "answer2_image": null, "answer3": null, "answer3_image": null, "correct_answer": 0, "status_id": 1, "source": "imp3pg007q6", "type_id": 2, "calculator": null, "gamecodes_id": null },
        //         { "id": 1936, "skill_id": 65, "difficulty_id": 2, "question": "3000 = <input min=\"0\" type=\"number\" id =\"imp3pg008q9a_1\" class=\"lineinput\" placeholder=\"?\" \/> hundreds", "question_image": null, "answer0": "30", "answer0_image": null, "answer1": null, "answer1_image": null, "answer2": null, "answer2_image": null, "answer3": null, "answer3_image": null, "correct_answer": 0, "status_id": 1, "source": "imp3pg008q9a", "type_id": 2, "calculator": null, "gamecodes_id": null },
        //         { "id": 1938, "skill_id": 66, "difficulty_id": 2, "question": "23 tens = <input min=\"0\" type=\"number\" id =\"imp3pg008q10a_1\" class=\"lineinput\" placeholder=\"?\" \/>", "question_image": null, "answer0": "230", "answer0_image": null, "answer1": null, "answer1_image": null, "answer2": null, "answer2_image": null, "answer3": null, "answer3_image": null, "correct_answer": 0, "status_id": 1, "source": "imp3pg008q10a", "type_id": 2, "calculator": null, "gamecodes_id": null },
        //         { "id": 1941, "skill_id": 66, "difficulty_id": 2, "question": "11 hundreds 12 tens = <input min=\"0\" type=\"number\" id =\"imp3pg008q10d_1\" class=\"lineinput\" placeholder=\"?\" \/>", "question_image": null, "answer0": "1220", "answer0_image": null, "answer1": null, "answer1_image": null, "answer2": null, "answer2_image": null, "answer3": null, "answer3_image": null, "correct_answer": 0, "status_id": 1, "source": "imp3pg008q10d", "type_id": 2, "calculator": null, "gamecodes_id": null }
        //     ], "code": 201
        // });

        // return Observable.of({
        //     "message": "Request executed successfully",
        //     "test": 623,
        //     "questions": [
        //         { "id": 1096, "skill_id": 34, "difficulty_id": 1, "question": "I am a 3-digit even number. <br> I am less than 200. <br> The value of the digit in the tens place is 60. <br> The digit in the ones place is less than 1.<hr> I am the number ______.", "question_image": "\/images\/questions\/question_image\/imp2pg015q10.png", "answer0": "$$\\frac{1}{8}$$", "answer0_image": null, "answer1": "$$\\frac{1}{7}$$", "answer1_image": null, "answer2": "$$\\frac{1}{2}$$", "answer2_image": null, "answer3": "$$\\frac{1}{1}$$", "answer3_image": null, "correct_answer": 790, "status_id": 1, "source": "imp2pg015q10", "type_id": 1, "calculator": false, "gamecodes_id": null },
        //         { "id": 1088, "skill_id": 33, "difficulty_id": 3, "question": "I am a 3-digit even number. <br> I am less than 200. <br> The value of the digit in the tens place is 60. <br> The digit in the ones place is less than 1.<hr> I am the number ______.", "question_image": null, "answer0": "160", "answer0_image": null, "answer1": "163", "answer1_image": null, "answer2": "161", "answer2_image": null, "answer3": "None of the above", "answer3_image": null, "correct_answer": 0, "status_id": 1, "source": "imp2pg011q8", "type_id": 1, "calculator": null, "gamecodes_id": null },
        //         { "id": 1100, "skill_id": 34, "difficulty_id": 1, "question": "820 + 91 = <input min=\"0\" type=\"number\" id =\"imp2pg015q14_1\" class=\"lineinput\" placeholder=\"?\" \/>", "question_image": "\/images\/questions\/question_image\/imp2pg015q14.png", "answer0": "911", "answer0_image": null, "answer1": null, "answer1_image": null, "answer2": null, "answer2_image": null, "answer3": null, "answer3_image": null, "correct_answer": 911, "status_id": 1, "source": "imp2pg015q14", "type_id": 2, "calculator": null, "gamecodes_id": null },
        //         { "id": 1118, "skill_id": 34, "difficulty_id": 1, "question": "657 - 621 = <input min=\"0\" type=\"number\" id =\"imp2pg016q5_1\" class=\"lineinput\" placeholder=\"?\" \/>", "question_image": "\/images\/questions\/question_image\/imp2pg016q5.png", "answer0": "36", "answer0_image": null, "answer1": null, "answer1_image": null, "answer2": null, "answer2_image": null, "answer3": null, "answer3_image": null, "correct_answer": 36, "status_id": 1, "source": "imp2pg016q5", "type_id": 2, "calculator": null, "gamecodes_id": null },
        //         { "id": 1145, "skill_id": 34, "difficulty_id": 2, "question": "607 - _____ = 200", "question_image": null, "answer0": "597", "answer0_image": null, "answer1": "507", "answer1_image": null, "answer2": "407", "answer2_image": null, "answer3": "7", "answer3_image": null, "correct_answer": 2, "status_id": 1, "source": "imp2pg021q8", "type_id": 1, "calculator": null, "gamecodes_id": null }
        //     ],
        //     "code": 201
        // });

        return this.http
            .post<NotifyLoginResponse>(
                environment.host + this.NOTIFY_LOGIN_URL, null,
                { headers: this.createAuthHeader(this.authService.idToken) });
    }

    /**
     * Checks against mastercode strategy if the user is authorized
     */
    public checkAuthorization(firstname: string, lastname: string, date_of_birth: string, mastercode: number): Observable<MasterCodeAuthorizationResponse> {
        return this.http
            .post<MasterCodeAuthorizationResponse>(
                environment.host + this.CHECK_MASTER_CODE_URL,
                {
                    mastercode,
                    date_of_birth,
                    firstname,
                    lastname
                },
                {
                    headers: this.createAuthHeader(this.authService.idToken)
                });
    }
}