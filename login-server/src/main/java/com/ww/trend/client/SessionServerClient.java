package com.ww.trend.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ww.trend.pojo.User;

@FeignClient(value = "SESSION-SERVER")
public interface SessionServerClient {
	
	@RequestMapping("/addUser")
	public User addUser(@RequestBody User user);
	
}
