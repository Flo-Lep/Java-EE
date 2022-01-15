package tests;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;

import beans.Contact;
import beans.DAOFactory;
import beans.DAOUser;
import beans.Rating;
import beans.User;

/* 
Functionnalities to test
	public abstract void addUser(User newUser);
	public abstract void addUserAdmin(User newUserByAdmin);
	public abstract void delete(int user_id);
	public abstract void editUser(int id, String first_name, String last_name, String gender, String mail, String birth_date, String travel_habit, String frequency, String status);
	public abstract List<User> listUsers();
	public abstract User getUserById(int user_id);
	public abstract User logUserIn(String email, String password);
	public abstract void addMessage(Contact newMessage);
	public abstract void addDataScientistData(String json_data, String transport_type);
	public abstract String getDataScientistData(String time, String transport_type);
	public abstract void rateStation(Rating rating);
	public abstract void addAlert(int user_id, String transport_type, String line, String station, String message);
*/

/*
 /!\BEFORE TESTING/!\
 Make sure this user is correctly set into the testing database :
 	User 1 --> id : 1, first_name : "Quentin", last_name : "Poire", genre : "Male", mail : "quentin@poire.com", password : "quentin", birth_date : "05/10/2001", transport_type : "ugtdyfguh", frequency : "ytfuygihoj", status : 1;
 At the end of the test the following data should have been added to the testing database :
 	=> User added in database (Test AddUSer)
 	=> User added in database (Test AddUserAdmin)
 	=> User 1 data modified ("Edited", "User", "Female", "edited@user.fr", "password", "25/12/2021", "travel_habit", "frequency")
 	=> 1 new message in the contact table
 	=> 1 new dataScientistData in dataScientist table ("json_add_test_data")
 	=> 1 new dataScientistData in dataScientist table ("json_get_test_data")
 	=> 1 new data in rating table
 	=> 1 new message in alert table
 You need to clear the data added by the testing process afterwards if you want to restart the process. The resetTest function can be called to do that.
 */

class DAOUserMariaDBTest {
	
	private DAOFactory daoFactory = DAOFactory.getInstance();
	private DAOUser daoUser = daoFactory.getDAOUser("MariaDBTest");
	
	@Test
	void testListUsers() {
        List<User> expected_output = new ArrayList<User>();
        User user1 = new User("Quentin", "Poire", "Male", "quentin@poire.com", "quentin", "05/10/2001","ugtdyfguh", "ytfuygihoj");
        expected_output.add(user1);
        List<User> output = daoUser.listUsers();
        assertEquals(expected_output, output);
	}
	
	@Test
	void testGetUserById() { //After testing : => No effect
		//User id should be the same as the expected output user used here
		int user_id = 1;
		User expected_output = new User("Quentin", "Poire", "Male", "quentin@poire.com", "quentin", "05/10/2001","ugtdyfguh", "ytfuygihoj");
		User output = daoUser.getUserById(user_id);
		assertEquals(expected_output, output);
	}
	
	@Test
	void testAddUser() { //After testing : => User added in database (Test AddUSer)
		User expected_user = new User("Test","AddUser","Male","mail@test.com","password","21/02/2001","travel_habit","frequency");
		daoUser.addUser(expected_user);
		//Can we get the user created ?
		User output = null;
		try(Connection connection = daoFactory.getConnection();
				Statement statement = connection.createStatement();
				ResultSet result = statement.executeQuery("SELECT * from user WHERE last_name = 'AddUser';")){
			while (result.next()) {
				output = new User(result.getString("first_name"),result.getString("last_name"),result.getString("gender"),result.getString("mail"),result.getString("password"),result.getString("birth_date"),result.getString("travel_habit"), result.getString("frequency"));
			}
			}catch(SQLException e) {
				e.printStackTrace();
			}
			assertEquals(expected_user, output);
	}
	
