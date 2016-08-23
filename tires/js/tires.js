$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	gettire();


	$('#bySize').click(function(){
		getsortedtire("TIRE_SIZE");
	});

	$('#byDesign').click(function(){
		getsortedtire("TIRE_DESIGN");
	});
	function gettire(){
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
					html+='<div class="tire-name"><strong>'+ item.TIRE_SIZE+'/'+item.TIRE_RIM + ' ' + item.TIRE_DESIGN+'<span style="float:right">Php ' + item.PRODUCT_COST_PER_UNIT+ '</strong></span></div>';
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
					html+='<div class="tire-name"><strong>'+ item.TIRE_SIZE+'/'+item.TIRE_RIM + ' ' + item.TIRE_DESIGN+'<span style="float:right">Php ' + item.PRODUCT_COST_PER_UNIT+ '</strong></span></div>';
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
