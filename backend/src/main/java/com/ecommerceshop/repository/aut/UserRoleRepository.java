package com.ecommerceshop.repository.aut;

import com.ecommerceshop.dto.document.aut.UserRole;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends ElasticsearchRepository<UserRole, String> {
}
