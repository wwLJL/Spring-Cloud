package com.ww.mms.pojo;

public class Admin {
	
	private Integer id;
	private String account;
	private String password;
	private String name;
	private Integer is_super;
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getAccount() {
		return account;
	}
	
	public void setAccount(String account) {
		this.account = account;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Integer getIs_super() {
		return is_super;
	}
	
	public void setIs_super(Integer is_super) {
		this.is_super = is_super;
	}
	
}
