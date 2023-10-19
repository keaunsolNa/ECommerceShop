package com.ecommerceshop.repository.file;

import com.ecommerceshop.dto.document.file.ProductPic;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductPicRepository extends ElasticsearchRepository<ProductPic, String> {
}
