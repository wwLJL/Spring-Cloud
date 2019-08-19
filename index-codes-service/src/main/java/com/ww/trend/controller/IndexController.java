package com.ww.trend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ww.trend.config.IpConfig;
import com.ww.trend.pojo.Index;
import com.ww.trend.service.IndexService;

@RestController
public class IndexController {
	
	@Autowired
	private IndexService indexService;
	@Autowired
	private IpConfig ipConfig;
	
	@GetMapping("/codes")
	@CrossOrigin
	public List<Index> getCodes() {
		return indexService.getCodes();
	}

}
