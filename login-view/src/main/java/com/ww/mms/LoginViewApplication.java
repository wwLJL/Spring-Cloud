package com.ww.mms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class LoginViewApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginViewApplication.class, args);
	}

}
