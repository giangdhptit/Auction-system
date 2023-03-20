package com.example.demo_web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = "com.example.demo_web")
@EnableScheduling
public class DemoWebApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoWebApplication.class, args);

	}
}
