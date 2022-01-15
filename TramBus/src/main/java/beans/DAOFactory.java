
package beans;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

//Direct Oracle Access
public class DAOFactory {
	private static volatile DAOFactory instance = null; 
	private String url;
	private String username;
	private String password;
	
	public DAOFactory() {}
	
	//Singleton (only one instance of the object exists)
	public final static DAOFactory getInstance() {
		if(DAOFactory.instance == null) {
			synchronized(DAOFactory.class) {
				if(DAOFactory.instance == null) {
					instance = new DAOFactory();
				}
			}
		}
		return DAOFactory.instance;
	}
	
	//Connect to the database through driver
	public Connection getConnection() throws SQLException {
		return DriverManager.getConnection(url, username, password);
	}
	
	//Set parameters for a MariaDB
	private void setParamMariaDB(String url, String username, String password) {
		this.url = url;
		this.username = username;
		this.password = password;
		try {
			Class.forName("org.mariadb.jdbc.Driver");
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	//Create DAO user to interact with DB
	public DAOUser getDAOUser(String type) {
		switch(type) {
			case "MariaDB":
				setParamMariaDB("jdbc:mysql://172.24.0.55/TramBus", "TramBus", "grp3ESEO");
				return new DAOUserMariaDB(this);
			case "MariaDBTest":
				setParamMariaDB("jdbc:mysql://172.24.0.55:3306/TestTramBus", "testTramBus", "grp3ESEO");
				return new DAOUserMariaDB(this);
			default:
				return null;
		}
	}
}