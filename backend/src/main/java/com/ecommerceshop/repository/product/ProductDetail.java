package com.ecommerceshop.repository.product;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDetail extends ElasticsearchRepository<com.ecommerceshop.dto.document.product.ProductDetail, String> {
}
