package com.ecommerceshop.dto.document.sso;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Getter
@Setter
@ToString
@Document(indexName = "member-google")
public class MemberGoogle {

    @Id
    private String id;
    private String nickName;
    private String email;
}
