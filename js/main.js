var valLengthPercent = 0.55;

$(document).ready(function(){
	for (var i = 0; i < rows.length; i++){

		//var rowObject = new Object();

		var rowHTML = '\
			<div class="row '+rows[i]["category"]+'" order-number="'+(i+1)+'">\
				<div class="row-description"><p>'+rows[i]["name"]+'</p></div>\
				<div class="row-value" value="'+rows[i]["value"]+'"></div>\
			</div>\
		';

		//$(rowObject).html(rowHTML);

		$("div.rows-stack").append(rowHTML);

		var rowLength = (rows[i]["value"]*valLengthPercent)*100;

		//alert(rowLength);

		$("div.row[order-number="+(i+1)+"] div.row-value").css({"width": rowLength+"%"});

	}
});