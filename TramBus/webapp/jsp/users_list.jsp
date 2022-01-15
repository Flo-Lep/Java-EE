<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>User list</title>
</head>
<body>
	<h1>USERS :</h1>
	<ul>
		<c:forEach var="user" items="${ users }">
			<li><c:out value="${ user.first_name }"/>
			<c:out value="${ user.last_name }"/></li>
		</c:forEach>
	</ul>
</body>