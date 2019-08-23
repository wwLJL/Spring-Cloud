package com.ww.mms.client;

import org.springframework.stereotype.Component;

import com.ww.mms.pojo.Admin;

@Component
public class SessionServerClientHystrix implements SessionServerClient {

	@Override
	public Admin findAdmin(Integer id) {
		System.out.println(123);
		return null;
	}

	@Override
	public int deleteAdmin(Integer id) {
		System.out.println(123);
		return 1;
	}
	
}
