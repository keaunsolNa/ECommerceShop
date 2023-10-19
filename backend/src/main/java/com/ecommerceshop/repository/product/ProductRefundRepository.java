package com.ecommerceshop.repository.product;

import com.ecommerceshop.dto.document.product.ProductRefund;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRefundRepository extends ElasticsearchRepository<ProductRefund, String> {
}
