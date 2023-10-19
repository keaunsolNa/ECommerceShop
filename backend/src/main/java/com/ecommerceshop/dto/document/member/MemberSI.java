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
@Document(indexName = "member-sio")
public class MemberSI {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String userId;
    private String phoneNumber;
    private String cellNumber;
    @Field(type = FieldType.Keyword)
    private String password;
    private String address;
}
