package com.ecommerceshop.repository.file;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductPic extends ElasticsearchRepository<com.ecommerceshop.dto.document.emp.EmpBase, String> {
}
