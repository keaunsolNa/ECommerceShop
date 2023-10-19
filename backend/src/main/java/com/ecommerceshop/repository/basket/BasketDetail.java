package com.ecommerceshop.repository.basket;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketDetail extends ElasticsearchRepository<com.ecommerceshop.dto.document.basket.BasketDetail, String> {
}
