package com.ecommerceshop.controller.emp;

import com.ecommerceshop.dto.document.emp.EmpBase;
import com.ecommerceshop.service.emp.EmpBaseService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class EmpBaseControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private EmpBaseService empBaseServiceTemp;

    @Test
    void empBaseDocumentCreate() throws Exception {

        mockMvc.perform(post("/empBase")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"key\":\"value\"}"))
                .andExpect(status().isOk());
    }

    @Test
    void empBaseDocumentListSearch() throws Exception {

        mockMvc.perform(get("/empBase")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    void empBaseDocumentSearchById() throws Exception {

        EmpBase empBase = empBaseServiceTemp.empBaseDocumentSearchForTest();

        mockMvc.perform(get("/empBase/" + empBase.get_id())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

    }

    @Test
    void empBaseDocumentDelete() throws Exception {

        EmpBase empBase = empBaseServiceTemp.empBaseDocumentSearchForTest();

       mockMvc.perform(patch("/empBase/" + empBase.get_id())
               .contentType(MediaType.APPLICATION_JSON))
               .andExpect(status().isOk())
               .andReturn();


    }
}
