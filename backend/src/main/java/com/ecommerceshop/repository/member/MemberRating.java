package com.ecommerceshop.repository.member;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRating extends ElasticsearchRepository<com.ecommerceshop.dto.document.member.MemberRating, String> {
}
