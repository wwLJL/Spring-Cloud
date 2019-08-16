package com.ww.trend.service;

import java.util.ArrayList;
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

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.ww.trend.pojo.Index;
import com.ww.trend.util.SpringContextUtil;

@Service
@CacheConfig(cacheNames = "indexes")
public class IndexService {
	
	@Autowired
	private RestTemplate restTemplate;
	private List<Index> indexList;
	
	@HystrixCommand(fallbackMethod = "thirdPartNotConnect")
    public List<Index> fresh() {
		indexList = fetchIndexFromThirdPart();
        IndexService indexService = SpringContextUtil.getBean(IndexService.class);
        indexService.remove();
        return indexService.store();
    }
 
    @CacheEvict(allEntries=true)
    public void remove(){

    }
 
    @CachePut(key="'all_codes'")
    public List<Index> store(){
        return indexList;
    }
 
    @Cacheable(key="'all_codes'")
    public List<Index> get(){
        return CollUtil.toList();
    }
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<Index> fetchIndexFromThirdPart() {
		List<Map> temp = restTemplate.getForObject("http://127.0.0.1:8090/indexes/codes.json", List.class);
		return map2Index(temp);
	}
	
	public List<Index> thirdPartNotConnect() {
		Index index = new Index();
		index.setCode("000000");
		index.setName("无效指数代码");
		return CollectionUtil.toList(index);
	}
	
	@SuppressWarnings("rawtypes")
	private List<Index> map2Index(List<Map> temp) {
		List<Index> indexList = new ArrayList<Index>();
		for (Map map : temp) {
			String code = map.get("code").toString();
			String name = map.get("name").toString();
			Index index = new Index();
			index.setCode(code);
			index.setName(name);
			indexList.add(index);
		}
		return indexList;
	}

}
