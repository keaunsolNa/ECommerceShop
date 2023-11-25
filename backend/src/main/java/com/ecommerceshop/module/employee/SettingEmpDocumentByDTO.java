package com.ecommerceshop.module.employee;

import com.ecommerceshop.dto.DTO.EmpBaseDTO;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.emp.EmpSI;
import com.ecommerceshop.module.common.SettingUserRole;
import com.ecommerceshop.module.security.SHA512;
import com.ecommerceshop.module.security.Salt;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

@Configuration
public class SettingEmpDocumentByDTO {

    private SettingUserRole settingUserRole;

    public SettingEmpDocumentByDTO(SettingUserRole settingUserRole) {
        this.settingUserRole = settingUserRole;
    }

    public EmpBase settingEmpDocument(EmpBaseDTO empBaseDTO) {

        EmpBase empBase = new EmpBase();
        empBase.setId(empBaseDTO.getId());
        empBase.setEmail(empBaseDTO.getEmail());
        empBase.setState(empBaseDTO.getState());
        empBase.setName(empBaseDTO.getName());
        empBase.setBirth(empBaseDTO.getBirth());
        empBase.setGender(empBaseDTO.getGender());
        empBase.setRole(empBaseDTO.getRole());
        empBase.setCreateDate(new Date());
        empBase.setLastLogin(new Date());
        empBase.setFileId(empBaseDTO.getFileId());

        return empBase;
    }

    public EmpSI settingEmpSIDocument(EmpBaseDTO empBaseDTO) {

        EmpSI empSI = new EmpSI();
        empSI.setId(empBaseDTO.getId());
        empSI.setPhoneNumber(empBaseDTO.getPhoneNumber());
        empSI.setCallNumber(empBaseDTO.getCallNumber());
        String salt = Salt.makeSalt();
        empSI.setSalt(salt);
        empSI.setPassword(SHA512.SHA512(empBaseDTO.getPassword(), salt));
        empSI.setAddress(empBaseDTO.getAddress());

        return empSI;
    }
}
