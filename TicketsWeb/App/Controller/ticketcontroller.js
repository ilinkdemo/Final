// --------------------------------------------------------------------------------------------------------------------
// <summary>
//   Desc: Controller to listout all the Ticket list
//   Author: Syed
// </summary>
// --------------------------------------------------------------------------------------------------------------------
ticketApp.controller('ticketController',
    ['$scope', '$rootScope', '$http', '$timeout', '$filter', '$window', '$location', 'ticketservice', 'htmlConstants',
function ($scope, $rootScope, $http, $timeout, $filter, $window,$location, ticketservice, htmlConstants) {
             var ticketListPredicted = [], ticketmodeltolocal = [], dataEmptyArray = { "Data": { "Items": [], "Total": 0 } };
            $scope.htmlConstants = htmlConstants;
            $scope.filteredtktListData = [];
            $scope.predictcount = 0;
            $scope.clickin = true;
            $scope.hideLabel = false;
            //Initial values
            var randomTicketList = [];
            $scope.loaderMessage = "Loading...";
            $scope.hideButtons = false;//to hide two buttons when NLP click
            $scope.showTktDet = null;//to show grid when Generate click
            $scope.showNLP = true;//to disable NLP Button when Generate click
            $scope.showGenerate = false;//to disable Generate Button when Generate click
            $scope.showNLPRow = false;//to show Three columns when NLP click
            $scope.showInprogress = false;
            $scope.showprogComplete = false;
            $scope.showprogCompleteFin = false;
            $scope.showPredictMsg = false;
            $scope.showFinish = false;
            $scope.showDemo = false;
            $scope.showResolvedDet = null;
            $scope.showHeader = true;
            $scope.showFilter = false;
            $scope.showResFilter = false;
            $scope.showFrame = false;
            $scope.activateResolved = false, $scope.disUpload = false;;
            $scope.showiFrameBtn = false, $scope.showUpload = true;
            $scope.sliderValue =
               {
                   min: 80,
                   max: 100
               }
            $scope.orderByField = '';
            $scope.reverseSort = false;

           

            /// <summary>            
            /// to maintain session for login user
            /// </summary>
            $scope.init = function () {
                var userEmail = localStorage.getItem("email");
                if (userEmail !== null && userEmail !== undefined && userEmail !== '') {
                    $scope.username = userEmail.substring(0, userEmail.lastIndexOf("@"));

                }
                else {
                    $scope.username = '';
                    $location.path('/login');
                }
                /*if ($window.sessionStorage["userInfo"]) {
                    userInfo = JSON.parse($window.sessionStorage["userInfo"]);
                }
                else
                {
                    $location.path('/login');
                }*/
            }
            $scope.init();

            /*if (userInfo !== null) {
                var loginEmail = userInfo.Email;
                $scope.username = loginEmail.substring(0, loginEmail.lastIndexOf("@"));
            }
            else
            {
                $scope.username = '';
            }*/
            /// <summary>            
            /// to get before predict tickets
            /// </summary>
            $scope.generateticket = function () {
                $('#progressoverlay').show();
                $('#noActive').hide();
                $('#noResolved').hide();
                $('#resTab').removeClass('active');
                $('#repTab').removeClass('active');
                $('#actTab').addClass('active');
                $scope.showFrame = false;
                if (!$scope.showFilter)
                {
                    $('#progressoverlay').fadeIn('fast', function () {
                        $('#progressbox').animate({ 'top': '275px' }, 500);
                        $scope.ticketListData = [];
                        $scope.loaderMessage = "Fetching sample tickets...";
                        ticketservice.GetTicketDetails().then(function (ticketList) {
                            if (JSON.stringify(ticketList.Data.Items) !== "[]") {
                                if (ticketList.Data.Items.length > 0) {
                                    $scope.ticketListData = ticketList.Data.Items;
                                    randomTicketList = $scope.ticketListData;
                                    $scope.filteredtktListData = $scope.ticketListData;
                                    
                                    $scope.showTktDet = true;
                                    $scope.showFilter = false;
                                    $scope.showGenerate = true;
                                    $scope.showNLP = false;
                                    $scope.getDate();
                                }
                                else {
                                    $scope.openTicket = "0";
                                    $scope.ticketListData = [];
                                    $scope.showTktDet = false;
                                    $scope.showGenerate = false;
                                    $scope.showNLP = true;
                                }
                            }
                            else {
                                $scope.ticketListData = [];
                                $scope.showTktDet = false;
                                $scope.showGenerate = false;
                                $scope.showNLP = true;
                            }
                        });
                    });
                }
                $('#progressoverlay').hide();
              
            };
            /// <summary>            
            /// To get the Open tickets date 
            /// </summary>
            $scope.getDate = function () {
                ticketservice.GetDateRange().then(function (datediff) {
                    $scope.dateRange = datediff;
                   
                        $('#progressbox').animate({ 'top': '100%' }, function () {
                            $('#progressoverlay').fadeOut('fast');
                            $('#progressbox').css("top", "-220px");
                        });
                });
            };
            /// <summary>            
            /// To Filter table grid based on the column value
            /// </summary>
            $scope.SEVERITY = '', $scope.PROBLEM_DETAIL = '', $scope.PROBLEM_CATEGORY = '', $scope.PROBLEM_SUBCATEGORY = '', $scope.EQ_REGION = '';

            $scope.filterGrid = function (filterValue, name) {
                $(".filterMenu").css("border", "0px solid #C8CFD4");
                $(".filtericon").parent().css({ "border-top": "0", "border-left": "0", "border-right": "0" });
                //$scope.showFilter = true;
                if (name === "SEVERITY")
                {
                    $scope.SEVERITY = filterValue;
                }
                if (name === "PROBLEM_DETAIL") {
                    $scope.PROBLEM_DETAIL = filterValue;
                }
                if (name === "PROBLEM_CATEGORY") {
                    $scope.PROBLEM_CATEGORY = filterValue;
                }
                if (name === "PROBLEM_SUBCATEGORY") {
                    $scope.PROBLEM_SUBCATEGORY = filterValue;
                }
                if (name === "EQ_REGION") {
                    $scope.EQ_REGION = filterValue;
                }
                if (name === "ClearAll")
                {                
                    $(".filterMenu").css("border", "0px solid #C8CFD4");
                    $(".filtericon").parent().css({"border-top":"0","border-left":"0","border-right":"0"});
                    $('.clearfilter').show(1000);
                    $scope.SEVERITY = '', $scope.PROBLEM_DETAIL = '', $scope.PROBLEM_CATEGORY = '', $scope.PROBLEM_SUBCATEGORY = '', $scope.EQ_REGION = '';
                    $scope.showFilter = false;
                }
                if ($scope.SEVERITY == '' && $scope.PROBLEM_DETAIL == '' && $scope.PROBLEM_CATEGORY == '' && $scope.PROBLEM_SUBCATEGORY == '' && $scope.EQ_REGION == '')
                    $scope.showFilter = false;
                else
                {
                    if( $('#repTab').hasClass('active'))
                        $scope.showFilter = false;
                    else
                        $scope.showFilter = true;
                }
                    
                $scope.ticketListData = $filter('filter')($scope.filteredtktListData, { SEVERITY: $scope.SEVERITY, PROBLEM_DETAIL: $scope.PROBLEM_DETAIL, PROBLEM_CATEGORY: $scope.PROBLEM_CATEGORY, PROBLEM_SUBCATEGORY: $scope.PROBLEM_SUBCATEGORY, EQ_REGION: $scope.EQ_REGION });
                    var filteredData=$scope.ticketListData ;
                    angular.forEach(filteredData, function (value, key) {                                   
                        if($scope.SEVERITY!='')
                            $scope.ticketListData = $filter('filter')($scope.ticketListData, { SEVERITY: $scope.SEVERITY }, true);
                        if ($scope.PROBLEM_DETAIL != '')
                            $scope.ticketListData = $filter('filter')($scope.ticketListData, { PROBLEM_DETAIL: $scope.PROBLEM_DETAIL }, true);
                        if ($scope.PROBLEM_CATEGORY != '')
                            $scope.ticketListData = $filter('filter')($scope.ticketListData, { PROBLEM_CATEGORY: $scope.PROBLEM_CATEGORY }, true);
                        if ($scope.PROBLEM_SUBCATEGORY != '')
                            $scope.ticketListData = $filter('filter')($scope.ticketListData, { PROBLEM_SUBCATEGORY: $scope.PROBLEM_SUBCATEGORY }, true);
                        if ($scope.EQ_REGION != '')
                            $scope.ticketListData = $filter('filter')($scope.ticketListData, { EQ_REGION: $scope.EQ_REGION }, true);
                    });
                    
            };

            /// <summary>                                               
            /// to sort resolved table grid based on the column value
            /// </summary>
            $scope.RESSEVERITY = '', $scope.RESPROBLEM_DETAIL = '', $scope.RESPROBLEM_CATEGORY = '', $scope.RESPROBLEM_SUBCATEGORY = '', $scope.RESEQ_REGION = '';
            $scope.filterResolveGrid = function (filterValue, name) {
                $('.filterMenu').css({ "border": "0" });
                $('.activelist').css({ "border-top": "0px", "border-left": "0px", "border-right": "0px", "border-bottom": "2px solid #ddd" });

                //$scope.showResFilter = true;
              
                if (name === "SEVERITY") {
                    $scope.RESSEVERITY = filterValue;
                    $scope.IsFiltered = true;
                }
                if (name === "PROBLEM_DETAIL") {
                    $scope.RESPROBLEM_DETAIL = filterValue;
                    $scope.IsFiltered = true;
                }
                if (name === "PROBLEM_CATEGORY") {
                    $scope.RESPROBLEM_CATEGORY = filterValue;
                    $scope.IsFiltered = true;
                }
                if (name === "PROBLEM_SUBCATEGORY") {
                    $scope.RESPROBLEM_SUBCATEGORY = filterValue;
                    $scope.IsFiltered = true;
                }
                if (name === "EQ_REGION") {
                    $scope.RESEQ_REGION = filterValue;
                    $scope.IsFiltered = true;
                }
                if (name === "ClearAll") {
                    $scope.RESSEVERITY = '', $scope.RESPROBLEM_CATEGORY = '', $scope.RESPROBLEM_SUBCATEGORY = '', $scope.RESEQ_REGION = '', $scope.RESPROBLEM_DETAIL = '';
                    $scope.showResFilter = false;
                    $scope.IsFiltered = false;
                }
                if ($scope.RESSEVERITY == '' && $scope.RESPROBLEM_DETAIL == '' && $scope.RESPROBLEM_CATEGORY == '' && $scope.RESPROBLEM_SUBCATEGORY == '' && $scope.RESEQ_REGION == '')
                    $scope.showResFilter = false;
                else
                {
                    if ($('#repTab').hasClass('active'))
                        $scope.showResFilter = false;
                    else
                        $scope.showResFilter = true;
                }
                   
                $scope.resolvedticketData = $filter('filter')($scope.filteredResListData, { SEVERITY: $scope.RESSEVERITY, PROBLEM_DETAIL: $scope.RESPROBLEM_DETAIL, PROBLEM_CATEGORY: $scope.RESPROBLEM_CATEGORY, PROBLEM_SUBCATEGORY: $scope.RESPROBLEM_SUBCATEGORY, EQ_REGION: $scope.RESEQ_REGION });
                var filteredData = $scope.resolvedticketData;
                angular.forEach(filteredData, function (value, key) {
                    if ($scope.RESSEVERITY != '')
                        $scope.resolvedticketData = $filter('filter')($scope.resolvedticketData, { SEVERITY: $scope.RESSEVERITY }, true);
                    if ($scope.RESPROBLEM_DETAIL != '')
                        $scope.resolvedticketData = $filter('filter')($scope.resolvedticketData, { PROBLEM_DETAIL: $scope.RESPROBLEM_DETAIL }, true);
                    if ($scope.RESPROBLEM_CATEGORY != '')
                        $scope.resolvedticketData = $filter('filter')($scope.resolvedticketData, { PROBLEM_CATEGORY: $scope.RESPROBLEM_CATEGORY }, true);
                    if ($scope.RESPROBLEM_SUBCATEGORY != '')
                        $scope.resolvedticketData = $filter('filter')($scope.resolvedticketData, { PROBLEM_SUBCATEGORY: $scope.RESPROBLEM_SUBCATEGORY }, true);
                    if ($scope.RESEQ_REGION != '')
                        $scope.resolvedticketData = $filter('filter')($scope.resolvedticketData, { EQ_REGION: $scope.RESEQ_REGION }, true);
                });

            };

            /// to get resolved tickets
            /// </summary>
            $scope.getResolvedTicket = function (IsOpenOrResolved) {
                $('#progressoverlay').show();
                $('#actTab').addClass('active');
                $('#resTab').removeClass('active');
                $('#repTab').removeClass('active');
                $('#noActive').hide();
                $('#noResolved').hide();
                $scope.showFrame = false;
                    $scope.resolvedticketData = [];
                    $scope.ticketListData = [];
                    
                    ticketservice.GetResolvedTickets(IsOpenOrResolved).then(function (ticketList) {
                        if (JSON.stringify(ticketList.Data.Items) !== "[]") {
                            if (ticketList.Data.Items.length > 0) {
                                if (IsOpenOrResolved === 1) {//1 for Active Ticket
                                    $scope.showHeader = true;
                                    $scope.showTktDet = true;
                                    //if ($scope.showDemo === true) { $scope.showNLP = true; } else { $scope.showNLP = false; }
                                    $scope.showResolvedDet = null;
                                    $scope.ticketListData = ticketList.Data.Items;
                                    $scope.filterGrid('','');
                                    $scope.showResFilter = false;
                                }
                                else// 0 for Resolved Tickets
                                {
                                    $scope.showHeader = false;
                                    $scope.showTktDet = null;
                                    $scope.showNLP = true;
                                    $scope.showResolvedDet = true;
                                    $scope.resolvedticketData = ticketList.Data.Items;
                                    $scope.filteredResListData = $scope.resolvedticketData;
                                    $scope.filterResolveGrid('', '');
                                    //if ($scope.IsFiltered === true) { $scope.showResFilter = true; } else { $scope.showResFilter = false; }
                                }
                            }
                            else {
                                $scope.resolvedticketData = [];
                                $scope.showHeader = false;
                                if (IsOpenOrResolved === 0) {
                                    $scope.showHeader = false;
                                    $scope.showResolvedDet = false;
                                    $scope.showTktDet = null;
                                    $scope.showGenerate = true;
                                    $scope.showNLP = true;
                                }
                                else {
                                    $scope.showHeader = true;
                                    $scope.showTktDet = false;
                                    $scope.showResolvedDet = null;
                                    if ($scope.showDemo === true) { $scope.showGenerate = true; } else { $scope.showGenerate = false; }
                                    $scope.showResFilter = false;
                                }
                            }
                        }
                        else {
                            $scope.resolvedticketData = [];
                            $scope.showHeader = false;
                            if (IsOpenOrResolved === 0) {
                                $scope.showHeader = false;
                                $scope.showResolvedDet = false;
                                $scope.showTktDet = null;
                                $scope.showGenerate = true;
                                $scope.showNLP = true;
                            }
                            else {
                                $scope.showHeader = true;
                                $scope.showTktDet = false;
                                $scope.showResolvedDet = null;
                                if ($scope.showDemo === true) { $scope.showGenerate = true; } else { $scope.showGenerate = false; }
                                $scope.showResFilter = false;
                            }
                        }
                    });
                    if ($scope.showNLP && $scope.showGenerate)
                        $scope.showprogComplete = true;
                    $('#progressoverlay').hide();
            };
            $scope.predictedTicket=[];
            
            // <summary>            
            /// Rum NLP- to get  predicted tickets
            /// </summary>
            $scope.getPredictTicket = function () {
                $('#progressoverlay').show();
                $('#repTab').removeClass('active');
                $('#resTab').removeClass('active');
                $('#actTab').addClass('active');
               
                $scope.showFrame = false;
                    if (randomTicketList.length > 0) {                    
                        $scope.loaderMessage = "Predicting the tickets...";
                        $scope.showGenerate = true;
                            $scope.hideButtons = true;
                            $scope.showUpload = false;
                            $scope.showInprogress = true;
                            $scope.ticketListData = [];
                            $scope.randomTicketNum = [];
                            $scope.fiteredTicket = [];
                            $scope.count = 0;
                            $scope.openTicket = Math.abs(randomTicketList.length);
                            $scope.getPredictTicketList();                                       
                    }                    
                    $('#progressoverlay').hide();
            };
            $scope.getPredictTicketList = function () {

$('#progressoverlay').show();
$('#progressoverlay').fadeIn('fast',function()
{
$('#predictionDiv').animate({ 'top': '275px' }, 500);
$scope.showFilter = false;
$('.filtericon').removeClass('filterselected');
    var ticketmodeltofind = [];
    if (randomTicketList.length > 0) {                   
        for (i = 0; i < randomTicketList.length; i++) {
                ticketmodeltofind.push({
                    TicketNumbers: randomTicketList[i].TICKET_NUMBER,
                    Severity: randomTicketList[i].SEVERITY,
                    CustAffect: randomTicketList[i].CUST_AFFECT,
                    EquipmentId: randomTicketList[i].EQUIPMENT_ID,
                    OpsDistrict: randomTicketList[i].OPS_DISTRICT,
                    ShortDescription: randomTicketList[i].SHORT_DESCRIPTION,
                    ProblemCategory: randomTicketList[i].PROBLEM_CATEGORY,
                    ProblemSubCategory: randomTicketList[i].PROBLEM_SUBCATEGORY,
                    ProblemDetail: randomTicketList[i].PROBLEM_DETAIL,
                    AssignedTo: randomTicketList[i].ASSIGNED_TO,
                    AssignedDiSubDept: randomTicketList[i].ASSIGNED_DISTRICT_SUB_DEPT,
                    SubmittedBy: randomTicketList[i].SUBMITTED_BY,
                    ClobFieldValue: randomTicketList[i].CLOB_FIELD_VALUE

                });
            }
            //$scope.resolution = randomTicketList[$scope.count].RESOLUTION;
            // to get predicted ticket from FIIND 
            ticketservice.GetNLPTicketsFind(ticketmodeltofind).success(function (websvcoutput) {
                if (websvcoutput.Data.Result.Data !== null && websvcoutput.Data.Result.Data !== "Failed") {
                    if (websvcoutput.Data.Result.Data.Results.websvcoutput.value.Values.length > 0) {
                        for (i = 0; i < websvcoutput.Data.Result.Data.Results.websvcoutput.value.Values.length; i++) {
                            //$scope.ConfidenceLevel = Math.floor((Math.random() * 100) + 0);
                            var ConfidenceLevel = websvcoutput.Data.Result.Data.Results.websvcoutput.value.Values[i][1];
                            var _resolutionType = websvcoutput.Data.Result.Data.Results.websvcoutput.value.Values[i][2];
                            var _resolution = websvcoutput.Data.Result.Data.Results.websvcoutput.value.Values[i][3];
                            var _keySignal = websvcoutput.Data.Result.Data.Results.websvcoutput.value.Values[i][4];
                            ConfidenceLevel = Math.round(ConfidenceLevel * 10) / 10;

                            if (_resolution !== null) {
                                $scope.resolution = _resolution;
                            }
                            else { $scope.resolution = '';}

                            if (ConfidenceLevel > 0) {
                                $scope.predictcount++;
                                $scope.RESOLUTION_TYPE = _resolutionType;
                                $scope.CONFIDENCE_LEVEL = ConfidenceLevel;
                                $scope.KeySignal = _keySignal;
                                ticketmodeltolocal.push({
                                    TicketNumberNlp: websvcoutput.Data.Result.Data.Results.websvcoutput.value.Values[i][0],
                                    ConfidenceLevel: ConfidenceLevel,
                                    ResolutionType: _resolutionType,
                                    Resolution: $scope.resolution,
                                    KeySignals: $scope.KeySignal
                                });
                            }
                            $scope.count++;
                        }
                    }                              
                }
                else
                {
                    //alert("Server Response :" + websvcoutput.Data.Result.Data);
                    console.log("Response failed :" + ticketmodeltofind.TicketNumbers);
                }
                            
                $scope.openTicket = Math.abs(randomTicketList.length - $scope.predictcount);
                $scope.predictedTicketCount = $scope.predictcount;
                //$scope.getPredictTicketList();           

                if ($scope.count === randomTicketList.length) {
                    ticketservice.GetNLPTickets(ticketmodeltolocal).success(function (nlpticketList) {
                        if (JSON.stringify(nlpticketList.Data.Items.length) !== "[]") {//NLP Ticktes40
                            if (nlpticketList.Data.Items.length > 0) {
                                for (var i = 0; i < nlpticketList.Data.Items.length; i++) {
                                    var ticketKeySignals = '';
                                    var ticket = $filter('filter')(ticketmodeltolocal, { TicketNumberNlp: nlpticketList.Data.Items[i].TICKET_NUMBER });
                                    if (ticket.length > 0)
                                        ticketKeySignals = ticket[0].KeySignals;

                                    ticketListPredicted.push({
                                        "CONFIDENCE_LEVEL": nlpticketList.Data.Items[i].CONFIDENCE_LEVEL,
                                        "CREATE_DATE": nlpticketList.Data.Items[i].CREATE_DATE,
                                        "EQ_REGION": nlpticketList.Data.Items[i].EQ_REGION,
                                        "PROBLEM_CATEGORY": nlpticketList.Data.Items[i].PROBLEM_CATEGORY,
                                        "PROBLEM_SUBCATEGORY": nlpticketList.Data.Items[i].PROBLEM_SUBCATEGORY,
                                        "RESOLUTION": nlpticketList.Data.Items[i].RESOLUTION,
                                        "RESOLUTION_TYPE": nlpticketList.Data.Items[i].RESOLUTION_TYPE,
                                        "SEVERITY": nlpticketList.Data.Items[i].SEVERITY,
                                        "TICKET_NUMBER": nlpticketList.Data.Items[i].TICKET_NUMBER,
                                        "PROBLEM_DETAIL": nlpticketList.Data.Items[i].PROBLEM_DETAIL,
                                        "SHORT_DESCRIPTION": nlpticketList.Data.Items[i].SHORT_DESCRIPTION,
                                        "CLOB_FIELD_VALUE": nlpticketList.Data.Items[i].CLOB_FIELD_VALUE,
                                        "TICKET_STATUS": nlpticketList.Data.Items[i].TICKET_STATUS,
                                        "CUST_AFFECT": nlpticketList.Data.Items[i].CUST_AFFECT,
                                        "EQUIPMENT_ID": nlpticketList.Data.Items[i].EQUIPMENT_ID,
                                        "OPS_DISTRICT": nlpticketList.Data.Items[i].OPS_DISTRICT,
                                        "ASSIGNED_TO": nlpticketList.Data.Items[i].ASSIGNED_TO,
                                        "ASSIGNED_DISTRICT_SUB_DEPT": nlpticketList.Data.Items[i].ASSIGNED_DISTRICT_SUB_DEPT,
                                        "SUBMITTED_BY": nlpticketList.Data.Items[i].SUBMITTED_BY,
                                        "ISCHECKED": true,
                                        "KEY_SIGNALS": ticketKeySignals
                                    });
                                }
                                $scope.showTktDet = true;
                                $scope.showNLPRow = true;
                                $scope.hideButtons = true;
                                $scope.showInprogress = true;
                                //$scope.showprogComplete = true;

                            }
                            else {
                                $scope.ticketListData = [];
                                $scope.showTktDet = false;
                                $scope.showNLPRow = false;
                                $scope.hideButtons = false;
                                $scope.showInprogress = false;
                                $scope.showprogComplete = false;
                                $scope.showprogCompleteFin = false;
                            }
                        }
                        else {
                            $scope.ticketListData = [];
                            $scope.showTktDet = false;
                            $scope.showNLPRow = false;
                            $scope.hideButtons = false;
                        }

                        //adding non predicted tickets to the grid
                        if (ticketListPredicted.length > 0 && ticketListPredicted.length === $scope.predictcount && randomTicketList.length > 0) {
                            $scope.ticketListData.push(dataEmptyArray);
                            //$scope.openTicket = Math.abs(randomTicketList.length - ticketListPredicted.length);
                            for (var i = 0; i < randomTicketList.length; i++)////Generate Ticktes100
                            {
                                //Check open tickets with predicted ticktes
                                if (ticketListPredicted[i].TICKET_NUMBER !== randomTicketList[i].TICKET_NUMBER) {
                                    ticketListPredicted.push({
                                        "CONFIDENCE_LEVEL": randomTicketList[i].CONFIDENCE_LEVEL,
                                        "CREATE_DATE": randomTicketList[i].CREATE_DATE,
                                        "EQ_REGION": randomTicketList[i].EQ_REGION,
                                        "PROBLEM_CATEGORY": randomTicketList[i].PROBLEM_CATEGORY,
                                        "PROBLEM_SUBCATEGORY": randomTicketList[i].PROBLEM_SUBCATEGORY,
                                        "RESOLUTION": randomTicketList[i].RESOLUTION,
                                        "RESOLUTION_TYPE": randomTicketList[i].RESOLUTION_TYPE,
                                        "SEVERITY": randomTicketList[i].SEVERITY,
                                        "TICKET_NUMBER": randomTicketList[i].TICKET_NUMBER,
                                        "PROBLEM_DETAIL": randomTicketList[i].PROBLEM_DETAIL,
                                        "SHORT_DESCRIPTION": randomTicketList[i].SHORT_DESCRIPTION,
                                        "CLOB_FIELD_VALUE": randomTicketList[i].CLOB_FIELD_VALUE,
                                        "TICKET_STATUS": randomTicketList[i].TICKET_STATUS,
                                        "CUST_AFFECT": randomTicketList[i].CUST_AFFECT,
                                        "EQUIPMENT_ID": randomTicketList[i].EQUIPMENT_ID,
                                        "OPS_DISTRICT": randomTicketList[i].OPS_DISTRICT,
                                        "ASSIGNED_TO": randomTicketList[i].ASSIGNED_TO,
                                        "ASSIGNED_DISTRICT_SUB_DEPT": randomTicketList[i].ASSIGNED_DISTRICT_SUB_DEPT,
                                        "SUBMITTED_BY": randomTicketList[i].SUBMITTED_BY,
                                        "ISCHECKED": false,
                                        "KEY_SIGNALS": ""
                                    });
                                }
                                $scope.ticketListData = ticketListPredicted;
                                $scope.ticketListData.splice(randomTicketList.length, $scope.predictcount);
                                $scope.filteredtktListData = $scope.ticketListData;
                                $scope.showInprogress = true;
                            }      
                        }
                                    
                    });
                    setTimeout(function()
                    {
                        $('#predictionDiv').animate({ 'top': '100%' }, function () {                                        
                            $('#predictionDiv').css("top", "-220px");
                            $scope.showPredictMsg = true;
                            $('#progressComplete').animate({ 'top': '275px' });    
                            setTimeout(function()
                            {
                                $('#progressComplete').animate({ 'top': '100%' },500, function () {
                                                                                           
                                });
                            }, 1000)                                   
                            $('#progressbox').css("top", "-220px");
                            $('#progressComplete').css("top", "-220px");
                        $('#progressoverlay').fadeOut('fast');
                        });
                        $timeout(function () {
                            $scope.showNLP = true;
                            $scope.showprogComplete = true;

                        }, 1000);
                        $timeout(function () {
                            $scope.showprogCompleteFin = true;
                                       
                            setTimeout(function () {
                                $(".clickon #spanclick").css("left", "-694px");
                                $(".clickon i").removeClass('fa-eject-out').addClass('fa-go-in');
                                $('#progressoverlay').hide();
                            }, 1000);
                        }, 1000);

                    }, 1000)
                        }
                    });
                }
            })
            .error(function (data, status) {
                console.log(data.Data.Result.Data);
            });                     
            $('#progressoverlay').hide();
};

            // <summary>   
            /// Update Ticket Details- Accept or Reject tickets
            /// </summary>       
            $scope.actionCount = '';
            $scope.updateTicket = function (IsAcceptOrReject, actionCount) {
                $('#progressoverlay').show();
                $('#repTab').removeClass('active');
                $('#resTab').removeClass('active');
                $('#actTab').addClass('active');              
                $scope.showFilter = false;
                $scope.showResFilter = false;
                $('.filtericon').removeClass('filterselected');
                $scope.PROBLEM_DETAIL = '';
                $scope.SEVERITY = '';
                $scope.PROBLEM_CATEGORY = '';
                $scope.PROBLEM_SUBCATEGORY = '';
                $scope.EQ_REGION = '';
                $scope.RESPROBLEM_DETAIL = '';
                $scope.RESSEVERITY = '';
                $scope.RESPROBLEM_CATEGORY = '';
                $scope.RESPROBLEM_SUBCATEGORY = '';
                $scope.RESEQ_REGION = '';
                $('#progressoverlay').fadeIn('fast', function () {
                    $('#progressComplete').css("top", "-220px");
                    $('.completedStatus').css("display", "none");
                    var selectedTicket = [];
                    var ticketmodel = [];
                    $scope.showDemo = true;
                    angular.forEach($scope.ticketListData, function (value, index) {
                        if (value.ISCHECKED) {
                            selectedTicket.push(value.TICKET_NUMBER);
                            ticketmodel = {
                                TicketNumberSelected: selectedTicket,
                                IsAcceptOrReject: IsAcceptOrReject
                            };
                        }
                    });
                    ticketservice.UpdateTickets(ticketmodel).success(function (ticketList) {
                        if (JSON.stringify(ticketList.Data.Items) !== "[]") {
                            if (ticketList.Data.Items.length > 0) {
                                $scope.ticketListData = ticketList.Data.Items;
                                $scope.filteredtktListData = $scope.ticketListData;
                            }
                            else {
                                $scope.ticketListData = [];
                            }
                        }
                        else { $scope.ticketListData = []; }
                        if (IsAcceptOrReject === 1) {
                            $scope.activateResolved = true;
                            $scope.predictstatus = "accepted";
                            $scope.actionCount = actionCount;
                            $scope.showprogCompleteFin = true;
                        } else {
                            $scope.activateResolved = true;
                            $scope.predictstatus = "rejected";
                            $scope.actionCount = actionCount;
                            $scope.showprogCompleteFin = true;
                        }
                        $('#progressComplete').animate({ 'top': '275px' });
                        setTimeout(function () {
                            $('#progressComplete').animate({ 'top': '100%' }, 500, function () {

                            });
                        }, 1000)                       
                        $('#progressComplete').css("top", "-220px");                        
                    });
                    $('#progressoverlay').fadeOut('fast');
                });
                $('#progressoverlay').hide();
            };           

            // <summary>            
            ///Show demo Event
            /// </summary>         
            $scope.resetDemo = function () {
                $('#progressoverlay').show();
                ticketservice.DeleteTickets().success(function (nlpticketList) {
                    $('#progressoverlay').fadeIn('fast', function () {
                        $scope.showTktDet = false;
                        $scope.showResolvedDet = false;
                        $scope.hideButtons = false;
                        $scope.showGenerate = false;
                        $scope.showNLP = true;
                        $scope.showNLPRow = false;
                        $scope.showInprogress = false;
                        $scope.showprogComplete = false;
                        $scope.showprogCompleteFin = false;
                        $scope.showFinish = false;
                        $scope.showDemo = false;
                        $('#progressoverlay').fadeOut('fast');
                    });
                        window.location = "../App/index.html#/ticket";
                        window.location.reload();
                      
                    });
                $('#progressoverlay').hide();
            };

            /// <summary>
            /// read file content and stroed in array
            /// </summary>
            $scope.uploadFile = function (event) {

                var allowedFiles = [".xlsx"];
                var fileUpload = document.getElementById("uploadBtn");
                var lblError = document.getElementById("lblError");
                var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:()])+(" + allowedFiles.join('|') + ")$");
                if (!regex.test(fileUpload.value.toLowerCase())) {
                    $('#lblError').show();
                    lblError.innerHTML = "Please Upload Excel File Only.";
                    return false;
                }
                lblError.innerHTML = "";
                

                var ticketExcelInput=[];
                var files = event.target.files;
                var i, f;
                for (i = 0, f = files[i]; i != files.length; ++i) {
                    var reader = new FileReader();
                    var name = f.name;
                    if (name) {
                        cnt = name.split('\\');
                        $scope.batchFile = cnt[cnt.length - 1];
                    }

                    reader.onload = function (event) {
                        var data = event.target.result;

                        var workbook = XLSX.read(data, { type: 'binary' });

                        if (workbook !== "") {
                            if (workbook.SheetNames.length > 0) {
                                var first_sheet_name = workbook.SheetNames[0];
                                /* Get worksheet */
                                var worksheet = workbook.Sheets[first_sheet_name];
                                var rownum = 2;
                               
                                while (worksheet['A' + rownum] !== undefined && $.trim(worksheet['A' + rownum].v) !== "") {
                                    ticketExcelInput.push({
                                        TicketNumber: $.trim(worksheet['A' + rownum].v),
                                        Severity: $.trim(worksheet['B' + rownum]) !== '' ?  $.trim(worksheet['B' + rownum].v): '',
                                        TicketStatus: $.trim(worksheet['C' + rownum]) !== '' ? $.trim(worksheet['C' + rownum].v) :'',
                                        ProblemDetail: $.trim(worksheet['D' + rownum]) !== '' ? $.trim(worksheet['D' + rownum].v) : '',
                                        CreateDate: $.trim(worksheet['E' + rownum]) !== '' ? new Date($.trim(worksheet['E' + rownum].w)) : '',
                                        ProblemCategory: $.trim(worksheet['F' + rownum]) !== '' ? $.trim(worksheet['F' + rownum].v) : '',
                                        ProblemSubCategory: $.trim(worksheet['G' + rownum]) !== '' ? $.trim(worksheet['G' + rownum].v) : '',
                                        Region: $.trim(worksheet['H' + rownum]) !== '' ? $.trim(worksheet['H' + rownum].v) : '',
                                        CustAffect: $.trim(worksheet['I' + rownum]) !== '' ? $.trim(worksheet['I' + rownum].v) : '',
                                        EquipmentId: $.trim(worksheet['J' + rownum]) !== '' ? $.trim(worksheet['J' + rownum].v) : '',
                                        OpsDistrict: $.trim(worksheet['K' + rownum]) !== '' ? $.trim(worksheet['K' + rownum].v) : '',
                                        ShortDescription: $.trim(worksheet['L' + rownum]) !== '' ? $.trim(worksheet['L' + rownum].v) : '',
                                        AssignedTo: $.trim(worksheet['M' + rownum]) !== '' ? $.trim(worksheet['M' + rownum].v) : '',
                                        AssignedDiSubDept: $.trim(worksheet['N' + rownum]) !== '' ? $.trim(worksheet['N' + rownum].v) : '',
                                        SubmittedBy: $.trim(worksheet['O' + rownum]) !== '' ? $.trim(worksheet['O' + rownum].v) : '',
                                        ClobFieldValue: $.trim(worksheet['P' + rownum]) !== '' ? $.trim(worksheet['P' + rownum].v) : ''
                                    });
                                    rownum++;
                                }
                            }
                        };
                        if (ticketExcelInput.length > 0) {
                            $scope.generateticketFromExcel(ticketExcelInput);
                        }
                        else {
                            $('#lblError').show();
                            lblError.innerHTML = "Uploaded file has no records or invalid.";
                            $scope.clearFile();
                        }
                    }
                    reader.readAsBinaryString(f);                  
                }                  
                
            };
            /// <summary>
            /// To Generate Ticket Details from uploaded excel inputs
            /// </summary>
            $scope.clearFile = function () {
                $scope.batchFile = "";
                angular.forEach(angular.element("input[type='file']"),
                function (inputElem) {
                    angular.element(inputElem).val(null);
                });
            };

            /// <summary>
           /// To Generate Ticket Details from uploaded excel inputs
            /// </summary>
             $scope.generateticketFromExcel = function (ticketexcelinput) {      
                $('#progressoverlay').show();
                $('#noActive').hide();
                $('#noResolved').hide();
                $('#resTab').removeClass('active');
                $('#repTab').removeClass('active');
                $('#actTab').addClass('active');
                $scope.showFrame = false;
                if (!$scope.showFilter) {
                    $('#progressoverlay').fadeIn('fast', function () {
                        $('#progressbox').animate({ 'top': '275px' }, 500);
                        $scope.ticketListData = [];
                        $scope.loaderMessage = "Fetching tickets from file...";
                        ticketservice.GetTicketDetailsFrmTxt(ticketexcelinput).then(function (ticketList) {
                            if (JSON.stringify(ticketList.data.Data.Items.length) !== "[]") {
                                if (ticketList.data.Data.Items.length > 0) {
                                    $scope.ticketListData = ticketList.data.Data.Items;
                                    randomTicketList = $scope.ticketListData;
                                    $scope.filteredtktListData = $scope.ticketListData;

                                    $scope.showTktDet = true;
                                    $scope.showFilter = false;
                                    //$scope.showGenerate = true;
                                    $scope.showNLP = false;
                                    $scope.getDate();
                                }
                                else {
                                    $scope.openTicket = "0";
                                    $scope.ticketListData = [];
                                    $scope.showTktDet = false;
                                    $scope.showGenerate = false;
                                    $scope.showNLP = true;
                                }
                            }
                            else {
                                $scope.ticketListData = [];
                                $scope.showTktDet = false;
                                $scope.showGenerate = false;
                                $scope.showNLP = true;
                            }
                        });
                    });
                }
                $scope.disUpload = true;
                $('#myModal').hide();
                $('#progressoverlay').hide();
                $('.modal-backdrop').detach();              
            };
            // <summary>            
            ///Delete tickets on Page load
            /// </summary>         
            $scope.refresh = function () {
                $('#progressoverlay').show();
                ticketservice.DeleteTickets().success(function (nlpticketList) {
                    $scope.showTktDet = null;
                    $scope.hideButtons = false;
                    $scope.showGenerate = false;
                    $scope.showNLP = true;
                    $scope.showInprogress = false;
                    $scope.showprogComplete = false;
                    $scope.showprogCompleteFin = false;
                    $scope.showFinish = false;
                    $scope.showDemo = false;

                });
                $('#progressoverlay').hide();
            };
            $scope.refresh();

    // <summary>            
    ///Display PowerBI Report in Project Tab Click
    /// </summary>         
            $scope.showiFrame = function () {
                $('#progressoverlay').show();
        $('#actTab').removeClass('active');
        $('#resTab').removeClass('active');
        $scope.showResFilter = false;
        $scope.showFilter = false;
        $scope.showTktDet = false;
        $scope.showResolvedDet = false;
        $scope.showprogComplete = false;
        $scope.showFrame = true;        
        document.getElementById("reportFrame").src = "https://app.powerbi.com/view?r=eyJrIjoiODA3NDFiNmUtZjRhNi00MzU3LWI0NGQtYWY5MjVjNzVhMTg5IiwidCI6ImE4ZTVkNTcxLTQzZTgtNGMzYy05NmJlLTM0NDE1NmNmNjg4NyIsImMiOjZ9";
        //document.getElementById('reportFrame').contentDocument.location.reload(true);   
        //$scope.showiFrameBtn = true;
        //iframe.contentWindow.location.reload();
        setTimeout(function () { $scope.showiFrameBtn = true; }, 1000);
                $('#noActive').hide();
                $('#noResolved').hide();
                $('#progressoverlay').hide();
    };
    $scope.showReport = function () {
        window.open('https://app.powerbi.com/groups/me/reports/58041699-4003-4793-b848-31013d59ba88/ReportSection1', '_blank');
       
    };

    $scope.logout = function () {
        $window.sessionStorage["userInfo"] = null;
        localStorage.removeItem("email");
        $location.path('/login');
    };
}]);

