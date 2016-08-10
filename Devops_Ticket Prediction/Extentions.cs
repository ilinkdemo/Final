using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Linq;

namespace Devops_Ticket_Prediction
{
    public class Extentions
    {
        public static void WaitForPageLoad(double maxWaitTimeInSeconds)
        {
            string state = string.Empty;
            try
            {
                WebDriverWait wait = new WebDriverWait(Global.Driver, TimeSpan.FromSeconds(maxWaitTimeInSeconds));

                //Checks every 500 ms whether predicate returns true if returns exit otherwise keep trying till it returns ture
                wait.Until(drv =>
                {

                    try
                    {
                        state = ((IJavaScriptExecutor)Global.Driver).ExecuteScript(@"return document.readyState").ToString();
                    }
                    catch (InvalidOperationException)
                    {
                        //Ignore
                    }
                    catch (NoSuchWindowException)
                    {
                        //when popup is closed, switch to last windows
                        Global.Driver.SwitchTo().Window(Global.Driver.WindowHandles.Last());
                    }
                    //In IE7 there are chances we may get state as loaded instead of complete
                    return (state.Equals("complete", StringComparison.InvariantCultureIgnoreCase) || state.Equals("loaded", StringComparison.InvariantCultureIgnoreCase));

                });
            }
            catch (TimeoutException)
            {
                //sometimes Page remains in Interactive mode and never becomes Complete, then we can still try to access the controls
                if (!state.Equals("interactive", StringComparison.InvariantCultureIgnoreCase))
                    throw;
            }
            catch (NullReferenceException)
            {
                //sometimes Page remains in Interactive mode and never becomes Complete, then we can still try to access the controls
                if (!state.Equals("interactive", StringComparison.InvariantCultureIgnoreCase))
                    throw;
            }
            catch (WebDriverException)
            {
                if (Global.Driver.WindowHandles.Count == 1)
                {
                    Global.Driver.SwitchTo().Window(Global.Driver.WindowHandles[0]);
                }
                state = ((IJavaScriptExecutor)Global.Driver).ExecuteScript(@"return document.readyState").ToString();
                if (!(state.Equals("complete", StringComparison.InvariantCultureIgnoreCase) || state.Equals("loaded", StringComparison.InvariantCultureIgnoreCase)))
                    throw;
            }
        }


     
        public static Boolean ExistsElement(By by)
        {

            try
            {
                Global.Driver.FindElement(by);
                Global.Driver.Manage().Timeouts().ImplicitlyWait(Global.Timeout);
                return true;
            }
            catch (NoSuchElementException)
            {
                Global.Driver.Manage().Timeouts().ImplicitlyWait(Global.Timeout);
                return false;
            }
        }

        public static void ClickOnGivenLocators(By by)
        {
            try
            {
                if (IsElementVisible(by))
                    Global.Driver.FindElement(by).Click();
                else
                    Assert.Fail("Unable to click on requested element on the given path!");
            }
            catch (NoSuchElementException)
            {
                throw new NoSuchElementException("Unable to find element in the expected path!");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool IsElementVisible(By by)
        {
            try
            {
                WaitForElementVisible(by, 30000);
                return Global.Driver.FindElement(by).Displayed;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static bool IsElementEnable(By by)
        {
            try
            {
                WaitForElementVisible(by, 30000);
                return Global.Driver.FindElement(by).Enabled;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static void WaitForElementVisible(By by, double maxWaitTimeInMilliseconds)
        {
            Global.Driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromMilliseconds(maxWaitTimeInMilliseconds));
            WebDriverWait wait = new WebDriverWait(Global.Driver, TimeSpan.FromMilliseconds(maxWaitTimeInMilliseconds));
            try
            {
                wait.Until(ExpectedConditions.ElementIsVisible(by));
                //wait.Until(drv => (drv.FindElement(by).Displayed));
            }
            catch (StaleElementReferenceException)
            {
                throw new StaleElementReferenceException("Unable to retrieve attribute for the given element locator!");
            }
            catch (NoSuchElementException)
            {
                throw new NoSuchElementException("Unable to locate element for the given locator!");
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                //Global.Driver.Manage().Timeouts().ImplicitlyWait(Global.Timeout);
            }
        }

        public static void SelectValueInDropDown(string selectItem, By selectName)
        {
            IWebElement selectElement = Global.Driver.FindElement(selectName);
            SelectElement select = new SelectElement(selectElement);
            select.SelectByText(selectItem);

        }

        public static void TypeText(string inputTxT, By by)
        {
            Global.Driver.FindElement(by).Clear();
            Global.Driver.FindElement(by).SendKeys(inputTxT);
        }

        public static void WaitForElementNotExists(By by)
        {
            Global.Driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromMilliseconds(500));
            int tries = 0;
            //wait for 60 seconds
            while (tries < 60)
            {
                System.Threading.Thread.Sleep(1000);
                if (Extentions.ExistsElement(by))
                {
                    tries++;
                }
                else
                    break;
            }
            Global.Driver.Manage().Timeouts().ImplicitlyWait(Global.Timeout);
        }

    


    }
}
