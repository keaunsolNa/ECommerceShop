package com.ecommerceshop.repository.area;

import com.ecommerceshop.dto.document.area.SIGGAreas;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SIGGAreasRepository extends ElasticsearchRepository<SIGGAreas, String> {
}