	@Test
	void testAddUserAdmin() { //After testing : => User added in database (Test AddUserAdmin)
		//Status is set through this request
		int user_status = 1;
		User expected_user = new User(user_status, "Test","AddUserAdmin","Male","mail@test.com","password","21/02/2001","travel_habit","frequency");
		daoUser.addUserAdmin(expected_user);
		//Can we get the user created ? Is the status correclty set ?
		User output = null;
		try(Connection connection = daoFactory.getConnection();
			Statement statement = connection.createStatement();
			ResultSet result = statement.executeQuery("SELECT * from user WHERE last_name = 'AddUserAdmin'")){
		while (result.next()) {
			output = new User(result.getInt("status"),result.getString("first_name"),result.getString("last_name"),result.getString("gender"),result.getString("mail"),result.getString("password"),result.getString("birth_date"),result.getString("travel_habit"),result.getString("frequency"));;
		}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		assertEquals(expected_user, output);
	}
	
	@Test
	void testDelete() { //After testing : => No effect
		//Create a temporary user
		User expected_user = new User("Test","deleteUser","Male","mail@test.com","password","21/02/2001","travel_habit","frequency");
		daoUser.addUser(expected_user);
		User user_created = null;
		User output = null;
		int user_id = 0;
		try(Connection connection = daoFactory.getConnection();
			Statement statement = connection.createStatement();
			ResultSet result = statement.executeQuery("SELECT * from user WHERE last_name = 'deleteUser'")){
		while (result.next()) {
			user_id = result.getInt("id");
			user_created = new User(result.getString("first_name"),result.getString("last_name"),result.getString("gender"),result.getString("mail"),result.getString("password"),result.getString("birth_date"),result.getString("travel_habit"), result.getString("frequency"));
		}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		if(expected_user==user_created) {
			//Delete the user created above
			daoUser.delete(user_id);
			try(Connection connection = daoFactory.getConnection();
					Statement statement = connection.createStatement();
					ResultSet result = statement.executeQuery("SELECT * from user WHERE last_name = 'deleteUser'")){
				while (result.next()) {
					user_id = result.getInt("id");
					output = new User(result.getString("first_name"),result.getString("last_name"),result.getString("gender"),result.getString("mail"),result.getString("password"),result.getString("birth_date"),result.getString("travel_habit"), result.getString("frequency"));
				}
				}catch(SQLException e) {
					e.printStackTrace();
				}
			assertEquals(null, output);
		}
	}
	
	@Test
	void testLogUserIn() { //After testing : => No effect
		User expected_user = new User(1,"Quentin", "Poire", "Male", "quentin@poire.com", "quentin", "05/10/2001","ugtdyfguh", "ytfuygihoj", 1);
		User output = daoUser.logUserIn("quentin@poire.com", "quentin");
		assertEquals(expected_user, output);
	}
	
	@Test
	void testEditUser() { //After testing : => User modified
		User expected_user = new User(1, "Edited", "User", "Female", "edited@user.fr", "password", "25/12/2021", "travel_habit", "frequency");
		daoUser.editUser(2, "Edited", "User", "Female", "edited@user.fr", "25/12/2021", "travel_habit", "frequency", "1");
		User output = daoUser.getUserById(2);
		assertEquals(expected_user, output);
	}
	
	@Test
	void testAddMessage() { //After testing : => new message in the contact table
		Contact expected_message = new Contact("name", "mail", "phone", "message");
		daoUser.addMessage(expected_message);
		//Get the message
		Contact output = null;
		try(Connection connection = daoFactory.getConnection();
			Statement statement = connection.createStatement();
			ResultSet result = statement.executeQuery("SELECT * from contact WHERE message = 'message';")){
		while (result.next()) {
			output = new Contact(result.getString("name"),result.getString("mail"),result.getString("phone"),result.getString("message"));
		}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		assertEquals(expected_message, output);
	}
	
	@Test
	void testAddDataScientistData() { //After testing : => new dataScientistData in dataScientist table ("json_add_test_data")
		String expected_data = "json_add_test_data";
		daoUser.addDataScientistData(expected_data, "tramway");
		//Check if the data has been correctly added
		String output = null;
		try(Connection connection = daoFactory.getConnection();
			Statement statement = connection.createStatement();
			ResultSet result = statement.executeQuery("SELECT * from dataScientist WHERE json_data = 'json_add_test_data';")){
		while (result.next()) {
			output = result.getString("json_data");
		}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		assertEquals(expected_data, output);
	}

	
	@Test
	void testGetDataScientistData() { //After testing : => new dataScientistData in dataScientist table ("json_get_test_data")
		String expected_data = "json_get_test_data";
		daoUser.addDataScientistData(expected_data, "tramway");
		Date date = new Date();
		long time = date.getTime();
		Timestamp ts = new Timestamp(time);
		String output = daoUser.getDataScientistData(""+ts, "tramway");
		assertEquals(expected_data, output);
	}
	
	@Test
	void testRateStation() { //After testing : => new data in rating table
		String user_id = "1";
		Rating expected_rating = new Rating(user_id, "Test", "User", "station_name", "station_line",  "rating_stars", "rating_comment");
		daoUser.rateStation(expected_rating);
		//Check if the rating has been added
		Rating output = null;
		try(Connection connection = daoFactory.getConnection();
			Statement statement = connection.createStatement();
			ResultSet result = statement.executeQuery("SELECT * from rating WHERE station = 'station_name';")){
		while (result.next()) {
			output = new Rating(result.getString("id_user"),result.getString("name"),result.getString("last_name"),result.getString("station"),result.getString("line"),result.getString("stars"),result.getString("comment"));
		}
		}catch(SQLException e) {
			e.printStackTrace();
		}
		assertEquals(expected_rating, output);
		
	}
	
	@Test
	void testAddAlert() { //After testing : => new message in alert table
		String expected_output = "message";
		daoUser.addAlert(1, "tramway", "line", "station", "problem_type", "message");
		String output = null;
		try(Connection connection = daoFactory.getConnection();
				Statement statement = connection.createStatement();
				ResultSet result = statement.executeQuery("SELECT * from alert WHERE message = 'message' AND id_user = 1;")){
			while (result.next()) {
				output = result.getString("message");
			}
			}catch(SQLException e) {
				e.printStackTrace();
			}
		assertEquals(expected_output, output);
	}
	
	@Test  //After testing : => the basic configuration for testing should be set : all data previously added deleted + 1 user correctly set according to the requirements above
	void resetTest() {
		//TODO
	}
}
