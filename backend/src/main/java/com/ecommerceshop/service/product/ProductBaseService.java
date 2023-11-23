package com.ecommerceshop.service.product;

import com.ecommerceshop.dto.document.product.ProductBase;
import com.ecommerceshop.repository.product.ProductBaseRepository;
import com.ecommerceshop.repository.product.ProductDetailRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Service;

@Service
public class ProductBaseService {

    private final ProductBaseRepository productBaseRepository;
    private final ProductDetailRepository productDetailRepository;
    private final ElasticsearchOperations elasticsearchOperations;

    public ProductBaseService(ProductBaseRepository productBaseRepository, ProductDetailRepository productDetailRepository,
                              ElasticsearchOperations elasticsearchOperations) {

        this.productBaseRepository = productBaseRepository;
        this.productDetailRepository = productDetailRepository;
        this.elasticsearchOperations = elasticsearchOperations;
    }

    public void productBaseCreate(ProductBase productBase) throws JsonProcessingException {

        productBaseRepository.save(productBase);

    }
}
