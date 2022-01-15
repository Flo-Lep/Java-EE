<meta charset="UTF-8">
<link rel ="stylesheet" href="css/profile.css">
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<br><br>
<h1>Mon profil</h1>
<div class="Table">
	<table>
			<tr>
				<th>ID</th>
				<th>Prénom</th>
				<th>Nom</th>
				<th>Genre</th>
				<th>Mail</th>
				<th>Date de naissance</th>
				<th>Habitude de transport</th>
				<th>Fréquence</th>
				<th>Statut</th>
				</div>
			</tr>
			<tr>
				<td><c:out value="${ user.id }"/></td>
				<td><c:out value="${ user.first_name }"/></td>
				<td><c:out value="${ user.last_name }"/></td>
				<td><c:out value="${ user.gender }"/></td>
				<td><c:out value="${ user.mail }"/></td>
				<td><c:out value="${ user.birth_date }"/></td>
				<td><c:out value="${ user.travel_habit }"/></td>
				<td><c:out value="${ user.frequency }"/></td>
				<c:choose>
    				<c:when test="${user.status==0}">
        				<td><c:out value="User"/></td>
    				</c:when>
    				<c:when test="${user.status==1}">
        				<td><c:out value="Admin"/></td>
    				</c:when>   
    				<c:when test="${user.status==2}">
        				<td><c:out value="Data scientist"/></td>
    				</c:when>  
    				<c:when test="${user.status==3}">
        				<td><c:out value="Admin & Data scientist"/></td>
    				</c:when>      
    				<c:otherwise>
       					<td><c:out value="Undefined"/></td>
    				</c:otherwise>
				</c:choose>
			</tr>
</table>	
</div>
<c:if test="${rating==true}">
	<h1>Mes évaluations</h1>
	<div class="Table">
		<table>
				<tr>
					<th>ID Commentaire</th>
					<th>Station</th>
					<th>Ligne</th>
					<th>Etoile</th>
					<th>Commentaire</th>
					<th>Supprimer</th>
					<th>Modifier</th>
				</tr>
				
				<c:forEach var="rate" items="${list_rate }">
					<tr>
						<td><c:out value="${ rate.id}"/></td>
						<td><c:out value="${ rate.station_name}"/></td>
						<td><c:out value="${ rate.station_line}"/></td>
						<td><c:out value="${ rate.rating_stars}"/></td>
						<td><c:out value="${ rate.rating_comment}"/></td>
						<td><form method="post" action="ProcessRequest?id=delete_rating&id_rating=${rate.id}&user_id=${loggedUser.id}"><input type="submit" value="Supprimer"></input></form></td>
						<td><form method="post" action="ProcessRequest?id=edit_rating&id_rating=${rate.id}"><input type="submit" value="Editer"></input></form></td>
					</tr>
				</c:forEach> 
		</table>	
	</div>
</c:if>
<c:choose>
		<c:when test="${user.status==1}"> <!-- Admin -->
			<div class="button1">
    			<input type="button" id="bouton" value="Admin page" onclick="window.location = 'ProcessRequest?id=admin'"/>
    		</div>
		</c:when>
		<c:when test="${user.status==2}"> <!-- Datascientist -->
			<div class="button1">
    			<input type="button" id="bouton" value="Data Scientist page" onclick="window.location = 'ProcessRequest?id=data_scientist'"/>
    		</div>
		</c:when>
		<c:when test="${user.status==3}"> <!-- Datascientist and Admin -->
			<div class="button1">
    			<input type="button" id="bouton" value="Admin page" onclick="window.location = 'ProcessRequest?id=admin'"/><br>
    		</div>
    		<div class="button2">
    			<input type="button" id="bouton" value="Data Scientist page" onclick="window.location = 'ProcessRequest?id=data_scientist'"/>
    		</div>
		</c:when>      
		<c:otherwise>
		</c:otherwise>
</c:choose>	
<div class="button3">
	<input type="submit" id="edit_profile_button" value="Modifier mon profil" onclick="window.location = 'ProcessRequest?id=reach&section=edit_profile'"/>
</div>
<div class="button4">
	<input type="submit" id="suspend_button" value="Suspendre mon compte" onclick="window.location = 'ProcessRequest?id=suspend_account'"/>
</div>
<div class="button5">
	<input type="submit" id="delete_button" value="Supprimer mon compte" onclick="window.location = 'ProcessRequest?id=delete_account&user_id=${ user.id }'"/>
</div>
<div class="button2">
	<input type="button" id="boutonDataScientist" value="Devenir Datascientist" onclick="window.location = 'ProcessRequest?id=reach&section=datascientist_request'"/>
</div>
<div class="button6">
	<input type="submit" id="download_button_user" value="Télécharger les données de mon compte"/>
</div>
<script src="./js/FileSaver.min.js"></script>
<script>
	document.getElementById("download_button_user").addEventListener("click",function(){
		var content = "Bienvenue sur votre document "+"${ loggedUser.first_name }"+","+
						"\n\nVous y trouverez toutes les informations concernant votre compte sur TramBus :\n\n"+
						"Prénom : "+"${ loggedUser.first_name }\n"+
						"Nom : "+"${ loggedUser.last_name }\n"+
						"Genre : "+"${ loggedUser.gender }\n"+
						"Mail : "+"${ loggedUser.mail }\n"+
						"Date de naissance : "+"${ loggedUser.birth_date }\n"+
						"Habitude de transport : "+"${ loggedUser.travel_habit }\n"+
						"Fréquence : "+"${ loggedUser.frequency }\n\n\n"
						+"Toute l'équipe de TramBus vous remercie pour la confiance que vous nous accordez !";
		var filename = "${ loggedUser.first_name }"+"_"+"${ loggedUser.last_name }"+".txt";
		
		var blob = new Blob([content], {
			type: "text/plain;charset=utf-8"
		});
		
		saveAs(blob,filename);
	},false);
</script>
