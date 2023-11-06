package com.ecommerceshop.component.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.ecommerceshop.repository.*")
@ComponentScan(basePackages = { "com.ecommerceshop.*" })
public class ElasticsearchBaseConfig extends ElasticsearchConfiguration {

    @Value("${elasticsearch.host}")
    private String host;

    @Value("${elasticsearch.port}")
    private String port;

    @Value("${elasticsearch.id}")
    private String id;

    @Value("${elasticsearch.password}")
    private String password;

    @Override
    public ClientConfiguration clientConfiguration() {

        return ClientConfiguration.builder()
                .connectedTo(host)
                .withSocketTimeout(20000)
                .withConnectTimeout(20000)
                .build();
    }
}
