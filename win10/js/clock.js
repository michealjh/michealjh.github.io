var Clock = function(props){
//判断不支持canvas时报错
	if( props.canvas === undefined || props.canvas instanceof HTMLCanvasElement == false){
		throw new Error('the canvas is not defined');
	}
	this.canvas = props.canvas;
	this.ctx = this.canvas.getContext('2d');
	this.W = this.canvas.width;//获取canvas的宽
	this.H = this.canvas.height;//获取canvas的高
	this.R = this.H*0.45;//时钟的半径 
	return this;
}
//更新时间 
Clock.prototype.upDate = function(){
	var _this = this;//定时器里拿不到this 用变量装一下
	setInterval(function(){
		var time = new Date();
		var s = time.getSeconds();
		var m = time.getMinutes() + s/60;//分针后面要加上 秒数的零头
		var h = time.getHours() + m/60;//时针后面要加上 分钟的零头
		_this.ctx.clearRect(0,0,_this.W,_this.H);//清空整个canvas画布 下面重新渲染
		_this.render(h,m,s);
	},200);
};
//渲染调用
Clock.prototype.render = function(h,m,s){
	this.drawOuter();
	this.drawNum();
	this.drawPoint();
	this.drawHours(h);
	this.drawMins(m);
	this.drawSecs(s);
	this.drawCircle();
};
//画时钟的外框
Clock.prototype.drawOuter = function(){
	this.ctx.save();//记录以上的绘制设置
	this.ctx.translate(this.W/2,this.H/2);//偏移下绘制位置 canvas的中心点
	this.ctx.lineWidth = 6;//设置边框宽度 
	this.ctx.beginPath();
	this.ctx.arc(0,0,this.R,0,2*Math.PI);
	this.ctx.stroke();
	this.ctx.restore();//恢复到save
	return this;
};
//画时钟的数字 
Clock.prototype.drawNum = function(){
	var _this = this;
	var num = [3,4,5,6,7,8,9,10,11,12,1,2];//写文字，位置也是根据弧度
//弧度的位置固定不变 3点钟方向 是0 ;6点钟方向 是Math.PI/2; 9点钟方向是 Math.Pi; 
// 12点方向是 3*Math.PI/2 ; 再绕回3点钟方向是 2*Math.PI
	this.ctx.save();
	this.ctx.translate(this.W/2,this.H/2);
	this.ctx.font = '16px Arial';//设置下面文字的大小和字体
	this.ctx.textAlign = 'center';//设置下面文字的水平对齐方式 居中
	this.ctx.textBaseline = 'middle';//设置下面文字的垂直对齐方式 居中
	num.forEach((item,i)=>{
/*表盘是12个数字，那么一个数字的弧度就是 2*Math.PI/12 也是就Math.PI/6
angle 就是每个数字之间的弧度 在forEach里按照弧度依次输出数组中的值
x,y分别是每个数字的坐标，x的坐标都是Math.cos(angle)，y的坐标都是Math.sin(angle)
*/
		var angle = Math.PI / 6 * i;
		var x = (_this.R - 28) * Math.cos(angle);
		var y = (_this.R - 28) * Math.sin(angle);
		_this.ctx.fillText(item,x,y);
	});
	this.ctx.restore();
	return this;
};
//画时钟的刻度
Clock.prototype.drawPoint = function(){
//r是刻度小圆的半径，每5分钟是一个大红圆，其他时候是小黑圆
	var r;
	this.ctx.save();
	this.ctx.translate(this.W/2,this.H/2);//偏移起始位置
//60个刻度angle来记录每个刻度的弧度;x,y是每个刻度的坐标通过弧度计算
	for( var i=0; i<60; i++ ){
		var angle = 2*Math.PI / 60 * i;
		var x = (this.R - 12) * Math.cos(angle);
		var y = (this.R - 12) * Math.sin(angle);
		this.ctx.beginPath();
//判断每5分钟是个红色大点
		if( i%5 == 0 ){
			r = 4;
			this.ctx.fillStyle = '#f80';
		} else {
			r = 2;
			this.ctx.fillStyle = '#666';
		}
		this.ctx.arc(x,y,r,0,2*Math.PI);
		this.ctx.fill();
	}
	this.ctx.restore();
	return this;
};
//画时钟的时针
Clock.prototype.drawHours = function(h){
	var angle = 2*Math.PI / 12 * h;
	this.ctx.save();
	this.ctx.lineWidth = 6;//时针的线条宽度
	this.ctx.lineCap = 'round';//线条圆角边
	this.ctx.translate(this.W/2,this.H/2);//偏移起始位置
	this.ctx.rotate(angle);
	this.ctx.beginPath();
	this.ctx.moveTo(0,20);//屁股突出一块
	this.ctx.lineTo(0,-(this.R-65));//指向时间的长长的一端
	this.ctx.stroke();
	this.ctx.restore();
	return this;
};
//画时钟的分针 除了弧度和长度与时针不现 其它相同 
Clock.prototype.drawMins = function(m){
	var angle = 2*Math.PI / 60 * m;
	this.ctx.save();
	this.ctx.lineWidth = 4;
	this.ctx.lineCap = 'round';
	this.ctx.translate(this.W/2,this.H/2);
	this.ctx.rotate(angle);
	this.ctx.beginPath();
	this.ctx.moveTo(0,20);
	this.ctx.lineTo(0,-(this.R-50));
	this.ctx.stroke();
	this.ctx.restore();
	return this;
};
//画时钟的秒钟 
Clock.prototype.drawSecs = function(s){
	var angle = 2*Math.PI / 60 * s;
	this.ctx.save();
	this.ctx.fillStyle = '#fc0043';
	this.ctx.lineCap = 'round';
	this.ctx.translate(this.W/2,this.H/2);
	this.ctx.rotate(angle);
	this.ctx.beginPath();
	this.ctx.moveTo(-3,20);
	this.ctx.lineTo(3,20);
	this.ctx.lineTo(1,-(this.R-30));
	this.ctx.lineTo(-1,-(this.R-30));
	this.ctx.fill();
	this.ctx.restore();		
	return this;
};
//画时钟的指针上固定点
Clock.prototype.drawCircle = function(){
	this.ctx.save();
	this.ctx.fillStyle = '#121a45';
	this.ctx.translate(this.W/2,this.H/2);
	this.ctx.beginPath();
	this.ctx.arc(0,0,10,0,2*Math.PI);
	this.ctx.fill();
	this.ctx.restore();
	return this;
};
var c = new Clock({
	canvas: document.getElementById('canvas')
});
c.upDate();

