package com.ecommerceshop.controller.sso;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URI;

@RestController
@RequestMapping("/sso")
public class SsoController {

    @GetMapping("kakao")
    public Mono<String> kakaoLogin(@RequestParam("token") String token) {

        WebClient webClient = WebClient.create();

        String url = "https://link-api.hiworks.com/v4/tokens/" + token;
        System.out.println(url);

        return webClient.get()
                .uri(URI.create(url)).retrieve().bodyToMono(String.class);

    }
}
