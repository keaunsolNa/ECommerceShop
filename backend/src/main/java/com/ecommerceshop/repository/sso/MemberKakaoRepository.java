package com.ecommerceshop.repository.sso;

import com.ecommerceshop.dto.document.sso.MemberKakao;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberKakaoRepository extends ElasticsearchRepository<MemberKakao, String> {
}
