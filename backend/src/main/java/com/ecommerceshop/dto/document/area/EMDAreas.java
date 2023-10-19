package com.ecommerceshop.dto.document.area;

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
@Document(indexName = "emd-areas")
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
