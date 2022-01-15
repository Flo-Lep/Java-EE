<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel ="stylesheet" href="css/datascientist_request.css">
<br>
<form method="POST" action="ProcessRequest?id=data_scientist_request_confirmation&user_id=${loggedUser.id}">
<h1>Devenez data-scientist !</h1>
<div class="Separation"></div> <!-- Add a separation line between contact us and form -->
  <div class="Form">
    <div class="Left">
      <div class="group">
        <input type="text" placeholder="Profession" name="profession" required/>
        <i class="fas fa-user"></i>
      </div>
      <div class="group">
        <input type="text"placeholder="Nom entreprise" name="entreprise" required />
        <i class="fas fa-envelope"></i>
      </div>
    </div>
    <div class="Right">
      <div class="group">
        <label>Description</label>
        <textarea placeholder="Motivez votre demande ici ..." name="message" required></textarea>
      </div>
    </div>
  </div>
  <div class="Footer-form">
    <input type="submit" value="Envoyer">
  </div>
</form>
<br>