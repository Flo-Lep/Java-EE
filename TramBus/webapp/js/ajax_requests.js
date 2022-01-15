/*
INFO :   This file handles ajax requests
		 Call ajax_request(url, request_type, map) to make a request to an API url, once the response is received, the request_handling function is called in order to process the data received.
		 According to the type of data you requested, the right parsing function is called and map is updated;
*/
function ajax_request(url, request_type, map){
		var request = new XMLHttpRequest(); 
		request.open("get", url, true);
		request.onreadystatechange = function(){
			if(request.readyState==4){
				if(request.status==200){
					request_handling(JSON.parse(request.responseText),request_type, map);
				}
				else{
					console.log("Error processing the ajax request : ",request.status)
				}
			}
		}
		request.send()
};

//Executed when the AJAX request has been successfully received
function request_handling(response, response_type, map){
	if(response_type==TRAMWAY_STATIONS_REQUEST){
		generate_tramway_station_markers(response, map);
	}
	else if(response_type==RT_TRAMWAYS_REQUEST || response_type == DATASCIENTIST_TRAMWAYS_REQUEST){
		generate_real_time_tramway_markers(response, map);
	}
	else if(response_type==TRAM_PATH_REQUEST){
		generate_tram_path(response, map);
	}
	else if(response_type == BUSES_STATIONS_REQUEST){
		generate_limited_buses_station_markers(response, map);
	}
	else if(response_type == BUSES_PATH_REQUEST){
		generate_bus_path(response, map);
	}
	else if(response_type == RT_BUSES_REQUEST || response_type == DATASCIENTIST_BUSES_REQUEST){
		generate_real_time_buses_markers(response, map);
	}
	else if(response_type == DATASCIENTIST_RANGE_DATA){
		update_rt_tramways(response);
	}
	else{
		console.log("ERROR : Wrong or undefined type provided for the Ajax request : "+response_type+" --> Response parsing aborted");
	}
};


function ajax_auth_request(url, request_type, map){
		var request = new XMLHttpRequest(); 
		request.open("get", url, true);
		request.setRequestHeader("Authorization", "Basic " + btoa(API_USERNAME + ":" + API_PASSWORD));
		request.onreadystatechange = function(){
			if(request.readyState==4){
				if(request.status==200){
					request_handling(JSON.parse(request.responseText),request_type, map);
				}
				else{
					console.log("Error processing the ajax request : ",request.status)
				}
			}
		}
		request.send()
};

function servletRequest(url, map){
	var request = new XMLHttpRequest(); 
	request.open("get", url, true);
	request.onreadystatechange = function(){
		if(request.readyState==4){
			if(request.status==200){
				if(url.includes("tramway")){
					console.log("DATASCIENTIST tram request received : ",JSON.parse(request.responseText));
					request_handling(JSON.parse(request.responseText), DATASCIENTIST_TRAMWAYS_REQUEST, map);
					
				}
				else if(url.includes("bus")){
					console.log("DATASCIENTIST bus request received : ",JSON.parse(request.responseText));
					request_handling(JSON.parse(request.responseText), DATASCIENTIST_BUSES_REQUEST, map);
				}
				else{
					console.log("Error identifying tram or bus type");
				}
			}
			else{
				console.log("Error processing the ajax request : ",request.status);
			}
		}
	}
	request.send();
};

function servletRequestNotation(url, map){
	var request = new XMLHttpRequest(); 
	request.open("get", url, true);
	request.onreadystatechange = function(){
		if(request.readyState==4){
			if(request.status==200){
				
				sendToJs(request.responseText);
				return request.responseText;
			}
			else{
				console.log("Error processing the ajax request : ",request.status);
			}
		}
	}
	request.send();
};

function servletChartRequest(url){
	var request = new XMLHttpRequest(); 
	request.open("get", url, true);
	request.onreadystatechange = function(){
		if(request.readyState==4){
			if(request.status==200){
				if(url.includes("tramway")){
					request_handling(JSON.parse(request.responseText), DATASCIENTIST_RANGE_DATA);
					
				}
				else{
					console.log("Error identifying tram or bus type");
				}
			}
			else{
				console.log("Error processing the ajax request : ",request.status);
			}
		}
	}
	request.send();
};
