package com.ecommerceshop.dto.document.orderAndSupply;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;

@Getter
@Setter
@ToString
@Document(indexName = "order-info")
public class OrderInfo {

    @Id
    private String orderId;
    private String empId;
    private String supplyId;
    @Field(type = FieldType.Date, format = DateFormat.epoch_millis)
    private Date orderDate;
    private Long orderTotPrice;

}
