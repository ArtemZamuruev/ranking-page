/**
* Created with Ranking Show.
* User: ArtemZamuruev
* Date: 2016-04-13
* Time: 07:23 AM
* To change this template use Tools | Templates.
*/
function displayRowsOnPopup(category){ 
    
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
    

    var rowsToDisplayOnPopup = [];

    for (var i= 0; i < rows.length; i++){
        if (rows[i]["category"] == category){
            rowsToDisplayOnPopup.push(rows[i]);
            console.log(rows[i]);
        }
    }

    for (var i = 0; i < rowsToDisplayOnPopup.length; i++){

        var visibleValue;
        if (rowsToDisplayOnPopup[i]["val-number"]){
            visibleValue = rowsToDisplayOnPopup[i]["val-number"];
        }
        else{
            visibleValue = rowsToDisplayOnPopup[i]["value"];
        }
        
        var descrHtml = '<p>'+rowsToDisplayOnPopup[i]["name"]+'</p>';

        var rowHTML = '\
            <div class="row '+rowsToDisplayOnPopup[i]["category"]+'" order-number="'+(i+1)+'">\
                <div class="row-description">'+descrHtml+'</p></div>\
                <div class="row-value" value="'+rowsToDisplayOnPopup[i]["value"]+'"><p>'+visibleValue+'</p></div>\
            </div>\
        ';
        $("div.popup-rows-stack").append(rowHTML);
        
        var rowLengthInPercent = ((rowsToDisplayOnPopup[i]["value"]*0.9*0.55)/0.4)*100;
        
        $("div.row[order-number="+(i+1)+"] div.row-value").css({"width": rowLengthInPercent+"%"});

        if(rowsToDisplayOnPopup[i]["font-size"]){
            setDescrPSizes($("div.row[order-number="+(i+1)+"]"),rowsToDisplayOnPopup[i]["font-size"]);
        }

        // Добавление белой волнистой полосы на первой строке графика        
        // if (i === 0){
        //     var whitespaceImg = '<img src="img/whitespace.png" style="float:right; margin-right:10px"></img>';
        //     $("div.row[order-number=1] div.row-value p").before(whitespaceImg);
        // }

    }
    

    prettifyValueNumbers();

    // $("div.row-value").click(function(){
        
    //     $("div.tooltip").detach();

    //     var category = $($(this).parent()).attr("class").split(" ")[1];
        
    //     var popupHtml = '\
    //         <div class="tooltip '+category+'">\
    //             <p>'+rows[$($(this).parent()).attr("order-number")-1]["name"]+'</p>\
    //         </div>\
    //     ';
    //     $("body").append(popupHtml);
        
    //     $("div.tooltip").click(function(){
    //         $(this).detach();
    //     });       
    // });
}

function backgroundGridSetupPopup(){
    var screenHeight = $(window).height();
    var screenWidth = $(window).width();
    
    $("div.grid-background-popup").css({"height" : screenHeight-50});
    $("div.vertical-line-popup").css({"margin-left" : (screenWidth-74)/13+"px"});
    $("div.vertical-line-popup:nth-child(1)").css({"margin-left" : "30px"});
    
}

function clearPopupRowsStack(){
    $("div.popup-rows-stack").empty();
}