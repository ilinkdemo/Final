using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RESTTicketService.Models
{
    public class TicketParamModel
    {
        public string[] ColumnNames { get; set; }
        public string[,] Values { get; set; }
    }
}