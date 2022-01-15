package beans;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;



public class DAOUserMariaDB implements DAOUser{

	private DAOFactory daoFactory;
	private String listUsersSQLQuery = "SELECT * FROM user;";
	private String listContactSQLQuery = "SELECT * FROM contact;";
	private String listRequestDSSQLQuery = "SELECT * FROM requestDS;";
	private String listAlertSQLQuery = "SELECT * FROM alert";
	private String addUserSQLQuery = "INSERT INTO user(first_name, last_name, gender, mail, password, birth_date, travel_habit, frequency) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
	private String addUserAdminSQLQuery = "INSERT INTO user(status,first_name, last_name, gender, mail, password, birth_date, travel_habit, frequency) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);";
	private String deleteUserSQLQuery = "DELETE FROM `user` WHERE id= ?;";
	private String selectUserById = "SELECT * FROM user WHERE (id=?);";
	private String editUserById = "UPDATE user SET first_name=?, last_name=?, gender=?, mail=?, birth_date=?, travel_habit=?, frequency=?, status=? WHERE id=?;";
	private String editProfileSQLQuery = "UPDATE user SET first_name=?, last_name=?, gender=?, mail=?, birth_date=?, travel_habit=?, frequency=? WHERE id=?;";
	private String loginUserSQLQuery = "SELECT * FROM user WHERE mail=? AND password=?";
	private String addMessageSQLQuery = "INSERT INTO contact(id_user, name, mail, phone, message) VALUES (?,?,?,?,?);";
	private String addDataScientistDataSQLQuery = "INSERT INTO dataScientist(json_data, transport_type) VALUES(?,?);";
	private String addCommentStation = "INSERT INTO rating(id_user,name,last_name,station,line,stars,comment) VALUES (?,?,?,?,?,?,?);";
	private String getDataScientistDataSQLQuery = "SELECT json_data FROM dataScientist WHERE timestamp < ? AND transport_type = ? ORDER BY timestamp DESC LIMIT 1;";
	private String getStationRatingSQLQuery = "SELECT * FROM rating WHERE station = ? ;";
	private String addAlertSQLQuery = "INSERT INTO alert(id_user, transport_type, line, station, type_problem, message) VALUES(?,?,?,?,?,?);";
	private String setAccountActivitySQLQuery = "UPDATE user SET activity=? WHERE id=?;";
	private String getDataScientistRangeDataSQLQuery = "SELECT json_data from dataScientist WHERE timestamp < ? AND timestamp > ? AND transport_type = ?;";
	private String updatePasswordSQLQuery = "UPDATE user SET password=? WHERE id=?;";
	private String updateTempPasswordSQLQuery = "UPDATE user SET temp_password=? WHERE id=?";
	private String getUserByEmailSQLQuery = "SELECT * from user WHERE mail=?";
	private String addDataScientistRequestSQLQuery = "INSERT INTO requestDS (id_user, job, company, message) VALUES(?,?,?,?);";
	private String getRatingComment = "SELECT id_rating,station,line,stars,comment FROM rating WHERE id_user = ?";
	private String deleteRatingSQLQuery = "DELETE FROM rating WHERE id_rating = ?;";
	private String editRatingByIdSQLQuery = "UPDATE rating SET stars=?, comment=? WHERE id_rating =?;";
	private String getRatingByIdSQLQuery = "SELECT * FROM rating WHERE id_rating=?;";

	
	//Create a daoUser that extends the basic one
	public DAOUserMariaDB(DAOFactory daoFactory){
		this.daoFactory = daoFactory;
	}
	@Override
	public void addUser(User newUser) {
		try (Connection connexion = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connexion.prepareStatement(this.addUserSQLQuery);
			preparedStatement.setString(1, newUser.getFirst_name());
			preparedStatement.setString(2, newUser.getLast_name());
			preparedStatement.setString(3, newUser.getGender());
			preparedStatement.setString(4, newUser.getMail());
			preparedStatement.setString(5, newUser.getPassword());
			preparedStatement.setString(6, newUser.getBirth_date());
			preparedStatement.setString(7, newUser.getTravel_habit());
			preparedStatement.setString(8, newUser.getFrequency());
			preparedStatement.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }		
	}
	
