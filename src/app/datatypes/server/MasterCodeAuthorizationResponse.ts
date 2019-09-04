import { BaseServerData } from '../BaseServerData';
import { User } from '../User';

export interface MasterCodeAuthorizationResponse extends BaseServerData {
    user: User;
}