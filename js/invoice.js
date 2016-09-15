$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	var tbody_dat='';
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'transaction',
			action: 'getInvoice',
		},
		success: function(result){
			
			$.each(result.details, function(i, item) {
				tbody_dat+='<tr>';
				tbody_dat+='<td><center>1</center></td>';
				tbody_dat+='<td><center>';
				switch(item.TRANSACTION_TYPE){
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
				tbody_dat+='<td><center>'+item.TD_DESCRIPTION+'</center></td>';
				tbody_dat+='<td><center>'+addCommas(item.TD_TOTAL)+'</center></td>';
				tbody_dat+='<td><center>'+addCommas(item.TD_TOTAL)+'</center></td>';
				tbody_dat+='</tr>';
			});
			$('#table_data').html(tbody_dat);
			//$('#grandtotal').append(result.total);
		}
	});

	function addCommas(x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
})
