package com.ecommerceshop.service.emp;

import com.ecommerceshop.dto.DTO.EmpBaseDTO;
import com.ecommerceshop.dto.DTO.MemberDTO;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.emp.EmpSI;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.dto.document.member.MemberSI;
import com.ecommerceshop.module.CommonModule;
import com.ecommerceshop.module.common.SettingUserRole;
import com.ecommerceshop.module.employee.SettingEmpDocumentByDTO;
import com.ecommerceshop.repository.aut.UserRoleRepository;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import com.ecommerceshop.repository.emp.EmpSIRepository;
import com.ecommerceshop.repository.member.MemberBaseRepository;
import com.ecommerceshop.repository.member.MemberSIRepository;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

@Service
public class EmpBaseService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final EmpBaseRepository empBaseRepository;
    private final EmpSIRepository empsiRepository;
    private final MemberBaseRepository memberBaseRepository;
    private final MemberSIRepository memberSIRepository;
    private final UserRoleRepository userRoleRepository;
    private final CommonModule commonModule;
    private final SettingUserRole settingUserRole;
    private final SettingEmpDocumentByDTO settingEmpDocumentByDTO;

    private static final String DOCUMENT_NOT_FOUND = "해당하는 문서가 없습니다.";

    public EmpBaseService(EmpBaseRepository empBaseRepository, EmpSIRepository empsiRepository, UserRoleRepository userRoleRepository,
                          MemberBaseRepository memberBaseRepository, MemberSIRepository memberSIRepository,
                          CommonModule commonModule, SettingUserRole settingUserRole, SettingEmpDocumentByDTO settingEmpDocumentByDTO,
                          ElasticsearchOperations elasticsearchOperations) {
        this.empBaseRepository = empBaseRepository;
        this.empsiRepository = empsiRepository;
        this.memberBaseRepository = memberBaseRepository;
        this.memberSIRepository = memberSIRepository;
        this.userRoleRepository = userRoleRepository;
        this.commonModule = commonModule;
        this.settingUserRole = settingUserRole;
        this.settingEmpDocumentByDTO = settingEmpDocumentByDTO;
        this.elasticsearchOperations = elasticsearchOperations;
    }

    // 직원 카드 생성
    public EmpBase empBaseDocumentCreate(EmpBaseDTO empBaseDTO) {

        EmpBase empBase = settingEmpDocumentByDTO.settingEmpDocument(empBaseDTO);
        EmpSI empSI = settingEmpDocumentByDTO.settingEmpSIDocument(empBaseDTO);

        empBaseRepository.save(empBase);
        empsiRepository.save(empSI);
        userRoleRepository.saveAll(settingUserRole.settingUserRole(empBaseDTO.getRole(), empBaseDTO.getId()));

        return empBase;
    }

    // 직원 목록 전체 조회
    public Iterable<EmpBase> empBaseDocumentListSearch() {

        NativeQuery query = commonModule.makeMatchAllQuery();
        SearchHits<EmpBase> searchHits = elasticsearchOperations.search(query, EmpBase.class);
        return commonModule.getListFromSearchHit(searchHits);
    }

    // 아이디로 직원 상세 조회
    public EmpBaseDTO empBaseDocumentSearchById(String id) throws Exception {

        EmpBase empBase = empBaseRepository.findById(id).orElseThrow(() -> new Exception(DOCUMENT_NOT_FOUND));
        EmpSI empSI = empsiRepository.findById(id).orElseThrow(() -> new Exception(DOCUMENT_NOT_FOUND));

        EmpBaseDTO empBaseDTO = new EmpBaseDTO();
        empBaseDTO.setId(empBase.getId());
        empBaseDTO.setEmail(empBase.getEmail());
        empBaseDTO.setName(empBase.getName());
        empBaseDTO.setBirth(empBase.getBirth());
        empBaseDTO.setZipCode(empSI.getZipCode());
        empBaseDTO.setDetailAddress(empSI.getDetailAddress());
        empBaseDTO.setAddress(empSI.getAddress());
        empBaseDTO.setGender(empBase.getGender());
        empBaseDTO.setRole(empBase.getRole());
        empBaseDTO.setState(empBase.getState());
        empBaseDTO.setFileId(empBase.getFileId());
        empBaseDTO.setCallNumber(empSI.getCallNumber());
        empBaseDTO.setFrontPhoneNumber(empSI.getFrontPhoneNumber());
        empBaseDTO.setMiddleCallNumber(empSI.getMiddleCallNumber());
        empBaseDTO.setLastCallNumber(empSI.getLastCallNumber());
        empBaseDTO.setPhoneNumber(empSI.getPhoneNumber());
        empBaseDTO.setFrontCallNumber(empSI.getFrontCallNumber());
        empBaseDTO.setMiddlePhoneNumber(empSI.getMiddlePhoneNumber());
        empBaseDTO.setLastPhoneNumber(empSI.getLastPhoneNumber());
        empBaseDTO.setCreateDate(commonModule.parsingDate(empBase.getCreateDate()));

        return empBaseDTO;
    }

    // 회원 목록 조회
    public Iterable<MemberBase> memberDocumentListSearch() {

        NativeQuery query = commonModule.makeMatchAllQuery();
        SearchHits<MemberBase> searchHits = elasticsearchOperations.search(query, MemberBase.class);
        return commonModule.getListFromSearchHit(searchHits);
    }

    // 아이디로 회원 상세 조회
    public MemberDTO memberBaseDocumentSearchById(String id) throws Exception {

        MemberBase memberBase = memberBaseRepository.findById(id).orElseThrow(() -> new Exception(DOCUMENT_NOT_FOUND));
        MemberSI memberSI = memberSIRepository.findById(id).orElseThrow(() -> new Exception(DOCUMENT_NOT_FOUND));

        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setId(memberBase.getId());
        memberDTO.setEmail(memberBase.getEmail());
        memberDTO.setState(memberBase.getState());
        memberDTO.setName(memberBase.getName());
        memberDTO.setGender(memberBase.getGender());
        memberDTO.setBirth(commonModule.parsingDate(memberBase.getBirth()));
        memberDTO.setCellNumber(memberSI.getCellNumber());
        memberDTO.setPhoneNumber(memberSI.getPhoneNumber());
        memberDTO.setAddress(memberSI.getAddress());
        memberDTO.setAgreePiu(memberBase.getAgreePiu());
        memberDTO.setAgreeMcc(memberBase.getAgreeMcc());
        memberDTO.setAgreeTou(memberBase.getAgreeTou());
        memberDTO.setPointHave(memberBase.getPointHave());

        return memberDTO;
    }
    // 직원 정보 수정
    public EmpBase empBaseDocumentUpdate(EmpBaseDTO empBaseDTO) throws Exception {

        EmpBase empBase = empBaseRepository.findById(empBaseDTO.getId()).orElseThrow(() -> new Exception(DOCUMENT_NOT_FOUND));
        EmpSI empSI = empsiRepository.findById(empBaseDTO.getId()).orElseThrow(() -> new Exception(DOCUMENT_NOT_FOUND));

        empBase.setEmail(empBaseDTO.getEmail() != null ? empBaseDTO.getEmail() : empBase.getEmail());
        empBase.setName(empBaseDTO.getName() != null ? empBaseDTO.getName() : empBase.getName());
        empBase.setFileId(empBaseDTO.getFileId() != null ? empBaseDTO.getFileId().split(",")[1] : empBaseDTO.getFileId());

        empSI.setPhoneNumber(empBaseDTO.getPhoneNumber() != null ? empBaseDTO.getFrontPhoneNumber() + "-" + empBaseDTO.getMiddlePhoneNumber() + "-" + empBaseDTO.getLastPhoneNumber() : empSI.getPhoneNumber());
        empSI.setFrontPhoneNumber(empBaseDTO.getFrontPhoneNumber());
        empSI.setMiddlePhoneNumber(empBaseDTO.getMiddlePhoneNumber());
        empSI.setLastPhoneNumber(empBaseDTO.getLastPhoneNumber());

        empSI.setCallNumber(empBaseDTO.getFrontCallNumber() + "-" + (empBaseDTO.getMiddleCallNumber() != null ? empBaseDTO.getMiddleCallNumber() : "") + "-" + (empBaseDTO.getLastCallNumber() != null ? empBaseDTO.getLastCallNumber() : ""));
        empSI.setFrontCallNumber(empBaseDTO.getFrontCallNumber());
        empSI.setMiddleCallNumber(empBaseDTO.getMiddleCallNumber() != null ? empBaseDTO.getMiddleCallNumber() : "");
        empSI.setLastCallNumber(empBaseDTO.getLastCallNumber() != null ? empBaseDTO.getLastCallNumber() : "");

        empSI.setAddress(empBaseDTO.getAddress() != null ? empBaseDTO.getAddress() : empSI.getAddress());

        if (!empBaseDTO.getRole().equals(empBase.getRole())) {

            empBase.setRole(empBaseDTO.getRole());
            userRoleRepository.deleteAllByEmpId(empBaseDTO.getId());
            userRoleRepository.saveAll(settingUserRole.settingUserRole(empBaseDTO.getRole(), empBaseDTO.getId()));
        }

        empBaseRepository.save(empBase);
        empsiRepository.save(empSI);

        return empBase;
    }

    // 직원 탈퇴 계정으로 전환
    public void empBaseDocumentDeleteById(String id) throws Exception {

        EmpBase empBase = empBaseRepository.findById(id).orElseThrow(() -> new Exception(DOCUMENT_NOT_FOUND));
        empBase.setState("탈퇴 계정");
        empBaseRepository.save(empBase);

    }

    // test
    public EmpBase empBaseDocumentSearchForTest() {
        NativeQuery query = commonModule.makeMatchAllQuery();
        SearchHits<EmpBase> searchHits = elasticsearchOperations.search(query, EmpBase.class);
        return searchHits.getSearchHit(0).getContent();
    }
}
