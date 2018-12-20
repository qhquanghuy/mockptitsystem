import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { prop } from 'ramda';
import getTargetValue from '../../helpers/getTargetValue';
import SignInComponent from './SignIn.component';
import { actions } from './SignIn.duck';

import { withRouter } from 'react-router-dom'


const SignIn = ({
	handleSubmit,
	loading,
	updateEmail,
	updatePassword,
	redirectUrl
}) => (
	<SignInComponent
		handleSubmit={ handleSubmit }
		loading={ loading }
		updateEmail={ updateEmail }
		updatePassword={ updatePassword }
		redirectUrl = {redirectUrl}
	/>
);

const enhanceComponent = compose(
	withRouter,
	connect(prop('signInReducer'), actions),
	withHandlers({
		handleSubmit: ({
			email,
			password,
			match,
			sendSignInInfo,
		}) => (event) => {
			event.preventDefault();
			const token = match.params.token
			sendSignInInfo({ email, password, token });
		},
		updateEmail: ({ setEmail }) => compose(
			setEmail,
			getTargetValue
		),
		updatePassword: ({ setPassword }) => compose(
			setPassword,
			getTargetValue
		)
	})
);

export default enhanceComponent(SignIn);
