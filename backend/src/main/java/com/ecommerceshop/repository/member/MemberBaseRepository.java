package com.ecommerceshop.repository.member;

import com.ecommerceshop.dto.document.member.MemberBase;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberBaseRepository extends ElasticsearchRepository<MemberBase, String> {
}
