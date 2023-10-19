package com.ecommerceshop.repository.area;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EMDAreas extends ElasticsearchRepository<com.ecommerceshop.dto.document.area.EMDAreas, String> {
}
