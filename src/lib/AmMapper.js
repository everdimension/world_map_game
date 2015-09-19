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

	addLabel(opts) {
		// let lastObject = this.map.dataProvider.images[0];
		// if (lastObject) {
		// 	lastObject.deleteObject();
		// }

		return;

		let imageSettings = { latitude: 51.32423, longitude: 0, type: 'circle', color: '#ffffff', labelShiftY: 0, label: 'London' };
		imageSettings.latitude = opts.latitude;
		imageSettings.longitude = opts.longitude;
		imageSettings.label = '';
		imageSettings.id = 'capital';

		let imageObject = new AmCharts.MapImage(imageSettings);

		console.log('adding label');
		this.map.dataProvider.images.push(imageObject);
		// imageObject.validate();
		let theImage = this.map.dataProvider.images[this.map.dataProvider.images.length - 1];
		console.log(theImage);
		// theImage.updatePosition();
		// theImage.validate();


		// this.map.validateData();
	}

}

export default AmMapper;
