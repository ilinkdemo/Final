using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Web;
using RESTTicketService.BusinessLogic;
using RESTTicketService.Models;
using System.Web.Http.Cors;
using System.Text;
using RESTTicketService.Utilities;

namespace RESTTicketService.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")] 
    public class TicketController : ApiController
    {
        System.Web.Mvc.JsonResult exceptionobj = new System.Web.Mvc.JsonResult();
        /// <summary>
        /// Get Ticket Details
        /// </summary>
        /// <returns></returns>
        #region "Get Ticket Details"
        [HttpGet]
        [Route("api/Ticket/GetTicketDetails")]
        public System.Web.Mvc.JsonResult GetTicketDetails()
        {
            HttpContext.Current = null; 
            var ticketpredictBl = new TicketPredictionBl();
            try
            {
                return ticketpredictBl.GetTicketDetails();

            }
            catch (Exception ex)
            {
                exceptionobj.Data = ex.Message;
                return exceptionobj;
            }
        }
        #endregion

        /// <summary>
        /// Get Resolved Ticket Details
        /// </summary>
        /// <returns></returns>
        #region "Get Resolved Ticket Details"
        [HttpGet]
        [Route("api/Ticket/GetResolvedTickets/{IsOpenOrResolved}")]
        public System.Web.Mvc.JsonResult GetResolvedTickets(int IsOpenOrResolved)
        {
            HttpContext.Current = null;
            var ticketpredictBl = new TicketPredictionBl();
            try
            {
                return ticketpredictBl.GetResolvedTickets(IsOpenOrResolved);

            }
            catch (Exception ex)
            {
                exceptionobj.Data = ex.Message;
                return exceptionobj;
            }
        }
        #endregion

        /// <summary>
        /// Get NLPTicket Details
        /// </summary>
        /// <returns></returns>
        #region "Get GetNLPTickets Details"
        [HttpPost]
        [Route("api/Ticket/GetNLPTickets")]
        public System.Web.Mvc.JsonResult GetNLPTickets([FromBody] List<TicketModel> objTickets)
        {
            HttpContext.Current = null;
            var ticketpredictBl = new TicketPredictionBl();
            try
            {
                //var jsondata = ticketpredictBl.GetTicketDetails();
                //return jsondata;
                return ticketpredictBl.GetNLPTickets(objTickets);
            }
            catch (Exception ex)
            {
                exceptionobj.Data = ex.Message;
                return exceptionobj;
            }
        }
        #endregion

        /// <summary>
        /// Insert Details from excel
        /// </summary>
        /// <returns></returns>
        #region "Get GetNLPTickets Details"
        [HttpPost]
        [Route("api/Ticket/InsertTicketDetails")]
        public System.Web.Mvc.JsonResult InsertTicketDetails([FromBody] List<TicketInsertDataModel> objTickets)
        {
            HttpContext.Current = null;
            var ticketpredictBl = new TicketPredictionBl();
            try
            {
                return ticketpredictBl.InsertTicketDetails(objTickets);
            }
            catch (Exception ex)
            {
                exceptionobj.Data = ex.Message;
                return exceptionobj;
            }
        }
        #endregion

        /// <summary>
        /// Get NLPTicket fron FIIND API
        /// </summary>
        /// <returns></returns>
        #region "Get GetNLPTicketsFind Details"
        [HttpPost]
        [Route("api/Ticket/GetNLPTicketsFind")]
        public System.Web.Mvc.JsonResult GetNLPTicketsFind([FromBody] List<TicketRequestModel> objTickets)
        {
            HttpContext.Current = null;
            var ticketpredictBl = new TicketPredictionBl();
            try
            {
                //var jsondata = ticketpredictBl.GetTicketDetails();
                //return jsondata;
                return ticketpredictBl.GetNLPTicketsFind(objTickets);
            }
            catch (Exception ex)
            {
                exceptionobj.Data = ex.Message;
                return exceptionobj;
            }
        }
        #endregion
        /// <summary>
        /// Get NLPTicket batch Details
        /// </summary>
        /// <returns></returns>
        #region "Get GetNLPTickets Details"
        [HttpPost]
        [Route("api/Ticket/GetNLPTicketsbatch")]
        public System.Web.Mvc.JsonResult GetNLPTicketsbatch([FromBody] TicketModel objTickets)
        {
            HttpContext.Current = null;
            var ticketpredictBl = new TicketPredictionBl();
            try
            {
                //var jsondata = ticketpredictBl.GetTicketDetails();
                //return jsondata;
                return ticketpredictBl.GetNLPTicketsbatch(objTickets);
            }
            catch (Exception ex)
            {
                exceptionobj.Data = ex.Message;
                return exceptionobj;
            }
        }
        #endregion

        /// <summary>
        /// To Update the Accepted or Rejected tickets
        /// </summary>
        /// <returns></returns>
        #region "Update Accepted or Rejected Ticket Details"
        [HttpPost]
        [Route("api/Ticket/UpdateTicketPrediction")]
        public System.Web.Mvc.JsonResult UpdateTicketPrediction([FromBody] TicketModel objTickets)
        {
            HttpContext.Current = null;
            var ticketpredictBl = new TicketPredictionBl();
            try
            {
               return ticketpredictBl.UpdateTicketPrediction(objTickets);
            }
            catch (Exception ex)
            {
                exceptionobj.Data = ex.Message;
                return exceptionobj;
            }
        }
        #endregion

        /// <summary>
        /// To delete tickets
        /// </summary>
        /// <returns></returns>
        #region "Update Accepted or Rejected Ticket Details"
        [HttpPost]
        [Route("api/Ticket/DeleteTicketPrediction")]
        public void DeleteTickets()
        {
            HttpContext.Current = null;
            var ticketpredictBl = new TicketPredictionBl();
            try
            {
                 ticketpredictBl.DeleteTickets();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        /// <summary>
        /// get Tickets date Range
        /// </summary>
        /// <returns>date Range</returns>
        [HttpGet]
        [Route("api/Ticket/GetDateRange")]
        public string GetTicketDateRange()
        {
            HttpContext.Current = null;
            var ticketpredictBl = new TicketPredictionBl();
            try
            {
                return ticketpredictBl.GetTicketDateRange();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        /// <summary>
        /// Authorization Check
        /// </summary>
        /// <returns>true/false</returns>
        [HttpGet]
        [Route("api/Ticket/GetAuthorize/{username}/{password}")]
        public string GetAuthorize(string username, string password)
        {
            HttpContext.Current = null;
            byte[] currentPassword = Common.FromHex(password);
            password = Encoding.ASCII.GetString(currentPassword);

            var ticketpredictBl = new TicketPredictionBl();
            try
            {
                return ticketpredictBl.GetAuthorize(username, password);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }      
    }

}