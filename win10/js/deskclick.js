var $box = $('#oBox');
var aDic = $('#deskicon>li');
var aDp = $('#deskicon p');
var aDipt = $('#deskicon input');
var $bigclos = $('#bhtop i');
var $bBox = $('#bigbox');
//声明2个开关 判断此电脑和文件夹是被关闭还是缩小
$('#bigbox')[0].onOff = true;
$('#floderbox')[0].onOff = true;
oDicon.mousedown(function(ev){
//判断点击的是功能按钮就return	
	/*if( $(ev.target).is('#rename') || $(ev.target).is('#dename') ||
	 $(ev.target).is('#cafloder') ||$(ev.target).is($bigclos) ||
	 $(ev.target).is($('#bhtop'))) {
		return;
	}*/
	var oDate = new Date();
	var oTime = oDate.getTime();
	deskInitdis();
	deskInit();
	
	$('#calendar').hide();
	oMenu[0].style.display = '';
	oIcMu[0].style.display = '';
	$('#diskmenu').hide();
	$('#foldermenu').hide();
	var x = ev.clientX;
	var y = ev.clientY;
	if( ev.which==3 ){//桌面右键事件
		var oMenuH = getPos(oMenu[0]).height + getCss(oMenu[0],'borderWidth')*2;
		var oMenuW = getPos(oMenu[0]).width + getCss(oMenu[0],'borderWidth')*2;
		var disx = winWidth - oMenuW;//菜单栏最大的定位left值
		var disy = winHeight - oMenuH;//菜单栏最大的定位top值
		//判断 让菜单栏只能在页面中显示
		if( x>disx && y>disy ){
			oMenu[0].style.left = disx + 'px';
			oMenu[0].style.top = y-oMenuH + 'px';
		} else if( x>disx ){
			oMenu[0].style.left = disx + 'px';
			oMenu[0].style.top = y + 'px';
		} else if( y>disy ){
			oMenu[0].style.left = x + 'px';
			oMenu[0].style.top = y-oMenuH + 'px';
		} else {
			oMenu[0].style.left = x + 'px';
			oMenu[0].style.top = y + 'px';
		}
//显示菜单栏并给li添加hover效果
		oMenu.css({display: 'block'}).children('li').hover(function(){//1级菜单的移入事件
			if( $(this).find('ul') ){
				var $ul = $(this).find('ul');
				var h = $(this).offset().left + oMenuH;
				var w = $(this).offset().top + oMenuW;
				var ulw = parseFloat($ul.css('width'));
				var ulh = parseFloat($ul.css('height'));
				if( winWidth-w<ulw && winHeight-h<ulh ){
						$ul.css({
							left: -ulw+14,
							top: -ulh+38
						})
					} else if( winWidth-w<ulw ){
						$ul.css({
							left: -ulw+14,
							top: 0
						})
					} else if( winHeight-h<ulh ){
						$ul.css({
							left: ulw-14,
							top: -ulh+38
						})
					} else {
						$ul.css({
							left: ulw-14,
							top: 0
						})
				}
			}
			$(this).css('background-color','rgba(160,160,160,.4)').find('ul').show().find('li').hover(function(ev){//2级菜单的移入事件
				$(this).css('background-color','rgba(160,160,160,.4)');
			},function(){//2级菜单的移出事件
				$(this).css('background-color','');
			});
		},function(){//1级菜单的移出事件
			$(this).css('background-color','').find('ul').hide();
		});
	} else {
		$box.css({
			display: 'block',
			left: x,
			top: y
		});
		$(document).mousemove(function(ev){
			var w = ev.clientX - x;
			var h = ev.clientY - y;
			if( w<0 ){
				$box.css({left:ev.clientX});
			}
			if( h<0 ){
				$box.css({top:ev.clientY});
			}
			$box.css({
				width: Math.abs(w),
				height: Math.abs(h)
			});
			decideAct(Dics);
		}).mouseup(function(){
			ev.stopPropagation();
			$(this).off('mouseup mousemove');
			var nDate = new Date();
			var nTime = nDate.getTime();
			if( nTime-oTime>50 ){
				decideOnoff(Dics);
				$box.css({
					display: '',
					width: '',
					height: ''
				})
			} else {
				return false;
			}
		});
	}
	return false;
});
$(document).contextmenu(function(ev){
	return false
});
//点击新建文件夹事件
$('#cafloder').click(function(ev){
	var len = filesData.length;
	goback = 0;//这个暂时这么使用 桌面上的新建都在桌面上
	ev.stopPropagation();
	var file = {
		id: ++len,
		PId: goback,
		type: 'folder',
		text: '新建文件夹',
		pic: 'folder'
	};
	filesData.push(file);
	renderList(getChildren(goback),oDicon[0]);
	oMenu[0].style.display = '';
});
//此电脑弹出框的缩小事件
$('#bhtop p span').on('click',function(){
	$bBox.fadeToggle();
	$('#bigbox')[0].onOff = false;
	$('#onetask li:nth-of-type(2)').css('background','rgba(160,160,160,.4)');
});
//此电脑弹出框的关闭事件
$bigclos.click(function(){
	goback = 0;
	$('#diskmenu').hide();
	$bBox.fadeToggle();
	$bBox[0].onOff = true;
	floderAct();
});
//此电脑里面的点击 事件
$('#bcrgt').click(function(ev){
	$('#diskmenu').hide();
	$('#menu').hide();
	$('#foldermenu').hide();
	if( $(ev.target).is($('#bcrgt li')) )return;
	iconInit(Dicks);
});
//此电脑弹出框的拖拽事件
$('#bhtop').mousedown(function(ev){
	$('#diskmenu').hide();
	var w = parseFloat($bBox.css('width'));//框子的宽度
	var h = parseFloat($('#bhtop').css('height'));//框子头部的高度
	var bx = $bBox.offset().left;//框子当前弹出框的定位left
	var by = $bBox.offset().top;//框子当前弹出框的定位top
	var disx = ev.clientX - bx;
	var disy = ev.clientY - by;
	$(document).mousemove(function(ev){
		var x = ev.clientX - disx;
		var y = ev.clientY - disy;
		var maxx = winWidth - w;
		var maxy = winHeight - h;
		if( x<0 ){
			x = 0;
		}
		if( y<0 ){
			y = 0;
		}
		if( x>maxx ){
			x = maxx;
		}
		if( y>maxy ){
			y = maxy;
		}
		$bBox.css({
			left: x,
			top: y
		});
	}).mouseup(function(ev){
		ev.stopPropagation();
		$(this).off('mouseup mousemove');
	});
	return false;
});	
//磁盘里的右键事件
$('#bcdcont').contextmenu(function(ev){
	$('#diskmenu').show();
	var x = ev.clientX;
	var y = ev.clientY;
	$('#diskmenu').css({
		left: x,
		top: y,
		'z-index': '10'
	});
	return false;
});
//磁盘里的新建的事件
$('#diskmenu li:nth-of-type(1)').click(function(){
	$('#diskmenu').hide();
	var len = filesData.length;
	var nData = {
		id: ++len,
		PId: goback,
		type: 'folder1',
		text: '文件夹',
		pic: 'folder'
	};
	if( goback==1 )return;
	filesData.push(nData);
	renderFolder(getChildren(goback),$('#bcdc2')[0]);
});

