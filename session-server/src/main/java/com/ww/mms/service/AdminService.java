package com.ww.mms.service;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ww.mms.pojo.Admin;

@Service
@CacheConfig(cacheNames = "admins")
public class AdminService {
	
	@Cacheable(key = "'admin' + #id")
	public Admin get(Integer id) {
		Admin admin = new Admin();
		return admin;
	}
	
	@CachePut(key = "'admin' + #admin.getId()")
	public Admin put(Admin admin) {
		return admin;
	}
	
	@CacheEvict(key = "'admin' + #id")
	public int remove(Integer id) {
		return 0;
	}
	
}
