package com.ecommerceshop.controller.api;

import com.ecommerceshop.dto.DTO.EmpBaseDTO;
import com.ecommerceshop.dto.document.aut.Authority;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.product.Categories;
import com.ecommerceshop.service.api.AddDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AddDocumentController {

    private final AddDocumentService addDocumentService;

    @Autowired
    public AddDocumentController(AddDocumentService addDocumentService) {
        this.addDocumentService = addDocumentService;
    }

    // 카테고리 생성
    @PostMapping("/categories")
    public Iterable<Categories> categoriesAddRequest(@RequestBody List<Categories> categoriesList) {

        return addDocumentService.addNewCategories(categoriesList);
    }

    // 유저 권한 생성
    @PostMapping("/authority")
    public Iterable<Authority> authorityAddRequest(@RequestBody List<Authority> userRoleList) {

        return addDocumentService.addAuthorityAddRequest(userRoleList);
    }

    @PostMapping("/employee")
    public Iterable<EmpBase> employeeAddRequest(@RequestBody List<EmpBaseDTO> empBaseDTOList) {

        return addDocumentService.addEmployeeAddRequest(empBaseDTOList);
    }
}
