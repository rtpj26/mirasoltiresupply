$(function(){
	var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";
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
	var tbody_dat='';
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'session',
			action: 'getDataInCart'
		},
		success: function(result){
			var index = 0;
			$.each(result.cart, function(i, item) {
				tbody_dat+='<tr id="'+item.id+'">';
				tbody_dat+='<td class="odd"><center><input id="qty" class="qty" type="number" value="' + item.qty + '" size="3"  min="1" max="'+item.max+'" step="1" onkeydown="return false;"/></center></td>';
				tbody_dat+='<td class="even"><center>';
				switch(item.type){
					case "1":
						tbody_dat += 'pc';
						break;
					case "2":
						tbody_dat += 'set of 4';
						break;
					default:
						tbody_dat += 'pc';
						break;
				}
				tbody_dat+='</center></td>';
				tbody_dat+='<td class="odd desc"><center>'+item.desc+'</center></td>';
				tbody_dat+='<td class="even"><center>'+addCommas(item.uprice)+'</center></td>';
				tbody_dat+='<td class="odd" ><center><span id="'+item.id+'-price">'+addCommas(item.price)+'</span></center></td>';
				tbody_dat+='<td class="even delete">Remove</td>';
				tbody_dat+='</tr>';
				index++;
			});
			$('#table_data').html(tbody_dat);
			$('#grandtotal').append(addCommas(result.total));
		}
	});

	$('table').delegate('.qty', 'change', function(){
		var index = $(this).parents().eq(2).attr('id');
		
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'session',
				action: 'changeQty',
				index: index,
				qty: $(this).parents().eq(2).find('#qty').val()
			},
			success: function(result){
				$('#grandtotal').text('Amount: ' + addCommas(result.total));
				$('#'+index+'-price').text(addCommas(result.price));
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
	        });
	});

	$('table').delegate('td.delete', 'click', function(){

		var index = $(this).parents().eq(0).attr('id');
		if (confirm('Are you sure you want to delete this?')) {
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'session',
					action: 'removeFromCart',
					index: index
				},
				success: function(result){
					$('#'+index).remove();
					$('#grandtotal').text('Amount: ' + addCommas(result.total));
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
	        });
		}


	});

	$('#order').click(function(){
		$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'session',
			action: 'getDataInCart'
		},
		success: function(result){
			var index = 0;
			$.each(result.cart, function(i, item) {
				index++;
			});

			if(index > 0) window.location.replace("http://mirasoltiresupply.com/checkout.php");
			else{
				alert('No item in cart');
			}
		}
	})
	})

	$('#wishlist').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'session',
				action: 'getDataInCart'
			},
			success: function(result){
				var index = 0;
				$.each(result.cart, function(i, item) {
					index++;
				});

				if(index > 0){
					$.ajax({
						type: 'POST',
						url: ajaxURL,
						data:{
							type: 'transaction',
							action: 'createWishlistTransaction',
							total: result.total
						},
						success: function(result){
							alert('Items added to wishlist')
							window.location.replace("http://mirasoltiresupply.com/account/");
						}
					})

				} //window.location.replace("http://mirasoltiresupply.com/checkout.php");
				else{
					alert('No item in cart');
				}
			}
		})	
	})


	function addCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
})
