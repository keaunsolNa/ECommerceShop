package com.ecommerceshop.service.emp;

import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.emp.EmpSI;
import com.ecommerceshop.module.CommonModule;
import com.ecommerceshop.repository.emp.EMPSIRepository;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

@Service
public class EmpBaseService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final EmpBaseRepository empBaseRepository;
    private final EMPSIRepository empsiRepository;
    private final CommonModule commonModule;


    public EmpBaseService(EmpBaseRepository empBaseRepository, EMPSIRepository empsiRepository, CommonModule commonModule,
                          ElasticsearchOperations elasticsearchOperations) {
        this.empBaseRepository = empBaseRepository;
        this.empsiRepository = empsiRepository;
        this.commonModule = commonModule;
        this.elasticsearchOperations = elasticsearchOperations;
    }

    public EmpBase empBaseDocumentCreate(EmpBase empBase, EmpSI empSI) {

        empsiRepository.save(empSI);
        return this.empBaseRepository.save(empBase);
    }

    public Iterable<EmpBase> empBaseDocumentListSearch() {

        NativeQuery query = commonModule.makeMatchAllQuery();
        SearchHits<EmpBase> searchHits = elasticsearchOperations.search(query, EmpBase.class);
        return commonModule.getListFromSearchHit(searchHits);
    }

    public EmpBase empBaseDocumentSearchById(String id) throws Exception {

        return empBaseRepository.findById(id).orElseThrow(() -> new Exception("해당하는 문서가 없습니다."));
    }

    public EmpBase empBaseDocumentDeleteById(String id) throws Exception {

        EmpBase empBase = empBaseRepository.findById(id).orElseThrow(() -> new Exception(("해당하는 문서가 없습니다.")));
        empBase.setState("RED");
        empBaseRepository.save(empBase);

        return empBase;
    }

    public EmpBase empBaseDocumentSearchForTest() {
        NativeQuery query = commonModule.makeMatchAllQuery();
        SearchHits<EmpBase> searchHits = elasticsearchOperations.search(query, EmpBase.class);
        return searchHits.getSearchHit(0).getContent();
    }
}
