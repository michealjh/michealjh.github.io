/**
 * Created by JSONLY on 2016/7/3.
 */

(function(window){
	//初始化函数
	var time,
		date,
		upper,
		everyDay;
	var weekText = ['日','一','二','三','四','五','六'];
	var len = 42;
	var nume = 0;
	function init(timeEle,dateEle,upperEle,everyDayEle,prevMonthEle,nextMonthEle){
		time = timeEle;
		date = dateEle;
		upper = upperEle;
		everyDay = everyDayEle;
		prevMonth = prevMonthEle;
		nextMonth = nextMonthEle;
		createEveryDay(nume);
		showTime();
		setInterval(showTime, 1000);
		changeMonth(nume);
	} 
	function showTime(){
		var d = new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
		var week = d.getDay();
		var hours = d.getHours();
		var minutes = d.getMinutes();
		var seconds = d.getSeconds();
		time.innerHTML = toTwo(hours)+':'+toTwo(minutes)+':'+toTwo(seconds);
		date.innerHTML = year+'年'+month+'月'+day+'日,星期'+weekText[week];
	}
	function createEveryDay(nume){
		var d = new Date();
		d.setMonth(d.getMonth()+nume);//点击设置当前的月份
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var now = d.getDate();
		var str = '';
		//upper填充内容
		upper.innerHTML = year+'年'+month+'月';//不能调用上级作用域，时间不断在变化，需要不停的赋值
		d.setDate(1);//这个月的第一天
		var week = d.getDay();//获得星期，也就是星期几，得到数字也不能用需要判断一下例如星期日的时候是0
		//等于0说明是周日,
		if(week == 0){
			week = 7;
		}
		week--;//上个月需要排多少天
		//上个月从几号开始排
		d.setDate(0);
		//获取到上个月有多少天。
		var prevMonthDayNum = d.getDate();
		//获取上个月起始日子
		var prevMonthStartDay = prevMonthDayNum - week+1;

		for(var i=prevMonthStartDay;i<=prevMonthDayNum;i++){
			str += '<a href="javascript:;" class="old">'+i+'</a>';
		}
		// //填充这个月的日子
		// //回到这个月第一天
		d.setDate(d.getDate()+1);
		//去下个月
		d.setMonth(d.getMonth()+1);
		d.setDate(0);
		var lastDay = d.getDate();
		//生成这个月的，只有在nume等于0的时候才会产生焦点
		for(var i=1;i<=lastDay;i++){
			if(i==now&&nume==0){
				str += '<a href="javascript:;" class="active">'+i+'</a>';
			}else{
				str += '<a href="javascript:;">'+i+'</a>';
			}
			
		}

		//计算剩下的格子
		var num = len-week -lastDay;
		//点击之前的那个月也会显示焦点
		for(var i=1;i<=num;i++){
			if(i==now&&nume==-1){
				str += '<a href="javascript:;" class="active">'+i+'</a>';
			}else{
				str += '<a href="javascript:;" class="old">'+i+'</a>';
			}
		}
		everyDay.innerHTML = str;
	}
	function changeMonth(){
		prevMonth.onclick = function(){
			nume--;
			console.log(nume)
			createEveryDay(nume);
		};
		nextMonth.onclick = function(){
			nume++;
			createEveryDay(nume);
		};
	}
		
	
	function toTwo(n){
		return n<10?'0'+n:''+n;
	}
	window.init = init;
})(window);