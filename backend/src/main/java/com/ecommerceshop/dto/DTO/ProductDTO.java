package com.ecommerceshop.dto.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class ProductDTO {

    private String id;
    private String state;
    private String name;
    private Integer price;
    private Integer amount;
    private Integer viewCount;
    private String desc;
    private Date createDate;
    private String fileId;
    private String categories;

}
