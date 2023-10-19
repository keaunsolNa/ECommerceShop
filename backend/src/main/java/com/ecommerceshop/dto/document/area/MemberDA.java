package com.ecommerceshop.dto.document.area;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.util.Date;

@Getter
@Setter
@ToString
@Document(indexName = "member-da")
@Setting(shards = 1, replicas = 1)
public class MemberDA {

    @Id
    private String userId;
    @Field(type = FieldType.Keyword)
    private String areaId;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date createDate;
}
