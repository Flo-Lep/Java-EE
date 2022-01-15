/*
INFO : This class uses Leaflet library in order to create a map object
It is too specific to our application and can be reviewed with more generic methods but we maybe won't have time to do it...'
*/

class LeafletMap{
	/*Data format :
		coordinates : Array [latitude : float, longitude : float] - Position of the map view
		zoom : int - The zoom level of the map when initialazing the map
		mbattr : String - Credits description on the right bottom of the map
		mburl : String - API token for map backgrounds (works without token)
	*/
	constructor(newCoordinates, newZoom, newMbattr, newMburl){
		this.coordinates = newCoordinates;
		this.zoom = newZoom;
		this.mbattr = newMbattr;
		this.mburl = newMburl;
		this.default_layer = L.tileLayer(this.mburl,{ maxZoom: 25, id: 'mapbox/streets-v11', tileSize: 512, zoomOffset:-1 , attribution : this.mbattr});
		this.map = L.map('map',{center:[this.coordinates[0],this.coordinates[1]], zoom:this.zoom, layers : [this.default_layer]});
		this.base_layers = {};
		this.overlays = {};
	};
	//METHODS
	init(){
		this.add_basic_layers();
		this.add_basic_overlays();
				
		this.layerControl = L.control.layers.tree(this.baseLayers, this.overlays, 
		{
			//add here options to the tree
			closedSymbol: '&#709;',
            openedSymbol: '&#708;'
		}
		).addTo(this.map).collapseTree(true);
		L.control.scale().addTo(this.map);
		//L.Control.extend({ position: 'bottomleft' },this.add_logo());
	}
	
	add_basic_layers(){
		this.baseLayers = {
			
			label : '&#128506; Background',
			children :[
				{label : 'Classic', layer : L.tileLayer(this.mburl,{ maxZoom: 25, id: 'mapbox/streets-v11', tileSize: 512, zoomOffset:-1 , attribution : this.mbattr})},
				{label : 'Outdoors', layer :L.tileLayer(this.mburl,{ maxZoom: 25, id: 'mapbox/outdoors-v11', tileSize: 512, zoomOffset:-1 , attribution : this.mbattr})},
				{label : 'Dark', layer :L.tileLayer(this.mburl,{ maxZoom: 25, id: 'mapbox/dark-v10', tileSize: 512, zoomOffset:-1 , attribution : this.mbattr})},
				{label : 'Light', layer :L.tileLayer(this.mburl,{ maxZoom: 25, id: 'mapbox/light-v10', tileSize: 512, zoomOffset:-1 , attribution : this.mbattr})},
				{label : 'Satellite', layer :L.tileLayer(this.mburl,{ maxZoom: 25, id: 'mapbox/satellite-streets-v11', tileSize: 512, zoomOffset:-1 , attribution : this.mbattr})}
			]
		/*Classic:L.tileLayer('https://{s}.tile.openstreetMAP.org/{z}/{x}/{y}.png'),
		Dark:L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png'),
		Dark_2 : L.tileLayer(this.mburl,{ maxZoom: 25, id: 'mapbox/dark-v10', tileSize: 512, zoomOffset:-1 , attribution : this.mbattr}),
		Streets : L.tileLayer(this.mburl,{ maxZoom: 25, id: 'mapbox/streets-v11', tileSize: 512, zoomOffset:-1 , attribution : this.mbattr}),
		Satellite : L.tileLayer(this.mburl,{ maxZoom: 25, id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset:-1 , attribution : this.mbattr}),
		Satellite_streets : L.tileLayer(this.mburl,{ maxZoom: 25, id: 'mapbox/satellite-streets-v11', tileSize: 512, zoomOffset:-1 , attribution : this.mbattr})*/
		}
	};

