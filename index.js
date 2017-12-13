function parseFields(fields) {
    const res = {};
    const keys = Object.keys(fields);
    for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];
        res[key] = parseValue(fields[key]);
    }
    return res;
}

function parseValue(value) {
    const type = Object.keys(value)[0];

	if (value == null || value == '' || type == null || type == '') {
		console.log("Cannot parse null value");
		return;
	}
	
    switch (type) {
        case 'geoPointValue':
            return [value.geoPointValue.latitude, value.geoPointValue.longitude];
        case 'arrayValue':
			if (value.arrayValue == null || value.arrayValue.values == null) {
				return;
			}
            return value.arrayValue.values.map(parseValue);
        case 'mapValue':
            return parseFields(value.mapValue.fields);
        case 'integerValue':
        case 'doubleValue':
            return Number(value[type]);
        default:
            return value[type];
    }
}

module.exports = parseFields;
