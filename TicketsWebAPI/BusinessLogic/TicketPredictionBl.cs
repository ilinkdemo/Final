using System;
using System.Configuration;
using RESTTicketService.DataAccess;
using RESTTicketService.Models;
using System.Collections.Generic;

namespace RESTTicketService.BusinessLogic
{
    public class TicketPredictionBl
    {
        readonly TicketPredictionDL _objTicketDl = new TicketPredictionDL();
        readonly TicketPredictionService _objTicketService = new TicketPredictionService();
        
        /// <summary>
        /// Get Ticket Details
        /// </summary>
        /// <returns></returns>
        public System.Web.Mvc.JsonResult GetTicketDetails()
        {
            var jsonResult = new System.Web.Mvc.JsonResult();
            var result = _objTicketDl.GetTicketDetails();
            jsonResult.Data = new { Items = result, Total = result.Rows.Count };
            return jsonResult;
        }

        /// <summary>
        /// Get Resolved Ticket Details
        /// </summary>
        /// <returns></returns>
        public System.Web.Mvc.JsonResult GetResolvedTickets(int IsOpenOrResolved)
        {
            var jsonResult = new System.Web.Mvc.JsonResult();
            var result = _objTicketDl.GetResolvedTickets(IsOpenOrResolved);
            jsonResult.Data = new { Items = result, Total = result.Rows.Count };
            return jsonResult;
        }

        /// <summary>
        /// Get GetNLPTickets Details
        /// </summary>
        /// <returns></returns>
        public System.Web.Mvc.JsonResult GetNLPTicketsbatch(TicketModel objTicketModel)
        {
            var jsonResult = new System.Web.Mvc.JsonResult();
            var result = _objTicketDl.GetNLPTicketsbatch(objTicketModel);
            jsonResult.Data = new { Items = result, Total = result.Rows.Count };
            return jsonResult;
        }

        /// <summary>
        /// Get GetNLPTickets Details
        /// </summary>
        /// <returns></returns>
        public System.Web.Mvc.JsonResult GetNLPTickets(List<TicketModel> objTicketModel)
        {
            var jsonResult = new System.Web.Mvc.JsonResult();
            var result = _objTicketDl.GetNLPTickets(objTicketModel);
            jsonResult.Data = new { Items = result, Total = result.Rows.Count };
            return jsonResult;
        }
        /// <summary>
        /// Insert Details from excel
        /// </summary>
        /// <returns></returns>
        public System.Web.Mvc.JsonResult InsertTicketDetails(List<TicketInsertDataModel> objTicketModel)
        {
            var jsonResult = new System.Web.Mvc.JsonResult();
            var result = _objTicketDl.InsertTicketDetails(objTicketModel);
            jsonResult.Data = new { Items = result, Total = result.Rows.Count };
            return jsonResult;
        }


        /// <summary>
        /// Get GetNLPTicketsFind Details
        /// </summary>
        /// <returns></returns>
        public System.Web.Mvc.JsonResult GetNLPTicketsFind(List<TicketRequestModel> objTicketModel)
        {
            var jsonResult = new System.Web.Mvc.JsonResult();
            var result = _objTicketService.GetNLPTicketsFind(objTicketModel);
            jsonResult.Data = result;// new { Items = result, Total = result.ToString().Length };
            return jsonResult;
        }

        /// <summary>
        /// To Update the Accepted or Rejected tickets
        /// </summary>
        /// <returns></returns>
        public System.Web.Mvc.JsonResult UpdateTicketPrediction(TicketModel objTicketModel)
        {
            var jsonResult = new System.Web.Mvc.JsonResult();
            var result = _objTicketDl.UpdateTicketPrediction(objTicketModel);
            jsonResult.Data = new { Items = result, Total = result.Rows.Count };
            return jsonResult;          
        }
        
        /// <summary>
        /// To delete tickets
        /// </summary>
        /// <returns></returns>
        public void DeleteTickets()
        {
            _objTicketDl.DeleteTickets();      
        }

        /// <summary>
        /// get Tickets date Range
        /// </summary>
        /// <returns>date Range</returns>
        public string GetTicketDateRange()
        {
            return _objTicketDl.GetTicketDateRange();
        }

        /// <summary>
        /// Authorization Check
        /// </summary>
        /// <returns>true/false</returns>
        public string GetAuthorize(string username, string password)
        {
            return _objTicketDl.GetAuthorize(username, password);
        }
    }
}