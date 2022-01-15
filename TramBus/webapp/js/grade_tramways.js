/**
 *  
 */


var a = 1;
function show_notation(){ /* Function to show the div which is used to note the tram */
	if (a==1){

	    document.getElementById("grade_tramways").style.display = "inline";
	    //document.getElementById("notation_tram").style.opacity = 1;
	
	    return a = 0;
	}
}

function hide_notation(){ /* Function to hide the div which is used to note the tram */
	if (a==0) {
	    document.getElementById("grade_tramways").style.display = "none";

	    //document.getElementById("notation_tram").style.opacity = 0;

		for (let index = 1; index <= 5; index++) {
            	document.getElementById("star_"+index).classList.remove("couleur");   
            }
	    return a = 1;
	}
}

document.onclick = function (event) {			
		//console.log(event);
		try{
			stars_managment(event);
			comment_rating();
		}
		catch(error){
			//
		}
};



function stars_managment(event){
	
	// show notation lateral band
	arretTram_test = event.path[2].innerText;
	tableau_arretTram_test = arretTram_test.split(" ");
	if (tableau_arretTram_test[0].localeCompare('Arrêt') == 0){
		
		split_tableau = arretTram_test.split("×");
		if (split_tableau.length == 2){
			
			bindPopup = event.path[2].innerText;
			infoStationTram = bindPopup.split("\n");
			infoLineTram = infoStationTram[1].replace(":","");
			
			infoArretTram = infoStationTram[0].split(":");
			infoArretText = infoArretTram[0];
			infoNomArretTram = infoArretTram[1];
			
			//document.getElementById("info_station_tram_arret").innerHTML = infoArretText  + ":";
			document.getElementById("info_station_tram_nom_arret").innerHTML = infoNomArretTram;
			document.getElementById("info_station_tram_ligne").innerHTML = infoLineTram;
			document.getElementById("formRating_station_name").value = infoNomArretTram;
			document.getElementById("formRating_station_line").value = infoLineTram;
			
			
		}else if (split_tableau.length == 3){

			bindPopup = split_tableau[1];		
			infoStationTram = bindPopup.split("\n");
			
			infoNomStationTram = infoStationTram[1].split(":");
			infoArretText = infoNomStationTram[0];
			infoNomArretTram = infoNomStationTram[1];	
			
			//document.getElementById("info_station_tram_arret").innerHTML = infoArretText  + ":";
			document.getElementById("info_station_tram_nom_arret").innerHTML = infoNomArretTram;
			document.getElementById("info_station_tram_ligne").innerHTML = infoLineTram;
			document.getElementById("formRating_station_name").value = infoNomArretTram;
			document.getElementById("formRating_station_line").value = infoLineTram;

		}
		
		show_notation()
		console.log(infoNomArretTram);
		servletRequestNotation("ProcessRequest?id=getStationRating&name_station="+infoNomArretTram+"");
	}
	
	/*
		// show notation lateral band
		if (event.path[0].className == "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive"){		
	
			//let bindPopup = "";
			bindPopup = event.path[2].innerText;
			
			infoStationTram = bindPopup.split("\n");
			infoLineTram = infoStationTram[1].replace(":","");
			
			infoArretTram = infoStationTram[0].split(":");
			infoArretText = infoArretTram[0];
			infoNomArretTram = infoArretTram[1];
			
			document.getElementById("info_station_tram_arret").innerHTML = infoArretText  + ":";
			document.getElementById("info_station_tram_nom_arret").innerHTML = infoNomArretTram;
			document.getElementById("info_station_tram_ligne").innerHTML = infoLineTram;
			show_notation();
		}
	*/
	
	// JS for the stars notation 
	if (event.path[0].className == "fa fa-star" || event.path[0].className == "fa fa-star couleur"){	
		
		for (let index = 1; index <= 5; index++){
        	document.getElementById("star_"+index).classList.remove("couleur"); 

			if(event.path[0].id == "star_"+index){
				for (let id_star = index; id_star >= 1; id_star--)
				{
					document.getElementById("star_"+id_star).classList.add("couleur");
					document.getElementById("formRating_rating_stars").value = event.path[0].id;
				}	
			}  
        }
	}
}

function comment_rating(){
	value_textarea = document.getElementById("commentaire_opinion").value;
	document.getElementById("formRating_rating_comment").value = value_textarea;
}

