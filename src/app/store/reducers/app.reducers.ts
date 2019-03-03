import { User } from '../../models/user';
import { All, AuthActionTypes } from '../actions/auth.actions';

export interface IState {
    // is a user Authenticated?
    isAuthenticated: boolean;

    // if authenticated, should be a user object
    user: User | null;

    // error message
    errorMessage: string | null;

}

export const initState: IState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

export function  reducer(state: IState = initState, action: All): IState {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            };
        }
        default: {
            return state;
        }
    }
}
