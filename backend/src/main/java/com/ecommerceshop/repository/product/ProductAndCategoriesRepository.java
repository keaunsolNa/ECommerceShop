package com.ecommerceshop.repository.product;

import com.ecommerceshop.dto.document.product.ProductAndCategories;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductAndCategoriesRepository extends ElasticsearchRepository<ProductAndCategories, String> {
}
