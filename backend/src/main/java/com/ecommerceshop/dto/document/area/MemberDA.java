package com.ecommerceshop.dto.document.area;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@Setter
@ToString
@Document(indexName = "member-da")
public class MemberDA {

    @Id
    private String userId;
    @Field(type = FieldType.Keyword)
    private String areaId;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Long createDate;
}
