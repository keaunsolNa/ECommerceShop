package com.ecommerceshop.repository.member;

import com.ecommerceshop.dto.document.member.MemberSI;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberSIRepository extends ElasticsearchRepository<MemberSI, String> {
}
