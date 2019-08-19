$(function($) {
	var $music = $("#music");
	var $user = $("#user");
	var $equipment = $("#equipment");
	
	$user.removeClass("display");
	$equipment.removeClass("display");
	$user.addClass("undisplay");
	$equipment.addClass("undisplay");
	
	$music.removeClass("undisplay");
	$music.addClass("display");
	
	$("#musicList").click(function(){
		$user.removeClass("display");
		$equipment.removeClass("display");
		$user.addClass("undisplay");
		$equipment.addClass("undisplay");
		
		$music.removeClass("undisplay");
		$music.addClass("display");
	});
	$("#userList").click(function(){
		$music.removeClass("display");
		$equipment.removeClass("display");
		$music.addClass("undisplay");
		$equipment.addClass("undisplay");
		
		$user.removeClass("undisplay");
		$user.addClass("display");
	});
	$("#equipmentList").click(function(){
		$music.removeClass("display");
		$user.removeClass("display");
		$music.addClass("undisplay");
		$user.addClass("undisplay");
		
		$equipment.removeClass("undisplay");
		$equipment.addClass("display");
	});
	
	$.ajax({
		url:"/MusicManage/loginController/isSuper.do",
		method:"POST",
		data:{},
		success:function(result) {
			if(result == "false") {
				$("#music_add").addClass("undisplay");
				$("#music_remove").addClass("undisplay");
				$("#music_update").addClass("undisplay");
				$("#music_send").addClass("undisplay");
				
				$("#user_add").addClass("undisplay");
				$("#user_remove").addClass("undisplay");
				$("#user_update").addClass("undisplay");
				
				$("#equipment_add").addClass("undisplay");
				$("#equipment_remove").addClass("undisplay");
				$("#equipment_update").addClass("undisplay");
				$("#AD_send").addClass("undisplay");
			}
		},
		error:function(){
			alert("连接失败！");
		}
	});
});
