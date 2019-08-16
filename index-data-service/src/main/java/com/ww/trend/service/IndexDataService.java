package com.ww.trend.service;

import java.util.List;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import cn.hutool.core.collection.CollUtil;

import com.ww.trend.pojo.IndexData;

@Service
@CacheConfig(cacheNames = "index_datas")
public class IndexDataService {
	
	@Cacheable(key = "'indexData-code-' + #p0")
	public List<IndexData> getData(String code) {
		return CollUtil.toList();
	}

}
