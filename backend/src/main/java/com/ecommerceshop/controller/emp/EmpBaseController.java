package com.ecommerceshop.controller.emp;

import com.ecommerceshop.dto.document.emp.EmpBase;
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
    public ResponseEntity<EmpBase> empBaseDocumentCreate(@RequestBody EmpBase empBase) {

        empBase.setCreateDate(System.currentTimeMillis());
        empBase.setLastLogin(System.currentTimeMillis());

        return ResponseEntity.ok(empBaseService.empBaseDocumentCreate(empBase));
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
