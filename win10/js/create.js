
//创建桌面图标的方法 data是获取的虚拟数据内容 desk是桌面图标容器 menu是菜单栏 dlis桌面图标
function renderList(data,desk){
	desk.innerHTML = '';
	var numL = 0;
	var numT = 0;
	for( var i=0; i<data.length; i++ ){
// 在这里创建文件元素，绑定pid 和 id
		var file = document.createElement('li');
		file.pid = data[i].PId;
		file.d = data[i].id;
		file.type = data[i].type;
		file.pic = data[i].pic;
		file.jh = data[i].text;
		file.onOff = true;
		file.ondblclick = click;
		file.style.left = 128*numL + 35 + 'px';
		file.style.top = 130*numT + 30 + 'px';
		$(file).mousedown(function(ev){
			ev.stopPropagation();
			deskInitdis();
			oMenu.hide();
			oIcMu.hide();
			$('#calendar').hide();
			var that = $(this);
			var $this = this;
			var mux = ev.clientX;
			var muy = ev.clientY;
			var oldx = $(this).offset().left;
			var oldy = $(this).offset().top;
			var disx = ev.clientX - $(this).offset().left;
			var disy = ev.clientY - $(this).offset().top;
	//点击高亮事件
			if( ev.ctrlKey ){
				if( this.onOff ){
					deskAct(this,'active',false);
				} else {
					deskAct(this,'',true);
				}
			} else {
				deskInit();
				deskAct(this,'active',false);
			}
	//图标的右键事件
			if( ev.which == 3 ){
				oMenu.hide();
				oIcMu.css({
					display: 'block',
					left: mux,
					top: muy
				}).find($('#rename')).click(function(ev){//重命名的事件
					ev.stopPropagation();
					deskInitdis();
					oIcMu[0].style.display = '';
					that.find($('p')).hide();
					that.find($('input')).show().select().keypress(function(ev){
						if( ev.which == 13 ){//如果按了回车改变图标的名字
							that.find($('p')).show().text(this.value);
							$(this).hide();
							getInfo(that[0].d).text = this.value;//更改图标名字时把虚拟数据也改了
						}
					});
					return false;
				}).prev().click(function(ev){//删除的事件  有bug没改
					deskInitdis();
					oIcMu[0].style.display = '';
					delli(oDicon[0]);
					renderList(getChildren(goback),oDicon[0]);
					return false;
				});
			} else {
				$(document).mousemove(function(ev){
					ev.stopPropagation();
					var x = ev.clientX - disx;
					var y = ev.clientY - disy;
					var maxX = winWidth - Number(that.width());//maxX,maxY图标拖拽时限制的位置大小
					var maxY = winHeight - Number(that.height());
					if( x<0 ){
						x = 0;
					}
					if( y<0 ){
						y = 0;
					}
					if( x>maxX ){
						x = maxX;
					}
					if( y>maxY ){
						y = maxY;
					}
					that.css({
						left: x,
						top: y
					});
				}).mouseup(function(ev){
					ev.stopPropagation();
					$(this).off('mouseup mousemove');
					var nx = parseFloat( that.css('left') );
					var ny = parseFloat( that.css('top') );
					for( var i=0; i<arr[0].length; i++ ){//两个for判断下当前的鼠标位置让图标有吸附效果
						if( nx-arr[0][i]<64 && nx-arr[0][i]>-64 ){
							nx = arr[0][i];
							break;
						}
					}
					for( var i=0; i<arr[1].length; i++ ){
						if( ny-arr[0][i]<65 && ny-arr[0][i]>-65 ){
							ny = arr[1][i];
							break;
						}
					}
					for( var i=0; i<Dics.length; i++ ){
						if( CollisionTest($this,Dics[i]) ){
							Dics[i].style.left = oldx + 'px';
							Dics[i].style.top = oldy + 'px';
							that.css({
								left: nx,
								top: ny
							});
							if( Dics[i].pic === 'recycle' && $this.pic != 'recycle' ){
								if ( confirm( '我还没做回收站里的内容 删除就没了！你确定要删除'+ $this.jh) ){
									deskInitdis();
									oIcMu[0].style.display = '';
									delli(oDicon[0]);
									renderList(getChildren(goback),oDicon[0]);
									return false;
								} else {
									return;
								}
							}
						} else {
							that.css({
								left: nx,
								top: ny
							});
						}
					}
					/*that.css({
						left: nx,
						top: ny
					});*/
				});
			}
			return false;
		});
		numT++;
		if( numT%arr[1].length == 0 ){
			numL++;
			numT = 0;
		}
		file.innerHTML = `
			<div class="deskpic">
				<img src="img/desticon/${data[i].pic}.png">
			</div>
			<p class="icname">${data[i].text}</p>
			<input type="text">
		`;
//把生成的li塞到ul desk里
		desk.appendChild(file);
	}
}

