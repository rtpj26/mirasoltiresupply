$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	var globalField = "All";
	getbattery();

	$('#byBrand').click(function(){
		//getsortedtire("TIRE_BRAND");
		globalField = "BATTERY_DESCRIPTION";
		$('#byBrand').addClass("global-field");
		$('#byPlates').removeClass("global-field");
	});
	
	$('#bySize').click(function(){
		//getsortedtire("TIRE_SIZE");
		globalField = "BATTERY_PLATES";
		$('#byBrand').removeClass("global-field");
		$('#byPlates').addClass("global-field");
	});

	$('#keyword').keyup(function(){
		if(globalField == "All"){
			searchbattery($('#keyword').val());
		}else{
			getFilteredBattery($('#keyword').val(), globalField);
		}
	});

	$('div').delegate('a.addToCart', 'click', function(e){
		e.stopImmediatePropagation();
		data_id = $(this).closest('a').attr('id');
		desc = $(this).parents().eq(0).find('.battery-desc').text();
		price = $(this).parents().eq(0).find('.battery-price').text();
		data_type = data_id.split('-')[1];
		product_id = data_id.split('-')[3];
		item_id = data_id.split('-')[5];
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'session',
				action: 'addtocart',
				product_type:  data_type,
				product_id: product_id,
				item_id: item_id,
				desc: desc,
				price: price
			},
			success: function(result){
				if(result.success){
					alert('Successfully Added to Cart');
					console.log(result.current_cart);
				}
			}
		});
	});

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
				var i2 = 0;
				$.each(result.productDetails, function(i, item) {
					if(i2==0){
						html +='<div class="row"><div class="col-md-1"></div>';
					}
					html += '<div class="col-md-2 text-center">';
					html += '<img src="/mirasoltiresupply/assets/product/batteries/'+item.BATTERY_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" /><br>';
					html += '<span class="product-title battery-desc">' + item.BATTERY_DESCRIPTION + '</span><br>';
					html += '<span class="product-price battery-price"><strong>' + item.PRODUCT_COST_PER_UNIT+ '</strong></span><br>';
					html += '<a href="#" id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.BATTERY_ID +'" class="addToCart" >Add To Cart</a>';
					html += '</div>';
					i2+=1;
					
					if(i2==5){
						html += '<div class="col-md-1"></div></div>';
						i2=0;
					}
					
				});
				$('#batt_enum').append(html);
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

	function searchbattery(keyword){
		$('#batt_enum').html('');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'searchBattery',
				key: keyword,
			},
			success: function(result){
				var html  = '';
				var i2 = 0;
				$.each(result.productDetails, function(i, item) {
					if(i2==0){
						html +='<div class="row"><div class="col-md-1"></div>';
					}
					html += '<div class="col-md-2 text-center">';
					html += '<img src="/mirasoltiresupply/assets/product/batteries/'+item.BATTERY_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" /><br>';
					html += '<span class="product-title battery-desc">' + item.BATTERY_DESCRIPTION + '</span><br>';
					html += '<span class="product-price battery-price"><strong>' + item.PRODUCT_COST_PER_UNIT+ '</strong></span><br>';
					html += '<a href="#" id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.BATTERY_ID +'" class="addToCart" >Add To Cart</a>';
					html += '</div>';
					i2+=1;
					
					if(i2==5){
						html += '<div class="col-md-1"></div></div>';
						i2=0;
					}
					
				});
				$('#batt_enum').append(html);
			}
		});
	}

	function getFilteredBattery(key, field){
		$('#batt_enum').html('');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'searchBatteryByField',
				key: key,
				field: field
			},
			success: function(result){
				var html  = '';
				var i2 = 0;
				$.each(result.productDetails, function(i, item) {
					if(i2==0){
						html +='<div class="row"><div class="col-md-1"></div>';
					}
					html += '<div class="col-md-2 text-center">';
					html += '<img src="/mirasoltiresupply/assets/product/batteries/'+item.BATTERY_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" /><br>';
					html += '<span class="product-title battery-desc">' + item.BATTERY_DESCRIPTION + '</span><br>';
					html += '<span class="product-price battery-price"><strong>' + item.PRODUCT_COST_PER_UNIT+ '</strong></span><br>';
					html += '<a href="#" id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.BATTERY_ID +'" class="addToCart" >Add To Cart</a>';
					html += '</div>';
					i2+=1;
					
					if(i2==5){
						html += '<div class="col-md-1"></div></div>';
						i2=0;
					}
					
				});
				$('#batt_enum').append(html);
			}
		});
	}
})
