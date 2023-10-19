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
@Document(indexName = "emd-areas")
@Setting(shards = 1, replicas = 1)
public class EMDAreas {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String siggAreaId;
    @Field(type = FieldType.Keyword)
    private String admCode;
    private String name;
    @Field(type = FieldType.Dense_Vector, dims = 3)
    private String geon;
    @Field(type = FieldType.Dense_Vector, dims = 3)
    private String location;
    private String version;
}
