package com.ecommerceshop.controller.product;

import com.ecommerceshop.dto.DTO.ProductDTO;
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
    public ProductBaseController(ProductBaseService productBaseService) {
        this.productBaseService = productBaseService;
    }

    @PostMapping()
    public ResponseEntity<ProductBase> productBaseDocumentCreate(@RequestBody ProductDTO productDTO) {

        return ResponseEntity.ok(productBaseService.productBaseCreate(productDTO));
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<ProductBase>> productBaseDocumentListSearch() {
        return ResponseEntity.ok(productBaseService.productBaseListSearch("id"));
    }

    @GetMapping("/all/{sort}")
    public ResponseEntity<Iterable<ProductBase>> productBaseDocumentListSearchByAmount(@PathVariable String sort) {
        return ResponseEntity.ok(productBaseService.productBaseListSearch(sort));
    }

    @GetMapping("/{id}")
    public ProductDTO productBaseSearchById(@PathVariable String id) {

        try {
            return ResponseEntity.ok(productBaseService.productBaseDocumentSearchById(id)).getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PatchMapping()
    public ResponseEntity<ProductBase> productBaseDocumentUpdate(@RequestBody ProductDTO productDTO) {

        try {
            return ResponseEntity.ok(productBaseService.productBaseDocumentUpdate(productDTO));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductBase> productBaseDocumentDeleteById(@PathVariable String id) {

        try {
            productBaseService.productBaseDocumentDeleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok().build();
    }
}
