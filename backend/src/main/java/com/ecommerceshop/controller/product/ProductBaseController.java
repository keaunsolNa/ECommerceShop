package com.ecommerceshop.controller.product;

import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.product.ProductBase;
import com.ecommerceshop.service.product.ProductBaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/productBase")
public class ProductBaseController {

    private final ProductBaseService productBaseService;

    @Autowired
    public ProductBaseController(ProductBaseService productBaseService) { this.productBaseService = productBaseService; };

    @PostMapping()
    public ResponseEntity<ProductBase> productBaseDocumentCreate(@RequestBody ProductBase productBase) {

        System.out.println(productBase);
        try {

            return ResponseEntity.ok(productBaseService.productBaseCreate(productBase));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/byCondition")
    public ResponseEntity<Iterable<ProductBase>> productBaseDocumentListSearch(ProductBase searchCondition) {
        return ResponseEntity.ok(productBaseService.productBaseListSearch(searchCondition));
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<ProductBase> productBaseDocumentDeleteById(@PathVariable String id) {

        try {
            productBaseService.productBaseDocumentDeleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok().build();
    }
}
