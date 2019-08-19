// JavaScript Document
// JavaScript Document
$(function($){
	$("#loginbtn").on("click", function(e){
		var account = $("#account").val();
		var password = $("#password").val();
		$.ajax({
			url:'http://127.0.0.1:8031/api-loginServer/login.do',
			type:'post',
			data:{
				account:account,
				password:password
			},
			success:function(result){
				if(result == "success"){
					alert("登录成功！");
					window.location.href = "http://127.0.0.1:8031/api-view/";
				}
				else if(result == "fail"){
					alert("账号密码有误，请重新输入！");
				}
				else if(result == "nulldata"){
					alert("请输入完整信息！")
				}
			},
			error:function(){
				alert("连接失败！");
			}
		});
	});
});