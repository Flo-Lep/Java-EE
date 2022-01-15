//This file should contain all the "dynamic" strings that may be updated or changed.
//MAP
const MAP_COORDINATES = [47.47116545414881, -0.5518444884192253];
const MAP_MBATTR = 'Projet Génie Logiciel - Équipe 3';
const MAP_MBURL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGVwZWx0ZmwiLCJhIjoiY2t1MmxtZ3pvMnFuajJwcXRwOXpteGRwMCJ9.Hr1qbdY7ct6utCFiMN2FEg';
const MAP_ZOOM = 13;

//TRACKS
const TRAMWAY_TRACK_1 = "ANGERS ROSERAIE"; //An ajax request may be possible to get these strings ?
const TRAMWAY_TRACK_2 = "VERNEAU / AVRILLE ARDENNE";
const TRAMWAY_TRACK_3 = "";

//REQUESTS URLS
const TRAMWAY_STATIONS_URL = "https://data.angers.fr/api/records/1.0/search/?dataset=horaires-theoriques-et-arrets-du-reseau-irigo-gtfs&q=&rows=2500&facet=stop_id&facet=stop_name";
const BUSES_STATIONS_URL = "https://data.angers.fr/api/records/1.0/search/?dataset=bus-tram-topologie-dessertes&q=&rows=5000&facet=mnemoligne&facet=nomligne&facet=dest&facet=mnemoarret&facet=nomarret&facet=numarret";
const REAL_TIME_TRAMAYS_URL = "https://data.angers.fr/api/records/1.0/search/?dataset=bus-tram-position-tr&q=&facet=mnemoligne&facet=nomligne&facet=dest&refine.mnemoligne=A";
const REAL_TIME_BUSES_URL = "https://data.angers.fr/api/records/1.0/search/?dataset=bus-tram-position-tr&q=&rows=1000&facet=novh&facet=mnemoligne&facet=nomligne&facet=dest&exclude.mnemoligne=A";
const TRAM_PATH_URL = "https://data.angers.fr/api/records/1.0/search/?dataset=irigo_gtfs_lines&q=&facet=route_short_name&facet=route_long_name&facet=route_type&refine.route_long_name=Angers+Roseraie+-+Avrill%C3%A9+Ardenne";
const BUSES_PATH_URL = 'https://data.angers.fr/api/records/1.0/search/?dataset=irigo_gtfs_lines&q=&rows=200&facet=route_long_name&facet=route_type';

//ICON URLS
const TRAM_STATION_ICON = "img/station_tram.png";
const BLUE_TRAM_STATION_ICON = "img/station_tram_bleue.png";
const RED_TRAM_STATION_ICON = "img/station_tram_rouge.png";
const BUS_STATION_ICON = "img/station_bus.png";
const BLACK_TRAM_ICON = "img/tram-icon_black.png";
const RED_TRAM_ICON = "img/tram-icon_red.png";
const BLUE_TRAM_ICON = "img/tram-icon_blue.png";


//LOGO Trambus
const TRAMBUS_LOGO = "img/logo.png";

//Ajax request types
const TRAMWAY_STATIONS_REQUEST = 0;
const BUSES_STATIONS_REQUEST = 1;
const RT_TRAMWAYS_REQUEST = 2;
const RT_BUSES_REQUEST = 3;
const TRAM_PATH_REQUEST = 4;
const BUSES_PATH_REQUEST = 5;
const DATASCIENTIST_TRAMWAYS_REQUEST = 6;
const DATASCIENTIST_BUSES_REQUEST = 7;
const DATASCIENTIST_RANGE_DATA = 8;

//REFRESH TIMER
const REFRESH_TIMER = 30000;

//API KEY
const API_KEY = "2f1b544abeb08b5b4a37bd465128101dd475e91e3cd9ad98e89da956";
const API_USERNAME = "quentin.mary@reseau.eseo.fr";
const API_PASSWORD = "PGL20212022";

//Icons images pathes
const LINE_1_BUS_ICON ="img/station_bus1.png";
const LINE_2_BUS_ICON ="img/station_bus2.png";
const LINE_3_BUS_ICON ="img/station_bus3.png";
const LINE_4_BUS_ICON ="img/station_bus4.png";
const LINE_5_BUS_ICON ="img/station_bus5.png";
const LINE_6_BUS_ICON ="img/station_bus6.png";
const LINE_7_BUS_ICON ="img/station_bus7.png";
const LINE_8_BUS_ICON ="img/station_bus8.png";
const LINE_9_BUS_ICON ="img/station_bus9.png";
const LINE_10_BUS_ICON ="img/station_bus10.png";
const LINE_11_BUS_ICON ="img/station_bus11.png";
const LINE_12_BUS_ICON ="img/station_bus12.png";
const LINE_13_BUS_ICON ="img/station_bus13.png";
const LINE_14_BUS_ICON ="img/station_bus14.png";
const LINE_15_BUS_ICON ="img/station_bus15.png";
const LINE_1_RT_BUS_ICON ="img/bus1.png";
const LINE_2_RT_BUS_ICON ="img/bus2.png";
const LINE_3_RT_BUS_ICON ="img/bus3.png";
const LINE_4_RT_BUS_ICON ="img/bus4.png";
const LINE_5_RT_BUS_ICON ="img/bus5.png";
const LINE_6_RT_BUS_ICON ="img/bus6.png";
const LINE_7_RT_BUS_ICON ="img/bus7.png";
const LINE_8_RT_BUS_ICON ="img/bus8.png";
const LINE_9_RT_BUS_ICON ="img/bus9.png";
const LINE_10_RT_BUS_ICON ="img/bus10.png";
const LINE_11_RT_BUS_ICON ="img/bus11.png";
const LINE_12_RT_BUS_ICON ="img/bus12.png";
const LINE_13_RT_BUS_ICON ="img/bus13.png";
const LINE_14_RT_BUS_ICON ="img/bus14.png";
const LINE_15_RT_BUS_ICON ="img/bus15.png";

