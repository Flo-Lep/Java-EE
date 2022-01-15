package servlet;


import beans.DAOFactory;
import beans.DAOUser;
import beans.Rating;
import beans.User;
import beans.Contact;
import beans.Password;
import beans.SendEmail;
import beans.RequestDS;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class ServletController
 */
@WebServlet("/ProcessRequest")
public class ServletController extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	private DAOUser daoUser;
	
	@Override
	public void init() {
        DAOFactory daoFactory = DAOFactory.getInstance();
        daoUser = daoFactory.getDAOUser("MariaDB");
    }

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session.getAttribute("logged")==null) {session.setAttribute("logged", false);session.setAttribute("failed", false);};
		try {processRequest(request,response, session);} catch (Exception e) {e.printStackTrace();}
	}
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session.getAttribute("logged")==null) {session.setAttribute("logged", false);session.setAttribute("failed", false);};
		try {processRequest(request,response, session);} catch (Exception e) {e.printStackTrace();}
	}
	
	protected void processRequest(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
		String id = request.getParameter("id");
		if(id == null) {
			id = "null";			
		}
		switch(id) {
			case "null":
				//Nobody should access this page without any POST form
				getServletContext().getRequestDispatcher("index.html").forward(request, response);
				break;
			//DIFFERENT JSP ACCESS
			case "reach" : //Handles all the redirection pages (/ProcessRequest?id="reach"?section="home")
				String requestedSection = request.getParameter("section");

				if(requestedSection.equals("home") || requestedSection.equals("register") || requestedSection.equals("login") || requestedSection.equals("contact") || requestedSection.equals("map") || requestedSection.equals("info") || requestedSection.equals("datascientist_request") || requestedSection.equals("edit_profile") || requestedSection.equals("contacted")) {
					request.setAttribute("content", requestedSection);
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				else {
					System.out.println("Unreachable or unauthorized section request : "+requestedSection);
					request.setAttribute("content", "home");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			//NO PERMISSION REQUIRED
			case "register":
				String uncrypted_password = request.getParameter("password");
				Password encrypted_password = new Password();
				User newUser = new User(request.getParameter("first_name"), request.getParameter("last_name"), request.getParameter("gender"), request.getParameter("mail"), encrypted_password.get_encrypted_password(uncrypted_password), request.getParameter("birth_date"), request.getParameter("travel_habit"), request.getParameter("frequency"));
				daoUser.addUser(newUser);
				request.setAttribute("content", "registered");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "register_by_id":
				User newUserByAdmin = new User(Integer.parseInt(request.getParameter("status")),request.getParameter("first_name"), request.getParameter("last_name"), request.getParameter("gender"), request.getParameter("mail"), request.getParameter("password"), request.getParameter("birth_date"), request.getParameter("travel_habit"), request.getParameter("frequency"));
				daoUser.addUserAdmin(newUserByAdmin);
				getServletContext().getRequestDispatcher("/ProcessRequest?id=admin").forward(request, response);
				break;
			case "login":
				Password encrypted_password_login = new Password();
				String login = request.getParameter("login");
				String password = encrypted_password_login.get_encrypted_password(request.getParameter("password"));
				User loggedUser = daoUser.logUserIn(login, password);
				session.setAttribute("login", login);
				session.setAttribute("failed", false);
				if(loggedUser.doesUserExist()) {
					System.out.println("Correct password");
					if(loggedUser.isPasswordTemp()==true) {
						request.setAttribute("content", "update_temp_password");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
					else {
						if(loggedUser.getActivity() == 1) {
							session.setAttribute("logged", true);
							session.setAttribute("loggedUser", loggedUser);
							request.setAttribute("content", "loggedIn");
							getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
						}
						else {//User account is suspended
							request.setAttribute("content", "suspended");
							getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
						}
					}
				}
				else {
					System.out.println("Wrong password");
					session.setAttribute("logged", false);
					session.setAttribute("loggedUser", null);
					session.setAttribute("failed", true);
					request.setAttribute("content", "login");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			case "logout":
				session.setAttribute("logged", false);
				session.setAttribute("failed", false);
				session.setAttribute("loggedUser", null);
				session.setAttribute("login", null);
				request.setAttribute("content", "home");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "contact":
				Contact newMessage = new Contact (request.getParameter("last_name"), request.getParameter("mail"), request.getParameter("phone"), request.getParameter("message"));
				daoUser.addMessage(newMessage);
				request.setAttribute("content", "contacted");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "alert" :
				daoUser.addAlert(Integer.parseInt(request.getParameter("user_id")),request.getParameter("type_Transport"), request.getParameter("bus_tram_station_line"), request.getParameter("bus_tram_station_name"), request.getParameter("select_type_problem"), request.getParameter("message_problem"));
				request.setAttribute("content", "alert_feedback");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "rating" :
				User ratingUser = (User)session.getAttribute("loggedUser");			
				String userId = ratingUser.getId()+"";
				if ((!request.getParameter("rating_stars").equals("")) && (!request.getParameter("rating_comment").equals(""))) {
					Rating rating = new Rating (userId, ratingUser.getFirst_name(), ratingUser.getLast_name(), request.getParameter("station_name"), request.getParameter("station_line"), request.getParameter("rating_stars"), request.getParameter("rating_comment"));
					daoUser.rateStation(rating);
					request.setAttribute("feedback", "Votre avis a bien été transmis");
				}else {
					request.setAttribute("feedback", "<br/>Votre avis n'a pas été transmis, <br/> Vous devez mettre un commentaire et évaluer la station avec les étoiles.");
				}
				request.setAttribute("content", "rating_feedback");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				
				break;
			/*===============================PERMISSION REQUIRED=============================*/
			case "profile":
				if((Boolean)session.getAttribute("logged")==true) {
					int requestUserId = Integer.parseInt(request.getParameter("user_id"));
					if(isUserItself(session, requestUserId)) {
						User user = (User)session.getAttribute("loggedUser");	
						List<Rating> list_rate = daoUser.getRatingComment(Integer.parseInt(request.getParameter("user_id")));
						request.setAttribute("user", user);
						if(list_rate.isEmpty()) {
							request.setAttribute("rating", "false");	
						}else {
							request.setAttribute("list_rate", list_rate);
							request.setAttribute("rating", "true");	
						}
						request.setAttribute("content", "profile");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}else {
						request.setAttribute("content", "forbidden_access");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
				}else {
					request.setAttribute("content", "login");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			case "edit_profile_confirmation" : //user
				if((Boolean)session.getAttribute("logged")==true) {
					try {
						int user__id__ = Integer.parseInt(request.getParameter("user_id"));
						daoUser.editProfile(user__id__, request.getParameter("first_name_edit"), request.getParameter("last_name_edit"), request.getParameter("gender_edit"), request.getParameter("mail_edit"), request.getParameter("birth_date_edit"), request.getParameter("travel_habit_edit"), request.getParameter("frequency_edit"));
						User loggedUser_ = daoUser.getUserById(user__id__);
						request.setAttribute("loggedUser", loggedUser_);
						request.setAttribute("feedback", "Vos informations ont bien été enregistrées.");
					}catch(Exception e) {
						request.setAttribute("feedback", "Une erreur a eu lieu lors de l'enregistrement de vos données");
						e.printStackTrace();
					}
				}
				else {
					request.setAttribute("feedback", "Aucun utilisateur connecté");
					System.out.println("User not logged");
				}
				request.setAttribute("content", "edit_profile");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "suspend_account" : //ProcessRequest?id=suspend_account
				request.setAttribute("content", "suspend_account");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "suspend_account_confirmation" : //ProcessRequest?id=suspend_account&user_id=?&activity=?
				int user_id = Integer.parseInt(request.getParameter("user_id"));
				int activity = Integer.parseInt(request.getParameter("activity"));
				daoUser.manageAccountActivity(user_id, activity);
				request.setAttribute("content", "suspend_account_confirmation");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "delete_account" : //user
				if((Boolean)session.getAttribute("logged")==true) {
					request.setAttribute("content", "delete_account");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				else {
					request.setAttribute("content", "login");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			case "delete_account_confirmation":
				int requestUserId = Integer.parseInt(request.getParameter("user_id"));
				if(isUserItself(session, requestUserId)) {
					daoUser.delete(Integer.parseInt(request.getParameter("user_id")));
					request.setAttribute("content", "delete_account_confirmation");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				else {
					request.setAttribute("content", "forbidden_access");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			case "update_password":
				int _userID_ = Integer.parseInt(request.getParameter("user_id"));
				if(isUserItself(session, _userID_)) {
					Password _crypter_ = new Password();
					User user_password = daoUser.getUserById(_userID_);
					String old_password = _crypter_.get_encrypted_password(request.getParameter("old_password"));
					String new_password_ = _crypter_.get_encrypted_password(request.getParameter("new_password"));
					if(user_password.getPassword().equals(old_password)) {
						daoUser.updatePassword(_userID_, new_password_);
						request.setAttribute("password_feedback", "Votre mot de passe a bien été changé");
					}else {
						request.setAttribute("password_feedback", "Votre ancien mot de passe ne correspond pas");
					}
				}else {
					request.setAttribute("content", "forbidden_access");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				request.setAttribute("content", "edit_profile");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "forgotten_password_form" :
				request.setAttribute("content", "forgotten_password_form");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "forgotten_password_confirmation":
				User user = daoUser.getUserByEmail(request.getParameter("email"));
				if(user.getMail()!=null) {
					SendEmail sender = new SendEmail();
					System.out.println("Trying to send email to "+user.getMail()+"...");
					sender.sendEmail(user.getMail(), "TramBus - Mot de passe oublié", "Veuillez cliquer sur le lien ci-dessous afin de réinitialiser votre mot de passe :\nhttp://172.24.0.55:8080/TramBus/ProcessRequest?id=temporary_password&user_id="+user.getId()+"\n\nL'équipe de TramBus vous souhaite une bonne fin de journée.\n\nÀ bientôt sur notre plateforme.");
					request.setAttribute("feedback", "Un mail pour changer votre mot de passe vient de vous être envoyé. Veuillez vérifier vos spams...");
				}
				else {
					System.out.println("Unknown EMAIL");
					request.setAttribute("feedback", "Aucun compte utilisateur n'est associé à cette adresse email..."); 
					
				}
				request.setAttribute("content", "forgotten_password_confirmation");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "temporary_password" :
				//Add column temp_password to database
				int user__id = Integer.parseInt(request.getParameter("user_id"));
				//Create a temporary password
				Password crypter_ = new Password();
				String random_password = crypter_.getRandomPassword();
				String crypted_password = crypter_.get_encrypted_password(random_password);
				daoUser.updatePassword(user__id, crypted_password);
				daoUser.setTempPassword(user__id, true);
				request.setAttribute("temporary_password", random_password);
				request.setAttribute("content", "temporary_password");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "update_temp_password":
				User user__ = daoUser.getUserByEmail(request.getParameter("email"));
				if(user__!=null) {
					if(user__.isPasswordTemp()) {
						System.out.println("User had a temporary password");
						Password crypter = new Password();
						int _user_id = user__.getId();
						String user_temp_password = user__.getPassword();
						String temporary_password_ = crypter.get_encrypted_password(request.getParameter("temporary_password"));
						if(user_temp_password.equals(temporary_password_)) {
							System.out.println("Temporary password matches");
							String new_password = crypter.get_encrypted_password(request.getParameter("new_password"));
							daoUser.updatePassword(_user_id, new_password);
							daoUser.setTempPassword(_user_id, false);
							request.setAttribute("feedback","Votre mot de passe a bien été changé !");
						}
						else {
							System.out.println("Temporary password does not match.");
							request.setAttribute("feedback","Votre mot de passe temporaire est incorrect.");
						}
					}
					else {
						System.out.println("No temporary password set.");
					}
				}else {
					System.out.println("Unknowned email address");
				}
				request.setAttribute("content", "updated_password");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "delete_user"://admin
				if((Boolean)session.getAttribute("logged")==true) {
					if(getPermission(session, 1)) {
						daoUser.delete(Integer.parseInt(request.getParameter("user_id")));
						request.setAttribute("content", "updated_password");
						request.setAttribute("feedback", "l'utilisateur a bien été supprimé");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}else {
						request.setAttribute("content", "forbidden_access");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
				}else {
					request.setAttribute("content", "login");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			case "edit_user"://admin
				if((Boolean)session.getAttribute("logged")==true) {
					if(getPermission(session, 1)) {
						daoUser.getUserById(Integer.parseInt(request.getParameter("user_id")));
						request.setAttribute("user",daoUser.getUserById(Integer.parseInt(request.getParameter("user_id"))));
						request.setAttribute("content", "edit_user");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}else {
						request.setAttribute("content", "forbidden_access");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
				}else {
					request.setAttribute("content", "login");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			case "add_user"://admin
				if((Boolean)session.getAttribute("logged")==true) {
					if(getPermission(session, 1)) {
						request.setAttribute("content", "add_user");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}else {
						request.setAttribute("content", "forbidden_access");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
				}else {
					request.setAttribute("content", "login");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			case "confirm_edit_user"://admin
				if((Boolean)session.getAttribute("logged")==true) {
					if(getPermission(session, 1)) {
						int id_edit = Integer.parseInt(request.getParameter("user_id"));
						String first_name_edit = request.getParameter("first_name_edit");
						String last_name_edit = request.getParameter("last_name_edit");
						String gender_edit = request.getParameter("gender_edit");
						String mail_edit = request.getParameter("mail_edit");
						String birth_date_edit = request.getParameter("birth_date_edit");
						String travel_habit_edit = request.getParameter("travel_habit_edit");
						String frequency_edit = request.getParameter("frequency_edit");
						String status_edit = request.getParameter("status_edit");
						daoUser.editUser(id_edit, first_name_edit, last_name_edit, gender_edit, mail_edit, birth_date_edit, travel_habit_edit, frequency_edit, status_edit);
						getServletContext().getRequestDispatcher("/ProcessRequest?id=admin").forward(request,response);
					}
					else {
						request.setAttribute("content", "forbidden_access");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
				}else {
					request.setAttribute("content", "login");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			case "admin"://admin
				if((Boolean)session.getAttribute("logged")==true) {
					if(getPermission(session, 1)) {
						request.setAttribute("users", daoUser.listUsers());
						request.setAttribute("contacts", daoUser.listContact());
						request.setAttribute("requestsDS", daoUser.listRequestDS());
						request.setAttribute("alerts",daoUser.listAlert());					request.setAttribute("content", "admin");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
					else {
						request.setAttribute("content", "forbidden_access");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
				}
				else {
					request.setAttribute("content", "login");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			case "data_scientist": //dataScienstist page
				if((Boolean)session.getAttribute("logged")==true) {
					if(getPermission(session, 1)) {
						//request.setAttribute("users", daoUser.listUsers()); TODOOOO = get stats from DB
						request.setAttribute("content", "data_scientist");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
					else {
						request.setAttribute("content", "forbidden_access");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
				}
				else {
					request.setAttribute("content", "login");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			case "data_scientist_request_confirmation":
				try {
					daoUser.addDataScientistRequest(Integer.parseInt(request.getParameter("user_id")), request.getParameter("profession"), request.getParameter("entreprise"), request.getParameter("message"));
					request.setAttribute("feedback", "Merci pour votre requ�te, celle-ci a bien �t� transmise au service concern�.");
				}catch(Exception e) {
					request.setAttribute("feedback", "Une erreur est survenue lors de la transmission de votre demande...");
					e.printStackTrace();
				}
				request.setAttribute("content", "datascientist_request_confirmation");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			//GET DATA FROM THE SERVER (auth also required ?)
			case "getDataScientistData": //Datascientist
				String time = request.getParameter("timestamp");
				String type = request.getParameter("transportType");
		        String json_response = daoUser.getDataScientistData(time, type);
		        PrintWriter out = response.getWriter();
		        response.setContentType("application/json");
		        response.setCharacterEncoding("UTF-8");
		        out.print(json_response);
		        out.flush();
				break;
			case "getStationRating":
				String name_station = request.getParameter("name_station");
				List<String> rating_response = daoUser.getStationRating(name_station);
		        //System.out.println("Servlet : " + rating_response);
		        PrintWriter out_rating = response.getWriter();
		        response.setContentType("application/json");
		        response.setCharacterEncoding("UTF-8");
		        out_rating.print(rating_response);
		        out_rating.flush();
		        break;
			case "getDataScientistRangeData":
				String starting_timestamp = request.getParameter("starting_timestamp");
				String ending_timestamp = request.getParameter("ending_timestamp");
				String transport_type = request.getParameter("transport_type");
				List<String> json_responses = daoUser.getDataScientistRangeData(starting_timestamp, ending_timestamp, transport_type);
				PrintWriter output = response.getWriter();
		        response.setContentType("application/json");
		        response.setCharacterEncoding("UTF-8");
		        output.print(json_responses);
		        output.flush();
				break;
			case "delete_rating":
				if((Boolean)session.getAttribute("logged")==true) {
					int _userID_1 = Integer.parseInt(request.getParameter("user_id"));
					if(isUserItself(session, _userID_1)){
						daoUser.deleteRating(Integer.parseInt(request.getParameter("id_rating")));
						request.setAttribute("content", "rating_delete_confirmation");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
				}else {
					request.setAttribute("content", "login");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			case "edit_rating":
				int id_rating__ = Integer.parseInt(request.getParameter("id_rating"));
				Rating result = daoUser.getRatingById(id_rating__);
				request.setAttribute("rating_element", result);				
				request.setAttribute("content", "edit_rating");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
			case "edit_rating_confirmation":
				if((Boolean)session.getAttribute("logged")==true) {
					int _userID_1 = Integer.parseInt(request.getParameter("user_id"));
					if(isUserItself(session, _userID_1)){
						int id_rating = Integer.parseInt(request.getParameter("id_rating"));
						String stars = request.getParameter("stars_edit");
						String comment = request.getParameter("comment_edit");
						daoUser.editRating(id_rating, stars, comment);
						request.setAttribute("content", "edit_rating_confirmation");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}else {
						request.setAttribute("content", "forbidden_access");
						getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
					}
				}else {
					request.setAttribute("content", "login");
					getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				}
				break;
			default :
				System.out.println("Wrong request id provided : "+id);
				request.setAttribute("content", "home");
				getServletContext().getRequestDispatcher("/jsp/template.jsp").forward(request, response);
				break;
		}
	}
	
	//UTILS
	protected Boolean getPermission(HttpSession session, int status_required) {
		User user = (User)session.getAttribute("loggedUser");
		int user_status = user.getStatus();
		if(user_status == 3) {
			return true;
		}
		else if(status_required == user_status) {
			return true;
		}
		else {
			return false;
		}
	}
	
	protected Boolean isUserItself(HttpSession session, int request_user_id) {
		User loggedUser = (User)session.getAttribute("loggedUser");
		int loggedUserId = loggedUser.getId();
		if(loggedUserId == request_user_id) {
			return true;
		}
		else {
			return false;
		}
	}
}
