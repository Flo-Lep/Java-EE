<link rel ="stylesheet" href="css/loggedIn.css">
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<br><br>
<div class="Connected">
		<h1>Welcome back <c:out value="${loggedUser.first_name } "/> !</h1>
		<br>
		<h3>Vous êtes correctement connecté</h3>
		<h3>Vous pouvez accéder à toutes les fonctionnalités du site</h3>
		<c:choose>
			<c:when test="${loggedUser.status==0}">
   				<td><c:out value="Profitez de votre compte Utilisateur"/></td>
			</c:when>
			<c:when test="${loggedUser.status==1}">
   				<td><c:out value="Profitez de votre compte Administrateur"/></td>
			</c:when>   
			<c:when test="${loggedUser.status==2}">
   				<td><c:out value="Profitez de votre compte Data scientist"/></td>
			</c:when>  
			<c:when test="${loggedUser.status==3}">
   				<td><c:out value="Profitez de votre compte Administrator & Data scientist"/></td>
			</c:when>      
			<c:otherwise>
  					<td><c:out value="Undefined"/></td>
			</c:otherwise>
		</c:choose>
</div>