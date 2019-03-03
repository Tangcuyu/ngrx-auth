import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/catch';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure } from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    @Effect()
    LogIn: Observable<any> = this.actions
        .ofType(AuthActionTypes.LOGIN)
        .pipe(
            map((action: LogIn) => action.payload),
            switchMap(payload => {
                return this.authService.logIn(payload.email, payload.password)
                    .pipe(
                        map((user) => {
                            console.log(user);
                            return new LogInSuccess({token: user.token, email: payload.email});
                        }),
                        catchError((error) => {
                            // console.log(error);
                            throw  new LogInFailure({error: error});
                        })
                    );
                })
        );
}

