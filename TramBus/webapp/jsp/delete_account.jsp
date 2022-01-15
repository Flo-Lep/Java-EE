<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<link rel ="stylesheet" href="css/contact.css">
<br>
<form method="POST" action="ProcessRequest?id=delete_account_confirmation&user_id=${ loggedUser.id }">
<h1>Attention !</h1>
<div class="Separation"></div> <!-- Add a separation line between contact us and form -->
  <h1>Vous êtes sur le point de supprimer votre compte</h1>
  <h4>Confirmez la suppression en appuyant sur le bouton</h4>
  
  <div class="Footer-form">
    <input type="submit" value="Supprimer mon compte">
  </div>
</form>
<br>