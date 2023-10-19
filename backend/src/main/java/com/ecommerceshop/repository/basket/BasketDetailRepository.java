package com.ecommerceshop.repository.basket;

import com.ecommerceshop.dto.document.basket.BasketDetail;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketDetailRepository extends ElasticsearchRepository<BasketDetail, String> {
}
