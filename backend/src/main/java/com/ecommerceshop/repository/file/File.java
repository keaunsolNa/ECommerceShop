package com.ecommerceshop.repository.file;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface File extends ElasticsearchRepository<com.ecommerceshop.dto.document.file.File, String> {
}
