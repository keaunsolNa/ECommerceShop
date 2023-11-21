package com.ecommerceshop.service.api;

import com.ecommerceshop.dto.document.aut.Authority;
import com.ecommerceshop.repository.aut.AuthorityRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ApiService {

    private final AuthorityRepository authorityRepository;

    public ApiService(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    public List<String> authorityDocumentationSearch() {

        List<Authority> authorityList = (List<Authority>) authorityRepository.findAll();

        List<String> authorityStringList = new ArrayList<>();
        for (Authority authority: authorityList
             ) {
            authorityStringList.add(authority.getAuthorityName());
        }

        return authorityStringList;
    }
}
