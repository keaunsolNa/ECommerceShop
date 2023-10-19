package com.ecommerceshop.repository.area;

import com.ecommerceshop.dto.document.area.SIDOAreas;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SIDOAreasRepository extends ElasticsearchRepository<SIDOAreas, String> {
}
