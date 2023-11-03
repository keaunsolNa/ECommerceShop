package com.ecommerceshop.service.user;

import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.emp.EmpSI;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.dto.document.member.MemberSI;
import com.ecommerceshop.dto.integrated.emp.EmpBaseDTO;
import com.ecommerceshop.module.CommonModule;
import com.ecommerceshop.module.security.SHA512;
import com.ecommerceshop.repository.aut.AuthorityRepository;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import com.ecommerceshop.repository.emp.EmpSIRepository;
import com.ecommerceshop.repository.member.MemberBaseRepository;
import com.ecommerceshop.repository.member.MemberSIRepository;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final EmpBaseRepository empBaseRepository;
    private final EmpSIRepository empsiRepository;
    private final MemberBaseRepository memberBaseRepository;
    private final MemberSIRepository memberSIRepository;
    private final AuthorityRepository authorityRepository;
    private final ElasticsearchOperations elasticsearchOperations;
    private final CommonModule commonModule;

    public UserService(EmpBaseRepository empBaseRepository, EmpSIRepository empsiRepository,
                       MemberBaseRepository memberBaseRepository, MemberSIRepository memberSIRepository,
                       AuthorityRepository authorityRepository, ElasticsearchOperations elasticsearchOperations,
                       CommonModule commonModule) {

        this.empBaseRepository = empBaseRepository;
        this.empsiRepository = empsiRepository;
        this.memberBaseRepository = memberBaseRepository;
        this.memberSIRepository = memberSIRepository;
        this.authorityRepository = authorityRepository;
        this.elasticsearchOperations = elasticsearchOperations;
        this.commonModule = commonModule;
    }

    public void memberLoginMatcher(EmpBaseDTO empBaseDTO) throws Exception {

        System.out.println(empBaseDTO);
        MemberBase memberBase = memberBaseRepository.findById(empBaseDTO.getId()).orElse(null);
        System.out.println(memberBase);
        if(memberBase == null) throw new Exception("일치하는 아이디가 없습니다.");

        MemberSI memberSi = memberSIRepository.findById(empBaseDTO.getId()).orElse(null);
        System.out.println(memberSi);
        if(!(SHA512.SHA512(empBaseDTO.getPassword(), memberSi.getSalt()).equals(memberSi.getPassword())))
            throw new Exception("비밀번호를 잘못 입력하셨습니다.");
    };

    public void empLoginMatcher(EmpBaseDTO empBaseDTO) throws Exception {
        System.out.println(empBaseDTO);
        EmpBase empBase = empBaseRepository.findById(empBaseDTO.getId()).orElse(null);
        System.out.println(empBase);
        if(empBase == null) throw new Exception("일치하는 아이디가 없습니다.");

        EmpSI empSI = empsiRepository.findById(empBaseDTO.getId()).orElse(null);
        System.out.println(empSI);
        if(!(SHA512.SHA512(empBaseDTO.getPassword(), empSI.getSalt()).equals(empSI.getPassword())))
            throw new Exception("비밀번호를 잘못 입력하셨습니다.");
    };

    public List<UserRole> getAuthorityList(String type, String pk ) {

        NativeQuery query = commonModule.makeMatchPhraseQuery(type, pk);
        SearchHits<UserRole> searchHits = elasticsearchOperations.search(query, UserRole.class);

        List<UserRole> list = commonModule.getListFromSearchHit(searchHits);

        return list;
    }
}