//文件夹的创建函数
function renderFolder(data,folder){
	folder.innerHTML = '';
	var num = 0;
	for( var i=0; i<data.length; i++ ){
		var file = document.createElement('li');
		
		file.pid = data[i].PId;
		file.d = data[i].id;
		file.type = data[i].type;
		file.pic = data[i].pic;
		file.onOff = true;
		file.ondblclick = click;
		file.oncontextmenu = function(ev){
			var $this = $(this);
			$('#foldermenu li:nth-of-type(3)').click(function(){//文件夹里的重命名
				$('#foldermenu').hide();
				$this.find('p').hide();
				$this.find('input').show().select().keypress(function(ev){
					if( ev.which == 13 ){
						$this.find('p').show().text(this.value);
						$(this).hide();
						getInfo($this[0].d).text = this.value;
					}
				});
			});
			$('#diskmenu li:nth-of-type(3)').click(function(){//磁盘里的重命名
				$('#diskmenu').hide();
				$this.find('p').hide();
				$this.find('input').show().select().keypress(function(ev){
					if( ev.which == 13 ){
						$this.find('p').show().text(this.value);
						$(this).hide();
						getInfo($this[0].d).text = this.value;
					}
				});
			});
			return false;
		};
		file.onclick = function(ev){
			$('#calendar').hide();
			if( ev.ctrlKey ){
				if( this.onOff ){
					this.className = 'active';
					this.onOff = false;
				} else {
					this.className = '';
					this.onOff = true;
				}
			} else {
				foldInit();
				this.className = 'active';
				this.onOff = false;
			}
			$('#foldermenu').hide();
			return false;
		};
		if( text == data[i].text ){
			num++;
			file.innerHTML = `
				<p>${data[i].text}(${num})</p>
				<input type="text" />
			`;
			//getInfo(data[i].id).text = data[i].text+'('+num+')';
		} else {
			file.innerHTML = `
				<p>${data[i].text}</p>
				<input type="text" />
			`;
		}
		var text = data[i].text;
		folder.appendChild(file);
	}
}

//音乐类型的文件生成
function renderMusic(data,folder){
	folder.innerHTML = '';
	for( var i=0; i<data.length; i++ ){
		var file = document.createElement('li');
		file.pid = data[i].PId;
		file.d = data[i].id;
		file.type = data[i].type;
		file.pic = data[i].pic;
		file.src = data[i].src;
		file.onOff = true;
		file.style = 'background-image: url(img/desticon/wma.png)';
		file.ondblclick = function(){
			var audioSrc = this.src;
			var audio = new Audio(audioSrc);
			//创建音频分析对象。
			var context = new AudioContext();
			playCanvas(audio,context);
			$('#qmusic').show();
			$('#mclose').click(function(){
				$('#qmusic').hide();
				audio.pause();
			});
		};
		file.onclick = function(ev){
			$('#calendar').hide();
			if( ev.ctrlKey ){
				if( this.onOff ){
					this.className = 'active';
					this.onOff = false;
				} else {
					this.className = '';
					this.onOff = true;
				}
			} else {
				foldInit();
				this.className = 'active';
				this.onOff = false;
			}
			$('#foldermenu').css('display','');
			return false;
		};
		file.innerHTML = `
			${data[i].text}
		`;
		folder.appendChild(file);
	}
}
//此电脑 里面的磁盘生成 
function renderDisk(data,folder){
	folder.innerHTML = '';
	for( var i=0; i<data.length; i++ ){
		var file = document.createElement('li');
		file.pid = data[i].PId;
		file.d = data[i].id;
		file.type = data[i].type;
		file.pic = data[i].pic;
		file.onOff = true;
		file.ondblclick = click;
		file.onclick = function(ev){
			$('#calendar').hide();
			if( ev.ctrlKey ){
				if( this.onOff ){
					this.className = 'active';
					this.onOff = false;
				} else {
					this.className = '';
					this.onOff = true;
				}
			} else {
				iconInit(Dicks);
				this.className = 'active';
				this.onOff = false;
			}
			$('#foldermenu').hide();
			return false;
		};
/*
<li>
	<p>本地磁盘(C:)</p>
	<img src="img/big/bar.png">
	<p>90.5GB可用，共118GB</p>
</li>
*/
		file.innerHTML = `
			<p>${data[i].text}</p>
			<img src="img/big/bar.png" />
			<p>90.5GB可用，共118GB</p>
		`;
		folder.appendChild(file);
	}
}
//生成
/*function renderLeft(data,folder){
	folder.innerHTML = '';
	for( var i=0; i<data.length; i++ ){
		var file = document.createElement('dd');
		
	}
}*/
//右下角时间 
setInterval(function(){
	var rDate = new Date();
	var y = rDate.getFullYear();
	var mon = rDate.getMonth()+1;
	var d = rDate.getDate();
	var h = rDate.getHours();
	var min = rDate.getMinutes();
	var time = toTwo(h) + ':' + toTwo(min);
	var date = y + '/' + toTwo(mon) + '/' + toTwo(d);
	$('#bartime p:nth-of-type(1)')[0].innerHTML = time;
	$('#bartime p:nth-of-type(2)')[0].innerHTML = date;

},1000)


