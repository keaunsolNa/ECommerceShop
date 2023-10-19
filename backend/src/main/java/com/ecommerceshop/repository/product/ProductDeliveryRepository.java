package com.ecommerceshop.repository.product;

import com.ecommerceshop.dto.document.product.ProductDelivery;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDeliveryRepository extends ElasticsearchRepository<ProductDelivery, String> {
}
