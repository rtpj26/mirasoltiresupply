$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	
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
				tbody_dat+='<td class="odd"><center>1</center></td>';
				tbody_dat+='<td class="even"><center>pc</center></td>';
				tbody_dat+='<td class="odd desc"><center>'+item.desc+'</center></td>';
				tbody_dat+='<td class="even"><center>'+item.price+'</center></td>';
				tbody_dat+='<td class="odd"><center>'+item.price+'</center></td>';
				tbody_dat+='<td class="even delete">Delete</td>';
				tbody_dat+='</tr>';
				index++;
			});
			$('#table_data').html(tbody_dat);
			$('#grandtotal').append(result.total);
		}
	});

	$('table').delegate('td.delete', 'click', function(){
		var index = $(this).parents().eq(0).attr('id');
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
				$('#grandtotal').text('Amount: ' + result.total);
			}
		});
	});
})