//磁盘里的删除事件
$('#diskmenu li:nth-of-type(2)').click(function(){
	delli($('#bcdc2')[0]);
	$('#diskmenu').fadeToggle();
	renderFolder(getChildren(goback),$('#bcdc2')[0]);
});
//磁盘里的向上点击事件
$('#hbicon span:nth-of-type(1)').click(function(){
	$('#diskmenu').find('p').show();
	$('#diskmenu').find('input').hide();
	$('#diskmenu').hide();
	if( goback == 1 )return;
	upback.push(goback);
	var nthof = getInfo(goback);
	var index = nthof.PId;
	goback = index;
	
console.log(goback,upback)
	if( goback == 1 ){
		renderDisk(getChildren(goback),$('#bcdc1')[0]);
		$('#bcdc1').show();
		$('#bcdc2').hide();
	} else {
		renderFolder(getChildren(goback),$('#bcdc2')[0]);
	}
	
});
//磁盘里的前进点击事件
$('#hbicon span:nth-of-type(2)').click(function(){
	$('#diskmenu').find('p').show();
	$('#diskmenu').find('input').hide();
	$('#diskmenu').hide();
	if( upback.length === 0 )return;
	goback = upback.pop();
	console.log(goback,upback)
	if( goback == 1 ){
		renderDisk(getChildren(goback),$('#bcdc1')[0]);
		$('#bcdc1').show();
		$('#bcdc2').hide();
	} else {
		$('#bcdc1').hide();
		$('#bcdc2').show();
		renderFolder(getChildren(goback),$('#bcdc2')[0]);
	}
	
});
//磁盘里的框选事件
$('#bcdc2').mousedown(function(ev){
	$('#diskmenu').find('p').show();
	$('#diskmenu').find('input').hide();
	$('#diskmenu').hide();
	if( $(ev.target).is($('#bcrgt li')) || ev.which == 3 )return;
	iconInit(Dicks);
	var oTime = new Date().getTime();
	var x = ev.clientX;
	var y = ev.clientY;
	$box.css({
		display: 'block',
		left: x,
		top: y,
		'z-index': '10'
	});

	$(document).mousemove(function(ev){
		var w = ev.clientX - x;
		var h = ev.clientY - y;
		if( w<0 ){
			$box.css({left:ev.clientX});
		}
		if( h<0 ){
			$box.css({top:ev.clientY});
		}
		$box.css({
			width: Math.abs(w),
			height: Math.abs(h)
		});
		decideAct(Dicks);
	}).mouseup(function(){
		ev.stopPropagation();
		$(this).off('mouseup mousemove');
		var nDate = new Date();
		var nTime = nDate.getTime();
		if( nTime-oTime>50 ){
			if( Dicks.length>0 ){
				decideOnoff(Dicks);
			}
			$box.css({
				display: '',
				width: '',
				height: ''
			});
		}
	}); 
	return false;
});
//文件夹的缩小事件
$('#fhtop p span').on('click',function(){
	$('#floderbox').fadeToggle();
	$('#floderbox')[0].onOff = false;
	$('#onetask li:nth-of-type(2)').css('background','rgba(160,160,160,.4)');
});
//文件夹的关闭事件
$('#fhtop i').click(function(){
	$('#fbcfcont').find('p').show();
	$('#fbcfcont').find('input').hide();
	$('#floderbox')[0].onOff = true;
	floderAct();
	$('#floderbox').fadeToggle();
	goback = 0;
});
//任务栏下面的文件夹的点击事件
$('#onetask li:nth-of-type(2)').on('click',function(){
	if( !$bBox[0].onOff ){
		$bBox.fadeToggle();
		floderAct();
	} 
	if( !$('#floderbox')[0].onOff ){
		$('#floderbox').fadeToggle();
		floderAct();
	}
});
//文件夹的拖拽事件
$('#fhtop').mousedown(function(ev){
	$('#fbcfcont').find('p').show();
	$('#fbcfcont').find('input').hide();
	var w = parseFloat($('#floderbox').css('width'));//框子的宽度
	var h = parseFloat($(this).css('height'));//框子头部的高度
	var bx = $('#floderbox').offset().left;//框子当前弹出框的定位left
	var by = $('#floderbox').offset().top;//框子当前弹出框的定位top
	var disx = ev.clientX - bx;
	var disy = ev.clientY - by;
	$(document).mousemove(function(ev){
		var x = ev.clientX - disx;
		var y = ev.clientY - disy;
		var maxx = winWidth - w;
		var maxy = winHeight - h;
		if( x<0 ){
			x = 0;
		}
		if( y<0 ){
			y = 0;
		}
		if( x>maxx ){
			x = maxx;
		}
		if( y>maxy ){
			y = maxy;
		}
		$('#floderbox').css({
			left: x,
			top: y
		});
	}).mouseup(function(ev){
		ev.stopPropagation();
		$(this).off('mouseup mousemove');
	});
	return false;
});	

