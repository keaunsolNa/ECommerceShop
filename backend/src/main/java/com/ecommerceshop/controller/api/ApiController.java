package com.ecommerceshop.controller.api;

import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.service.api.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/role")
    public List<String> authorityDocumentListSearch() {

        return apiService.authorityDocumentationSearch();
    }

    @GetMapping("/employeeState")
    public List<String> userStateRequest() {

        return apiService.userStateRequest();
    }

    @GetMapping("/productState")
    public List<String> productStateRequest() {

        return apiService.productBaseStateRequest();
    }

    @GetMapping("/userRole")
    public Iterable<UserRole> userRoleRequest() {

        return apiService.userRoleRequest();
    }

    @GetMapping("/categories")
    public List<String> categoriesRequest() {

        return apiService.categoriesRequest();
    }
}
