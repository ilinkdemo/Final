using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RESTTicketService.Models
{
    public class TicketRequestModel
    {
        public string TicketNumbers { get; set; }
        public string Severity { get; set; }
        public string CustAffect { get; set; }
        public string EquipmentId { get; set; }
        public string OpsDistrict { get; set; }
        public string ShortDescription { get; set; }
        public string ProblemCategory { get; set; }
        public string ProblemSubCategory { get; set; }
        public string ProblemDetail { get; set; }
        public string AssignedTo { get; set; }
        public string SubmittedBy { get; set; }
        public string AssignedDiSubDept { get; set; }
        public string ClobFieldValue { get; set; }
    }
}