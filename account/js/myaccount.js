$(function(){
	var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";
		$('#profile').css('display', 'inherit');
		$('#transaction').css('display', 'none');
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
	
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'account_control',
			action: 'checkSessionLoggedIn'
		},
		success: function(result){
			if(!result.logged_in){
				$('#sign-in-label').text('SIGN IN');
				$('#sign-in-fname').text('');
				$('#sign-in-email').text('');
				$('#sign-in-fname').text('');
			    $('#sign-in-email').text('');
			    $('#account-id').text('');
			    $('#account-lname').text('');
			    $('#account-fname').text('');
			    $('#account-mname').text('');
			    $('#account-address').text('');
			    $('#account-email').text('');
				$('#account-gender').text('');
			   $('#account-contact').text('');
			}else{
				$('#sign-in-label').text('SIGNED IN AS');
				$.each(result.u_details, function(i, item) {
				   $('#sign-in-fname').text(item.USER_FNAME);
				   $('#sign-in-email').text(item.USER_EMAIL);
				   $('#account-id').text(item.USER_ID);
				   $('#account-lname').text(item.USER_LNAME);
				   $('#account-fname').text(item.USER_FNAME);
				   $('#account-mname').text(item.USER_M_INITIAL);
				   $('#account-address').text(item.ADDR_BLK + " " + item.ADDR_LT + " " + item.ADDR_PH + " " + item.ADDR_ST + " " + item.ADDR_SUBD + " " + item.ADDR_BRGY + " " + item.ADDR_CITY + " " + item.ADDR_PROV + " " + item.ADDR_ZIP);
				   $('#account-email').text(item.USER_EMAIL);
				   if(item.USER_GENDER == 0)
						$('#account-gender').text("MALE");
					else
						$('#account-gender').text("FEMALE");
				   $('#account-contact').text(item.USER_CONTACT_NO);
				})
			}
		}

	});
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'transaction',
			action: 'getUserTransactions',
		}, success: function(result){
			var tbody = '';
			$.each(result.details, function(i, item) {
				tbody += '<tr id="' + item.TRANSACTION_ID + '">';
				tbody += '<td class="invoice_row">' + item.TRANSACTION_ID + '</td>'
				tbody += '<td class="invoice_row">'+item.TEANSACTION_DATE + '</td>';
				if(item.TRANSCTION_MOP == "1"){
					tbody += '<td class="invoice_row">CARD</td>';
				}else if(item.TRANSCTION_MOP == "2"){
					tbody += '<td class="invoice_row">COD</td>';
				}else if(item.TRANSCTION_MOP == "3"){
					tbody += '<td class="invoice_row">CHEQUE</td>';
				}else{
					tbody += '<td class="invoice_row">N/A</td>';
				}
				if(item.TRANSACTION_STATUS == "1"){
					tbody += '<td class="invoice_row">PENDING</td>';
				}else{
					tbody += '<td class="invoice_row">DONE</td>';
				}
				tbody += '<td class="invoice_row inv_point">View Invoice</td>';
				tbody += '</tr>';
			});
			$('#tbody_transaction').append(tbody);
		}, async: false
	});
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'transaction',
			action: 'getUserWishlist',
		}, success: function(result){
			var tbody = '';
			$.each(result.details, function(i, item) {
				tbody += '<tr id="' + item.TRANSACTION_ID + '">';
				tbody += '<td class="wishlist_row">' + item.TRANSACTION_ID + '</td>'
				tbody += '<td class="wishlist_row">'+item.TEANSACTION_DATE + '</td>';
				
				tbody += '<td class="wishlist_row inv_point">Add to cart</td>';
				tbody += '</tr>';
			});
			$('#tbody_wishlist').append(tbody);
		}, async: false
	});
	
	$('#wishlist-menu').click(function(){
		$('#profile').css('display', 'none');
		$('#transaction').css('display', 'none');
		$('#wishlist').css('display', 'inherit');
	})
	$('#transaction-menu').click(function(){
		$('#profile').css('display', 'none');
		$('#transaction').css('display', 'inherit');
		$('#wishlist').css('display', 'none');
	})
	$('#profile-menu').click(function(){
		$('#profile').css('display', 'inherit');
		$('#transaction').css('display', 'none');
		$('#wishlist').css('display', 'none');
	})

	$('table').delegate('.invoice_row', 'click', function(){
		var id = $(this).parents().eq(0).attr('id');

		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'session',
				action: 'changeInvId',
				tid: id
			},success: function(){
				window.location.replace("http://mirasoltiresupply.com/invoice.php?tid=" + id);		
			}
		})
		
	})


	$('table').delegate('.wishlist_row', 'click', function(){
		var id = $(this).parents().eq(0).attr('id');
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'session',
				action: 'changeInvId',
				tid: id
			},success: function(){
				$.ajax({
					type: 'POST',
					url: ajaxURL,
					data:{
						type: 'transaction',
						action: 'getUserWishlistDetails',
						tid: id
					},success: function(result){
						$.each(result.details, function(i, item){
							$.ajax({
							type: 'POST',
								url: ajaxURL,
								data:{
									type: 'session',
									action: 'addtocart',
									product_type:  item.PRODUCT_TYPE,
									product_id: item.PRODUCT_ID,
									item_id: '',
									desc: item.TD_DESCRIPTION,
									price: item.PRODUCT_COST_PER_UNIT,
									qty: item.TD_QTY,
									max: item.PRODUCT_STOCK
								},
								success: function(result){
									
								},async: false
							});


						})


						window.location.replace("http://mirasoltiresupply.com/checkout.php");		
					}
				})				
			}
		})
		
		
		
	})


	$('#updateProfile').click(function(){
		$('#editAccount').dialog({
			width: "900px",

		});

		$.ajax({
		type: 'POST',
			url: ajaxURL,
			data:{
				type: 'account_control',
				action: 'checkSessionLoggedIn'
			},
			success: function(result){
				$.each(result.u_details, function(i, item) {
				   $('#e-account-id').text(item.USER_ID);
				   $('#e-account-lname').val(item.USER_LNAME);
				   $('#e-account-fname').val(item.USER_FNAME);
				   $('#e-account-mname').val(item.USER_M_INITIAL);
				   $('#e-account-address').val(item.USER_ADDRESS);
				   $('#e-account-email').val(item.USER_EMAIL);
					$('#e-account-address-blk').val(item.ADDR_BLK);
					$('#e-account-address-lt').val(item.ADDR_LT);
					$('#e-account-address-ph').val(item.ADDR_PH);
					$('#e-account-address-st').val(item.ADDR_ST);
					$('#e-account-address-subd').val(item.ADDR_SUBD);
					$('#e-account-address-brgy').val(item.ADDR_BRGY);
					$('#e-account-address-city').val(item.ADDR_CITY);
					$('#e-account-address-prov').val(item.ADDR_PROV);
					$('#e-account-address-zip').val(item.ADDR_ZIP);
				  
				   if(item.USER_GENDER == 0)
						$('#e-account-gender').val(0);
					else
						$('#e-account-gender').val(1);
				   $('#e-account-contact').val(item.USER_CONTACT_NO);
			
				})
				
			}

		});
	})

	$('#ebutton-cancel, #ebutton-cancel-pas').click(function(){
		$('#editAccount').dialog('close');
	})

	$('#ebutton-save').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type:'account_control',
				action:'updateAccount',
				id: $('#e-account-id').text(),
				fname: $('#e-account-fname').val(),
				lname: $('#e-account-lname').val(),
				email: $('#e-account-email').val(),
				contact: $('#e-account-contact').val(),
				savedEmail: $('#account-email').text(),
				mi: $('#e-account-mname').val(),
				gender: $('#e-account-gender').val(),
				blk:$('#e-account-address-blk').val(),
				lt:$('#e-account-address-lt').val(),
				ph:$('#e-account-address-ph').val(),
				st:$('#e-account-address-st').val(),
				subd:$('#e-account-address-subd').val(),
				brgy:$('#e-account-address-brgy').val(),
				city:$('#e-account-address-city').val(),
				prov:$('#e-account-address-prov').val(),
				zip:$('#e-account-address-zip').val()

			}, success:function(){
				alert('User Data Updated');
				$('#editAccount').dialog('close');
			   


				$.ajax({
					type: 'POST',
					url: ajaxURL,
					data:{
						type: 'account_control',
						action: 'checkSessionLoggedIn'
					},
					success: function(result){
						if(!result.logged_in){
							$('#sign-in-label').text('SIGN IN');
							$('#sign-in-fname').text('');
							$('#sign-in-email').text('');
							$('#sign-in-fname').text('');
						    $('#sign-in-email').text('');
						    $('#account-id').text('');
						    $('#account-lname').text('');
						    $('#account-fname').text('');
						    $('#account-mname').text('');
						    $('#account-address').text('');
						    $('#account-email').text('');
							$('#account-gender').text('');
						   $('#account-contact').text('');
						}else{
							$('#sign-in-label').text('SIGNED IN AS');
							$.each(result.u_details, function(i, item) {
							   $('#sign-in-fname').text(item.USER_FNAME);
							   $('#sign-in-email').text(item.USER_EMAIL);
							   $('#account-id').text(item.USER_ID);
							   $('#account-lname').text(item.USER_LNAME);
							   $('#account-fname').text(item.USER_FNAME);
							   $('#account-mname').text(item.USER_M_INITIAL);
							   $('#account-address').text(item.ADDR_BLK + " " + item.ADDR_LT + " " + item.ADDR_PH + " " + item.ADDR_ST + " " + item.ADDR_SUBD + " " + item.ADDR_BRGY + " " + item.ADDR_CITY + " " + item.ADDR_PROV + " " + item.ADDR_ZIP);
							   $('#account-email').text(item.USER_EMAIL);
							   if(item.USER_GENDER == 0)
									$('#account-gender').text("MALE");
								else
									$('#account-gender').text("FEMALE");
							   $('#account-contact').text(item.USER_CONTACT_NO);
							})
						}
					}

				});




		}
	})
	})

	$('#ebutton-save-pass').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type:'account_control',
				action:'updatePass',
				id: $('#e-account-id').text(),
				opass: $('#e-account-opass').val(),
				pass: $('#e-account-npass').val(),
				vpass: $('#e-account-vpass').val()
			}, success:function(){
				alert('User Password Updated');
				$('#updatePassword').dialog('close');
			}
		})
	})

	
	$('#updatePass').click(function(){
		$('#updatePassword').dialog();
	})
})
