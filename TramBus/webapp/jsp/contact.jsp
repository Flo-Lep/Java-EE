<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel ="stylesheet" href="css/contact.css">
<br>
<form method="POST" action="ProcessRequest?id=contact">
<h1>Contactez nous !</h1>
<div class="Separation"></div> <!-- Add a separation line between contact us and form -->
  <div class="Form">
    <div class="Left">
      <div class="group">
        <input type="text" placeholder="Nom" name="last_name" required/>
        <i class="fas fa-user"></i>
      </div>
      <div class="group">
        <input type="email"placeholder="E-Mail" name="mail" required/>
        <i class="fas fa-envelope"></i>
      </div>
      <div class="group">
      	<input type="tel" placeholder="Téléphone" name="phone" pattern="[0-9]{10}"required>
<!--         <input type="text" placeholder="Téléphone" name="phone" required/> -->
        <i class="fas fa-mobile"></i>
      </div>
    </div>
    <div class="Right">
      <div class="group">
        <label>Message</label>
        <textarea placeholder="Ecrivez votre message ici..." name="message" required></textarea>
      </div>
    </div>
    
  </div>
  
  <div class="Footer-form">
    <input type="submit" value="Envoyer">
  </div>
</form>
<br>