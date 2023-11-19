package com.ecommerceshop.dto.document.emp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;


@Getter
@Setter
@ToString
@Document(indexName = "emp-base")
public class EmpBase {

    @Id
    private String id;
    private String email;
    @Field(type = FieldType.Keyword)
    private String state;
    private String name;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date birth;
    @Field(type = FieldType.Keyword)
    private String gender;
    @Field(type = FieldType.Keyword)
    private String role;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date createDate;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date lastLogin;
    private String fileId;
}
