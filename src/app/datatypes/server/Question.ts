export interface Question {
    id: number;
    skill_id: number;
    difficulty_id: number
    question: string
    question_image: string;

    answer0: string
    answer0_image: string;

    answer1: string
    answer1_image: string;

    answer2: string
    answer2_image: string;

    answer3: string
    answer3_image: string;

    correct_answer: number
    status_id: number
    source: string
    type_id: number
    calculator: any;
    gamecodes_id: number
}