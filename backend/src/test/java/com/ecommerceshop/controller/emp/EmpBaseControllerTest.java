package com.ecommerceshop.controller.emp;

import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.repository.emp.EmpBaseRepository;
import com.ecommerceshop.service.emp.EmpBaseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class EmpBaseControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private EmpBaseRepository empBaseRepository;

    @Mock
    private EmpBaseService empBaseService;

    @InjectMocks
    private EmpBaseController empBaseController;


    @Test
    void empBaseDocumentCreate() throws Exception {
        EmpBase empBase = new EmpBase();

        when(empBaseService.empBaseDocumentCreate(any(EmpBase.class))).thenReturn(empBase);

        ResultActions resultActions = mockMvc.perform(post("/empBase")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"key\":\"value\"}"));

        resultActions.andExpect(status().isOk());
    }

    @Test
    void empBaseDocumentSearch() throws Exception {
        Iterable<EmpBase> empBaseList  = empBaseRepository.findAll();
        when(empBaseService.empBaseDocumentSearch()).thenReturn(empBaseList);

        ResultActions resultActions = mockMvc.perform(get("/empBase"));

        // Assert that the response content matches the expected JSON
        resultActions.andExpect(status().isOk())
                .andReturn();
    }
}
