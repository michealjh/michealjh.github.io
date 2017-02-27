 function scrollTo1(n){
	n = n*1000+100;
	var y = window.pageYOffset;
	if(y<n){
		var time = setInterval(function(){
			y+=50;
			if(y>=n){
				y = n;
				clearInterval(time);
			}
			window.scrollTo(0,y);

		},16);
	}else if(y>n){
		var time = setInterval(function(){
			y=y-50;
			if(y<=n){
				clearInterval(time);
				y = n;
			}
			window.scrollTo(0,y);

		},16);
	}

}