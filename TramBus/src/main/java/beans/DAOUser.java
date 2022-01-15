package beans;
import java.util.List;

public interface DAOUser{
	public abstract void addUser(User newUser);
	public abstract void addUserAdmin(User newUserByAdmin);
	public abstract void delete(int user_id);
	public abstract void deleteRating(int id_rating);
	public abstract void editUser(int id, String first_name, String last_name, String gender, String mail, String birth_date, String travel_habit, String frequency, String status);
	public abstract void editProfile(int id, String first_name, String last_name, String gender, String mail, String birth_date, String travel_habit, String frequency);
	public abstract List<User> listUsers();
	public abstract User getUserById(int user_id);
	public abstract User logUserIn(String email, String password);
	public abstract void addMessage(Contact newMessage);
	public abstract void addDataScientistData(String json_data, String transport_type);
	public abstract String getDataScientistData(String time, String transport_type);
	public abstract List<String> getStationRating(String name_station);
	public abstract List<String> getDataScientistRangeData(String starting_timestamp, String ending_timestamp, String transport_type);
	public abstract void rateStation(Rating rating);
	public abstract void addAlert(int user_id, String transport_type, String line, String station, String type_problem, String message);
	public abstract void manageAccountActivity(int user_id, int activity);
	public void updatePassword(int user_id, String newPassword);
	public void setTempPassword(int user_id, Boolean value);
	public abstract User getUserByEmail(String email);
	public abstract List<Contact> listContact();
	public abstract List<RequestDS> listRequestDS();
	public abstract List<Alert> listAlert();
	public abstract void addDataScientistRequest(int user_id, String job, String company, String message);
	public abstract List<Rating> getRatingComment(int id_user);
	public abstract void editRating(int id_rating, String stars, String comment);
	public abstract Rating getRatingById(int rating_id);
}








