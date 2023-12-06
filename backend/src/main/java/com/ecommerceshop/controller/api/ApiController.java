package com.ecommerceshop.controller.api;

import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.service.api.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final ApiService apiService;

    @Autowired
    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    // 권한 목록 조회
    @GetMapping("/role")
    public List<String> authorityDocumentListSearch() {

        return apiService.authorityDocumentationSearch();
    }

    // 계정 상태 목록 조회
    @GetMapping("/employeeState")
    public List<String> userStateRequest() {

        return apiService.userStateRequest();
    }

    // 상품 상태 목록 조회
    @GetMapping("/productState")
    public List<String> productStateRequest() {

        return apiService.productBaseStateRequest();
    }

    // 유저 권한 조회
    @GetMapping("/userRole")
    public Iterable<UserRole> userRoleRequest() {

        return apiService.userRoleRequest();
    }

    // 카테고리 목록 조회
    @GetMapping("/categories")
    public List<String> categoriesRequest() {

        return apiService.categoriesRequest();
    }

    // id로 중복 체크
    @GetMapping("/dupCheck/{id}")
    public boolean empIdDupCheck(@PathVariable String id) {
        return apiService.idDupCheck(id);
    }
}
