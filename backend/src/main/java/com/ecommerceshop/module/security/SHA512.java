package com.ecommerceshop.module.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class SHA512 {

    public static String SHA512(String password, String salt) {

        try {

            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(Base64.getDecoder().decode(salt));
            md.update(password.getBytes());
            byte[] bytes = md.digest();

            StringBuilder hexString = new StringBuilder();
            for (byte b : bytes) {

                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString();

        } catch (NoSuchAlgorithmException e) {

            e.printStackTrace();
            return null;

        }
    }
}
