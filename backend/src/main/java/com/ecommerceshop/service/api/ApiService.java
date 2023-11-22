package com.ecommerceshop.service.api;

import com.ecommerceshop.dto.document.aut.Authority;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.repository.aut.AuthorityRepository;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ApiService {

    private final AuthorityRepository authorityRepository;
    private final EmpBaseRepository empBaseRepository;

    public ApiService(AuthorityRepository authorityRepository,
                      EmpBaseRepository empBaseRepository) {

        this.authorityRepository = authorityRepository;
        this.empBaseRepository = empBaseRepository;
    }

    public List<String> authorityDocumentationSearch() {

        Iterable<Authority> authorityList = authorityRepository.findAll();
        List<String> authorityStringList = new ArrayList<>();

        for (Authority authority: authorityList
             ) {
            authorityStringList.add(authority.getAuthorityName());
        }

        return authorityStringList;
    }

    public List<String> userStateRequest() {

        List<String> userStateList = new ArrayList<>();
        userStateList.add("가입 대기");
        userStateList.add("활동 계정");
        userStateList.add("잠금 계정");
        userStateList.add("휴면 계정");
        userStateList.add("탈퇴 계정");
        userStateList.add("블랙 계정");

        return userStateList;
    }
}
