package com.ecommerceshop.service.member;

import com.ecommerceshop.dto.DTO.MemberDTO;
import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.dto.document.member.MemberSI;
import com.ecommerceshop.module.member.SettingMemberDocumentByDTO;
import com.ecommerceshop.repository.aut.UserRoleRepository;
import com.ecommerceshop.repository.member.MemberBaseRepository;
import com.ecommerceshop.repository.member.MemberSIRepository;
import org.springframework.stereotype.Service;

@Service
public class MemberBaseService {

    private final MemberBaseRepository memberBaseRepository;
    private final MemberSIRepository memberSIRepository;
    private final UserRoleRepository userRoleRepository;
    private final SettingMemberDocumentByDTO settingMemberDocumentByDTO;

    public MemberBaseService(MemberBaseRepository memberBaseRepository, MemberSIRepository memberSIRepository,
                             UserRoleRepository userRoleRepository, SettingMemberDocumentByDTO settingMemberDocumentByDTO) {
        this.memberBaseRepository = memberBaseRepository;
        this.memberSIRepository = memberSIRepository;
        this.userRoleRepository = userRoleRepository;
        this.settingMemberDocumentByDTO = settingMemberDocumentByDTO;
    }

    // 회원 가입
    public MemberBase memberBaseDocumentCreate(MemberDTO memberDTO) {

        MemberBase memberBase = settingMemberDocumentByDTO.settingMemberDocument(memberDTO);
        MemberSI memberSI = settingMemberDocumentByDTO.settingMemberSIDocument(memberDTO);

        UserRole userRole = new UserRole();
        userRole.setAuthorityCode(0);
        userRole.setUserId(memberDTO.getId());

        memberBaseRepository.save(memberBase);
        memberSIRepository.save(memberSI);
        userRoleRepository.save(userRole);

        return memberBase;
    }


}
