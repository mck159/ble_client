$('#tableConnected').DataTable({
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

$('#tableHistorical').DataTable({
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