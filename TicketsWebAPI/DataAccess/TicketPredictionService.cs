using System;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Collections.Generic;
using System.Web;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using RESTTicketService.Models;
using Newtonsoft.Json.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace RESTTicketService.DataAccess
{
    public class TicketPredictionService
    {
        /// <summary>
        /// Get GetNLPTicketsFind Details
        /// </summary>
        /// <returns></returns>
        public async Task<JsonResult> GetNLPTicketsFind(List<TicketRequestModel> objTicketModel)
        {
            var jsonResult = new System.Web.Mvc.JsonResult();
            try
            {
                jsonResult = await InvokeRequestResponseService(objTicketModel).ConfigureAwait(false);

            }
            catch (Exception ex)
            {
                throw ex.InnerException;
            }
            finally
            {

            }
            return jsonResult;

        }

        public static async Task<JsonResult> InvokeRequestResponseService(List<TicketRequestModel> objTicketModel)
        {

            TicketRequestModel[] tktArray = objTicketModel.ToArray();

            string[] cnames = { "TICKET_NUMBER", "SEVERITY", "CUST_AFFECT", "EQUIPMENT_ID", "OPS_DISTRICT", "SHORT_DESCRIPTION", "PROBLEM_CATEGORY", "PROBLEM_SUBCATEGORY", "PROBLEM_DETAIL", "ASSIGNED_TO", "ASSIGNED_DISTRICT_SUB_DEPT", "SUBMITTED_BY", "CLOB_FIELD_VALUE" };

            string[,] values = new string[tktArray.Length, 13];

            int count = 0;
            foreach (var tkt in objTicketModel)
            {
                values[count, 0] = tkt.TicketNumbers;
                values[count, 1] = tkt.Severity;
                values[count, 2] = tkt.CustAffect;
                values[count, 3] = tkt.EquipmentId;
                values[count, 4] = tkt.OpsDistrict;
                values[count, 5] = tkt.ShortDescription;
                values[count, 6] = tkt.ProblemCategory;
                values[count, 7] = tkt.ProblemSubCategory;
                values[count, 8] = tkt.ProblemDetail;
                values[count, 9] = tkt.AssignedTo;
                values[count, 10] = tkt.AssignedDiSubDept;
                values[count, 11] = tkt.SubmittedBy;
                values[count, 12] = tkt.ClobFieldValue;
                count++;
            }


            var jsonResult = new System.Web.Mvc.JsonResult();
            try
            {
                using (var client = new HttpClient())
                {
                    var scoreRequest = new
                     {
                         Inputs = new Dictionary<string, TicketParamModel>() { 
                        { 
                            "websvc_input", 
                            new TicketParamModel() 
                            {
                                ColumnNames = cnames,
                                Values = values
                            }
                        },
                     },
                         GlobalParameters = new Dictionary<string, string>()
                         {
                         }
                     };
                    string apiKey = ConfigurationManager.AppSettings["apikey"]; // Replace this with the API key for the web service
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
                    client.BaseAddress = new Uri(ConfigurationManager.AppSettings["azuremlbaseaddress"]);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.PostAsJsonAsync("", scoreRequest).ConfigureAwait(false);
                    if (response.IsSuccessStatusCode)
                    {
                        string result = await response.Content.ReadAsStringAsync();
                        JObject json = JObject.Parse(result);
                        jsonResult.Data = json;
                    }
                    else
                    {
                        string msg = response.StatusCode.ToString();
                        jsonResult.Data = "Failed";
                        throw new Exception("The request failed with status code: {0}" + msg);
                    }
                }
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
            }
            return jsonResult;
        }

    }
}