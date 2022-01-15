package beans;

public class RequestDS{
	private String name;
	private String job;
	private String company;
	private String message;
	
	public RequestDS() {};
	
	public RequestDS(String name, String job, String company, String message) {
		this.setName(name);
		this.setJob(job);
		this.setCompany(company);
		this.setMessage(message);
	}

	private void setName(String name) {
		this.name = name;
		
	}

	private void setCompany(String company) {
		this.company = company;
		
	}

	private void setJob(String job) {
		this.job = job;
		
	}

	private void setMessage(String message) {
		this.message = message;
		
	}
	
	public String getMessage() {
		return message;
	}
	public String getCompany() {
		return company;
	}
	public String getJob() {
		return job;
	}
	public String getName() {
		return name;
	}
	
	
}