	add_basic_overlays(){
		//Tramways
		this.track_1_stations_overlay = L.layerGroup();
		this.track_2_stations_overlay = L.layerGroup();
		this.rt_tram_positions_overlay_1 = L.layerGroup();
		this.rt_tram_positions_overlay_2 = L.layerGroup();
		this.tram_path_overlay = L.layerGroup();
		//Buses --> TODO
		this.bus_line_1 = L.layerGroup();
		this.bus_line_2 = L.layerGroup();
		this.bus_line_3 = L.layerGroup();
		this.bus_line_4 = L.layerGroup();
		this.bus_line_5 = L.layerGroup();
		this.bus_line_6 = L.layerGroup();
		this.bus_line_7 = L.layerGroup();
		this.bus_line_8 = L.layerGroup();
		this.bus_line_9 = L.layerGroup();
		this.bus_line_10 = L.layerGroup();
		this.bus_line_11 = L.layerGroup();
		this.bus_line_12 = L.layerGroup();
		this.bus_line_13 = L.layerGroup();
		this.bus_line_14 = L.layerGroup();
		this.bus_line_15 = L.layerGroup();
		//Real time buses
		this.rt_bus_line_1 = L.layerGroup();
		this.rt_bus_line_2 = L.layerGroup();
		this.rt_bus_line_3 = L.layerGroup();
		this.rt_bus_line_4 = L.layerGroup();
		this.rt_bus_line_5 = L.layerGroup();
		this.rt_bus_line_6 = L.layerGroup();
		this.rt_bus_line_7 = L.layerGroup();
		this.rt_bus_line_8 = L.layerGroup();
		this.rt_bus_line_9 = L.layerGroup();
		this.rt_bus_line_10 = L.layerGroup();
		this.rt_bus_line_11 = L.layerGroup();
		this.rt_bus_line_12 = L.layerGroup();
		this.rt_bus_line_13 = L.layerGroup();
		this.rt_bus_line_14 = L.layerGroup();
		this.rt_bus_line_15 = L.layerGroup();
		//Pathes
		this.bus_line_path_1 = L.layerGroup();
		this.bus_line_path_2 = L.layerGroup();
		this.bus_line_path_3 = L.layerGroup();
		this.bus_line_path_4 = L.layerGroup();
		this.bus_line_path_5 = L.layerGroup();
		this.bus_line_path_6 = L.layerGroup();
		this.bus_line_path_7 = L.layerGroup();
		this.bus_line_path_8 = L.layerGroup();
		this.bus_line_path_9 = L.layerGroup();
		this.bus_line_path_10 = L.layerGroup();
		this.bus_line_path_11 = L.layerGroup();
		this.bus_line_path_12 = L.layerGroup();
		this.bus_line_path_13 = L.layerGroup();
		this.bus_line_path_14 = L.layerGroup();
		this.bus_line_path_15 = L.layerGroup();
		
		this.overlays = {
			
			label: ' &#128655; Transport',
			children:[
				{
					label : '&#128651; Tramways',
					children:[
						{
						label:'Lignes',
						children:[
							{label :"Ligne A - Angers Roseraie", layer : this.track_1_stations_overlay },
							{label : "Ligne A - Avrillé Ardenne", layer :this.track_2_stations_overlay }
						]
						},
						{
						label:"Tramways en temps réel",
						children:[
							{label : "Ligne A - Angers Roseraie", layer :this.rt_tram_positions_overlay_1.addTo(this.map)},
							{label : "Ligne A - Avrillé Ardenne", layer :this.rt_tram_positions_overlay_2.addTo(this.map)}
						]
					},
					{
						label:"Tracé",
						children:[
							{label : "Ligne A", layer :this.tram_path_overlay.addTo(this.map)},
						]
					}
					]
				},
				{
					label: '&#128652; Bus',
					children:[
						{
							label:'Lignes(1-15)',
							children:[
								{label :"01 - Monplaisir ↔︎ Belle Beille", layer : this.bus_line_1 },
								{label : "02 - Trélazé ↔︎ Banchais / St-Sylvain", layer :this.bus_line_2 },
								{label : "03 - Mûrs-Érigné ↔︎ Avrillé-Adézière", layer :this.bus_line_3 },
								{label : "04 - Beaucouzé - L’Atoll / Haute Roche ↔︎ St-Barthélemy", layer :this.bus_line_4 },
								{label : "05 - Ligne circulaire", layer :this.bus_line_5 },
								{label : "06 - Chantourteau / Bouchemaine ↔︎ ZI Est", layer :this.bus_line_6 },
								{label : "07 - Lorraine ↔︎ Montreuil - Juigné / Feneu", layer :this.bus_line_7 },
								{label : "08 - Mairie des Ponts-de-Cé / Vernusson ↔︎ CHU-Hôpital / Verneau AquaVita", layer :this.bus_line_8 },
								{label : "09 - Espace Anjou ↔︎ Eventard", layer :this.bus_line_9 },
								{label : "10 - ZI Trélazé / St Lézin / Sorges ↔︎ Schweitzer / Pôle 49", layer :this.bus_line_10 },
								{label : "11 - Ste Gemmes / Clinique de l’Anjou ↔︎ Lac de Maine", layer :this.bus_line_11 },
								{label : "12 - Moulin Marcille ↔︎ St Aubin La Salle", layer :this.bus_line_12 },
								{label : "13 - Montreuil-Domaine du Val ↔︎ Angers Les Gares", layer :this.bus_line_13 },
								{label : "14 - Belle-Beille ↔︎ Angers-Les Gares", layer :this.bus_line_14 },
								{label : "15 - Chantourteau ↔︎ Angers Les Gares", layer :this.bus_line_15 }
							]
						},
						{
							label:'Lignes(1-15) Bus en temps réel',
							children:[
								{label :"01 - Monplaisir ↔︎ Belle Beille", layer : this.rt_bus_line_1 },
								{label : "02 - Trélazé ↔︎ Banchais / St-Sylvain", layer :this.rt_bus_line_2 },
								{label : "03 - Mûrs-Érigné ↔︎ Avrillé-Adézière", layer :this.rt_bus_line_3 },
								{label : "04 - Beaucouzé - L’Atoll / Haute Roche ↔︎ St-Barthélemy", layer :this.rt_bus_line_4 },
								{label : "05 - Ligne circulaire", layer :this.rt_bus_line_5 },
								{label : "06 - Chantourteau / Bouchemaine ↔︎ ZI Est", layer :this.rt_bus_line_6 },
								{label : "07 - Lorraine ↔︎ Montreuil - Juigné / Feneu", layer :this.rt_bus_line_7 },
								{label : "08 - Mairie des Ponts-de-Cé / Vernusson ↔︎ CHU-Hôpital / Verneau AquaVita", layer :this.rt_bus_line_8 },
								{label : "09 - Espace Anjou ↔︎ Eventard", layer :this.rt_bus_line_9 },
								{label : "10 - ZI Trélazé / St Lézin / Sorges ↔︎ Schweitzer / Pôle 49", layer :this.rt_bus_line_10 },
								{label : "11 - Ste Gemmes / Clinique de l’Anjou ↔︎ Lac de Maine", layer :this.rt_bus_line_11 },
								{label : "12 - Moulin Marcille ↔︎ St Aubin La Salle", layer :this.rt_bus_line_12 },
								{label : "13 - Montreuil-Domaine du Val ↔︎ Angers Les Gares", layer :this.rt_bus_line_13 },
								{label : "14 - Belle-Beille ↔︎ Angers-Les Gares", layer :this.rt_bus_line_14 },
								{label : "15 - Chantourteau ↔︎ Angers Les Gares", layer :this.rt_bus_line_15 }
							]
						},
						{
							label:'Lignes(1-15) Tracés',
							children:[
								{label :"01 - Monplaisir ↔︎ Belle Beille", layer : this.bus_line_path_1 },
								{label : "02 - Trélazé ↔︎ Banchais / St-Sylvain", layer :this.bus_line_path_2 },
								{label : "03 - Mûrs-Érigné ↔︎ Avrillé-Adézière", layer :this.bus_line_path_3 },
								{label : "04 - Beaucouzé - L’Atoll / Haute Roche ↔︎ St-Barthélemy", layer :this.bus_line_path_4 },
								{label : "05 - Ligne circulaire", layer :this.bus_line_path_5 },
								{label : "06 - Chantourteau / Bouchemaine ↔︎ ZI Est", layer :this.bus_line_path_6 },
								{label : "07 - Lorraine ↔︎ Montreuil - Juigné / Feneu", layer :this.bus_line_path_7 },
								{label : "08 - Mairie des Ponts-de-Cé / Vernusson ↔︎ CHU-Hôpital / Verneau AquaVita", layer :this.bus_line_path_8 },
								{label : "09 - Espace Anjou ↔︎ Eventard", layer :this.bus_line_path_9 },
								{label : "10 - ZI Trélazé / St Lézin / Sorges ↔︎ Schweitzer / Pôle 49", layer :this.bus_line_path_10 },
								{label : "11 - Ste Gemmes / Clinique de l’Anjou ↔︎ Lac de Maine", layer :this.bus_line_path_11 },
								{label : "12 - Moulin Marcille ↔︎ St Aubin La Salle", layer :this.bus_line_path_12 },
								{label : "13 - Montreuil-Domaine du Val ↔︎ Angers Les Gares", layer :this.bus_line_path_13 },
								{label : "14 - Belle-Beille ↔︎ Angers-Les Gares", layer :this.bus_line_path_14 },
								{label : "15 - Chantourteau ↔︎ Angers Les Gares", layer :this.bus_line_path_15 }
							]
						}
					]
				}
			]
			}
    	};

