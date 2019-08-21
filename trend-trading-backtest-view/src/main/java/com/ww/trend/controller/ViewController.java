package com.ww.trend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ww.trend.client.SessionServerClient;

@Controller
public class ViewController {
	
	@Autowired
	private SessionServerClient sessionServerClient;
	
	@RequestMapping("/")
    public String view() {
        return "view";
    }
	
	@GetMapping("/{id}")
	public String viewById(@PathVariable("id") Integer id) {
		if(sessionServerClient.findUser(id).getId() != null) {
			return "view";
		}
		else {
			return "redirect:http://127.0.0.1:8031/api-loginView/";
		}
	}

}
