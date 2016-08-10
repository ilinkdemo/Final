Feature: SpecFlowFeature1
	In order to avoid silly mistakes
	As a math idiot
	I want to be told the sum of two numbers

@Simulate_Tickets
Scenario: Ticket Prediction Login
	Given I have browser the "https://frameworkstore.ilink-systems.com/TicketsWeb/App/index.html#/ticket" url
	And I Type the "admin@ilink-systems.com" in Username field
	And I Type the "Enter321" in Password field
	And I Click on the Login button                                                                           
	Then I Click on the "Simulate Tickets" in Home page
	And I verify the Simulate ticket count
	
@Run_NLP_Process_Tickets
Scenario: Azure Run NLP Process
Given I have browser the "https://frameworkstore.ilink-systems.com/TicketsWeb/App/index.html#/ticket" url
	And I Type the "admin@ilink-systems.com" in Username field
	And I Type the "Enter321" in Password field
	And I Click on the Login button 
	Then I Click on the "Simulate Tickets" in Home page
	Then I Click on the "Run NLP Analytics"
	And I verify the " Prediction  successfully" alert
	And I Choose the Confidence level
	And I Click on the "Accept" Tickets
	And I Click on the "Resolved Tickets" After accept Tickets
	And I Click on the "Reset Demo" button