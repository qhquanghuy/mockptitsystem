import { ofType } from 'redux-observable';
import { tap, catchError, delay, map, pluck, mergeMap } from 'rxjs/operators';
import { actions } from './SignIn.duck';

const { sendSignInInfo, signInSuccess } = actions;
const url = 'http://localhost:9098/signin';
const header = { 'Content-Type': 'application/json; charset=utf-8' };

export const sendSignInInfoEpic = (action$, store, { fetch$ }) => action$.pipe(
	ofType(sendSignInInfo.type),
	mergeMap(({ payload }) => 
		fetch$
			.post(url, { email: payload.email, password: payload.password, token: payload.token }, header)
			.pipe(
				pluck('response'),
				tap(res => console.log(res)),
				catchError((err) => console.log(err))
			)
	),
	map(signInSuccess)
);
