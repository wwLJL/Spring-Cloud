package com.ww.trend.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ww.trend.pojo.User;

@FeignClient(value = "SESSION-SERVER")
public interface SessionServerClient {
	
	@RequestMapping("/findUser")
	public User findUser(@RequestParam("id") Integer id);
	
}
