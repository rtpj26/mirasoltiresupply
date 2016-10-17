$(function(){
	var ajaxURL = "http://mirasoltiresupply.com/php/ajax_service.php";
	var user_data;
	var selected_mop=0;
	var lastMopId;
	var global_grandTotal;
	var pCode = true;
	var currDate = new Date();
	var year = currDate.getFullYear();
	for(var i = 0; i<11; i++){
		$('#card-expiry-year').append('<option value="' + (year + i) + '">' + (year + i) + "</option");
	}

	$('#signup').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				fname: $('#fname').val(),
				lname: $('#lname').val(),
				email: $('#email').val(),
				pnum: $('#pnum').val(),
				pass: $('#pass').val(),
				blk: $('#address_blk').val(),
				lt: $('#address_lt').val(),
				phase: $('#address_ph').val(),
				street: $('#address_st').val(),
				subd: $('#address_subd').val(),
				brgy: $('#address_brgy').val(),
				city: $('#address_city').val(),
				prov: $('#address_prov').val(),
				zip: $('#address_zip').val(),
				
				type: "account_control",
				action: "signup",
			},success: function(){
				alert('New User Added');
				
			},error: function(){
				alert('Cannot Add New User')
			}
		});
	});
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
	
	$('#selected-cc').css('display', 'inline');
	$('#selected-cod').css('display', 'none');
	$('#selected-c').css('display', 'none');
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
			   	$('#n-logged-in').css('display', 'inline');
			   	$('#logged-in').css('display', 'none');
			}else{
				$('#sign-in-label').text('SIGNED IN AS');
				$.each(result.u_details, function(i, item) {
				   $('#sign-in-fname').text(item.USER_FNAME);
				   $('#sign-in-email').text(item.USER_EMAIL);
				   $('#account-id').text(item.USER_ID);
				   $('#account-lname, #account-lname-r').text(item.USER_LNAME);
				   $('#account-fname, #account-fname-r').text(item.USER_FNAME);
				   $('#account-mname, #account-mname-r').text(item.USER_M_INITIAL);
				   $('#account-address, #account-address-r').text(item.ADDR_BLK + " " + item.ADDR_LT + " " + item.ADDR_PH + " " + item.ADDR_ST + " " + item.ADDR_SUBD + " " + item.ADDR_BRGY + " " + item.ADDR_CITY + " " + item.ADDR_PROV + " " + item.ADDR_ZIP);
				   $('#account-email,#account-email-r').text(item.USER_EMAIL);
				   if(item.USER_GENDER == 0)
						$('#account-gender').text("MALE");
					else
						$('#account-gender').text("FEMALE");
				   $('#account-contact,#account-contact-r').text(item.USER_CONTACT_NO);
				   $('#deliver-to,#deliver-to-r').text(item.USER_DELIVERY_NAME);
					$('#deliver-address,#deliver-address-r').text(item.USER_DELIVERY_DETAIL);
					$('#deliver-contact,#deliver-contact-r').text(item.USER_DELIVERY_CONTACT);
					$('#dinfo-name').val(item.USER_DELIVERY_NAME);
					$('#dinfo-address').val(item.USER_DELIVERY_DETAIL);
					$('#dinfo-contact').val(item.USER_DELIVERY_CONTACT);
				})
				$('#n-logged-in').css('display', 'none');
			   	$('#logged-in').css('display', 'inline');
				user_data = result.u_details;
			}
		}
	});
	var tbody_dat='';
	$.ajax({
		type: 'POST',
		url: ajaxURL,
		data:{
			type: 'session',
			action: 'getDataInCart'
		},
		success: function(result){
			
			$.each(result.cart, function(i, item) {
				tbody_dat+='<tr>';
				tbody_dat+='<td class="odd"><center>' + item.qty + '</center></td>';
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
				tbody_dat+='<td class="odd"><center>'+item.desc+'</center></td>';
				tbody_dat+='<td class="even"><center>'+addCommas(item.uprice)+'</center></td>';
				tbody_dat+='<td class="odd"><center>'+addCommas(item.price)+'</center></td>';
				tbody_dat+='</tr>';
			});
			$('#table_data').html(tbody_dat);
			$('#grandtotal').append(addCommas(result.total));

			global_grandTotal = result.total;
		}
	});

	$('#save-dinfo, #save2').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'account_control',
				action: 'updateDeliveryDetails',
				name: $('#dinfo-name').val(),
				address: $('#dinfo-address').val(),
				contact: $('#dinfo-contact').val()
			},success: function(){
				$('#deliver-to').text($('#dinfo-name').val());
				$('#deliver-address').text($('#dinfo-address').val());
				$('#deliver-contact').text($('#dinfo-contact').val());

				$('#deliver-to-r').text($('#dinfo-name').val());
				$('#deliver-address-r').text($('#dinfo-address').val());
				$('#deliver-contact-r').text($('#dinfo-contact').val());
				$('#editDeliveryDialog').dialog('close');
				alert('Delivery Details Saved');
			}
		})
	})
	$('#discCode').keyup(function(){
		if($("#discCode").val() == ''){
			$('#codeStatus').text('');
			pCode = true;
		}else{
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: 'transaction',
				action: 'checkDiscount',
				discount: $('#discCode').val()
			}, success: function(result){
				if(result.success){
					$('#codeStatus').text('Promo Valid');
					pCode = true;
				}else{
					$('#codeStatus').text('Promo Invalid');
					pCode = false
				}
			}
		})
	}
	})

	$('#close-dinfo').click(function(){
		$('#editDeliveryDialog').dialog('close');
		
	})

	$('#profile-title').click(function(){
		if($('#profile-title').find('span#collapse-profile').text() == '+'){
			$('#profile-title').find('span#collapse-profile').text('-');
		}else{
			$('#profile-title').find('span#collapse-profile').text('+');
		}
	});	

	$('#delivery-title').click(function(){
		if($('#delivery-title').find('span#collapse-profile').text() == '+'){
			$('#delivery-title').find('span#collapse-profile').text('-');
		}else{
			$('#delivery-title').find('span#collapse-profile').text('+');
		}
	});	

	$('#payment-title').click(function(){
		if($('#payment-title').find('span#collapse-profile').text() == '+'){
			$('#payment-title').find('span#collapse-profile').text('-');
		}else{
			$('#payment-title').find('span#collapse-profile').text('+');
		}
	});	

	$('#review-title').click(function(){
		if($('#review-title').find('span#collapse-profile').text() == '+'){
			$('#review-title').find('span#collapse-profile').text('-');
		}else{
			$('#review-title').find('span#collapse-profile').text('+');
		}
	});

	$('#checkout_login').click(function(e){
		e.preventDefault(); 
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: "account_control",
				action: 'login',
				semail: $('#semail').val(),
				spass: $('#spass').val()
			},
			success: function(result){
				if(result.logged_in){
					location.reload();
				}else{
					alert('incorrect credentials');
				}
			},
			error: function(){
				alert('Invalid username/password. Please try again');
			}
		});
		
	})	

	$('#credit-selection').click(function(){
		selected_mop = 1;
		$('#selected-cc').css('display', 'inline');
		$('#selected-cod').css('display', 'none');
		$('#selected-c').css('display', 'none');
	})

	$('#cod-selection').click(function(){
		selected_mop = 2;
		$('#selected-cc').css('display', 'none');
		$('#selected-cod').css('display', 'inline');
		$('#selected-c').css('display', 'none');
	})

	$('#check-selection').click(function(){
		selected_mop = 3;
		$('#selected-cc').css('display', 'none');
		$('#selected-cod').css('display', 'none');
		$('#selected-c').css('display', 'inline');
	})

	$('#mop-cc-save').click(function(){
		var card_no = $('#card-no').val();
		var card_name = $('#card-name').val();
		var card_exp_month = $('#card-expiry-month').val();
		var card_exp_year = $('#card-expiry-year').val();
		var card_security = $('#card-security').val();
		var provider = '';
		if($('#ccard-mc').is(':checked')){
			provider = "Master Card";
		}else{
			provider = "VISA";
		}

		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: "transaction",
				action: "createCreditDetail",
				card_no: card_no,
				card_name: card_name,
				exp_month: card_exp_month,
				exp_year: card_exp_year,
				card_security: card_security,
				provider: provider
			},
			success: function(result){
				alert('Credit Card details saved for this transaction.');
				selected_mop = 1;
				lastMopId = result.id;
				$('#codNote').css('display', 'none');
				$('#mop_text').text("Credit Card");
			},
			error: function(result){
				alert('Please make sure to enter correct credit card detail before saving');
			}
		});
	})

	$('#mop-cod-save').click(function(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: "transaction",
				action: "createCODDetail"
			},
			success: function(result){
				alert('COD details saved for this transaction.');
				selected_mop = 2;
				lastMopId = result.id;
				$('#codNote').css('display', 'inline');
				$('#mop_text').text("COD");
			}
		});
	})

	$('#mop-c-save').click(function(){
		var cheque_bank = $('#c-bank').val();
		var cheque_number = $('#c-num').val();
		var cheque_amount = global_grandTotal;
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: "transaction",
				action: "createCheckDetail",
				bank: cheque_bank,
				cnumber: cheque_number,
				amount: cheque_amount,
			},
			success: function(result){
				alert('Check details saved for this transaction.');
				selected_mop = 3;
				lastMopId = result.id;
				$('#codNote').css('display', 'none');
				$('#mop_text').text("Cheque");
			},
			error: function(result){
				alert('Please make sure to enter correct check detail before saving');
			}
		});

	})

	$('#order').click(function(){
		if(selected_mop == 0){
			alert('Cannot proceed without selecting a mode of payment');
		}else if(pCode == false){
			alert('Invalid Promo Code');

		}else{
			var grand_grandtotal = global_grandTotal;
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'transaction',
					action: 'createTransaction',
					mop: selected_mop,
					lastMopId: lastMopId,
					promoCode: $('#discCode').val(),
					subtotal: global_grandTotal,
				},
				success: function(result){
					//alert('Order successfully placed');
					if(selected_mop == 2){
						alert("Your order will arrive within 24 hours");
					}
					window.location.replace("http://mirasoltiresupply.com/invoice.php?tid=" + result.tid);

				},error: function(result){
					if(result.success)window.location.replace("http://mirasoltiresupply.com/invoice.php?tid=" + result.tid);
				},async: false
			})
		}
	})

	$('#editDelivery').click(function(){
		$('#editDeliveryDialog').dialog({
			height: 300,
		    width: 500,
		    modal: true
		});
		$('.ui-dialog-titlebar').css('display', 'none');

	});
	function addCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function login(){
		$.ajax({
			type: 'POST',
			url: ajaxURL,
			data:{
				type: "account_control",
				action: 'login',
				semail: $('#semail').val(),
				spass: $('#spass').val()
			},
			success: function(result){
				if(result.logged_in){
					alert('Login successful');
				}else{
					alert('incorrect credentials');
				}
			},
			error: function(){
				alert('Invalid username/password. Please try again');
			}
		});
	}

	function finalizeTransaction(){

	}
})
