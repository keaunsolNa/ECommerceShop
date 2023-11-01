package com.ecommerceshop.dto.document.emp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;


@Getter
@Setter
@ToString
@Document(indexName = "emp-base")
public class EmpBase {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String state;
    private String name;
    @Field(type = FieldType.Keyword)
    private String role;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Long lastLogin;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Long createDate;
}
