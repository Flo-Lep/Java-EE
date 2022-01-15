console.log("Charts creation...");
const labels = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]
let firstChart = new DataScientistChart("stationsChart","bar","TRAMWAYS - Retards sur la LIGNE 1 : ANGERS ROSERAIE - VERNEAU / AVRILLE ARDENNE",labels);

//DOM elements
let lineElement = document.getElementById("line");
let intervalTimeElement = document.getElementById("time");
let intervalScopeElement = document.getElementById("scope");
let dateElement = document.getElementById("date");

//Vars updated thanks to DOM
let line_selected = document.getElementById("line").value;//Default
let scope = document.getElementById("scope").value;
let time = "12:00";//Default value
let date = document.getElementById("date").value;
let update = true;

function updateData(){
	let min_timestamp = getMinTimestamp();
	let max_timestamp =  getMaxTimestamp();
	let URL = "ProcessRequest?id=getDataScientistRangeData&starting_timestamp="+min_timestamp+"&ending_timestamp="+max_timestamp+"&transport_type=tramway";
	servletChartRequest(URL);
	update = true;
}

function computeDatasets(intervalCall){
	updateData();
	if(intervalCall){update=true;}
	console.log("Computing datasets...");
	firstChart.clearDatasets();
	if(line_selected==1){
		console.log("Computing line 1");
		firstChart.addDatasets(firstChart.formatTramwaysDataset(_tramway_stations_1, _last_rt_tramways_1));
	}
	else if(line_selected==2){
		console.log("Computing line 2");
		firstChart.addDatasets(firstChart.formatTramwaysDataset(_tramway_stations_2, _last_rt_tramways_2));
	}
	//firstChart.addDatasets(firstChart.getTestingDatasets());
	firstChart.setDisplayedInterval(scope, time, update);
	firstChart.updateChart();
	update = false;
}

//Update graph each XX secs;
datasetComputing = setInterval(computeDatasets,30000,true);

//ON INPUT FUNCTIONS
lineElement.oninput = function(){
	line_selected = this.value;
	update = true;
	computeDatasets();
}

intervalTimeElement.oninput = function(){
	time = this.value;
	update = true;
	computeDatasets();
}

intervalScopeElement.oninput = function(){
	scope = this.value;
	update = true;
	computeDatasets();
}

dateElement.oninput = function(){
	date = this.value;
	updateData();
	update = true;
}

//UTILS
//Timestamp format should be --> 2021-12-14 10:11:31
function getMinTimestamp(){
	let timestamp = date.split(" ");
	return timestamp[0]+" 00:00:00";
}

function getMaxTimestamp(){
	let timestamp = date.split(" ");
	return timestamp[0]+" 23:59:00";
}