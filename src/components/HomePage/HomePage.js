import React from 'react';
import ItemsContainer from '../Items';

class HomePage extends React.Component {
	render() {
		return (
			<div className="container">
				<ItemsContainer />
			</div>

		);
	}
}

HomePage.requiresLogin = true;

export default HomePage;
