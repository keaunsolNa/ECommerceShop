package com.ecommerceshop.dto.integrated.emp;

import lombok.Data;

import java.util.Date;

@Data
public class EmpBaseDTO {

    private String id;
    private String state;
    private String name;
    private Date lastLogin;
    private Date createDate;
    private String empId;
    private String phoneNumber;
    private String callNumber;
    private String password;
}
