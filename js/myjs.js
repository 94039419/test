function g(id){
		if(id.substr(0,1)=="."){
			return document.getElementsByClassName(id.substr(1));	
		}
		return document.getElementById(id);
	}

window.onload=function(){
	var timer=null;
	var flag=false;
	timer=setInterval(function(){							//定时执行动画
		imgTurn("right");								
		spanChange("right");
	},2000);
	
	g("btnR").onclick=function(){								//点击右边按钮，触发图片转播，下标移动
		if(flag==true){
			return
		}
			imgTurn("right");								
			spanChange("right");
			
		
		
	}

	
	g("btnL").onclick=function(){
		imgTurn("left");	
		spanChange("left");
	}
	
	g("wrapView").onmousemove=function(){					//鼠标移入移出，停止、继续动画
		clearInterval(timer);	
	};
	g("wrapView").onmouseout=function(){
			timer=setInterval(function(){
				imgTurn("right");								
				spanChange("right");
			},2000);
	};
	
	var spans=g(".spanTag");	
	var index=1;												//很聪明的定义，以预定义的位置1，不断通过差值，来获得新的位置
	for(var s=0;s<spans.length;s++){
		(function(s){
			spans[s].onclick=function(){
				for(var c=0;c<spans.length;c++){
					spans[c].className="spanTag";
				}
				this.className="spanTag spanTag_current";
				
				var myindex=-600*((s+1)-index)					//很聪明的定义，以预定义的位置1，不断通过差值，来获得新的位置
				
				animate(myindex);
				index=(s+1);
			}
		})(s)
	
	}
	
}

var index=0;
function spanChange(dir){													//下标移动的方法
	var spans=g(".spanTag");
	if(dir=="right"){
		for(var i=0;i<spans.length;i++){
			spans[i].className="spanTag"	
		}
		index++;
		if(index>4){
			index=0;
			spans[index].className="spanTag spanTag_current";
		}else{
			spans[index].className="spanTag spanTag_current";
		}
	}else if(dir=="left"){
		for(var i=0;i<spans.length;i++){
			spans[i].className="spanTag"	
		}
		if(index==0){
			index=5;
		}
		spans[--index].className="spanTag spanTag_current";
		
	}
}

function imgTurn(dir){
	if(dir=="right"){
		animate(-600)
	}else if(dir=="left"){
		animate(600)
	}

}

function animate(displace){														//传入位移参数“displace”
	flag=true;
	if(displace==0){
		return;
	}
	var newcurL=parseInt(g("imgList").style.left)+displace;							//减去600像素的位置
	var inteval = 10;																//间隔时间10毫秒
	var time=300;																	//总时间300毫秒
	var speed =displace/(time/inteval);												//计算出速度，有可能正，有可能负值
	var go = function (){	
		if((parseInt(g("imgList").style.left)>newcurL&&speed<0)||(parseInt(g("imgList").style.left)<newcurL)&&speed>0){			//如果当前的值大于,或小于需要移动到的位置数值
			g("imgList").style.left=parseInt(g("imgList").style.left)+speed+"px";	//在10毫秒时间内不间断的加上速度
			setTimeout(go,inteval);
		}else{
			g("imgList").style.left=newcurL+"px";
			flag=true;
			if(parseInt(g("imgList").style.left)<(-3000)){
				g("imgList").style.left=(-600)+"px"
			}
			if(parseInt(g("imgList").style.left)>(-600)){
				g("imgList").style.left=(-3000)+"px"
			}
			flag=false;
		}
	}
	go();
}


