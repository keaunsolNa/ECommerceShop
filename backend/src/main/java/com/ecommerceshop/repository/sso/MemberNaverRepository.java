package com.ecommerceshop.repository.sso;

import com.ecommerceshop.dto.document.sso.MemberNaver;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberNaverRepository extends ElasticsearchRepository<MemberNaver, String> {
}
