var cookieUtil={
	set:function(name,value){
		document.cookie=name+'='+value;
	},
	get:function(name){
		var arrCookies=document.cookie.split('; ');
		for(var i in arrCookies){
			var getCookie=arrCookies[i].split('=');
			if (getCookie[0]==name) {
				return getCookie[1];
			}
		}
	},
	del:function(name){
		this.set(name,'');
	}
}

var alertOnOff=false;
function alert(value){
	if (!alertOnOff) {
		var div=document.createElement('div');
		var html='<div>\
				<h1>提示</h1>\
				<div>\
					<p></p>\
				</div>\
				<h2>\
					<input type="button" value="确定">\
				</h2>\
			</div>'
			div.innerHTML=html;
			div.id="alertFrame";
		var content=div.getElementsByTagName('p')[0];
		var frame=div.getElementsByTagName('div')[0];
		content.innerText=value;
		div.style.width=document.body.clientWidth+'px';
		div.style.height=document.body.clientHeight+'px';
		var frameH=document.documentElement.clientHeight;
		frame.style.top=frameH/2+(document.documentElement.scrollTop-100)+'px';
		document.body.appendChild(div);
		function closeFrame(){
			var alertFrame=document.getElementById('alertFrame');
			var btn=alertFrame.getElementsByTagName('input')[0];
			btn.onclick=function(){
				document.body.removeChild(alertFrame);
				alertOnOff=false;
			}
		}
		closeFrame();
		alertOnOff=true;
	}else{
		return;
	}
}