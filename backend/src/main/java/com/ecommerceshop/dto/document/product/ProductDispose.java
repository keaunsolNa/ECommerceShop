package com.ecommerceshop.dto.document.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.util.Date;

@Getter
@Setter
@ToString
@Document(indexName = "basket-dispose")
@Setting(shards = 1, replicas = 1)
public class ProductDispose {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String productId;
    @Field(type = FieldType.Keyword)
    private String disposeCode;
    private String disposeDes;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date disposeDate;


}
