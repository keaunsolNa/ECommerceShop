package com.ecommerceshop.controller.api;

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

    @PostMapping("/categories")
    public Iterable<Categories> categoriesAddRequest(@RequestBody List<Categories> categoriesList) {

        return addDocumentService.addNewCategories(categoriesList);
    }
}
