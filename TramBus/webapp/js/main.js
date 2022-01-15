
//Main process
var tramwaysTimer;
var busesTimer;
var map = new LeafletMap(MAP_COORDINATES, MAP_ZOOM, MAP_MBATTR, MAP_MBURL);
//Creation of the map
console.log("Map creation...");
map.init();
//Tramways
add_real_time_tramway_markers(map); // Adding real-time markers for the first time
tramwaysTimer = setInterval(real_time_tramway_refresh, REFRESH_TIMER, map);
add_tramway_station_markers(map);
add_tramway_path(map);
//Buses
add_real_time_buses_markers(map);
busesTimer = setInterval(real_time_buses_refresh, REFRESH_TIMER, map);
add_buses_station_markers(map);
add_buses_path(map);

