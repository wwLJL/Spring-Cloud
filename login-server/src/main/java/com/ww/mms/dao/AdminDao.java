package com.ww.mms.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ww.mms.pojo.Admin;

public interface AdminDao extends JpaRepository<Admin, Integer> {
	
	public Admin findByAccountAndPassword(String account, String password);

}
