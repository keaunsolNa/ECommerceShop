package com.ecommerceshop.dto.document.basket;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Setter
@ToString
@Document(indexName = "basket-detail")
@Setting(shards = 1, replicas = 1)
public class BasketDetail {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String basketId;
    @Field(type = FieldType.Keyword)
    private String productId;
    @Field(type = FieldType.Integer)
    private Integer amount;


}
