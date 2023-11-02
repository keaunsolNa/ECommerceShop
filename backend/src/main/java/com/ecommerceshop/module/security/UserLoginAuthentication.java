package com.ecommerceshop.module.security;

import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import com.ecommerceshop.repository.member.MemberBaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class UserLoginAuthentication {

    private final EmpBaseRepository empBaseRepository;
    private final MemberBaseRepository memberBaseRepository;

    @Autowired
    public UserLoginAuthentication(EmpBaseRepository empBaseRepository, MemberBaseRepository memberBaseRepository) {
        this.empBaseRepository = empBaseRepository;
        this.memberBaseRepository = memberBaseRepository;
    }

    public UserDetails loadUserByUserName(String userId, String password) throws Exception {

        Optional<MemberBase> memberBase = memberBaseRepository.findById(userId);
        Optional<EmpBase> empBase = empBaseRepository.findById(userId);


        return null;
//        return memberBase == null ? new org.springframework.security.core.userdetails.User(memberBase.get().getId() + "", )
    }

    private static Collection<? extends GrantedAuthority> getMemberAuthorities(EmpBase member) {

//        String[] memberRoles = member.getRole().;

        return null;
    }
}
