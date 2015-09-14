class AmMapper {
	constructor(opts) {
		this.map = new AmCharts.AmMap();

		this.map.pathToImages = opts.pathToImages || 'lib/ammap/images';
		this.map.dataProvider = opts.dataProvider || { map: 'worldLow' };

		this.map.areasSettings = {
			autoZoom: true,
			selectedColor: '#c88a8a',
			color: '#ccc'
		};

		this.map.zoomControl = {
			zoomControlEnabled: true,
			maxZoomLevel: 5
		};

		if (opts.zoomControl) {
			this.map.zoomControl = opts.zoomControl;
		}

		this.map.write(opts.targetId);

		window.map = this.map;

	}

	selectCountry(countryId) {
		console.log('selecting country...', countryId);
		this.map.selectObject(this.map.getObjectById(countryId));
	}

}

export default AmMapper;