function sendToJs(return_servletRequest){

	return_servletRequest = return_servletRequest.replace('[','');
	return_servletRequest = return_servletRequest.replace(']','');
	return_servletRequest = return_servletRequest.replace('[','');
	return_servletRequest = return_servletRequest.replace(']','');
	var tab_servletRequest = return_servletRequest.split(",");
	console.log("tab_servletRequest : " + tab_servletRequest);
	if (tab_servletRequest == ""){
		div_commentaireUtilisateur.innerHTML = "<p id='innerHTML_notation'>Il n\'y a pas encore de commentaire sur cette station, Soyez le premier à la noter !</p>";
		document.getElementById("innerHTML_notation").style = "padding : 8px; text-align:center; font-size:15px;";
	}else {
		div_commentaireUtilisateur.innerHTML = "";
		for (let i = 0; i < tab_servletRequest.length; i++) {
			let div_commentaireUtilisateur = document.getElementById("div_commentaireUtilisateur");
			
		  tableau_Commentaire = tab_servletRequest[i].split(":");
	
			if(i>0){
				var newDiv = document.createElement("div");
			  newDiv.setAttribute("id", "ligne"+[i]+"");
			  div_commentaireUtilisateur.appendChild(newDiv);
			  document.getElementById("ligne"+[i]+"").style = "border-bottom: 2px solid #4169E1;";
			}
		 		
		  var newDiv = document.createElement("div");
		  newDiv.setAttribute("id", "nomUtilisateur "+[i]+"");	  
	      div_commentaireUtilisateur.appendChild(newDiv);
	      document.getElementById("nomUtilisateur "+[i]+"").style = "font-weight: bold; padding-top: 10px";
		  document.getElementById("nomUtilisateur "+[i]+"").innerHTML = tableau_Commentaire[0];
	
		  var newDiv = document.createElement("div");
		  newDiv.setAttribute("id", "etoileUtilisateur "+[i]+"");
		  div_commentaireUtilisateur.appendChild(newDiv);
		  e = document.getElementById("etoileUtilisateur "+[i]+"");
	
		  	etoile_blanche =  '<i class="fa fa-star" style="font-size:20px; color: #fff; padding: 0.1rem;"></i>';
			etoile_jaune =  '<i class="fa fa-star" style="font-size:20px; color: yellow; padding: 0.1rem;"></i>';
			etoile_total = ""; 
			
			if (tableau_Commentaire[2] == 'star_1'){
				etoile_total = etoile_jaune + etoile_blanche + etoile_blanche + etoile_blanche + etoile_blanche;
			}
			if (tableau_Commentaire[2] == 'star_2'){
				etoile_total = etoile_jaune + etoile_jaune + etoile_blanche + etoile_blanche + etoile_blanche;
			}
			if (tableau_Commentaire[2] == 'star_3'){
				etoile_total = etoile_jaune + etoile_jaune + etoile_jaune + etoile_blanche + etoile_blanche;
			}
			if (tableau_Commentaire[2] == 'star_4'){
				etoile_total = etoile_jaune + etoile_jaune + etoile_jaune + etoile_jaune + etoile_blanche;
			}
			if (tableau_Commentaire[2] == 'star_5'){
				etoile_total = etoile_jaune + etoile_jaune + etoile_jaune + etoile_jaune + etoile_jaune;
			}
			e.innerHTML = etoile_total;
	
	      var newDiv = document.createElement("div");
		  newDiv.setAttribute("id", "commentaireUtilisateur "+[i]+"");
	      div_commentaireUtilisateur.appendChild(newDiv);
		  document.getElementById("commentaireUtilisateur "+[i]+"").innerHTML = tableau_Commentaire[3];
	      document.getElementById("commentaireUtilisateur "+[i]+"").style = "padding-top:10px; padding-bottom:10px;";
		}
	}
}


//JS for the popup button (help)
window.onload=function(){
	
	
	
	const buttonPopup = document.getElementById("buttonPopup");
	const overlayPopup = document.getElementById("overlayPopup");
	const buttonCloseHelp = document.getElementById("buttonCloseHelp");
	
	const buttonProblem = document.getElementById("buttonProblem");
	const overlayProblem = document.getElementById("overlayProblem");
	const buttonCloseProblem = document.getElementById("buttonCloseProblem");
	
	buttonPopup.addEventListener("click",openModalPopup);
	buttonCloseHelp.addEventListener("click",closeModalPopup);
	
	buttonProblem.addEventListener("click",openModalProblem);
	buttonCloseProblem.addEventListener("click",closeModalProblem);
}

