package com.ecommerceshop.module.common;

import com.ecommerceshop.dto.document.aut.UserRole;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class SettingUserRole {

    public List<UserRole> settingUserRole(String role, String id) {

        List<UserRole> userRoleList = new ArrayList<>();

        System.out.println(role);
        switch (role) {

            case "CEO":

                UserRole userRole1 = new UserRole();
                userRole1.setEmpId(id);
                userRole1.setAuthorityCode(40);
                userRoleList.add(userRole1);

            case "재정관리자":

                UserRole userRole2 = new UserRole();
                userRole2.setEmpId(id);
                userRole2.setAuthorityCode(30);
                userRoleList.add(userRole2);

            case "인사관리자":

                UserRole userRole3 = new UserRole();
                userRole3.setEmpId(id);
                userRole3.setAuthorityCode(20);
                userRoleList.add(userRole3);

            case "일반관리자":

                UserRole userRole4 = new UserRole();
                userRole4.setEmpId(id);
                userRole4.setAuthorityCode(10);
                userRoleList.add(userRole4);

            case "사용자":

                UserRole userRole5 = new UserRole();
                userRole5.setEmpId(id);
                userRole5.setAuthorityCode(0);
                userRoleList.add(userRole5);
        }

        return userRoleList;
    }
}
