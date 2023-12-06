package com.ecommerceshop.controller.member;

import com.ecommerceshop.dto.DTO.MemberDTO;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.service.member.MemberBaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/memberBase")
public class MemberBaseController {

    private final MemberBaseService memberBaseService;

    @Autowired
    public MemberBaseController(MemberBaseService memberBaseService) { this.memberBaseService = memberBaseService; }

    // 회원 가입
    @PostMapping()
    public ResponseEntity<MemberBase> memberBaseDocumentCreate(@RequestBody MemberDTO memberDTO) {

        try {
            return  ResponseEntity.ok(memberBaseService.memberBaseDocumentCreate(memberDTO));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

}
