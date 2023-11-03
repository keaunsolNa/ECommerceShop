package com.ecommerceshop.repository.emp;

import com.ecommerceshop.dto.document.emp.EmpSI;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpSIRepository extends ElasticsearchRepository<EmpSI, String> {
}
