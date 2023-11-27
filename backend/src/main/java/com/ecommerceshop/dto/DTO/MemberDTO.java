package com.ecommerceshop.dto.DTO;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;

@Data
public class MemberDTO {

    private String id;
    private String state;
    private String name;
    private String email;
    private Date birth;
    private String gender;
    private String agreePiu;
    private String agreeTou;
    private String agreeMcc;
    private Integer pointHave;
    private Date lastLogin;
    private Date createDate;
    private String phoneNumber;
    private String cellNumber;
    private String address;
}
