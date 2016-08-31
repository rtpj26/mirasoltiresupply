$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	gettire();

	$('#byBrand').click(function(){
		getsortedtire("TIRE_BRAND");
	});
	
	$('#bySize').click(function(){
		getsortedtire("TIRE_SIZE");
	});

	$('#byDesign').click(function(){
		getsortedtire("TIRE_DESIGN");
	});

	$('#keyword').keydown(function(){
		searchtire($('#keyword').val());
	})

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
					html+='<div class="col-md-2"><img src="/mirasoltiresupply/assets/product/tires/'+item.TIRE_IMAGE_FNAME+'" width="125px" height="90px" style="margin-top:5px;" /></div>';
					html+='<div class="col-md-10">';
					html+='<div class="tire-name"><strong>'+ item.TIRE_BRAND + ' ' + item.TIRE_SIZE+'/'+item.TIRE_RIM + ' ' + item.TIRE_DESIGN+'<span style="float:right">Php ' + item.PRODUCT_COST_PER_UNIT+ '</strong></span></div>';
					html+='<div class="details"><strong>TIRE SPECS</strong></div>';
					html+='<div class="details"><strong>Size:</strong>' + item.TIRE_SIZE+'/'+item.TIRE_RIM + '</div>';
					html+='<div class="details"><strong>UTQG:</strong></div>';
					html+='<div class="details"><strong>Speed Rating:</strong></div>';
					html+='<div class="details"><strong>Load Rating:</strong></div>';
					html+='<div class="details"><strong>Warranty:</strong><button id="type-'+item.PRODUCT_TYPE+'-item-'+item.PRODUCT_ID+'" class="addToCart">ADD TO CART</button></div>';
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
					html+='<div class="details"><strong>Warranty:</strong><button id="type-'+item.PRODUCT_TYPE+'-item-'+item.PRODUCT_ID+'" class="addToCart">ADD TO CART</button></div>';
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
					html+='<div class="details"><strong>Warranty:</strong><button id="type-'+item.PRODUCT_TYPE+'-item-'+item.PRODUCT_ID+'" class="addToCart">ADD TO CART</button></div>';
					html+='</div></div>';
					$('#tire_enum').append(html);
				});
			}
		});
	}
})
