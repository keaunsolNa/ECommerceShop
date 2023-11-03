package com.ecommerceshop.module.test;

import com.ecommerceshop.module.security.SHA512;

public class TestApplication {

    public static void main(String[] args) {

        String generatedSalt = "Nf+YcOaSF7Ca8uzx5ZORYg==";
        System.out.println(generatedSalt);

        String encryptPwd = SHA512.SHA512("knasolsdkm", "Nf+YcOaSF7Ca8uzx5ZORYg==");
        System.out.println(encryptPwd);

        System.out.println(encryptPwd.equals(generatedSalt));
    }
}
