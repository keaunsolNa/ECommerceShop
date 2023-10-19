package com.ecommerceshop.dto.document.board;

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
@Document(indexName = "product-qa")
public class ProductQA {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String userId;
    @Field(type = FieldType.Keyword)
    private String productId;
    private String name;
    private String detail;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date createDate;

}
