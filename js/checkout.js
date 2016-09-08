$(function(){
	var ajaxURL = "/mirasoltiresupply/php/ajax_service.php";
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
				tbody_dat+='<td><center>1</center></td>';
				tbody_dat+='<td><center>pc</center></td>';
				tbody_dat+='<td><center>'+item.desc+'</center></td>';
				tbody_dat+='<td><center>'+item.price+'</center></td>';
				tbody_dat+='<td><center>'+item.price+'</center></td>';
				tbody_dat+='</tr>';
				
			});
			$('#table_data').html(tbody_dat);
			$('#grandtotal').append(result.total);
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
})
