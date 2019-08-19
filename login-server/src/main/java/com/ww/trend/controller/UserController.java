package com.ww.trend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ww.trend.dao.UserDAO;

@RestController
public class UserController {
	
	@Autowired
	private UserDAO userDAO;
	
	@RequestMapping("/login.do")
	@CrossOrigin
	public String login(String account, String password) {
		if(account.equals("") || password.equals("")) {
			return "nulldata";
		}
		else {
			if(userDAO.findByAccountAndPassword(account, password) != null) {
				return "success";
			}
			else {
				return "fail";
			}
		}
	}

}
