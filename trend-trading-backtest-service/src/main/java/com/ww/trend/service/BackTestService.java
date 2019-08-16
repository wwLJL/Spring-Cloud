package com.ww.trend.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ww.trend.client.IndexDataClient;
import com.ww.trend.pojo.IndexData;

@Service
public class BackTestService {
	
	@Autowired 
	private IndexDataClient indexDataClient;
	
	public List<IndexData> listIndexData(String code) {
		List<IndexData> result = indexDataClient.getIndexData(code);
		Collections.reverse(result);
        return result;
	}

}
