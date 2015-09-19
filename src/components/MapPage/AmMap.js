import React from 'react';
import AmMapper from '../../lib/AmMapper.js';
require ('./Map.less');
require('../../lib/ammap.js');
require('../../lib/worldLow.js');

class AmMap extends React.Component {
	constructor (props) {
		super(props);

		let dataProvider = {
			map: 'worldLow',
			// images: [{ latitude: 51.32423, longitude: 0, type: 'circle', color: '#fff', labelColor: '#fff', labelShiftY: 20, label: 'London' }],
			// areas: [{ id: 'AU', color: '#cc0000' }, { id: 'US', showAsSelected: true } ],
			getAreasFromMap: true
		};

		let zoomControl = {
			homeButtonEnabled: false,
			maxZoomLevel: 4,
			zoomControlEnabled: false
		};

		this.state = {
			map: new AmMapper({
				targetId: 'mapBox',
				dataProvider,
				zoomControl
			})
		};
	}

	componentDidMount () {

		window.mapper = this.state.map;

		if (this.props.selectCountry && this.props.selectCountry.country_code) {
			this.state.map.addLabel(this.props.selectCountry.capital);
			this.state.map.selectCountry(this.props.selectCountry.country_code);
		} else {
			console.log('no need to select country on mount');
		}

	}

	componentWillUnmount () {
		console.log(this.state.map);
		this.state.map.clear();
	}

	componentDidUpdate (prevProps) {

		if (this.props.selectCountry.country_code !== prevProps.selectCountry.country_code) {
			this.state.map.addLabel(this.props.selectCountry.capital);
			this.state.map.selectCountry(this.props.selectCountry.country_code);
		}
	}

	shouldComponentUpdate (newProps) {
		// return false;
		return this.props.selectCountry.country_code !== newProps.selectCountry.country_code;
	}

	// componentWillReceiveProps (newProps) {
	// 	if (newProps.selectCountry && this.props.selectCountry.country_code !== newProps.selectCountry.country_code) {
	// 		console.log('selecting country in componentWillReceiveProps', this.state.map.map);
	// 		// this.state.map.addLabel(newProps.selectCountry.capital);
	// 		this.state.map.selectCountry(newProps.selectCountry.country_code);
	// 	}
	// 	// if (!oldProps.selectCountry || newProps.selectCountry.country_code !== oldProps.selectCountry.country_code) {
	// 	// 	this.state.map.selectCountry(newProps.selectCountry.country_code);
	// 	//
	// 	// }
	// }

	render () {
		return (
			<div id="mapBox" className="Map"></div>
		);
	}

}

export default AmMap;
