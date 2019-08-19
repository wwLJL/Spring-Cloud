$(function($) {
	var $equipmenttab = $("#equipmenttab");
	
	$equipmenttab.bootstrapTable({
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
	
	function addEquipment() {
		var e_name = $("#e_name").val();
		var e_mac = $("#e_mac").val();
		var e_type = $("#e_type").val();
		
		$.ajax({
			url:"/MusicManage/equipmentController/addEquipment.do",
			method:"POST",
			data:{
				e_name:e_name,
				e_mac:e_mac,
				e_type:e_type
			},
			success:function(result) {
				if(result == "fail") {
					alert("设备添加失败！");
					$("#equipmentaddModal").modal('hide');
				}
				else if(result == "nullData") {
					alert("请输入完整信息！");
				}
				else if(result == "tooLong") {
					alert("信息过长！");
				}
				else {
					alert("设备添加成功！");
					var num = result.split(",");
					alert("设备添加通知：成功"+num[0]+"台，失败"+num[1]+"台");
					$("#equipmentaddModal").modal('hide');
					$equipmenttab.bootstrapTable('refresh');
				}
			},
			error:function(){
				alert("连接失败！");
				$("#equipmentaddModal").modal('hide');
			}
		});
	}
	$("#add_equipment_Btn").bind("click", addEquipment);
	
	function delEquipment() {
		var equipmentSelects = $equipmenttab.bootstrapTable('getSelections');
		if(equipmentSelects.length == 0) {
			return;
		}
		var	equipmentIds = "";
		for(var i = 0; i < equipmentSelects.length; i++) {
			equipmentIds = equipmentIds + equipmentSelects[i].e_id + ",";
		}
		
		if(window.confirm('你确定要删除吗？')){
        }else{
           return;
        }

		$.ajax({
			url:"/MusicManage/equipmentController/deleteEquipment.do",
			method:"POST",
			data:{
				equipmentIds:equipmentIds
			},
			success:function(result) {
				if(result == "fail") {
					alert("删除失败！")
				}
				else {
					alert("删除成功！");
					var num = result.split(",");
					alert("设备删除通知：成功"+num[0]+"台，失败"+num[1]+"台");
					$equipmenttab.bootstrapTable('refresh');
				}
			},
			error:function(){
				alert("连接失败！");
			}
		});
	}
	$("#equipment_remove").bind("click", delEquipment);
	
	$("#equipment_update").click(function() {
		var equipmentSelects = $equipmenttab.bootstrapTable('getSelections');
		if(equipmentSelects.length == 0) {
			alert("请选择修改的设备！");
			return;
		}
		if(equipmentSelects.length >= 2) {
			alert("只能选择一台设备！");
			return;
		}
		
		var equipment = equipmentSelects[0];
		$("#e_name1").val(equipment.e_name);
		$("#e_mac1").val(equipment.e_mac);
		$("#e_type1").val(equipment.e_type)
		
		$("#equipmentUpdateModal").modal('show');
	});
	
	function updateEquipment() {
		var equipmentSelects = $equipmenttab.bootstrapTable('getSelections');
		var e_id = equipmentSelects[0].e_id;
		var e_name = $("#e_name1").val();
		var e_mac = $("#e_mac1").val();
		var e_type = $("#e_type1").val();
		
		if(window.confirm('你确定要修改吗？')){
        }else{
           return;
        }

		$.ajax({
			url:"/MusicManage/equipmentController/updateEquipment.do",
			method:"POST",
			data:{
				e_id:e_id,
				e_name:e_name,
				e_mac:e_mac,
				e_type:e_type
			},
			success:function(result) {
				if(result == "fail") {
					alert("修改失败！")
					$("#equipmentUpdateModal").modal('hide');
				}
				else if(result == "nullData") {
					alert("请输入完整信息！");
				}
				else if(result == "tooLong") {
					alert("信息过长！");
				}
				else {
					alert("修改成功");
					var num = result.split(",");
					alert("设备修改通知：成功"+num[0]+"台，失败"+num[1]+"台");
					$("#equipmentUpdateModal").modal('hide');
					$equipmenttab.bootstrapTable('refresh');
				}
			},
			error:function(){
				alert("连接失败！");
				$("#equipmentUpdateModal").modal('hide');
			}
		});
	}
	$("#update_equipment_Btn").bind("click", updateEquipment);
	
	function sendAD() {
		var AD = $("#AD").val();
		var equipmentSelects = $equipmenttab.bootstrapTable('getSelections');
		if(equipmentSelects.length == 0) {
			alert("请选择设备！");
			$("#sendADModal").modal('hide');
			return;
		}
		var	equipmentIds = "";
		for(var i = 0; i < equipmentSelects.length; i++) {
			equipmentIds = equipmentIds + equipmentSelects[i].e_id + ",";
		}
		
		$.ajax({
			url:"/MusicManage/equipmentController/sendAD.do",
			method:"POST",
			data:{
				equipmentIds:equipmentIds,
				AD:AD
			},
			success:function(result) {
				var num = result.split(",");
				alert("广告推送：成功"+num[0]+"台，失败"+num[1]+"台");
				$("#sendADModal").modal('hide');
			},
			error:function(){
				alert("连接失败！");
				$("#sendADModal").modal('hide');
			}
		});
	}
	$("#send_AD_Btn").bind("click", sendAD);
	
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