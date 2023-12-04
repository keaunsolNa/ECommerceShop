package com.ecommerceshop.dto.document.emp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@Setter
@ToString
@Document(indexName = "emp-si")
public class EmpSI {

    @Id
    private String id;
    private String phoneNumber;
    private String frontPhoneNumber;
    private String middlePhoneNumber;
    private String lastPhoneNumber;
    private String callNumber;
    private String frontCallNumber;
    private String middleCallNumber;
    private String lastCallNumber;
    @Field(type = FieldType.Keyword)
    private String password;
    private String zipCode;
    private String address;
    private String detailAddress;
    @Field(type = FieldType.Keyword)
    private String salt;
}
