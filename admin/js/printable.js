$(function(){
	var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";
	var url = window.location.href; 
	var values = parseURLParams(url);

	var month = String(values.month);
	var year = String(values.year);

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
	
	$(window).preloader({
  		delay: 2000
	});

	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'transaction',
			action: 'getMYTransaction',
			month: month,
			year: year 
		},success:function(result){
			tbody_sales = '';
			if(result.success == false){
				tbody_sales = '<tr><td colspan="6"><center>No transactions were made for month</center></td></tr>';
			}else{
				$.each(result.details, function(i, item) {
						
						tbody_sales += '<tr>';
						tbody_sales += '<td>'+item.USER_LNAME + ', ' + item.USER_FNAME +'</td>';
						tbody_sales += '<td>'+item.TRANSACTION_ID + '</td>';
						tbody_sales += '<td>'+item.TEANSACTION_DATE+'</td>';
						tbody_sales += '<td>'+addCommas(item.TRANSACTION_SUBTOTAL)+'</td>';
						tbody_sales += '<td>'+item.TRANSACTION_DISCOUNT+'%</td>';
						tbody_sales += '<td>'+addCommas(item.TRANSACTION_G_TOTAL)+'</td>';
						tbody_sales += '</tr>';
						
				});
			}
			$('#monthly_sale').text(addCommas(result.monthly));
			$('#tbody_sales').append(tbody_sales);
		},async: false
	})

	window.print();
	
	document.location.href = 'http://mirasoltiresupply.com/admin/admin.php?link=sales'; 
	$(window).preloader({
  		delay: 2000
	});
	function parseURLParams(url) {
	    var queryStart = url.indexOf("?") + 1,
	        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
	        query = url.slice(queryStart, queryEnd - 1),
	        pairs = query.replace(/\+/g, " ").split("&"),
	        parms = {}, i, n, v, nv;

	    if (query === url || query === "") {
	        return;
	    }

	    for (i = 0; i < pairs.length; i++) {
	        nv = pairs[i].split("=");
	        n = decodeURIComponent(nv[0]);
	        v = decodeURIComponent(nv[1]);

	        if (!parms.hasOwnProperty(n)) {
	            parms[n] = [];
	        }

	        parms[n].push(nv.length === 2 ? v : null);
	    }
	    return parms;
	}
	function addCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
});