function openModalPopup(){
    overlayPopup.style.display = 'block';
}
function closeModalPopup(){
    overlayPopup.style.display = 'none';
}

function openModalProblem(){
    overlayProblem.style.display = 'block';
}
function closeModalProblem(){
    overlayProblem.style.display = 'none';
	previousStep();
	if(document.getElementById('busLineSelect_ID')){
		document.getElementById('busLineSelect_ID').remove();
	}
	
	if(document.getElementById('select_tramStation_ID')){
		document.getElementById('select_tramStation_ID').remove();
	}
	//document.getElementById("firstStep").style.marginLeft = "70px";
	//document.querySelector('input[name=choixTramBus]').value = "problem";
}
	
function loadTramBusStation(){ /* JS FUNCTION to load the different bus and tram station in a select */
 	
	window.scrollTo({ top: 0, behavior: 'smooth',}); // go back to the top of the page 

	// First part with the Tram Station
	var tramStation = document.getElementById('tramStationSelect');

	let arret_tram = new Array();
	for(var j=0 ; j< _tramway_stations.length ; j++){
		if (arret_tram.indexOf(_tramway_stations[j].fields.stop_name) === -1){
			arret_tram.push(_tramway_stations[j].fields.stop_name);
		}
	}
	arret_tram.sort(); // sort the table
	arret_tram.reverse(); // reverse the table
	arret_tram.push('Choose the Tram Station ...');
		
	
 	 var combo = document.createElement('select');
	combo.name = "select_tramStation";
	combo.id = "select_tramStation_ID"
	combo.style.textAlignLast = "center";
	combo.style.borderRadius = "5px";
	combo.style.border = "3px solid #4169E1";
	combo.style.fontSize = "15px";
	combo.style.padding = "5px";

	  while(arret_tram.length)
	  {
	      var couleur = arret_tram.pop();
	      var opt = new Option(couleur, couleur);
	      combo.options[combo.options.length] = opt;
	  }
	  tramStation.appendChild(combo);


	// Second part with the Bus Line
	var busLine = document.getElementById('busLineSelect');
	
	let ligne_bus = new Array();
	
	try{
		for(var j=0 ; j < _buses_stations.length ; j++){			
			if (isNaN(_buses_stations[j][0].fields.mnemoligne) == false){
				if (parseInt(_buses_stations[j][0].fields.mnemoligne) <= 15){
					ligne_bus.push(_buses_stations[j][0].fields.mnemoligne+" "+_buses_stations[j][0].fields.nomligne);
				}
			}	
		}
	}
	catch(error){}
	
	ligne_bus.reverse();
	ligne_bus.push("Choose the Bus line ...");
	
	
	  var comboBusLine = document.createElement('select');
	comboBusLine.id = "busLineSelect_ID";
	comboBusLine.style.textAlignLast = "center";
	comboBusLine.style.borderRadius = "5px";
	comboBusLine.style.border = "3px solid #4169E1";
	comboBusLine.style.fontSize = "12px";
	comboBusLine.style.padding = "5px";
	comboBusLine.style.marginBottom = "-5px";
	
	
	 while(ligne_bus.length)
	 {
	     var couleur = ligne_bus.pop();
	     var opt = new Option(couleur, couleur);
	     comboBusLine.options[comboBusLine.options.length] = opt;
	 }
	 busLine.appendChild(comboBusLine);
	
	const selectBusLine = document.querySelector('#busLineSelect');
	
	selectBusLine.addEventListener('change', (event) => {
		
		value_numeroBusLine = event.target.value;
		tableauBusLine = value_numeroBusLine.split(" ");
		value_BusLine = tableauBusLine[0];
		show_selectStationBus(parseInt(value_BusLine));
	});
}

