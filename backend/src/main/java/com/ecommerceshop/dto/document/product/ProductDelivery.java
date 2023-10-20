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
@Document(indexName = "product-delivery")
public class ProductDelivery {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String userId;
    @Field(type = FieldType.Keyword)
    private String areaId;
    @Field(type = FieldType.Keyword)
    private String logId;
    @Field(type = FieldType.Keyword)
    private String code;
    private String name;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Long date;

}
