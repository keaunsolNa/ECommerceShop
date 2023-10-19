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
    @Field(type = FieldType.Keyword)
    private String empId;
    private String phoneNumber;
    private String callNumber;
    @Field(type = FieldType.Keyword)
    private String password;
}
