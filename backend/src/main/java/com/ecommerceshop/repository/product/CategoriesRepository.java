package com.ecommerceshop.repository.product;

import com.ecommerceshop.dto.document.product.Categories;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriesRepository extends ElasticsearchRepository<Categories, String> {
}
