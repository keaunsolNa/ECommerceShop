package com.ecommerceshop.repository.member;

import com.ecommerceshop.dto.document.member.MemberRating;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRatingRepository extends ElasticsearchRepository<MemberRating, String> {
}
