package com.ecommerceshop.dto.document.sso;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Setter
@ToString
@Document(indexName = "member-kakao")
@Setting(shards = 1, replicas = 1)
public class MemberKakao {

    @Id
    private String id;
    private String nickName;
    private String email;
}
