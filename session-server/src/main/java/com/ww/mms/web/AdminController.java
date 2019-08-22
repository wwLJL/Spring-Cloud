package com.ww.mms.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ww.mms.pojo.Admin;
import com.ww.mms.service.AdminService;

@RestController
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@RequestMapping("/findAdmin")
	public Admin findAdmin(@RequestParam("id") Integer id) {	
		Admin admin = adminService.get(id);
		if(admin.getId() == null) {
			adminService.remove(id);
		}
		return admin;
	}
	
	@RequestMapping("/addAdmin")
	public Admin addAdmin(@RequestBody Admin admin) {
		return adminService.put(admin);
	}
	
	@RequestMapping("/deleteAdmin")
	public int deleteAdmin(@RequestParam("id") Integer id) {
		return adminService.remove(id);
	}
	
}
