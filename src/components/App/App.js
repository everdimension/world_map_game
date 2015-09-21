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
		console.log(this.props.children);
		let appElement = null;
		let navbarElement = null;
		if (this.props.routeName !== 'map') {
			appElement = (
				<div className="container">
					<h2>App is...</h2>
					<p className="lead">Message: <i>{this.state.msg}</i></p>
				</div>
			);

			navbarElement = ( <Navbar user={this.state.user} onLogout={this.handleLogout.bind(this)} /> );
		}
		return (
			<div>
				{navbarElement}
				{appElement}
				{this.props.children}
			</div>
		);
	}
}

export default App;
