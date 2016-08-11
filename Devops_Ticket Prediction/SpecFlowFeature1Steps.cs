using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using TechTalk.SpecFlow;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Interactions;

namespace Devops_Ticket_Prediction
{
    [Binding]
    public class ticket
    {
        [TestMethod]
        [Given(@"I have browser the ""(.*)"" url")]
        public void GivenIHaveBrowserTheUrl(string url)
        {
            Global.SetUpDriver();
            Global.Driver.Navigate().GoToUrl(url);
            Global.Driver.Manage().Window.Maximize();

            Extentions.WaitForPageLoad(60);
        }
        [Given(@"I Type the ""(.*)"" in Username field")]
        public void GivenITypeTheInUsernameField(string Username)
        {
            Global.Driver.FindElement(By.XPath("//input[@name='email']")).SendKeys(Username);
        }
        [Given(@"I Type the ""(.*)"" in Password field")]
        public void GivenITypeTheInPasswordField(string password)
        {
            Global.Driver.FindElement(By.XPath("//input[@name='password']")).SendKeys(password);
            System.Threading.Thread.Sleep(5000);
        }

        [Given(@"I Click on the Login button")]
        public void GivenIClickOnTheLoginButton()
        {
            By by = By.XPath("//button[@class='btn btn-success']");
            Extentions.ClickOnGivenLocators(by);
        }

        [Then(@"I Click on the ""(.*)"" in Home page")]
        public void ThenIClickOnTheInHomePage(string Simulate)
        {
            Global.Driver.FindElement(By.XPath("//button[text()='"+Simulate+"']")).Click();
            System.Threading.Thread.Sleep(5000);
        }
        [Then(@"I verify the Simulate ticket count")]
        public void ThenIVerifyTheSimulateTicketCount()
        {
            int ticketCount = Global.Driver.FindElements(By.XPath("//td[1]/span")).Count;
            Extentions.WaitForPageLoad(120);
            Console.WriteLine(ticketCount);
            Assert.AreEqual(50,ticketCount);
            Global.Driver.Quit();
           
        }
        [Then(@"I Click on the ""(.*)""")]
        public void ThenIClickOnThe(string Predictionticket)
        {
            By by = By.XPath("//button[text()='" + Predictionticket + "']");
            Extentions.ClickOnGivenLocators(by);

        }
        [Then(@"I verify the ""(.*)"" alert")]
        public void ThenIVerifyTheAlert(string sucess)
        {
            Extentions.WaitForElementNotExists(By.XPath(".//*[@id='predictionDiv']"));
            Extentions.WaitForElementVisible(By.XPath("//h1[text()='" + sucess + "']"),3000);
            //Global.Driver.Quit();
        }
        [Then(@"I Choose the Confidence level")]
        public void ThenIChooseTheConfidenceLevel()
        {
           var E1 = Global.Driver.FindElement(By.XPath("//div[@class='ngrs-handle ngrs-handle-min']"));
            var Target = Global.Driver.FindElement(By.XPath("//div[@class='ngrs-handle ngrs-handle-max']"));
            Actions ac = new Actions(Global.Driver);
            ac.DragAndDrop(E1, Target);
            ac.Build().Perform();
            System.Threading.Thread.Sleep(8000);
        }
        [Then(@"I Click on the ""(.*)"" Tickets")]
        public void ThenIClickOnTheTickets(string Accepeted)
        {
            By by = By.XPath("//button[text()='" +Accepeted+ "']");
            Extentions.ClickOnGivenLocators(by);
            System.Threading.Thread.Sleep(3000);

        }
        [Then(@"I Click on the ""(.*)"" After accept Tickets")]
        public void ThenIClickOnTheAfterAcceptTickets(string Resolve)
        {
            By by = By.XPath("//span[text()='"+Resolve+"']");
            Extentions.ClickOnGivenLocators(by);
            System.Threading.Thread.Sleep(3000);
        }
        [Then(@"I Click on the ""(.*)"" button")]
        public void ThenIClickOnTheButton(string Reset)
        {
            By by = By.XPath("//button[text()='"+Reset+"']");
            Extentions.ClickOnGivenLocators(by);
            System.Threading.Thread.Sleep(3000);
            Global.Driver.Quit();
        }

    }
}