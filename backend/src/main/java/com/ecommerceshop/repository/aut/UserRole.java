package com.ecommerceshop.repository.aut;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRole extends ElasticsearchRepository<com.ecommerceshop.dto.document.aut.UserRole, String> {
}
