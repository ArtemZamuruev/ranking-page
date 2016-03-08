$(document).ready(function(){	

	for (var i = 0; i < rows.length; i++){
		var rowHTML = '\
			<div class="row '+rows[i]["category"]+'" order-number="'+(i+1)+'">\
				<div class="row-description"><p>'+rows[i]["name"]+'</p></div>\
				<div class="row-value" value="'+rows[i]["value"]+'"><p>'+rows[i]["value"]+'</p></div>\
			</div>\
		';
		$("div.rows-stack").append(rowHTML);
		var rowLengthInPercent = ((rows[i]["value"]*0.9*0.55)/0.4)*100;
		$("div.row[order-number="+(i+1)+"] div.row-value").css({"width": rowLengthInPercent+"%"});
	}
	
    backgroundGridSetup();
});


$("div.button").hover(
	function(){
		var category = $(this).attr("class").split(" ")[1];
		$("div.row").css({"opacity" : "0.5"});
		$("div.row."+category).css({"opacity" : "1"});
	}, 
	function(){
		$("div.row").css({"opacity" : "1"});
	}
);

$(window).resize(function(){
    backgroundGridSetup();
});

function prettifyValueNumbers(){
    
}

function backgroundGridSetup(){
    var rowsDivHeight = $("div.rows-stack").height();
    
    $("div.grid-background").css({"top": $("header").outerHeight()+30});
	$("div.grid-background").css({"height" : rowsDivHeight+100});
    
    var scrWidth = $("div.grid-background").width();
    
    $("div.vertical-line").css({"margin-left": (scrWidth-74)/13+"px"});
    $("div.vertical-line:nth-child(1)").css({"margin-left":"30px"});
}