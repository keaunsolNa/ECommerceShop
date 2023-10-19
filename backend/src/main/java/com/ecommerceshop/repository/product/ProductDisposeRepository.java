package com.ecommerceshop.repository.product;

import com.ecommerceshop.dto.document.product.ProductDispose;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDisposeRepository extends ElasticsearchRepository<ProductDispose, String> {
}
