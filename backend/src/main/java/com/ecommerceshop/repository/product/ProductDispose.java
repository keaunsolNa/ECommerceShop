package com.ecommerceshop.repository.product;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDispose extends ElasticsearchRepository<com.ecommerceshop.dto.document.product.ProductDispose, String> {
}
