import React from 'react';
import './SignIn.scss';

const SignIn = ({
	handleSubmit,
	loading,
	updateEmail,
	updatePassword
}) => (
	<form onSubmit={ handleSubmit }>
		<h3>Sign In</h3>

		<p className = "text-danger">

		</p>
		<input
			placeholder="Email"
			className="form-control"
			onChange={ updateEmail }
		/>
		
		<input
			type="password"
			placeholder="Password"
			className="form-control"
			onChange={ updatePassword }
		/>
		<button className="btn btn-primary">
			{ loading ? 'Loading...' : 'Sign In'}
		</button>
	</form>
);

export default SignIn;
