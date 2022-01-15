package beans;

public class Alert{
	private String name;
	private String transport_type;
	private String line;
	private String station;
	private String type_problem;
	private String message;
	
	public Alert() {};
	
	public Alert(String name, String transport_type, String line, String station, String type_problem, String message) {
		this.setName(name);
		this.setTransport_type(transport_type);
		this.setLine(line);
		this.setStation(station);
		this.setType_problem(type_problem);
		this.setMessage(message);
	}

	private void setStation(String station) {
		this.station = station;
	}

	private void setMessage(String message) {
		this.message = message;
	}

	private void setType_problem(String type_problem) {
		this.type_problem = type_problem;
	}

	private void setLine(String line) {
		this.line = line;
	}

	private void setTransport_type(String transport_type) {
		this.transport_type = transport_type;
	}

	private void setName(String name) {
		this.name = name;
	}
	
	public String getMessage() {
		return message;
	}
	public String getName() {
		return name;
	}

	public String getTransport_type() {
		return transport_type;
	}
	public String getType_problem() {
		return type_problem;
	}
	public String getStation() {
		return station;
	}
	public String getLine() {
		return line;
	}
}