$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
	var user_data;
	var selected_mop=0;
	var lastMopId;

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
				   $('#account-lname').text(item.USER_LNAME);
				   $('#account-fname').text(item.USER_FNAME);
				   $('#account-mname').text(item.USER_M_INITIAL);
				   $('#account-address').text(item.USER_ADDRESS);
				   $('#account-email').text(item.USER_EMAIL);
				   if(item.USER_GENDER == 0)
						$('#account-gender').text("MALE");
					else
						$('#account-gender').text("FEMALE");
				   $('#account-contact').text(item.USER_CONTACT_NO);
				   $('#deliver-to').text(item.USER_FNAME + ' ' + item.USER_M_INITIAL + '. ' + item.USER_LNAME);
					$('#deliver-address').text(item.USER_ADDRESS);

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
				tbody_dat+='<td class="odd"><center>1</center></td>';
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
				tbody_dat+='<td class="even"><center>'+addCommas(item.price)+'</center></td>';
				tbody_dat+='<td class="odd"><center>'+addCommas(item.price)+'</center></td>';
				tbody_dat+='</tr>';
			});
			$('#table_data').html(tbody_dat);
			$('#grandtotal').append(addCommas(result.total));
		}
	});

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

	$('#checkout_login').click(function(){
		login();
		location.reload();
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
				card_security: card_security
			},
			success: function(result){
				alert('Credit Card details saved for this transaction.');
				selected_mop = 1;
				lastMopId = result.id;
			},
			error: function(result){
				alert('Please make sure to enter correct credit card detail before saving');
			}
		});
	})

	$('#mop-cod-save').click(function(){
		selected_mop = 2;
	})

	$('#mop-c-save').click(function(){
		var cheque_bank = $('#c-bank').val();
		var cheque_number = $('#c-num').val();
		var cheque_amount = $('#c-amnt').val();
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
			},
			error: function(result){
				alert('Please make sure to enter correct check detail before saving');
			}
		});

	})

	$('#order').click(function(){
		if(selected_mop == 0){
			alert('Cannot proceed without selecting a mode of payment');
		}else{
			$.ajax({
				type: 'POST',
				url: ajaxURL,
				data:{
					type: 'transaction',
					action: 'createTransaction',
					mop: selected_mop,
					lastMopId: lastMopId
				},
				success: function(){
					alert('Order successfully placed');
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
