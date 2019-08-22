// JavaScript Document
$(function($) {
	var $table = $("#muisctab");
	
	$table.bootstrapTable({
		height:'600px',
		url:"http://127.0.0.1:8080/musicManageServer/listMusic",
		method:"GET",
		columns:[
			{
				field:'select',
				checkbox:true,
				align:'center',
				valign:'middle',
			},
			{
				field:'id',
				title:'ID',
				align:'center',
				valign:'middle',	
			},
			{
				field:'name',
				title:'歌曲名',
				align:'center',
				valign:'middle',	
			},
			{
				field:'singer',
				title:'歌手',
				align:'center',
				valign:'middle',	
			},
		]
	});
	
	function addMusic() {
		var name = $("#username").val();
		var singer = $("#password").val();
		var param = {
				name:name,
				singer:singer
		};
		
		$.ajax({
			url:"http://127.0.0.1:8080/musicManageServer/addMusic",
			data:param,
			success:function(data) {
				if((typeof(data) != "undefined") && (data == 0)) {
					$table.bootstrapTable('refresh');
				}
				if(data == -1) {
					alert("请输入完整信息！");
				}
				if(data == -2) {
					alert("年龄只能为数字！");
				}
			},
			complete:function() {
				$("#useraddModal").modal('hide');
			},
			context:this
		});
	}
	
	$("#add_music_Btn").bind("click", addMusic);
	
	function deleteMusic() {
		var selects = $table.bootstrapTable("getSelections");
		if(selects.length == 0) {
			return;
		}
		
		var	musicIds = "";
		for(var i = 0; i < selects.length; i++) {
			musicIds = musicIds + selects[i].id + ",";
		}
		
		var param = {
				musicIds:musicIds
		};
		$.ajax({
			url:"http://127.0.0.1:8080/musicManageServer/deleteMusic",
			data:param,
			success:function(data) {

				if((typeof(data) != "undefined") && (data == 0)) {
					$table.bootstrapTable('refresh');
				}
				$("#remove").attr("disabled", "disabled");
			},
			context:this
		});
	}
	$("#remove").bind("click", deleteMusic);
});
	
	
	
	


