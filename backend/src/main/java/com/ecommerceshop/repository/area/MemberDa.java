package com.ecommerceshop.repository.area;

import com.ecommerceshop.dto.document.area.MemberDA;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberDa extends ElasticsearchRepository<MemberDA, String> {
}
