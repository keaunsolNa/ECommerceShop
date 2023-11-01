package com.ecommerceshop.module.test;

import com.ecommerceshop.module.security.SHA512;
import com.ecommerceshop.module.security.Salt;

public class TestApplication {

    public static void main(String[] args) {

        String generatedSalt = Salt.makeSalt();
        System.out.println(generatedSalt);

        String encryptPwd = SHA512.SHA512("password", generatedSalt);
        System.out.println(encryptPwd);

        System.out.println(encryptPwd.equals(generatedSalt));
    }
}
