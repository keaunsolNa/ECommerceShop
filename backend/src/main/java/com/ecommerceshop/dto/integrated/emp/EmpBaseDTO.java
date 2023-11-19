package com.ecommerceshop.dto.integrated.emp;

import lombok.Data;

import java.util.Date;

@Data
public class EmpBaseDTO {

    private String id;
    private String password;
    private String email;
    private String state;
    private String name;
    private String gender;
    private String role;
    private Date birth;
    private String phoneNumber;
    private String callNumber;
    private String fileId;
    private String address;

}
