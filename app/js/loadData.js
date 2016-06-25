var updateConnectedPeripherals = function() {
    var resultData={};
    $.get(constants.serverUri + "/peripheralData/connected", function(data, status) {
        console.log('got connected peripherals data');
        updateConnectedPeripheralsTable(data);

    }).fail(function(data) {
        alert("Error getting connected peripherals data");
    });
}

var updateHistoricalPeripherals = function() {
    var resultData={};
    $.get(constants.serverUri + "/peripheralData/historical", function(data, status) {
        console.log('got historical peripherals data');
        updateHistoricalPeripheralsTable(data);

    }).fail(function(data) {
        alert("Error getting historical peripherals data");
    });
}


var updateConnectedPeripheralsTable = function(connectedPeripherals) {
    console.log('updating connected peripherals table');
    $.each(connectedPeripherals, function(k, v) {
        $("table#connectedPeripheralsTable").append(convertDataToTable(v));
    })
}

var updateHistoricalPeripheralsTable = function(historicalPeripherals) {
    console.log('updating historical peripherals table');
    $.each(historicalPeripherals, function(k, v) {
        $("table#historicalPeripheralsTable").append(convertDataToTable(v));
    })
}

var convertDataToTable = function(data) {
    var row = "";
    $.each(data, function (k, v) {
        row += "<td>" + v + "</td>"
    });
    var $tr = $('<tr>').append( row );
    return  $tr;
}


updateConnectedPeripherals();
updateHistoricalPeripherals();
