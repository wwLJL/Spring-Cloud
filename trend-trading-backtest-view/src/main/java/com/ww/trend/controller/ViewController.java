package com.ww.trend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
	
	@GetMapping("/view")
    public String view() throws Exception {
        return "view";
    }

}
