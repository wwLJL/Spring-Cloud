package com.ww.trend.service;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ww.trend.pojo.User;

@Service
@CacheConfig(cacheNames = "Users")
public class UserService {
	
	@Cacheable(key = "'user'")
	public User get() {
		User user = new User();
		return user;
	}
	
	@CachePut(key = "'user'")
	public User store(User user) {
		return user;
	}
	
	@CacheEvict(key = "'user'")
	public int remove(User user) {
		return 0;
	}
	
}
