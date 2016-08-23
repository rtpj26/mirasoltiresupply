$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	getbattery();


	function getbattery(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getBatteries',
			},
			success: function(result){
				var html  = '';
				var i = 0;
				$.each(result.productDetails, function(i, item) {
					if(i==0){
						html +='<div class="tire-enum-item row"><div class="col-md-1"></div>';
					}
						html += '<div class="col-md-2 text-center">';
						html += '<img src="/mirasoltiresupply/assets/product/batteries/'+item.BATTERY_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" /><br>';
						html += '<span class="product-title">' + item.BATTERY_TYPE + '</span><br>';
						html += '<a href="#" data-toggle="tooltip" data-placement="right" title="' + item.BATTERY_TYPE + '">View Details</a>';
						html += '</div>';
						i+=1;
					
					if(i==5){
						html += '<div class="col-md-1"></div></div>';
						i=0;
					}
					$('#batt_enum').append(html);
				});
			}
		});
	}

	function getsortedbattery(sortType){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getTires',
				sortby: sortType
			},
			success: function(result){
				$.each(result.productDetails, function(i, item) {
					html +='<div class="tire-enum-item row"><div class="col-md-1"></div>';
					while(i<5){
						html += '<div class="col-md-2 text-center">';
						html += '<img src="/mirasoltiresupply/assets/product/battery/'+item.WHEEL_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" /><br>';
						html += '<span class="product-title">' + item.BATTERY_TYPE + '</span><br>';
						html += '<div class="tooltip">View Details';
						html += '<span class="tooltiptext">Tooltip text</span>';
						html += '</div></div>';
					}
					html += '<div class="col-md-1"></div></div>';
					$('#batt_enum').append(html);
				});
			}
		});
	}
})
