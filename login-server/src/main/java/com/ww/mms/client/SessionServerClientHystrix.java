package com.ww.mms.client;

import org.springframework.stereotype.Component;

import com.ww.mms.pojo.Admin;

@Component
public class SessionServerClientHystrix implements SessionServerClient {

	@Override
	public Admin addAdmin(Admin admin) {
		return null;
	}
	
}
