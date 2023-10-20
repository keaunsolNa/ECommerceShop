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
@Document(indexName = "product-detail")
public class ProductDetail {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String productId;
    @Field(type = FieldType.Keyword)
    private String userId;
    private String code;
    private String name;
    @Field(type = FieldType.Integer)
    private Integer amount;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Long createDate;

}
