import React from 'react';
import AmMapper from '../../lib/AmMapper.js';
require ('./Map.less');
require('../../lib/ammap.js');
require('../../lib/worldLow.js');

class AmMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			map: null
		};
	}

	componentDidMount() {

		let dataProvider = {
			map: 'worldLow',
			images: [{ latitude: 51.32423, longitude: 0, type: 'circle', color: '#6c00ff', labelShiftY: 20, label: 'London' }],
			areas: [{ id: 'AU', color: '#cc0000' }, { id: 'US' } ],
			getAreasFromMap: true
		};

		this.state.map = new AmMapper({
			targetId: 'mapBox',
			dataProvider
		});
	}

	render() {
		return (
			<div id="mapBox"></div>
		);
	}

}

export default AmMap;
