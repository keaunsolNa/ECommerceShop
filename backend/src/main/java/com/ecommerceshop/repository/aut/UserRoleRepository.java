package com.ecommerceshop.repository.aut;

import com.ecommerceshop.dto.document.aut.UserRole;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRoleRepository extends ElasticsearchRepository<UserRole, String> {
    Optional<UserRole> findByEmpId(String id);
    Optional<UserRole> findByUserId(String id);
    Optional<UserRole> findBySsoId(String id);
}
