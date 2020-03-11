import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import router from './router';
import AuthActions from 'actions/AuthActions';

AuthActions.auth();

const root = document.getElementById('app-root');

router.onChange(function(RouteComponent, routeName) {

	ReactDOM.render(
		(
			<App routeName={routeName}>
				<RouteComponent />
			</App>
		),
		root
	);
});
