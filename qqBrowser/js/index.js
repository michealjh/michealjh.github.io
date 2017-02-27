//第一版块中间5张图的JS效果
/*
	
*/
window.onload = function(){
	var aDiv = document.querySelectorAll('body>div');//4个页面的容器
	var head = document.getElementById('p1-head');//第一个页面的头部
	var headBtn = document.getElementById('p1-a');//第一个页面的下载按钮
	var footer = document.getElementsByTagName('footer')[0];//脚注
	var midDivs = document.querySelectorAll('#p1-mid div');//第一个页面的中间图片
	var p1Btn = document.getElementById('p1-click');//第一个页面的点击 按钮
	var p2Fly = document.querySelector('#p2-fly div');//第二个页面旋转飞进来的马表
	var p2Divs = document.querySelectorAll('#p2 #p2-mid div');//第二个页面中间的图片 3层结构
	var p2Head = document.getElementById('p2-head');//第二个页面头部
	var p3Box = document.getElementById('p3-box');//第三个页面中间内容
	var p3Pic = document.getElementById('p3text');//第三个页面中的文字图片
	var p3Txt = document.getElementById('p3txt');//第三个页面中的文字
	var p4Mid = document.getElementById('p4mid');//第四个页面中的装4个图标的容器
	var p4Divs = p4Mid.getElementsByTagName('div');//第四个页面中的4个图标
	console.log(p4Divs);
	var p4Pic1 = document.getElementById('p4pic1');//第四个页面中的第一个图片
	var p4Pic2 = document.getElementById('p4pic2');//第四个页面中的第二个图片
	var p4Pic3 = document.getElementById('p4pic3');//第四个页面中的第三个图片
	var p4Pic4 = document.getElementById('p4pic4');//第四个页面中的第四个图片
	var p4Txt = document.getElementById('p4txt');//第四个页面中的文字图片
	var p4Con = document.getElementById('p4con');//第四个页面中的文字
	var aLi = document.querySelectorAll('#list li');//页面右边的索引
	var oBall = document.getElementById('bg');//背景动画的容器
	var num = 0;//关联索引和页面的数字
	var onOff = true;
//获取窗口大小
	var winWidth,
	winHeight;
	if( window.innerWidth ){
		winWidth = window.innerWidth;
	} else if( (document.body) && (document.body.clientWidth) ){
		winWidth = document.body.clientWidth;
	}
	if( window.innerHeight ){
		winHeight = window.innerHeight;
	} else if( (document.body) && (document.body.clientHeight) ){
		winHeight = document.body.clientHeight;
	}
//	setTimeout(
//		function(){
// 第一个页面的
			/*head.style.opacity = 1;
			headBtn.style.opacity = 1;
			midDivs[0].style.opacity = 1;
			midDivs[0].style.transform = 'translate3d(0,0,0) scale(1)';
			midDivs[1].style.opacity = 1;
			midDivs[1].style.transform = 'translate3d(0,0,0) scale(1)';
			footer.style.opacity = 1;*/
//第二个页面的
			/*p2Head.style.opacity = 1;
			p2Fly.style.opacity = 1;
			p2Fly.style.transform = 'translate3d(450px,20px,200px) rotateY(0)';
			for( var i=0; i<p2Divs.length; i++ ){
				p2Divs[i].style.transform = 'translate3d(0,0,0) scale(1)';
				p2Divs[i].style.opacity = 1;
			}
			setTimeout(
				function(){
					p2Fly.style.display = 'none';		
				},2500
			);*/
//第三个页面的
			/*p3Box.style.transform = 'translateZ(-50px) rotateX(30deg)';
			p3Pic.className = '';
			p3Txt.style.opacity = '0.7';*/
//第四个页面的
			/*for( var i=0; i<p4Divs.length; i++ ){
				p4Divs[i].className = '';
			}
			p4Txt.className = '';
			p4Con.className = '';*/
//		},1500
//	);
	pageDis();
	setTimeout(
		function(){
			page1(1,1,1,'translate3d(0,0,0) scale(1)');
			bgBall('scale(0.6)','1');
		}, 1500
	);
	mScroll(
		document,
//滚轮向上
		function(){
			if(!onOff)return;
			onOff = false;
			num--;
			if(num<0){
				num=0;
			}
			liAct();
			pageDis();
			switch(num){
				case 0:
					page2(0,0,'','',0,'');
					setTimeout(
						function (){
 							page1(1,1,1,'translate3d(0,0,0) scale(1)');
 							footFn();
 							onOff = true;
						}, 1500
					);
					bgBall('scale(0.6)','1');
					
				break;
				case 1:
					page1(0,0,0,'');
					setTimeout(
						function (){
 							page2(1,1,'translate3d(450px,20px,200px) rotateY(0)','translate3d(0,0,0) scale(1)',1,'none')
 							footFn();
 							onOff = true;
						}, 1500
					);
					page3('p3boxs','p3pic','0');
					bgBall('translateX(-200px) translateY(300px) rotateZ(-60deg)','1');
					
				break;
				case 2:
					page2(0,0,'','',0,'');
					page3('p3boxd','','0.7');
					page4out1('p4pic','p4txt','p4con');
					footFn();
					setTimeout(function(){
						onOff = true;
					},1500);
					
				break;
				case 3:
					page3('p3boxu','p3picgo','0');
					page4('','','');
					footFn();
					setTimeout(function(){
						onOff = true;
					},1500);
					
				break;
				default:
				return;
			};
		},
//滚轮向下
		function(){
			if(!onOff)return;
			onOff = false;
			num++;
			num%=4;
			liAct();
			pageDis();
			switch(num){
				case 0:
					page4out1('p4picout','p4txtout','p4con');
					page2(0,0,'','',0,'');
					setTimeout(
						function (){
 							page1(1,1,1,'translate3d(0,0,0) scale(1)');
 							footFn();
 							onOff = true;
						}, 1500
					);
					bgBall('scale(0.6)','1');
					
				break;
				case 1:
					page1(0,0,0,'');
					setTimeout(
						function (){
 							page2(1,1,'translate3d(450px,20px,200px) rotateY(0)','translate3d(0,0,0) scale(1)',1,'none');
 							footFn();
 							onOff = true;
						}, 1500
					);
					page3('p3boxs','p3pic','0');
					bgBall('translateX(-200px) translateY(300px) rotateZ(-60deg)','1');
					
				break;
				case 2: 
					page2(0,0,'','',0,'');
					footFn();
					page3('p3boxd','','0.7');
					page4out1('p4pic','p4txt','p4con');
					setTimeout(function(){
						onOff = true;
					},1500);
				break;
				case 3: 
					page3('p3boxu','p3picgo','0');
					footFn();
					page4('','','');
					setTimeout(function(){
						onOff = true;
					},1500);
					//page4out1('p4picout','p4txtout','p4con');
				break;
				default:
				return;
			};
		}
	);

	for( var i=0; i<aLi.length; i++ ){
		aLi[i].index = i;
		aLi[i].addEventListener('click',function(){
			num = this.index;
			liAct();
			pageDis();
			footFn();
		});
	}
	aLi[0].addEventListener('click',function(){
		if(!onOff)return;
		onOff = false;
		page4out1('p4picout','p4txtout','p4con');
		page2(0,0,'','',0,'');
		page3('p3boxs','p3pic','0');
		setTimeout(
			function (){
					page1(1,1,1,'translate3d(0,0,0) scale(1)');
			}, 1500
		);
		bgBall('scale(0.6)','1');
		onOff = true;
	});
	aLi[1].addEventListener('click',function(){
		if(!onOff)return;
		onOff = false;
		page1(0,0,0,'');
		page3('p3boxs','p3pic','0');
		page4out1('p4picout','p4txtout','p4con');
		setTimeout(
			function (){
					page2(1,1,'translate3d(450px,20px,200px) rotateY(0)','translate3d(0,0,0) scale(1)',1,'none');
			}, 1500
		);
		page3('p3boxs','p3pic','0');
		bgBall('translateX(-200px) translateY(300px) rotateZ(-60deg)','1');
		onOff = true;
	});
	aLi[2].addEventListener('click',function(){
		if(!onOff)return;
		onOff = false;
		page2(0,0,'','',0,'');
		page1(0,0,0,'');
		page3('p3boxd','','0.7');
		page4out1('p4pic','p4txt','p4con');
		onOff = true;
	});
	aLi[3].addEventListener('click',function(){
		if(!onOff)return;
		onOff = false;
		page2(0,0,'','',0,'');
		page1(0,0,0,'');
		page3('p3boxu','p3picgo','0');
		page4('','','');
		onOff = true;
	});
	p1Btn.addEventListener('click',function(){
		if(!onOff)return;
		onOff = false;
		num = 1;
		liAct();
		pageDis();
		footFn();
		page1(0,0,0,'');
		page3('p3boxs','p3pic','0');
		page4out1('p4picout','p4txtout','p4con');
		setTimeout(
			function (){
					page2(1,1,'translate3d(450px,20px,200px) rotateY(0)','translate3d(0,0,0) scale(1)',1,'none');
			}, 1500
		);
		page3('p3boxs','p3pic','0');
		bgBall('translateX(-200px) translateY(300px) rotateZ(-60deg)','1');
		onOff = true;
	});
//滚轮函数
function mScroll(obj,upper,down){
	obj.addEventListener('DOMMouseScroll',fn,false);
	obj.onmousewheel = fn;
	function fn(ev){
		var n;
/*
	负数代表向下 正数代表向上 n就是这个数字
*/
		if( ev.detail ){
			//firefox
			n = -ev.detail;
		} else {
			//ie和chrome
			n = ev.wheelDelta;
		}
		if( n<0 ){
			down();
		} else {
			upper();
		}
	}
}
//右边索引高亮
function liAct(){
	for( var i=0; i<aLi.length; i++ ){
		aLi[i].className = '';
	}
	aLi[num].className = 'active';
}
//让对应的页面框架也先出来
function pageDis(){
	console.log(num+'执行了')
	for( var i=0; i<aDiv.length; i++ ){
		aDiv[i].style.visibility = 'hidden';
	}
	aDiv[num].style.visibility = 'visible';
}
function page1(p1hOpc,p1btnOpc,p1midOpc,p1midTrf){
	head.style.opacity = p1hOpc;
	headBtn.style.opacity = p1btnOpc;
	for( var i=0; i<midDivs.length; i++ ){
		midDivs[i].style.opacity = p1midOpc;
		midDivs[i].style.transform = p1midTrf;
	}
	
}
function page2(p2hOpc,p2flyOpc,p2flyTrf,p2divTrf,p2divOpc,p2flyDis){
	p2Head.style.opacity = p2hOpc;
	p2Fly.style.opacity = p2flyOpc;
	p2Fly.style.transform = p2flyTrf;
	for( var i=0; i<p2Divs.length; i++ ){
		p2Divs[i].style.transform = p2divTrf;
		p2Divs[i].style.opacity = p2divOpc;
	}
	setTimeout(
		function(){
			p2Fly.style.display = p2flyDis;		
		},2500
	);
}
function page3(p3bTran,p3pCls,p3tOpc){
	p3Box.className = p3bTran;
	p3Pic.className = p3pCls;
	p3Txt.style.opacity = p3tOpc;
}
function page4(p4dCls,p4tCls,p4cCls){
	for( var i=0; i<p4Divs.length; i++ ){
		p4Divs[i].className = p4dCls;
	}
	p4Txt.className = p4tCls;
	p4Con.className = p4cCls;
}
function page4out1(p4dCls,p4tCls,p4cCls){
	for( var i=0; i<p4Divs.length; i++ ){
		p4Divs[i].className = p4dCls+i;
	}
	p4Txt.className = p4tCls;
	p4Con.className =p4cCls;
}
function footFn(){
	footer.style.opacity = 1;
}
function bgBall(bgTrn,bgOpc){
	oBall.style.transform = bgTrn;
	oBall.style.opacity = bgOpc;
}
//window.onload结束
};

