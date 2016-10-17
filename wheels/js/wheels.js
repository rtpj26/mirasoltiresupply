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

	getwheels();


$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'product',
			action: 'getDistinctWheelBrand'
		}, success: function(result){
			var options = '';
			$.each(result.brand, function(i, item){
				options += '<option value="' + item.WHEEL_BRAND + '">' +item.WHEEL_BRAND + '</option>';
			});
			$('#byBrand').append(options);
		}, async: false
	})
	$('#byBrand').on('change', function(){
		if($('#byBrand').val() == ''){
			globalField = 'All';
			searchwheel('');
		}else{
			getFilteredWheel($('#byBrand').val(), globalField);
		}

		$('#byHoles').val('');
		$('#bySize').val('');
	})

	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'product',
			action: 'getDistinctWheelHoles'
		}, success: function(result){
			var options = '';
			$.each(result.holes, function(i, item){
				options += '<option value="' + item.WHEEL_HOLES + '">' +item.WHEEL_HOLES + '</option>';
			});
			$('#byHoles').append(options);
		}, async: false
	})

	$('#byHoles').on('change', function(){
		if($('#byHoles').val() == ''){
			globalField = 'All';
			searchwheel('');
		}else{
			getFilteredWheel($('#byHoles').val(), globalField);
		}

		$('#byBrand').val('');
		$('#bySize').val('');
	})



	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'product',
			action: 'getDistinctWheelSize'
		}, success: function(result){
			var options = '';
			$.each(result.rim, function(i, item){
				options += '<option value="' + item.WHEEL_RIM + '">' +item.WHEEL_RIM + '</option>';
			});
			$('#bySize').append(options);
		}, async: false
	})

	$('#bySize').on('change', function(){
		if($('#bySize').val() == ''){
			globalField = 'All';
			searchWheel('');
		}else{
			getFilteredWheel($('#bySize').val(), globalField);
		}

		$('#byBrand').val('');
		$('#byHoles').val('');
	})




	$('#byBrand').click(function(){
		//getsortedtire("TIRE_BRAND");
		globalField = "WHEEL_BRAND";
		$('#byBrand').addClass("global-field");
		$('#byHoles').removeClass("global-field");
		$('#bySize').removeClass("global-field");
	});
	
	$('#byHoles').click(function(){
		//getsortedtire("TIRE_BRAND");
		globalField = "WHEEL_HOLES";
		$('#byBrand').removeClass("global-field");
		$('#byHoles').addClass("global-field");
		$('#bySize').removeClass("global-field");
	});
	
	$('#bySize').click(function(){
		//getsortedtire("TIRE_BRAND");
		globalField = "WHEEL_RIM";
		$('#byBrand').removeClass("global-field");
		$('#byHoles').removeClass("global-field");
		$('#bySize').addClass("global-field");
	});

	$('#keyword').keyup(function(){
		if(globalField == "All"){
			searchwheel($('#keyword').val());
		}else{
			getFilteredWheel($('#keyword').val(), globalField);
		}
	});




	$('div').delegate('button.addToCart', 'click', function(e){
		e.stopImmediatePropagation();
		data_id = $(this).closest('button').attr('id');
		desc = $(this).parents().eq(0).find('.wheel-name').text();
		price = $(this).parents().eq(0).find('.wheel-price').text();
	
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
				max: $('#selected_item_max').val()
			},
			success: function(result){
				if(result.success){
					alert('Successfully Added to Cart');
					console.log(result.current_cart);
					$('#quantityInquiry').dialog('close');

				}
			},async:false
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
	function getwheels(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getWheels',
			},
			success: function(result){
				var i2 = 0;
				var html = '';
				$.each(result.productDetails, function(i, item) {
					if(i2==0){
						html +='<div class="row wheel-item" ><div class="col-md-1"></div>';
					}
					if(i2<5){
						html += '<div class="col-md-2 text-center" style="height:320px;">';
						if(item.WHEEL_IMAGE_FNAME == ''){
							html+='<img src="../assets/logo_altered_red.png"width="90px" height="90px" style="margin-top:5px;" /><br>';
						}else{
							html += '<img src="http://mirasoltiresupply.com/assets/product/wheels/'+item.WHEEL_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" data-lity/><br>';
						}
						html += '<span class="product-title wheel-name">' +  item.WHEEL_HOLES + ' ' + item.WHEEL_COLOR + ' Wheels</span><br>';
						html += '<span class="product-rim wheel-rim">' +  item.WHEEL_RIM + '</span><br>';
						html += '<span class="product-color"><strong>'+item.WHEEL_COLOR+'</strong></span><br>';
						html += '<span class="product-price wheel-price">'+item.PRODUCT_COST_PER_UNIT+'</span><br>';
						if(item.PRODUCT_STOCK <= 0){
							html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'" class="dontaddToCart" style="position: absolute; bottom: 0px;left: 16%;" >NOT AVAILABLE</button>';
						}else{
							html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'" class="addToCart" style="position: absolute; bottom: 0px;left: 16%;" >Add To Cart</button>';
						}
						html += '<span class="qtyRemaining">Remaining Qty:<span class="stock">'+item.PRODUCT_STOCK+'</span></span><br>';
						
						html += '</div>';
						i2++;
					}
					if(i2==5){
						html += '<div class="col-md-1"></div></div>';
						i2=0;
					}
				});
				$('#wheel_enum').append(html);
			}
		});
	}

	function getsortedwheels(sortType){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getWheels',
				sortby: sortType
			},
			success: function(result){
				var i = 0;
				var html = '';
				$.each(result.productDetails, function(i, item) {
					html +='<div class="tire-enum-item row"><div class="col-md-1"></div>';
					while(i<5){
						html += '<div class="col-md-2 text-center">';
						html += '<img src="http://mirasoltiresupply.com/assets/product/tires/'+item.WHEEL_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" /><br>';
						html += '<span class="product-title wheel-name">' + item.WHEEL_CODE + ' ' + item.WHEEL_HOLES + ' ' + item.WHEEL_COLOR + ' Wheels</span><br>';
						html += '<span class="product-title wheel-name">' +  item.WHEEL_RIM + '</span><br>';
						html += '<span class="product-color"><strong>'+item.WHEEL_COLOR+'</strong></span><br>';
						html += '<span class="product-price wheel-price">'+item.PRODUCT_COST_PER_UNIT+'</span><br>';
						if(item.PRODUCT_STOCK <= 0){
							html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'" class="dontaddToCart">NOT AVAILABLE</button>';
						}else{
							html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'" class="addToCart">Add To Cart</button>';
						}html += '<span class="qtyRemaining">Remaining Qty:<span class="stock">'+item.PRODUCT_STOCK+'</span></span><br>';
						html += '</div>';
						i+=1;
					}
					html += '<div class="col-md-1"></div></div>';
					$('#tire_enum').append(html);
				});
			}
		});
	}

	function searchwheel(keyword){
		$('#wheel_enum').html('');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'searchWheel',
				key: keyword,
			},
			success: function(result){
				var i2 = 0;
				var html = '';
				$.each(result.productDetails, function(i, item) {
					if(i2==0){
						html +='<div class="row wheel-item"><div class="col-md-1"></div>';
					}
					if(i2<5){
						html += '<div class="col-md-2 text-center" style="height:320px;">';
						if(item.WHEEL_IMAGE_FNAME == ''){
							html+='<img src="../assets/logo_altered_red.png"width="90px" height="90px" style="margin-top:5px;" /><br>';
						}else{
							html += '<img src="http://mirasoltiresupply.com/assets/product/wheels/'+item.WHEEL_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" data-lity/><br>';
						}
						html += '<span class="product-title wheel-name">' +  item.WHEEL_HOLES + ' ' + item.WHEEL_COLOR + ' Wheels</span><br>';
						html += '<span class="product-rim wheel-rim">' +  item.WHEEL_RIM + '</span><br>';
						html += '<span class="product-color"><strong>'+item.WHEEL_COLOR+'</strong></span><br>';
						html += '<span class="product-price wheel-price">'+item.PRODUCT_COST_PER_UNIT+'</span><br>';
						if(item.PRODUCT_STOCK <= 0){
							html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'" class="dontaddToCart" style="position: absolute; bottom: 0px;left: 16%;" >NOT AVAILABLE</button>';
						}else{
							html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'" class="addToCart" style="position: absolute; bottom: 0px;left: 16%;" >Add To Cart</button>';
						}
						html += '<span class="qtyRemaining">Remaining Qty:<span class="stock">'+item.PRODUCT_STOCK+'</span></span><br>';
						html += '</div>';
						i2++;
					}
					if(i2==5){
						html += '<div class="col-md-1"></div></div>';
						i2=0;
					}
				});
				$('#wheel_enum').append(html);
			}
		});
	}

	function getFilteredWheel(key, field){
		$('#wheel_enum').html('');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'searchWheelByField',
				key: key,
				field: field
			},
			success: function(result){
				var i2 = 0;
				var html = '';
				$.each(result.productDetails, function(i, item) {
					if(i2==0){
						html +='<div class="row wheel-item"><div class="col-md-1"></div>';
					}
					if(i2<5){
						html += '<div class="col-md-2 text-center" style="height:320px;">';
						if(item.WHEEL_IMAGE_FNAME == ''){
							html+='<img src="../assets/logo_altered_red.png"width="90px" height="90px" style="margin-top:5px;" /><br>';
						}else{
							html += '<img src="http://mirasoltiresupply.com/assets/product/wheels/'+item.WHEEL_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" data-lity/><br>';
						}
						html += '<span class="product-title wheel-name">' +  item.WHEEL_HOLES + ' ' + item.WHEEL_COLOR + ' Wheels</span><br>';
						html += '<span class="product-rim wheel-rim">' +  item.WHEEL_RIM + '</span><br>';
						html += '<span class="product-color"><strong>'+item.WHEEL_COLOR+'</strong></span><br>';
						html += '<span class="product-price wheel-price">'+item.PRODUCT_COST_PER_UNIT+'</span><br>';
						if(item.PRODUCT_STOCK <= 0){
							html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'" class="dontaddToCart" style="position: absolute; bottom: 0px;left: 16%;" >NOT AVAILABLE</button>';
						}else{
							html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'" class="addToCart" style="position: absolute; bottom: 0px;left: 16%;" >Add To Cart</button>';
						}html += '<span class="qtyRemaining">Remaining Qty:<span class="stock">'+item.PRODUCT_STOCK+'</span></span><br>';
						html += '</div>';
						i2++;
					}
					if(i2==5){
						html += '<div class="col-md-1"></div></div>';
						i2=0;
					}
				});
				$('#wheel_enum').append(html);
			}
		});
	}
})
