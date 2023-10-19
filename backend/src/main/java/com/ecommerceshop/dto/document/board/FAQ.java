package com.ecommerceshop.dto.document.board;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.util.Date;

@Getter
@Setter
@ToString
@Document(indexName = "faq")
@Setting(shards = 1, replicas = 1)
public class FAQ {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String empId;
    private String name;
    private String detail;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date createDate;

}
