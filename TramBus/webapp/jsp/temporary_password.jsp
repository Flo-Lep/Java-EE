<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<link rel ="stylesheet" href="css/contact.css">
<br>

<form method="POST" action="ProcessRequest?id=reach&section=home">
<h1>Un mot de passe temporaire vous a été attribué, veillez à bien le conserver car il ne vous sera transmis qu'une seule fois. Utilisez-le à votre prochaine connexion.</h1>
<div class="Separation"></div> <!-- Add a separation line between contact us and form -->
  <h4>Mot de passe temporaire : ${temporary_password}</h4>
   <div class="Footer-form">
    <input type="submit" value="Accueil">
  </div>
</form>
<br>