//面向对象方法的拖拽
var Drag = function (props){
	this.obj = props.obj;
	this.dragDown();
};
Drag.prototype = {
	constructor: Drag,
	dragDown: function(){
		var _this = this;
		this.obj.onmousedown = function(ev){
			_this.disx = ev.clientX - this.offsetLeft;
			_this.disy = ev.clientY - this.offsetTop;
			_this.dragMove();
			_this.dragUp();
			return false;
		};
	},
	dragMove: function(){
		var _this = this;
		document.onmousemove = function(ev){
			_this.x = ev.clientX - _this.disx;
			_this.y = ev.clientY - _this.disy;
			var x = winWidth - _this.obj.getBoundingClientRect().width;
			var y = winHeight - _this.obj.getBoundingClientRect().height;
			if(_this.x<0){
				_this.x = 0;
			}
			if(_this.y<0){
				_this.y = 0;
			}
			if(_this.x>x){
				_this.x = x;
			}
			if(_this.y>y){
				_this.y = y;
			}
			_this.obj.style.left = _this.x + 'px';
			_this.obj.style.top = _this.y + 'px';
			return false;
		};
	},
	dragUp: function(){
		var _this = this;
		document.onmouseup = function(){
			this.onmousemove = this.onmouseup = null;
			return false;
		};
	}
};
var ddd = new Drag({
	obj: document.getElementById('canvas')
});