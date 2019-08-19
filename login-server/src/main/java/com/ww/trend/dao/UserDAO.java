package com.ww.trend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ww.trend.pojo.User;

public interface UserDAO extends JpaRepository<User, Integer> {
	
	public User findByAccountAndPassword(String account, String password);

}
