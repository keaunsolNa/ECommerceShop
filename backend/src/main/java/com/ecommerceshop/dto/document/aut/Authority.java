package com.ecommerceshop.dto.document.aut;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Setter
@ToString
@Document(indexName = "authority")
@Setting(shards = 1, replicas = 1)
public class Authority {

    @Id
    private String id;
    private String authorityName;
    private String authorityDesc;
}
