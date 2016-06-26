var tableConnected = $('#tableConnected').DataTable({
    ajax: {
        url: constants.serverUri + "/peripheralData/connected",
        dataSrc: ''
    },
    columns: [
        { data: 'peripheralManufacturer' },
        { data: 'peripheralModel' },
        { data: 'peripheralIMEI' },
        { data: 'connectionTime' }
    ]
});

var tableHistorical = $('#tableHistorical').DataTable({
    ajax: {
        url: constants.serverUri + "/peripheralData/historical",
        dataSrc: ''
    },
    columns: [
        { data: 'peripheralManufacturer' },
        { data: 'peripheralModel' },
        { data: 'peripheralIMEI' },
        { data: 'connectTime' },
        { data: 'disconnectTime' }
    ]
});

setInterval( function () {
    tableConnected.ajax.reload();
    tableHistorical.ajax.reload();
}, 10000);