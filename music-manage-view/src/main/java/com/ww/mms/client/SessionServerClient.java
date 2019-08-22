package com.ww.mms.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ww.mms.pojo.Admin;

@FeignClient(value = "SESSION-SERVER", fallback = SessionServerClientHystrix.class)
public interface SessionServerClient {
	
	@RequestMapping("/findAdmin")
	public Admin findAdmin(@RequestParam("id") Integer id);

}
