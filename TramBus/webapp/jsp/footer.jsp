<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<br><br><br><br>
<meta charset="UTF-8">
<link rel ="stylesheet" href="css/footer.css">
<footer>
<c:choose>
	<c:when test="${logged==true}">
 		<div class="circular">
        <div class="toggle"><ion-icon name="add-outline"></ion-icon></div>
            <li style="--i:0;">
                <a href="ProcessRequest?id=reach&section=info"><ion-icon name="information-outline">info</ion-icon></a>
            </li>
            <li style="--i:1;">
                <a href="ProcessRequest?id=reach&section=edit_profile"><ion-icon name="create-outline"></ion-icon></a>
            </li>
            <li style="--i:2;">
                <a href="ProcessRequest?id=delete_account&user_id=${loggedUser.id}"><ion-icon name="trash-outline"></ion-icon></a>
            </li>
            <li style="--i:3;">
                <a href="ProcessRequest?id=reach&section=home"><ion-icon name="home-outline"></ion-icon></a>
            </li>
            <li style="--i:4;">
                <a href="ProcessRequest?id=reach&section=map"><ion-icon name="map-outline"></ion-icon></a>
            </li>
            <li style="--i:5;">
                <a href="ProcessRequest?id=reach&section=contact"><ion-icon name="chatbubbles-outline"></ion-icon></a>
            </li>
            <li style="--i:6;">
                <a href=""><ion-icon name="download-outline" id="download_button"></ion-icon></a>
            </li>
            <li style="--i:7;">
                <a href="ProcessRequest?id=logout"><ion-icon name="log-out-outline"></ion-icon></a>
            </li>
    	</div>
    	<div class="Foot"><a href="ProcessRequest?id=reach&section=contact">Nous contacter</a></div>
	    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
	    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>	
    	<script>
        let toggle = document.querySelector('.toggle');
        let menu = document.querySelector('.circular');
        toggle.onclick = function(){
            menu.classList.toggle('active')
        }
	    </script>
	 	<script src="/TramBus/js/FileSaver.min.js"></script>
		<script>
			document.getElementById("download_button").addEventListener("click",function(){
				var content = "Bienvenue sur votre document "+"${ loggedUser.first_name }"+","+
								"\n\nVous y trouverez toutes les informations concernant votre compte sur TramBus :\n\n"+
								"Prénom : "+"${ loggedUser.first_name }\n"+
								"Nom : "+"${ loggedUser.last_name }\n"+
								"Genre : "+"${ loggedUser.gender }\n"+
								"Mail : "+"${ loggedUser.mail }\n"+
								"Date de naissance : "+"${ loggedUser.birth_date }\n"+
								"Habitude de transport : "+"${ loggedUser.travel_habit }\n"+
								"Fréquence : "+"${ loggedUser.frequency }\n\n\n"
								+"Toute l'équipe de TramBus vous remercie pour la confiance que vous nous accordez !";
				var filename = "${ loggedUser.first_name }"+"_"+"${ loggedUser.last_name }"+".txt";
				
				var blob = new Blob([content], {
					type: "text/plain;charset=utf-8"
				});
				
				saveAs(blob,filename);
			},false);
		</script>
	</c:when>
	<c:otherwise>
		<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
	    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>	
       	<div class="Foot"><a href="ProcessRequest?id=reach&section=contact">Nous contacter</a></div>
       	<br><br>
   	</c:otherwise>
</c:choose>
</footer>
