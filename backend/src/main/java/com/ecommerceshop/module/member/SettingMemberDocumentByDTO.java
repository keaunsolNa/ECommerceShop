package com.ecommerceshop.module.member;

import com.ecommerceshop.dto.DTO.MemberDTO;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.dto.document.member.MemberSI;
import com.ecommerceshop.module.security.SHA512;
import com.ecommerceshop.module.security.Salt;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

@Configuration
public class SettingMemberDocumentByDTO {

    public MemberBase settingMemberDocument(MemberDTO memberDTO) {

        MemberBase memberBase = new MemberBase();
        memberBase.setId(memberDTO.getId());
        memberBase.setBirth(memberDTO.getBirth());
        memberBase.setEmail(memberDTO.getEmail());
        memberBase.setName(memberDTO.getName());
        memberBase.setAgreePiu(memberDTO.getAgreePiu());
        memberBase.setAgreeMcc(memberDTO.getAgreeMcc());
        memberBase.setAgreeTou(memberDTO.getAgreeTou());
        memberBase.setGender(memberDTO.getGender());
        memberBase.setState("활동 계정");
        memberBase.setLastLogin(new Date());
        memberBase.setCreateDate(new Date());
        memberBase.setPointHave(0);

        return memberBase;
    }

    public MemberSI settingMemberSIDocument(MemberDTO memberDTO) {

        MemberSI memberSI = new MemberSI();
        memberSI.setId(memberDTO.getId());
        memberSI.setCellNumber(memberDTO.getCellNumber());
        memberSI.setPhoneNumber(memberDTO.getPhoneNumber());
        String salt = Salt.makeSalt();
        memberSI.setSalt(salt);
        memberSI.setPassword(SHA512.SHA512(memberDTO.getPassword(), salt));

        return memberSI;
    }

}