//ICON DEFINITIONS
var tram_station_icon = L.icon({
        iconUrl: TRAM_STATION_ICON,
        shadowUrl: '',
        iconSize: [30,30], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var blue_tram_station_icon = L.icon({
        iconUrl: BLUE_TRAM_STATION_ICON,
        shadowUrl: '',
        iconSize: [30,30], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var red_tram_station_icon = L.icon({
        iconUrl: RED_TRAM_STATION_ICON,
        shadowUrl: '',
        iconSize: [30,30], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var black_tram_icon = L.icon({
        iconUrl: BLACK_TRAM_ICON,
        iconSize: [30,30], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var red_tram_icon = L.icon({
        iconUrl: RED_TRAM_ICON,
        iconSize: [30,30], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var blue_tram_icon = L.icon({
        iconUrl: BLUE_TRAM_ICON,
        iconSize: [30,30], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

/**********************************BUSES STATIONS********************************/
var bus_station_icon = L.icon({
        iconUrl: BUS_STATION_ICON,
        shadowUrl: '',
        iconSize: [30,30], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_1_bus_icon = L.icon({
        iconUrl: LINE_1_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_2_bus_icon = L.icon({
        iconUrl: LINE_2_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_3_bus_icon = L.icon({
        iconUrl: LINE_3_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_4_bus_icon = L.icon({
        iconUrl: LINE_4_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_5_bus_icon = L.icon({
        iconUrl: LINE_5_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_6_bus_icon = L.icon({
        iconUrl: LINE_6_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_7_bus_icon = L.icon({
        iconUrl: LINE_7_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_8_bus_icon = L.icon({
        iconUrl: LINE_8_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_9_bus_icon = L.icon({
        iconUrl: LINE_9_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_10_bus_icon = L.icon({
        iconUrl: LINE_10_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_11_bus_icon = L.icon({
        iconUrl: LINE_11_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_12_bus_icon = L.icon({
        iconUrl: LINE_12_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_13_bus_icon = L.icon({
        iconUrl: LINE_13_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_14_bus_icon = L.icon({
        iconUrl: LINE_14_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

var line_15_bus_icon = L.icon({
        iconUrl: LINE_15_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
    });

/**********************************REAL TIME BUSES********************************/
var line_1_rt_bus_icon = L.icon({
        iconUrl: LINE_1_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_2_rt_bus_icon = L.icon({
        iconUrl: LINE_2_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_3_rt_bus_icon = L.icon({
        iconUrl: LINE_3_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_4_rt_bus_icon = L.icon({
        iconUrl: LINE_4_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_5_rt_bus_icon = L.icon({
        iconUrl: LINE_5_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_6_rt_bus_icon = L.icon({
        iconUrl: LINE_6_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_7_rt_bus_icon = L.icon({
        iconUrl: LINE_7_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_8_rt_bus_icon = L.icon({
        iconUrl: LINE_8_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_9_rt_bus_icon = L.icon({
        iconUrl: LINE_9_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_10_rt_bus_icon = L.icon({
        iconUrl: LINE_10_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_11_rt_bus_icon = L.icon({
        iconUrl: LINE_11_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_12_rt_bus_icon = L.icon({
        iconUrl: LINE_12_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_13_rt_bus_icon = L.icon({
        iconUrl: LINE_13_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_14_rt_bus_icon = L.icon({
        iconUrl: LINE_14_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

var line_15_rt_bus_icon = L.icon({
        iconUrl: LINE_15_RT_BUS_ICON,
        shadowUrl: '',
        iconSize: [28,28], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10,15], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [3, -12] // point from which the popup should open relative to the iconAnchor
});

//export {MAP_COORDINATES, MAP_ZOOM, MAP_MBATTR, MAP_MBURL};
//export {TRAMWAY_STATIONS_URL, TRAMWAY_STATIONS_REQUEST, REAL_TIME_TRAMAYS_URL, RT_TRAMWAYS_REQUEST, TRAM_PATH_URL, TRAM_PATH_REQUEST, TRAMWAY_TRACK_1, TRAMWAY_TRACK_2, REFRESH_TIMER}