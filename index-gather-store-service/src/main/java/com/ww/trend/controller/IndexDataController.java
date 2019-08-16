package com.ww.trend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ww.trend.pojo.IndexData;
import com.ww.trend.service.IndexDataService;

@RestController
public class IndexDataController {
	
	@Autowired
	private IndexDataService indexDataService;
	
	@GetMapping("/freshIndexData/{code}")
    public String fresh(@PathVariable("code") String code) {
        indexDataService.fresh(code);
        return "fresh index data successfully";
    }
	
    @GetMapping("/getIndexData/{code}")
    public List<IndexData> get(@PathVariable("code") String code) {
        return indexDataService.get(code);
    }
    
    @GetMapping("/removeIndexData/{code}")
    public String remove(@PathVariable("code") String code) {
        indexDataService.remove(code);
        return "remove index data successfully";
    }

}
