 //动态获取页面宽高
 function changeWH(){
	var winHeight = document.documentElement.clientHeight;
	var winWidth = document.documentElement.clientWidth;
	oMain.css({
		width: winWidth,
		height: winHeight
	});
}
//数组去重
function unique(array){
	var n = [];//临时数组
	for( var i=0;i<array.length;i++ ){
		if( n.indexOf(array[i]) == -1) n.push(array[i]);
	}
	return n;
}
//冒泡排序
function bubbleSort(arr,callback){
	arr = [].concat(arr);
	//如果没有传回调函数，那么就默认从小到大排序。
	callback = callback||function(a,b){
		return a - b;
	}
	var a,b,status;
	for(var j=0;j<arr.length-1;j++){
		status = true;
		//console.log(arr);
		//每次循环之后最大的会到最后以为，所以减去外层循环的次数，也就是length-j
		for(var i=0;i<arr.length-1-j;i++){
			a = arr[i];
			b = arr[i+1];
			//对比如果a比b大就交换位置。
			//根据callback的返回值进行判断是否交换位置。
			if(callback(a,b)>0){
				status = false;
				arr[i] = b;
				arr[i+1] = a;
			}
		}
		if(status){
			return arr;
		}
	}
	return arr;
}
//快速排序
function quickSort(arr){
	if(arr.length<=1)return arr;
	var pivot = arr.splice(0,1)[0];
	var left = [];
	var right = [];
	for(var i=0;i<arr.length;i++){
		n++;
		if(arr[i]<pivot){
			left.push(arr[i]);
		}else{
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat([pivot],quickSort(right));
}
//插入排序
function insertSort(arr){
	var len = arr.length;
	var k,j;
	for(var i=1;i<len;i++){
		k = arr[i];
		j = i-1;
		while(j>=0&&arr[j]>k){
			arr[j+1] = arr[j];
			j--;
		}
		arr[j+1] = k;
	}
}

//获取元素属性
function getCss(node,attr){
    return parseFloat(getComputedStyle(node)[attr]);
}

//获取元素的可视大小和到页面的距离 
function getPos(node){
    return node.getBoundingClientRect();
}

//检测碰撞的函数 检测obj1是否碰撞obj2如果是就返回true，否则false
function CollisionTest(obj1,obj2){
	var pos1 = getPos(obj1);
	var pos2 = getPos(obj2);
	return !(pos1.bottom<pos2.top||pos1.left>pos2.right||pos1.top>pos2.bottom||pos1.right<pos2.left);
}

function inId(id){
	for( var i=0; i<aLi.length; i++ ){
		if( aLi[i].d == id ){
			return aLi[i].getElementsByTagName('p')[0];
		}
	}
}
//删除的函数 这里删除数据，所以哪里调用时哪里再渲染一次数据
function delli(obj){
	var aLi = obj.getElementsByTagName('li');
	for( var i=0; i<aLi.length; i++ ){
		if( !aLi[i].onOff ){
			switch(aLi[i].pic){
				case 'com':
				alert('这是计算机，不能删除！');
				break;
				case 'recycle':
				alert('这是回收站，不能删除！');
				break;
				case 'QQmusic':
				alert('这里有配合canvas做的音乐，不能删除！');
				break;
				default:
				var del = getInfo(aLi[i].d);
				for( var j=0; j<filesData.length; j++ ){
					if( filesData[j]==del ){
						filesData[j] = '';
					}
				}
			}
		}
	}
}
function getInfo(id){
//根据id找到对应的对象
	for( var i=0; i<filesData.length; i++ ){
		if( filesData[i].id == id ){
			return filesData[i];
		}
	}
}

//根据当前pid生成对应的文件夹内容(数据)
function getChildren(pid){
	var data = [];
	for( var i=0; i<filesData.length; i++ ){
		if( filesData[i].PId == pid ){
			data.push(filesData[i]);
		}
	}
	return data;
}
//根据当前的pid一直向上找到pic=0为止，判断当前的文件不能扔到自己的子文件里

function getPidarr(pid){
	var num1;
	for( var i=0; i<filesData.length; i++ ){
		if( filesData[i].id == pid ){
			 num1 = filesData[i].PId;
			searchData.push(num1);
		}
		
	}
	//console.log(num1)
	if( num1 !=0 ){
		getPidarr(num1);
	}
	return unique(searchData);
}
//文件夹的点击事件！
function click(ev){
	switch(this.type){
		case "system":
			if( this.pic == 'com'){
				deskInit();
				$('#bigbox').fadeToggle();
				goback = this.d;
				renderDisk(getChildren(goback),$('#bcdc1')[0]);
			}
		break;
		case "folder":
			deskInit();
			goback = this.d;
			$('#floderbox').show();
			renderFolder(getChildren(goback),$('#fbcfcont ul')[0]);
		break;
		case "exe":
			if( this.pic === 'QQmusic' ){
				deskInit();
				goback = this.d;
				$('#floderbox').fadeToggle();
				renderMusic(getChildren(goback),$('#fbcfcont ul')[0]);
			}
			if( this.pic === 'browser'){
				deskInit();
				$('#brow').show();
			}
		break;
		case "disk":
			iconInit(Dicks);
			goback = this.d;
			$('#bcdc1').hide();
			$('#bcdc2').show();
			renderFolder(getChildren(goback),$('#bcdc2')[0]);
		break;
		case "folder1":
			iconInit(Dicks);
			goback = this.d;
			renderFolder(getChildren(goback),$('#bcdc2')[0]);
		break;
		default:
		break;
	}
}

//桌面图标高亮
function deskAct(obj,cls,blo){
	obj.className = cls;
	obj.onOff = blo;
}
//恢复桌面图标 默认状态
function deskInit(){
	for( var i=0; i<Dics.length; i++ ){
		Dics[i].className = '';
		Dics[i].onOff = true;
	}
}
//文件夹图标 默认状态
function foldInit(){
	for( var i=0; i<Fics.length; i++ ){
		Fics[i].className = '';
		Fics[i].onOff = true;
	}
}
function iconInit(obj){
	for( var i=0; i<obj.length; i++ ){
		obj[i].className = '';
		obj[i].onOff = true;
	}
}
//重命名 恢复桌面图标默认状态
function deskInitdis(){
	var aDp = oDicon[0].getElementsByTagName('p');
	var aDipt = oDicon[0].getElementsByTagName('input');
	for( var i=0; i<aDp.length; i++ ){
		aDp[i].style.display = 'block';
		aDipt[i].style.display = 'none';
	}
}

//检测桌面图标被框选就改变状态
function decideAct(obj){
	for( var i=0; i<obj.length; i++ ){
		if( CollisionTest(oBox,obj[i]) ){
			obj[i].className = 'active';
			obj[i].onOff = false;
		} else {
			obj[i].className = '';
			//console.log(32)
			obj[i].onOff = true;
		}
	}
}
//判断桌面图标当前的onOff 
function decideOnoff(obj){
	for( var i=0; i<obj[i].length; i++ ){
		if( !obj[i].onOff ){
			obj[i].className = 'active';
		} else {
			obj[i].className = '';
		}
	}
}

//拖拽 obj得是个jquery对象
function drag(ev,obj){
	var w = parseFloat(obj.css('width'));//框子的宽度
	var h = parseFloat($(this).css('height'));//框子头部的高度
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
}
//补0函数
function toTwo(n){
	return n<10?'0'+n:''+n;
}	
//判断任务栏是否高亮的函数
function floderAct(){
	if( !$bBox[0].onOff || !$('#floderbox')[0].onOff ){
		$('#onetask li:nth-of-type(2)').css('background','rgba(160,160,160,.4)');	
	} else {
		$('#onetask li:nth-of-type(2)').css('background','');
	}
}
//canvas 配合音频的函数
function playCanvas(audio,context){
	var cans = $('#cans')[0];
	var cgx = cans.getContext('2d');
	audio.addEventListener('canplay',function(){
		//创建音频节点。	
		var source = context.createMediaElementSource(audio);
		//创建获取频谱能量值的analyser节点。
		var analyser = context.createAnalyser();	
		//链接频谱
		source.connect(analyser);
		//链接系统扬声器节点。
		source.connect(context.destination)
		//系统扬声器的节点。
		// console.log(context.destination);
		audio.play();
		//频谱长度 analyser.frequencyBinCount
		//解析频谱为二进制数组。new Uint8Array()
		var array = new Uint8Array(analyser.frequencyBinCount);
		var len = 100;/*出现的条数*/
		var n = Math.floor(array.length/len);
		//cgx.fillStyle = '#bee218';/*填充颜色*/
		var cgx = cans.getContext("2d");
		var gradient1 = cgx.createLinearGradient(0, 0, 0, 250);
		gradient1.addColorStop(0, 'red');
		gradient1.addColorStop(0.5, 'blue');
		gradient1.addColorStop(1, 'green');
		var gradient2 = cgx.createLinearGradient(0, 250, 0, 500);
		gradient2.addColorStop(0, 'rgba(120,255,120,1)');
		gradient2.addColorStop(0.5, 'rgba(120,120,255,0.6)');
		gradient2.addColorStop(1, 'rgba(255,120,120,0.3)');
		(function(){
            var arg = arguments;
            requestAnimationFrame(function(){
                analyser.getByteFrequencyData(array);

                cgx.clearRect(0, 0, 1000, 500);
                for(var i=0;i<array.length;i++){
                    cgx.fillStyle = gradient1;
                    cgx.fillRect(i*2, 250-array[i], 1, array[i]);

                    cgx.fillStyle = gradient2;
                    cgx.fillRect(i*3, 250, 1, array[i]);

                }

                arg.callee();
            });
        })();
	});
}
