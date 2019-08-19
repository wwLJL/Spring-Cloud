$(function($) {
	var $usertab = $("#usertab");
	
	$usertab.bootstrapTable({
		height:'600px',
		url:"/MusicManage/userController/listUser.do",
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
				field:'u_id',
				title:'编号',
				align:'center',
				valign:'middle',	
			},
			{
				field:'u_account',
				title:'账号',
				align:'center',
				valign:'middle',	
			},
			{
				field:'u_name',
				title:'姓名',
				align:'center',
				valign:'middle',
			},
			{
				field:'u_sex',
				title:'性别',
				align:'center',
				valign:'middle',	
			},
			{
				field:'u_age',
				title:'年龄',
				align:'center',
				valign:'middle',	
			},
			{
				field:'u_mobilephone',
				title:'电话号码',
				align:'center',
				valign:'middle',	
			},
			{
				field:'u_address',
				title:'家庭住址',
				align:'center',
				valign:'middle',	
			},
		],
	});
	
	function addUser() {
		var u_account = $("#u_account").val();
		var u_password = $("#u_password").val();
		var u_name = $("#u_name").val();
		var u_sex = $("#u_sex").val();
		var u_age = $("#u_age").val();
		var u_mobilephone = $("#u_mobilephone").val();
		var u_address = $("#u_address").val();
		
		$.ajax({
			url:"/MusicManage/userController/addUser.do",
			method:"POST",
			data:{
				u_account:u_account,
				u_password:u_password,	
				u_name:u_name,
				u_sex:u_sex,
				u_age:u_age,
				u_mobilephone:u_mobilephone,
				u_address:u_address
			},
			success:function(result) {
				if(result == "success") {
					alert("用户添加成功！");
					$("#useraddModal").modal('hide');
					$usertab.bootstrapTable('refresh');
				}
				else if(result == "nullData") {
					alert("请输入完整信息！");
				}
				else if(result == "tooLong") {
					alert("信息过长！");
				}
				else if(result == "ageIsInvalid") {
					alert("年龄信息无效！");
				}
				else if(result == "mobileIsInvalid") {
					alert("电话号码信息无效！");
				}
				else if(result == "sexIsInvalid") {
					alert("性别信息无效！");
				}
				else if(result == "fail") {
					alert("用户添加失败！");
				}
			},
			error:function(){
				alert("连接失败！");
				$("#useraddModal").modal('hide');
			}
		});
	}
	$("#add_user_Btn").bind("click", addUser);
	
	function delUser() {
		var userSelects = $usertab.bootstrapTable('getSelections');
		if(userSelects.length == 0) {
			alert("请选择要删除的用户！")
			return;
		}
		
		if(window.confirm('你确定要删除吗？')){
        }else{
           return;
        }
		
		var	userIds = "";
		for(var i = 0; i < userSelects.length; i++) {
			userIds = userIds + userSelects[i].u_id + ",";
		}

		$.ajax({
			url:"/MusicManage/userController/deleteUser.do",
			method:"POST",
			data:{
				userIds:userIds
			},
			success:function(result) {
				if(result == "success") {
					alert("删除成功！");
					$usertab.bootstrapTable('refresh');
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
	$("#user_remove").bind("click", delUser);
	
	$("#user_update").click(function() {
		var userSelects = $usertab.bootstrapTable('getSelections');
		if(userSelects.length == 0) {
			alert("请选择修改的用户！");
			return;
		}
		if(userSelects.length >= 2) {
			alert("只能选择一个用户！");
			return;
		}
		
		var user = userSelects[0];
		$("#u_account1").val(user.u_account);
		$("#u_name1").val(user.u_name);
		$("#u_sex1").val(user.u_sex);
		$("#u_age1").val(user.u_age);
		$("#u_mobilephone1").val(user.u_mobilephone);
		$("#u_address1").val(user.u_address);
		$("#userUpdateModal").modal('show');
	});
	
	function updateUser() {
		var userSelects = $usertab.bootstrapTable('getSelections');
		var u_id = userSelects[0].u_id;
		var u_account = $("#u_account1").val();
		var u_name = $("#u_name1").val();
		var u_sex = $("#u_sex1").val();
		var u_age = $("#u_age1").val();
		var u_mobilephone = $("#u_mobilephone1").val();
		var u_address = $("#u_address1").val();
		
		if(window.confirm('你确定要修改吗？')){
        }else{
           return;
        }

		$.ajax({
			url:"/MusicManage/userController/updateUser.do",
			method:"POST",
			data:{
				u_id:u_id,
				u_account:u_account,
				u_name:u_name,
				u_sex:u_sex,
				u_age:u_age,
				u_mobilephone:u_mobilephone,
				u_address:u_address
			},
			success:function(result) {
				if(result == "success") {
					alert("修改成功！");
					$("#userUpdateModal").modal('hide');
					$usertab.bootstrapTable('refresh');
				}
				else if(result == "nullData") {
					alert("请输入完整信息！");
				}
				else if(result == "tooLong") {
					alert("信息过长！");
				}
				else if(result == "ageIsInvalid") {
					alert("年龄信息无效！");
				}
				else if(result == "mobileIsInvalid") {
					alert("电话号码信息无效！");
				}
				else if(result == "sexIsInvalid") {
					alert("性别信息无效！");
				}
				else if(result == "fail") {
					alert("修改失败！")
					$("#userUpdateModal").modal('hide');
				}
			},
			error:function(){
				alert("连接失败！");
				$("#userUpdateModal").modal('hide');
			}
		});
	}
	$("#update_user_Btn").bind("click", updateUser);
	
});