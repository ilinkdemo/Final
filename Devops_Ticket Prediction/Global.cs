using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devops_Ticket_Prediction
{
    public static class Global
    {
        public static IWebDriver Driver;
        public static TimeSpan Timeout = TimeSpan.FromMilliseconds(30000); // 5 Minutes
        public static void SetUpDriver()
        {
           Driver= new ChromeDriver();

        }
    }
}
