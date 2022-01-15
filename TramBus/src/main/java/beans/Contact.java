package beans;

public class Contact{
	
	private String message;
	private int id;
	private String last_name;
	private String mail;
	private String phone;
	
	public Contact(){};
	
	public Contact(String last_name, String mail, String phone, String message) {
		//this.id = 2;
		this.setLast_name(last_name);
		this.setMail(mail);
		this.setPhone(phone);
		this.setMessage(message);
	}

	public void setMessage(String message) {
		this.message = message;
		
	}

	public void setPhone(String phone) {
		this.phone = phone;
		
	}

	public void setMail(String mail) {
		this.mail = mail;
		
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
		
	}
	
	public int getId() {
		return id;
	}
	
	public String getLast_name() {
		return last_name;
	}
	
	public String getPhone() {
		return phone;
	}
	
	public String getMessage() {
		return message;
	}
	
	public String getMail() {
		return mail;
	}
	
}