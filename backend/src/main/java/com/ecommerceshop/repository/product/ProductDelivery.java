package com.ecommerceshop.repository.product;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDelivery extends ElasticsearchRepository<com.ecommerceshop.dto.document.product.ProductDelivery, String> {
}
