package com.ecommerceshop.repository.board;

import com.ecommerceshop.dto.document.board.QAAnswer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QAAnswerRepository extends ElasticsearchRepository<QAAnswer, String> {
}
