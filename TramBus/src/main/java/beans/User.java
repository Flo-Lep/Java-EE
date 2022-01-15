
package beans;

public class User{
	
	private int id;
	private int status;
	private String first_name;
	private String last_name;
	private String gender;
	private String mail;
	private String password;
	private String travel_habit;
	private String frequency;
	private String birth_date;
	private int activity;
	private Boolean temp_password;
	
	//Constructors
	public User() {};
	
	public User(String first_name, String last_name, String gender, String mail,  String password, String birth_date, String travel_habit, String frequency) {
		this.setFirst_name(first_name);
		this.setLast_name(last_name);
		this.setGender(gender);
		this.setMail(mail);
		this.setPassword(password);
		this.setBirth_date(birth_date);
		this.setTravel_habit(travel_habit);
		this.setFrequency(frequency);
	}
	
	public User(int id, String first_name, String last_name, String gender, String mail,  String password, String birth_date, String travel_habit, String frequency, int status) {
		this.id = id;
		this.setFirst_name(first_name);
		this.setLast_name(last_name);
		this.setGender(gender);
		this.setMail(mail);
		this.setPassword(password);
		this.setBirth_date(birth_date);
		this.setTravel_habit(travel_habit);
		this.setFrequency(frequency);
		this.status = status;
	}
	
	public User(int status,String first_name, String last_name, String gender, String mail,  String password, String birth_date, String travel_habit, String frequency) {
		this.setStatus(status);
		this.setFirst_name(first_name);
		this.setLast_name(last_name);
		this.setGender(gender);
		this.setMail(mail);
		this.setPassword(password);
		this.setBirth_date(birth_date);
		this.setTravel_habit(travel_habit);
		this.setFrequency(frequency);
	}


	//Getters and setters
	
	public int getStatus() {
		return status;
	}
	
	public void setStatus(int status) {
		this.status = status;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public void setBirth_date(String birth_date) {
		this.birth_date = birth_date;
	}
	
	public String getBirth_date() {
		return birth_date;
	}
	
	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	
	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getTravel_habit() {
		return travel_habit;
	}

	public void setTravel_habit(String travel_habit) {
		this.travel_habit = travel_habit;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean doesUserExist() {
		if(this.getFirst_name()==null) {
			return false;
		}
		else {
			return true;
		}
	}
	
	public int getActivity() {
		return activity;
	}

	public void setActivity(int activity) {
		this.activity = activity;
	}
	
	public Boolean isPasswordTemp() {
		if(this.temp_password==true) {
			return true;
		}
		else {
			return false;
		}
	}
	
	public void setTemp_password(Boolean tempPassword) {
		this.temp_password = tempPassword;
	}
	
	
	//String methods for output
	public String toString() {
	    return "User --> "+this.getId()+" "+this.getFirst_name()+" "+this.getLast_name()+" "+this.getGender()+" "+this.getMail()+" "+this.getBirth_date()+" "+this.getTravel_habit()+ " "+this.getFrequency()+" ";
	}
}