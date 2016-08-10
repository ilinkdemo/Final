using System;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Collections.Generic;
using System.Data.SqlClient;
using RESTTicketService.Models;

namespace RESTTicketService.DataAccess
{
    public class TicketPredictionDL
    {
        string _strTicketConn = ConfigurationManager.ConnectionStrings["TicketDB"].ToString();

        /// <summary>
        /// Get Ticket Details
        /// </summary>
        /// <returns></returns>
        public DataTable GetTicketDetails()
        {
            var dtTickets = new DataTable();
            SqlConnection conn = new SqlConnection(_strTicketConn);
            try
            {
                conn.Open();
                var cmd = new SqlCommand
                {
                    CommandType = CommandType.StoredProcedure,
                    CommandText = "usp_get_BeforePredict",
                    Connection = conn
                };
                var daTickets = new SqlDataAdapter(cmd);
                daTickets.Fill(dtTickets);
            }
            catch (Exception ex)
            {
                //_exceptionHandling.OnException(ex);
                throw ex.InnerException;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
            return dtTickets;
        }
        /// <summary>
        /// Get Resolved Ticket Details
        /// </summary>
        /// <returns></returns>
        public DataTable GetResolvedTickets(int IsOpenOrResolved)
        {
            var dtTickets = new DataTable();
            SqlConnection conn = new SqlConnection(_strTicketConn);
            try
            {
                conn.Open();
                var cmd = new SqlCommand
                {
                    CommandType = CommandType.StoredProcedure,
                    CommandText = "usp_get_ResolvedTickets"
                };
                cmd.Parameters.AddWithValue("@IsOpenOrResolved", IsOpenOrResolved);
                cmd.Connection = conn;
                var daTickets = new SqlDataAdapter(cmd);
                daTickets.Fill(dtTickets);
            }
            catch (Exception ex)
            {
                //_exceptionHandling.OnException(ex);
                throw ex.InnerException;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
            return dtTickets;
        }

        /// <summary>
        /// Get GetNLPTicketsbatch Details
        /// </summary>
        /// <returns></returns>
        public DataTable GetNLPTicketsbatch(TicketModel objTicketModel)
        {
            var dtTickets = new DataTable();
            try
            {
                foreach (var tktnumber in objTicketModel.TicketNumber)
                {
                    using (SqlConnection conn = new SqlConnection(_strTicketConn))
                    {
                        var tktnumber1 = tktnumber.Replace('"', '\'');
                        conn.Open();
                        var cmd = new SqlCommand
                        {
                            CommandType = CommandType.StoredProcedure,
                            CommandText = "usp_get_runPredictTicket"
                        };
                        cmd.Parameters.AddWithValue("@TicketFlag", objTicketModel.TicketFlag);
                        cmd.Parameters.AddWithValue("@TicketNumber", tktnumber1);
                        cmd.Connection = conn;
                        var daTickets = new SqlDataAdapter(cmd);
                        daTickets.Fill(dtTickets);
                        conn.Close();
                    }
                }

            }
            catch (Exception ex)
            {
                //_exceptionHandling.OnException(ex);
                throw ex; ;
            }
            finally
            {
                //conn.Close();
                //conn.Dispose();
            }
            return dtTickets;
        }
        /// <summary>
        /// Get GetNLPTickets Details
        /// </summary>
        /// <returns></returns>
        public DataTable GetNLPTickets(List<TicketModel> objTicketModel)
        {
            var dtTickets = new DataTable();
            try
            {
                foreach (var tkt in objTicketModel)
                {
                    using (SqlConnection conn = new SqlConnection(_strTicketConn))
                    {
                        conn.Open();
                        var cmd = new SqlCommand
                        {
                            CommandType = CommandType.StoredProcedure,
                            CommandText = "usp_get_runPredictTicket"
                        };
                        cmd.Parameters.AddWithValue("@TicketNumber", tkt.TicketNumberNlp);
                        cmd.Parameters.AddWithValue("@ConfidenceLevel", tkt.ConfidenceLevel);
                        cmd.Parameters.AddWithValue("@ResolutionType", tkt.ResolutionType);
                        cmd.Parameters.AddWithValue("@Resolution", tkt.Resolution);
                        cmd.Parameters.AddWithValue("@KeySignals", tkt.KeySignals);
                        cmd.Connection = conn;
                        var daTickets = new SqlDataAdapter(cmd);
                        daTickets.Fill(dtTickets);
                        conn.Close();
                    }
                }

            }
            catch (Exception ex)
            {
                //_exceptionHandling.OnException(ex);
                throw ex;
            }
            finally
            {
                //conn.Close();
                //conn.Dispose();
            }
            return dtTickets;
        }

        /// <summary>
        /// Insert Details from excel
        /// </summary>
        /// <returns></returns>
        public DataTable InsertTicketDetails(List<TicketInsertDataModel> objTicketModel)
        {
            var dtTickets = new DataTable();
            try
            {
                foreach (var tkt in objTicketModel)
                {
                    using (SqlConnection conn = new SqlConnection(_strTicketConn))
                    {
                        conn.Open();
                        var cmd = new SqlCommand
                        {
                            CommandType = CommandType.StoredProcedure,
                            CommandText = "usp_set_InsertTickets"
                        };
                        cmd.Parameters.AddWithValue("@TicketNumber", tkt.TicketNumber);
                        cmd.Parameters.AddWithValue("@TicketStatus", tkt.TicketStatus);
                        cmd.Parameters.AddWithValue("@Severity", tkt.Severity);
                        cmd.Parameters.AddWithValue("@CreateDate", tkt.CreateDate);
                        cmd.Parameters.AddWithValue("@ProblemDetail", tkt.ProblemDetail);
                        cmd.Parameters.AddWithValue("@ProblemCategory", tkt.ProblemCategory);
                        cmd.Parameters.AddWithValue("@ProblemSubCategory", tkt.ProblemSubCategory);
                        cmd.Parameters.AddWithValue("@Region", tkt.Region);
                        cmd.Parameters.AddWithValue("@CustAffect", tkt.CustAffect);
                        cmd.Parameters.AddWithValue("@EquipmentId", tkt.EquipmentId);
                        cmd.Parameters.AddWithValue("@OpsDistrict", tkt.OpsDistrict);
                        cmd.Parameters.AddWithValue("@ShortDescription", tkt.ShortDescription);
                        cmd.Parameters.AddWithValue("@AssignedTo", tkt.AssignedTo);
                        cmd.Parameters.AddWithValue("@AssignedDiSubDept", tkt.AssignedDiSubDept);
                        cmd.Parameters.AddWithValue("@SubmittedBy", tkt.SubmittedBy);
                        cmd.Parameters.AddWithValue("@ClobFieldValue", tkt.ClobFieldValue);

                        cmd.Connection = conn;
                        cmd.ExecuteNonQuery();
                        conn.Close();
                    }
                }
                dtTickets = GetStagingTickets();

            }
            catch (Exception ex)
            {
                //_exceptionHandling.OnException(ex);
                throw ex;
            }        
            return dtTickets;
        }

        public DataTable GetStagingTickets()
        {
            var dtTicketstage = new DataTable();
            SqlConnection connstage = new SqlConnection(_strTicketConn);
            try
            {
                connstage.Open();
                var cmdstage = new SqlCommand("usp_get_Tickets", connstage)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmdstage.ExecuteNonQuery();
                var daTicketstage = new SqlDataAdapter(cmdstage);
                daTicketstage.Fill(dtTicketstage);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                connstage.Close();
                connstage.Dispose();
            }
            return dtTicketstage;
        }

        /// <summary>
        /// To Update the Accepted or Rejected tickets
        /// </summary>
        /// <returns></returns>
        public DataTable UpdateTicketPrediction(TicketModel objTicketModel)
        {
            var dtTickets = new DataTable();
            SqlConnection conn = new SqlConnection(_strTicketConn);
            try
            {
                string tktnumbers = string.Join(",", objTicketModel.TicketNumberSelected.Select(x => string.Format("{0}", x)).ToList());

                conn.Open();
                var cmd = new SqlCommand("usp_set_UpdateTicketPrediction", conn)
                {
                    CommandType = CommandType.StoredProcedure
                };

                cmd.Parameters.AddWithValue("@IsAcceptOrReject", objTicketModel.IsAcceptOrReject);
                cmd.Parameters.AddWithValue("@Tickets", tktnumbers);
                var daTickets = new SqlDataAdapter(cmd);
                daTickets.Fill(dtTickets);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
            return dtTickets;
        }
        /// <summary>
        /// To delete tickets
        /// </summary>
        /// <returns></returns>
        public void DeleteTickets()
        {
            SqlConnection conn = new SqlConnection(_strTicketConn);
            try
            {
                conn.Open();
                var cmd = new SqlCommand("usp_set_deleteTicketPrediction", conn)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
        }

        /// <summary>
        /// get Tickets date Range
        /// </summary>
        /// <returns>date Range</returns>
        public string GetTicketDateRange()
        {
            SqlConnection conn = new SqlConnection(_strTicketConn);
            string daterange = "";
            try
            {
                conn.Open();
                var cmd = new SqlCommand("usp_get_TicketsDateRange", conn)
                {
                    CommandType = CommandType.StoredProcedure
                };
                daterange = Convert.ToString(cmd.ExecuteScalar());
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
            return daterange;
        }

        /// <summary>
        /// Authorization Check
        /// </summary>
        /// <returns>true/false</returns>
        public string GetAuthorize(string username, string password)
        {
            SqlConnection conn = new SqlConnection(_strTicketConn);
            string authorize = "";
            try
            {
                conn.Open();
                var cmd = new SqlCommand("usp_get_LoginAuth", conn)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.AddWithValue("@UserName", username);
                cmd.Parameters.AddWithValue("@Password", password);
                authorize = Convert.ToString(cmd.ExecuteScalar());
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conn.Close();
                conn.Dispose();
            }
            return authorize;
        }
        
    }
}