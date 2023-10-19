package com.ecommerceshop.dto.document.basket;

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
@Document(indexName = "product-base")
public class BasketBase {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String userId;
}
