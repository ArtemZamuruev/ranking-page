$(document).ready(function(){	
    displayRows();
    backgroundGridSetup();
    prettifyValueNumbers();
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


function displayRows(){
    for (var i = 0; i < rows.length; i++){

        var visibleValue;
        if (rows[i]["val-number"]){
            visibleValue = rows[i]["val-number"];
        }
        else{
            visibleValue = rows[i]["value"];
        }
        
        var descrHtml = "";
       
        if (rows[i]["des-type"] === "line"){
            descrHtml = '<p>'+rows[i]["name"]+'</p>';
        }
        else{         
            for (var d = 0; d < rows[i]["dots-num"]; d++){
                descrHtml += '<div class = "dot"></div>';
            }
            
            descrHtml += '\
              <div class="description-circles">\
                <div class="circle outer">\
                    <div class="circle middle">\
                        <div class="circle inner">\
                            <p>'+rows[i]["name"]+'</p>\
                        </div>\
                    </div>\
                </div>\
              </div>\
            ';
        }

        var rowHTML = '\
            <div class="row '+rows[i]["category"]+'" order-number="'+(i+1)+'">\
                <div class="row-description">'+descrHtml+'</p></div>\
                <div class="row-value" value="'+rows[i]["value"]+'"><p>'+visibleValue+'</p></div>\
            </div>\
        ';
        $("div.rows-stack").append(rowHTML);
        
        var rowLengthInPercent = ((rows[i]["value"]*0.9*0.55)/0.4)*100;
        
        $("div.row[order-number="+(i+1)+"] div.row-value").css({"width": rowLengthInPercent+"%"});
        
        if(rows[i]["des-type"] === "circle"){
            setCirclesSizes($("div.row[order-number="+(i+1)+"]"),rows[i]["circle-rad"]); 
            setDescrPSizes($("div.row[order-number="+(i+1)+"]"),rows[i]["font-sets"]);
        }        
    }
}

function setCirclesSizes(row, radius){
    $("div.description-circles", row).css({
        "top" : (radius - 13)*(-1)
    });
    
    $("div.circle.outer", row).css({
        "width" : radius*2,
        "height": radius*2
    });
    $("div.circle.middle", row).css({
        "width" : radius*2-10,
        "height": radius*2-10
    });
    $("div.circle.inner", row).css({
        "width" : radius*2-20,
        "height": radius*2-20
    });
}

function setDescrPSizes(row, fontsets){
    var params = fontsets.split(";");
    $("div.row-description p", row).css({
        "font-size" : params[0],
        "top"       : params[1],
        "left"      : params[2]
    });
}

function prettifyValueNumbers(){
    var valueRows = $("div.row-value");
    for (var i = 0; i < valueRows.length; i++){
        if ($("p", valueRows[i]).width() >= $(valueRows[i]).width()){
            $("p", valueRows[i]).css({
                "position" : "relative",
                "left" : ($("p", valueRows[i]).width()+10)+"px",
                "color": "#121212"
            });
        }
    }
}

function backgroundGridSetup(){
    var rowsDivHeight = $("div.rows-stack").height();
    
    $("div.grid-background").css({"top": $("header").outerHeight()+30});
	$("div.grid-background").css({"height" : rowsDivHeight+100});
    
    var scrWidth = $("div.grid-background").width();
    
    $("div.vertical-line").css({"margin-left": (scrWidth-74)/13+"px"});
    $("div.vertical-line:nth-child(1)").css({"margin-left":"30px"});
}