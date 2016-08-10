
/*jslint browser: true*/
/*global angular*/
angular.module('ticketApp').constant('config', {
   //baseUrl: 'http://localhost:55114/', 
   // baseUrl: 'https://frameworkstore.ilink-systems.com/TicketsWebAPI/',
    baseUrl: 'https://ticketswebapi.azurewebsites.net/',
    baseUrlToken: 'HYPERLINK "',
    //underwritingPdfUrl: 'http://localhost/documents/',
    validdata: 'valid data',
    errorDisplayNumber: 2,
    sessionTimeOut: '30',
    MaxRowsExportToFile: 1000,
    clientSideExceptionLogger: true
}); 
