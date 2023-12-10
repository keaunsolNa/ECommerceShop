package com.ecommerceshop.dto.document.orderAndSupply;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Getter
@Setter
@ToString
@Document(indexName = "order-product-info")
public class OrderProductInfo {

    @Id
    private String orderId;
    @Id
    private String productId;
    private Integer amount;
    private Integer price;

}
