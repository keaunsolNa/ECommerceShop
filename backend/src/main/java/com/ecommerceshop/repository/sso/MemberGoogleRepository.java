package com.ecommerceshop.repository.sso;

import com.ecommerceshop.dto.document.sso.MemberGoogle;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberGoogleRepository extends ElasticsearchRepository<MemberGoogle, String> {
}
