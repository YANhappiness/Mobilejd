//页面加载完成之后才触发的事件
window.onload=function(){
	//调用通栏的效果
	headerScoll();	
	//调用倒计时效果
	cutDownTime();
	// 轮播图
	bannerAndTouch();
}
/*
	必须知道的几个值：
	1.导航栏距离顶点的高度
	2.顶部通栏距离顶点的高度
 */
function headerScoll(){
	//1.获取导航栏
	var navDom = document.querySelector(".jd_nav");
	//2.获取导航栏距离顶点的高度
/*	var top = navDom.offsetTop;//距离顶部的高度
	var height= navDom.offsetHeight;//该节点自身的height值
	console.log(top);
	console.log(height);*/
	var maxDistance = navDom.offsetTop;
	//3.获取顶部通栏
	var headerDom = document.querySelector(".jd_header");
	//4.顶部通栏透明 通过js写的样式会放在行内,所以最好写在css文件中
	// headerDom.style.backgroundColor = 'rgba(201, 21, 35,0)';
	//5.注册onsrcoll事件
	window.onscroll= function(){
		var scrollDistance = window.document.body.scrollTop;
		// console.log(scrollDistance);
		//如果滚动距离/最大距离 >1 超出了轮播图 ->背景实心
		var percent = scrollDistance/maxDistance;
		if(percent>1){
			percent = 1;
		}
		//将通栏背景设置为percent
		headerDom.style.backgroundColor ='rgba(201, 21, 35,'+percent+')';
	}
}

//2.倒计时
function cutDownTime(){
	//剩余总时间(秒)
	var  totalSec = 3600;
	//获取存放显示时间的li 
	var liArr = document.querySelectorAll('.main_content:nth-child(1) .content_top li');
	// console.log(liArr);
	//开始倒计时
	var timeId = setInterval(function(){
		//判断如果倒计时已经小等于0 结束倒计时
		if(totalSec<=0){
			clearInterval(timeId);
			return;
		}
		//秒数减一
		totalSec--;
		//将当前总秒数 换算成时:分:秒 
		//计算当前秒是多少小时  Math.floor(totalSec / 3600)
		var hour = Math.floor(totalSec / 3600);
		//分别取小时的十位和个位  Math.floor(hour/10) hour%10
		var minute = Math.floor(totalSec%3600/60);
		var sec = Math.floor(totalSec%60);
		//将换算的数字放到页面对应的li中
		liArr[0].innerHTML=Math.floor(hour/10);
		liArr[1].innerHTML=hour%10;

		liArr[3].innerHTML=Math.floor(minute/10);
		liArr[4].innerHTML=minute%10;

		liArr[6].innerHTML=Math.floor(sec/10);
		liArr[7].innerHTML=sec%10;
		
	},1000);
}
//3.轮播图 自动切换 没有任何过渡效果
function banner(){
	/*
		必须要记录的一些值：
		1.定义index记录索引值
		2.轮播图每个图片的宽度
		  整个轮播图的ul 
		  索引ul li[index-1] 
	 */
	//1.记录屏幕的宽度
	var width = document.body.offsetWidth;
	//2.获取所有轮播图的ul节点
	var moveUl = document.querySelector(".banner_images");
	//3.定义一个index记录当前的索引值
	var index = 1;
	//4.表示索引的li标签
	var indexLiArr = document.querySelectorAll(".banner_index li");
	//5.自动轮播 1秒切换1张图
	setInterval(function(){
		//下一张
		index++;
		if(index>=9){
			index=1;
		}
		//修改ul的位置 css3的属性 translateX:在X轴上移动 
		//不会影响其他元素
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';
	},3000);
}
//4.轮播图 能看到切换的过程 但是 第一次显示的是8 最后跳转到1之后再无过渡效果
function banner2(){
	/*
		必须要记录的一些值：
		1.定义index记录索引值
		2.轮播图每个图片的宽度
		  整个轮播图的ul 
		  索引ul li[index-1] 
	 */
	//1.记录屏幕的宽度
	var width = document.body.offsetWidth;
	//2.获取所有轮播图的ul节点
	var moveUl = document.querySelector(".banner_images");
	moveUl.style.transition = "all 1s";
	//3.定义一个index记录当前的索引值
	var index = 1;
	//4.表示索引的li标签
	var indexLiArr = document.querySelectorAll(".banner_index li");
	//5.自动轮播 1秒切换1张图
	setInterval(function(){
		//下一张
		index++;
		if(index>=9){
			index=1;
			//瞬间回到第一张
			moveUl.style.transition = "";
		}
		//修改ul的位置 css3的属性 translateX:在X轴上移动 
		//不会影响其他元素
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';
	},3000);
}
//5.轮播图 索引自动切换 图片自动循环轮播
/*
	transition:过渡
	transform:旋转(rotate)  缩放(scale)   倾斜(skew)  移动(translate)
 */
