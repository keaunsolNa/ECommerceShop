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
@Document(indexName = "member-coupon")
public class MemberCoupon {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String userId;
    private String name;
    @Field(type = FieldType.Double)
    private Double rate;
    @Field(type = FieldType.Integer)
    private Integer price;
    private String info;
    @Field(type = FieldType.Keyword)
    private String status;
}
