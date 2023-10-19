package com.ecommerceshop.service.emp;

import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.module.CommonModule;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

@Service
public class EmpBaseService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final EmpBaseRepository empBaseRepository;
    private final CommonModule commonModule;


    public EmpBaseService(EmpBaseRepository empBaseRepository, CommonModule commonModule,
                          ElasticsearchOperations elasticsearchOperations) {
        this.empBaseRepository = empBaseRepository;
        this.commonModule = commonModule;
        this.elasticsearchOperations = elasticsearchOperations;
    }

    public EmpBase empBaseDocumentCreate(EmpBase empBase) {
        return this.empBaseRepository.save(empBase);
    }

    public Iterable<EmpBase> empBaseDocumentSearch() {

        NativeQuery query = commonModule.makeMatchAllQuery();
        SearchHits<EmpBase> searchHits = elasticsearchOperations.search(query, EmpBase.class);
        return commonModule.getListFromSearchHit(searchHits);
    }
}
