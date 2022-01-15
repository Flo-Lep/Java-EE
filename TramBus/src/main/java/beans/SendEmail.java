package beans;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class SendEmail{
	private static final String HOST = "smtp.gmail.com";
    private static final int PORT = 465;
    private static final boolean SSL_FLAG = true;
    private static final String USERNAME = "pgleseob3@gmail.com";
    private static final String PASSWORD = "grp3ESEO";
    private static final String FROMADDRESS = "pgleseob3@gmail.com";
    
    public SendEmail() {
    	
    }
 
    public void sendSimpleEmail(String toAddress, String subject, String message) {
         
        try {
            Email email = new SimpleEmail();
            email.setHostName(HOST);
            email.setSmtpPort(PORT);
            email.setAuthenticator(new DefaultAuthenticator(USERNAME, PASSWORD));
            email.setSSLOnConnect(SSL_FLAG);
            email.setFrom(FROMADDRESS);
            email.setSubject(subject);
            email.setMsg(message);
            email.addTo(toAddress);
            email.send();
        }catch(Exception ex){
            System.out.println("Unable to send email");
            ex.printStackTrace();
        }
    }
    
    public void sendEmail(String toAddress, String subject, String _message_) {

    	 Properties props = new Properties();
		 props.put("mail.smtp.auth", "true");
		 props.put("mail.smtp.starttls.enable", "true"); 
		 props.put("mail.smtp.host", HOST);
		 props.put("mail.smtp.port", "587");
	
		// Get the Session object
		 Session session = Session.getInstance(props,
		 new javax.mail.Authenticator() {
		 protected PasswordAuthentication getPasswordAuthentication() {
		 return new PasswordAuthentication(USERNAME, PASSWORD);
		 }
		 });
	
		try {
		 // Create a default MimeMessage object
		 Message message = new MimeMessage(session);
		 
		 message.setFrom(new InternetAddress(USERNAME));
		 
		 message.setRecipients(Message.RecipientType.TO,
		 InternetAddress.parse(toAddress));
		 
		 // Set Subject
		 message.setSubject(subject);
		 
		 // Put the content of your message
		 message.setText(_message_);
		 
		// Send message
		 Transport.send(message);
	
		System.out.println("Sent message successfully....");
	
		} catch (MessagingException e) {
		 throw new RuntimeException(e);
		 }
    }
}


/*
String userName = "pgleseob3@gmail.com";
String password = "grp3ESEO";
String fromAddress="pgleseob3@gmail.com";
String toAddress =  "quickprogrammer@gmail.com";
String subject = "TramBus - Password reset";
String message = "Hello from Apache Mail";
*/

/*public static void main(String[] args) {
SendEmail sender = new SendEmail();
sender.sendSimpleEmail("","","");
}*/