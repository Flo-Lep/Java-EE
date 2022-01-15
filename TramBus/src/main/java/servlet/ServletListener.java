package servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import beans.DAOFactory;
import beans.DAOUser;

@WebListener
public class ServletListener implements ServletContextListener {
	
	private DAOUser daoUser;
	private TimerTask task1;
	private TimerTask task2;
	private Timer timer1;
	private Timer timer2;
	
    public ServletListener() {};
    
    public void contextInitialized(ServletContextEvent sce)  { 
        System.out.println("Listener : servlet started");
        DAOFactory daoFactory = DAOFactory.getInstance();
        daoUser = daoFactory.getDAOUser("MariaDB");
        task1 = new TimerTask(){
            public void run(){
            	try {
        			String json_data = requestData("https://data.angers.fr/api/records/1.0/search/?dataset=bus-tram-position-tr&q=&facet=mnemoligne&facet=nomligne&facet=dest&refine.mnemoligne=A");
        			String transport_type = "tramway";
        			daoUser.addDataScientistData(json_data, transport_type);
        		} catch (IOException e) {
        			e.printStackTrace();
        		}
            }
        };
        task2 = new TimerTask(){
            public void run(){
            	try {
        			String json_data = requestData("https://data.angers.fr/api/records/1.0/search/?dataset=bus-tram-position-tr&q=&rows=500&facet=novh&facet=mnemoligne&facet=nomligne&facet=dest&exclude.mnemoligne=A");
        			String transport_type = "bus";
        			daoUser.addDataScientistData(json_data, transport_type);
        		} catch (IOException e) {
        			e.printStackTrace();
        		}
            }
        };
        /*try {
        	timer1 = new Timer(true); //deamon thread
            timer1.scheduleAtFixedRate(task1, 0, (long)60000);
            timer2 = new Timer(true); //deamon thread
            timer2.scheduleAtFixedRate(task2, 0, (long)60000);
        }
        catch(Exception e) {
        	e.printStackTrace();
        }*/
   }

    public void contextDestroyed(ServletContextEvent sce)  { 
    	System.out.println("Listener : servlet stopped");
    }
    
    public String requestData(String URL) throws IOException{
    	BufferedReader httpResponseReader = null;
    	String usernameColonPassword = "quentin.mary@reseau.eseo.fr:PGL20212022";
		//String usernameColonPassword = "theo.benard@reseau.eseo.fr:PGL20212022";
	    String basicAuthPayload = "Basic " + Base64.getEncoder().encodeToString(usernameColonPassword.getBytes());
    	try {
    	    // Connect to the web server endpoint
    	    URL serverUrl = new URL(URL);
    	    HttpURLConnection urlConnection = (HttpURLConnection) serverUrl.openConnection();
    	 
    	    // Set HTTP method as GET
    	    urlConnection.setRequestMethod("GET");
    	 
    	    // Include the HTTP Basic Authentication payload
    	    urlConnection.addRequestProperty("Authorization", basicAuthPayload);
    	 
    	    // Read response from web server, which will trigger HTTP Basic Authentication request to be sent.
    	    httpResponseReader =
    	            new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
    	    String lineRead;
    	    while((lineRead = httpResponseReader.readLine()) != null) {
    	        return lineRead;
    	    }
    	} catch (IOException ioe) {
    	    ioe.printStackTrace();
    	    return null;
    	} finally {
    	 
    	    if (httpResponseReader != null) {
    	        try {
    	            httpResponseReader.close();
    	        } catch (IOException ioe) {
    	            // Close quietly
    	        }
    	    }
    	}
		return null;
    }
}


