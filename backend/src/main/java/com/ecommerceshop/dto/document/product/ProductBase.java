package com.ecommerceshop.dto.document.product;

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
@Document(indexName = "product-base")
public class ProductBase {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String categoriesId;
    private String name;
    @Field(type = FieldType.Integer)
    private Integer price;
    @Field(type = FieldType.Integer)
    private Integer amount;
    @Field(type = FieldType.Integer)
    private Integer viewCount;
    private String desc;
    private String stat;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Long createDate;
}
