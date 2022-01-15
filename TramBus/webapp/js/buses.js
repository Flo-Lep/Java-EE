//----------------------------BUSES FUNCTIONNALITIES----------------------------

let _buses_stations;//Format [line_index][stations]
let line_index;

function add_buses_station_markers(map){
	console.log("Buses station markers requested");
	ajax_auth_request(BUSES_STATIONS_URL, BUSES_STATIONS_REQUEST, map);
};

function add_real_time_buses_markers(map){
	console.log("Real time buses markers requested");
	ajax_auth_request(REAL_TIME_BUSES_URL, RT_BUSES_REQUEST, map);
};

function add_buses_path(map){
	console.log("Buses path requested");
	ajax_auth_request(BUSES_PATH_URL, BUSES_PATH_REQUEST, map);
}

/*********************************BUSES STATIONS************************************/

//Returns an array of buses stations from the according API request
function parse_buses_stations(line_index, response){
	line_index = -1;
    let buses_stations = new Array(50);
	for(i=0;i<buses_stations.length;i++){
		buses_stations[i] = [];
	}
    response.records.forEach(stop=>{
        try {
			let index = get_line_index(buses_stations, stop.fields.nomligne);
			if(index==-1){
				//Create new line index
				line_index+=1;
				buses_stations[line_index].push(stop);
			}
			else{
				//Add station to the existing line index
				buses_stations[index].push(stop);
			}
        } catch (error) {
            console.log("Error parsing json data...",error);
        }
    });
    console.log("Buses stations : ",buses_stations);
	_buses_stations = buses_stations;
    return buses_stations;
};

//Returns a string for the tramway station popups
function format_str_for_station_buses_popup(json_station){
	let provisional_str = "Arrêt :<b> name</b><br>Ligne : X<br>Destination : Y";
    let final_str = provisional_str.replaceAll({'name':String(json_station.fields.nomarret),'X':String(json_station.fields.nomligne),'Y':String(json_station.fields.dest)});
	return final_str;
};

//Adds tramway station markers to the map
function generate_buses_station_markers(response, map){
	let stations_list = parse_buses_stations(line_index, response)
	stations_list.forEach(line=>{
		let lineName = String(stations_list.indexOf(line)+1)+" - "+line[0].fields.nomligne;
		let layerGroup = L.layerGroup();
		line.forEach(station=>{
			let coordinates = [station.fields.coordonnees[0],station.fields.coordonnees[1]];
			let new_marker;
			let popup_string_stations = format_str_for_station_buses_popup(station);
			new_marker = L.marker(coordinates, {icon: bus_station_icon});
			new_marker.bindPopup(popup_string_stations);
			new_marker.addTo(layerGroup);
		});
		map.layerControl.addOverlay(layerGroup, lineName);
	});
};

function generate_limited_buses_station_markers(response, map){
	let stations_list = parse_buses_stations(line_index, response)
	stations_list.forEach(line=>{
			line.forEach(station=>{
				let route_id = parseInt(station.fields.mnemoligne);
				if(route_id>=1 && route_id<=15){
					let coordinates = [station.fields.coordonnees[0],station.fields.coordonnees[1]];
					let popup_string = format_str_for_station_buses_popup(station);
					let new_marker = L.marker(coordinates, {icon: map.get_line_icon(route_id)});
					new_marker.bindPopup(popup_string);
					new_marker.addTo(map.get_line_overlay(route_id));
				}
		});
	});
	/*for(var i = 0; i<15;i++){
		stations_list[i].forEach(station=>{
			let coordinates = [station.fields.coordonnees[0],station.fields.coordonnees[1]];
			let new_marker;
			let popup_string_stations = format_str_for_station_buses_popup(station);
			new_marker = L.marker(coordinates, {icon: map.get_line_icon(i+1)});
			new_marker.bindPopup(popup_string_stations);
			new_marker.addTo(map.get_line_overlay(i+1));
		});
	}*/
};

