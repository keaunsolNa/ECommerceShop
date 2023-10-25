package com.ecommerceshop.controller.emp;

import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.emp.EmpSI;
import com.ecommerceshop.dto.integrated.emp.EmpBaseDTO;
import com.ecommerceshop.module.security.SHA512;
import com.ecommerceshop.module.security.Salt;
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

    @PostMapping()
    public ResponseEntity<EmpBase> empBaseDocumentCreate(@RequestBody EmpBaseDTO empBaseDTO) {

        EmpBase empBase = new EmpBase();
        empBase.set_id(empBaseDTO.getId());
        empBase.setName(empBaseDTO.getName());
        empBase.setState(empBaseDTO.getState());
        empBase.setLastLogin(System.currentTimeMillis());
        empBase.setCreateDate(System.currentTimeMillis());

        EmpSI empSI = new EmpSI();
        empSI.set_id(empBaseDTO.getEmpId());
        empSI.setPassword(empBaseDTO.getPassword());
        empSI.setCallNumber(empBaseDTO.getCallNumber());
        empSI.setPhoneNumber(empBaseDTO.getPhoneNumber());

        return ResponseEntity.ok(empBaseService.empBaseDocumentCreate(empBase, empSI));
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
