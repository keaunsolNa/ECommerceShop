package com.ecommerceshop.repository.sso;

import com.ecommerceshop.dto.document.sso.SSOUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SSOUserRepository extends ElasticsearchRepository<SSOUser, String> {
}
