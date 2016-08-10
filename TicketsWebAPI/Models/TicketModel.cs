using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RESTTicketService.Models
{
    public class TicketModel
    {
        public int TicketFlag;
        public List<string> TicketNumber;
        public int IsAcceptOrReject;
        public List<string> TicketNumberSelected;   
   
        public string TicketNumberNlp { get; set; }
        public decimal ConfidenceLevel { get; set; }
        public string ResolutionType { get; set; }
        public string Resolution { get; set; }
        public string KeySignals { get; set; }

        public List<TicketRequestModel> GetTicketInputs { get; set; }
    }
}