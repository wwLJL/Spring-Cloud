package com.ww.mms.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ww.mms.pojo.Music;

public interface MusicDao extends JpaRepository<Music, Integer> {
	
	

}
