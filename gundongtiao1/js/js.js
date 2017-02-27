/*------滚动条-------*/
var n = 0;

window.onscroll = function(){
	function HOME(){
		var t = parseFloat($('.img1').css('top'));
 		var t1 = parseFloat($('.img2').css('top'));
		var top1 = window.pageYOffset;
		var top =top1 - n;	
		$('.img2').css('top',top/1.4+t1);
		$('.img1').css('top',top/1.3+t);
		n = window.pageYOffset;
	}
	HOME();

	function PROJEKTE(){
		var top = window.pageYOffset-600;	
		$('.PR_img1').css('top',top-200);
	}

	PROJEKTE();


	function DE(){
		var top = parseFloat((window.pageYOffset-2200)/2.2);
		$('.Deimg1').css('top',top);
	}
	DE();


	function TECHNIK(){
		var top = window.pageYOffset-3000;	
		var t = parseFloat(top/1.5);
		var t1 = parseFloat(top*1.5);
		$('.bg').css('top',t);
		$('.rt').css('top',t1);
	}
	TECHNIK();

	function LBA(){
		var top = window.pageYOffset-3900;	
		var t = parseFloat(top/1.6);
		var ti = top/1.2;
		$('.LBAbg').css('top',t);
		$('.m').css('top',ti);
			}
	LBA();

	function ABOUT(){
		var top = window.pageYOffset-5050;	
		var t = top/1.2;
		var t1 = (top+580)/2.5;
		$('.ABOUTimg').css('top',t);
		$('.ABOUTimg1').css('top',t1);
	}
	ABOUT();

	function JOBS(){
		var top = window.pageYOffset-6050;	
		var t = top/1.5;  
		$('.JOBSimg1').css('top',t);
	}
	JOBS();


	/**navshow*/
	var t = window.pageYOffset;
	function navshow(n,num){
		if(t>=n){
		for(var j=0;j<a.length;j++){
			a[j].style.color = '';
			i1[j].style.display = 'none';
		}
		a[num].style.color = '#000';
		i1[num].style.display = 'block';
		}
	}
	for(var i=0;i<7;i++){
		navshow(i*1000,i);
	}
};


// ----------- 生成li------------------
// 
// 
 (function(){
 	var arr = [
 		[
 		'SL_1_thumb','spl_thumb','steinway_thumb','stm_thumb','thumbnail_02'
 		,'UA_thumb','uli_schneider_01_thumb','uli_schneider_02_thumb','uli_schneider_03_thumb','unilever_bifi_thumb'
 		,'we','white_circus_thumb','wizard_thumb_01','ypt_thumb','zahnfee_thumb'
 		,'ZAS_thumb','zxc','KED_thumb','Kowall_I_thumb','Kowall_II_thumb'
 		],
 		[
 		'2Q==2','2Q==3','2Q==q','2Q==z','9k=1'
 		,'9k=f','9k=p','111','alphadog_thumb','asd'
 		,'cng_II_thumb','cng_III_thumb','cng_IV_thumb','concetatodos_thumb','concetatodos_thumb'
 		,'d','download1','drunter_und_drueber_thumb','flatex_thumb','gehalt_thumb'
 		],
 		[
 		'genax_thumb','h','he','ii','jjj'
 		,'KED_thumb','Kowall_I_thumb','Kowall_II_thumb','KP_thumb','jjj'
 		,'kreativloft_thumb','Lebbin_thumb_01','Lenffer_thumb','Linus_thumb','lis1'
 		,'LN_thumb','mattmueller_thumb','medi_thumb','meetic_thumb','meineckerosengarten_thumb'
 		],
 		[
 		'millionair_world_thumb','montblanc_piraten_thumb','moom_thumb','MR_thumb','MS_thumb'
 		,'mytaxi_thumb','nco_ci_thumb','nco_print_thumb','nco_web_thumb','Neu_thumb'
 		,'offermann_thumb','offermann2_thumb','oi','open_eyes_thumb','optikur_thumb'
 		,'primesails_thumb','pulse_thumb','qw','riegercmc_thumb','meetic_thumb'
 		],
 		[
 		'SL_1_thumb','spl_thumb','steinway_thumb','stm_thumb','thumbnail_02'
 		,'UA_thumb','uli_schneider_01_thumb','uli_schneider_02_thumb','uli_schneider_03_thumb','unilever_bifi_thumb'
 		,'we','white_circus_thumb','wizard_thumb_01','ypt_thumb','zahnfee_thumb'
 		,'ZAS_thumb','zxc','KED_thumb','Kowall_I_thumb','Kowall_II_thumb'
 		],
 		[
 		'2Q==2','2Q==3','2Q==q','2Q==z','9k=1'
 		,'9k=f','9k=p','111','alphadog_thumb','asd'
 		,'cng_II_thumb','cng_III_thumb','cng_IV_thumb','concetatodos_thumb','concetatodos_thumb'
 		,'d','download1','drunter_und_drueber_thumb','flatex_thumb','gehalt_thumb'
 		]
 	];
 	var lis = '';
 	 	for(var i=0;i<arr.length;i++){
 		
 			lis +='<li></li>';
 		}
 	$('#list')[0].innerHTML = lis;
 	var list = $('#list')[0];
 	var lis1 = list.getElementsByTagName('li');
 	var n=0;
 	var lis2 = '';
 	var time = setInterval(function(){
 		for(var i=0;i<20;i++){
 			lis2 +='<p><span class='+'lis1'+'></span><img src='+'fontsimg/'+arr[n][i]+'.jpg'+'></p>';
 			
 		}

 		lis1[n].innerHTML = lis2;
 		lis2 = '';
 			n++;
 			if(n==6){
 				clearInterval(time);
 			}
 	},30);
 })()


 // -----图组切换-------
 // 
 var onOff = true;

$('.prve')[0].onclick = function(){
	if(!onOff){
		return
	}
	onOff = false;
	var list = $('#list')[0];
	var l = parseFloat($('#list').css('left'));
	l = l+900;
	mTween(list,'left',l,1000,'linear',function(){
		onOff = true;
		if(l==0){
			$('#list').css('left',-3600);
		}
	})
}
$('.next')[0].onclick = function(){
	if(!onOff){
		return
	}
	onOff = false;
	var list = $('#list')[0];
	var l = parseFloat($('#list').css('left'));
	l = l-900;
	mTween(list,'left',l,1000,'linear',function(){
		onOff = true;
		if(l==-4500){
			$('#list').css('left',-900);
		}
	})
}


/**选项卡**/
var list = document.getElementById('list1');
var ps = list.getElementsByTagName('p');
var lis =list.getElementsByTagName('li');
var is = list.getElementsByTagName('i');
for(var i=0;i<ps.length;i++){
	ps[i].onOff =true;
	ps[i].onclick = function(){
		for(var j=0;j<ps.length;j++){
			lis[j].style.height = '32px';
		}
		if(this.onOff){
			this.parentNode.style.height = '620px';
			this.onOff = !this.onOff;
		}else{
			this.parentNode.style.height = '32px';
			this.onOff = !this.onOff;
		}
	};
}


/**锚点*/

var list = $('.nav')[0];
var a = list.getElementsByTagName('a');
var i1 = list.getElementsByTagName('i');
for(var i=0;i<a.length;i++){
	a[i].yk = i;
	a[i].onclick = function(){
		
		scrollTo1(this.yk);
	};
} 