		get_line_overlay(line_number){
			switch(line_number) {
				case 1:
					return this.bus_line_1;
			  	case 2:
			    	return this.bus_line_2;
			  	case 3:
			    	return this.bus_line_3;
				case 4:
			    	return this.bus_line_4;
				case 5:
			    	return this.bus_line_5;
				case 6:
			    	return this.bus_line_6;
				case 7:
			    	return this.bus_line_7;
				case 8:
			    	return this.bus_line_8;
				case 9:
			    	return this.bus_line_9;
				case 10:
			    	return this.bus_line_10;
				case 11:
			    	return this.bus_line_11;
				case 12:
			    	return this.bus_line_12;
				case 13:
			    	return this.bus_line_13;
				case 14:
			    	return this.bus_line_14;
				case 15:
			    	return this.bus_line_15;
			  default:
			    return null;
			}
		};
		
		get_rt_line_overlay(line_number){
			switch(line_number) {
				case 1:
					return this.rt_bus_line_1;
			  	case 2:
			    	return this.rt_bus_line_2;
			  	case 3:
			    	return this.rt_bus_line_3;
				case 4:
			    	return this.rt_bus_line_4;
				case 5:
			    	return this.rt_bus_line_5;
				case 6:
			    	return this.rt_bus_line_6;
				case 7:
			    	return this.rt_bus_line_7;
				case 8:
			    	return this.rt_bus_line_8;
				case 9:
			    	return this.rt_bus_line_9;
				case 10:
			    	return this.rt_bus_line_10;
				case 11:
			    	return this.rt_bus_line_11;
				case 12:
			    	return this.rt_bus_line_12;
				case 13:
			    	return this.rt_bus_line_13;
				case 14:
			    	return this.rt_bus_line_14;
				case 15:
			    	return this.rt_bus_line_15;
			  default :
				console.log("ERROR : getting rt bus overlay --> Line number : ",line_number);
			    return null;
			}
		};
		