function show_selectStationBus(numero_ligne){
	
	// Third part with the Bus Station
	document.getElementById("chooseBusStation").style.display = "block";
	document.getElementById("popupProblem").style.height = "485px";
	
	busStation = document.getElementById('busStationSelect');
	
	let station_bus = new Array();

	for(var j=0 ; j < _buses_stations[numero_ligne].length ; j++){
		if (station_bus.indexOf(_buses_stations[numero_ligne][j].fields.nomarret) === -1){
			station_bus.push(_buses_stations[numero_ligne][j].fields.nomarret);	
		}			
	}
	
	station_bus.sort();
	station_bus.reverse();
	station_bus.push("Choose the Bus Station ...");
	
	  var comboBusStation = document.createElement('select');
	comboBusStation.id = "select_busStation_ID";
	comboBusStation.style.textAlignLast = "center";
	comboBusStation.style.borderRadius = "5px";
	comboBusStation.style.border = "3px solid #4169E1";
	comboBusStation.style.fontSize = "12px";
	comboBusStation.style.padding = "5px";
	comboBusStation.style.marginBottom = "-5px";
	
	
	 while(station_bus.length)
	 {
	     var couleur = station_bus.pop();
	     var opt = new Option(couleur, couleur);
	     comboBusStation.options[comboBusStation.options.length] = opt;
	 }
	 busStation.appendChild(comboBusStation);
}


/*------------------------ Signal Problem ------------------------ 
//const choixTramBus = document.getElementById("choixTramBus");

var choixTransport = document.querySelector('input[name=choixTramBus]:checked').value;
document.getElementById('chooseTransport').onclick = function() {
   console.log(choixTransport);
	
	if(choixTransport == "tram"){
		console.log("button was clicked TRAMMMMMMMMM");
	}
	if(choixTransport == "bus"){
		console.log("button was clicked BUSSSSSSSS");
	}	
}​;​
*/

function transportLabel(){
	document.getElementById("popupProblem").style.transition = "height 0.4s ease";
	
	valueTransport = document.querySelector('input[name=choixTramBus]:checked').value;
	if (valueTransport == "tram"){
		document.getElementById("chooseLineTram").style.display = "block";
		document.getElementById("chooseLineBus").style.display = "none";
		document.getElementById("chooseTramStation").style.display = "block";
		document.getElementById("popupProblem").style.height = "505px";
		document.getElementById("chooseBusStation").style.display = "none";
	}
	else if(valueTransport == "bus"){
		document.getElementById("chooseLineBus").style.display = "block";
		document.getElementById("chooseLineTram").style.display = "none";
		document.getElementById("chooseTramStation").style.display = "none";
		document.getElementById("popupProblem").style.height = "366px";
	}
}


const firstStep =  document.getElementById("firstStep");
const secondStep =  document.getElementById("secondStep");
//const nextStep = document.getElementById("nextStepProblem");


function nextStep(){ 
	
	if (valueTransport != null && select_tramStation_ID.value != "Choose the Tram Station ..." || valueTransport != null && busLineSelect_ID.value != "Choose the Bus line ..." && select_busStation_ID.value != "Choose the Bus Station ..."){
		document.getElementById("firstStep").style.marginLeft = "-268px";
		document.getElementById("popupProblem").style.height = "361px";
		document.getElementById("popupProblem").style.transition = "height 0.4s ease";
		document.getElementById("firstStep").style.transition = "margin-left 0.7s";
	}else {
		alert("Vous n'avez pas rempli tous les champs !");
	}	
}

function previousStep(){
	document.getElementById("firstStep").style.marginLeft = "80px";
	document.getElementById("popupProblem").style.height = "248px";
	document.getElementById("chooseProblem").checked = true;
	document.getElementById("chooseLineTram").style.display = "none";
	document.getElementById("chooseLineBus").style.display = "none";
	document.getElementById("chooseTramStation").style.display = "none";
	document.getElementById("chooseBusStation").style.display = "none";
		
	//document.getElementById("select_tramStation_ID").remove();
}

function buttonConfirm(){
	
	if(select_TypeProblem.value != "Problem" && document.getElementById("messageProblem").value != ""){
		document.getElementById('type_Transport_ID').value = valueTransport;
		console.log(document.getElementById('type_Transport_ID').value);
		if(valueTransport == "bus"){
			document.getElementById("bus_tram_station_line_ID").value = value_numeroBusLine;
			document.getElementById("bus_tram_station_name_ID").value = select_busStation_ID.value;
		}else if (valueTransport == "tram"){
			document.getElementById("bus_tram_station_line_ID").value = "Ligne A";
			document.getElementById("bus_tram_station_name_ID").value = select_tramStation_ID.value;
		}
		document.getElementById("select_type_problem_ID").value  = select_TypeProblem.value;
		document.getElementById("message_problem_ID").value  = messageProblem.value;
		document.getElementById("FormSignalerProbleme_ID").submit();
	}else {
		alert("Vous n'avez pas rempli tous les champs !");
	}
}

























