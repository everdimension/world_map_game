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
			// images: [{ latitude: 51.32423, longitude: 0, type: 'circle', color: '#fff', labelColor: '#fff', labelShiftY: 20, label: 'London' }],
			// areas: [{ id: 'AU', color: '#cc0000' }, { id: 'US', showAsSelected: true } ],
			getAreasFromMap: true
		};

		this.state.map = new AmMapper({
			targetId: 'mapBox',
			dataProvider
		});

		if (this.props.selectCountry && this.props.selectCountry.country_code) {
			this.state.map.selectCountry(newProps.selectCountry.country_code);
		}
	}

	componentWillReceiveProps(newProps) {
		console.log('new props in AmMap', newProps);
		this.state.map.selectCountry(newProps.selectCountry.country_code);
	}

	render() {
		return (
			<div id="mapBox" className="Map"></div>
		);
	}

}

export default AmMap;
