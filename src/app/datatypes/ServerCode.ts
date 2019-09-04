export enum ServerCode {
    /**
     * Master code is verified. User is authorized
     */
    CODE_VERIFIED = 201,
    /**
     * Master code was not verified. User is not authorized
     */
    CODE_NOT_VERIFIED = 203,
    /**
     * Quiz is finished.
     */
    QUIZ_FINISHED = 206
}