package com.ww.mms.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class loginViewController {
	
	@RequestMapping("/show")
	public String loginView() {
		return "login";
	}

}
