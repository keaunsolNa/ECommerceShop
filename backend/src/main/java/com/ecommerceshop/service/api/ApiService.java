package com.ecommerceshop.service.api;

import com.ecommerceshop.dto.document.aut.Authority;
import com.ecommerceshop.repository.aut.AuthorityRepository;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

//        Authority authority = new Authority();
//        authority.setId("40");
//        authority.setAuthorityName("CEO");
//        authority.setAuthorityDesc("CEO");
//        authorityRepository.save(authority);
//
//        authority = new Authority();
//        authority.setId("30");
//        authority.setAuthorityName("재정관리자");
//        authority.setAuthorityDesc("재정관리자");
//        authorityRepository.save(authority);
//
//        authority = new Authority();
//        authority.setId("20");
//        authority.setAuthorityName("인사관리자");
//        authority.setAuthorityDesc("인사관리자");
//        authorityRepository.save(authority);
//
//        authority = new Authority();
//        authority.setId("10");
//        authority.setAuthorityName("일반관리자");
//        authority.setAuthorityDesc("일반관리자");
//        authorityRepository.save(authority);

        System.out.println(authorityList);
        List<String> authorityStringList = new ArrayList<>();
        for (Authority authority: authorityList
             ) {
            authorityStringList.add(authority.getAuthorityName());
        }

        System.out.println(authorityStringList);
        return authorityStringList;
    }
}
