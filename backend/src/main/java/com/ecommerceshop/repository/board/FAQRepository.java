package com.ecommerceshop.repository.board;

import com.ecommerceshop.dto.document.board.FAQ;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FAQRepository extends ElasticsearchRepository<FAQ, String> {
}
