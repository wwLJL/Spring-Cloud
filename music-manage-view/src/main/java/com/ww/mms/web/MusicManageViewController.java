package com.ww.mms.web;

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
	public String musicManageView(@PathVariable("id") Integer id) {
		if(sessionServerClient.findAdmin(id) == null || sessionServerClient.findAdmin(id).getId() == null) {
			return "redirect:http://127.0.0.1:8080/loginView/show";
		}
		return "music_manage";
	}
	
}
