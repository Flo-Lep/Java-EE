<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<link rel ="stylesheet" href="css/contact.css">
<br>

<form method="POST" action="ProcessRequest?id=reach&section=home">
<h1>${feedback}</h1>
<div class="Separation"></div> <!-- Add a separation line between contact us and form -->
  <h4>Cliquez sur le bouton ci-dessous pour revenir à l'accueil</h4>
   <div class="Footer-form">
    <input type="submit" value="Accueil">
  </div>
</form>
<br>