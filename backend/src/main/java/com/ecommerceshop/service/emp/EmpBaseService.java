package com.ecommerceshop.service.emp;

import com.ecommerceshop.module.CommonModule;
import com.ecommerceshop.repository.emp.EmpBase;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpBaseService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final EmpBase empBase;
    private final CommonModule commonModule;


    public EmpBaseService(EmpBase empBase, CommonModule commonModule,
                          ElasticsearchOperations elasticsearchOperations) {
        this.empBase = empBase;
        this.commonModule = commonModule;
        this.elasticsearchOperations = elasticsearchOperations;
    }

    public com.ecommerceshop.dto.document.emp.EmpBase empBaseDocumentCreate(com.ecommerceshop.dto.document.emp.EmpBase empBase) {
        return this.empBase.save(empBase);
    }

    public Iterable<com.ecommerceshop.dto.document.emp.EmpBase> empBaseDocumentSearch() {

        NativeQuery query = commonModule.makeMatchAllQuery();
        SearchHits<com.ecommerceshop.dto.document.emp.EmpBase> searchHits = elasticsearchOperations.search(query, com.ecommerceshop.dto.document.emp.EmpBase.class);
        List<com.ecommerceshop.dto.document.emp.EmpBase> frmBizUnitList = commonModule.getListFromSearchHit(searchHits);

        return frmBizUnitList;
    }
}
