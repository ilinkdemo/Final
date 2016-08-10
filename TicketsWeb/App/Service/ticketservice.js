// --------------------------------------------------------------------------------------------------------------------
// <summary>
//   Desc: Service to fetch  the Ticket list
//   Author: Syed
// </summary>
// --------------------------------------------------------------------------------------------------------------------

ticketApp.factory("ticketservice", ['restService', function (restService) {
    var ticketdetails = {};

    /// <summary>
    /// Service for generate ticket information
    /// </summary>
    ticketdetails.GetTicketDetails = function () {
        return restService._getRecords("api/Ticket/GetTicketDetails");
    };

    /// <summary>
    /// Service for generate ticket info from Text File
    /// </summary>
    ticketdetails.GetTicketDetailsFrmTxt = function (ticketmodel) {
        return restService.postMethod("api/Ticket/InsertTicketDetails/", ticketmodel);
    };

    /// <summary>
    /// Service for generate NLP ticket information(sending Ticket number one by one)
    /// </summary>
    ticketdetails.GetNLPTickets = function (ticketmodelfind) {
        return restService.postMethod("api/Ticket/GetNLPTickets/", ticketmodelfind);
    };

    /// <summary>
    /// Service for generate NLP ticket information(sending Ticket number one by one) From FIND
    /// </summary>
    ticketdetails.GetNLPTicketsFind = function (ticketmodel) {
        return restService.postMethod("api/Ticket/GetNLPTicketsFind/", ticketmodel);
    };

    /// <summary>
    /// Service to get resolved tickets
    /// </summary>
    ticketdetails.GetResolvedTickets = function (IsOpenOrResolved) {
        return restService._getRecords("api/Ticket/GetResolvedTickets/" + IsOpenOrResolved);
    };
    /// <summary>
    /// Service Update the Accepted or Rejected tickets (sending Ticket number as array)
    /// </summary>
    ticketdetails.UpdateTickets = function (ticketmodel) {
        return restService.postMethod("api/Ticket/UpdateTicketPrediction", ticketmodel);
    };

    /// <summary>
    /// Service Update the Accepted or Rejected tickets (sending Ticket number as array)
    /// </summary>
    ticketdetails.DeleteTickets = function () {
        return restService.postMethod("api/Ticket/DeleteTicketPrediction/");
    };

    /// <summary>
    /// Service to get Tickets Date Range
    /// </summary>
    ticketdetails.GetDateRange = function () {
        return restService._getRecords("api/Ticket/GetDateRange");
    };

    /// <summary>
    /// Service to check authorized user
    /// </summary>
    ticketdetails.GetAuthorize = function (username, password) {
        return restService._getRecords("api/Ticket/GetAuthorize/" + username + "/" + password);
    };

    /// <summary>
    /// Service for generate NLP ticket information (sending Ticket number as array)
    /// </summary>
    /*ticketdetails.GetNLPTickets = function (ticketmodel) {
        return restService.postMethod("Predict/GetNLPTicketsbatch", ticketmodel);
    };*/


    return ticketdetails;
}]);