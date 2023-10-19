package com.ecommerceshop.dto.document.member;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.util.Date;

@Getter
@Setter
@ToString
@Document(indexName = "member-base")
@Setting(shards = 1, replicas = 1)
public class MemberBase {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String state;
    private String name;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date birthDate;
    @Field(type = FieldType.Keyword)
    private String gender;
    @Field(type = FieldType.Keyword)
    private String agreePiu;
    @Field(type = FieldType.Keyword)
    private String agreeTou;
    @Field(type = FieldType.Keyword)
    private String agreeMcc;
    @Field(type = FieldType.Integer)
    private Integer pointHave;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date lastLogin;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date createDate;
}
