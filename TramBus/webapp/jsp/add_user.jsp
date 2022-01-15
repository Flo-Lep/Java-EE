<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="css/registration.css"> 
      <br>
      <h1>ADMIN - NOUVEL UTILISATEUR</h1>
      <form method="post" action="ProcessRequest?id=register">
      <h2>Nouvel Utilisateur</h2>
      <div class="Separation"></div> <!-- Add a separation line between contact us and form -->
      <div class="Form">
      	<div class="Left">

      		<div class="group">
	            <input type="text" name="first_name" placeholder="Prénom" required/>
	            <i class="fas fa-user"></i>
			</div>

			<div class="group">
	            <input type="email" name="mail" placeholder="E-Mail" required/>
	            <i class="fas fa-envelope"></i>
			</div>
			<div class="group">
            	<input type="password" name="password" placeholder="Mot de passe" required/>
           		<i class="fas fa-key"></i>
			</div>
			<div class="group">
				<div class="select_button1">
					<select name="gender" id="gender" required>
						<option value="" disabled selected>Genre</option>
						<option value="Homme">Homme</option>
		                <option value="Femme">Femme</option>
		                <option value="Autre">Autre</option>
					</select>
				</div>
			</div>
			<div class="group">
            	<div class="select_button1">
	            	<select name="travel_habit" id="Travel habits" required>
	            		<option value="" disabled selected>Habitudes de transports</option>
		                <option value="pieds">A pieds</option>
		                <option value="velo">A vélo</option>
		                <option value="voiture">En voiture</option>
		                <option value="transports en commun">Transports en commun</option>
	            	</select>
            	</div><br>
			</div>
		</div>
		<div class="Right">
		    <div class="group">
	            <input type="text" name="last_name" placeholder="Nom" required/>
	            <i class="fas fa-user"></i>
			</div>
			<div class="group">
	            <input type="date" name="birth_date" placeholder="Naissance (mm/dd/yy)" required/>
	            <i class="fas fa-birthday-cake"></i>
			</div>
			<div class="group">
            	<input type="password" placeholder="Confirmation mot de passe" required/>
           		<i class="fas fa-key"></i>
			</div>
			<div class="group">
           		<div class="select_button2">
           			<select name="frequency" id="Travel fraquency" required>
           			<option value="" disabled selected>Fréquence</option>
                		<option value="1 fois par jour">1 fois par jour</option>
                		<option value="1 fois par semaine">1 fois par semaine</option>
                		<option value="1 fois par mois">1 fois par mois</option>
                		<option value="episodic">De temps en temps</option>
                		<option value="jamais">Jamais</option>
               		</select>
           		</div>
          	</div>
		</div>
      </div>
      <div class="Footer-form">
      	<input type="submit" id="bouton" value="Créer"/>
      </div>
    </form>