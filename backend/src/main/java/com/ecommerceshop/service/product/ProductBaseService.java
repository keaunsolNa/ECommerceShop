package com.ecommerceshop.service.product;

import com.ecommerceshop.dto.DTO.ProductDTO;
import com.ecommerceshop.dto.document.product.Categories;
import com.ecommerceshop.dto.document.product.ProductAndCategories;
import com.ecommerceshop.dto.document.product.ProductBase;
import com.ecommerceshop.module.CommonModule;
import com.ecommerceshop.repository.product.CategoriesRepository;
import com.ecommerceshop.repository.product.ProductAndCategoriesRepository;
import com.ecommerceshop.repository.product.ProductBaseRepository;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ProductBaseService {

    private final ProductBaseRepository productBaseRepository;
    private final CategoriesRepository categoriesRepository;
    private final ProductAndCategoriesRepository productAndCategoriesRepository;
    private final ElasticsearchOperations elasticsearchOperations;
    private final CommonModule commonModule;
    private static final String PRODUCT_NOT_FOUND = "해당하는 상품이 없습니다.";

    public ProductBaseService(ProductBaseRepository productBaseRepository,
                              ProductAndCategoriesRepository productAndCategoriesRepository, CategoriesRepository categoriesRepository,
                              ElasticsearchOperations elasticsearchOperations,
                              CommonModule commonModule) {

        this.productBaseRepository = productBaseRepository;
        this.productAndCategoriesRepository = productAndCategoriesRepository;
        this.categoriesRepository = categoriesRepository;
        this.elasticsearchOperations = elasticsearchOperations;
        this.commonModule = commonModule;
    }

    public ProductBase productBaseCreate(ProductDTO productDTO) {

        ProductBase productBase = new ProductBase();
        productBase.setPrice(productDTO.getPrice());
        productBase.setName(productDTO.getName());
        productBase.setDesc(productDTO.getDesc());
        productBase.setCreateDate(new Date());
        productBase.setAmount(productDTO.getAmount());
        productBase.setState(productDTO.getState());
        productBase.setViewCount(0);

        ProductBase createProductBase = productBaseRepository.save(productBase);

        String categoriesId = categoriesRepository.findByName(productDTO.getCategories()).getId();
        ProductAndCategories productAndCategories = new ProductAndCategories();
        productAndCategories.setId(createProductBase.getId());
        productAndCategories.setCategoriesId(categoriesId);

        productAndCategoriesRepository.save(productAndCategories);
        return productBase;

    }

    public Iterable<ProductBase> productBaseListSearch(String sort) {

        NativeQuery query = commonModule.makeMatchAllQuery();

        SearchHits<ProductBase> searchHits = elasticsearchOperations.search(query, ProductBase.class);
        return commonModule.getListFromSearchHit(searchHits);

    }

    public ProductDTO productBaseDocumentSearchById(String id) throws Exception {

        ProductBase productBase = productBaseRepository.findById(id).orElseThrow(() -> new Exception(PRODUCT_NOT_FOUND));
        productBase.setViewCount(productBase.getViewCount() + 1);
        productBaseRepository.save(productBase);

        ProductAndCategories productAndCategories = productAndCategoriesRepository.findById(id).orElseThrow(() -> new Exception(PRODUCT_NOT_FOUND));

        Categories categories = categoriesRepository.findById(productAndCategories.getCategoriesId())
                .orElseThrow(() -> new Exception(PRODUCT_NOT_FOUND));

        String categoriesName = categories.getName();

        ProductDTO productDTO = new ProductDTO();
        productDTO.setCategories(categoriesName);
        productDTO.setName(productBase.getName());
        productDTO.setDesc(productBase.getDesc());
        productDTO.setState(productBase.getState());
        productDTO.setAmount(productBase.getAmount());
        productDTO.setId(productBase.getId());
        productDTO.setPrice(productBase.getPrice());
        productDTO.setViewCount(productBase.getViewCount());
        productDTO.setCreateDate(commonModule.parsingDate(productBase.getCreateDate()));
        productDTO.setFileId(productBase.getFileId());

        return productDTO;
    }

    public ProductBase productBaseDocumentUpdate(ProductDTO productDTO) throws Exception {

        ProductBase productBaseDocument = productBaseRepository.findById(productDTO.getId()).orElseThrow(() -> new Exception(PRODUCT_NOT_FOUND));

        productBaseDocument.setName(productDTO.getName() != null ? productDTO.getName() : productBaseDocument.getName());
        productBaseDocument.setDesc(productDTO.getDesc() != null ? productDTO.getDesc() : productBaseDocument.getDesc());
        productBaseDocument.setState(productDTO.getState() != null ? productDTO.getState() : productBaseDocument.getState());
        productBaseDocument.setAmount(productDTO.getAmount() != null ? productDTO.getAmount() : productBaseDocument.getAmount());
        productBaseDocument.setPrice(productDTO.getPrice() != null ? productDTO.getPrice() : productBaseDocument.getPrice());

        ProductAndCategories productAndCategories = productAndCategoriesRepository.findById(productDTO.getId()).orElseThrow(() -> new Exception(PRODUCT_NOT_FOUND));
        Categories categories = categoriesRepository.findById(productAndCategories.getCategoriesId()).orElseThrow(() -> new Exception(PRODUCT_NOT_FOUND));

        if (!productDTO.getCategories().equals(categories.getName())) {

            productAndCategories.setCategoriesId(categoriesRepository.findByName(productDTO.getName()).getName());
            productAndCategoriesRepository.save(productAndCategories);
        }
        return productBaseRepository.save(productBaseDocument);
    }

    public void productBaseDocumentDeleteById(String id) throws Exception {

        ProductBase productBase = productBaseRepository.findById(id).orElseThrow(() -> new Exception(PRODUCT_NOT_FOUND));
        productBase.setState("판매 중지 상품");
        productBaseRepository.save(productBase);

    }
}
