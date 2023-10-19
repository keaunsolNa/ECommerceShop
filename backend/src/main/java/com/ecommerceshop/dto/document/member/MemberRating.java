package com.ecommerceshop.dto.document.member;

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
@Document(indexName = "member-rating")
public class MemberRating {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String userId;
    @Field(type = FieldType.Keyword)
    private String name;
    @Field(type = FieldType.Double)
    private Double rate;
    @Field(type = FieldType.Integer)
    private Integer sum;
    @Field(type = FieldType.Integer)
    private Integer consumption;
    @Field(type = FieldType.Integer)
    private Integer get;
}
