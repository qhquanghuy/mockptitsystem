import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { sendSignInInfoEpic } from '../features/SignIn/SignIn.epic';

const rootEpic = combineEpics(
	sendSignInInfoEpic
);

export default createEpicMiddleware(rootEpic, {
	dependencies: { fetch$: ajax }
});
