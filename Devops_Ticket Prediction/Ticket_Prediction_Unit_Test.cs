using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Interactions;

namespace Devops_Ticket_Prediction
{
    [TestClass]
    public class Ticket_Prediction_Unit_Test
    {
        [TestMethod]
        [TestCategory("Ticket Prediction Open URL")]
        public void Open_the_Site()
        {
            Global.SetUpDriver();
            Global.Driver.Navigate().GoToUrl("https://frameworkstore.ilink-systems.com/TicketsWeb/App/index.html#/ticket");
            Global.Driver.Manage().Window.Maximize();

            Extentions.WaitForPageLoad(60);
        }
        [TestMethod]
        [TestCategory("Ticket Prediction Login")]
        public void Login_Application()
        {

            Global.Driver.FindElement(By.XPath("//input[@name='email']")).SendKeys("admin@ilink-systems.com");
            Global.Driver.FindElement(By.XPath("//input[@name='password']")).SendKeys("Enter321");
            System.Threading.Thread.Sleep(5000);
            By by = By.XPath("//button[@class='btn btn-success']");
            Extentions.ClickOnGivenLocators(by);
        }
        [TestMethod]
        [TestCategory("Simulate Tickets")]
        public void Simulate_Tickets()
        {
            Global.Driver.FindElement(By.XPath("//button[text()='Simulate Tickets']")).Click();
            System.Threading.Thread.Sleep(5000);
            int ticketCount = Global.Driver.FindElements(By.XPath("//td[1]/span")).Count;
            Extentions.WaitForPageLoad(120);
            Console.WriteLine(ticketCount);
            Assert.AreEqual(50, ticketCount);
          
        }
        [TestMethod]
        [TestCategory("Run NLP Process")]
        public void Run_NLP_Process()
        {
            By by = By.XPath("//button[text()='Run NLP Analytics']");
            Extentions.ClickOnGivenLocators(by);
            Extentions.WaitForElementNotExists(By.XPath(".//*[@id='predictionDiv']"));
            Extentions.WaitForElementVisible(By.XPath("//h1[text()=' Prediction  successfully']"), 3000);
            //Global.Driver.Quit();
        }
        [TestMethod]
        [TestCategory("Choose Confidence Level")]

        public void ChooseTheConfidenceLevel()
        {
            var E1 = Global.Driver.FindElement(By.XPath("//div[@class='ngrs-handle ngrs-handle-min']"));
            var Target = Global.Driver.FindElement(By.XPath("//div[@class='ngrs-handle ngrs-handle-max']"));
            Actions ac = new Actions(Global.Driver);
            ac.DragAndDrop(E1, Target);
            ac.Build().Perform();
            System.Threading.Thread.Sleep(8000);
        }
        [TestMethod]
        [TestCategory("Accept Ticket")]

        public void Accept()
        {
            By by = By.XPath("//button[text()='Accept']");
            Extentions.ClickOnGivenLocators(by);
            System.Threading.Thread.Sleep(3000);
        }
        [TestMethod]
        [TestCategory("Resolved Ticket")]
       
        public void Resolved()
        {
            By by = By.XPath("//span[text()='Resolved Tickets']");
            Extentions.ClickOnGivenLocators(by);
            System.Threading.Thread.Sleep(3000);
        }
        [TestMethod]
        [TestCategory("Reset Demo")]
        public void Reset_Demo()
        {
            By by = By.XPath("//button[text()='Reset Demo']");
            Extentions.ClickOnGivenLocators(by);
            System.Threading.Thread.Sleep(3000);
            Global.Driver.Quit();
        }
    }
}
