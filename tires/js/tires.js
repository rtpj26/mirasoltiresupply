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
	gettire();

	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'product',
			action: 'getDistinctTireBrand'
		}, success: function(result){
			var options = '';
			$.each(result.brand, function(i, item){
				options += '<option value="' + item.TIRE_BRAND + '">' +item.TIRE_BRAND + '</option>';
			});
			$('#byBrand').append(options);
		}, async: false
	})
	$('#byBrand').on('change', function(){
		if($('#byBrand').val() == ''){
			globalField = 'All';
			searchtire('');
		}else{
			getFilteredTire($('#byBrand').val(), globalField);
		}

		$('#bySize').val('');
		$('#byDesign').val('');
	})

	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'product',
			action: 'getDistinctTireSize'
		}, success: function(result){
			var options = '';
			$.each(result.sizes, function(i, item){
				options += '<option value="' + item.TIRE_SIZE + '">' +item.TIRE_SIZE + '</option>';
			});
			$('#bySize').append(options);
		}, async: false
	})

	$('#bySize').on('change', function(){
		if($('#bySize').val() == ''){
			globalField = 'All';
			searchtire('');
		}else{
			getFilteredTire($('#bySize').val(), globalField);
		}

		$('#byBrand').val('');
		$('#byDesign').val('');
	})



	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'product',
			action: 'getDistinctTireDesign'
		}, success: function(result){
			var options = '';
			$.each(result.design, function(i, item){
				options += '<option value="' + item.TIRE_DESIGN + '">' +item.TIRE_DESIGN + '</option>';
			});
			$('#byDesign').append(options);
		}, async: false
	})

	$('#byDesign').on('change', function(){
		if($('#byDesign').val() == ''){
			globalField = 'All';
			searchtire('');
		}else{
			getFilteredTire($('#byDesign').val(), globalField);
		}

		$('#byBrand').val('');
		$('#bySize').val('');
	})


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

		$('#selected_id').val(data_id);
		$('#selected_desc').val(desc);
		$('#selected_price').val(price);
		$('#selected_type').val(data_type);
		$('#selected_prod_id').val(product_id);
		$('#selected_item_id').val(item_id);
		$('#selected_item_max').val($(this).parents().eq(2).find('.itemQty').text());
		$('#qtyPurchased').attr('max', $(this).parents().eq(2).find('.itemQty').text());
		$('#qtyPurchased').val('1');
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
					var html='<div class="tire-enum-item row" >';
					if(item.TIRE_IMAGE_FNAME == ''){
						html+='<div class="col-md-2"><img src="../assets/logo_altered_red.png" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" /></div>';
					}else{
						html+='<div class="col-md-2"><img src="../assets/product/tires/'+item.TIRE_IMAGE_FNAME+'" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" data-lity/></div>';
					}
					html+='<div class="col-md-10">';
					html+='<div class="tire-name"><strong>'+ item.TIRE_BRAND + ' ' + item.TIRE_SIZE+'/'+item.TIRE_RIM + ' ' + item.TIRE_DESIGN+'<span style="float:right">Php ' + item.PRODUCT_COST_PER_UNIT+ '</strong></span></div>';
					html+='<div class="details"><strong>Brand:</strong>' + item.TIRE_BRAND + '</div>';
					html+='<div class="details"><strong>Size:</strong>' + item.TIRE_SIZE+'/'+item.TIRE_RIM + '</div>';
					html+='<div class="details"><strong>LI/SS:</strong>' + item.TIRE_LI_SS + '</div>';
					html+='<div class="details"><strong>DESIGN:</strong>' + item.TIRE_DESIGN + '</div>';
					html+='<div class="details"><strong>REMAINING QTY:</strong><span class="itemQty">' + item.PRODUCT_STOCK + '</span></div>';
					html+='<div class="details"><strong>&nbsp</strong>'
					if(item.PRODUCT_STOCK <= 0){
						html+='<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID +'" class="dontaddToCart" style="background-color:#ccc;">NOT AVAILABLE</button></div>';
					}else{
						html+='<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID +'" class="addToCart">ADD TO CART</button></div>';
					}
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
					if(item.TIRE_IMAGE_FNAME == ''){
						html+='<div class="col-md-2"><img src="../assets/logo_altered_red.png" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" /></div>';
					}else{
						html+='<div class="col-md-2"><img src="../assets/product/tires/'+item.TIRE_IMAGE_FNAME+'" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" data-lity/></div>';
					}html+='<div class="col-md-10">';
					html+='<div class="tire-name"><strong>'+ item.TIRE_BRAND + ' ' + item.TIRE_SIZE+'/'+item.TIRE_RIM + ' ' + item.TIRE_DESIGN+'<span style="float:right">Php ' + item.PRODUCT_COST_PER_UNIT+ '</strong></span></div>';
					html+='<div class="details"><strong>Brand:</strong>' + item.TIRE_BRAND + '</div>';
					html+='<div class="details"><strong>Size:</strong>' + item.TIRE_SIZE+'/'+item.TIRE_RIM + '</div>';
					html+='<div class="details"><strong>LI/SS:</strong>' + item.TIRE_LI_SS + '</div>';
					html+='<div class="details"><strong>DESIGN:</strong>' + item.TIRE_DESIGN + '</div>';
					html+='<div class="details"><strong>REMAINING QTY:</strong><span class="itemQty">' + item.PRODUCT_STOCK + '</span></div>';
					html+='<div class="details"><strong>&nbsp</strong>'
					if(item.PRODUCT_STOCK <= 0){
						html+='<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID +'" class="dontaddToCart" style="background-color:#ccc;">NOT AVAILABLE</button></div>';
					}else{
						html+='<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID +'" class="addToCart">ADD TO CART</button></div>';
					}
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
					if(item.TIRE_IMAGE_FNAME == ''){
						html+='<div class="col-md-2"><img src="../assets/logo_altered_red.png" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" /></div>';
					}else{
						html+='<div class="col-md-2"><img src="../assets/product/tires/'+item.TIRE_IMAGE_FNAME+'" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" data-lity/></div>';
					}html+='<div class="col-md-10">';
					html+='<div class="tire-name"><strong>'+ item.TIRE_BRAND + ' ' +  item.TIRE_SIZE+'/'+item.TIRE_RIM + ' ' + item.TIRE_DESIGN+'<span style="float:right">Php ' + item.PRODUCT_COST_PER_UNIT+ '</strong></span></div>';
					html+='<div class="details"><strong>Brand:</strong>' + item.TIRE_BRAND + '</div>';
					html+='<div class="details"><strong>Size:</strong>' + item.TIRE_SIZE+'/'+item.TIRE_RIM + '</div>';
					html+='<div class="details"><strong>LI/SS:</strong>' + item.TIRE_LI_SS + '</div>';
					html+='<div class="details"><strong>DESIGN:</strong>' + item.TIRE_DESIGN + '</div>';
					html+='<div class="details"><strong>REMAINING QTY:</strong><span class="itemQty">' + item.PRODUCT_STOCK + '</span></div>';
					html+='<div class="details"><strong>&nbsp</strong>'
					if(item.PRODUCT_STOCK <= 0){
						html+='<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID +'" class="dontaddToCart" style="background-color:#ccc;">NOT AVAILABLE</button></div>';
					}else{
						html+='<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID +'" class="addToCart">ADD TO CART</button></div>';
					}
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
					if(item.TIRE_IMAGE_FNAME == ''){
						html+='<div class="col-md-2"><img src="../assets/logo_altered_red.png" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" /></div>';
					}else{
						html+='<div class="col-md-2"><img src="../assets/product/tires/'+item.TIRE_IMAGE_FNAME+'" width="125px" height="90px" style="margin-top:5px;margin-left:10px;" data-lity/></div>';
					}html+='<div class="col-md-10">';
					html+='<div class="tire-name"><strong>'+ item.TIRE_BRAND + ' ' +  item.TIRE_SIZE+'/'+item.TIRE_RIM + ' ' + item.TIRE_DESIGN+'<span style="float:right">Php ' + item.PRODUCT_COST_PER_UNIT+ '</strong></span></div>';
					html+='<div class="details"><strong>Brand:</strong>' + item.TIRE_BRAND + '</div>';
					html+='<div class="details"><strong>Size:</strong>' + item.TIRE_SIZE+'/'+item.TIRE_RIM + '</div>';
					html+='<div class="details"><strong>LI/SS:</strong>' + item.TIRE_LI_SS + '</div>';
					html+='<div class="details"><strong>DESIGN:</strong>' + item.TIRE_DESIGN + '</div>';
					html+='<div class="details"><strong>REMAINING QTY:</strong><span class="itemQty">' + item.PRODUCT_STOCK + '</span></div>';
					html+='<div class="details"><strong>&nbsp</strong>'
					if(item.PRODUCT_STOCK <= 0){
					html+='<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID +'" class="dontaddToCart" style="background-color:#ccc;">NOT AVAILABLE</button></div>';
					}else{
						html+='<button id="type-'+item.PRODUCT_TYPE+'-prod_id-'+item.PRODUCT_ID+'-tire_id-'+item.TIRE_ID +'" class="addToCart">ADD TO CART</button></div>';
					}html+='</div></div>';
					$('#tire_enum').append(html);
				});
			}
		});
	}
})
