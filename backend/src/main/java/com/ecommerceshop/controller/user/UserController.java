package com.ecommerceshop.controller.user;

import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.dto.integrated.emp.EmpBaseDTO;
import com.ecommerceshop.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/login")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) { this.userService = userService; }

    @PostMapping()
    public ResponseEntity login(@RequestBody EmpBaseDTO empBaseDTO) {

        System.out.println("login");
        boolean check;
        try {
            userService.empLoginMatcher(empBaseDTO.getId(), empBaseDTO.getPassword());

            List<UserRole> list = userService.getAuthorityList("empId", empBaseDTO.getId());
            System.out.println(list);

        } catch (Exception e) {

            try {
                userService.memberLoginMatcher(empBaseDTO.getId(), empBaseDTO.getPassword());

                List<UserRole> list = userService.getAuthorityList("memberId", empBaseDTO.getId());
                System.out.println(list);

            } catch (Exception ex) {

                throw new RuntimeException(ex);
            }


            throw new RuntimeException(e);
        }

        return null;
    }

}
