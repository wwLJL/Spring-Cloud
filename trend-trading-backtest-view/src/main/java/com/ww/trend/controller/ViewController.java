package com.ww.trend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
	
	@Value("${version}")
    String version;
	
	@GetMapping("/")
    public String view() throws Exception {
        return "view";
    }

}
