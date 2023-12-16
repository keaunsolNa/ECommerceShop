package com.ecommerceshop.service.api;

import com.ecommerceshop.dto.DTO.EmpBaseDTO;
import com.ecommerceshop.dto.document.aut.Authority;
import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.dto.document.emp.EmpSI;
import com.ecommerceshop.dto.document.product.Categories;
import com.ecommerceshop.module.common.SettingUserRole;
import com.ecommerceshop.module.employee.SettingEmpDocumentByDTO;
import com.ecommerceshop.repository.aut.AuthorityRepository;
import com.ecommerceshop.repository.aut.UserRoleRepository;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import com.ecommerceshop.repository.emp.EmpSIRepository;
import com.ecommerceshop.repository.product.CategoriesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddDocumentService {

    private final CategoriesRepository categoriesRepository;
    private final AuthorityRepository authorityRepository;
    private final SettingUserRole settingUserRole;
    private final EmpBaseRepository empBaseRepository;
    private final EmpSIRepository empsiRepository;
    private final UserRoleRepository userRoleRepository;
    private final SettingEmpDocumentByDTO settingEmpDocumentByDTO;
    public AddDocumentService(EmpBaseRepository empBaseRepository, EmpSIRepository empsiRepository, UserRoleRepository userRoleRepository, CategoriesRepository categoriesRepository, AuthorityRepository authorityRepository, SettingUserRole settingUserRole, SettingEmpDocumentByDTO settingEmpDocumentByDTO) {
        this.empBaseRepository = empBaseRepository;
        this.empsiRepository = empsiRepository;
        this.userRoleRepository = userRoleRepository;
        this.categoriesRepository = categoriesRepository;
        this.authorityRepository = authorityRepository;
        this.settingUserRole = settingUserRole;
        this.settingEmpDocumentByDTO = settingEmpDocumentByDTO;
    }

    // 카테고리 생성
    public Iterable<Categories> addNewCategories(List<Categories> categories) {

        categoriesRepository.saveAll(categories);
        return categoriesRepository.findAll();

    }

    // 유저 권한 생성
    public Iterable<Authority> addAuthorityAddRequest(List<Authority> authorityList) {
        authorityRepository.saveAll(authorityList);
        return authorityRepository.findAll();
    }

    public Iterable<EmpBase> addEmployeeAddRequest(List<EmpBaseDTO> empBaseDTOList) {

        for(EmpBaseDTO empBaseDTO : empBaseDTOList) {

            EmpBase empBase = settingEmpDocumentByDTO.settingEmpDocument(empBaseDTO);
            EmpSI empSI = settingEmpDocumentByDTO.settingEmpSIDocument(empBaseDTO);

            empBaseRepository.save(empBase);
            empsiRepository.save(empSI);
            userRoleRepository.saveAll(settingUserRole.settingUserRole(empBaseDTO.getRole(), empBaseDTO.getId()));
        }

        return empBaseRepository.findAll();
    }
}
