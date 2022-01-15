<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<link rel ="stylesheet" href="css/map.css">
<link rel ="stylesheet" href="css/footer.css">

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="crossorigin=""/>
   				
<link rel = "stylesheet" href = "css/L.Control.Layers.Tree.css"/>

<c:choose>
  		<c:when test="${logged==true}">
		<!-- Make sure you put this AFTER Leaflet's CSS -->
	
		<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="crossorigin=""></script>
				
		<!-- js file for the layer tree of the map -->
		<script src="js/L.Control.Layers.Tree.js"></script>
		
		<!-- js Config file -->
		<script src="js/config.js"></script>
		
		<!-- js Map class -->
		<script src="js/LeafletMap.js"></script>
				
		<!-- js tramways file -->
		<script src="js/utils.js"></script>
				
		<!-- js file for the map -->
		<script src="js/ajax_requests.js"></script>
		
		<!-- js tramways file -->
		<script src="js/tramways.js"></script>
				
		<!-- js tramways file -->
		<script src="js/buses.js"></script>
		
		<!-- js file for the link to fontawesome to have the different icon -->
		<script src="https://kit.fontawesome.com/9b6f8922d3.js" crossorigin="anonymous"></script>
				
		<!-- js file for the different functions about the notation -->
		<script src="js/grade_tramways.js"></script>
		
		<section>
			<div id="grade_tramways">
			
               <i onclick="hide_notation()" class="fas fa-times"></i>
               
               <h2 id="titleLateralBand">Donnez-nous votre avis !</h2>
               
               <!--<p id="info_station_tram_arret"></p>     -->       
               <p id="info_station_tram_nom_arret"></p>   
                <p id="info_station_tram_ligne"></p> 
               <!--<p id="info_clique">test</p>  --> 
			   
			   
               <div class="rating">
					<div class="stars">
						<i class="fa fa-star" id="star_1"></i>
						<i class="fa fa-star" id="star_2"></i>
						<i class="fa fa-star" id="star_3"></i>
						<i class="fa fa-star" id="star_4"></i>
						<i class="fa fa-star" id="star_5"></i>
					</div>
          		</div>
          		
          		<textarea id="commentaire_opinion" name="commentaire"  placeholder="Laissez un petit commentaire ..."></textarea><br>
          		
          		<div class="scroller">
          			<p>Avis : </p>
          			<div id="div_commentaireUtilisateur"></div>    			
          		</div>
          		
          		 <form action = "ProcessRequest?id=rating" method = "POST"> <!-- form to get the info about the rating User experience  -->
			         <input type = "text" name = "station_name" id="formRating_station_name" style="display:none;">
			         <input type = "text" name = "station_line" id="formRating_station_line" style="display:none;">
			         <input type = "text" name = "rating_stars" id="formRating_rating_stars" style="display:none;">
			         <input type = "text" name = "rating_comment" id="formRating_rating_comment" style="display:none;">
			         <input type = "submit" id="button_valider" value="Valider">
		      	 </form>
		      	
          		<!-- <button id="button_valider">Confirm</button> -->
          	</div>
          	
			<div id="map">
				<script src="js/main.js"></script>
			</div>
		</section>
		
		<div id="popupMap">
			<button id="buttonPopup" class ="buttonHelpProblem">Coup de pouce pour la carte ?</button>
		    <div id="overlayPopup" class="overlay">
		    
		        <div id="popupHelp" class="popup">
			        <div class="Tilte">
			        	<h2>Comment utiliser la carte
			                <span id="buttonCloseHelp" class="buttonClose">&times;</span>
			            </h2>
			        </div>
			        <div class="Scroller">
						<scroll-container>
							<scroll-page id="page-1">Pour utiliser la carte, vous trouverez un onglet en haut à droite qui vous permettra d'afficher plusieurs menus. 
            											Il y a tout d'abord l'onglet fond &#128506; qui vous permet de changer le fond de la carte grâce à différents 
            														designs puis l'onglet transport &#128655; qui regroupe les tramways et les bus.
            				</scroll-page>
							<scroll-page id="page-2">Dans l'onglet "Tramways" &#128651; vous trouverez :
								- "Lignes" permettant d'afficher les arrêts du tramway dans les deux directions
								- "Tramways en temps réel" permettant d'afficher la position en temps réel des tramways
								- "Tracé" affichant le tracé de la ligne
							</scroll-page>
							<scroll-page id="page-3">
								Vous trouverez aussi un onglet "Bus" &#128652; avec :
								- "Lignes" permettant d'afficher les arrêts des bus sur les différentes lignes
								- "Bus en temps réel" permettant d'afficher la position des bus en temps réel
							</scroll-page>
						</scroll-container>
					</div>
		        </div>
		    </div>    
		    
			<button id="buttonProblem" class ="buttonHelpProblem"  onclick="loadTramBusStation()">Signaler un problème</button>
		    <div id="overlayProblem" class="overlay">
		    
		   
		    
		        <div id="popupProblem" class="popup">
		            <h2>Signaler un problème 
		                <span id="buttonCloseProblem" class="buttonClose">&times;</span>
		            </h2>
		            <div id="formProblem">
			            <div id="firstStep">
				            <div id="chooseTransport" class="partsProblem">
					            <p>Choisissez le type de transport : </p>
					            <input type="radio" name="choixTramBus" id="chooseProblem" value="problem" checked="checked" style="display:none;">
					            <input type="radio" name="choixTramBus" id="problemTram" value="tram" onclick="transportLabel()"  style="margin-top:30px;">
					            <label for="problemTram" class="labelTramBus">
					            	Tram
					            </label>
					            <input type="radio" name="choixTramBus" id="problemBus" value="bus" onclick="transportLabel()">
					        	<label for="problemBus" class="labelTramBus">
					        		Bus
					        	</label>
								
								<div class="result"></div>
				            </div>
				             	
				        	<div id="chooseLineTram"  class="partsProblem">
					        	<p style="margin-bottom:13px;">Choisissez la ligne  : </p>
					            <label type="radio" class="labelTramBus" style="background-color:#4169E1;">
					            	Ligne A
					            </label>
				        	</div>
				        	
				        	<div id="chooseTramStation" class="partsProblem">
				        		<label for="tramStationSelect">Choisissez une station de Tram :</label>
				        		<!-- Select in grade_tramways.js -->
								<form name="tramStationSelect" id="tramStationSelect" style="margin-top:10px;"></form>
				        	</div>
				        	
				        	<div id="chooseLineBus" class="partsProblem">
				        		<label for="busLineSelect">Choisissez une ligne de Bus :</label>
				        		<!-- Select in grade_tramways.js -->
								<form name="busLineSelect" id="busLineSelect"></form>
				        	</div>
				        	
				        	<div id="chooseBusStation" class="partsProblem">
				        		<label for="busStationSelect">Choisissez une station de Bus :</label>
				        		<!-- Select in grade_tramways.js -->
								<form name="busStationSelect" id="busStationSelect"></form>
				        	</div>
				        	
				        	<button type="submit" class="buttonHelpProblem" id="nextStepProblem" onclick="nextStep()">SUIVANT</button>	
			            </div>
			            
			            <div id="secondStep">
				    		<div id="chooseTypeProblem" class="partsProblem">
					        	<p style="margin-bottom:10px;">Choisissez le problème : </p>
					            <select name="chooseTypeProblem" id="select_TypeProblem" class="selectCSS">
								    <option value="Problem" disabled selected>Problème</option>
								    <option value="deterioration">Détérioration</option>
								    <option value="danger">Danger</option>
								    <option value="risk">Risque</option>
								    <option value="other">Autre</option>
								</select>
				        	</div>
				        	<div id="leaveComment" class="partsProblem">
				        		<p style="margin-bottom:5px;">Laissez un commentaire </p>
				        		<textarea id="messageProblem" name="messageProblem" placeholder="Your message ..." style="margin-bottom:-15px;"></textarea>
				        	</div>
				        	<button id="buttonPrevious" class="buttonHelpProblem" onclick="previousStep()">PRÉCÉDENT</button><button type="submit" id="buttonConfirm" class="buttonHelpProblem" onclick="buttonConfirm()">VALIDER</button> <!-- window.location = 'ProcessRequest?id=alert'; -->
				        	<form name = "SignalerProbleme" action="ProcessRequest?id=alert&user_id=${loggedUser.id}" method="POST" id="FormSignalerProbleme_ID" style="display:none;">
				        		 <input type = "text" name = "type_Transport" id="type_Transport_ID">
				        		 <input type = "text" name = "bus_tram_station_line" id="bus_tram_station_line_ID">
				        		 <input type = "text" name = "bus_tram_station_name" id="bus_tram_station_name_ID">
				        		
				        		 <input type = "text" name = "select_type_problem" id="select_type_problem_ID">
						         <input type = "text" name = "message_problem" id="message_problem_ID">
						         
						         <input type = "submit" id="button_valider" value="Valider">
				        	</form>	
						</div>	
					</div>
		    	</div>	
		    </div>
		</div>
		<!-- DATASCIENTIST SLIDER -->
		<c:if test="${loggedUser.status==2 || loggedUser.status==3}">
			<!-- <div class="datascientistSlider"> -->
	        	<div class="slidecontainer">
	        		<h2>Data Scientist slider</h2>
	        		<input type="date" id="sliderDate" style="margin-top:5px;">
	        		<input type="time" id="sliderTime">
	        		<input type="checkbox" id="tramway_checkbox" name="tramway_checkbox">
	        		<label for="tramway_checkbox">Tramways</label>
					<input type="checkbox" id="bus_checkbox" name="bus_checkbox">
					<label for="bus_checkbox">Bus</label><br>
	  				<input type="range" min="0" max="59" value="50" class="slider" id="myRange" style="margin-top:10px;">
	  				<p>Timestamp : <span id="timestamp"></span></p>
	  				<input type="submit" onclick="update_markers_data(tramwaysTimer, busesTimer, map)" value="Valider" id="button_valider_DataScientist">
				</div>
				<script src="js/dataScientist.js"></script>
			<!-- </div> -->
    	</c:if>
  		</c:when>    
  		<c:otherwise>
     		<h3>Veuillez vous connecter ou vous inscrire afin d'accéder aux fonctionnalités du site<br>Rendez-vous dans l'onglet connexion puis créer un compte si vous n'êtes toujours pas inscrit !</h3>
  		</c:otherwise>
</c:choose>	