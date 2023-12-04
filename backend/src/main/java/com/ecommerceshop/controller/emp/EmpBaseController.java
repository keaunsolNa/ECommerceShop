package com.ecommerceshop.controller.emp;

import com.ecommerceshop.dto.DTO.EmpBaseDTO;
import com.ecommerceshop.dto.DTO.MemberDTO;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.member.MemberBase;
import com.ecommerceshop.service.emp.EmpBaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
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

    @PostMapping()
    public ResponseEntity<EmpBase> empBaseDocumentCreate(@RequestBody EmpBaseDTO empBaseDTO) {

        try {
            return ResponseEntity.ok(empBaseService.empBaseDocumentCreate(empBaseDTO));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<EmpBase>> empBaseDocumentListSearch() {
        return ResponseEntity.ok(empBaseService.empBaseDocumentListSearch());
    }

    @GetMapping("/{id}")
    public EmpBaseDTO empBaseDocumentSearchById(@PathVariable String id) {

        try {
            return ResponseEntity.ok(empBaseService.empBaseDocumentSearchById(id)).getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/memberList")
    public ResponseEntity<Iterable<MemberBase>>  memberBaseDocumentListSearch() {
        return ResponseEntity.ok(empBaseService.memberDocumentListSearch());
    }

    @GetMapping("/memberList/{id}")
    public MemberDTO memberBaseDocumentSearchById(@PathVariable String id) {

        try {
            return ResponseEntity.ok(empBaseService.memberBaseDocumentSearchById(id)).getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @PatchMapping()
    public ResponseEntity<EmpBase> empBaseDocumentUpdate(@RequestBody EmpBaseDTO empBaseDTO) {

        try {
            return ResponseEntity.ok(empBaseService.empBaseDocumentUpdate(empBaseDTO));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

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
