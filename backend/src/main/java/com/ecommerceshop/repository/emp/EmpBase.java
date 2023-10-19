package com.ecommerceshop.repository.emp;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpBase extends ElasticsearchRepository<com.ecommerceshop.dto.document.emp.EmpBase, String> {
}
