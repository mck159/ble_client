var updateConnectedPeripherals = function() {
    var resultData={};
    $.get(constants.serverUri + "/peripheralData/connected", function(data, status) {
        console.log('got connected peripherals data');
        updateConnectedPeripheralsTable(data);

    }).fail(function(data) {
        alert("Error getting connected peripherals data");
    });
}


var updateConnectedPeripheralsTable = function(connectedPeripherals) {
    console.log('updating connected peripherals table');
    $.each(connectedPeripherals, function(k, v) {
        console.log(v);
        $("table#connectedPeripheralsTable").append(convertDataToTable(v));
    })
    convertDataToTable();
}

var convertDataToTable = function(data) {
    var row = "";
    $.each(data, function (k, v) {
        row += "<td>" + v + "</td>"
    });
    var $tr = $('<tr>').append( row );
    return  $tr;
}


updateConnectedPeripherals()
