package com.ecommerceshop.dto.document.file;

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
@Document(indexName = "product-pic")
public class ProductPic {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String fileId;
}
