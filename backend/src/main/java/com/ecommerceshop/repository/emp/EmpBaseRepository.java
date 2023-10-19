package com.ecommerceshop.repository.emp;

import com.ecommerceshop.dto.document.emp.EmpBase;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpBaseRepository extends ElasticsearchRepository<EmpBase, String> {
}
