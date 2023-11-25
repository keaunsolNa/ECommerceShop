package com.ecommerceshop.service.api;

import com.ecommerceshop.dto.document.product.Categories;
import com.ecommerceshop.repository.product.CategoriesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddDocumentService {

    private final CategoriesRepository categoriesRepository;

    public AddDocumentService(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    public Iterable<Categories> addNewCategories(List<Categories> categories) {

        categoriesRepository.saveAll(categories);
        return categoriesRepository.findAll();

    }
}
