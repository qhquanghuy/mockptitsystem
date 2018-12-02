import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './features/App';
import SignIn from './features/SignIn';
import Home from './features/Home';


export default () => (
	<BrowserRouter>
		<App>
			<Switch>
				<Route exact path="/" component={ Home } />
				<Route path="/signin/:token" component={ SignIn } />
			</Switch>		
		</App>
	</BrowserRouter>
);
