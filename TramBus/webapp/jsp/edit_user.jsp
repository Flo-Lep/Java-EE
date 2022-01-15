<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/edit_user.css" type="text/css" > 
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
    <br>
    <h1>ADMIN - PAGE D'EDITION</h1>
    <div class="Table">
        <table>
        <div class="Input">
            <tr>
                <form method="post" action="ProcessRequest?id=confirm_edit_user&user_id=${user.id}">
                
                    <input type="text" value="${ user.first_name }" name="first_name_edit">
                    <input type="text" value="${ user.last_name }" name="last_name_edit">
                    <select name="gender_edit" id="gender_edit">
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                        <option value="Autre">Autre</option>
                    </select>
					<script>
						var elt = document.getElementById('gender_edit');
                        //var elt = document.querySelector('select');
                        elt.value = "${ user.gender }";
                    </script>
                    <input type="text" value="${ user.mail }" name="mail_edit">
                    <input type="text" value="${ user.birth_date }" name="birth_date_edit">
                    <select name="travel_habit_edit" id="travel_habit_edit">
                    	<option value="A pieds">A pieds</option>
                    	<option value="A velo">A velo</option>
                    	<option value="En voiture">En voiture</option>
                    	<option value="Transports en commun">Transports en commun</option>
                    </select>
                    <script>
						var elt = document.getElementById('travel_habit_edit');
                        elt.value = "${ user.travel_habit }";
                    </script>
                    <select name="frequency_edit" id="frequency_edit">
                    	<option value="1 fois par jour">1 fois par jour</option>
                    	<option value="1 fois par semaine">1 fois par semaine</option>
                    	<option value="1 fois par mois">1 fois par mois</option>
                    	<option value="De temps en temps">De temps en temps</option>
                    	<option value="Jamais">Jamais</option>
                    </select>
                    <script>
						var elt = document.getElementById('frequency_edit');
                        elt.value = "${ user.frequency }";
                    </script>
                    <select name="status_edit" id="status_edit">
                    	<option value="0">Utilisateur</option>
                    	<option value="1">Administrateur</option>
                    	<option value="2">Data Scientist</option>
                    	<option value="3">Administrateur et Data Scientist</option>
                    </select>
                    <script>
						var elt = document.getElementById('status_edit');
                        elt.value = "${ user.status }";
                    </script>
                    <input type="submit" value="Confirm edit">
                </form>

            </tr>
        </div>
    </table>