	@Override
	public void addUserAdmin(User newUserByAdmin) {
		try (Connection connexion = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connexion.prepareStatement(this.addUserAdminSQLQuery);
			preparedStatement.setInt(1, newUserByAdmin.getStatus());
			preparedStatement.setString(2, newUserByAdmin.getFirst_name());
			preparedStatement.setString(3, newUserByAdmin.getLast_name());
			preparedStatement.setString(4, newUserByAdmin.getGender());
			preparedStatement.setString(5, newUserByAdmin.getMail());
			preparedStatement.setString(6, newUserByAdmin.getPassword());
			preparedStatement.setString(7, newUserByAdmin.getBirth_date());
			preparedStatement.setString(8, newUserByAdmin.getTravel_habit());
			preparedStatement.setString(9, newUserByAdmin.getFrequency());
			preparedStatement.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }		
	}
	

	@Override
	public void delete(int user_id) {
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.deleteUserSQLQuery);
				preparedStatement.setInt(1, user_id);
				preparedStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
	@Override
	public void deleteRating(int id_rating) {
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.deleteRatingSQLQuery);
				preparedStatement.setInt(1, id_rating);
				preparedStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	
	@Override
	public void editUser(int id, String first_name, String last_name, String gender, String mail, String birth_date, String travel_habit, String frequency, String status) {
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.editUserById);
			preparedStatement.setString(1, first_name);
			preparedStatement.setString(2, last_name);
			preparedStatement.setString(3, gender);
			preparedStatement.setString(4, mail);
			preparedStatement.setString(5, birth_date);
			preparedStatement.setString(6, travel_habit);
			preparedStatement.setString(7, frequency);
			preparedStatement.setString(8, status);
			preparedStatement.setInt(9, id);
			preparedStatement.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
		}	
	}
	
	@Override
	public void editProfile(int id, String first_name, String last_name, String gender, String mail, String birth_date, String travel_habit, String frequency) {
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.editProfileSQLQuery);
			preparedStatement.setString(1, first_name);
			preparedStatement.setString(2, last_name);
			preparedStatement.setString(3, gender);
			preparedStatement.setString(4, mail);
			preparedStatement.setString(5, birth_date);
			preparedStatement.setString(6, travel_habit);
			preparedStatement.setString(7, frequency);
			preparedStatement.setInt(8, id);
			preparedStatement.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void editRating(int id_rating, String stars, String comment){
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.editRatingByIdSQLQuery);
			preparedStatement.setString(1, stars);
			preparedStatement.setString(2, comment);
			preparedStatement.setInt(3, id_rating);
			preparedStatement.executeUpdate();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public Rating getRatingById(int rating_id) {
		Rating rating = new Rating();
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.getRatingByIdSQLQuery);
			preparedStatement.setInt(1, rating_id);
			ResultSet result = preparedStatement.executeQuery();
		while (result.next()) {
			rating.setId(result.getInt("id_rating")+"");
			rating.setFirst_name(result.getString("name"));
			rating.setLast_name(result.getString("last_name"));
			rating.setStation_name(result.getString("station"));
			rating.setStation_line(result.getString("line"));
			rating.setRating_stars(result.getString("stars"));
			rating.setRating_comment(result.getString("comment"));
		}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return rating;
	}		
	

	@Override
	public List<User> listUsers() {
		List<User> users = new ArrayList<User>();
		try(Connection connection = daoFactory.getConnection();
			Statement statement = connection.createStatement();
			ResultSet result = statement.executeQuery(this.listUsersSQLQuery)){
		while (result.next()) {
			//Get data from the request
			int id = result.getInt("id");
			String first_name = result.getString("first_name");
			String last_name = result.getString("last_name");
			String gender = result.getString("gender");
			String mail = result.getString("mail");
			String password = result.getString("password");
			String birth_date = result.getString("birth_date");
			String travel_habit = result.getString("travel_habit");
			String frequency = result.getString("frequency");
			int status = result.getInt("status");
			int activity = result.getInt("activity");
			//Assign values to the user object
			User user = new User(id, first_name, last_name, gender, mail, password, birth_date, travel_habit, frequency, status);
			user.setActivity(activity);
			users.add(user);
		}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return users;
	}
	
	public List<Contact> listContact(){
		List<Contact> contacts = new ArrayList<Contact>();
		try(Connection connection = daoFactory.getConnection();
			Statement statement = connection.createStatement();
			ResultSet result = statement.executeQuery(this.listContactSQLQuery)){	
		while (result.next()) {
			String last_name = result.getString("name");
			String mail = result.getString("mail");
			String phone = result.getString("phone");
			String message = result.getString("message");
			Contact contact = new Contact(last_name, mail, phone, message);
			contacts.add(contact);
		}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return contacts;
	}
	
	public List<RequestDS> listRequestDS(){
		List<RequestDS> requestsDS = new ArrayList<RequestDS>();
		try(Connection connection = daoFactory.getConnection();
			Statement statement = connection.createStatement();
			ResultSet result = statement.executeQuery(this.listRequestDSSQLQuery)){	
		while (result.next()) {
			User user = this.getUserById(Integer.parseInt(result.getString("id_user")));
			String name = user.getFirst_name();
			String job = result.getString("job");
			String company = result.getString("company");
			String message = result.getString("message");
			RequestDS requestDS = new RequestDS(name, job, company, message);
			requestsDS.add(requestDS);
		}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return requestsDS;
	}
	
	public List<Alert> listAlert(){
		List<Alert> alerts = new ArrayList<Alert>();
		try(Connection connection = daoFactory.getConnection();
			Statement statement = connection.createStatement();
			ResultSet result = statement.executeQuery(this.listAlertSQLQuery)){	
		while (result.next()) {
			User user = this.getUserById(Integer.parseInt(result.getString("id_user")));
			String name = user.getFirst_name();
			String transport_type = result.getString("transport_type");
			String line = result.getString("line");
			String station = result.getString("station");
			String type_problem = result.getString("type_problem");
			String message = result.getString("message");
			Alert alert = new Alert(name, transport_type, line, station, type_problem, message);
			alerts.add(alert);
		}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return alerts;
	}
	
	public User getUserById(int id) {
		User user = new User();
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.selectUserById);
			preparedStatement.setString(1, (id+""));
			ResultSet result = preparedStatement.executeQuery();
		while (result.next()) {
			user.setId(result.getInt("id"));
			user.setFirst_name(result.getString("first_name"));
			user.setLast_name(result.getString("last_name"));
			user.setGender(result.getString("gender"));
			user.setMail(result.getString("mail"));
			user.setPassword(result.getString("password"));
			user.setBirth_date(result.getString("birth_date"));
			user.setTravel_habit(result.getString("travel_habit"));
			user.setFrequency(result.getString("frequency"));
			user.setStatus(result.getInt("status"));
		}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}
	
	public User logUserIn(String email, String password) {
		User user = new User();
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.loginUserSQLQuery);
			preparedStatement.setString(1, (email));
			preparedStatement.setString(2, (password));
			ResultSet result = preparedStatement.executeQuery();
		while (result.next()) {
			user.setId(result.getInt("id"));
			user.setFirst_name(result.getString("first_name"));
			user.setLast_name(result.getString("last_name"));
			user.setGender(result.getString("gender"));
			user.setMail(result.getString("mail"));
			user.setBirth_date(result.getString("birth_date"));
			user.setTravel_habit(result.getString("travel_habit"));
			user.setFrequency(result.getString("frequency"));
			user.setStatus(result.getInt("status"));
			user.setActivity(result.getInt("activity"));
			user.setTemp_password(result.getBoolean("temp_password"));
		}
		}catch (SQLException e) {
			e.printStackTrace();
			
		}
		return user;
	}
	
	@Override
	public void addMessage(Contact newMessage) {
		try (Connection connexion = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connexion.prepareStatement(this.addMessageSQLQuery);
			preparedStatement.setInt(1, 3);
			preparedStatement.setString(2, newMessage.getLast_name());
			preparedStatement.setString(3, newMessage.getMail());
			preparedStatement.setString(4, newMessage.getPhone());
			preparedStatement.setString(5, newMessage.getMessage());
			preparedStatement.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
		
	}

	public void addDataScientistData(String json_data, String transport_type) {
		try (Connection connexion = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connexion.prepareStatement(this.addDataScientistDataSQLQuery);
			preparedStatement.setString(1, json_data);
			preparedStatement.setString(2, transport_type);
			preparedStatement.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}

	public void rateStation(Rating rating){
		try (Connection connexion = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connexion.prepareStatement(this.addCommentStation);
			preparedStatement.setString(1, rating.getId());	
			preparedStatement.setString(2, rating.getFirst_name());	
			preparedStatement.setString(3, rating.getLast_name());
			preparedStatement.setString(4, rating.getStation_name());
			preparedStatement.setString(5, rating.getStation_line());
			preparedStatement.setString(6, rating.getRating_stars());
			preparedStatement.setString(7, rating.getRating_comment());	
			preparedStatement.executeUpdate();
			System.out.println("Rating sation added to database");
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}
	
	public String getDataScientistData(String time, String transport_type) {
		String response_data = null;
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.getDataScientistDataSQLQuery);
			preparedStatement.setString(1, time);
			preparedStatement.setString(2, transport_type);
			ResultSet result = preparedStatement.executeQuery();
		while (result.next()) {
			response_data = result.getString("json_data");
		}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return response_data;
	}
	

	public List<String> getStationRating(String name_station) {
		String response_rating = null;
		List<String> response_rating_tab = new ArrayList<String>();
		
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.getStationRatingSQLQuery);
			preparedStatement.setString(1, name_station);
			ResultSet result = preparedStatement.executeQuery();
		while (result.next()) {
			response_rating = result.getString("name") +" "+ result.getString("last_name") +":"+ result.getString("line") +":"+ result.getString("stars") +":"+ result.getString("comment");
			response_rating_tab.add(response_rating);
		}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return response_rating_tab;
	}
	
	public List<String> getDataScientistRangeData(String starting_timestamp, String ending_timestamp, String transport_type) {
		List<String> response_data = new ArrayList<String>();
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.getDataScientistRangeDataSQLQuery);
			preparedStatement.setString(1, ending_timestamp);
			preparedStatement.setString(2, starting_timestamp);
			preparedStatement.setString(3, transport_type);
			ResultSet result = preparedStatement.executeQuery();
		while (result.next()) {
			response_data.add(result.getString("json_data"));
		}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return response_data;
	}
	
	public void addAlert(int user_id, String transport_type, String line, String station, String type_problem, String message) {
		try (Connection connexion = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connexion.prepareStatement(this.addAlertSQLQuery);
			preparedStatement.setInt(1, user_id);
			preparedStatement.setString(2, transport_type);
			preparedStatement.setString(3, line);
			preparedStatement.setString(4, station);
			preparedStatement.setString(5, type_problem);
			preparedStatement.setString(6, message);
			preparedStatement.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}
	
	public void manageAccountActivity(int user_id, int activity) {
		try (Connection connexion = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connexion.prepareStatement(this.setAccountActivitySQLQuery);
			preparedStatement.setInt(1, activity);
			preparedStatement.setInt(2, user_id);
			preparedStatement.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}
	
	public void updatePassword(int user_id, String newPassword) {
		try (Connection connexion = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connexion.prepareStatement(this.updatePasswordSQLQuery);
			preparedStatement.setString(1, newPassword);
			preparedStatement.setInt(2, user_id);
			preparedStatement.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}
	
	public void setTempPassword(int user_id, Boolean value) {
		try (Connection connexion = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connexion.prepareStatement(this.updateTempPasswordSQLQuery);
			preparedStatement.setBoolean(1, value);
			preparedStatement.setInt(2, user_id);
			preparedStatement.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}
	
	public User getUserByEmail(String email) {
		User user = new User();
		try(Connection connection = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connection.prepareStatement(this.getUserByEmailSQLQuery);
			preparedStatement.setString(1, email);
			ResultSet result = preparedStatement.executeQuery();
		while (result.next()) {
			user.setId(result.getInt("id"));
			user.setFirst_name(result.getString("first_name"));
			user.setLast_name(result.getString("last_name"));
			user.setPassword(result.getString("password"));
			user.setGender(result.getString("gender"));
			user.setMail(result.getString("mail"));
			user.setBirth_date(result.getString("birth_date"));
			user.setTravel_habit(result.getString("travel_habit"));
			user.setFrequency(result.getString("frequency"));
			user.setStatus(result.getInt("status"));
			user.setActivity(result.getInt("activity"));
			user.setTemp_password(result.getBoolean("temp_password"));
		}
		}catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}
	
	public void addDataScientistRequest(int user_id, String job, String company, String message) {
		try (Connection connexion = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connexion.prepareStatement(this.addDataScientistRequestSQLQuery);
			preparedStatement.setInt(1, user_id);
			preparedStatement.setString(2, job);
			preparedStatement.setString(3, company);
			preparedStatement.setString(4, message);
			preparedStatement.executeUpdate();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	}
	
	public List<Rating> getRatingComment(int id_user) {
		List<Rating> list_rate = new ArrayList<Rating>();
		try (Connection connexion = daoFactory.getConnection()){
			PreparedStatement preparedStatement = connexion.prepareStatement(this.getRatingComment);
			preparedStatement.setInt(1, id_user);
			ResultSet result = preparedStatement.executeQuery();
			while (result.next()) {
				Rating rate = new Rating(result.getString("id_rating"),"","",result.getString("station"),result.getString("line"),result.getString("stars"),result.getString("comment"));
				list_rate.add(rate);
			}
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
		return list_rate;
	}
}






