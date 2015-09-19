import React from 'react';
import Navbar from 'components/Navbar';
import AuthStore from '../../stores/AuthStore';
import AuthActions from '../../actions/AuthActions';
import './App.less';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = AuthStore.getState();
		this.state.msg = 'app state message';
		this.onStoreChange = this.onStoreChange.bind(this);
	}

	componentDidMount() {
		AuthStore.listen(this.onStoreChange);
	}

	componentWillUnmount() {
		AuthStore.unlisten(this.onStoreChange);
	}

	onStoreChange() {
		this.setState({
			user: AuthStore.getState().user
		});
		// console.log('auth state', AuthStore.getState());

	}

	handleLogout() {
		AuthActions.logout();
		window.location.hash = 'login';
	}

	render() {

		// console.log('state of app', this.state);
		let appElement = null;
		if (window.location.hash.substr(1) !== 'map') {
			appElement = (
				<div className="container">
					<h2>App is...</h2>
					<p className="lead">Message: <i>{this.state.msg}</i></p>
				</div>
			);
		}
		return (
			<div>
				<Navbar user={this.state.user} onLogout={this.handleLogout.bind(this)} />
				{appElement}
				{this.props.children}
			</div>
		);
	}
}

export default App;
