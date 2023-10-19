package com.ecommerceshop.dto.document.aut;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Getter
@Setter
@ToString
@Document(indexName = "authority")
public class Authority {

    @Id
    private String id;
    private String authorityName;
    private String authorityDesc;
}
