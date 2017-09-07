/*ajax({
	url : 'demo.php',  
	type : 'post',
	data : 'username=feifei&age=18',
	success : function(data){},
	error : function(error){}
})*/
// 回调函数的本质就是将一个函数当做参数传递进来，在函数的内部调用传递过来的函数
// 并且还可以在调用回调函数的时候可以传递参数
var $ = {
	ajax : function (obj){
		// 创建对象
		var xhr = new XMLHttpRequest();

		if(obj.type == 'get' || obj.type == 'GET'){
			// 如果是get方式，需要将data和url组合起来
			obj.url = obj.url + '?' + $.params(obj.data);
			// 如果是get请求，直接将data数据设置为null
			obj.data = null;
		}else{
			// 在post的时候，也需要将对象形式的data转换成字符串形式的data
			obj.data = $.params(obj.data);
		}

		xhr.open(obj.type,obj.url,true);

		if(obj.type == 'post' || obj.type == 'POST'){
			// 如果是post的 需要设置请求头
			xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		}
		// 在AJAX发送之前调用
		obj.beforeSend && obj.beforeSend();

		// 发送数据 
		xhr.send(obj.data);

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				// 意味这ajax回到了客户端
				// 在根据状态码觉得是成功还是失败
				if(xhr.status >= 200 && xhr.status <= 300 || xhr.status == 304){
					var data = xhr.responseText;
					// 将一个匿名函数传递进来
					// 如果传递了fn参数，才去调用
					obj.success && obj.success(data);
				}else{
					obj.error && obj.error(xhr);
				}
				// 不管是成功还是失败，都调用complete
				obj.complete && obj.complete(xhr);

			}
		}

	},
	// 这个函数的作用只有一个，将data对象转换成data字符串
	params : function (data){
		// { username : feifei,age : 18 }
		// username=feifei&age=18
		var str = '';
		for(var attr in data){
			str += attr + '=' +  data[attr] + '&';
		}
		// str = username=feifei&age=18&
		return str.slice(0,-1);
	}	
}
