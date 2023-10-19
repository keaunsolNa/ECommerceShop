package com.ecommerceshop.repository.sso;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SSOUser extends ElasticsearchRepository<com.ecommerceshop.dto.document.sso.SSOUser, String> {
}
