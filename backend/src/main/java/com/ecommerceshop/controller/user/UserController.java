package com.ecommerceshop.controller.user;

import com.ecommerceshop.component.config.JwtTokenProvider;
import com.ecommerceshop.dto.DTO.EmpBaseDTO;
import com.ecommerceshop.dto.document.aut.UserRole;
import com.ecommerceshop.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/login")
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping()
    public String login(@RequestBody EmpBaseDTO empBaseDTO) {

        try {

            userService.empLoginMatcher(empBaseDTO.getId(), empBaseDTO.getPassword());
            List<UserRole> list = userService.getAuthorityList("empId", empBaseDTO.getId());
            return jwtTokenProvider.createToken(empBaseDTO.getId(), list);

        } catch (Exception e) {

            try {

                userService.memberLoginMatcher(empBaseDTO.getId(), empBaseDTO.getPassword());
                List<UserRole> list = userService.getAuthorityList("memberId", empBaseDTO.getId());
                return jwtTokenProvider.createToken(empBaseDTO.getId(), list);

            } catch (Exception ex) {

                throw new RuntimeException(ex);
            }
        }

    }

}
