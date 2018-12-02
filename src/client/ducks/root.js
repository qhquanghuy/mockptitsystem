import { combineReducers } from 'redux';
import { reducer as signInReducer } from '../features/SignIn/SignIn.duck';

export default combineReducers({
	signInReducer
});
