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
	
	@Cacheable(key = "'user' + #id")
	public User get(Integer id) {
		User user = new User();
		return user;
	}
	
	@CachePut(key = "'user' + #user.getId()")
	public User store(User user) {
		return user;
	}
	
	@CacheEvict(key = "'user' + #user.getId()")
	public int remove(User user) {
		return 0;
	}
	
}
