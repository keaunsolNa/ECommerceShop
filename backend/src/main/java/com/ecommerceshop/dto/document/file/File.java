package com.ecommerceshop.dto.document.file;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.util.Date;

@Getter
@Setter
@ToString
@Document(indexName = "file")
@Setting(shards = 1, replicas = 1)
public class File {

    @Id
    private String od;
    @Field(type = FieldType.Keyword)
    private String userId;
    @Field(type = FieldType.Keyword)
    private String type;
    @Field(type = FieldType.Keyword)
    private String name;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date createDate;
}
