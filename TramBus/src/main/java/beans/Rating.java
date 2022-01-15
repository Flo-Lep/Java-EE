
package beans;

public class Rating {
	
	private String id;
	private String first_name;
	private String last_name;
	private String station_name;
	private String station_line;
	private String rating_stars;
	private String rating_comment;
	
	//Constructors
	public Rating() {};
	
	public Rating(String id,String first_name, String last_name, String station_name, String station_line,  String rating_stars, String rating_comment) {
		this.setId(id);
		this.setFirst_name(first_name);
		this.setLast_name(last_name);
		this.setStation_name(station_name);
		this.setStation_line(station_line);
		this.setRating_stars(rating_stars);
		this.setRating_comment(rating_comment);
	}

	//Getters and setters
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getStation_name() {
		return station_name;
	}

	public void setStation_name(String station_name) {
		this.station_name = station_name;
	}

	public String getStation_line() {
		return station_line;
	}

	public void setStation_line(String station_line) {
		this.station_line = station_line;
	}

	public String getRating_stars() {
		return rating_stars;
	}

	public void setRating_stars(String rating_stars) {
		this.rating_stars = rating_stars;
	}

	public String getRating_comment() {
		return rating_comment;
	}

	public void setRating_comment(String rating_comment) {
		this.rating_comment = rating_comment;
	}	
}
	