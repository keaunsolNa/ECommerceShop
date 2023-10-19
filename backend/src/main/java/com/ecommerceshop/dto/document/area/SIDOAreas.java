package com.ecommerceshop.dto.document.area;

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
@Document(indexName = "sido-areas")
@Setting(shards = 1, replicas = 1)
public class SIDOAreas {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String admCode;
    private String name;
    private String version;
}
