class AmMapper {
	constructor(opts) {
		let mapSettings = {
			type: 'map'
		};

		mapSettings.pathToImages = opts.pathToImages || 'lib/ammap/images';
		mapSettings.dataProvider = opts.dataProvider || { map: 'worldLow' };

		mapSettings.areasSettings = {
			autoZoom: true,
			selectedColor: '#c88a8a',
			outlineColor: '#ccc',
			color: '#888'
		};

		mapSettings.zoomControl = {
			zoomControlEnabled: true,
			maxZoomLevel: 5
		};

		if (opts.zoomControl) {
			mapSettings.zoomControl = opts.zoomControl;
		}

		this.map = new AmCharts.makeChart(opts.targetId, mapSettings);

		window.map = this.map;

	}

	selectCountry(countryId) {
		console.log('selecting country...', countryId);
		this.map.selectObject(this.map.getObjectById(countryId));
	}

}

export default AmMapper;
