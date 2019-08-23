package com.ww.mms.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ww.mms.dao.MusicDao;
import com.ww.mms.pojo.Music;

@RestController
public class MusicController {
	
	@Autowired
	private MusicDao musicDao;
	
	@RequestMapping("/listMusic")
	@CrossOrigin
	public List<Music> listMusic() {
		List<Music> musicList = musicDao.findAll();
		return musicList;
	}
	
	@RequestMapping("/addMusic")
	@CrossOrigin
	public String addMusic(String name, String singer) {
		if(name.equals("") || singer.equals("")) {
			return "nullData";
		}
		else if(name.length() > 20 || singer.length() > 20) {
			return "tooLong";
		}
		else {
			Music music = new Music();
			music.setName(name);
			music.setSinger(singer);
			if(musicDao.save(music) != null) {
				return "success";
			}
			else {
				return "fail";
			}
		}
	}
	
	@RequestMapping("/deleteMusic")
	@CrossOrigin
	public String deleteMusic(String musicIds) {
		if(musicIds.equals("")) {
			return "nullData";
		}
		String[] mIds = musicIds.split(",");
		for(String musicId : mIds) {
			musicDao.deleteById(Integer.valueOf(musicId));
		}
		return "success";
	}

}
