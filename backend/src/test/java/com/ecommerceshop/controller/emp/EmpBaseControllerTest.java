package com.ecommerceshop.controller.emp;

import com.ecommerceshop.service.emp.EmpBaseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
public class EmpBaseControllerTest {

    @InjectMocks
    private EmpBaseController empBaseController;

    @Mock
    private EmpBaseService empBaseService;

    private MockMvc mockMvc;

    @BeforeEach
    public void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(empBaseController).build();
    }

}
