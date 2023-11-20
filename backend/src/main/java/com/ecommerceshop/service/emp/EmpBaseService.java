package com.ecommerceshop.service.emp;

import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.emp.EmpSI;
import com.ecommerceshop.dto.integrated.emp.EmpBaseDTO;
import com.ecommerceshop.module.CommonModule;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import com.ecommerceshop.repository.emp.EmpSIRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmpBaseService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final EmpBaseRepository empBaseRepository;
    private final EmpSIRepository empsiRepository;
    private final CommonModule commonModule;

    public EmpBaseService(EmpBaseRepository empBaseRepository, EmpSIRepository empsiRepository, CommonModule commonModule,
                          ElasticsearchOperations elasticsearchOperations) {
        this.empBaseRepository = empBaseRepository;
        this.empsiRepository = empsiRepository;
        this.commonModule = commonModule;
        this.elasticsearchOperations = elasticsearchOperations;
    }

    public EmpBase empBaseDocumentCreate(EmpBase empBase, EmpSI empSI, List<UserRole> userRoleList) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        List<IndexQuery> userRoleCreateQueryList = new ArrayList<>();

        for(UserRole userRole : userRoleList) {

            IndexQuery indexQuery = new IndexQuery();
            indexQuery.setSource(objectMapper.writeValueAsString(userRole));
            userRoleCreateQueryList.add(indexQuery);
        }

        System.out.println(userRoleCreateQueryList);
        IndexCoordinates userRoleIndexCoordinates = IndexCoordinates.of("user-role");

        empBaseRepository.save(empBase);
        empsiRepository.save(empSI);

        elasticsearchOperations.bulkIndex(userRoleCreateQueryList, userRoleIndexCoordinates);
        elasticsearchOperations.indexOps(userRoleIndexCoordinates).refresh();

        return empBase;
    }

    public Iterable<EmpBase> empBaseDocumentListSearch() {

        NativeQuery query = commonModule.makeMatchAllQuery();
        SearchHits<EmpBase> searchHits = elasticsearchOperations.search(query, EmpBase.class);
        return commonModule.getListFromSearchHit(searchHits);
    }

    public EmpBaseDTO empBaseDocumentSearchById(String id) throws Exception {

        EmpBase empBase = empBaseRepository.findById(id).orElseThrow(() -> new Exception("해당하는 문서가 없습니다."));
        EmpSI empSI = empsiRepository.findById(id).orElseThrow(() -> new Exception("해당하는 문서가 없습니다."));

        EmpBaseDTO empBaseDTO = new EmpBaseDTO();
        empBaseDTO.setId(empBase.getId());
        empBaseDTO.setEmail(empBase.getEmail());
        empBaseDTO.setName(empBase.getName());
        empBaseDTO.setBirth(commonModule.parsingDate(empBase.getBirth()));
        empBaseDTO.setAddress(empSI.getAddress());
        empBaseDTO.setGender(empBase.getGender());
        empBaseDTO.setRole(empBase.getRole());
        empBaseDTO.setState(empBase.getState());
        empBaseDTO.setFileId(empBase.getFileId());
        empBaseDTO.setCallNumber(empSI.getCallNumber());
        empBaseDTO.setPhoneNumber(empSI.getPhoneNumber());
        empBaseDTO.setCreateDate(commonModule.parsingDate(empBase.getCreateDate()));

        System.out.println(empBaseDTO);
        return empBaseDTO;
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
