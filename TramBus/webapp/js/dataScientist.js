
var slider = document.getElementById("myRange");
var sliderDate = document.getElementById("sliderDate");
var sliderTime = document.getElementById("sliderTime");
var output = document.getElementById("timestamp");
output.innerHTML = "Choisissez une date puis bougez le slider pour préciser l'heure"; // Display the default slider value

function set_timestamp_display(){
	let minutes;
	if(slider.value<10){
		minutes = "0"+slider.value.toString();
	}
	else{
		minutes = slider.value.toString();
	}
	let timeValue = sliderTime.value.toString().split(":");
	let output_timestamp = sliderDate.value.toString()+" "+timeValue[0]+":"+minutes;
	output.innerHTML = output_timestamp;
};

// Update the current slider value (each time you drag the slider handle)
sliderTime.oninput = function() {
	let value = sliderTime.value.toString().split(":");
	let minutes = value[1];
	slider.value = minutes;
	set_timestamp_display();
}

slider.oninput = function() {
	//let time = sliderTime.value.toString().split(":");
	//sliderTime.value = time[0]+":"+this.value.toString();
	set_timestamp_display();
};

function checkTimestamp(){
	let timestamp = document.getElementById("timestamp").innerHTML+":00";
	//Timestamp format should be --> 2021-12-14 10:11:31
	if(timestamp.length==19){
		return timestamp;
	}
	else{
		return null;	
	}	
};

function update_markers_data(tramwaysTimer, busesTimer, map){
	//Clear background app refresh elements
	clearInterval(tramwaysTimer);
	clearInterval(busesTimer);
	let timestamp = checkTimestamp();
	let transport_type = new Array();
	let tramwaysCheckbox = document.getElementById("tramway_checkbox").checked;
	let busesCheckbox = document.getElementById("bus_checkbox").checked;
	if(tramwaysCheckbox!=false){
		transport_type.push("tramway");
		map.rt_tram_positions_overlay_1.clearLayers();
		map.rt_tram_positions_overlay_2.clearLayers();
	}
	if(busesCheckbox!=false){
		transport_type.push("bus");
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
		
	}
	if(timestamp!=null){
		transport_type.forEach(element=>{
			let URL = "ProcessRequest?id=getDataScientistData&timestamp="+timestamp.toString()+"&transportType="+element;
			servletRequest(URL, map);
		});	
	}
	else{
		console.log("ERROR : wrong timestamp format provided");
	}
}