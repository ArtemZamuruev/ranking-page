$(document).ready(function(){	
    displayRows();
    backgroundGridSetup();
    prettifyValueNumbers();
});

var lastPressdButton;

$("div.button").click(function(){
    if (lastPressdButton && lastPressdButton != this){
        $("div.row").removeClass("opacity-25");
        $("div.button").removeClass("opacity-50");
    }
    var category = $(this).attr("class").split(" ")[1];
    $("div.row").toggleClass("opacity-25");
    $("div.button").toggleClass("opacity-50");
    $("div.row."+category).removeClass("opacity-25");
    $("div.button."+category).removeClass("opacity-50");
    lastPressdButton = this;
});

function showTooltip(rowValueDiv){

}

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
            setDescrPSizes($("div.row[order-number="+(i+1)+"]"),rows[i]["font-size"]);
        }


        
        if (i === 0){
            var whitespaceImg = '<img src="img/whitespace.png" style="float:right; margin-right:10px"></img>';
            $("div.row[order-number=1] div.row-value p").before(whitespaceImg);
        }

    }
    
    $("div.row-value").click(function(){
        
        $("div.tooltip").detach();

        var category = $($(this).parent()).attr("class").split(" ")[1];
        
        var popupHtml = '\
            <div class="tooltip '+category+'">\
                <p>'+rows[$($(this).parent()).attr("order-number")-1]["name"]+'</p>\
            </div>\
        ';
        $("body").append(popupHtml);
        
        $("div.tooltip").click(function(){
            $(this).detach();
        });       
    });
}

function setCirclesSizes(row, radius){
    $("div.description-circles", row).css({
        "top" : (radius - 8)*(-1)
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

function setDescrPSizes(row, fontsize){
    $("div.row-description p", row).css({
        "font-size" : fontsize
    });
}

function prettifyValueNumbers(){
    var valueRows = $("div.row-value");
    for (var i = 0; i < valueRows.length; i++){
        if ($("p", valueRows[i]).width() >= $(valueRows[i]).width()){
            $("p", valueRows[i]).css({
                "position" : "relative",
                "left" : ($("p", valueRows[i]).width()+10)+"px",
                "color": "#333333"
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