<link rel ="stylesheet" href="css/login.css">
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<br>
<h1>Quel plaisir de vous revoir !</h1>
<form method='POST' action="ProcessRequest?id=login">
<h2>Se connecter</h2>
<c:if test ="${failed==true}"><c:out value="Mot de passe ou login incorrect"/></c:if>
<div class="Separation"></div> <!-- Add a separation line between contact us and form -->
    <div class="Form">
    	<div class="Left">
	<div class="group">
           <input name ="login" type="email"placeholder="E-Mail" value="${ login }" required/>
           <i class="fas fa-envelope"></i>
	</div>
</div>
<div class="Right">
	<div class="group">
          	<input name="password" type="password" placeholder="Mot de passe" required/>
         		<i class="fas fa-key"></i>
	</div>
</div>
    </div>
<div class="Footer-form">
	<input type="submit" id="bouton" value="Connexion" onclick="window.location = 'ProcessRequest?id=login';"/>
</div>
<div class="Admin">
    <input type="button" id="bouton" value="Mot de passe oublié" onclick="window.location = 'ProcessRequest?id=forgotten_password_form'"/>
</div>
<div class="No_account">
	<a href="ProcessRequest?id=reach&section=register">Créer un compte</a><br><br>
</div>
</form>