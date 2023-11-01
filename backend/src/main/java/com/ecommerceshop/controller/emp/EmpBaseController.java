package com.ecommerceshop.controller.emp;

import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.emp.EmpSI;
import com.ecommerceshop.dto.integrated.emp.EmpBaseDTO;
import com.ecommerceshop.module.security.SHA512;
import com.ecommerceshop.module.security.Salt;
import com.ecommerceshop.service.emp.EmpBaseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

        EmpBase empBase = new EmpBase();
        empBase.setId(empBaseDTO.getId());
        empBase.setName(empBaseDTO.getName());
        empBase.setRole(empBaseDTO.getRole());
        empBase.setState(empBaseDTO.getState());
        empBase.setLastLogin(System.currentTimeMillis());
        empBase.setCreateDate(System.currentTimeMillis());

        EmpSI empSI = new EmpSI();
        empSI.setId(empBaseDTO.getEmpId());
        empSI.setSalt(Salt.makeSalt());
        empSI.setPassword(SHA512.SHA512(empSI.getPassword(), empSI.getSalt()));
        empSI.setCallNumber(empBaseDTO.getCallNumber());
        empSI.setPhoneNumber(empBaseDTO.getPhoneNumber());

        List<UserRole> userRoleList = new ArrayList<>();

        switch (empBase.getRole()) {

            case "CEO" :

                UserRole userRole1 = new UserRole();
                userRole1.setEmpId(empBaseDTO.getEmpId());
                userRole1.setAuthorityCode(40);
                userRoleList.add(userRole1);

            case "재정관리자" :

                UserRole userRole2 = new UserRole();
                userRole2.setEmpId(empBaseDTO.getEmpId());
                userRole2.setAuthorityCode(30);
                userRoleList.add(userRole2);

            case "인사관리자" :

                UserRole userRole3 = new UserRole();
                userRole3.setEmpId(empBaseDTO.getEmpId());
                userRole3.setAuthorityCode(20);
                userRoleList.add(userRole3);

            case "일반관리자" :

                UserRole userRole4 = new UserRole();
                userRole4.setEmpId(empBaseDTO.getEmpId());
                userRole4.setAuthorityCode(10);
                userRoleList.add(userRole4);
        }

        try {
            return ResponseEntity.ok(empBaseService.empBaseDocumentCreate(empBase, empSI, userRoleList));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping()
    public ResponseEntity<Iterable<EmpBase>> empBaseDocumentListSearch() {
        return ResponseEntity.ok(empBaseService.empBaseDocumentListSearch());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpBase> empBaseDocumentSearchById(@PathVariable String id) {

        try {
            return ResponseEntity.ok(empBaseService.empBaseDocumentSearchById(id));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EmpBase> empBaseDocumentDeleteById(@PathVariable String id) {

        try {
            empBaseService.empBaseDocumentDeleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok().build();
    }

}
