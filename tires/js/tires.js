$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	var globalField = "All";
	gettire();

	$('#byBrand').click(function(){
		//getsortedtire("TIRE_BRAND");
		globalField = "TIRE_BRAND";
		$('#byBrand').addClass("global-field");
		$('#bySize').removeClass("global-field");
		$('#byDesign').removeClass("global-field");
	});
	
	$('#bySize').click(function(){
		//getsortedtire("TIRE_SIZE");
		globalField = "TIRE_SIZE";
		$('#byBrand').removeClass("global-field");
		$('#bySize').addClass("global-field");
		$('#byDesign').removeClass("global-field");
	});

	$('#byDesign').click(function(){
		//getsortedtire("TIRE_DESIGN");
		globalField = "TIRE_DESIGN";
		$('#byBrand').removeClass("global-field");
		$('#bySize').removeClass("global-field");
		$('#byDesign').addClass("global-field");
	});

	$('#keyword').keyup(function(){
		if(globalField == "All"){
			searchtire($('#keyword').val());
		}else{
			getFilteredTire($('#keyword').val(), globalField);
		}
	});

	$('div').delegate('button.addToCart', 'click', function(e){
		e.stopImmediatePropagation();
		data_id = $(this).closest('button').attr('id');
		tire_detail = $(this).parents().eq(2).find('.tire-name').text();
		desc = tire_detail.split('Php')[0];
		price = tire_detail.split('Php')[1];
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

	function searchtire(keyword){
		$('#tire_enum').html('');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'searchTire',
				key: keyword,
			},
			success: function(result){
				$.each(result.productDetails, function(i, item) {
					var html='<div class="tire-enum-item row">';
					html+='<div class="col-md-2"><img src="/mirasoltiresupply/assets/product/tires/'+item.TIRE_IMAGE_FNAME+'" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" /></div>';
					html+='<div class="col-md-10">';
					html+='<div class="tire-name"><strong>'+ item.TIRE_BRAND + ' ' + item.TIRE_SIZE+'/'+item.TIRE_RIM + ' ' + item.TIRE_DESIGN+'<span style="float:right">Php ' + item.PRODUCT_COST_PER_UNIT+ '</strong></span></div>';
					html+='<div class="details"><strong>TIRE SPECS</strong></div>';
					html+='<div class="details"><strong>Size:</strong>' + item.TIRE_SIZE+'/'+item.TIRE_RIM + '</div>';
					html+='<div class="details"><strong>UTQG:</strong></div>';
					html+='<div class="details"><strong>Speed Rating:</strong></div>';
					html+='<div class="details"><strong>Load Rating:</strong></div>';
					html+='<div class="details"><strong>Warranty:</strong><button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID +'" class="addToCart">ADD TO CART</button></div>';
					html+='</div></div>';
					$('#tire_enum').append(html);
				});
			}
		});
	}

	function gettire(){
		$('#tire_enum').html('');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getTires',
			},
			success: function(result){
				$.each(result.productDetails, function(i, item) {
					var html='<div class="tire-enum-item row">';
					html+='<div class="col-md-2"><img src="/mirasoltiresupply/assets/product/tires/'+item.TIRE_IMAGE_FNAME+'" width="125px" height="90px" style="margin-top:5px;" /></div>';
					html+='<div class="col-md-10">';
					html+='<div class="tire-name"><strong>'+ item.TIRE_BRAND + ' ' + item.TIRE_SIZE+'/'+item.TIRE_RIM + ' ' + item.TIRE_DESIGN+'<span style="float:right">Php ' + item.PRODUCT_COST_PER_UNIT+ '</strong></span></div>';
					html+='<div class="details"><strong>TIRE SPECS</strong></div>';
					html+='<div class="details"><strong>Size:</strong>' + item.TIRE_SIZE+'/'+item.TIRE_RIM + '</div>';
					html+='<div class="details"><strong>UTQG:</strong></div>';
					html+='<div class="details"><strong>Speed Rating:</strong></div>';
					html+='<div class="details"><strong>Load Rating:</strong></div>';
					html+='<div class="details"><strong>Warranty:</strong><button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID+'" class="addToCart">ADD TO CART</button></div>';
					html+='</div></div>';
					$('#tire_enum').append(html);
				});
			}
		});
	}

	function getsortedtire(sortType){
		$('#tire_enum').html('');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getTires',
				sortby: sortType
			},
			success: function(result){
				$('#tire_enum').html('');
				$.each(result.productDetails, function(i, item) {
					var html='<div class="tire-enum-item row">';
					html+='<div class="col-md-2"><img src="/mirasoltiresupply/assets/product/tires/'+item.TIRE_IMAGE_FNAME+'" width="125px" height="90px" style="margin-top:5px;" /></div>';
					html+='<div class="col-md-10">';
					html+='<div class="tire-name"><strong>'+ item.TIRE_BRAND + ' ' +  item.TIRE_SIZE+'/'+item.TIRE_RIM + ' ' + item.TIRE_DESIGN+'<span style="float:right">Php ' + item.PRODUCT_COST_PER_UNIT+ '</strong></span></div>';
					html+='<div class="details"><strong>TIRE SPECS</strong></div>';
					html+='<div class="details"><strong>Size:</strong>' + item.TIRE_SIZE+'/'+item.TIRE_RIM + '</div>';
					html+='<div class="details"><strong>UTQG:</strong></div>';
					html+='<div class="details"><strong>Speed Rating:</strong></div>';
					html+='<div class="details"><strong>Load Rating:</strong></div>';
					html+='<div class="details"><strong>Warranty:</strong><button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID+'" class="addToCart">ADD TO CART</button></div>';
					html+='</div></div>';
					$('#tire_enum').append(html);
				});
			}
		});
	}

	function getFilteredTire(key, field){
		$('#tire_enum').html('');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'searchTireByField',
				key: key,
				field: field
			},
			success: function(result){
				$('#tire_enum').html('');
				$.each(result.productDetails, function(i, item) {
					var html='<div class="tire-enum-item row">';
					html+='<div class="col-md-2"><img src="/mirasoltiresupply/assets/product/tires/'+item.TIRE_IMAGE_FNAME+'" width="125px" height="90px" style="margin-top:5px;" /></div>';
					html+='<div class="col-md-10">';
					html+='<div class="tire-name"><strong>'+ item.TIRE_BRAND + ' ' +  item.TIRE_SIZE+'/'+item.TIRE_RIM + ' ' + item.TIRE_DESIGN+'<span style="float:right">Php ' + item.PRODUCT_COST_PER_UNIT+ '</strong></span></div>';
					html+='<div class="details"><strong>TIRE SPECS</strong></div>';
					html+='<div class="details"><strong>Size:</strong>' + item.TIRE_SIZE+'/'+item.TIRE_RIM + '</div>';
					html+='<div class="details"><strong>UTQG:</strong></div>';
					html+='<div class="details"><strong>Speed Rating:</strong></div>';
					html+='<div class="details"><strong>Load Rating:</strong></div>';
					html+='<div class="details"><strong>Warranty:</strong><button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID+'" class="addToCart">ADD TO CART</button></div>';
					html+='</div></div>';
					$('#tire_enum').append(html);
				});
			}
		});
	}
})
