package com.ww.mms.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ww.mms.pojo.Admin;

@FeignClient(value = "SESSION-SERVER", fallback = SessionServerClientHystrix.class)
public interface SessionServerClient {
	
	@RequestMapping("/addAdmin")
	public Admin addAdmin(@RequestBody Admin admin);
	
}
