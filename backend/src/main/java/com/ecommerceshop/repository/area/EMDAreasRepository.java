package com.ecommerceshop.repository.area;

import com.ecommerceshop.dto.document.area.EMDAreas;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EMDAreasRepository extends ElasticsearchRepository<EMDAreas, String> {
}
