<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="fr">
	<script src="https://kit.fontawesome.com/0e38b2ff5d.js" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="css/header.css"/>
	<body>
		<jsp:include page="header.jsp"/>
		<jsp:include page="menu.jsp"/>
		<jsp:include page="${content}.jsp"/>
		<jsp:include page="footer.jsp"/>	
	</body>
</html>