		get_path_line_overlay(line_number){
			switch(line_number) {
				case 1:
					return this.bus_line_path_1;
			  	case 2:
			    	return this.bus_line_path_2;
			  	case 3:
			    	return this.bus_line_path_3;
				case 4:
			    	return this.bus_line_path_4;
				case 5:
			    	return this.bus_line_path_5;
				case 6:
			    	return this.bus_line_path_6;
				case 7:
			    	return this.bus_line_path_7;
				case 8:
			    	return this.bus_line_path_8;
				case 9:
			    	return this.bus_line_path_9;
				case 10:
			    	return this.bus_line_path_10;
				case 11:
			    	return this.bus_line_path_11;
				case 12:
			    	return this.bus_line_path_12;
				case 13:
			    	return this.bus_line_path_13;
				case 14:
			    	return this.bus_line_path_14;
				case 15:
			    	return this.bus_line_path_15;
			  default :
				console.log("ERROR : getting rt bus overlay --> Line number : ",line_number);
			    return null;
			}
		};
		
		get_path_color(line_number){
			//=>TODO
			switch(line_number) {
				case 1:
					return "#64b656";
			  	case 2:
			    	return "#3a7cc1";
			  	case 3:
			    	return "#e58226";
				case 4:
			    	return "#904196";
				case 5:
			    	return "#f8dc0a";
				case 6:
			    	return "#5b5d4a";
				case 7:
			    	return "#919acd";
				case 8:
			    	return "#b5823f";
				case 9:
			    	return "#d9118c";
				case 10:
			    	return "#9dcc96";
				case 11:
			    	return "#59a4dc";
				case 12:
			    	return "#d38fbc ";
				case 13:
			    	return "#a6c559";
				case 14:
			    	return "#d9212b";
				case 15:
			    	return "#e16882";
			  default:
			    return null;
			}
		};
		
