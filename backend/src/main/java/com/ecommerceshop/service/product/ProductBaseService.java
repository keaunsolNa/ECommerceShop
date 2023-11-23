package com.ecommerceshop.service.product;

import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.product.ProductBase;
import com.ecommerceshop.module.CommonModule;
import com.ecommerceshop.repository.product.ProductBaseRepository;
import com.ecommerceshop.repository.product.ProductDetailRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ProductBaseService {

    private final ProductBaseRepository productBaseRepository;
    private final ProductDetailRepository productDetailRepository;
    private final ElasticsearchOperations elasticsearchOperations;
    private final CommonModule commonModule;

    public ProductBaseService(ProductBaseRepository productBaseRepository, ProductDetailRepository productDetailRepository,
                              ElasticsearchOperations elasticsearchOperations,
                              CommonModule commonModule) {

        this.productBaseRepository = productBaseRepository;
        this.productDetailRepository = productDetailRepository;
        this.elasticsearchOperations = elasticsearchOperations;
        this.commonModule = commonModule;
    }

    public ProductBase productBaseCreate(ProductBase productBase) throws JsonProcessingException {

        productBase.setViewCount(0);
        productBase.setCreateDate(new Date());
        return productBaseRepository.save(productBase);
    }

    public Iterable<ProductBase> productBaseListSearch(ProductBase condition) {

        System.out.println("Service");
        System.out.println(condition);
        NativeQuery query = commonModule.makeMatchAllQuery();
        SearchHits<ProductBase> searchHits = elasticsearchOperations.search(query, ProductBase.class);

        return commonModule.getListFromSearchHit(searchHits);

    }

    public void productBaseDocumentDeleteById(String id) throws Exception {

        ProductBase productBase = productBaseRepository.findById(id).orElseThrow(() -> new Exception("해당하는 문서가 없습니다."));
        productBase.setState("판매 중지 상품");
        productBaseRepository.save(productBase);

    }
}
