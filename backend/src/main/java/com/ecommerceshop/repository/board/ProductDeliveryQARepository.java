package com.ecommerceshop.repository.board;

import com.ecommerceshop.dto.document.board.ProductDeliveryQA;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDeliveryQARepository extends ElasticsearchRepository<ProductDeliveryQA, String> {
}
