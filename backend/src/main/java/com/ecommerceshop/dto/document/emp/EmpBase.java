package com.ecommerceshop.dto.document.emp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.util.Date;


@Getter
@Setter
@ToString
@Document(indexName = "emp-base")
@Setting(shards = 1, replicas = 1)
public class EmpBase {

    @Id
    private String id;
    @Field(type = FieldType.Keyword)
    private String state;
    private String name;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date lastLogin;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date createDate;
}
