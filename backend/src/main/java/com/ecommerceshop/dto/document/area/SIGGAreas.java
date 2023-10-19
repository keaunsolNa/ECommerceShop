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
@Document(indexName = "sigg-areas")
public class SIGGAreas {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String sidoAreaId;
    @Field(type = FieldType.Keyword)
    private String admCode;
    private String name;
    private String version;
}
