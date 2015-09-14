import React from 'react';

import AuthActions from '../../actions/AuthActions';
import AuthStore   from '../../stores/AuthStore';
import AmMap from './AmMap';

class MapContainer extends React.Component {

	constructor(props) {
		super(props);
	}

	// componentDidMount() {
	// 	AuthStore.listen(this.onStoreChange);
	// }
	// componentWillUnmount() {
	// 	AuthStore.unlisten(this.onStoreChange);
	// }

	render() {
		return (
			<div>
				<AmMap />
			</div>
		);
	}

	// onStoreChange() {
	// 	this.setState(AuthStore.getState());
	// 	if (this.state.isAuthenticated) {
	// 		window.location.hash = '';
	// 	}
	// }
}

export default MapContainer;
