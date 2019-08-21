package com.ww.trend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ww.trend.pojo.User;
import com.ww.trend.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/findUser")
	public User findUser(@RequestParam("id") Integer id) {
		return userService.get(id);
	}
	
	@RequestMapping("/addUser")
	public User addUser(@RequestBody User user) {
		return userService.store(user);
	}
	
	@RequestMapping("/deleteUser")
	public int deleteUser(User user) {
		return userService.remove(user);
	}

}
