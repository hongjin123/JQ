
var w = $("#uls li").width();
var len = $("#uls li").length;
$("#uls").width(w*len);
var i=0;

$("#next").on("click",function(){
	if($("#uls").is(":animated")) return false;
	next();
})
$("#prev").on("click",function(){
	if($("#uls").is(":animated")) return false;
	prev();
})
function next(){
	i++;
	if(i>len-1){
		$("#uls li:first").appendTo("#uls");
		$("#uls").css("marginLeft",-w*(len-2))
		$("#uls").animate({"marginLeft":-w*(len-1)},500,function(){
			$("#uls li:last").prependTo("#uls");
			$("#uls").css("marginLeft",0)
		})
		i=0;
	}else{
		$("#uls").animate({"marginLeft":-w*i},500)
	}
	$("#ols li").eq(i).addClass("bg").siblings().removeClass("bg");
	$(".black span").eq(i).show().siblings().hide();
}

function prev(){
	i--;
	if(i<0){
		$("#uls li:first").appendTo("#uls");
		$("#uls").css("marginLeft",-w*(len-1))
		$("#uls").animate({"marginLeft":-w*(len-2)},500,function(){
			$("#uls li:last").prependTo("#uls");
			$("#uls").css("marginLeft",-w*(len-1));
		})
		i=len-1;

	}else{
		$("#uls").animate({"marginLeft":-w*i},500)
	}
	$("#ols li").eq(i).addClass("bg").siblings().removeClass("bg");
	$(".black span").eq(i).show().siblings().hide();
}

$("#ols li").each(function(){
	$(this).on("mouseover",function(){
		$(this).addClass("bg").siblings().removeClass("bg");
		var index = $(this).index();
		$("#uls").stop().animate({"marginLeft":-index*w},200)
		$(".black span").eq(index).show().siblings().hide();
		i = index;
	})
})

timer = setInterval(next,1000);

$("#img_box").on("mouseover",function(){
	clearInterval(timer);
	$("#prev").stop().fadeIn();
	$("#next").stop().fadeIn();
})
$("#img_box").on("mouseout",function(){
	timer = setInterval(next,1000);
	$("#prev").stop().fadeOut();
	$("#next").stop().fadeOut();
})