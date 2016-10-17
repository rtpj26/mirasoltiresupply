$(function(){
	var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";
	var url = window.location.href; 
	var values = parseURLParams(url)
	var currDate = new Date();

    var month = currDate.getMonth();
	var year = currDate.getFullYear();
	month += 1;
	$('#month').val(month );
	

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

	$('#sales').css('display', 'none');
	$('#updateBattery').css('display', 'none');
	$('#updateTire').css('display', 'none');
	$('#updateWheel').css('display', 'none');
	$('#comments').css('display', 'none');	
	$('#accounts').css('display', 'none');
	$('#inventory').css('display', 'none');
	$('#tires-panel').css('display', 'none');
	$('#wheels-panel').css('display', 'none');
	$('#batteries-panel').css('display', 'none');
	$('#rescue-panel').css('display', 'none');
	$('#account_details').css('display', 'none');
	$('#promo_code').css('display', 'none');
	$('#popanel').css('display', 'none');

	if(values.link == 'account'){
		$('#accounts').css('display', 'inherit');
		$('#accounts').addClass('active');
	}else if(values.link == 'inventory'){
		$('#inventory').css('display', 'inherit');
		$('#inventory').addClass('active');
	}else if(values.link == 'comments'){
		$('#comments').css('display', 'inherit');
		$('#comments').addClass('active');
	

	}else if(values.link == 'rescue'){
		$('#rescue-panel').css('display', 'inherit');
		$('#rescue').addClass('active');
	}else if(values.link == 'sales'){
		$('#sales').css('display', 'inherit');
		$('#sales_link').addClass('active');

		
	}else if(values.link == 'pcode'){
		$('#promo_code').css('display', 'inherit');
		$('#pcode_link').addClass('active');
	}else if(values.link == 'po'){
		$('#popanel').css('display', 'inherit');
		$('po_link').addClass('active');
	}
	else{
		$('#rescue').css('display', 'inherit');
		$('#rescue').addClass('active');
	}

	var monthly_graph_data = new Array();

	for(var i = 1; i <= 12; i++){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'transaction',
				action: 'getMonthlyGraphData',
				month: i
			}, success: function(result){
				if(result.gData != null){
					monthly_graph_data.push([i, result.gData]);
				}else{
					monthly_graph_data.push([i, 0]);
				}
			},async: false
		})
	}
	console.log(monthly_graph_data);
	$.plot('#monthly_graph', [
		{ label: "Monthly Sales", data: monthly_graph_data}
	],{
		series:{
			bars:{show:true},
			points:{show: false}
		},yaxis:{
			tickFormatter:function(value, axis){
				return addCommas(value.toFixed(axis.tickDecimals));
			}

		},xaxis:{
			ticks: 12,
			min: 1,
			max: 12,
			tickDecimals: 1,
			tickFormatter: function(value, axis) {
				switch(value.toFixed(axis.tickDecimals)){
					case "1.0":
						return "January";
					case "2.0":
						return "February";
					case "3.0":
						return "March";
					case "4.0":
						return "April";
					case "5.0":
						return "May";
					case "6.0":
						return "June";
					case "7.0":
						return "July";
					case "8.0":
						return "August";
					case "9.0":
						return "September";
					case "10.0":
						return "October";
					case "11.0":
						return "November";
					case "12.0":
						return "December";
					default:
						return value.toFixed(axis.tickDecimals);
				}
			}
		},grid:{
			backgroundColor:{colors: ['#fff', '#eee']},
			hoverable: true,
				clickable: true
		}
	});






	var yearly_graph_data = new Array();

	for(var i = year-5; i <= year+6; i++){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'transaction',
				action: 'getYearlyGraphData',
				year: i
			}, success: function(result){
				if(result.gData != null){
					yearly_graph_data.push([i, result.gData]);
				}else{
					yearly_graph_data.push([i, 0]);
				}
			},async: false
		})
	}
	console.log(yearly_graph_data);
	$.plot('#yearly_graph', [
		{ label: "Yearly Sales", data: yearly_graph_data}
	],{
		series:{
			bars:{show:true},
			points:{show: false}
		},yaxis:{
			tickFormatter:function(value, axis){
				return addCommas(value.toFixed(axis.tickDecimals));
			}
		},xaxis:{
			ticks: 12,
			min: year-5,
			max: year+5
		},grid:{
			backgroundColor:{colors: ['#fff', '#eee']},
			hoverable: true,
				clickable: true
		}
	});




	$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'rescue',
				action: 'updateRescue'
			}, success: function(){
				
			}
		})
	
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'comments',
			action: 'getComments',
			keyword: '1'
		}, success: function(result){
			var tbody = '';
			$.each(result.comments, function(i, item) {
				tbody += '<tr id="' + item.COMMENT_ID + '" class="comment_row">';
				tbody += '<td>'+item.COMMENT_NAME + '</td>';
				tbody += '<td>'+item.COMMENT_EMAIL + '</td>';
				tbody += '<td>'+item.COMMENT_CONTACT_NUM + '</td>';
				tbody += '<td>'+item.COMMENT_MESSAGE + '</td>';
				tbody += '<td class="hideable deleteComment"><span class="glyphicon glyphicon-trash"></span></td>';
				tbody += '</tr>';
			});
			$('#tbody_recent').append(tbody);
		},async: false
	});
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'comments',
			action: 'getComments',
			keyword: '1,2'
		}, success: function(result){
			var tbody = '';
			$.each(result.comments, function(i, item) {
				tbody += '<tr id="' + item.COMMENT_ID + '" class="comment_row">';
				tbody += '<td>'+item.COMMENT_NAME + '</td>';
				tbody += '<td>'+item.COMMENT_EMAIL + '</td>';
				tbody += '<td>'+item.COMMENT_CONTACT_NUM + '</td>';
				tbody += '<td>'+item.COMMENT_MESSAGE + '</td>';
				tbody += '<td class="hideable deleteComment" ><span class="glyphicon glyphicon-trash"></span></td>';
				tbody += '</tr>';
			});
			$('#tbody_all').append(tbody);
			if(values.link == 'comments'){
							$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'comments',
					action: 'updateCommentsStatus'
				}, success: function(result){
					
				}
			});
			}
		}, async: false
	});
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'transaction',
			action: 'getAllDiscounts'
		}, success: function(result){
			var tbody = '';
			$.each(result.discount, function(i, item) {
					tbody += '<tr id="' + item.DISCOUNT_ID + '" class="discount_row">';
							tbody += '<td class="pCode">'+item.DISCOUNT_PROMO_CODE + '</td>';
							tbody += '<td class="discVal">'+item.DISCOUNT_VALUE + '</td>';
							tbody += '<td class="start">'+item.DISCOUNT_START + '</td>';
							tbody += '<td class="end">'+item.DISCOUNT_END + '</td>';
							tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_discount"></span>&nbsp<span class="glyphicon glyphicon-trash delete_discount"></span></td>'
							
							tbody += '</tr>';
			});
			$('#tbody_pcodes').append(tbody);
		}, async: false
	});
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'account_control',
			action: 'getAllAccounts',
		}, success: function(result){
			var tbody = '';
			$.each(result.accounts, function(i, item) {
				tbody += '<tr id="' + item.USER_ID + '" class="account_item">';
				tbody += '<td>'+ item.USER_ID + '</td>';
				tbody += '<td>'+item.USER_FNAME + ' ' + item.USER_LNAME + '</td>';
				tbody += '<td>'+item.USER_CONTACT_NO + '</td>';
				tbody += '</tr>';
			});
			$('#tbody_accounts').append(tbody);
		}, async: false
	});


	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'product',
			action: 'getTires',
			sortby: ''
		}, success: function(result){
			var tbody = '';
			$.each(result.productDetails, function(i, item) {
				tbody += '<tr id="' + item.PRODUCT_ID + '" class="tire_row">';
				tbody += '<td>'+item.TIRE_SIZE + '</td>';
				tbody += '<td>'+ item.TIRE_RIM + '</td>';
				
				tbody += '<td>'+item.TIRE_LI_SS + '</td>';
				tbody += '<td>'+item.TIRE_BRAND + '</td>';
				tbody += '<td>'+item.TIRE_DESIGN + '</td>';
				tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
				tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
				tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_tire"></span>&nbsp<span class="glyphicon glyphicon-trash delete_tire"></span></td>'
				tbody += '</tr>';
			});
			$('#tbody_tires').append(tbody);
		}, async: false
	});

	$('table').delegate('.deleteComment', 'click', function(){
		if(confirm("Are you sure you want to delete this comment?")){
			var cid = $(this).parents().eq(0).attr('id');
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'comments',
					action: 'deleteComment',
					id: cid
				}, success: function(){
					alert('comment deleted');
				}
			})



	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'comments',
			action: 'getComments',
			keyword: '1'
		}, success: function(result){
			$('#tbody_recent').html('');
			var tbody = '';
			$.each(result.comments, function(i, item) {
				tbody += '<tr id="' + item.COMMENT_ID + '" class="comment_row">';
				tbody += '<td>'+item.COMMENT_NAME + '</td>';
				tbody += '<td>'+item.COMMENT_EMAIL + '</td>';
				tbody += '<td>'+item.COMMENT_CONTACT_NUM + '</td>';
				tbody += '<td>'+item.COMMENT_MESSAGE + '</td>';
				tbody += '<td class="hideable deleteComment"><span class="glyphicon glyphicon-trash"></span></td>';
				tbody += '</tr>';
			});
			$('#tbody_recent').append(tbody);
		},async: false
	});
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'comments',
			action: 'getComments',
			keyword: '1,2'
		}, success: function(result){
			$('#tbody_all').html('');
			var tbody = '';
			$.each(result.comments, function(i, item) {
				tbody += '<tr id="' + item.COMMENT_ID + '" class="comment_row">';
				tbody += '<td>'+item.COMMENT_NAME + '</td>';
				tbody += '<td>'+item.COMMENT_EMAIL + '</td>';
				tbody += '<td>'+item.COMMENT_CONTACT_NUM + '</td>';
				tbody += '<td>'+item.COMMENT_MESSAGE + '</td>';
				tbody += '<td class="hideable deleteComment" ><span class="glyphicon glyphicon-trash"></span></td>';
				tbody += '</tr>';
			});
			$('#tbody_all').append(tbody);
	
		
		}, async: false
	});
		}
	})
	$('#tire-keyword').keyup(function(){
		$('#tbody_tires').html('');

		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'searchTire',
				key: $('#tire-keyword').val()
			},
			success: function(result){
				var tbody = '';
				$.each(result.productDetails, function(i, item) {
					tbody += '<tr id="' + item.PRODUCT_ID + '" class="tire_row">';
					tbody += '<td>'+item.TIRE_SIZE + '</td>';
					tbody += '<td>'+ item.TIRE_RIM + '</td>';
					
					tbody += '<td>'+item.TIRE_LI_SS + '</td>';
					tbody += '<td>'+item.TIRE_BRAND + '</td>';
					tbody += '<td>'+item.TIRE_DESIGN + '</td>';
					tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
					tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
					tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_tire"></span>&nbsp<span class="glyphicon glyphicon-trash delete_tire"></span></td>'
					tbody += '</tr>';
				});
				$('#tbody_tires').append(tbody);
			}
		});
	});


	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'product',
			action: 'getWheels',
			sortby: ''
		}, success: function(result){
			var tbody = '';
			$.each(result.productDetails, function(i, item) {
				tbody += '<tr id="' + item.PRODUCT_ID + '" class="wheel_row">';
				tbody += '<td>'+ item.WHEEL_RIM + '</td>';
				tbody += '<td>'+item.WHEEL_BRAND + '</td>';
				tbody += '<td>'+item.WHEEL_COLOR + '</td>';
				tbody += '<td>'+item.WHEEL_HOLES + '</td>';
				tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
				tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
				tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_wheel"></span>&nbsp<span class="glyphicon glyphicon-trash delete_wheel"></span></td>'
				tbody += '</tr>';
			});
			$('#tbody_wheels').append(tbody);
		}, async: false
	});


	$('#wheel-keyword').keyup(function(){
		$('#tbody_wheels').html('');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'searchWheel',
				key: $('#wheel-keyword').val(),
			},
			success: function(result){
				var tbody = '';
				$.each(result.productDetails, function(i, item) {
					tbody += '<tr id="' + item.PRODUCT_ID + '" class="wheel_row">';
					tbody += '<td>'+ item.WHEEL_RIM + '</td>';
					tbody += '<td>'+item.WHEEL_BRAND + '</td>';
					tbody += '<td>'+item.WHEEL_COLOR + '</td>';
					tbody += '<td>'+item.WHEEL_HOLES + '</td>';
					tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
					tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
					tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_wheel"></span>&nbsp<span class="glyphicon glyphicon-trash delete_wheel"></span></td>'
					tbody += '</tr>';
				});
				$('#tbody_wheels').append(tbody);
			}
		});
	});



	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'product',
			action: 'getBatteries',
			sortby: ''
		}, success: function(result){
			var tbody = '';
			$.each(result.productDetails, function(i, item) {
				tbody += '<tr id="' + item.PRODUCT_ID + '" class="battery_row">';
				tbody += '<td>'+ item.BATTERY_DESCRIPTION + '</td>';
				tbody += '<td>'+item.BATTERY_PLATES + '</td>';
				tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
				tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
				tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_battery"></span>&nbsp<span class="glyphicon glyphicon-trash delete_battery"></span></td>'
				tbody += '</tr>';
			});
			$('#tbody_batteries').append(tbody);
		}, async: false
	});

	$('#batteries-keyword').keyup(function(){
		$('#tbody_batteries').html('');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'searchBattery',
				key: $('#batteries-keyword').val(),
			},
			success: function(result){
				var tbody = '';
				$.each(result.productDetails, function(i, item) {
					tbody += '<tr id="' + item.PRODUCT_ID + '" class="battery_row">';
					tbody += '<td>'+ item.BATTERY_DESCRIPTION + '</td>';
					tbody += '<td>'+item.BATTERY_PLATES + '</td>';
					tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
					tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
					tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_battery"></span>&nbsp<span class="glyphicon glyphicon-trash delete_battery"></span></td>'
					tbody += '</tr>';
				});
				$('#tbody_batteries').append(tbody);
			}
		});
	});

	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'transaction',
			action: 'getYearPopulation'
		}, success: function(result){
			$.each(result.details, function(i, item){
				$('#year').append('<option value="'+ item.YR +'">' +  item.YR + "</option>")
			});
			$('#year').val(String(year));
		}
	})

	var tbody_sales ='';
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
		}

		
	})
	
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'rescue',
			action: 'getRescue',
			sortby: ''
		}, success: function(result){
			var tbody = '';
			$.each(result.rescue, function(i, item) {
				
				tbody += '<tr id="' + item.RESCUE_CSR_NO + '" class="battery_row">';
				tbody += '<td>'+item.RESCUE_CSR_NO+'</td>';
				tbody += '<td>'+item.RESCUE_NAME + '</td>';
				tbody += '<td>'+item.RESCUE_DATE+'</td>';
				tbody += '<td>'+item.RESCUE_CONTACT + '</td>';
				tbody += '<td>'+item.RESCUE_REQUISITION + '</td>';
				tbody += '<td>'+item.RESCUE_LOCATION+'</td>';
				if(item.RESCUE_A_STATUS == 0){
					tbody += '<td><select class="updateRStatus" id="updateRescueStatus" value="'+item.RESCUE_A_STATUS+'"><option value="0">PENDING</option><option value="1">DONE</option></select></td>';
				}else{
					tbody += '<td><select class="updateRStatus" id="updateRescueStatus" value="'+item.RESCUE_A_STATUS+'"><option value="1">DONE</option><option value="0">PENDING</option></select></td>';
				}tbody += '</tr>';
			});
			$('#tbody_rescue').append(tbody);
		}, async: false
	});


	$('table').delegate('.updateRStatus', 'change', function(){
		var id = $(this).parents().eq(1).attr('id');
		var status = $("#updateRescueStatus").val();
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'transaction',
				action: 'updateRescueStatus',
				id: id,
				status: status
			},success:function(){
					
			}
		})

	})

	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'transaction',
			action: 'getPOTransactions'
		}, success: function(result){
			$('#tbody_po').html('');
			var tbody = '';
			$.each(result.details, function(i, item) {
				tbody += '<tr id="' + item.TRANSACTION_ID + '" class="battery_row">';
				tbody += '<td>'+item.TRANSACTION_ID+'</td>';
				tbody += '<td>'+item.TEANSACTION_DATE + '</td>';
				tbody += '<td>'+item.TRANSACTION_G_TOTAL+'</td>';
				tbody += '<td class="viewBill" style="cursor: pointer;">View Bill</td>';
				tbody += '</tr>';
			});
			$('#tbody_po').append(tbody);
		}, error: function(result){
			$('#tbody_po').html('');
			var tbody = '';
			$.each(result.details, function(i, item) {
				tbody += '<tr id="' + item.TRANSACTION_ID + '" class="battery_row">';
				tbody += '<td>'+item.TRANSACTION_ID+'</td>';
				tbody += '<td>'+item.TEANSACTION_DATE + '</td>';
				tbody += '<td>'+item.TRANSACTION_G_TOTAL+'</td>';
				tbody += '<td class="viewBill">View Bill</td>';
				tbody += '</tr>';
			});
			$('#tbody_po').append(tbody);
		}
	})


	$('table').delegate('.viewBill', 'click', function(){
		var id = $(this).parents().eq(0).attr('id');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'session',
				action: 'changeInvId',
				tid: id,
			},success:function(){
				window.location.replace("http://mirasoltiresupply.com/admin/po_bill.php?tid=" + id);
			}
		})
	})

	$('#searchButton').click(function(){
		$('#tbody_all').html('');
		var keyword = $('#keyword').val();
		var action = 'getCommentsLike';
		if(keyword == ''){
			action = 'getComments';
			keyword = '1,2';
		}
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'comments',
				action: action,
				keyword: keyword
			}, success: function(result){
				var tbody = '';
				$.each(result.comments, function(i, item) {
					tbody += '<tr id="' + item.COMMENT_ID + '" ">';
					tbody += '<td>'+item.COMMENT_NAME + '</td>';
					tbody += '<td>'+item.COMMENT_EMAIL + '</td>';
					tbody += '<td>'+item.COMMENT_CONTACT_NUM + '</td>';
					tbody += '<td>'+item.COMMENT_MESSAGE + '</td>';
					tbody += '</tr>';
				});
				$('#tbody_all').append(tbody);
			}
		});
	})

	
	$('table').delegate('.delete_tire', 'click', function(){
		var id = $(this).parents().eq(1).attr('id');
		if (confirm('Are you sure you want to delete this?')) {
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'product',
					action: 'deleteTire',
					product_id: id
				},success: function(){
				},async: false
			});
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'product',
					action: 'deleteProduct',
					product_id: id
				},success: function(){
					alert('Tire successfully deleted');
						$('#tbody_tires').html('');
						$.ajax({
							type: 'POST',
							url: ajaxURL,
							data:{
								type: 'product',
								action: 'getTires',
								sortby: ''
							}, success: function(result){
								var tbody = '';
								$.each(result.productDetails, function(i, item) {
									tbody += '<tr id="' + item.PRODUCT_ID + '" class="tire_row">';
									tbody += '<td>'+item.TIRE_SIZE + '</td>';
									tbody += '<td>'+ item.TIRE_RIM + '</td>';
									
									tbody += '<td>'+item.TIRE_LI_SS + '</td>';
									tbody += '<td>'+item.TIRE_BRAND + '</td>';
									tbody += '<td>'+item.TIRE_DESIGN + '</td>';
									tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
									tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
									tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_tire"></span>&nbsp<span class="glyphicon glyphicon-trash delete_tire"></span></td>'
									tbody += '</tr>';
								});
								$('#tbody_tires').append(tbody);
							}
						})
				},async: false
			});
		}
	})

	$('table').delegate('.edit_tire', 'click', function(){
		var id = $(this).parents().eq(1).attr('id');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getTireData',
				id: id
			},success: function(result){
				$.each(result.details, function(i, item) {
					console.log(item);
					console.log(item.PRODUCT_ID);
					$('#id_tedit').val(item.TIRE_ID);
					$('#pid_tedit').val(item.PRODUCT_ID);
					$('#rim_tedit').val(item.TIRE_RIM);
					$('#size_tedit').val(item.TIRE_SIZE);
					$('#liss_tedit').val(item.TIRE_LI_SS);
					$('#brand_tedit').val(item.TIRE_BRAND);
					$('#design_tedit').val(item.TIRE_DESIGN);
					$('#qty_tedit').val(item.PRODUCT_STOCK);
					$('#price_tedit').val(item.PRODUCT_COST_PER_UNIT);
				});
			}
		})

		$('#updateTire').dialog();
	});


	$('table').delegate('.edit_wheel', 'click', function(){
		var id = $(this).parents().eq(1).attr('id');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getWheelData',
				id: id
			},success: function(result){
				$.each(result.details, function(i, item) {
					$('#id_wedit').val(item.WHEEL_ID);
					$('#pid_wedit').val(item.PRODUCT_ID);
					$('#rim_wedit').val(item.WHEEL_RIM);
					$('#brand_wedit').val(item.WHEEL_BRAND);
					$('#color_wedit').val(item.WHEEL_COLOR);
					$('#holes_wedit').val(item.WHEEL_HOLES);
					$('#qty_wedit').val(item.PRODUCT_STOCK);
					$('#price_wedit').val(item.PRODUCT_COST_PER_UNIT);
				});
			}
		})
		$('#updateWheel').dialog();
	})

	$('table').delegate('.edit_battery', 'click', function(){
		var id = $(this).parents().eq(1).attr('id');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'getBatteryData',
				id: id
			},success: function(result){
				$.each(result.details, function(i, item) {
					$('#id_bedit').val(item.BATTERY_ID);
					$('#pid_bedit').val(item.PRODUCT_ID);
					$('#description_bedit').val(item.BATTERY_DESCRIPTION);
					$('#plates_bedit').val(item.BATTERY_PLATES);
					$('#qty_bedit').val(item.PRODUCT_STOCK);
					$('#price_bedit').val(item.PRODUCT_COST_PER_UNIT);
				});
			}
		})

		$('#updateBattery').dialog();
	});


	$('#saveTire').click(function(){
		var id = $('#id_tedit').val();
		var pid = $('#pid_tedit').val();
		var rim = $('#rim_tedit').val();
		var size = $('#size_tedit').val();
		var liss = $('#liss_tedit').val();
		var brand = $('#brand_tedit').val();
		var design = $('#design_tedit').val();
		var qty = $('#qty_tedit').val();
		var price = $('#price_tedit').val();
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'updateTire',
				id:id,
				pid:pid,
				rim:rim,
				size:size,
				liss:liss,
				brand:brand,
				design:design,
				qty:qty,
				price:price
			},success: function(){
				$('#tbody_tires').html('');
				$.ajax({
					type: 'POST',
					url: ajaxURL,
					data:{
						type: 'product',
						action: 'getTires',
						sortby: ''
					}, success: function(result){
						var tbody = '';
						$.each(result.productDetails, function(i, item) {
							tbody += '<tr id="' + item.PRODUCT_ID + '" class="tire_row">';
							tbody += '<td>'+item.TIRE_SIZE + '</td>';
							tbody += '<td>'+ item.TIRE_RIM + '</td>';
							
							tbody += '<td>'+item.TIRE_LI_SS + '</td>';
							tbody += '<td>'+item.TIRE_BRAND + '</td>';
							tbody += '<td>'+item.TIRE_DESIGN + '</td>';
							tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
							tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
							tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_tire"></span>&nbsp<span class="glyphicon glyphicon-trash delete_tire"></span></td>'
							tbody += '</tr>';
						});
						$('#tbody_tires').append(tbody);
					}, async: false
				});

				$('#updateTire').dialog('close');
			}
		})
		alert('Tire details updated');
		
	})



	$('#saveWheel').click(function(){
		var id = $('#id_wedit').val();
		var pid = $('#pid_wedit').val();
		var rim = $('#rim_wedit').val();
		var brand = $('#brand_wedit').val();
		var color = $('#color_wedit').val();
		var holes = $('#holes_wedit').val();
		var qty = $('#qty_wedit').val();
		var price = $('#price_wedit').val();
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'updateWheel',
				id:id,
				pid:pid,
				rim:rim,
				brand:brand,
				color:color,
				holes,holes,
				qty:qty,
				price: price
			},success: function(){
				$('#tbody_wheels').html('');
				$.ajax({
					type: 'POST',
					url: ajaxURL,
					data:{
						type: 'product',
						action: 'getWheels',
						sortby: ''
					}, success: function(result){
						var tbody = '';
						$.each(result.productDetails, function(i, item) {
							tbody += '<tr id="' + item.PRODUCT_ID + '" class="wheel_row">';
							tbody += '<td>'+ item.WHEEL_RIM + '</td>';
							tbody += '<td>'+item.WHEEL_BRAND + '</td>';
							tbody += '<td>'+item.WHEEL_COLOR + '</td>';
							tbody += '<td>'+item.WHEEL_HOLES + '</td>';
							tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
							tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
							tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_wheel"></span>&nbsp<span class="glyphicon glyphicon-trash delete_wheel"></span></td>'
							tbody += '</tr>';
						});
						$('#tbody_wheels').append(tbody);
					}, async: false
				});
				alert('Wheel details updated');
				$("#updateWheel").dialog('close');
			},error:function(){
				$('#tbody_wheels').html('');
				$.ajax({
					type: 'POST',
					url: ajaxURL,
					data:{
						type: 'product',
						action: 'getWheels',
						sortby: ''
					}, success: function(result){
						var tbody = '';
						$.each(result.productDetails, function(i, item) {
							tbody += '<tr id="' + item.PRODUCT_ID + '" class="wheel_row">';
							tbody += '<td>'+ item.WHEEL_RIM + '</td>';
							tbody += '<td>'+item.WHEEL_BRAND + '</td>';
							tbody += '<td>'+item.WHEEL_COLOR + '</td>';
							tbody += '<td>'+item.WHEEL_HOLES + '</td>';
							tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
							tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
							tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_wheel"></span>&nbsp<span class="glyphicon glyphicon-trash delete_wheel"></span></td>'
							tbody += '</tr>';
						});
						$('#tbody_wheels').append(tbody);
					}, async: false
				});
				alert('Wheel details updated');
				$("#updateWheel").dialog('close');
			}
		})

		
	})

	$('#saveBattery').click(function(){
		var id = $('#id_bedit').val();
		var pid = $('#pid_bedit').val();
		var description = $('#description_bedit').val();
		var plates = $('#plates_bedit').val();
		var qty = $('#qty_bedit').val();
		var price = $('#price_bedit').val();
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'updateBattery',
				id:id,
				pid:pid,
				description: description,
				plates: plates,
				qty:qty,
				price: price
			},success: function(){
				$('#tbody_batteries').html('');
				$.ajax({
					type: 'POST',
					url: ajaxURL,
					data:{
						type: 'product',
						action: 'getBatteries',
						sortby: ''
					}, success: function(result){
						var tbody = '';
						$.each(result.productDetails, function(i, item) {
							tbody += '<tr id="' + item.PRODUCT_ID + '" class="battery_row">';
							tbody += '<td>'+ item.BATTERY_DESCRIPTION + '</td>';
							tbody += '<td>'+item.BATTERY_PLATES + '</td>';
							tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
							tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
							tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_battery"></span>&nbsp<span class="glyphicon glyphicon-trash delete_battery"></span></td>'
							tbody += '</tr>';
						});
						$('#tbody_batteries').append(tbody);
					}, async: false
				});
				$('#updateBattery').dialog('close');
			},error:function(){
				$('#tbody_batteries').html('');
				$.ajax({
					type: 'POST',
					url: ajaxURL,
					data:{
						type: 'product',
						action: 'getBatteries',
						sortby: ''
					}, success: function(result){
						var tbody = '';
						$.each(result.productDetails, function(i, item) {
							tbody += '<tr id="' + item.PRODUCT_ID + '" class="battery_row">';
							tbody += '<td>'+ item.BATTERY_DESCRIPTION + '</td>';
							tbody += '<td>'+item.BATTERY_PLATES + '</td>';
							tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
							tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
							tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_battery"></span>&nbsp<span class="glyphicon glyphicon-trash delete_battery"></span></td>'
							tbody += '</tr>';
						});
						$('#tbody_batteries').append(tbody);
					}, async: false
				});
				$('#updateBattery').dialog('close');
			}
		})

		alert('Battery details updated');
	})

	$('table').delegate('.delete_wheel', 'click', function(){
		var id = $(this).parents().eq(1).attr('id');
		if (confirm('Are you sure you want to delete this?')) {
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'product',
					action: 'deleteWheel',
					product_id: id
				},success: function(){
				},async: false
			});
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'product',
					action: 'deleteProduct',
					product_id: id
				},success: function(){
					alert('Wheel successfully deleted');
					$('#tbody_wheels').html('');
					$.ajax({
						type: 'POST',
						url: ajaxURL,
						data:{
							type: 'product',
							action: 'getWheels',
							sortby: ''
						}, success: function(result){
							var tbody = '';
							$.each(result.productDetails, function(i, item) {
								tbody += '<tr id="' + item.PRODUCT_ID + '" class="wheel_row">';
								tbody += '<td>'+ item.WHEEL_RIM + '</td>';
								tbody += '<td>'+item.WHEEL_BRAND + '</td>';
								tbody += '<td>'+item.WHEEL_COLOR + '</td>';
								tbody += '<td>'+item.WHEEL_HOLES + '</td>';
								tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
								tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
								tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_wheel"></span>&nbsp<span class="glyphicon glyphicon-trash delete_wheel"></span></td>'
								tbody += '</tr>';
							});
							$('#tbody_wheels').append(tbody);
						}, async: false
					});
				
				},async: false
			});
		}
	})

	$('table').delegate('.delete_battery', 'click', function(){
		var id = $(this).parents().eq(1).attr('id');
		if (confirm('Are you sure you want to delete this?')) {
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'deleteBattery',
				product_id: id
			},success: function(){
			},async: false
		});
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'deleteProduct',
				product_id: id
			},success: function(){
				alert('Battery successfully deleted');
					$('#tbody_batteries').html('');
					$.ajax({
						type: 'POST',
						url: ajaxURL,
						data:{
							type: 'product',
							action: 'getBatteries',
							sortby: ''
						}, success: function(result){
							var tbody = '';
							$.each(result.productDetails, function(i, item) {
								tbody += '<tr id="' + item.PRODUCT_ID + '" class="battery_row">';
								tbody += '<td>'+ item.BATTERY_DESCRIPTION + '</td>';
								tbody += '<td>'+item.BATTERY_PLATES + '</td>';
								tbody += '<td>'+item.PRODUCT_STOCK + '</td>';
								tbody += '<td>'+item.PRODUCT_COST_PER_UNIT + '</td>';
								tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_battery"></span>&nbsp<span class="glyphicon glyphicon-trash delete_battery"></span></td>'
								tbody += '</tr>';
							});
							$('#tbody_batteries').append(tbody);
						}, async: false
					});
			},async: false
		});
	}
	})

	$('table').delegate('.account_item', 'click', function(){
		var id = $(this).attr('id');
		var isSec = false;
		$('#accounts').css('display', 'none');
		$('#account_details').css('display', 'inherit');

		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'account_control',
				action: 'checkSessionLoggedIn'
			}, success: function(result){
				if(result.isSec){
					isSec = true;
				}
			}
		})

		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'account_control',
				action: 'getAccountTransactions',
				id: id
			},success: function(result){
				var tbody = '';
				$('#transaction-tbody').html('');
				$('#account_address').text(result.address);
				$('#account_detail_name').text(result.lname  + ', ' + result.fname);
				$.each(result.details, function(i, item){
					
					tbody += '<tr id="' + item.TRANSACTION_ID +'" class="transaction_id">';
					tbody += '<td>' + item.TEANSACTION_DATE + '</td>';
					if(item.TRANSCTION_MOP == '1'){
						tbody += '<td>CARD</td>';
					}else if(item.TRANSCTION_MOP == '2'){
						tbody += '<td>COD</td>';
					}else{
						tbody += '<td>CHEQUE</td>';
					}

					if(!isSec){
						if(item.TRANSACTION_STATUS == '1'){
							//tbody += '<td>PENDING</td>';

							tbody += '<td><select class="transaction_status" id="status_val"><option value="1">PENDING</option><option value="2">DONE</option></select></td>';
						}else{
							//tbody += '<td>DONE</td>';
								tbody += '<td><select class="transaction_status" id="status_val"><option value="2">DONE</option><option value="1">PENDING</option></select></td>';
						}
					}else{
						if(item.TRANSACTION_STATUS == '1'){
							//tbody += '<td>PENDING</td>';

							tbody += '<td>PENDING</td>';
						}else{
							//tbody += '<td>DONE</td>';
								tbody += '<td>DONE</td>';
						}
					}

					if(!isSec){
						tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_invoice"></span></td>';
					}else{
						tbody += '<td></td>';
					}
					tbody += '</tr>'
				});
				$('#transaction-tbody').append(tbody);
			}
		})

	})

	$('table').delegate('.transaction_status', 'change', function(){
		var id = $(this).parents().eq(1).attr('id');
		var status = $("#status_val").val();
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'transaction',
				action: 'updateTransactionStatus',
				id: id,
				status: status
			},success:function(){
					
			}
		})

	})


	$('#month, #year').on('change', function(){
		$('#tbody_sales').html('');
		var tbody_sales ='';
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'transaction',
				action: 'getMYTransaction',
				month: $('#month').val(),
				year: $('#year').val() 
			},success:function(result){
				tbody_sales = '';
				if(result.success == false){
					tbody_sales = '<tr><td colspan="6"><center>No transactions were made for this month </center></td></tr>';
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
			}
			
		})
	})

	$('table').delegate('.edit_invoice', 'click', function(){
		var id = $(this).parents().eq(1).attr('id');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'session',
				action: 'changeInvId',
				tid: id,
			},success:function(){
				window.location.replace("http://mirasoltiresupply.com/admin/invoice_edit.php?tid=" + id);
			}
		})
	})
	
	$('#cancelsaveTire').click(function(){


		$('#updateTire').dialog('close');
	})

	$('#cancelsaveWheel').click(function(){
		$('#updateWheel').dialog('close');
	})

	$('#cancelsaveBattery').click(function(){
		$('#updateBattery').dialog('close');
	})

	$('#cancel_addpCode').click(function(){
		$('#addPromoCodePanel').dialog('close');
	})

	$('#save_addpCode').click(function(){
		var startDt = document.getElementById('apc_start').value;
		var endDt = document.getElementById('apc_end').value;
		if(new Date(startDt).getTime() > new Date(endDt).getTime()){
			alert('Start date cannot be later than the end date');
		}else{
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'transaction',
					action: 'addPromoCode',
					pCode: $('#apc_pc').val(),
					dVal: $('#apc_discountValue').val(),
					start: startDt,
					end: endDt
				}, success:function(result){
					alert('added new promo');
					$.ajax({
					type: 'POST',
					url: ajaxURL,
					data:{
						type: 'transaction',
						action: 'getAllDiscounts'
					}, success: function(result){
						$('#tbody_pcodes').html('');
						var tbody = '';
						$.each(result.discount, function(i, item) {
							tbody += '<tr id="' + item.DISCOUNT_ID + '" class="discount_row">';
							tbody += '<td class="pCode">'+item.DISCOUNT_PROMO_CODE + '</td>';
							tbody += '<td class="discVal">'+item.DISCOUNT_VALUE + '</td>';
							tbody += '<td class="start">'+item.DISCOUNT_START + '</td>';
							tbody += '<td class="end">'+item.DISCOUNT_END + '</td>';
							tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_discount"></span>&nbsp<span class="glyphicon glyphicon-trash delete_discount"></span></td>'
							
							tbody += '</tr>';
						});
						$('#tbody_pcodes').append(tbody);
						$('#addPromoCodePanel').dialog('close');
					}, async: false
				});
				}
			})
		}
	})


	$('#save_editpCode').click(function(){
		var startDt = document.getElementById('epc_start').value;
		var endDt = document.getElementById('epc_end').value;
		if(new Date(startDt).getTime() > new Date(endDt).getTime()){
			alert('Start date cannot be later than the end date');
		}else{
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'transaction',
					action: 'updatePromoCode',
					id: $('#epc_pid').val(),
					pCode: $('#epc_pc').val(),
					dVal: $('#epc_discountValue').val(),
					start: startDt,
					end: endDt
				}, success:function(result){
					$.ajax({
					type: 'POST',
					url: ajaxURL,
					data:{
						type: 'transaction',
						action: 'getAllDiscounts'
					}, success: function(result){
						$('#tbody_pcodes').html('');
						var tbody = '';
						$.each(result.discount, function(i, item) {
							tbody += '<tr id="' + item.DISCOUNT_ID + '" class="discount_row">';
							tbody += '<td class="pCode">'+item.DISCOUNT_PROMO_CODE + '</td>';
							tbody += '<td class="discVal">'+item.DISCOUNT_VALUE + '</td>';
							tbody += '<td class="start">'+item.DISCOUNT_START + '</td>';
							tbody += '<td class="end">'+item.DISCOUNT_END + '</td>';
							tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_discount"></span>&nbsp<span class="glyphicon glyphicon-trash delete_discount"></span></td>'
							tbody += '</tr>';
						});
						$('#tbody_pcodes').append(tbody);
						$('#editPromoCodePanel').dialog('close');
					}, async: false
				});
				}
			})
		}
	})

	$('#addpCode').click(function(){

		$('#addPromoCodePanel').dialog();

	})

	$('table').delegate('.edit_discount', 'click', function(){
		$('#epc_pid').val($(this).parents().eq(1).attr('id'));
		$('#epc_pc').val($(this).parents().eq(1).find('.pCode').text());
		$('#epc_discountValue').val($(this).parents().eq(1).find('.discVal').text());
		$('#epc_start').val($(this).parents().eq(1).find('.start').text());
		$('#epc_end').val($(this).parents().eq(1).find('.end').text());
		$('#editPromoCodePanel').dialog();
	})

	$('table').delegate('.delete_discount', 'click', function(){
		if (confirm('Are you sure you want to delete this?')) {
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'transaction',
				action: 'deleteDiscount',
				id:$(this).parents().eq(1).attr('id')
			}, success: function(result){
				$.ajax({
					type: 'POST',
					url: ajaxURL,
					data:{
						type: 'transaction',
						action: 'getAllDiscounts'
					}, success: function(result){
						$('#tbody_pcodes').html('');
						var tbody = '';
						$.each(result.discount, function(i, item) {
							tbody += '<tr id="' + item.DISCOUNT_ID + '" class="discount_row">';
							tbody += '<td class="pCode">'+item.DISCOUNT_PROMO_CODE + '</td>';
							tbody += '<td class="discVal">'+item.DISCOUNT_VALUE + '</td>';
							tbody += '<td class="start">'+item.DISCOUNT_START + '</td>';
							tbody += '<td class="end">'+item.DISCOUNT_END + '</td>';
							tbody += '<td class="hideable"><span class="glyphicon glyphicon-pencil edit_discount"></span>&nbsp<span class="glyphicon glyphicon-trash delete_discount"></span></td>'
							tbody += '</tr>';
						});
						$('#tbody_pcodes').append(tbody);
						$('#editPromoCodePanel').dialog('close');
					}, async: false
				});
			}
		})
		}
	})

	$('#cancel_editpCode').click(function(){
		$('#editPromoCodePanel').dialog('close');
	})

	$('#po_link').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'none');
		$('#inventory').css('display', 'none');
		$('#tires-panel').css('display', 'none');
		$('#wheels-panel').css('display', 'none');
		$('#batteries-panel').css('display', 'none');
		$('#rescue-panel').css('display', 'none');
		$('#sales').css('display', 'none');
		$('#account_details').css('display', 'none');
		$('#promo_code').css('display', 'none');
		$('#sales_column').css('display', 'none');	
		$('#sales_graph').css('display', 'none');	
		$('#popanel').css('display', 'inherit');

		$('#accounts_link').removeClass('active');
		$('#comments_link').removeClass('active');
		$('#inventory_link').removeClass('active');
		$('#rescue_link').removeClass('active');
		$('#sales_link').removeClass('active')
		$('#po_link').addClass('active');
		$('#pcode_link').removeClass('active');
	})

	$('#pcode_link').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'none');
		$('#inventory').css('display', 'none');
		$('#tires-panel').css('display', 'none');
		$('#wheels-panel').css('display', 'none');
		$('#batteries-panel').css('display', 'none');
		$('#rescue-panel').css('display', 'none');
		$('#sales').css('display', 'none');
		$('#account_details').css('display', 'none');
		$('#promo_code').css('display', 'inherit');
		$('#sales_column').css('display', 'none');	
		$('#sales_graph').css('display', 'none');	
		$('#popanel').css('display', 'none');

		$('#accounts_link').removeClass('active');
		$('#comments_link').removeClass('active');
		$('#inventory_link').removeClass('active');
		$('#rescue_link').removeClass('active');
		$('#sales_link').removeClass('active')
		$('#pcode_link').addClass('active');
		$('#po_link').removeClass('active');
	})
	
	$('#accounts_link').click(function(){
		$('#accounts').css('display', 'inherit');
		$('#comments').css('display', 'none');
		$('#inventory').css('display', 'none');
		$('#sales').css('display', 'none');
		$('#tires-panel').css('display', 'none');
		$('#wheels-panel').css('display', 'none');
		$('#batteries-panel').css('display', 'none');
		$('#rescue-panel').css('display', 'none');
		$('#account_details').css('display', 'none');
		$('#promo_code').css('display', 'none');
		$('#sales_column').css('display', 'none');	
		$('#sales_graph').css('display', 'none');	
		$('#popanel').css('display', 'none');

		$('#accounts_link').addClass('active');
		$('#comments_link').removeClass('active');
		$('#inventory_link').removeClass('active');
		$('#rescue_link').removeClass('active');
		$('#sales_link').removeClass('active')
		$('#pcode_link').removeClass('active');
		$('#po_link').removeClass('active');
	})

	$('#comments_link').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'inherit');
		$('#inventory').css('display', 'none');
		$('#tires-panel').css('display', 'none');
		$('#wheels-panel').css('display', 'none');
		$('#batteries-panel').css('display', 'none');
		$('#rescue-panel').css('display', 'none');
		$('#account_details').css('display', 'none');
		$('#sales').css('display', 'none');
		$('#promo_code').css('display', 'none');
		$('#sales_column').css('display', 'none');	
		$('#sales_graph').css('display', 'none');	
		$('#popanel').css('display', 'none');

		$('#accounts_link').removeClass('active');
		$('#comments_link').addClass('active');
		$('#inventory_link').removeClass('active');
		$('#rescue_link').removeClass('active');
		$('#sales_link').removeClass('active')				
		$('#pcode_link').removeClass('active');
		$('#po_link').removeClass('active');
	
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'comments',
				action: 'updateCommentsStatus'
			}, success: function(result){
				
			}
		});
	})

	$('#inventory_link').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'none');
		$('#inventory').css('display', 'inherit');
		$('#tires-panel').css('display', 'none');
		$('#wheels-panel').css('display', 'none');
		$('#batteries-panel').css('display', 'none');
		$('#rescue-panel').css('display', 'none');
		$('#account_details').css('display', 'none');
		$('#sales').css('display', 'none');
		$('#promo_code').css('display', 'none');
		$('#sales_column').css('display', 'none');	
		$('#sales_graph').css('display', 'none');	
		$('#popanel').css('display', 'none');

		$('#accounts_link').removeClass('active');
		$('#comments_link').removeClass('active');
		$('#inventory_link').addClass('active');
		$('#rescue_link').removeClass('active');
		$('#sales_link').removeClass('active')
		$('#pcode_link').removeClass('active');
		$('#po_link').removeClass('active');
	})

	$('#rescue_link').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'none');
		$('#inventory').css('display', 'none');
		$('#tires-panel').css('display', 'none');
		$('#wheels-panel').css('display', 'none');
		$('#batteries-panel').css('display', 'none');
		$('#rescue-panel').css('display', 'inherit');
		$('#sales').css('display', 'none');
		$('#account_details').css('display', 'none');
		$('#promo_code').css('display', 'none');
		$('#sales_column').css('display', 'none');	
		$('#sales_graph').css('display', 'none');	
		$('#popanel').css('display', 'none');
		
		$('#accounts_link').removeClass('active');
		$('#comments_link').removeClass('active');
		$('#inventory_link').removeClass('active');
		$('#rescue_link').addClass('active');
		$('#sales_link').removeClass('active');
		$('#pcode_link').removeClass('active');
		$('#po_link').removeClass('active');
	})

	$('#sales_link').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'none');
		$('#inventory').css('display', 'none');
		$('#tires-panel').css('display', 'none');
		$('#wheels-panel').css('display', 'none');
		$('#batteries-panel').css('display', 'none');
		$('#rescue-panel').css('display', 'none');
		$('#sales').css('display', 'inherit');
		$('#account_details').css('display', 'none');
		$('#promo_code').css('display', 'none');
		$('#sales_column').css('display', 'inherit');
		$('#sales_graph').css('display', 'none');		
		$('#popanel').css('display', 'none');

		$('#accounts_link').removeClass('active');
		$('#comments_link').removeClass('active');
		$('#inventory_link').removeClass('active');
		$('#rescue_link').removeClass('active');
		$('#sales_link').addClass('active')
		$('#pcode_link').removeClass('active');
		$('#po_link').removeClass('active');
	})

	$('#tire-link').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'none');
		$('#inventory').css('display', 'none');
		$('#tires-panel').css('display', 'inherit');
		$('#wheels-panel').css('display', 'none');
		$('#batteries-panel').css('display', 'none');
		$('#account_details').css('display', 'none');
		$('#sales').css('display', 'none');
		$('#promo_code').css('display', 'none');
		$('#sales_column').css('display', 'none');	
		$('#sales_graph').css('display', 'none');	
	})
	$('#wheel-link').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'none');
		$('#inventory').css('display', 'none');
		$('#tires-panel').css('display', 'none');
		$('#wheels-panel').css('display', 'inherit');
		$('#batteries-panel').css('display', 'none');
		$('#account_details').css('display', 'none');
		$('#sales').css('display', 'none');
		$('#promo_code').css('display', 'none');
		$('#sales_column').css('display', 'none');	
		$('#sales_graph').css('display', 'none');	
	})

	$('#battery-link').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'none');
		$('#inventory').css('display', 'none');
		$('#tires-panel').css('display', 'none');
		$('#wheels-panel').css('display', 'none');
		$('#batteries-panel').css('display', 'inherit');
		$('#account_details').css('display', 'none');
		$('#sales').css('display', 'none');
		$('#promo_code').css('display', 'none');
		$('#sales_column').css('display', 'none');	
		$('#sales_graph').css('display', 'none');	
	})

	$('#switch_graph').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'none');
		$('#inventory').css('display', 'none');
		$('#tires-panel').css('display', 'none');
		$('#wheels-panel').css('display', 'none');
		$('#batteries-panel').css('display', 'none');
		$('#account_details').css('display', 'none');
		$('#sales').css('display', 'none');
		$('#promo_code').css('display', 'none');
		$('#sales_column').css('display', 'none');	
		$('#sales_graph').css('display', 'inherit');	
		$('#sales').css('display', 'inherit');
	})

	$('#switch_table').click(function(){
		$('#accounts').css('display', 'none');
		$('#comments').css('display', 'none');
		$('#inventory').css('display', 'none');
		$('#tires-panel').css('display', 'none');
		$('#wheels-panel').css('display', 'none');
		$('#batteries-panel').css('display', 'none');
		$('#account_details').css('display', 'none');
		$('#sales').css('display', 'none');
		$('#promo_code').css('display', 'none');
		$('#sales_column').css('display', 'inherit');	
		$('#sales_graph').css('display', 'none');	
		$('#sales').css('display', 'inherit');
	})


	$('#print').click(function(){
		window.location.replace("http://mirasoltiresupply.com/admin/printableSales.php?month=" + $('#month').val() + '&&year=' + $('#year').val());
	});

	$('.close-diag').click(function(){
		$('#comment_dialog').dialog('close');
	})
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'account_control',
			action: 'checkSessionLoggedIn'
		}, success: function(result){
			if(result.isSec){
				$('.hideable').css('display', 'none');
			}
		}
	})

	$('#addTire').click(function(){
		$('#addTirePanel').dialog();
	})

	$('#cancel_addTire').click(function(){
		$('#addTirePanel').dialog('close');
	})
	$('#save_addTire').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'addTire',
				cost: $('#at_ppu').val(),
				stock: $('#at_stock').val(),
				rim: $('#at_rim').val(),
				size: $('#at_size').val(),
				liss: $('#at_liss').val(),
				brand: $('#at_brand').val(),
				design: $('#at_design').val(),
				fname: ''
			}, success: function(result){
				$('#at_ppu').val('');
				$('#at_stock').val('');
				$('#at_rim').val('');
				$('#at_size').val('');
				$('#at_liss').val('');
				$('#at_brand').val('');
				$('#at_design').val('');
				alert('New Tire Added');
				$('#addTirePanel').dialog('close');
			}
		})

	})

	$('#addWheel').click(function(){
		$('#addWheelPanel').dialog();
	})

	$('#cancel_addWheel').click(function(){
		$('#addWheelPanel').dialog('close');
	})
	$('#save_addWheel').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'addWheel',
				cost: $('#aw_ppu').val(),
				stock: $('#aw_stock').val(),
				rim: $('#aw_rim').val(),
				brand: $('#aw_brand').val(),
				color: $('#aw_color').val(),
				holes: $('#aw_holes').val(),
				fname: ''
			}, success: function(result){
				$('#aw_ppu').val('');
				$('#aw_stock').val('');
				$('#aw_rim').val('');
				$('#aw_brand').val('');
				$('#aw_color').val('');
				$('#aw_holes').val('');
				alert('New Wheel Added');
				$('#addWheelPanel').dialog('close');
			}
		})

	})

	$('#addBattery').click(function(){
		$('#addBatteryPanel').dialog();
	})

	$('#cancel_addBattery').click(function(){
		$('#addBatteryPanel').dialog('close');
	})
	$('#save_addBattery').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'product',
				action: 'addBattery',
				cost: $('#ab_ppu').val(),
				stock: $('#ab_stock').val(),
				types: $('#ab_type').val(),
				description: $('#ab_description').val(),
				plates: $('#ab_plates').val(),
				fname: ''
			}, success: function(result){
				$('#ab_ppu').val('');
				$('#ab_stock').val('');
				$('#ab_type').val('');
				$('#ab_description').val('');
				$('#ab_plates').val('');
				alert('New Battery Added');
				$('#addBatteryPanel').dialog('close');
			}
		})

	})
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
})


