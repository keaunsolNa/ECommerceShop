package com.ecommerceshop.repository.aut;

import com.ecommerceshop.dto.document.aut.Authority;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends ElasticsearchRepository<Authority, String> {
}
