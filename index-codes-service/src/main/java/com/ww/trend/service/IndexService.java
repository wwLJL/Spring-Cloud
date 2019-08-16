package com.ww.trend.service;

import java.util.List;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import cn.hutool.core.collection.CollUtil;

import com.ww.trend.pojo.Index;

@Service
@CacheConfig(cacheNames = "indexes")
public class IndexService {
	
	@Cacheable(key = "'all_codes'")
	public List<Index> getCodes() {
        return CollUtil.toList();
	}

}
