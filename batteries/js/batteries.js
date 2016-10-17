$(function(){
	var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";
	var globalField = "All";

	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'account_control',
			action: 'checkSessionLoggedIn'
		}, success: function(result){
			if(result.isAdmin){
				window.location.replace("http://mirasoltiresupply.com/admin/");
			}
		}, async: false
	})
	
	getbattery();


		$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'product',
			action: 'getDistinctBatteryBrand'
		}, success: function(result){
			var options = '';
			$.each(result.brand, function(i, item){
				options += '<option value="' + item.brand + '">' + item.brand + '</option>';
			});
			$('#byBrand').append(options);
		}, async: false
	})
	$('#byBrand').on('change', function(){
		if($('#byBrand').val() == ''){
			globalField = 'All';
			searchbattery('');
		}else{
			getFilteredBattery($('#byBrand').val(), globalField);
		}

		$('#byPlates').val('');
	})

	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'product',
			action: 'getDistinctBatteryPlates'
		}, success: function(result){
			var options = '';
			$.each(result.plate, function(i, item){
				options += '<option value="' + item.BATTERY_PLATES + '">' +item.BATTERY_PLATES + '</option>';
			});
			$('#byPlates').append(options);
		}, async: false
	})

	$('#byPlates').on('change', function(){
		if($('#byPlates').val() == ''){
			globalField = 'All';
			searchBattery('');
		}else{
			getFilteredBattery($('#byPlates').val(), globalField);
		}

		$('#byBrand').val('');
	})


	$('#byBrand').click(function(){
		//getsortedtire("TIRE_BRAND");
		globalField = "BATTERY_DESCRIPTION";
		$('#byBrand').addClass("global-field");
		$('#byPlates').removeClass("global-field");
	});
	
	$('#byPlates').click(function(){
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

	$('div').delegate('button.addToCart', 'click', function(e){
		e.stopImmediatePropagation();
		data_id = $(this).closest('button').attr('id');
		desc = $(this).parents().eq(0).find('.battery-desc').text();
		price = $(this).parents().eq(0).find('.battery-price').text();
		data_type = data_id.split('-')[1];
		product_id = data_id.split('-')[3];
		item_id = data_id.split('-')[5];


		$('#selected_id').val(data_id);
		$('#selected_desc').val(desc);
		$('#selected_price').val(price);
		$('#selected_type').val(data_type);
		$('#selected_prod_id').val(product_id);
		$('#selected_item_id').val(item_id);
		$('#selected_item_max').val($(this).parents().eq(0).find('.stock').text());
		$('#qtyPurchased').val('1');
		$('#qtyPurchased').attr('max', $(this).parents().eq(0).find('.stock').text());
		$('#quantityInquiry').dialog({
			width: '400px'
		});

	});

	

	$('#sendToCart').click(function(){		

		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'session',
				action: 'addtocart',
				product_type:  $('#selected_type').val(),
				product_id: $('#selected_prod_id').val(),
				item_id: $('#selected_item_id').val(),
				desc: $('#selected_desc').val(),
				price: $('#selected_price').val(),
				qty: $('#qtyPurchased').val(),
				max:$('#selected_item_max').val()
			},
			success: function(result){
				if(result.success){
					alert('Successfully Added to Cart');
					console.log(result.current_cart);
					$('#quantityInquiry').dialog('close');
				}
			},async: false
		});

		$.ajax({
        type: 'POST',
        url: ajaxURL,
        data:{
            type: 'session',
            action: 'countCart'
        }, success: function(result){
            $('#cart_count').text(result.qty);
        }
    })

	})

	$('#cancel').click(function(){
		$('#quantityInquiry').dialog('close');
	})


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
				$('#batt_enum').html(html);
				var i2 = 0;
				$.each(result.productDetails, function(i, item) {
					if(i2==0){
						html +='<div class="row"><div class="col-md-1"></div>';
					}
					html += '<div class="col-md-2 text-center" style="height:250px;">';
					if(item.BATTERY_IMAGE_FNAME==''){
						html+='<img src="../assets/logo_altered_red.png" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" /><br>';
					}else{
						html += '<img src="http://mirasoltiresupply.com/assets/product/batteries/'+item.BATTERY_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" data-lity/><br>';
					}html += '<span class="product-title battery-desc">' + item.BATTERY_PLATES + '-Plate ' +  item.BATTERY_DESCRIPTION + '</span><br>';
					html += '<span class="product-price battery-price"><strong>' + item.PRODUCT_COST_PER_UNIT+ '</strong></span><br>';
					if(item.PRODUCT_STOCK <= 0){
							html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.BATTERY_ID +'" class="dontaddToCart" style="position: absolute; bottom: 0px;left: 13%;">NOT AVAILABLE</button>';
					}else{
						html += '<button href="#" id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.BATTERY_ID +'" class="addToCart" style="position: absolute; bottom: 0px;left: 13%;">ADD TO CART</button>';
					}
					html += '<span class="qtyRemaining">Remaining Qty:<span class="stock">'+item.PRODUCT_STOCK+'</span></span><br>';
						
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
						html += '<img src="http://mirasoltiresupply.com/assets/product/battery/'+item.WHEEL_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" /><br>';
						html += '<span class="product-title">' + item.BATTERY_TYPE + '</span><br>';
						html += '<div class="tooltip">View Details';
						html += '<span class="tooltiptext">Tooltip text</span>';
						html += '</div></div>';
					}html += '<span class="qtyRemaining">Remaining Qty:<span class="stock">'+item.PRODUCT_STOCK+'</span></span><br>';
						
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
				$('#batt_enum').html(html);
				var i2 = 0;
				$.each(result.productDetails, function(i, item) {
					if(i2==0){
						html +='<div class="row"><div class="col-md-1"></div>';
					}
					html += '<div class="col-md-2 text-center" style="height:250px;">';
					if(item.BATTERY_IMAGE_FNAME==''){
						html+='<img src="../assets/logo_altered_red.png" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" /><br>';
					}else{
						html += '<img src="http://mirasoltiresupply.com/assets/product/batteries/'+item.BATTERY_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" data-lity/><br>';
					}html += '<span class="product-title battery-desc">' + item.BATTERY_PLATES + '-Plate ' +  item.BATTERY_DESCRIPTION + '</span><br>';
					html += '<span class="product-price battery-price"><strong>' + item.PRODUCT_COST_PER_UNIT+ '</strong></span><br>';
					if(item.PRODUCT_STOCK <= 0){
							html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.BATTERY_ID +'" class="dontaddToCart" style="position: absolute; bottom: 0px;left: 13%;">NOT AVAILABLE</button>';
					}else{
						html += '<button href="#" id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.BATTERY_ID +'" class="addToCart" style="position: absolute; bottom: 0px;left: 13%;">ADD TO CART</button>';
					}html += '<span class="qtyRemaining">Remaining Qty:<span class="stock">'+item.PRODUCT_STOCK+'</span></span><br>';
						
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
				$('#batt_enum').html(html);
				var i2 = 0;
				$.each(result.productDetails, function(i, item) {
					if(i2==0){
						html +='<div class="row"><div class="col-md-1"></div>';
					}
					html += '<div class="col-md-2 text-center" style="height:250px;">';
					if(item.BATTERY_IMAGE_FNAME==''){
						html+='<img src="../assets/logo_altered_red.png" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" /><br>';
					}else{
						html += '<img src="http://mirasoltiresupply.com/assets/product/batteries/'+item.BATTERY_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" data-lity/><br>';
					}html += '<span class="product-title battery-desc">' + item.BATTERY_PLATES + '-Plate ' + item.BATTERY_DESCRIPTION + '</span><br>';
					html += '<span class="product-price battery-price"><strong>' + item.PRODUCT_COST_PER_UNIT+ '</strong></span><br>';
					if(item.PRODUCT_STOCK <= 0){
							html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.BATTERY_ID +'" class="dontaddToCart" style="position: absolute; bottom: 0px;left: 13%;">NOT AVAILABLE</button>';
					}else{
						html += '<button href="#" id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.BATTERY_ID +'" class="addToCart" style="position: absolute; bottom: 0px;left: 13%;">ADD TO CART</button>';
					}html += '<span class="qtyRemaining">Remaining Qty:<span class="stock">'+item.PRODUCT_STOCK+'</span></span><br>';
						
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
