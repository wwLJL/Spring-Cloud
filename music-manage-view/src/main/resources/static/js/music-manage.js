// JavaScript Document
$(function($) {
	var $table = $("#musictab");
	
	$table.bootstrapTable({
		height:'600px',
		url:"http://127.0.0.1:8080/musicManageServer/listMusic",
		method:"GET",
		pagination:true,
	    pageSize:"5",
		search:true,
		toolbar:"#toolbar",
		showRefresh:true,
		showToggle:true,
		showColumns:true,
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
			{
				field:'create_time',
				title:'创建时间',
				align:'center',
				valign:'middle',	
				formatter: function (value, row, index) {
					return renderTime(value);
				}
			},
			{
				field:'ID',
				title:'操作',
				align:'center',
				valign:'middle',
				formatter: actionFormatter
			},
		],
		onDblClickRow: function (row, $element) {
			var id = row.ID;
			EditViewById(id, 'view');
		},
	});
	
	function renderTime(date) {
	  var dateee = new Date(date).toJSON();
	  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
	}
	
	//操作栏的格式化
    function actionFormatter(value, row, index) {
        var id = value;
        var result = "";
        result += "<a href='javascript:;' class='btn btn-xs green' onclick=\"EditViewById('" + id + "')\" title='查看'><span class='glyphicon glyphicon-search'></span></a>";
        result += "<a href='javascript:;' class='btn btn-xs blue' onclick=\"EditViewById('" + id + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'></span></a>";
        result += "<a href='javascript:;' class='btn btn-xs red' onclick=\"DeleteByIds('" + id + "')\" title='删除'><span class='glyphicon glyphicon-remove'></span></a>";
        return result;
    }
	
	function addMusic() {
		var name = $("#name").val();
		var singer = $("#singer").val();
		var param = {
			name:name,
			singer:singer
		};
		
		$.ajax({
			url:"http://127.0.0.1:8080/musicManageServer/addMusic",
			data:param,
			success:function(result) {
				if(result == "success") {
					alert("添加成功！");
					$("#name").val("");
					$("#singer").val("");
					$("#musicAddModal").modal('hide');
					$table.bootstrapTable('refresh');
				}
				else if(result == "nullData") {
					alert("请输入完整数据！");
				}
				else if(result == "tooLong") {
					alert("信息过长！");
				}
				else if(result == "fail") {
					alert("添加失败！");
					$("#name").val("");
					$("#singer").val("");
					$("#musicAddModal").modal('hide');
				}
			},
			error:function(){
				alert("连接失败！");
				$("#name").val("");
				$("#singer").val("");
				$("#musicAddModal").modal('hide');
			}
		});
	}
	$("#add_muisc_Btn").bind("click", addMusic);
	
	function deleteMusic() {
		var selects = $table.bootstrapTable("getSelections");
		if(selects.length == 0) {
			alert("请选择需要删除的音乐！");
			return;
		}
		var	musicIds = "";
		for(var i = 0; i < selects.length; i++) {
			musicIds = musicIds + selects[i].id + ",";
		}
		var param = {
			musicIds:musicIds
		};
		if(window.confirm('你确定要删除吗？')){
        }
		else{
           return;
        }
		$.ajax({
			url:"http://127.0.0.1:8080/musicManageServer/deleteMusic",
			data:param,
			success:function(result) {
				if(result == "success") {
					alert("删除成功！");
					$table.bootstrapTable('refresh');
				}
				else if(result == "nullData") {

				}
			},
			error:function(){
				alert("连接失败！");
			}
		});
	}
	$("#remove").bind("click", deleteMusic);
});