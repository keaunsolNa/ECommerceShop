package com.ecommerceshop.repository.sso;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberNaver extends ElasticsearchRepository<com.ecommerceshop.dto.document.sso.MemberNaver, String> {
}
