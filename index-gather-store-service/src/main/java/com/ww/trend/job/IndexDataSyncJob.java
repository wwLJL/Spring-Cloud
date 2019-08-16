package com.ww.trend.job;

import java.util.List;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;

import com.ww.trend.pojo.Index;
import com.ww.trend.service.IndexDataService;
import com.ww.trend.service.IndexService;

public class IndexDataSyncJob extends QuartzJobBean {
	
	@Autowired
	private IndexService indexService;
	@Autowired
	private IndexDataService indexDataService;

	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
		System.out.println("定时器触发，刷新Index数据！");
		List<Index> indexes = indexService.fresh();
		for (Index index : indexes) {
			indexDataService.fresh(index.getCode());
		}
	}

}
