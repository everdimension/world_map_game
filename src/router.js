import HomePage from 'components/HomePage';
import LoginPage from 'components/LoginPage';
import MapPage from 'components/MapPage';
import AuthStore from 'stores/AuthStore';

const paths = {
	home: HomePage,
	map: MapPage,
	login: LoginPage
};

class Router {
	constructor() {
		this.routeName = window.location.hash.substr(1) || 'home';
		this.renderFn = null;
		window.addEventListener('hashchange', this.onRouteChange.bind(this));
	}

	onChange(renderFn) {
		this.renderFn = renderFn;
		this.onRouteChange.call(this);
	}

	onRouteChange() {
		this.routeName = window.location.hash.substr(1) || 'map';
		let routeComponent = paths[this.routeName] || home;

		if (routeComponent.requiresLogin && !AuthStore.getState().isAuthenticated) {
			console.warn('unauthorized!');
			window.location.hash = 'login';

		} else {
			this.renderFn(routeComponent, this.routeName);
		}

	}
}

export default new Router();