function banner3(){
	var width = document.body.offsetWidth;
	var moveUl = document.querySelector(".banner_images");
	
	var index = 1;
	var indexLiArr = document.querySelectorAll(".banner_index li");
	setInterval(function(){
		index++;
		moveUl.style.transition = "all .3s";
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';
	},1000);
	/*每次过渡结束(轮播一张图结束)
	  判断是否到了最后一张
	  如果是 则立刻跳到第一张
	*/
	moveUl.addEventListener("webkitTransitionEnd",function(){
		if(index>=9){
			index=1;
			//关闭过渡
			moveUl.style.transition="";
			//修改一下ul的位置
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}
		//根据当前图片的下标修改对应的索引的背景颜色(白色)
		//清空所有实心
		for (var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		};
		//当前位置的li变成实心
		indexLiArr[index-1].className="current";
	});
}
//6.轮播图 索引自动切换 图片自动循环轮播 滑动
function bannerAndTouch(){
	var width = document.body.offsetWidth;
	var moveUl = document.querySelector(".banner_images");
	
	var index = 1;
	var indexLiArr = document.querySelectorAll(".banner_index li");
	var timeID = setInterval(function(){
		index++;
		moveUl.style.transition = "all .3s";
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';
	},1000);
	/*每次过渡结束(轮播一张图结束)
	  判断是否到了最后一张
	  如果是 则立刻跳到第一张
	*/
	moveUl.addEventListener("webkitTransitionEnd",function(){
		if(index>=9){
			index=1;
			//关闭过渡
			moveUl.style.transition="";
			//修改一下ul的位置
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}else if(index<1){//即将变成空白 立刻回到倒数第二张
			index=8;
			//关闭过渡
			moveUl.style.transition="";
			//立刻修改ul的位置
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}
		//根据当前图片的下标修改对应的索引的背景颜色(白色)
		//清空所有实心
		for (var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		};
		//当前位置的li变成实心
		indexLiArr[index-1].className="current";
	});
	//1.按下时的横坐标
	var startX = 0;
	var distanceX = 0;//水平方向移动的距离
	//手指滑动效果
	moveUl.addEventListener("touchstart", function(event){
		//1.关闭自动轮播效果 和过渡效果
		clearInterval(timeID);
		moveUl.style.transition = "";
		//2.获取按下时的横坐标
		startX = event.touches[0].clientX;
	});
	//滑动
	moveUl.addEventListener("touchmove", function(event){
		//计算移动的值
		distanceX = event.touches[0].clientX - startX;
		var tranX = distanceX+index*width*-1;
		//实时更新图片位置
		moveUl.style.transform = 'translateX('+tranX+'px)';
	});
	//滑动结束
	moveUl.addEventListener("touchend", function(){
		console.log("touchend");
		//想切图，要移动的最小距离是整个屏幕的1/3
		var minDistance = width/3;
		//判断移动的距离 |distanceX| 是否大于1/3的宽度
		if(Math.abs(distanceX)>=minDistance){
			//根据distanceX的正负判断是index++ 还是index--
			if(distanceX<0){
				//切图 index++
				index++;
			}else{
				index--;
			}
			//添加过渡
			moveUl.style.transition = "all .3s";
			//更新图片位置
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}else{
			//回退到当前图
			//添加过渡
			moveUl.style.transition = "all .3s";
			//更新图片位置
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}
		timeID = setInterval(function(){
			index++;
			moveUl.style.transition = "all .3s";
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		},1000);
	});
}