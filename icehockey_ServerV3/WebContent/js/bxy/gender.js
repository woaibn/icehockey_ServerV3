$(function() {
	$('body').css({
		'min-height' : $(window).height()
	});
	// 
	$("#man").click(function() {
		submit('man');
		window.location.href = "manWeight.html?gender=man";
	});

	// 性别"lady"击事件
	$("#lady").click(function() {
		submit('lady');
		window.location.href = "ladyWeight.html?gender=lady";
	});

	// 请求后台服务
	var urlUserId=comm.getUrlParameter("userid");//解析url中的参数获取userid的值
	function submit(gender) {
		var data = {
			userid : urlUserId,
			gender : gender		
		};
		alert(JSON.stringify(data));
		// 请求后台保存数据
		$.post(GENDERURL, data, function(result) {
			// 处理后台返回的结果
			var jsonReturn = JSON.parse(result);// 将JSON字符串转换为对象
			if (jsonReturn.result == "0") {
				if (gender == "man") {// 如果选择'man'，跳转man体重面
					window.location.href = "manWeight.html?gender" + gender
							+ "&userid=" + jsonReturn.userid;
				} else if (play == "SNOW") {// 如果选择‘lady''，跳转lady体重页面
					window.location.href = "ladyWeight.html?gender" + gender
							+ "&userid=" + jsonReturn.userid;
				}
				// window.open
			} else if (jsonReturn.result == "-1") {
				window.location.href = "./bxy/gender.html";
			}
		},"json");
	}
});
