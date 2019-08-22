package com.ww.mms.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ww.mms.client.SessionServerClient;
import com.ww.mms.dao.AdminDao;
import com.ww.mms.pojo.Admin;

@RestController
public class AdminController {
	
	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private SessionServerClient sessionServerClient;
	
	@RequestMapping("/check")
	@CrossOrigin
	public String check(String account, String password) {
		if(account.equals("") || password.equals("")) {
			return "nullData";
		}
		else {
			Admin admin = adminDao.findByAccountAndPassword(account, password);
			if(admin != null) {
				if(sessionServerClient.addAdmin(admin) == null) {
					return "serverDown";
				}
				return "true," + admin.getId();
			}
			else {
				return "false";
			}
		}
	}
	
}
