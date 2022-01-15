package beans;

import java.security.Key;
import java.util.Random;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;

public class Password{
	
	private static final String ALGORITHM = "AES";
    private static final byte[] keyValue = "THEPGLISLIFE2022".getBytes();
    
    /*public static void main(String args[]) throws Exception {
        Key key = generateKey();
       String encriptValue = encrypt("quentin2001",key);
       decrypt(encriptValue,key);

   }*/
    public Password(){
    	//get_encrypted_password(uncrypted_password);
    }
    
    public String get_encrypted_password(String uncrypted_password) throws Exception{
    	Key key = generateKey();
    	String encrypted_password = encrypt(uncrypted_password,key);
    	return encrypted_password;
    }
    
    
    
    private static Key generateKey() throws Exception {
        Key key = new SecretKeySpec(keyValue, ALGORITHM);
        return key;
    }
    
    public static String encrypt(String valueToEnc, Key key) throws Exception {
    	 
        
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, key);
  
        byte[] encValue = cipher.doFinal(valueToEnc.getBytes());
        byte[] encryptedByteValue = new Base64().encode(encValue);
  
        return new String(encryptedByteValue);
    }
    
    public static String decrypt(String encryptedValue, Key key) throws Exception {
        // Key key = generateKey();
         Cipher cipher = Cipher.getInstance(ALGORITHM);
         cipher.init(Cipher.DECRYPT_MODE, key);
          
         byte[] decodedBytes = new Base64().decode(encryptedValue.getBytes());
  
         byte[] enctVal = cipher.doFinal(decodedBytes);

         return new String(enctVal);
     }
    
    public String getRandomPassword() {
    	Random rdm = new Random();
    	String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?"; 
    	String randomPassword = "";
    	for(int i=0;i<18;i++) {
    		randomPassword+=rdm.nextInt(characters.length());;
    	}
    	return randomPassword;
    }
    	
}