<link rel="stylesheet" href="${pageContext.request.contextPath}/css/edit_user.css" type="text/css" > 
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
	<br>
	<h1>Modification du profil</h1>
	<div class="Table">
		<table>
			<h2>Modifiez vos données</h2>
			<div class="Input">
				<tr>
					<form method="post" action="ProcessRequest?id=edit_profile_confirmation&user_id=${loggedUser.id}">
						<input type="text" value="${ loggedUser.first_name }" name="first_name_edit">
						<input type="text" value="${ loggedUser.last_name }" name="last_name_edit">
						<select name="gender_edit" id="gender_edit">
	                        <option value="Homme">Homme</option>
	                        <option value="Femme">Femme</option>
	                        <option value="Autre">Autre</option>
	                    </select>
						<script>
							var elt = document.getElementById('gender_edit');
	                        //var elt = document.querySelector('select');
	                        elt.value = "${ loggedUser.gender }";
	                    </script>
						<input type="text" value="${ loggedUser.mail }" name="mail_edit">
						<input type="text" value="${ loggedUser.birth_date }" name="birth_date_edit">
	                    <select name="travel_habit_edit" id="travel_habit_edit">
	                    	<option value="A pieds">A pieds</option>
	                    	<option value="A velo">A velo</option>
	                    	<option value="En voiture">En voiture</option>
	                    	<option value="Transports en commun">Transports en commun</option>
	                    </select>
	                    <script>
							var elt = document.getElementById('travel_habit_edit');
	                        elt.value = "${ loggedUser.travel_habit }";
	                    </script>
	                    <select name="frequency_edit" id="frequency_edit">
	                    	<option value="1 fois par jour">1 fois par jour</option>
	                    	<option value="1 fois par semaine">1 fois par semaine</option>
	                    	<option value="1 fois par mois">1 fois par mois</option>
	                    	<option value="De temps en temps">De temps en temps</option>
	                    	<option value="Jamais">Jamais</option>
	                    </select>
	                    <script>
							var elt = document.getElementById('frequency_edit');
	                        elt.value = "${ loggedUser.frequency }";
	                    </script>
						<input type="submit" value="Modifier">
					</form>
					<c:out value='${feedback}'/>
				</tr>
			</div>
		</table>
		<br>
		<div class="mdp">
			<h2>Modifiez votre mot de passe</h2>
			<form method='POST' action="ProcessRequest?id=update_password&user_id=${loggedUser.id}">
			    <div class="Form">
			     <input name="old_password" type="password" placeholder="Ancien mot de passe" required/>
			     <input name="new_password" type="password" placeholder="Nouveau mot de passe" required/>
			     <input name="new_password_confirmation" type="password" placeholder="Confirmation du nouveau mot de passe" required/>
			     <input type="submit" id="validate" value="Valider"/>
				</div>
			</form>
		</div>
		<c:out value='${password_feedback}'/>
	</div>
	
