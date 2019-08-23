package com.ww.mms.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ww.mms.client.SessionServerClient;

@Controller
public class MusicManageViewController {
	
	@Autowired
	private SessionServerClient sessionServerClient;
	
	@RequestMapping("/show/{id}")
	public String musicManageView(@PathVariable("id") Integer id, HttpServletRequest request) {
		if(sessionServerClient.findAdmin(id) == null || sessionServerClient.findAdmin(id).getId() == null) {
			return "redirect:http://127.0.0.1:8080/loginView/show";
		}
		request.getSession().setAttribute("id", id);
		return "music_manage";
	}
	
	@RequestMapping("/logout/{id}")
	public String logout(@PathVariable("id") Integer id) {
		sessionServerClient.deleteAdmin(id);
		return "redirect:http://127.0.0.1:8080/loginView/show";
	}
	
}
