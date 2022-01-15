package tests;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import beans.DAOFactory;
import beans.DAOUser;
import beans.DAOUserMariaDB;

class DAOFactoryTest {

	@Test
	void testGetInstance() {
		DAOFactory daoFactory = new DAOFactory();
		DAOFactory output = DAOFactory.getInstance();
		assertEquals(daoFactory, output);
	}
	
	@Test
	void testGetDAOUser() {
		DAOFactory daoFactory = DAOFactory.getInstance();
		DAOUser output = new DAOUserMariaDB(daoFactory); //Right parameters need to be set but the method is private...
		DAOUser expected_output = daoFactory.getDAOUser("MariaDBTest");
		assertEquals(expected_output, output);
	}
	
	/*@Test
	void testGetConnection() {
		DAOFactory daoFactory = DAOFactory.getInstance();
	}*/

}
