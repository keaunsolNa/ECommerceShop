package com.ecommerceshop.dto.document.board;

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
@Document(indexName = "faq")
public class FAQ {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String empId;
    private String name;
    private String detail;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Long createDate;

}
