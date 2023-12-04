package com.ecommerceshop.dto.DTO;

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
    private Date createDate;
    private String phoneNumber;
    private String frontPhoneNumber;
    private String middlePhoneNumber;
    private String lastPhoneNumber;
    private String callNumber;
    private String frontCallNumber;
    private String middleCallNumber;
    private String lastCallNumber;
    private String fileId;
    private String zipCode;
    private String address;
    private String detailAddress;

}
