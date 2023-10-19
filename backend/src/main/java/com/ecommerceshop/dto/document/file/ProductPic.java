package com.ecommerceshop.dto.document.file;

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
@Document(indexName = "productPic")
@Setting(shards = 1, replicas = 1)
public class ProductPic {

    @Id
    private String productId;
    @Field(type = FieldType.Keyword)
    private String fileId;
}
