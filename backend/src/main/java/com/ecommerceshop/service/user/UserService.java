package com.ecommerceshop.service.user;

import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.dto.document.emp.EmpSI;
import com.ecommerceshop.dto.document.member.MemberSI;
import com.ecommerceshop.module.CommonModule;
import com.ecommerceshop.module.security.SHA512;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import com.ecommerceshop.repository.emp.EmpSIRepository;
import com.ecommerceshop.repository.member.MemberBaseRepository;
import com.ecommerceshop.repository.member.MemberSIRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class UserService implements UserServiceInterface {

    private final EmpBaseRepository empBaseRepository;
    private final EmpSIRepository empsiRepository;
    private final MemberBaseRepository memberBaseRepository;
    private final MemberSIRepository memberSIRepository;
    private final ElasticsearchOperations elasticsearchOperations;
    private final CommonModule commonModule;

    public UserService(EmpBaseRepository empBaseRepository, EmpSIRepository empsiRepository,
                       MemberBaseRepository memberBaseRepository, MemberSIRepository memberSIRepository,
                       ElasticsearchOperations elasticsearchOperations, CommonModule commonModule) {

        this.empBaseRepository = empBaseRepository;
        this.empsiRepository = empsiRepository;
        this.memberBaseRepository = memberBaseRepository;
        this.memberSIRepository = memberSIRepository;
        this.elasticsearchOperations = elasticsearchOperations;
        this.commonModule = commonModule;
    }

    public void memberLoginMatcher(String username, String password) throws Exception {

        memberBaseRepository
                .findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("userId" + username + " not found"));


        MemberSI memberSi = memberSIRepository
                .findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("userId" + username + " not found"));

        if (!(SHA512.SHA512(password, memberSi.getSalt()).equals(memberSi.getPassword())))
            throw new Exception("비밀번호를 잘못 입력하셨습니다.");
    }

    public void empLoginMatcher(String username, String password) throws Exception {

        empBaseRepository
                .findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("userId" + username + " not found"));

        EmpSI empSI = empsiRepository
                .findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("userId" + username + " not found"));

        if (!(SHA512.SHA512(password, empSI.getSalt()).equals(empSI.getPassword())))
            throw new Exception("비밀번호를 잘못 입력하셨습니다.");
    }

    public List<UserRole> getAuthorityList(String type, String pk) {

        NativeQuery query = commonModule.makeMatchPhraseQuery(type, pk);
        SearchHits<UserRole> searchHits = elasticsearchOperations.search(query, UserRole.class);

        return commonModule.getListFromSearchHit(searchHits);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

}
