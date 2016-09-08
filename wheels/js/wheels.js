$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	
	getwheels();


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
						html += '<span class="product-title">' + item.WHEEL_CODE + ' ' + item.WHEEL_HOLES + ' ' + item.WHEEL_COLOR + ' Wheels</span><br>';
						html += '<span class="product-color"><strong>'+item.WHEEL_COLOR+'</strong></span><br>';
						html += '<span class="product-price">'+item.PRODUCT_COST_PER_UNIT+'</span><br>';
						html += '<button class="addToCart">Add To Cart</button>';
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
						html += '<span class="product-title">' + item.WHEEL_CODE + ' ' + item.WHEEL_HOLES + ' ' + item.WHEEL_COLOR + ' Wheels</span><br>';
						html += '<span class="product-color"><strong>'+item.WHEEL_COLOR+'</strong></span><br>';
						html += '<span class="product-price">'+item.PRODUCT_COST_PER_UNIT+'</span><br>';
						html += '<button class="addToCart>Add To Cart</button>';
						html += '</div>';
						i+=1;
					}
					html += '<div class="col-md-1"></div></div>';
					$('#tire_enum').append(html);
				});
			}
		});
	}
})
