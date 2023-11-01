package com.ecommerceshop.dto.integrated.emp;

import lombok.Data;

@Data
public class EmpBaseDTO {

    private String id;
    private String state;
    private String name;
    private String role;
    private Long lastLogin;
    private Long createDate;
    private String empId;
    private String phoneNumber;
    private String callNumber;
    private String password;
}
