package com.ecommerceshop.dto.document.orderAndSupply;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.Date;

@Getter
@Setter
@ToString
@Document(indexName = "supply")
public class Supply {

    @Id
    private String supplyId;
    private String name;
    private String state;
    private String tel;
    private String frontTel;
    private String middleTel;
    private String lastTel;
    private String zipCode;
    private String address;
    private String detailAddress;
    private String desc;
    private Date createDate;
}
