package com.ww.trend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.convert.Convert;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.ww.trend.pojo.IndexData;
import com.ww.trend.util.SpringContextUtil;

@Service
@CacheConfig(cacheNames = "index_datas")
public class IndexDataService {
	
	@Autowired
	private RestTemplate restTemplate;
	private Map<String, List<IndexData>> indexDatas = new HashMap<>();
	
	@HystrixCommand(fallbackMethod = "thirdPartNotConnecte")
    public List<IndexData> fresh(String code) {
        List<IndexData> indexeDatas =fetchIndexDataFromThirdPart(code);
        indexDatas.put(code, indexeDatas);       
        IndexDataService indexDataService = SpringContextUtil.getBean(IndexDataService.class);
        indexDataService.remove(code);
        return indexDataService.store(code);
    }
     
    @CacheEvict(key="'indexData-code-'+ #p0")
    public void remove(String code){
         
    }
 
    @CachePut(key="'indexData-code-'+ #p0")
    public List<IndexData> store(String code){
        return indexDatas.get(code);
    }
 
    @Cacheable(key="'indexData-code-'+ #p0")
    public List<IndexData> get(String code){
        return CollUtil.toList();
    }
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private List<IndexData> fetchIndexDataFromThirdPart(String code) {
		List<Map> temp = restTemplate.getForObject("http://127.0.0.1:8090/indexes/" + code + ".json", List.class);
		return map2IndexData(temp);
	}
	
	@SuppressWarnings("unused")
	private List<IndexData> thirdPartNotConnecte(String code){
		System.out.println("third_part_not_connected()");
		IndexData index= new IndexData();
	   	index.setDate("0000-00-00");
	  	index.setClosePoint(0);
	   	return CollectionUtil.toList(index);
	}
	
	@SuppressWarnings("rawtypes")
	private List<IndexData> map2IndexData(List<Map> temp) {
        List<IndexData> indexDatas = new ArrayList<>();
        for (Map map : temp) {
            String date = map.get("date").toString();
            float closePoint = Convert.toFloat(map.get("closePoint"));
            IndexData indexData = new IndexData();
            indexData.setDate(date);
            indexData.setClosePoint(closePoint);
            indexDatas.add(indexData);
        }  
        return indexDatas;
    }
 
}
