$(function($) {
	var $musictab = $("#musictab");
	var $equipmenttab1 = $("#equipmenttab1");
	var $equipmenttab2 = $("#equipmenttab2");
	
	$musictab.bootstrapTable({
		height:'600px',
		url:"/MusicManage/musicController/listMusic.do",
		method:"GET",
		pagination:true,
	    pageSize:"5",
		search:true,
		columns:[
			{
				field:'select',
				checkbox:true,
				align:'center',
				valign:'middle',
			},
			{
				field:'m_id',
				title:'编号',
				align:'center',
				valign:'middle',	
			},
			{
				field:'m_name',
				title:'歌名',
				align:'center',
				valign:'middle',	
			},
			{
				field:'m_author',
				title:'歌手',
				align:'center',
				valign:'middle',
			},
			{
				field:'m_createtime',
				title:'添加时间',
				align:'center',
				valign:'middle',
				formatter: function (value, row, index) {
					return changeDateFormat(value);
				}
			},
		],
	});
	
	function addMusic() {
		var m_name = $("#m_name").val();
		var m_author = $("#m_author").val();
		
		$.ajax({
			url:"/MusicManage/musicController/addMusic.do",
			method:"POST",
			data:{
				m_name:m_name,
				m_author:m_author	
			},
			success:function(result) {
				if(result == "success") {
					alert("音乐添加成功！");
					$("#musicaddModal").modal('hide');
					$musictab.bootstrapTable('refresh');
				}
				else if(result == "nullData") {
					alert("请输入完整信息！");
				}
				else if(result == "tooLong") {
					alert("信息过长！");
				}
				else if(result == "fail") {
					alert("音乐添加失败！");
				}
			},
			error:function(){
				alert("连接失败！");
				$("#musicaddModal").modal('hide');
			}
		});
	}
	$("#add_music_Btn").bind("click", addMusic);
	
	function delMusic() {
		var musicSelects = $musictab.bootstrapTable('getSelections');
		if(musicSelects.length == 0) {
			return;
		}
		var	musicIds = "";
		for(var i = 0; i < musicSelects.length; i++) {
			musicIds = musicIds + musicSelects[i].m_id + ",";
		}

		$.ajax({
			url:"/MusicManage/musicController/deleteMusic.do",
			method:"POST",
			data:{
				musicIds:musicIds
			},
			success:function(result) {
				if(result == "success") {
					alert("删除成功！");
					$musictab.bootstrapTable('refresh');
				}
				else if(result == "fail") {
					alert("删除失败！")
				}
			},
			error:function(){
				alert("连接失败！");
			}
		});
	}
	
	$("#music_remove").click(function() {
		var musicSelects = $musictab.bootstrapTable('getSelections');
		if(musicSelects.length == 0) {
			alert("请选择删除的音乐！");
			$("#sendInformModal").modal('hide');
			return;
		}
		
		if(window.confirm('你确定要删除吗？')){
        }else{
           return;
        }
		
		$equipmenttab2.bootstrapTable({
			height:'600px',
			url:"/MusicManage/equipmentController/listEquipment.do",
			method:"GET",
			pagination:true,
		    pageSize:"5",
			search:true,
			columns:[
				{
					field:'select',
					checkbox:true,
					align:'center',
					valign:'middle',
				},
				{
					field:'e_id',
					title:'编号',
					align:'center',
					valign:'middle',	
				},
				{
					field:'e_name',
					title:'设备名',
					align:'center',
					valign:'middle',	
				},
				{
					field:'e_mac',
					title:'MAC地址',
					align:'center',
					valign:'middle',
				},
				{
					field:'e_type',
					title:'设备类型',
					align:'center',
					valign:'middle',
				},
				{
					field:'e_online',
					title:'在线情况',
					align:'center',
					valign:'middle',
				},
				{
					field:'e_createtime',
					title:'添加时间',
					align:'center',
					valign:'middle',
					formatter: function (value, row, index) {
						return changeDateFormat(value);
					}
				},
			],
		});
		$("#sendInformModal").modal('show');
	});
	
	$("#send_Inform_Btn").click(function() {
		var musicSelects = $musictab.bootstrapTable('getSelections');
		var	musicIds = "";
		for(var i = 0; i < musicSelects.length; i++) {
			musicIds = musicIds + musicSelects[i].m_id + ",";
		}
		
		var equipmentSelects = $equipmenttab2.bootstrapTable('getSelections');
		if(equipmentSelects.length == 0) {
			alert("请选择通知的设备！");
			return;
		}
		var	equipmentIds = "";
		for(var i = 0; i < equipmentSelects.length; i++) {
			equipmentIds = equipmentIds + equipmentSelects[i].e_id + ",";
		}
		
		delMusic();
		
		$.ajax({
			url:"/MusicManage/musicController/sendMusicStatusInform.do",
			method:"POST",
			data:{
				musicIds:musicIds,
				equipmentIds:equipmentIds,
				type:"0x04"
			},
			success:function(result) {
				var num = result.split(",");
				alert("音乐删除通知：成功"+num[0]+"台，失败"+num[1]+"台");
				$("#sendInformModal").modal('hide');
			},
			error:function(){
				alert("连接失败！");
				$("#sendInformModal").modal('hide');
			}
		});
	});
	
	$("#music_update").click(function() {
		var musicSelects = $musictab.bootstrapTable('getSelections');
		if(musicSelects.length == 0) {
			alert("请选择修改的音乐！");
			return;
		}
		if(musicSelects.length >= 2) {
			alert("只能选择一首音乐！");
			return;
		}
		
		var music = musicSelects[0];
		
		$("#m_name1").val(music.m_name);
		$("#m_author1").val(music.m_author)
		
		$("#musicUpdateModal").modal('show');
	});
	
	function updateMusic() {
		var musicSelects = $musictab.bootstrapTable('getSelections');
		var m_id = musicSelects[0].m_id;
		var m_name = $("#m_name1").val();
		var m_author = $("#m_author1").val();
		
		if(window.confirm('你确定要修改吗？')){
        }else{
           return;
        }

		$.ajax({
			url:"/MusicManage/musicController/updateMusic.do",
			method:"POST",
			data:{
				m_id:m_id,
				m_name:m_name,
				m_author:m_author,
			},
			success:function(result) {
				if(result == "success") {
					alert("修改成功！");
					$("#musicUpdateModal").modal('hide');
					$musictab.bootstrapTable('refresh');
				}
				else if(result == "nullData") {
					alert("请输入完整信息！");
				}
				else if(result == "tooLong") {
					alert("信息过长！");
				}
				else if(result == "fail") {
					alert("修改失败！")
					$("#musicUpdateModal").modal('hide');
				}
			},
			error:function(){
				alert("连接失败！");
				$("#musicUpdateModal").modal('hide');
			}
		});
	}
	$("#update_music_Btn").bind("click", updateMusic);
	
	function sendMusic() {
		var musicSelects = $musictab.bootstrapTable('getSelections');
		if(musicSelects.length == 0) {
			alert("请选择推送的音乐！");
			$("#sendMusicModal").modal('hide');
			return;
		}
		var	musicIds = "";
		for(var i = 0; i < musicSelects.length; i++) {
			musicIds = musicIds + musicSelects[i].m_id + ",";
		}
		
		var equipmentSelects = $equipmenttab1.bootstrapTable('getSelections');
		if(equipmentSelects.length == 0) {
			alert("请选择推送的设备！");
			return;
		}
		var	equipmentIds = "";
		for(var i = 0; i < equipmentSelects.length; i++) {
			equipmentIds = equipmentIds + equipmentSelects[i].e_id + ",";
		}
		
		$.ajax({
			url:"/MusicManage/musicController/sendMusic.do",
			method:"POST",
			data:{
				musicIds:musicIds,
				equipmentIds:equipmentIds
			},
			success:function(result) {
				var num = result.split(",");
				alert("音乐推送：成功"+num[0]+"台，失败"+num[1]+"台");
				$("#sendMusicModal").modal('hide');
			},
			error:function(){
				alert("连接失败！");
				$("#sendMusicModal").modal('hide');
			}
		});
	}
	$("#send_Music_Btn").bind("click", sendMusic);
	
	$("#music_send").click(function() {
		$equipmenttab1.bootstrapTable({
			height:'600px',
			url:"/MusicManage/equipmentController/listEquipment.do",
			method:"GET",
			pagination:true,
		    pageSize:"5",
			search:true,
			columns:[
				{
					field:'select',
					checkbox:true,
					align:'center',
					valign:'middle',
				},
				{
					field:'e_id',
					title:'编号',
					align:'center',
					valign:'middle',	
				},
				{
					field:'e_name',
					title:'设备名',
					align:'center',
					valign:'middle',	
				},
				{
					field:'e_mac',
					title:'MAC地址',
					align:'center',
					valign:'middle',
				},
				{
					field:'e_type',
					title:'设备类型',
					align:'center',
					valign:'middle',
				},
				{
					field:'e_online',
					title:'在线情况',
					align:'center',
					valign:'middle',
				},
				{
					field:'e_createtime',
					title:'添加时间',
					align:'center',
					valign:'middle',
					formatter: function (value, row, index) {
						return changeDateFormat(value);
					}
				},
			],
		});
	});

	function changeDateFormat(cellval) {
		var dateVal = cellval + "";
		if (cellval != null) {
			var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
			var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	        
			var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	            
			return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
		}
	}
	
});