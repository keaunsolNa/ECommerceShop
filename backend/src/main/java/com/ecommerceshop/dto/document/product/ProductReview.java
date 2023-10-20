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
@Document(indexName = "product-review")
public class ProductReview {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String userId;
    @Field(type = FieldType.Keyword)
    private String productId;
    @Field(type = FieldType.Keyword)
    private String fileId;
    private String name;
    private String detail;
    @Field(type = FieldType.Integer)
    private Integer createAccount;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Long createDate;

}
