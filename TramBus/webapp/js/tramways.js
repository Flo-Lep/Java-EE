/*INFO : This file provides functionnalities for tramways on the map*/
//import {TRAMWAY_STATIONS_URL, TRAMWAY_STATIONS_REQUEST, REAL_TIME_TRAMAYS_URL, RT_TRAMWAYS_REQUEST, TRAM_PATH_URL, TRAM_PATH_REQUEST, TRAMWAY_TRACK_1, TRAMWAY_TRACK_2, REFRESH_TIMER} from './definitions.js';

//----------------------------TRAMWAYS FUNCTIONNALITIES----------------------------

let _tramway_stations;
let _tramway_stations_1 = [];
let _tramway_stations_2 = [];
let _last_rt_tramways = [];
let _last_rt_tramways_1 = [];
let _last_rt_tramways_2 = [];

function add_tramway_station_markers(map){
	console.log("Tramway station markers requested");
	ajax_auth_request(TRAMWAY_STATIONS_URL, TRAMWAY_STATIONS_REQUEST, map);
};

function add_real_time_tramway_markers(map){
	console.log("Real time tramway markers requested");
	ajax_auth_request(REAL_TIME_TRAMAYS_URL, RT_TRAMWAYS_REQUEST, map);
};

function add_tramway_path(map){
	console.log("Tramway path requested");
	ajax_auth_request(TRAM_PATH_URL, TRAM_PATH_REQUEST, map);
}

//Returns an array of tramway stations from the according API request
function parse_tramway_stations(response){
    let tramway_stations = []
    response.records.forEach(stop=>{
        try {
            let id = stop.fields.stop_id;
            if(id.startsWith('1') || id.startsWith('2')){
                tramway_stations.push(stop);
            }
        } catch (error) {
            console.log("Error parsing json data...",error);
        }
    });
    console.log("Tramway stations : ",tramway_stations);
	_tramway_stations = tramway_stations;
    return tramway_stations;
};

//Returns a string for the tramway station popups
function format_str_for_station_tramway_popup(json_station){
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
function format_str_for_rt_tramway_popup(json_tram){
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

function parse_tram_path(json_response){
	var tram_path_parsed = json_response.records[0].fields.shape.coordinates;
	return tram_path_parsed;
};	
//-----------------------RESPONSE PARSING FUNCTIONS (FROM AJAX REQUESTS)--------------------------
/*INFO : These functions are called by the ajax request when a response has been received. It enables a specific data parsing according to the type of request you have provided.
		 The different request types are listed in the js definition file, this includes request types for real time trams/buses positions, and trams/buses stations.
*/
//Adds tramway station markers to the map
function generate_tramway_station_markers(response, map){
	let stations_list = parse_tramway_stations(response)
	stations_list.forEach(station=>{
		let coordinates = [station.fields.stop_coordinates[0],station.fields.stop_coordinates[1]];
		let new_marker;
		if(station.fields.stop_id.startsWith("1")){
			let popup_string_stations = format_str_for_station_tramway_popup(station);
			new_marker = L.marker(coordinates, {icon: blue_tram_station_icon });
			new_marker.bindPopup(popup_string_stations);
			new_marker.addTo(map.track_1_stations_overlay);
			_tramway_stations_1.push(station);
		}
		else{
			let popup_string_stations = format_str_for_station_tramway_popup(station);
			new_marker = L.marker(coordinates, {icon: red_tram_station_icon });
			new_marker.bindPopup(popup_string_stations);
			new_marker.addTo(map.track_2_stations_overlay);
			_tramway_stations_2.push(station);
		}
		
	});
};

//Adds real time tramways markers to the map according to the specific structure of the response json file provided by the Ajax request
function generate_real_time_tramway_markers(response, map){
	_last_rt_tramways = [];
	//_last_rt_tramways_1 = [];
	//_last_rt_tramways_2 = [];
	response.records.forEach(element=>{
		_last_rt_tramways.push(element);
		let coordinates = [element.geometry.coordinates[1],element.geometry.coordinates[0]];
		let new_marker;
		if(element.fields.dest==TRAMWAY_TRACK_1){
			new_marker = L.marker(coordinates, {icon: blue_tram_icon });
			let popup_string_tram = format_str_for_rt_tramway_popup(element);
			new_marker.bindPopup(popup_string_tram);
			new_marker.addTo(map.rt_tram_positions_overlay_1);
			//_last_rt_tramways_1.push(element);
		}
		else{
			new_marker = L.marker(coordinates, {icon: red_tram_icon });
			let popup_string_tram = format_str_for_rt_tramway_popup(element);
			new_marker.bindPopup(popup_string_tram);
			new_marker.addTo(map.rt_tram_positions_overlay_2);
			//_last_rt_tramways_2.push(element);
		}
	});
};

function generate_tram_path(response, map){
	let raw_coordinates = parse_tram_path(response);
	let coordinates = [];
	raw_coordinates.forEach(array =>{
		coordinates = [];
		array.forEach(element=>{
			coordinates.push([element[1],element[0]]);
		});
		L.polyline(coordinates, {color: 'black'}).addTo(map.tram_path_overlay);
		L.polyline(coordinates, {color: 'black'}).addTo(map.track_1_stations_overlay);
		L.polyline(coordinates, {color: 'black'}).addTo(map.track_2_stations_overlay);
	});
}

function update_rt_tramways(json_data){
	console.log("Updating real time tramaways for chart")
	_last_rt_tramways_1 = [];
	_last_rt_tramways_2 = [];
	json_data.forEach(response =>{
		response.records.forEach(element=>{
			if(element.fields.dest==TRAMWAY_TRACK_1){
				_last_rt_tramways_1.push(element);
			}
			else{
				_last_rt_tramways_2.push(element);
			}
		});
	});
};

//----------------------- EXECUTIONS --------------------------

function real_time_tramway_refresh(map){
	map.rt_tram_positions_overlay_1.clearLayers();
	map.rt_tram_positions_overlay_2.clearLayers();
	add_real_time_tramway_markers(map);
}

