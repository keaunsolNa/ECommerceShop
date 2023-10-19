package com.ecommerceshop.repository.basket;

import com.ecommerceshop.dto.document.basket.BasketBase;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketBaseRepository extends ElasticsearchRepository<BasketBase, String> {
}
