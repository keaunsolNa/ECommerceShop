package com.ecommerceshop.service.api;

import com.ecommerceshop.dto.document.aut.Authority;
import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.dto.document.product.Categories;
import com.ecommerceshop.repository.aut.AuthorityRepository;
import com.ecommerceshop.repository.aut.UserRoleRepository;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import com.ecommerceshop.repository.member.MemberBaseRepository;
import com.ecommerceshop.repository.product.CategoriesRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ApiService {

    private final AuthorityRepository authorityRepository;
    private final EmpBaseRepository empBaseRepository;
    private final MemberBaseRepository memberBaseRepository;
    private final UserRoleRepository userRoleRepository;
    private final CategoriesRepository categoriesRepository;

    public ApiService(AuthorityRepository authorityRepository, UserRoleRepository userRoleRepository,
                      EmpBaseRepository empBaseRepository, MemberBaseRepository memberBaseRepository,
                      CategoriesRepository categoriesRepository) {

        this.authorityRepository = authorityRepository;
        this.userRoleRepository = userRoleRepository;
        this.empBaseRepository = empBaseRepository;
        this.memberBaseRepository = memberBaseRepository;
        this.categoriesRepository = categoriesRepository;
    }

    public List<String> authorityDocumentationSearch() {

        Iterable<Authority> authorityList = authorityRepository.findAll();
        List<String> authorityStringList = new ArrayList<>();

        for (Authority authority : authorityList
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

    public List<String> productBaseStateRequest() {

        List<String> productBaseStateList = new ArrayList<>();
        productBaseStateList.add("신규 상품");
        productBaseStateList.add("이벤트 상품");
        productBaseStateList.add("판매 중지 상품");
        productBaseStateList.add("입고 대기 상품");
        productBaseStateList.add("할인 상품");
        return productBaseStateList;
    }

    public Iterable<UserRole> userRoleRequest() {

        return userRoleRepository.findAll();
    }

    public List<String> categoriesRequest() {

        Iterable<Categories> categories = categoriesRepository.findAll();

        List<String> categorieList = new ArrayList<>();
        for (Categories categorieslist : categories) {

            categorieList.add(categorieslist.getName());
        }

        return categorieList;
    }

    // 아이디 중복 체크
    public boolean idDupCheck(String id) {

        boolean dupCheck = false;
        try {
            EmpBase empBase = empBaseRepository.findById(id).orElseThrow(() -> new Exception("해당하는 문서가 없습니다."));
        } catch (Exception e) {

            try {
                MemberBase memberBase = memberBaseRepository.findById(id).orElseThrow(() -> new Exception("해당하는 문서가 없습니다."));
            } catch (Exception exception) {
                dupCheck = true;
            }
        }

        System.out.println(dupCheck);
        return dupCheck;
    }
}
