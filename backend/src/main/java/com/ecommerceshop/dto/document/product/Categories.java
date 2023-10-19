package com.ecommerceshop.dto.document.product;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Setter
@ToString
@Document(indexName = "categories")
@Setting(shards = 1, replicas = 1)
public class Categories {

    @Id
    private String id;
    private String name;
}
