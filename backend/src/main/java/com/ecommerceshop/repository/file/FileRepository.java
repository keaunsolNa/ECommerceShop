package com.ecommerceshop.repository.file;

import com.ecommerceshop.dto.document.file.File;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends ElasticsearchRepository<File, String> {
}
