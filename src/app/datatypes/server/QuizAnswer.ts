export interface QuizAnswer {

    /**
     * Id of the quiz taken
     */
    test: number;
    /**
     * array with the questions id.
     * Order matters
     */
    question_id: number[]
    /**
     * array with the index of the selected answers
     * Order matters
     */
    answer: (number | string[])[]

}