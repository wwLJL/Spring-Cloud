package com.ww.trend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ww.trend.pojo.Index;
import com.ww.trend.service.IndexService;

@RestController
public class IndexController {

	@Autowired
	private IndexService indexService;
	
	@GetMapping("/freshCodes")
    public String fresh() {
        indexService.fresh();
        return "fresh codes successfully";
    }
	
    @GetMapping("/getCodes")
    public List<Index> get() {
        return indexService.get();
    }
    
    @GetMapping("/removeCodes")
    public String remove() {
        indexService.remove();
        return "remove codes successfully";
    }
	
}