		get_line_icon(line_number){
			switch(line_number) {
				case 1:
					return line_1_bus_icon;
			  	case 2:
			    	return line_2_bus_icon;
			  	case 3:
			    	return line_3_bus_icon;
				case 4:
			    	return line_4_bus_icon;
				case 5:
			    	return line_5_bus_icon;
				case 6:
			    	return line_6_bus_icon;
				case 7:
			    	return line_7_bus_icon;
				case 8:
			    	return line_8_bus_icon;
				case 9:
			    	return line_9_bus_icon;
				case 10:
			    	return line_10_bus_icon;
				case 11:
			    	return line_11_bus_icon;
				case 12:
			    	return line_12_bus_icon;
				case 13:
			    	return line_13_bus_icon;
				case 14:
			    	return line_14_bus_icon;
				case 15:
			    	return line_15_bus_icon;
			  default:
			    return null;
			}
		};
		
		get_rt_line_icon(line_number){
			switch(line_number) {
				case 1:
					return line_1_rt_bus_icon;
			  	case 2:
			    	return line_2_rt_bus_icon;
			  	case 3:
			    	return line_3_rt_bus_icon;
				case 4:
			    	return line_4_rt_bus_icon;
				case 5:
			    	return line_5_rt_bus_icon;
				case 6:
			    	return line_6_rt_bus_icon;
				case 7:
			    	return line_7_rt_bus_icon;
				case 8:
			    	return line_8_rt_bus_icon;
				case 9:
			    	return line_9_rt_bus_icon;
				case 10:
			    	return line_10_rt_bus_icon;
				case 11:
			    	return line_11_rt_bus_icon;
				case 12:
			    	return line_12_rt_bus_icon;
				case 13:
			    	return line_13_rt_bus_icon;
				case 14:
			    	return line_14_rt_bus_icon;
				case 15:
			    	return line_15_rt_bus_icon;
			  default:
				console.log("ERROR : Retrieving rt line icon --> line number : ",line_number);
			    return null;
			}
		};
	}
//export {Map};






/*-------------------------TO GO FURTHER IN CLASS DEV (MORE GENERIC FUNCTIONS)-------------------*/
/*add_layers(layers){
		layers.forEach(layerString =>{
			let data = 
			this.base_layers.push();
		});
		this.base_layers = {
			
		}
}*/
	
/*this.all_overlays = [];
		let ov_1 = {'track_1_stations_overlay' : L.layerGroup()};
		let ov_2 = {'track_2_stations_overlay' : L.layerGroup()};
		let ov_3 = {'rt_tram_positions_overlay_1' : L.layerGroup()};
		let ov_4 = {'rt_tram_positions_overlay_2' : L.layerGroup()};
		let ov_5 = {'tram_path_overlay' : L.layerGroup()};
		this.all_overlays.push(ov_1,ov_2,ov_3,ov_4,ov_5);
		this.overlays = {
		"Dir 1 stations": this.all_overlays[0],
		"Dir 2 stations": this.all_overlays[1],
		"Tram path": this.all_overlays[2],
		"Dir 1 Real time tramways": this.all_overlays[3],
		"Dir 2 Real time tramways": this.all_overlays[4]
    	};*/

/*	get_overlay(overlayString){
		/*let index = this.all_overlays.indexOf(overlayString);
		console.log("index : ",index);
		return index;
		let overlay;
		this.all_overlays.forEach(element=>{
			if(overlayString in element){
				return 
			}
		});
	}*/