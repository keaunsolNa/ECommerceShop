package com.ecommerceshop.service.user;

import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.emp.EmpSI;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.dto.document.member.MemberSI;
import com.ecommerceshop.module.CommonModule;
import com.ecommerceshop.module.security.SHA512;
import com.ecommerceshop.repository.aut.AuthorityRepository;
import com.ecommerceshop.repository.aut.UserRoleRepository;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import com.ecommerceshop.repository.emp.EmpSIRepository;
import com.ecommerceshop.repository.member.MemberBaseRepository;
import com.ecommerceshop.repository.member.MemberSIRepository;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserServiceInterface{

    private final EmpBaseRepository empBaseRepository;
    private final EmpSIRepository empsiRepository;
    private final MemberBaseRepository memberBaseRepository;
    private final MemberSIRepository memberSIRepository;
    private final AuthorityRepository authorityRepository;
    private final UserRoleRepository userRoleRepository;
    private final ElasticsearchOperations elasticsearchOperations;
    private final CommonModule commonModule;

    public UserService(EmpBaseRepository empBaseRepository, EmpSIRepository empsiRepository,
                       MemberBaseRepository memberBaseRepository, MemberSIRepository memberSIRepository,
                       AuthorityRepository authorityRepository, UserRoleRepository userRoleRepository,
                       ElasticsearchOperations elasticsearchOperations, CommonModule commonModule) {

        this.empBaseRepository = empBaseRepository;
        this.empsiRepository = empsiRepository;
        this.memberBaseRepository = memberBaseRepository;
        this.memberSIRepository = memberSIRepository;
        this.authorityRepository = authorityRepository;
        this.userRoleRepository = userRoleRepository;
        this.elasticsearchOperations = elasticsearchOperations;
        this.commonModule = commonModule;
    }

    public void memberLoginMatcher(String username, String password) throws Exception {

        System.out.println(username);
        System.out.println(password);
        MemberBase memberBase = memberBaseRepository
                .findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("userId" + username + " not found"));

        System.out.println(memberBase);

        MemberSI memberSi = memberSIRepository
                .findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("userId" + username + " not found"));

        System.out.println(memberSi);
        if(!(SHA512.SHA512(password, memberSi.getSalt()).equals(memberSi.getPassword())))
            throw new Exception("비밀번호를 잘못 입력하셨습니다.");
    }

    public void empLoginMatcher(String username, String password) throws Exception {

        System.out.println(username);
        System.out.println(password);

        EmpBase empBase = empBaseRepository
                .findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("userId" + username + " not found"));

        System.out.println(empBase);

        EmpSI empSI = empsiRepository
                .findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("userId" + username + " not found"));

        System.out.println(empSI);
        if(!(SHA512.SHA512(password, empSI.getSalt()).equals(empSI.getPassword())))
            throw new Exception("비밀번호를 잘못 입력하셨습니다.");
    }

    public List<UserRole> getAuthorityList(String type, String pk ) {

        NativeQuery query = commonModule.makeMatchPhraseQuery(type, pk);
        SearchHits<UserRole> searchHits = elasticsearchOperations.search(query, UserRole.class);

        List<UserRole> list = commonModule.getListFromSearchHit(searchHits);

        return list;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//        return new org.springframework.security.core.userdetails.User(user.getEmpId() + "",
//                user.getPassword(), getAuthorities(user));
//
//    }
//
//    private static Collection<? extends GrantedAuthority> getAuthorities(UserRole user){
//        String[] userRoles = user.getRoles()
//                .stream()
//                .map((role) -> role.getAuthorityCode())
//                .toArray(String[]::new);
//
//        Collection<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(userRoles);
//        return authorities;
//    }

}
