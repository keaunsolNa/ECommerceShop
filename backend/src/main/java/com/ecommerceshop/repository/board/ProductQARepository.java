package com.ecommerceshop.repository.board;

import com.ecommerceshop.dto.document.board.ProductQA;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductQARepository extends ElasticsearchRepository<ProductQA, String> {
}
