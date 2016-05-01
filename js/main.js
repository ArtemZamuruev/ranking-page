$(document).ready(function(){	
    displayRows();
    backgroundGridSetup();
    backgroundGridSetupPopup();
    setPopupSize();
});



var lastPressdButton;

$("div.button").click(function(){
    var buttonClass = $(this).attr("class");
    if(buttonClass == "button ru" || buttonClass == "button en"){
        return;
    }
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

$("div.button").dblclick(function(){
    var buttonClass = $(this).attr("class");
    if(buttonClass == "button ru" || buttonClass == "button en"){
        return;
    }
    var category = $(this).attr("class").split(" ")[1];
    clearPopupRowsStack();
    displayRowsOnPopup(category);
    $("div.popup").removeClass("invisible");
});

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;
   if (key == 27) {
       if($("div.popup").attr("class").indexOf("invisible") == -1){
           $("div.popup").addClass("invisible");
       }
       else{
           return;
       }
   }
}

function setPopupSize(){
    $("div.popup").css({
        "width" : $(window).width()+"px",
        "height": $(window).height()+"px"
    });
}

$(window).resize(function(){
    backgroundGridSetup();
    backgroundGridSetupPopup();
    setPopupSize();
});


function displayRows(){ 
    
    rows.sort(function (a,b){
            a = parseInt(a["order-num"], 10);
            b = parseInt(b["order-num"], 10);
            if (a > b)
                return 1;
            else
                if (a < b)
                    return -1;
                else
                    return 0;
        }
    );
    
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
        }

        if(rows[i]["font-size"]){
            setDescrPSizes($("div.row[order-number="+(i+1)+"]"),rows[i]["font-size"]);
        }

        
        if (i === 0){
            var whitespaceImg = '<img src="img/whitespace.png" style="float:right; margin-right:10px"></img>';
            $("div.row[order-number=1] div.row-value p").before(whitespaceImg);
        }
    }
    
    $("div.row-value").click(function(){
        
        $("div.tooltip").detach();ONPAGE

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

    prettifyValueNumbers();

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
        if ($("p", valueRows[i]).width()+10 >= $(valueRows[i]).width()){
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