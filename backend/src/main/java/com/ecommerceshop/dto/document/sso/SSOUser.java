package com.ecommerceshop.dto.document.sso;

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
@Document(indexName = "sso-user")
public class SSOUser {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String naverId;
    @Field(type = FieldType.Keyword)
    private String kakaoId;
    @Field(type = FieldType.Keyword)
    private String googleId;
}
