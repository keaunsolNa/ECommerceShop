package com.ecommerceshop.dto.document.aut;

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
@Document(indexName = "user-role")
public class UserRole {


    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String empId;
    @Field(type = FieldType.Keyword)
    private String userId;
    @Field(type = FieldType.Keyword)
    private String ssoId;
    @Field(type = FieldType.Keyword)
    private Integer authorityCode;

}
