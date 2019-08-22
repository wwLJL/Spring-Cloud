// JavaScript Document
// JavaScript Document
$(function($){
	$("#loginbtn").on("click", function(e){
		var account = $("#account").val();
		var password = $("#password").val();
		$.ajax({
			url:'http://127.0.0.1:8080/loginServer/check',
			type:'post',
			data:{
				account:account,
				password:password
			},
			success:function(result){
				if(result == "nullData"){
					alert("请输入完整信息！")
				}
				else if(result == "false"){
					alert("账号密码有误，请重新输入！");
				}
				else if(result == "serverDown"){
					alert("无服务，请稍后再试！");
				}
				else{
					var mes = result.split(",");
					if(mes[0] == "true") {
						alert("登录成功！");
						window.location.href = "http://127.0.0.1:8080/musicManageView/show/"+mes[1];
					}

				}
			},
			error:function(){
				alert("连接失败！");
			}
		});
	});
});