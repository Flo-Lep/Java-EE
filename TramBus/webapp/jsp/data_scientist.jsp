<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="css/data_scientist.css">
<!--Chart.js JS CDN--> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>

<!-- Make sure you put this AFTER Leaflet's CSS -->		
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="crossorigin=""></script>
 		
<!-- js file for the layer tree of the map -->
<script src="js/L.Control.Layers.Tree.js"></script>

<!-- js Config file -->
<script src="js/config.js"></script>
		
<!-- js tramways file -->
<script src="js/utils.js"></script>
		
<!-- js file for the map -->
<script src="js/ajax_requests.js"></script>

<!-- js Map class -->
<script src="js/LeafletMap.js"></script>

<!-- js tramways file -->
<script src="js/tramways.js"></script>
		
<!-- js tramways file -->
<script src="js/buses.js"></script>

<!-- js file for the link to fontawesome to have the different icon -->
<script src="https://kit.fontawesome.com/9b6f8922d3.js" crossorigin="anonymous"></script>
<br>
<br>
<div class="dataScientistPage">
	<br>
	<h1 id="titre_dataScientistPage">Data Scientist Page<h1>
	<div id="mapContent" hidden>
		<canvas id='map'></canvas>
		<script src="js/main.js"></script>
	</div>
	<div>
		<label for="date">Date :</label>
		<input id="date" name="date" type="date">
		<label for="scope">Intervalle d'observation :</label>
		<input id="time" name="time" type="time">
		<select name="scope" id="scope">
		  <option value="1">1h</option>
		  <option value="3">3h</option>
		  <option value="6">6h</option>
		  <option value="24">Journee entiere</option>
		</select>
		<label for="scope">Ligne :</label>
		<select name="line" id="line">
		  <option value="1">Ligne 1 - ANGERS ROSERAIE</option>
		  <option value="2">Ligne 1 - VERNEAU / AVRILLE ARDENNE</option>
		</select>
	</div>

	<div>
		<canvas id="stationsChart"></canvas>
	</div>
</div>
<script src="js/DataScientistChart.js"></script>
<script src="js/charts.js"></script>
<div id="donwload_section">
	<h1 style="color:#fff">Téléchargement des données</h1>
	<select name="select_button_data" id="select_button_data" >
		 <option value="json">json</option>
		 <option value="csv">csv</option>
	</select>
	<input id="download_button_data" name="download_button_data" value="Télécharger" type="submit">
</div>
<script src="js/data_download.js" ></script>