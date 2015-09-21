class AmMapper {
	constructor(opts) {
		let mapSettings = {
			type: 'map',
			balloon: {
				// fixedPosition: false,
				// color: "#0f6",
				// verticalPadding: 29
			}
		};

		mapSettings.pathToImages = opts.pathToImages || 'lib/ammap/images';
		mapSettings.dataProvider = opts.dataProvider || { map: 'worldLow' };

		mapSettings.areasSettings = {
			autoZoom: true,
			selectedColor: '#c88a8a',
			outlineColor: '#ccc',
			color: '#888'
		};

		if (opts.zoomControl) {
			mapSettings.zoomControl = opts.zoomControl;
		}

		this.map = new AmCharts.makeChart(opts.targetId, mapSettings);

		window.map = this.map;

	}

	clear() {
		this.map.clear();
	}

	selectCountry(countryId) {
		console.log('selecting country...', countryId);
		this.map.selectObject(this.map.getObjectById(countryId));
	}

	addMarker(opts) {

		let imageSettings;
		let currentZoom = map.zoomLevel();
		let currentLat = map.zoomLatitude();
		let currentLon = map.zoomLongitude();

		this.map.dataProvider.images.length = 0;

		if (opts) {
			imageSettings = { latitude: 51.32423, longitude: 0, type: 'circle', color: '#ffffff', labelShiftY: 0, label: 'London' };
			imageSettings.latitude = opts.latitude;
			imageSettings.longitude = opts.longitude;
			imageSettings.width = 7;
			imageSettings.height = 7;
			imageSettings.label = '';
			imageSettings.id = 'capital';

			console.log('adding label');
			this.map.dataProvider.images.push(imageSettings);
		}

		this.map.validateNow();
		this.map.zoomToLongLat(currentZoom, currentLon, currentLat, true);
	}
}

export default AmMapper;