//文件夹内的右键菜单栏
$('#fbcfcont').contextmenu(function(ev){
	$('#fbcfcont').find('p').show();
	$('#fbcfcont').find('input').hide();
	var x = ev.clientX;
	var y = ev.clientY;
	$('#foldermenu').css({
		display: 'block',
		left: x,
		top: y
	});
	return false;
});
//文件夹里 新建的事件
$('#foldermenu li:nth-of-type(1)').click(function(){
	$('#foldermenu').hide();
	var len = filesData.length;
	var nData = {
		id: ++len,
		PId: goback,
		type: 'folder',
		text: '文件夹',
		pic: 'folder'
	};
	if( goback==2 )return;
	filesData.push(nData);
	renderFolder(getChildren(goback),$('#fbcfcont ul')[0]);
});
//文件夹里 删除事件
$('#foldermenu li:nth-of-type(2)').click(function(){
	delli($('#fbcfcont')[0]);
	$('#foldermenu').hide();
	renderFolder(getChildren(goback),$('#fbcfcont ul')[0]);
});
//文件夹里向上的按钮
$('#fbicon span:nth-of-type(1)').click(function(){
	$('#fbcfcont').find('p').show();
	$('#fbcfcont').find('input').hide();
	$('#foldermenu').hide();
	
	if( goback==5 )return;
	upback.push(goback);
	var nthof = getInfo(goback);
	var index = nthof.PId;
	goback = index;
	renderFolder(getChildren(goback),$('#fbcfcont ul')[0]);
});
//文件夹里的前进按钮
$('#fbicon span:nth-of-type(2)').click(function(){
	$('#fbcfcont').find('p').show();
	$('#fbcfcont').find('input').hide();
	$('#foldermenu').hide();
	if( upback.length === 0 )return;
	goback = upback.pop();
	renderFolder(getChildren(goback),$('#fbcfcont ul')[0]);
});
//文件夹里的框选 
$('#fbcfcont').mousedown(function(ev){
	$('#fbcfcont').find('p').show();
	$('#fbcfcont').find('input').hide();
	if( $(ev.target).is($('#fbcfcont li')) || ev.which==3 ) return;
	foldInit();
	$('#foldermenu').hide();
	var oTime = new Date().getTime();
	var x = ev.clientX;
	var y = ev.clientY;
	$box.css({
		display: 'block',
		left: x,
		top: y,
		'z-index': '10'
	});

	$(document).mousemove(function(ev){
		var w = ev.clientX - x;
		var h = ev.clientY - y;
		if( w<0 ){
			$box.css({left:ev.clientX});
		}
		if( h<0 ){
			$box.css({top:ev.clientY});
		}
		$box.css({
			width: Math.abs(w),
			height: Math.abs(h)
		});
		decideAct(Fics);
	}).mouseup(function(){
		ev.stopPropagation();
		$(this).off('mouseup mousemove');
		var nDate = new Date();
		var nTime = nDate.getTime();
		if( nTime-oTime>50 ){
			if( Fics.length>0 ){
				decideOnoff(Fics);
			}
			$box.css({
				display: '',
				width: '',
				height: ''
			});
		}
	});
	return false;
});
//点击关闭浏览器
$('#brow i').on('click',function(){
	$('#brow').hide();
});

//点击时间 出来日历出来 暂时只做了点击 桌面关闭日历 后续可以完善
$('#bartime').click(function(){
	$('#calendar').show();
});

//桌面刷新按钮
$('#menu>li:nth-of-type(1)').click(function(){
	oMenu.hide();
	renderList(getChildren(goback),oDicon[0]);
});

//个性化，可以换桌面背景
$('#upload-bg').click(function(){
	$(this).change(function(){
		var f = this.files[0];
		//格式化文件
		var fr = new FileReader();
		//图片
		if( f.type.indexOf('image')!=-1 ){
			//监控格式化是否完成 
			fr.onload = function(){
				//保存src
				var address = fr.result;
				$('#desktop').css('background-image','url('+ address +')');
			};
			//添加格式化的文件
			fr.readAsDataURL(f);
			return;
		} else {
			alert('请选图片上传 --#！');
		}
	});
	oMenu[0].style.display = '';
});

//点击电脑图标出来文档
$('#wifi').click(function(){
	$('#introduction').fadeToggle();
});
$('#introduction i').click(function(){
	$('#introduction').fadeToggle();
});