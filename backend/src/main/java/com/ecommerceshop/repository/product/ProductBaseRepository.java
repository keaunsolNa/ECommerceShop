package com.ecommerceshop.repository.product;

import com.ecommerceshop.dto.document.product.ProductBase;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductBaseRepository extends ElasticsearchRepository<ProductBase, String> {
}
