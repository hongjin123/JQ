

$.fn.slider = function(opt){
	var deft = {
		prev:"#prev",//轮播左键
		next:"#next",//轮播右键
		movespeed:500,//滚动速度
		setspeed:2000,//定时器速度
		round_f:"#ols",//下标圆的父元素
		round_s:"li",//下标圆本身元素
		word_f:".black",//文字的父元素
		word_s:"span",//文字本身的元素
		Lyesnot:true,//是否自动轮播
		LRyesnot:false,//左右按键是否显示，true显示
		howshow:"fadeIn()",//左右键如何显示  X
		howhide:"fadeOut()",//左右键如何隐藏  X
		ulss:"#uls",//滚筒图片集合的父元素
		liss:"li",//滚动图片本身元素
		bg:"bg"//下标圆样式名

	}
	var seting = $.extend({},deft,opt);
    console.log(seting)
	var nexts = seting.next,//轮播右键
		prevs = seting.prev,//轮播左键
		movespeeds = seting.movespeed,//滚动速度
		setspeeds = seting.setspeed,//定时器速度
		round_fs = seting.round_f,//下标圆的父元素
		round_ss = seting.round_s,//下标圆本身元素
		word_fs = seting.word_f,//文字的父元素
		word_ss = seting.word_s,//文字本身的元素
		Lyesnots = seting.Lyesnot,//是否自动轮播
		LRyesnots = seting.LRyesnot,//左右按键是否显示，true显示
		howshows = seting.howshow,//左右键如何显示
		howhides = seting.howhide,//左右键如何隐藏
		uls = seting.ulss,//滚筒图片集合的父元素
		lis = seting.liss,//滚动图片本身元素
		bgs = seting.bg//下标圆样式名
		;


var w = $(uls).find(lis).width();//每个图片的宽度
var len = $(uls).find(lis).length;//所有滚动图片的数量

$(uls).width(w*len);
var i=0;

$(nexts).on("click",function(){
	if($(uls).is(":animated")) return false;
	next();
})

$(prevs).on("click",function(){
	if($(uls).is(":animated")) return false;
	prev();
})
function next(){
	i++;
	if(i>len-1){
		$(uls).find(lis).first().appendTo(uls);
		$(uls).css("marginLeft",-w*(len-2))
		$(uls).animate({"marginLeft":-w*(len-1)},movespeeds,function(){
			$(uls).find(lis).last().prependTo(uls);
			$(uls).css("marginLeft",0)
		})
		i=0;
	}else{
		$(uls).animate({"marginLeft":-w*i},movespeeds)
	}
	$(round_fs).find(round_ss).eq(i).addClass(bgs).siblings().removeClass(bgs);
	$(word_fs).find(word_ss).eq(i).show().siblings().hide();
}

function prev(){
	i--;
	if(i<0){
		$(uls).find(lis).first().appendTo(uls);
		$(uls).css("marginLeft",-w*(len-1))
		$(uls).animate({"marginLeft":-w*(len-2)},movespeeds,function(){
			$(uls).find(lis).last().prependTo("#uls");
			$(uls).css("marginLeft",-w*(len-1));
		})
		i=len-1;

	}else{
		$(uls).animate({"marginLeft":-w*i},movespeeds)
	}
	$(round_fs).find(round_ss).eq(i).addClass(bgs).siblings().removeClass(bgs);
	$(word_fs).find(word_ss).eq(i).show().siblings().hide();
}

$(round_fs).find(round_ss).each(function(){
	$(this).on("mouseover",function(){
		$(this).addClass(bgs).siblings().removeClass(bgs);
		var index = $(this).index();
		$(uls).stop().animate({"marginLeft":-index*w},movespeeds)
		$(word_fs).find(word_ss).eq(index).show().siblings().hide();
		i = index;
	})
})

if(Lyesnots==true){
	timer = setInterval(next,setspeeds);
	$("#img_box").on("mouseover",function(){
	$(prevs).stop().fadeIn();
	$(nexts).stop().fadeIn();
	clearInterval(timer);
	})
	$("#img_box").on("mouseout",function(){
	$(prevs).stop().fadeOut();
	$(nexts).stop().fadeOut();
	timer = setInterval(next,setspeeds);
	})
}else{
	$("#img_box").on("mouseover",function(){
		$(prevs).stop().fadeIn();
		$(nexts).stop().fadeIn();
		$(prevs).css("opacity",0.5);
		$(nexts).css("opacity",0.5);
	})
	$("#img_box").on("mouseout",function(){
		$(prevs).stop().fadeOut();
		$(nexts).stop().fadeOut();
	})
}





}















