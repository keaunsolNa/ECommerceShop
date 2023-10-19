package com.ecommerceshop.repository.member;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberLog extends ElasticsearchRepository<com.ecommerceshop.dto.document.emp.EmpBase, String> {
}