/*********************************BUSES LINE PATHES************************************/
//Returns row coordinates of paths
function parse_bus_pathes(response){
	let parsed_paths = new Array();
	response.records.forEach(element=>{
		if(element.fields.route_type == "Bus"){
			let route_id = parseInt(element.fields.route_id);
			if(route_id>=1 && route_id<=15){
				parsed_paths.push(element);
			}
		}
	});
	return parsed_paths;
}

function generate_bus_path(response, map){
	let parsed_paths = parse_bus_pathes(response);
	console.log("parsed buses paths", parsed_paths);
	let i = 0;
	parsed_paths.forEach(path =>{
		let coordinates = [];
		i+=1;
		//Revert coord
		path.fields.shape.coordinates[0].forEach(coordinate=>{
			coordinates.push([coordinate[1],coordinate[0]]);
		});
		L.polyline(coordinates, {color: map.get_path_color(parseInt(path.fields.route_id))}).addTo(map.get_line_overlay(parseInt(path.fields.route_id)));
		L.polyline(coordinates, {color: map.get_path_color(parseInt(path.fields.route_id))}).addTo(map.get_path_line_overlay(parseInt(path.fields.route_id)));
	});
}

/*************************************REAL TIME BUSES***************************************/

function format_str_for_rt_buses_popup(json_bus_data){ //son numéro, le nom de son prochain arrêt, l’heure d’arrivée estimée au prochain arrêt, son retard et sa destination 
	let provisional_str = "<b>Line X - destination</b><br>Number Y<br>Next Station : Z<br>Expected at arrival_time<br>Delay expected : delay second(s)";
	let line_number = parseInt(json_bus_data.fields.mnemoligne);
	let destination = json_bus_data.fields.dest;
	var time = new Date(json_bus_data.fields.harret);
	let correct_time = time.toLocaleTimeString();
	let final_string = provisional_str.replaceAll({'Y':String(json_bus_data.fields.novh),'Z':String(json_bus_data.fields.nomarret),'arrival_time':String(correct_time),'delay':String(json_bus_data.fields.ecart),'X':String(line_number),'destination':String(destination)}); 
	return final_string;
};

function generate_real_time_buses_markers(response, map){
	response.records.forEach(bus=>{
		let route_id = parseInt(bus.fields.mnemoligne);
		if(route_id>=1 && route_id<=15){
			let coordinates = [bus.geometry.coordinates[1],bus.geometry.coordinates[0]];
			let new_marker = L.marker(coordinates, {icon: map.get_rt_line_icon(route_id)});
			let popup_string_tram = format_str_for_rt_buses_popup(bus);
			new_marker.bindPopup(popup_string_tram);
			new_marker.addTo(map.get_rt_line_overlay(route_id));
		}
	});
}

/*-----------------Miscellaneous-------------------*/ 
function get_line_index(buses_stations, linename){
	let index = -1;
	try{
		buses_stations.forEach(line_index=>{
			let entity = line_index[0];
			line_index = buses_stations.indexOf(line_index);
			if(entity.fields.nomligne==linename){
				index = line_index;
				return index;
			}
		});
	}catch(error){
		//The element is undefined
	}
	return index;
}

/*-----------------------Exec------------------------*/
function real_time_buses_refresh(map){
	map.rt_bus_line_1.clearLayers();
	map.rt_bus_line_2.clearLayers();
	map.rt_bus_line_3.clearLayers();
	map.rt_bus_line_4.clearLayers();
	map.rt_bus_line_5.clearLayers();
	map.rt_bus_line_6.clearLayers();
	map.rt_bus_line_7.clearLayers();
	map.rt_bus_line_8.clearLayers();
	map.rt_bus_line_9.clearLayers();
	map.rt_bus_line_10.clearLayers();
	map.rt_bus_line_11.clearLayers();
	map.rt_bus_line_12.clearLayers();
	map.rt_bus_line_13.clearLayers();
	map.rt_bus_line_14.clearLayers();
	map.rt_bus_line_15.clearLayers();
	add_real_time_buses_markers(map);
}