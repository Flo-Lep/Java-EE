<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<link rel ="stylesheet" href="css/contact.css">
<br>
<form method="POST" action="ProcessRequest?id=forgotten_password_confirmation">
<h1>Mot de passe oublié</h1>
<div class="Separation"></div> <!-- Add a separation line between contact us and form -->
  <h3>Veuillez entrer votre adresse email afin de recevoir un mail de recuperaction de mot de passe</h3>
  <input type="email" name="email" placeholder="email">
  <div class="Footer-form">
    <input type="submit" value="Valider">
  </div>
</form>
<br>