import * as auth from './reducers/app.reducers';

export interface AppState {
    authState: auth.IState;
}

export const reducers = {
    auth: auth.reducer
};
