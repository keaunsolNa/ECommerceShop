package com.ecommerceshop.repository.member;

import com.ecommerceshop.dto.document.member.MemberLog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberLogRepository extends ElasticsearchRepository<MemberLog, String> {
}
