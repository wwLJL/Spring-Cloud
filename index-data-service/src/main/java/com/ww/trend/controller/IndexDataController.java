package com.ww.trend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ww.trend.config.IpConfig;
import com.ww.trend.pojo.IndexData;
import com.ww.trend.service.IndexDataService;

@RestController
public class IndexDataController {
	
	@Autowired
	private IndexDataService indexDataService;
	@Autowired
	private IpConfig ipConfig;
	
	@GetMapping("/data/{code}")
	public List<IndexData> getData(@PathVariable("code") String code) {
		return indexDataService.getData(code);
	}

}
