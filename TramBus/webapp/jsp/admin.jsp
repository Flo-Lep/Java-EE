<link rel="stylesheet" href="${pageContext.request.contextPath}/css/admin.css" type="text/css" >
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
	<br>
	<h1>PAGE ADMIN</h1>
	<h3>Gestionnaire de comptes</h3>
	<div class="Table">
		<table>
			<tr>
				<th>ID</th>
				<th>Prenom</th>
				<th>Nom</th>
				<th>Genre</th>
				<th>Mail</th>
				<th>Date de naissance</th>
				<th>Habitude de voyage</th>
				<th>Frequence</th>
				<th>Statut</th>
				<th>Activite</th>
				<th>Supprimer</th>
				<th>Editer</th>
			</tr>
			<c:forEach var="user" items="${ users }">
				<tr>
					<td><c:out value="${ user.id }"/></td>
					<td><c:out value="${ user.first_name }"/></td>
					<td><c:out value="${ user.last_name }"/></td>
					<td><c:out value="${ user.gender }"/></td>
					<td><c:out value="${ user.mail }"/></td>
					<td><c:out value="${ user.birth_date }"/></td>
					<td><c:out value="${ user.travel_habit }"/></td>
					<td><c:out value="${ user.frequency }"/></td>
					<td><c:out value="${ user.status }"/></td>
					<td><c:out value="${ user.activity }"/></td>
					<td><form method="post" action="ProcessRequest?id=delete_user&user_id=${user.id}"><input type="submit" value="Supprimer"></input></form></td>
					<td><form method="post" action="ProcessRequest?id=edit_user&user_id=${user.id}"><input type="submit" value="Editer"></input></form></td>
				</tr>
			</c:forEach>
		</table>
	</div>
	<br>
	<div class="Footer-form">
      	<input type="button" id="bouton" value="Ajouter un utilisateur" onclick="window.location = 'ProcessRequest?id=add_user';"/>
    </div>
    <br>
    <br>
    <div class="Contact">
	    <h3>Demandes de Contact</h3>
	    <div class="Table">
			<table>
				<tr>
					<th>Nom</th>
					<th>Mail</th>
					<th>Téléphone</th>
					<th>Message</th>
				</tr>
				<c:forEach var="contact" items="${ contacts }">
				<tr>
					<td><c:out value="${ contact.last_name }"/></td>
					<td><c:out value="${ contact.mail }"/></td>
					<td><c:out value="${ contact.phone }"/></td>
					<td><c:out value="${ contact.message }"/></td>
				</tr>
				</c:forEach>
			</table>
		</div>
	</div>
	<br>
	<br>
	<div class="DataScientist">
		<h3>Demandes pour DataScientist</h3>
	    <div class="Table">
	
			<table>
				<tr>
					<th>Nom</th>
					<th>Profession</th>
					<th>Entreprise</th>
					<th>Message</th>
				</tr>
				<c:forEach var="requestDS" items="${ requestsDS }">
				<tr>
					<td><c:out value="${ requestDS.name }"/></td>
					<td><c:out value="${ requestDS.job }"/></td>
					<td><c:out value="${ requestDS.company }"/></td>
					<td><c:out value="${ requestDS.message }"/></td>
				</tr>
				</c:forEach>
			</table>
		</div>
	</div>
		<div class="Alert">
		<h3>Alertes sur les lignes</h3>
	    <div class="Table">
	
			<table>
				<tr>
					<th>Nom</th>
					<th>Type de transport</th>
					<th>Lignes</th>
					<th>Station</th>
					<th>Type de Problème </th>
					<th>Message</th>
				</tr>
				<c:forEach var="alert" items="${ alerts }">
				<tr>
					<td><c:out value="${ alert.name }"/></td>
					<td><c:out value="${ alert.transport_type }"/></td>
					<td><c:out value="${ alert.line }"/></td>
					<td><c:out value="${ alert.station }"/></td>
					<td><c:out value="${ alert.type_problem }"/></td>
					<td><c:out value="${ alert.message }"/></td>
				</tr>
				</c:forEach>
			</table>
		</div>
	</div>
</body>
