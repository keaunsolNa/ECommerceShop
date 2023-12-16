package com.ecommerceshop.controller.emp;

import com.ecommerceshop.dto.DTO.EmpBaseDTO;
import com.ecommerceshop.dto.DTO.MemberDTO;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.service.emp.EmpBaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/empBase")
public class EmpBaseController {

    private final EmpBaseService empBaseService;

    @Autowired
    public EmpBaseController(EmpBaseService empBaseService) {
        this.empBaseService = empBaseService;
    }

    // 직원 카드 생성
    @PostMapping()
    public ResponseEntity<EmpBase> empBaseDocumentCreate(@RequestBody EmpBaseDTO empBaseDTO) {

        return ResponseEntity.ok(empBaseService.empBaseDocumentCreate(empBaseDTO));
    }

    // 모든 직원 조회
    @GetMapping("/all")
    public ResponseEntity<Iterable<EmpBase>> empBaseDocumentListSearch() {
        return ResponseEntity.ok(empBaseService.empBaseDocumentListSearch());
    }

    // id로 상세 조회
    @GetMapping("/{id}")
    public EmpBaseDTO empBaseDocumentSearchById(@PathVariable String id) {

        try {
            return ResponseEntity.ok(empBaseService.empBaseDocumentSearchById(id)).getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // 회원 전체 조회
    @GetMapping("/memberList")
    public ResponseEntity<Iterable<MemberBase>>  memberBaseDocumentListSearch() {
        return ResponseEntity.ok(empBaseService.memberDocumentListSearch());
    }

    // 회원 상세 조회
    @GetMapping("/member/{id}")
    public MemberDTO memberBaseDocumentSearchById(@PathVariable String id) {

        try {
            return ResponseEntity.ok(empBaseService.memberBaseDocumentSearchById(id)).getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
    // 직원 정보 수정
    @PatchMapping()
    public ResponseEntity<EmpBase> empBaseDocumentUpdate(@RequestBody EmpBaseDTO empBaseDTO) {

        try {
            return ResponseEntity.ok(empBaseService.empBaseDocumentUpdate(empBaseDTO));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // 직원 탈퇴 처리
    @DeleteMapping("/{id}")
    public ResponseEntity<EmpBase> empBaseDocumentDeleteById(@PathVariable String id) {

        try {
            empBaseService.empBaseDocumentDeleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok().build();
    }

}
