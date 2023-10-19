package com.ecommerceshop.repository.member;

import com.ecommerceshop.dto.document.member.MemberCoupon;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberCouponRepository extends ElasticsearchRepository<MemberCoupon, String> {
}
