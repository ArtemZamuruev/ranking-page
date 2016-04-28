/**
* Created with Ranking Show.
* User: ArtemZamuruev
* Date: 2016-04-13
* Time: 07:23 AM
* To change this template use Tools | Templates.
*/
function displayRowsOnPopup(){ 
    
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

function backgroundGridSetupPopup(){
    var screenHeight = $(window).height();
    var screenWidth = $(window).width();
    
    $("div.grid-background-popup").css({"height" : screenHeight-50});
    $("div.vertical-line-popup").css({"margin-left" : (screenWidth-74)/13+"px"});
    $("div.vertical-line-popup:nth-child(1)").css({"margin-left" : "30px"});
    
}