var avg = function(arr) {
    var sum = 0;
    for(i = 0 ; i < arr.length ; i++) {
        sum += arr[i];
    }
    return sum/arr.length;
}


var loadAvgByModelChart = function(data) {
    var convertedData = convertDataToAvgAndCountByManufacturer(data);
    console.log(convertedData);
    console.info(dictToC3('number of connections', convertedData['avg'])['values']);
    console.info(dictToC3('number of connections', convertedData['count'])['values'])

    var chart = c3.generate({
        bindto: '#chartAvgByManufacturer',
        data: {
            columns: [
                dictToC3('averageConnectionTime', convertedData['avg'])['values'],
                dictToC3('numberOfConnections', convertedData['count'])['values']
            ],
            axes: {
                averageConnectionTime: 'y',
                numberOfConnections: 'y2'
            },
            types: {
                averageConnectionTime: 'bar',
                numberOfConnections: 'line'
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: dictToC3('average connection time', convertedData['avg'])['categories'],
            }
        }
    });
}

var convertDataToAvgAndCountByManufacturer = function(data) {
    var connectionTimeByManufacturers = {};
    for(i = 0 ; i < data.length ; i++) {
        var manuf = data[i]['peripheralManufacturer'];
        var connectedAt = data[i]['connectTime'];
        var disconnectedAt = data[i]['disconnectTime'];
        var connectionTimeMiliSeconds = Date.parse(disconnectedAt) - Date.parse(connectedAt);
        if(!(manuf in connectionTimeByManufacturers)) {
            connectionTimeByManufacturers[manuf] = []
        }
        connectionTimeByManufacturers[manuf].push(connectionTimeMiliSeconds);
    }

    timeAvgByManufacturers = {};
    numberOfConnectionsManufacturers = {};
    for(key in connectionTimeByManufacturers) {
        timeAvgByManufacturers[key] = avg(connectionTimeByManufacturers[key]);
        numberOfConnectionsManufacturers[key] = connectionTimeByManufacturers[key].length;
    }


    return {
        'avg': timeAvgByManufacturers,
        'count': numberOfConnectionsManufacturers
    }
}

var dictToC3 = function(dataName, data) {
    var categories = [];
    var values = [];
    for(key in data) {
        categories.push(key);
        values.push(data[key]);
    }

    values.unshift(dataName);
    return {
        'categories': categories,
        'values' : values
    };
}


$.get(constants.serverUri + "/peripheralData/historical", function(data) {
    loadAvgByModelChart(data);
});