<link rel="stylesheet" href="${pageContext.request.contextPath}/css/edit_user.css" type="text/css" > 
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
	<br>
	<h1>Modifier Notation Station</h1>
	<div class="Table">
		<div class="Input">
			<tr>
				<form method="post" action="ProcessRequest?id=edit_rating_confirmation&user_id=${loggedUser.id}&id_rating=${rating_element.id}">
					<input type="text" value="${ rating_element.station_name }" readonly>
					<input type="text" value="${ rating_element.station_line }" readonly>
					 <select name="stars_edit" id="stars_edit">
                    	<option value="star_1">1 etoile</option>
                    	<option value="star_2">2 etoiles</option>
                    	<option value="star_3">3 etoiles</option>
                    	<option value="star_4">4 etoiles</option>
                    	<option value="star_5">5 etoiles</option>
                    </select>
					<input type="text" value="${ rating_element.rating_comment }" name="comment_edit" required>
					<input type="submit" value="Modifier">
				</form>
			</tr>
		</div>
	</table>
