class MapEntity{
	/*Data format :
		map : Map - Reference to the map
		entityType : String - BUS or TRAM
		stationsUrl : String - API url to request stations
		realTimeEntityUrl : String - API url to reaquest real-time data
		pathUrl : String - API url to request path data
	*/
	constructor(map, newEntityType, newStationsUrl, newRealTimeEntityUrl, newPathUrl){
		this.map = map;
		this.entityType = newEntityType;
		this.stationsUrl = newStationsUrl;
		this.realTimeEntityUrl = newRealTimeEntityUrl;
		this.pathUrl = newPathUrl;
		this.entityStations = []
	};
	//METHODS
	init(){
		
	}
	//Main functions to call
	add_station_markers(){
		if(this.entityType=="TRAM"){
			console.log("Tramway station markers requested");
			ajax_auth_request(TRAMWAY_STATIONS_URL, TRAMWAY_STATIONS_REQUEST, map);
		}
		//Add buses
	};

	add_real_time_markers(){
		if(this.entityType=="TRAM"){
			console.log("Real time tramway markers requested");
			ajax_auth_request(REAL_TIME_TRAMAYS_URL, RT_TRAMWAYS_REQUEST, map);
		}
	};

	add_path(){
		if(this.entityType=="TRAM"){
			console.log("Tramway path requested");
			ajax_auth_request(TRAM_PATH_URL, TRAM_PATH_REQUEST, map);
		}
	;}
	//SUB FUNCTIONS
	parse_tramway_stations(response){
	    response.records.forEach(stop=>{
	        try {
	            let id = stop.fields.stop_id;
	            if(id.startsWith('1') || id.startsWith('2')){
	                this.entityStations.push(stop);
	            }
	        } catch (error) {
	            console.log("Error parsing json data...",error);
	        }
	    });
	    console.log("Tramway stations : ",this.entityStations);
	};
	//Returns a string for the tramway station popups
	format_str_for_station_tramway_popup(json_station){
		let provisional_str = "Arrêt :<b> name</b><br>Ligne : X<br>Destination : Y";
		let str_1 = provisional_str.replace('name',String(json_station.fields.stop_name));
		let str_2 = "";
		let str_3 = "";
		if(json_station.fields.stop_id.startsWith("1")){
			str_2 = str_1.replace('Y', String(TRAMWAY_TRACK_1));
			str_3 = str_2.replace('X', String("A"));
		}
	    else{
			str_2 = str_1.replace('Y', String(TRAMWAY_TRACK_2));
			str_3 = str_2.replace('X', String("A"));
		}
	    let final_string = str_3
		return final_string;
	};
	//Returns a string for the real-time tramway popups : numéro, le nom de son prochain arrêt, l’heure estimée d’arrivée au prochain arrêt, son retard et sa destination ;
	format_str_for_rt_tramway_popup(json_tram){
		let provisional_str = "<b>Line X - destination</b><br>Number Y<br>Next Station : Z<br>Expected at arrival_time<br>Delay expected : delay second(s)";
		let line_number;
		let destination;
		if(json_tram.fields.mnemoarret.startsWith("1")){
			line_number = "1";
			destination = TRAMWAY_TRACK_1;
		}
		else{
			line_number = "2";
			destination = TRAMWAY_TRACK_2;
		};
		var time = new Date(json_tram.fields.harret);
		let correct_time = time.toLocaleTimeString();
		let final_string = provisional_str.replaceAll({'Y':String(json_tram.fields.novh),'Z':String(json_tram.fields.nomarret),'arrival_time':String(correct_time),'delay':String(json_tram.fields.ecart),'X':String(line_number),'destination':String(destination)}); 
		return final_string;
	};

	parse_tram_path(json_response){
		var tram_path_parsed = json_response.records[0].fields.shape.coordinates;
		return tram_path_parsed;
	};
	//Adds tramway station markers to the map
	generate_tramway_station_markers(response){
		this.parse_tramway_stations(response);
		this.entityStations.forEach(station=>{
			let coordinates = [station.fields.stop_coordinates[0],station.fields.stop_coordinates[1]];
			let new_marker;
			if(station.fields.stop_id.startsWith("1")){
				let popup_string_stations = format_str_for_station_tramway_popup(station);
				new_marker = L.marker(coordinates, {icon: blue_tram_station_icon });
				new_marker.bindPopup(popup_string_stations);
				new_marker.addTo(this.map.track_1_stations_overlay);
			}
			else{
				let popup_string_stations = format_str_for_station_tramway_popup(station);
				new_marker = L.marker(coordinates, {icon: red_tram_station_icon });
				new_marker.bindPopup(popup_string_stations);
				new_marker.addTo(this.map.track_2_stations_overlay);
			}
			
		});
	};

	//Adds real time tramways markers to the map according to the specific structure of the response json file provided by the Ajax request
	generate_real_time_tramway_markers(response){
		response.records.forEach(element=>{
			let coordinates = [element.geometry.coordinates[1],element.geometry.coordinates[0]];
			let new_marker;
			if(element.fields.dest==TRAMWAY_TRACK_1){
				new_marker = L.marker(coordinates, {icon: blue_tram_icon });
				let popup_string_tram = this.format_str_for_rt_tramway_popup(element);
				new_marker.bindPopup(popup_string_tram);
				new_marker.addTo(this.map.rt_tram_positions_overlay_1);
			}
			else{
				new_marker = L.marker(coordinates, {icon: red_tram_icon });
				let popup_string_tram = this.format_str_for_rt_tramway_popup(element);
				new_marker.bindPopup(popup_string_tram);
				new_marker.addTo(this.map.rt_tram_positions_overlay_2);
			}
		});
	};

	generate_tram_path(response){
		let raw_coordinates = this.parse_tram_path(response);
		let coordinates = [];
		raw_coordinates.forEach(array =>{
			coordinates = [];
			array.forEach(element=>{
				coordinates.push([element[1],element[0]]);
				L.polyline(coordinates, {color: 'black'}).addTo(this.map.tram_path_overlay);
			});
		});
	}	
}