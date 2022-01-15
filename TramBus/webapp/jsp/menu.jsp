
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
	<div class="Navigation">
	       <ul>
	       <c:choose>
			<c:when test="${content=='home'}">
		        	<li class="list active">
			            <a href="ProcessRequest?id=reach&section=home">
			                <span class="icon">
			                	<ion-icon name="home-outline"></ion-icon>
			                </span>
			                <span class="text">Accueil</span>
			            </a>
			        </li>
		        	<li class="list">
		                <a href="ProcessRequest?id=reach&section=map">
		                    <span class="icon">
		                    	<ion-icon name="map-outline"></ion-icon>
		                    </span>
		                    <span class="text">Carte</span>
		                </a>
		            </li>
		            <c:if test="${logged==true}">
		            	<li class="list">
		               		<a href="ProcessRequest?id=logout">
		                   		<span class="icon">
		                       		<ion-icon name="log-in-outline"></ion-icon>
		                   		</span>
		                   		<span class="text">Deconnexion</span>
		               		</a>
		           		</li>
		            </c:if>
		            <c:if test="${logged!=true}">
		            	<li class="list">
		            	<a href="ProcessRequest?id=reach&section=login">
		                    		<span class="icon">
		                        		<ion-icon name="log-in-outline"></ion-icon>
		                    		</span>
		                    		<span class="text">Connexion</span>
		                		</a>
		            		</li>
		            </c:if>
		            <c:if test="${logged==true}">
		       			<li class="list">
		               		<a href="ProcessRequest?id=profile&user_id=${loggedUser.id}">
		                   		<span class="icon">
									<ion-icon name="information-circle-outline"></ion-icon>
		                  		</span>
		                   		<span class="text">${loggedUser.first_name}</span>
		               		</a>
		           		</li>
		            </c:if>
		            <c:if test="${logged!=true}">
		            	<li class="list">
			              	<a href="ProcessRequest?id=reach&section=info">
			                  	<span class="icon">
									<ion-icon name="information-circle-outline"></ion-icon>
			                 	</span>
			                  	<span class="text">Info</span>
			              	</a>
		          		</li>
		            </c:if>
			</c:when>
			<c:when test="${content=='map'}">
		 		<li class="list">
			            <a href="ProcessRequest?id=reach&section=home">
			                <span class="icon">
			                    <ion-icon name="home-outline"></ion-icon>
			                </span>
			                <span class="text">Accueil</span>
			            </a>
			        </li>
		        	<li class="list active">
		                <a href="ProcessRequest?id=reach&section=map">
		                    <span class="icon">
		                        <ion-icon name="map-outline"></ion-icon>
		                    </span>
		                    <span class="text">Carte</span>
		                </a>
		            </li>
		            <c:if test="${logged==true}">
		            	<li class="list">
		               		<a href="ProcessRequest?id=logout">
		                   		<span class="icon">
		                       		<ion-icon name="log-in-outline"></ion-icon>
		                   		</span>
		                   		<span class="text">Deconnexion</span>
		               		</a>
		           		</li>
		            </c:if>
		            <c:if test="${logged!=true}">
		            	<li class="list">
		            	<a href="ProcessRequest?id=reach&section=login">
		                    		<span class="icon">
		                        		<ion-icon name="log-in-outline"></ion-icon>
		                    		</span>
		                    		<span class="text">Connexion</span>
		                		</a>
		            		</li>
		            </c:if>
		            <c:if test="${logged==true}">
		       			<li class="list">
		               		<a href="ProcessRequest?id=profile&user_id=${loggedUser.id}">
		                   		<span class="icon">
								<ion-icon name="information-circle-outline"></ion-icon>
		                  			</span>
		                   		<span class="text">${loggedUser.first_name}</span>
		               		</a>
		           		</li>
		            </c:if>
		            <c:if test="${logged!=true}">
		            	<li class="list">
			              	<a href="ProcessRequest?id=reach&section=info">
			                  	<span class="icon">
								<ion-icon name="information-circle-outline"></ion-icon>
			                 	</span>
			                  	<span class="text">Info</span>
			              	</a>
		          		</li>
		            </c:if>
			</c:when>   
			<c:when test="${content=='login'}">
		 		<li class="list">
			            <a href="ProcessRequest?id=reach&section=home">
			                <span class="icon">
			                    <ion-icon name="home-outline"></ion-icon>
			                </span>
			                <span class="text">Accueil</span>
			            </a>
			        </li>
		        	<li class="list">
		                <a href="ProcessRequest?id=reach&section=map">
		                    <span class="icon">
		                        <ion-icon name="map-outline"></ion-icon>
		                    </span>
		                    <span class="text">Carte</span>
		                </a>
		            </li>
		            <c:if test="${logged==true}">
		            	<li class="list active">
		               		<a href="ProcessRequest?id=logout">
		                   		<span class="icon">
		                       		<ion-icon name="log-in-outline"></ion-icon>
		                   		</span>
		                   		<span class="text">Deconnexion</span>
		               		</a>
		           		</li>
		            </c:if>
		            <c:if test="${logged!=true}">
		            	<li class="list active">
		            	<a href="ProcessRequest?id=reach&section=login">
		                    		<span class="icon">
		                        		<ion-icon name="log-in-outline"></ion-icon>
		                    		</span>
		                    		<span class="text">Connexion</span>
		                		</a>
		            		</li>
		            </c:if>
		            <c:if test="${logged==true}">
		       			<li class="list">
		               		<a href="ProcessRequest?id=profile&user_id=${loggedUser.id}">
		                   		<span class="icon">
								<ion-icon name="information-circle-outline"></ion-icon>
		                  			</span>
		                   		<span class="text">${loggedUser.first_name}</span>
		               		</a>
		           		</li>
		            </c:if>
		            <c:if test="${logged!=true}">
		            	<li class="list">
			              	<a href="ProcessRequest?id=reach&section=info">
			                  	<span class="icon">
								<ion-icon name="information-circle-outline"></ion-icon>
			                 	</span>
			                  	<span class="text">Info</span>
			              	</a>
		          		</li>
		            </c:if>
			</c:when>  
			<c:when test="${content=='profile' || content=='info'}">
		 		<li class="list">
			            <a href="ProcessRequest?id=reach&section=home">
			                <span class="icon">
			                    <ion-icon name="home-outline"></ion-icon>
			                </span>
			                <span class="text">Accueil</span>
			            </a>
			        </li>
		        	<li class="list">
		                <a href="ProcessRequest?id=reach&section=map">
		                    <span class="icon">
		                        <ion-icon name="map-outline"></ion-icon>
		                    </span>
		                    <span class="text">Carte</span>
		                </a>
		            </li>
		            <c:if test="${logged==true}">
		            	<li class="list">
		               		<a href="ProcessRequest?id=logout">
		                   		<span class="icon">
		                       		<ion-icon name="log-in-outline"></ion-icon>
		                   		</span>
		                   		<span class="text">Deconnexion</span>
		               		</a>
		           		</li>
		            </c:if>
		            <c:if test="${logged!=true}">
		            	<li class="list">
		            	<a href="ProcessRequest?id=reach&section=login">
		                    		<span class="icon">
		                        		<ion-icon name="log-in-outline"></ion-icon>
		                    		</span>
		                    		<span class="text">Connexion</span>
		                		</a>
		            		</li>
		            </c:if>
		            <c:if test="${logged==true}">
		       			<li class="list active">
		               		<a href="ProcessRequest?id=profile&user_id=${loggedUser.id}">
		                   		<span class="icon">
								<ion-icon name="information-circle-outline"></ion-icon>
		                  			</span>
		                   		<span class="text">${loggedUser.first_name}</span>
		               		</a>
		           		</li>
		            </c:if>
		            <c:if test="${logged!=true}">
		            	<li class="list active">
			              	<a href="ProcessRequest?id=reach&section=info">
			                  	<span class="icon">
								<ion-icon name="information-circle-outline"></ion-icon>
			                 	</span>
			                  	<span class="text">Info</span>
			              	</a>
		          		</li>
		            </c:if>
			</c:when>     
			<c:otherwise>
				<li class="list active">
			            <a href="ProcessRequest?id=reach&section=home">
			                <span class="icon">
			                    <ion-icon name="home-outline"></ion-icon>
			                </span>
			                <span class="text">Accueil</span>
			            </a>
			        </li>
		        	<li class="list">
		                <a href="ProcessRequest?id=reach&section=map">
		                    <span class="icon">
		                        <ion-icon name="map-outline"></ion-icon>
		                    </span>
		                    <span class="text">Carte</span>
		                </a>
		            </li>
		            <c:if test="${logged==true}">
		            	<li class="list">
		               		<a href="ProcessRequest?id=logout">
		                   		<span class="icon">
		                       		<ion-icon name="log-in-outline"></ion-icon>
		                   		</span>
		                   		<span class="text">Deconnexion</span>
		               		</a>
		           		</li>
		            </c:if>
		            <c:if test="${logged!=true}">
		            	<li class="list">
		            	<a href="ProcessRequest?id=reach&section=login">
		                    		<span class="icon">
		                        		<ion-icon name="log-in-outline"></ion-icon>
		                    		</span>
		                    		<span class="text">Connexion</span>
		                		</a>
		            		</li>
		            </c:if>
		            <c:if test="${logged==true}">
		       			<li class="list">
		               		<a href="ProcessRequest?id=profile&user_id=${loggedUser.id}">
		                   		<span class="icon">
								<ion-icon name="information-circle-outline"></ion-icon>
		                  			</span>
		                   		<span class="text">${loggedUser.first_name}</span>
		               		</a>
		           		</li>
		            </c:if>
		            <c:if test="${logged!=true}">
		            	<li class="list">
			              	<a href="ProcessRequest?id=reach&section=info">
			                  	<span class="icon">
								<ion-icon name="information-circle-outline"></ion-icon>
			                 	</span>
			                  	<span class="text">Info</span>
			              	</a>
		          		</li>
		            </c:if>
			</c:otherwise>
			</c:choose>
			<div class="Indicator">
            </div>
	       </ul>
	   </div>
    <script>
        const list = document.querySelectorAll('.list');
        function activeLink(){
            list.forEach((item) => item.classList.remove('active'));
            this.classList.add('active');
        }
        list.forEach((item) => item.addEventListener('mouseover',activeLink));
    </script>
