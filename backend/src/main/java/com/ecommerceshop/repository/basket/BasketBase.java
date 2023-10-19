package com.ecommerceshop.repository.basket;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketBase extends ElasticsearchRepository<com.ecommerceshop.dto.document.basket.BasketBase, String> {
}
