export interface User {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    contact: string;
    email: string;
    is_admin: boolean
    maxile_level: number;
    game_level: number;
    date_of_birth: Date;
    last_test_date: Date;
    next_test_date: Date;
    image: string;
    updated_at: Date;
}