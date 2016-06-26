var avg = function(arr) {
    var sum = 0;
    for(i = 0 ; i < arr.length ; i++) {
        sum += arr[i];
    }
    return sum/arr.length;
}


var loadAvgByModelChart = function(data) {
    var convertedData = convertDataToAvgAndCountByManufacturer(data);

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

var loadConnectionByDatePerManufChart = function(data) {
    var convertedData = convertDataToConnectionByDatePerManuf(data);
    var chartData = []
    var c3data;
    for(key in convertedData) {
        c3data = dictToC3(key, convertedData[key]);
        chartData.push(c3data['values']);
    }

    var chart = c3.generate({
        bindto: '#chartConnectionByDatePerManuf',
        data: {
            columns: chartData,
        },
        axis: {
            x: {
                type: 'category',
                categories: c3data['categories']
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

var convertDataToConnectionByDatePerManuf = function(data) {
    var dates = [];
    var manufacturers = [];
    for(i = 0 ; i < data.length ; i++) {
        var connectDate = data[i]['connectTime'].substring(0,10);
        var manufacturer = data[i]['peripheralManufacturer'];
        if(dates.indexOf(connectDate) == -1) {
            dates.push(connectDate);
        }
        if(manufacturers.indexOf(manufacturer) == -1) {
            manufacturers.push(manufacturer);
        }
    }
    dates.sort();

    var manufConnectionsPerDate = {}
    for(i = 0 ; i < manufacturers.length ; i++) {
        manufConnectionsPerDate[manufacturers[i]] = {};
        for(j = 0 ; j < dates.length ; j++) {
            manufConnectionsPerDate[manufacturers[i]][dates[j]] = 0;
        }
    }

    for(i = 0 ; i < data.length ; i++) {
        manufConnectionsPerDate[data[i]['peripheralManufacturer']][data[i]['connectTime'].substring(0,10)] += 1;
    }

    return manufConnectionsPerDate
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
    loadConnectionByDatePerManufChart(data);
});
setInterval( function () {
    $.get(constants.serverUri + "/peripheralData/historical", function(data) {
        loadAvgByModelChart(data);
        loadConnectionByDatePerManufChart(data);
    });
}, 10000);
