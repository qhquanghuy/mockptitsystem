import autodux from 'autodux';

export const { actions, initial, reducer } = autodux({
	slice: 'signIn',
	initial: {
		email: '',
		password: '',
		token: '',
		loading: false,
		success: false
	},
	actions: {
		sendSignInInfo: (state, { email, password, token }) => ({
			email,
			password,
			token,
			loading: true
		}),
		signInSuccess: (state, res) => {
			return ({
				...state,
				success: true,
			})
		}
	}
});
