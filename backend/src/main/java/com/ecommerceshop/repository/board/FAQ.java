package com.ecommerceshop.repository.board;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FAQ extends ElasticsearchRepository<com.ecommerceshop.dto.document.board.FAQ, String> {
}
