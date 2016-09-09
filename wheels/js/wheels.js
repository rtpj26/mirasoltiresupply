$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	var globalField = "All";
	getwheels();

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
		alert(desc);
		alert(price);
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
						html +='<div class="row wheel-item"><div class="col-md-1"></div>';
					}
					if(i2<5){
						html += '<div class="col-md-2 text-center">';
						html += '<img src="/mirasoltiresupply/assets/product/wheels/'+item.WHEEL_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" /><br>';
						html += '<span class="product-title wheel-name">' +  item.WHEEL_HOLES + ' ' + item.WHEEL_COLOR + ' Wheels</span><br>';
						html += '<span class="product-color"><strong>'+item.WHEEL_COLOR+'</strong></span><br>';
						html += '<span class="product-price wheel-price">'+item.PRODUCT_COST_PER_UNIT+'</span><br>';
						html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'" class="addToCart">Add To Cart</button>';
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
						html += '<img src="/mirasoltiresupply/assets/product/tires/'+item.WHEEL_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" /><br>';
						html += '<span class="product-title wheel-name">' + item.WHEEL_CODE + ' ' + item.WHEEL_HOLES + ' ' + item.WHEEL_COLOR + ' Wheels</span><br>';
						html += '<span class="product-color"><strong>'+item.WHEEL_COLOR+'</strong></span><br>';
						html += '<span class="product-price wheel-price">'+item.PRODUCT_COST_PER_UNIT+'</span><br>';
						html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'"  class="addToCart>Add To Cart</button>';
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
						html += '<div class="col-md-2 text-center">';
						html += '<img src="/mirasoltiresupply/assets/product/wheels/'+item.WHEEL_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" /><br>';
						html += '<span class="product-title wheel-name">' + item.WHEEL_HOLES + ' ' + item.WHEEL_COLOR + ' Wheels</span><br>';
						html += '<span class="product-color"><strong>'+item.WHEEL_COLOR+'</strong></span><br>';
						html += '<span class="product-price wheel-price">'+item.PRODUCT_COST_PER_UNIT+'</span><br>';
						html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'" class="addToCart">Add To Cart</button>';
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
						html += '<div class="col-md-2 text-center">';
						html += '<img src="/mirasoltiresupply/assets/product/wheels/'+item.WHEEL_IMAGE_FNAME+'" width="90px" height="90px" style="margin-top:5px;" /><br>';
						html += '<span class="product-title wheel-name">' + item.WHEEL_HOLES + ' ' + item.WHEEL_COLOR + ' Wheels</span><br>';
						html += '<span class="product-color"><strong>'+item.WHEEL_COLOR+'</strong></span><br>';
						html += '<span class="product-price wheel-price">'+item.PRODUCT_COST_PER_UNIT+'</span><br>';
						html += '<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.WHEEL_ID+'" class="addToCart">Add To Cart</button>';
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
