$(function(){
	var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";
	var global_grandTotal = 0.00;
	refreshSelectedItems();

	$('#nav-tire').click(function(){
		enumTires();
	});

	$('#nav-wheel').click(function(){
		enumWheels();
	});

	$('#nav-battery').click(function(){
		enumBatteries();
	});


	$('table').delegate('.addItem', 'click', function(){
		var data_id = $(this).parents().eq(1).attr('id');

		var pType = data_id.split('-')[1];
		var pId = data_id.split('-')[3];
		var iId = data_id.split('-')[5];
		var description = $(this).parents().eq(1).find('.description').text();
		var price = $(this).parents().eq(1).find('.price').text();

		console.log(description);
		console.log(price);
		$('#selected_id').val(data_id);
		$('#selected_desc').val(description);
		$('#selected_price').val(price);
		$('#selected_type').val(pType);
		$('#selected_prod_id').val(pId);
		$('#selected_item_id').val(iId);
		$('#qtyPurchased').val('1');

		$('#item_qty').dialog({
			width: '320px'
		});
	});


	$('#sendToPOCart').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data: {
				type: 'session',
				action: 'addtopocart',
				product_type:  $('#selected_type').val(),
				product_id: $('#selected_prod_id').val(),
				item_id: $('#selected_item_id').val(),
				desc: $('#selected_desc').val(),
				price: $('#selected_price').val(),
				qty: $('#qtyPurchased').val(),
			},success: function(result){
				refreshSelectedItems();
				
				$('#item_qty').dialog('close');
				alert('successfully added');
			}
		})
	})

	$('table').delegate('.removeItem', 'click', function(){
		var id = $(this).parents().eq(1).attr('id');
		if (confirm('Are you sure you want to remove this?')) {
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'session',
					action: 'removeFromPOCart',
					index: id,
				},
				success: function(result){
					refreshSelectedItems();
					global_grandTotal = result.total;
				},error: function(result){
					refreshSelectedItems();
					global_grandTotal = result.total;
				},async: false
			});
		}
	})
	$('#cancel').click(function(){
		$('#item_qty').dialog('close');
	});

	$('#createPO').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'transaction',
				action: 'createPOTransaction',
				total: global_grandTotal,
				supplier: $('#supplier').val()
			},
			success: function(result){
				window.location.replace("http://mirasoltiresupply.com/admin/po_bill.php?tid=" + result.tid);
			},error: function(result){
				if(result.success)window.location.replace("http://mirasoltiresupply.com/admin/po_bill.php?tid=" + result.tid);
			},async: false
		})
	})


	function refreshSelectedItems(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'session',
				action: 'getDataInPOCart',
			}, success: function(result){
				$('#item_body').html('');
				var tbody = '';
				$.each(result.cart, function(i, item){
					tbody += '<tr id="'+item.id+'"><td>' + item.desc + '</td>';
					tbody += '<td>' + item.qty + '</td>';
					tbody += '<td>' + item.uprice + '</td>';
					tbody += '<td>' + item.price + '</td>';
					tbody += '<td><button type="button" class="removeItem">Remove</button></td></tr>';
				})
				global_grandTotal = result.total;
				$('#item_body').append(tbody);
			}
		})
	}

	function enumTires(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getTires'
			}, success: function(result){
				$('#item_enum_body').html('');
				var tbody = '';
				$.each(result.productDetails, function(i, item){
					tbody += '<tr id="type-1-pid-' + item.PRODUCT_ID + '-item-' + item.TIRE_ID + '">';
					tbody += '<td width="50%" class="description">' + item.TIRE_BRAND + ' ' + item.TIRE_DESIGN + '</td>';
					tbody += '<td width="25%" class="price">' + item.PRODUCT_COST_PER_UNIT + '</td>';
					tbody += '<td width="25%"><button type="button" class="addItem">Add Item</button></td>';
					tbody += '<tr>'
				})
				$('#item_enum_body').append(tbody);
			}
		});
	}


	function enumWheels(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getWheels'
			}, success: function(result){
				$('#item_enum_body').html('');
				var tbody = '';
				$.each(result.productDetails, function(i, item){
					tbody += '<tr id="type-2-pid-' + item.PRODUCT_ID + '-item-' + item.WHEEL_ID + '">';
					tbody += '<td width="50%" class="description">' + item.WHEEL_HOLES + '-Holed ' + item.WHEEL_COLOR + ' ' + item.WHEEL_BRAND + '</td>';
					tbody += '<td width="25%" class="price">' + item.PRODUCT_COST_PER_UNIT + '</td>';
					tbody += '<td width="25%"><button type="button" class="addItem">Add Item</button></td>';
					tbody += '<tr>'
				})
				$('#item_enum_body').append(tbody);
			}
		})
	}

	function enumBatteries(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getBatteries'
			}, success: function(result){
				$('#item_enum_body').html('');
				var tbody = '';
				$.each(result.productDetails, function(i, item){
					tbody += '<tr id="type-3-pid-' + item.PRODUCT_ID + '-item-' + item.BATTERY_ID + '">';
					tbody += '<td width="50%" class="description">' + item.BATTERY_PLATES + '-Plates ' + item.BATTERY_DESCRIPTION  + '</td>';
					tbody += '<td width="25%" class="price">' + item.PRODUCT_COST_PER_UNIT + '</td>';
					tbody += '<td width="25%"><button type="button" class="addItem">Add Item</button></td>';
					tbody += '<tr>'
				})
				$('#item_enum_body').append(tbody);
			}
		})
	}

	function addCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
})


