var $ = function(selector,context){
	var type = typeof selector,
		context = context||document;
	if( typeof context === 'string' ){
		var ele = $(context);
		var eles = [];
		if( ele.length !== undefined ){//判断context得到的是不是一个集合
			ele = Array.from(ele);
			ele.forEach(function(value){
				eles = eles.concat( Array.from( $(selector,value) ) );
			})
			return [...(new Set(eles))];//New Set去重！得到一个数组用下标调用里面的元素
		}
		return $(selector,ele);
	}
	if( type === 'string'){
		var s = selector.charAt();
		switch(s){
			case '#': //by id
				return document.getElementById(selector.substring(1));
			break;
			case '.': //by className
				return context.getElementsByClassName(selector.substring(1));
			break;
			default: //by tagName
				return context.getElementsByTagName(selector);
		}
	}
	if( type === 'function' ){//实现window.onload的封装
		return window.onload = selector;
	}
};

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
//返回一个对象 可以获取节点目标的6个属性width height top left right bottom 
function getPos(obj){
	return obj.getBoundingClientRect();
}
//检测两个节点是否有碰撞
function CollisionTest(obj1,obj2){
	var pos1 = getPos(obj1);
	var pos2 = getPos(obj2);
	/*if( pos1.bottom<pos2.top || pos1.left>pos2.right || pos1.right<pos2.left || pos1.top>pos2.bottom ){
		return false;
	} else {
		return true;
	}*/
	return !( pos1.bottom<pos2.top || pos1.left>pos2.right || pos1.right<pos2.left || pos1.top>pos2.bottom );
}