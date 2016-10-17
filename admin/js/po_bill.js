$(function(){
	var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";
	var tbody_dat='';
	var gMOP;
	var transaction_date;
	
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'account_control',
			action: 'checkSessionLoggedIn'
		}, success: function(result){
			if(!result.isAdmin){
				window.location.replace("http://mirasoltiresupply.com/admin/restricted.php");
			}
		}, async: false
	})
	
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
				tbody_dat+='<td><center>'+item.TD_QTY+'</center></td>';
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
				tbody_dat+='<td><center>'+addCommas(item.PRODUCT_COST_PER_UNIT)+'</center></td>';
				tbody_dat+='<td><center>'+addCommas(item.TD_TOTAL)+'</center></td>';
				tbody_dat+='</tr>';
				transaction_date = item.TEANSACTION_DATE;
				gMOP = item.TRANSCTION_MOP;
				$('#grandTotalAmount').text(addCommas(item.TRANSACTION_G_TOTAL));
				$('#amnt').text(addCommas(item.TRANSACTION_G_TOTAL));
				$('#discount').text(item.TRANSACTION_DISCOUNT + '%');
				$('#subtotal').text(addCommas(item.TRANSACTION_SUBTOTAL));
				$('#grandTotalAmount').text(addCommas(item.TRANSACTION_G_TOTAL));
				$('#csr').text(item.TRANSACTION_ID);
				$('#supplierText').text(item.TRANSACTION_SUPPLIER);
				//alert(item.TRANSACTION_SUPPLIER);
			});



			$('#table_data').html(tbody_dat);
			

			$('#issueDate').text(transaction_date);
		}
	});

	$('#updateInvoice').click(function(){
		var careof = $('#issueCO').val();
		var by = $('#issueBy').val();

		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'transaction',
				action: 'updateInvoice',
				careof: careof,
				by: by,
				id: $('#csr').text()
			}, success:function(){
				alert('changes saved for invoice ' + $('#csr').text());
			}
		})
	})
	function addCommas(x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
})
