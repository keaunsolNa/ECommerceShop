package com.ecommerceshop.repository.product;

import com.ecommerceshop.dto.document.product.ProductReview;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductReviewRepository extends ElasticsearchRepository<ProductReview, String> {
}
