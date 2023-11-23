package com.ecommerceshop.service.emp;

import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.emp.EmpSI;
import com.ecommerceshop.dto.integrated.emp.EmpBaseDTO;
import com.ecommerceshop.module.CommonModule;
import com.ecommerceshop.module.common.SettingUserRole;
import com.ecommerceshop.module.employee.SettingEmpDocumentByDTO;
import com.ecommerceshop.repository.aut.UserRoleRepository;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import com.ecommerceshop.repository.emp.EmpSIRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

@Service
public class EmpBaseService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final EmpBaseRepository empBaseRepository;
    private final EmpSIRepository empsiRepository;
    private final UserRoleRepository userRoleRepository;
    private final CommonModule commonModule;
    private final SettingUserRole settingUserRole;
    private final SettingEmpDocumentByDTO settingEmpDocumentByDTO;

    public EmpBaseService(EmpBaseRepository empBaseRepository, EmpSIRepository empsiRepository, UserRoleRepository userRoleRepository,
                          CommonModule commonModule, SettingUserRole settingUserRole, SettingEmpDocumentByDTO settingEmpDocumentByDTO,
                          ElasticsearchOperations elasticsearchOperations) {
        this.empBaseRepository = empBaseRepository;
        this.empsiRepository = empsiRepository;
        this.userRoleRepository = userRoleRepository;
        this.commonModule = commonModule;
        this.settingUserRole = settingUserRole;
        this.settingEmpDocumentByDTO = settingEmpDocumentByDTO;
        this.elasticsearchOperations = elasticsearchOperations;
    }

    public EmpBase empBaseDocumentCreate(EmpBaseDTO empBaseDTO) throws JsonProcessingException {

        EmpBase empBase = settingEmpDocumentByDTO.settingEmpDocument(empBaseDTO);
        EmpSI empSI = settingEmpDocumentByDTO.settingEmpSIDocument(empBaseDTO);

        empBaseRepository.save(empBase);
        empsiRepository.save(empSI);
        userRoleRepository.saveAll(settingUserRole.settingUserRole(empBase, empBaseDTO.getId()));

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
        empBaseDTO.setBirth(empBase.getBirth());
        empBaseDTO.setAddress(empSI.getAddress());
        empBaseDTO.setGender(empBase.getGender());
        empBaseDTO.setRole(empBase.getRole());
        empBaseDTO.setState(empBase.getState());
        empBaseDTO.setFileId(empBase.getFileId());
        empBaseDTO.setCallNumber(empSI.getCallNumber());
        empBaseDTO.setPhoneNumber(empSI.getPhoneNumber());
        empBaseDTO.setCreateDate(commonModule.parsingDate(empBase.getCreateDate()));

        return empBaseDTO;
    }

    public void empBaseDocumentDeleteById(String id) throws Exception {

        EmpBase empBase = empBaseRepository.findById(id).orElseThrow(() -> new Exception("해당하는 문서가 없습니다."));
        empBase.setState("탈퇴 계정");
        empBaseRepository.save(empBase);

    }

    public EmpBase empBaseDocumentUpdate(EmpBaseDTO empBaseDTO) throws Exception {

        EmpBase empBase = empBaseRepository.findById(empBaseDTO.getId()).orElseThrow(() -> new Exception("해당하는 문서가 없습니다."));
        EmpSI empSI = empsiRepository.findById(empBaseDTO.getId()).orElseThrow(() -> new Exception("해당하는 문서가 없습니다."));

        empBase.setEmail(empBaseDTO.getEmail() != null ? empBaseDTO.getEmail() : empBase.getEmail());
        empBase.setName(empBaseDTO.getName() != null ? empBaseDTO.getName() : empBase.getName());
        empSI.setPhoneNumber(empBaseDTO.getPhoneNumber() != null ? empBaseDTO.getPhoneNumber() : empSI.getPhoneNumber());
        empSI.setCallNumber(empBaseDTO.getCallNumber() != null ? empBaseDTO.getCallNumber() : empSI.getCallNumber());
        empSI.setAddress(empBaseDTO.getAddress() != null ? empBaseDTO.getAddress() : empSI.getAddress());

        if(empBaseDTO.getRole() != null) {

            empBase.setRole(empBaseDTO.getRole());
            userRoleRepository.saveAll(settingUserRole.settingUserRole(empBase, empBaseDTO.getId()));

        } else empBase.setRole(empBase.getRole());

        empBaseRepository.save(empBase);
        empsiRepository.save(empSI);

        return empBase;
    }

    public EmpBase empBaseDocumentSearchForTest() {
        NativeQuery query = commonModule.makeMatchAllQuery();
        SearchHits<EmpBase> searchHits = elasticsearchOperations.search(query, EmpBase.class);
        return searchHits.getSearchHit(0).getContent();
    }
}
