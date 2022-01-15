class AjaxRequest{
	/*Data format :
		requestUrl : String
		requestType : String
		mapEntity : MapEntity
	*/
	constructor(newRequestUrl, newRequestType, newMapEntity){
		this.requestUrl = newRequestUrl;
		this.requestType = newRequestType; 
		this.mapEntity = newMapEntity;
	};
	auth_request(username, password){
		var request = new XMLHttpRequest(); 
		request.open("get", this.requestUrl, true);
		request.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
		request.onreadystatechange = function(){
			if(request.readyState==4){
				if(request.status==200){
					console.log("AJAX REQUEST RESPONSE : ",JSON.parse(request.responseText));
					request_handling(JSON.parse(request.responseText));
				}
				else{
					console.log("Error processing the ajax request : ",request.status)
				}
			}
		}
		request.send()
	};
}

function request_handling(response){
		if(this.requestType==TRAMWAY_STATIONS_REQUEST){
			this.mapEntity.generate_tramway_station_markers(response);
		}
		else if(this.requestType==RT_TRAMWAYS_REQUEST){
			this.mapEntity.generate_real_time_tramway_markers(response);
		}
		else if(this.requestType==TRAM_PATH_REQUEST){
			this.mapEntity.generate_tram_path(response);
		}
		else if(this.requestType == BUSES_STATIONS_REQUEST){
			this.mapEntity.generate_buses_station_markers(response);
		}
		else{
			console.log("ERROR : Wrong type provided for the Ajax request --> Response parsing aborted");
		}
	};