<link rel ="stylesheet" href="css/login.css">
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<br>
<h1>Changez votre mot de passe</h1>
<form method='POST' action="ProcessRequest?id=update_temp_password">
<div class="Separation"></div> <!-- Add a separation line between contact us and form -->
    <div class="Form">
     <input name ="email" type="email"placeholder="E-Mail" value="" required/>
     <input name="temporary_password" type="password" placeholder="Mot de passe temporaire" required/>
     <input name="new_password" type="password" placeholder="Nouveau mot de passe" required/>
     <input type="submit" id="validate" value="Valider"/>
</div>
</form>